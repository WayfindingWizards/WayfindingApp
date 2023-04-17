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


const bleManager = new BleManager();

type VoidCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
  requestPermissions(cb: VoidCallback): Promise<void>;
  scanForPeripherals(): void;
  closestBeacon: number;
}

// variables to declare outside of scan
const numberOfBeacons = 6;
let beaconSignals = new Array<number>(numberOfBeacons); // beaconSignals is an array where beaconSignals[beaconNum] = rssi
let signalTimes = new Array<number>(numberOfBeacons);
let deleteOld = false;
let prevTime = Date.now();
let recentClosest: number[] = [];

function useBLE(): BluetoothLowEnergyApi {
  const [closestBeacon, setclosestBeacon] = useState<number>(-1);

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
    } else {
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
          let beaconNum: number;
          let currentTime = Date.now();
          let IDMap = new Map<string, number>([
            ["DC:0D:30:14:30:26", 19],
            ["DC:0D:30:14:30:28", 210], // these both have "Beacon 21" as their name on accident
            ["DC:0D:30:14:2F:D6", 211],
            ["DC:0D:30:14:30:2F", 20],
            ["DC:0D:30:14:30:26", 19],
            ["DC:0D:30:14:30:23", 6],
            ["DC:0D:30:14:2F:CF", 13],
            ["DC:0D:30:14:2F:F5", 12],
            ["DC:0D:30:14:30:29", 11],
            ["DC:0D:30:14:30:0D", 10],
            ["DC:0D:30:14:2F:D0", 9],
            ["DC:0D:30:14:2F:C9", 8],
            ["DC:0D:30:14:30:27", 7],
            ["DC:0D:30:14:2F:E8", 18],
            ["DC:0D:30:14:2F:A7", 15],
            ["DC:0D:30:14:30:31", 16],
            ["DC:0D:30:14:2F:D1", 17],
            ["DC:0D:30:10:4E:F2", 0], // not installed
            ["DC:0D:30:10:4F:57", 1],
            ["DC:0D:30:10:4F:3D", 2],
            ["DD:60:03:00:02:C0", 3],
            ["DD:60:03:00:03:3C", 4],
            ["DD:60:03:00:00:4F", 5],
          ]);

          // Match deviceID to beacon and put signal in array
          beaconNum = IDMap.get(deviceID);
          beaconSignals[beaconNum] = deviceRssi;
          signalTimes[beaconNum] = currentTime;

          
          // invalidate old rssi values once every other scan
            // consider changing this to once every few scans or once every time period
          if (deleteOld){
            for(let i = 0; i < numberOfBeacons; i++){
              if((currentTime - signalTimes[i]) > 3000){
                beaconSignals[i] = -100;
                // console.log(i);
                // console.log({beaconSignals});
                // console.log({signalTimes});
                // console.log({currentTime});
                // console.log("OLD DATA RESETTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
                signalTimes[i] = undefined as number; // ignore error; setting as undefined prevents from continuously reseting signal when signal is lost
              }
            }  
          }

          deleteOld = !deleteOld;
          
          // add current closest to recentClosest
          recentClosest.push(beaconSignals.indexOf(beaconSignals.reduce((a, b) => Math.max(a, b), -Infinity)));

          function findMode(arr: Array<number>){  // find mode of recentClosest, if empty return -1
            // check for empty array
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

          // every second:
          if((currentTime - prevTime) > 1000){
            console.log({recentClosest});
            setclosestBeacon(findMode(recentClosest));
            recentClosest = [];
            prevTime = currentTime;
          }

          
        }
      },
    );

  return {
    scanForPeripherals,
    requestPermissions,
    //distance,
    closestBeacon,
  };
}

export default useBLE;