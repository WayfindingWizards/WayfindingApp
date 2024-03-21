// To run app:
// connect device or start emulator
// check device is connected by running: adb devices
// in cmd navigate to project folder and run: npx react-native start
// in another cmd window navigate to project folder and run: npx react-native run-android

/* eslint-disable no-bitwise */
import {useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {BleManager, ScanMode} from 'react-native-ble-plx';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import  {setClosestBeacon, getClosestBeacon, setBeaconArray}  from './GlobalVariables';


const bleManager = new BleManager();

type VoidCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
  requestPermissions(cb: VoidCallback): Promise<void>;
  scanForPeripherals(): void;
  closestBeacon: number;
}

// variables to declare outside of scan
const numberOfBeacons = 25;
let beaconSignals = new Array<number>(numberOfBeacons); // beaconSignals is an array where beaconSignals[beaconNum] = rssi
let signalTimes = new Array<number>(numberOfBeacons);
let deleteOld = false;
let prevTime = Date.now();
let prevClosestBeacon: number;
let recentClosest: number[] = [];  // array that stores the beacons with the highest rssi after each scan
let closestBeaconFinal: number;

let IDMap = new Map<string, number>([  // this and numberOfBeacons can be migrated to a csv file
["DC:0D:30:14:30:26", 19],
["DC:0D:30:14:30:28", 21],
["DC:0D:30:14:2F:D6", 22],  // this beacon's name is also set to "Beacon 21" by mistake
["DC:0D:30:14:30:2F", 20],
["DC:0D:30:14:30:23", 6],
["DC:0D:30:14:2F:CF", 13], 
["DC:0D:30:14:2F:F5", 12], // should have been outside of stairs G, but was missing
["DC:0D:30:14:30:29", 11],
["DC:0D:30:14:30:0D", 10],
["DC:0D:30:14:2F:D0", 9],
["DC:0D:30:14:2F:C9", 8],
["DC:0D:30:14:30:27", 7],
["DC:0D:30:14:2F:E8", 18],
["DC:0D:30:14:2F:A7", 15], // the number 14 was skipped in this file by the previous team. We think 14 is missing too.
["DC:0D:30:14:30:31", 16],
["DC:0D:30:14:2F:D1", 17],
["DC:0D:30:10:4E:F2", 0], // not installed
["DC:0D:30:10:4F:57", 1], // not installed
["DC:0D:30:10:4F:3D", 2], // not installed
["DD:60:03:00:02:C0", 3], // not installed              //rssi at 1m = -59, 100 ms            (n=2.66 or n=2)? 
["DD:60:03:00:03:3C", 4], // not installed
["DD:60:03:00:00:4F", 5], // not installed

["DC:0D:30:14:2F:CB", 7], // for testing, not installed (named: Beacon FSC)
["DC:0D:30:14:2F:D7", 8],  // for testing, not installed (named: Beacon tes)

// For iOS, use beacons' UUIDs
// ["FDA50693-A4E2-4FB1-AFCF-C6EB07647802", 7], // for testing, not installed (named: Beacon FSC)
// ["FDA50693-A4E2-4FB1-AFCF-C6EB07647801", 8] // for testing, not installed (named: Beacon tes)
["CEDC68DF-2F2E-106F-4F00-B8525FFF055C", 7], // for testing, not installed (named: Beacon FSC)
["9E8B5B35-010C-11B6-CFA8-DFA2A24AB60D", 8] // for testing, not installed (named: Beacon tes)
]);


function useBLE(): BluetoothLowEnergyApi {
  const [closestBeacon, localClosestBeacon] = useState<number>(-1);
  const [render, setRender] = useState<boolean>(true); //manually rerenders app when closest beacon changes

  const requestPermissions = async (cb: VoidCallback) => {
    if (Platform.OS === 'android') {
      const apiLevel = await DeviceInfo.getApiLevel();

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        cb(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isGranted =
          result['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        cb(isGranted);
      }
    } else {  // set to true if ios
      cb(true);
    }
  };

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(
      null,
      {
        allowDuplicates: true,
        scanMode: ScanMode.LowLatency,
      },
      (error, device) => {
        // Parse signal from our beacons
        if (device?.name?.includes('Beacon' || 'BCPro')) {  // General Identifiers = { BlueCharm:'BCPro', Feasy:'Beacon' }
          // variables to declare each scan
          const deviceRssi = device.rssi!;
          const deviceID = device.id;
          // console.log(device.id);
          let beaconNum: number;
          let currentTime = Date.now();

          // Match deviceID to beacon and put signal in array
          beaconNum = IDMap.get(deviceID)!;
          beaconSignals[beaconNum] = deviceRssi;
          signalTimes[beaconNum] = currentTime;

          // Age out signals:
          // invalidate old rssi values once every other scan
          // consider changing this to once every few scans or once every time period
          if (deleteOld){
            for(let i = 0; i < numberOfBeacons; i++){
              if((currentTime - signalTimes[i]) > 3000){ //clear after 3 seconds (3000 ms)
                beaconSignals[i] = -100;
                signalTimes[i] = undefined as number; // setting as undefined prevents from continuously reseting signal when signal is lost
              }
            }  
          }

          deleteOld = !deleteOld;
          
          // add current closest to recentClosest
          recentClosest.push(beaconSignals.indexOf(beaconSignals.reduce((a, b) => Math.max(a, b), -Infinity)));

          // find mode of recentClosest, if empty return -1
          function findMode(arr: Array<number>){
            if(arr.length == 0){
              return -1;
            }

            // sort array
            arr = arr.sort((n1,n2) => n1 - n2);
            let mode: number = arr[0];
            let modeCount: number = 0;
            let currentCount: number = 0;

            // find mode
            for(let i = 1; i < arr.length; i++){
              if(arr[i-1] == arr[i]){
                currentCount += 1;
                if(currentCount > modeCount){
                  mode = arr[i];
                  modeCount = currentCount;
                }
              }
              else {
                currentCount = 0;
              }
            }
            
            console.log({mode});
            return mode;
          }

          // call findMode every second
          if((currentTime - prevTime) > 1000){ // 1000 ms = 1 s
            console.log({recentClosest});
            closestBeaconFinal = findMode(recentClosest);
            localClosestBeacon(closestBeaconFinal); // sets closest beacon in the useBLE file

            if(getClosestBeacon() != null && closestBeaconFinal == prevClosestBeacon){ //update closest beacon after multiple signals report it as the closest
              setClosestBeacon(closestBeaconFinal); // sets the closest beacon in GlobalVariables.tsx
            }
            else if (getClosestBeacon() != null && closestBeaconFinal != prevClosestBeacon){ //update prevClosestBeacon before changing the closest beacon
              prevClosestBeacon = closestBeaconFinal;
            }
            else{ //update closest beacon if there is no closest beacon set
              setClosestBeacon(closestBeaconFinal); // sets the closest beacon in GlobalVariables.tsx
              prevClosestBeacon = closestBeaconFinal;
            }
            setRender(!render); //see line 62
            recentClosest = [];
            prevTime = currentTime;
            console.log("closest beacon: " + getClosestBeacon());
          }
        }
      },
    );

  return {
    scanForPeripherals,
    requestPermissions,
    closestBeacon,
  };
}

export default useBLE;