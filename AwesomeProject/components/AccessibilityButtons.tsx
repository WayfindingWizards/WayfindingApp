import React, {useState} from 'react';
import {View,TextInput,TouchableOpacity,Text,Image,ImageBackground,} from 'react-native';
import {baseStyles} from '../styles/BaseStyles';
import { accessibilityStyles } from '../styles/AccessibilityButtonStyles';
import * as utils from './GlobalVariables';

export interface AccessButtonProps {
    ID: string;
}

  export const AccessibleRouteButton: React.FC<AccessButtonProps> = ({
   ID
  }) => {

    const accessibilityImageDisabledImage = 'AwesomeProject/images/access_disabled.png';
    const accessibilityImageEnabledImage = 'AwesomeProject/images/Asset9.png';
    const [accessibilityButtonClick, setAccessibilityButtonClick] = useState(false);

    const handleButtonClickAccessibility = () => {
      setAccessibilityButtonClick(!accessibilityButtonClick);
      utils.setAccessibleRoute(!utils.getAccessibleRoute());
    };
  
    return(
      <TouchableOpacity
      testID = 'accessibilityButton'
      style={[accessibilityStyles.accessibilityButton, accessibilityButtonClick ? accessibilityStyles.circleButtonClicked : accessibilityStyles.circleButtonUnclicked]}
      onPress={handleButtonClickAccessibility}>
      <Image source={ accessibilityButtonClick ? require(accessibilityImageEnabledImage) : require(accessibilityImageDisabledImage)}
        style={accessibilityButtonClick ? accessibilityStyles.wheelchairImage : accessibilityStyles.wheelchairImageDisabled}
      />
      </TouchableOpacity>
    )
  }

  export const SoundButton: React.FC<AccessButtonProps> = ({
    ID
   }) => {
 
    const soundImageDisabledImage = 'AwesomeProject/images/Asset8.png';
    const soundImageEnabledImage = 'AwesomeProject/images/Asset10.png';
     const [soundButtonClick, setSoundButtonClick] = useState(false);
 
     const handleButtonClickSound = () => {
      setSoundButtonClick(!soundButtonClick);
    };
   
     return(
      <TouchableOpacity
      testID = 'soundButton'
      style={[accessibilityStyles.soundButton,soundButtonClick ? accessibilityStyles.circleButtonClicked : accessibilityStyles.circleButtonUnclicked]}
      onPress={handleButtonClickSound}>
      <Image source={soundButtonClick? require(soundImageEnabledImage) : require(soundImageDisabledImage)}
        style={soundButtonClick ? accessibilityStyles.soundImageEnabled : accessibilityStyles.soundVoiceImageDisabled}
      />
    </TouchableOpacity>
     )
   }

   export const VoiceCommandButton: React.FC<AccessButtonProps> = ({
    ID
   }) => {
 
    const voiceCommandButtonImageDisabled = 'AwesomeProject/images/mic_disabled.png';
    const voiceCommandButtonImageEnabled = 'AwesomeProject/images/mic_enabled.png';
    const [voiceCommandButtonClick, setVoiceCommandButtonClick] = useState(false);
 
     const handleButtonClickVoiceCommand = () => {
      setVoiceCommandButtonClick(!voiceCommandButtonClick);
    }

     return(
      <TouchableOpacity
          style={[accessibilityStyles.voiceCommandButton, voiceCommandButtonClick ? accessibilityStyles.circleButtonClicked : accessibilityStyles.circleButtonUnclicked]}
          onPress={handleButtonClickVoiceCommand}>
          <Image source={voiceCommandButtonClick? require(voiceCommandButtonImageEnabled) : require(voiceCommandButtonImageDisabled)}
          style={voiceCommandButtonClick ? accessibilityStyles.voiceCommandImageEnabled : accessibilityStyles.soundVoiceImageDisabled}
        />
        </TouchableOpacity>
     )
   }