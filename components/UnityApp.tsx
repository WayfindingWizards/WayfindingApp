import React, { useRef, useEffect } from 'react';
import UnityView from '@azesmway/react-native-unity';
import { View } from 'react-native';
//import UnityMessage from '@azesmway/react-native-unity';
import * as utils from './GlobalVariables';

interface UnityAppProps {}

const UnityApp: React.FC<UnityAppProps> = () => {
  const unityRef = useRef<UnityView>(null);

  useEffect(() => {
    SendData(jsonedData);
  }, []);

  // delay function helps us control when to send the data to Unity in ms.
  // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); //old one
  const delay = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms));

  // Send Data function uses the main function that sends the data to Unity.
  // With the delay.
  async function SendData(data: any) {
    await delay(500);
    // This is the main function postMessage takes 3 arguments:
    // ReactToUnity is the game Object
    // GetDatas is the function name we will send the data to in Unity depends on hierarchy.
    // data is the data we will send.
    unityRef.current?.postMessage('ReactToUnity', 'GetDatas', data);
  }

  const unityData = { //send data from GlobalVariables.tsx to Unity
    originR: utils.getOrigin,
    destinationR: utils.getDestination,
    beaconID1R: utils.getClosestBeacon,
    distance1R: 5,
  };

  const jsonedData = JSON.stringify(unityData);

  return (
    <View style={{ flex: 1 }}>
      <UnityView
        ref={unityRef}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: 1,
          bottom: 1
        }}
        // result: UnityMessage
        onUnityMessage={(result) => { // previously used (result: UnityMessage)
          console.log('Message Here: ', result.nativeEvent.message);
        }}
      />
    </View>
  );
};

export default UnityApp;