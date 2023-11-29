import React, { useRef, useEffect, useState } from 'react';
import UnityView from '@azesmway/react-native-unity';
import { View } from 'react-native';
import * as utils from './GlobalVariables';
import {getSpeedData} from './Sensors'

interface UnityAppProps {}
const sendInterval = 100; // send data to the Unity model every so often (100 = 100 ms = 0.1 s)

const UnityApp: React.FC<UnityAppProps> = () => {
  const unityRef = useRef<UnityView>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let currentSpeed = getSpeedData();

      // Send updated data to Unity
      SendData({
        origin: utils.getOrigin(), 
        destination: utils.getDestination(), 
        beacon1: utils.getClosestBeacon(), 
        accessibility: utils.getAccessibleRoute(),
        floor: utils.getFloor(),
        speed: currentSpeed,
      });
    }, sendInterval);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 

  async function SendData(data: any) {
    // This is the main function postMessage takes 3 arguments:
    // ReactToUnity is the game Object
    // GetData is the method name that will receive the data in Unity (in script attached to ReactToUnity)
    // data is the data being sent.
    unityRef.current?.postMessage('ReactToUnity', 'GetData', JSON.stringify(data));
    console.log("sent at", new Date().toLocaleTimeString(), JSON.stringify(data));
  }

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
