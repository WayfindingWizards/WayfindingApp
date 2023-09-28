import React, { useRef, useEffect } from 'react';
import UnityView, { UnityMessage } from '@azesmway/react-native-unity';
import { View } from 'react-native';

interface UnityAppProps {}

const UnityApp: React.FC<UnityAppProps> = () => {
  const unityRef = useRef<UnityView>(null);

  useEffect(() => {
    SendData(jsonedData);
  }, []);

  // delay function helps us control when to send the data to Unity in ms.
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

  const unityData = {
    name: "I'm Stepa",
    age: 25,
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
        onUnityMessage={(result: UnityMessage) => {
          console.log('Message Here: ', result.nativeEvent.message);
        }}
      />
    </View>
  );
};

export default UnityApp;