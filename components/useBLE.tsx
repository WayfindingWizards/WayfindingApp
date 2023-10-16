// To run app:
// connect device or start emulator
// check device is connected by running: adb devices
// in cmd navigate to project folder and run: npx react-native start
// in another cmd window navigate to project folder and run: npx react-native run-android

/* eslint-disable no-bitwise */
import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { BleManager, ScanMode } from 'react-native-ble-plx';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import * as utils from './GlobalVariables';

const bleManager = new BleManager();

type VoidCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
  requestPermissions(cb: VoidCallback): Promise<void>;
  scanForPeripherals(): void;
  closestBeacon: number;
}

// variables to declare outside of scan
// const numberOfBeacons = 25;
// let beaconSignals = new Array<number>(numberOfBeacons);
// let signalTimes = new Array<number>(numberOfBeacons);
// let deleteOld = false;
// let prevTime = Date.now();
// let recentClosest: number[] = [];
// let closestBeaconFinal: number;
let IDMap = new Map<string, number>([ // this and numberOfBeacons can be migrated to a csv file
["DC:0D:30:14:30:26", 19],
["DC:0D:30:14:30:28", 21],
["DC:0D:30:14:2F:D6", 22],  // this beacon's name is also set to "Beacon 21" by mistake
["DC:0D:30:14:30:2F", 20],
["DC:0D:30:14:30:26", 19],
["DC:0D:30:14:30:23", 6],
["DC:0D:30:14:2F:CF", 13], 
["DC:0D:30:14:2F:F5", 12], // should have been outside of stairs G, but was missing
["DC:0D:30:14:30:29", 11],
["DC:0D:30:14:30:0D", 10],
["DC:0D:30:14:2F:D0", 9],
["DC:0D:30:14:2F:C9", 8],
["DC:0D:30:14:30:27", 7],
["DC:0D:30:14:2F:E8", 18],
["DC:0D:30:14:2F:A7", 15], // the number 14 was skipped
["DC:0D:30:14:30:31", 16],
["DC:0D:30:14:2F:D1", 17],
["DC:0D:30:10:4E:F2", 0], // not installed
["DC:0D:30:10:4F:57", 1], // not installed
["DC:0D:30:10:4F:3D", 2], // not installed
["DD:60:03:00:02:C0", 3], // not installed              //rssi at 1m = -59, 100 ms            (n=2.66 or n=2)? 
["DD:60:03:00:03:3C", 4], // not installed
["DD:60:03:00:00:4F", 5], // not installed
]);

const closestBeaconData: { [key: number]: { rssiValues: number[]; lastUpdateTime: number } } = {};

const useBLE = (): BluetoothLowEnergyApi => {
  const [closestBeacon] = useState<number>(-1);

  const handleDeviceScan = (error: any, device: any) => { // currently, no error handling. However, it could be added using the error parameter.
    if (device?.name?.includes('Beacon' || 'BCPro')) { // General Identifiers = { BlueCharm:'BCPro', Feasy:'Beacon' }
      const deviceRssi = device.rssi!;
      const deviceID = device.id;
      const beaconNum = IDMap.get(deviceID);

      if (beaconNum !== undefined) {
        if (!closestBeaconData[beaconNum]) {
          closestBeaconData[beaconNum] = {
            rssiValues: [],
            lastUpdateTime: Date.now(),
          };
        }

        closestBeaconData[beaconNum].rssiValues.push(deviceRssi);
      }
    }
  };

  useEffect(() => {
    const handleDeviceScan = (error: any, device: any) => { // currently, no error handling. However, it could be added using the error parameter.
      if (device?.name?.includes('Beacon' || 'BCPro')) {
        const deviceRssi = device.rssi!;
        const deviceID = device.id;
        const beaconNum = IDMap.get(deviceID);

        if (beaconNum !== undefined) {
          if (!closestBeaconData[beaconNum]) {
            closestBeaconData[beaconNum] = {
              rssiValues: [],
              lastUpdateTime: Date.now(),
            };
          }

          closestBeaconData[beaconNum].rssiValues.push(deviceRssi);
        }
      }
    };

    const scanForPeripherals = () =>
      bleManager.startDeviceScan(
        null,
        {
          allowDuplicates: true,
          scanMode: ScanMode.LowLatency,
        },
        handleDeviceScan,
      );

    const calculateAndSendAverageRSSI = () => {
      const currentTime = Date.now();
      const averageRSSIData: { [key: number]: number } = {};

      Object.keys(closestBeaconData).forEach((beaconNumStr) => {
        const beaconNum = parseInt(beaconNumStr, 10);
        const { rssiValues, lastUpdateTime } = closestBeaconData[beaconNum];

        const averageRssi = calculateAverageRSSI(rssiValues, currentTime - lastUpdateTime);

        averageRSSIData[beaconNum] = averageRssi;

        closestBeaconData[beaconNum].rssiValues = [];
        closestBeaconData[beaconNum].lastUpdateTime = currentTime;
      });

      const transformedData = Object.keys(averageRSSIData).map((beaconNumStr) => {
        const beaconNum = parseInt(beaconNumStr, 10);
        const rssi = averageRSSIData[beaconNum];

        return { beaconNum, rssi };
      });

      utils.setBeaconArray(transformedData);
    };

    const calculateAverageRSSI = (rssiValues: number[], timePeriod: number): number => {
      const currentTime = Date.now();
      const validRssiValues = rssiValues.filter((rssi, index) => { // create new array and filter out old values based on currentTime
        const timeSinceUpdate = currentTime - index * 1000; // 1 second ago
        return timeSinceUpdate <= timePeriod;
      });

      const sumRssi = validRssiValues.reduce((acc, rssi) => acc + rssi, 0);
      const averageRssi = sumRssi / validRssiValues.length;

      return averageRssi;
    };

    // Start scanning on mount (render method has been called, resulting virtual Document Object Model elements have been added to the actual Document Object Model)
    const scan = scanForPeripherals();

    // Calculate and send average RSSI every second
    const intervalId = setInterval(calculateAndSendAverageRSSI, 1000);

    return () => {
      // Cleanup: Stop scanning and clear the interval on unmount (removed from Document Object Model)
      bleManager.stopDeviceScan();
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array means this effect runs once on mount (won't re-run if any of the dependencies change)

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
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED;

        cb(isGranted);
      }
    } else { // set to true if ios
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
        // This function is defined in the effect
        handleDeviceScan(error, device);
      },
    );
  return {
    scanForPeripherals,
    requestPermissions,
    closestBeacon,
  };
};

export default useBLE;