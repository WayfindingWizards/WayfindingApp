import React, { useRef, useEffect, useState } from 'react';
import UnityView from '@azesmway/react-native-unity';
import { View } from 'react-native';
import * as utils from './GlobalVariables';
import { getAccelerometerData, getMagnetData, getSpeedData, getVelocityData } from './Sensors'

interface UnityAppProps {}

const UnityApp: React.FC<UnityAppProps> = () => {
  const unityRef = useRef<UnityView>(null);
  // const FREQUENCY_MHZ = 1 / 100000; // 100 ms = 1/100000 MHz (beacons should be 100 ms)

  //const [origin, setOrigin] = useState<string>('TN258'); // Initial origin
  // let testBeaconArray: Array<{ beaconNum: number, rssi: number }> = [
  //   { beaconNum: 1, rssi: -60 },  // default values used for testing
  //   { beaconNum: 2, rssi: -65 },
  // ];;

  useEffect(() => {
    const intervalId = setInterval(() => {
      //collect data from accelerometer and gyroscope from Sensors.tsx
      //let acceleration = getAccelerometerData();
      //let velocity = getVelocityData();
      let currentSpeed = getSpeedData();
      //let magnetometer = getMagnetData();

      // Change the origin every few seconds
      //const newOrigin = getNextOrigin(); // Implement getNextOrigin as needed
      //console.log('newOrigin:', newOrigin); //check the origin
      //setOrigin(newOrigin);

      // let beaconID1 = null;
      // let beaconDist1 = null;
      // const beaconArray = utils.getBeaconArray();  //get the beacon array from GlobalVariables.tsx
      // if (beaconArray && beaconArray.length > 0) {
      //   let beacon1 = beaconArray[0];
      //   beaconID1 = beacon1.beaconNum; //get the first beacon's ID from the beacon
      //   // Formula to calculate distance from rssi: 10^((27.55-(20*log10(frequency))+Math.abs(RSSI))/20) where frequency is in MHz, and RSSI is in dBm
      //   beaconDist1 = Math.pow(10, (27.55 - (20 * Math.log10(FREQUENCY_MHZ)) + Math.abs(beacon1.rssi)) / 20);
      // } else {
      //   console.log('Invalid or empty beaconArray (using test array)');
      //   let beacon1 = testBeaconArray[0];
      //   beaconID1 = beacon1.beaconNum; //get the first beacon's ID from the beacon
      //   // Formula to calculate distance from rssi: 10^((27.55-(20*log10(frequency))+Math.abs(RSSI))/20) where frequency is in MHz, and RSSI is in dBm
      //   //beaconDist1 = Math.pow(10, (27.55 - (20 * Math.log10(FREQUENCY_MHZ)) + Math.abs(beacon1.rssi)) / 20);
      //   beaconDist1 = Math.pow(10, ((-59 - beacon1.rssi)) / (10 * 2));
      // }

      // Send updated data to Unity (variables end in R to show they come from React Native)
      SendData({
        origin: utils.getOrigin(),  //newOrigin, 'TN255', '7','8'
        destination: utils.getDestination(), //utils.getDestination()
        beacon1: utils.getClosestBeacon(), //utils.getClosestBeacon()  //beaconID1 is from beaconArray with the closest beacons
        accessibility: utils.getAccessibleRoute(),
        floor: utils.getFloor(),
        speed: currentSpeed,
      });
    }, 500); // send data to the Unity model every 0.5 seconds (500 ms)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);  //[origin]

  async function SendData(data: any) {
    // This is the main function postMessage takes 3 arguments:
    // ReactToUnity is the game Object
    // GetData is the function name we will send the data to in Unity, depends on hierarchy.
    // data is the data we will send.
    unityRef.current?.postMessage('ReactToUnity', 'GetData', JSON.stringify(data));
    //console.log("sent: " + JSON.stringify(data))
    console.log("sent at", new Date().toLocaleTimeString(), JSON.stringify(data));
    //console.log("beacon array global value", JSON.stringify(utils.getBeaconArray));
  }

  // function getNextOrigin(): string {
  //   const origins = ['TN258', 'TN270', 'TN268', 'TN265','TN250', 'TN247', 'TN246']; // cycle through array of origins
  //   const currentIndex = origins.indexOf(origin);
  //   const nextIndex = (currentIndex + 1) % origins.length; // mod to avoid index out of bounds
  //   return origins[nextIndex];
  // }

  return (
    <View style={{ flex: 1 }}>
      <UnityView
        ref={unityRef}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: 1,
          bottom: 1,
        }}
        // result: UnityMessage
        onUnityMessage={(result) => {
          console.log('Message Here: ', result.nativeEvent.message);
        }}
      />
    </View>
  );
};

export default UnityApp;
