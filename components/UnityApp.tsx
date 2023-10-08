import React, { useRef, useEffect, useState } from 'react';
import UnityView from '@azesmway/react-native-unity';
import { View } from 'react-native';
import * as utils from './GlobalVariables';

interface UnityAppProps {}

const UnityApp: React.FC<UnityAppProps> = () => {
  const unityRef = useRef<UnityView>(null);
  const [origin, setOrigin] = useState<string>('TN258'); // Initial origin

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Change the origin every few seconds
      const newOrigin = getNextOrigin(); // Implement getNextOrigin as needed
      console.log('newOrigin:', newOrigin); //check the origin
      setOrigin(newOrigin);

      // Send updated data to Unity
      SendData({
        originR: newOrigin,
        destinationR: 'TN255', //utils.getDestination()
        beaconID1R: '21', //utils.getClosestBeacon()
        distance1R: '5',
      });
    }, 4000); //4 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [origin]);

  async function SendData(data: any) {
    // This is the main function postMessage takes 3 arguments:
    // ReactToUnity is the game Object
    // GetDatas is the function name we will send the data to in Unity depends on hierarchy.
    // data is the data we will send.
    unityRef.current?.postMessage('ReactToUnity', 'GetDatas', JSON.stringify(data));
    //console.log("sent: " + JSON.stringify(data))
    console.log("sent at", new Date().toLocaleTimeString(), JSON.stringify(data));
  }

  function getNextOrigin(): string {
    // Implement your logic to get the next origin value
    // For example, you can have an array of origins and cycle through them.
    // Ensure to handle the logic to avoid index out of bounds.
    const origins = ['TN258', 'TN270', 'TN268', 'TN265','TN250', 'TN247', 'TN246']; // Add more origins as needed
    const currentIndex = origins.indexOf(origin);
    const nextIndex = (currentIndex + 1) % origins.length;
    return origins[nextIndex];
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
