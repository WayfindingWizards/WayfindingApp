import React, {useState} from 'react';
import {TouchableOpacity,Image} from 'react-native';
import { accessibilityStyles } from '../styles/AccessibilityButtonStyles';
import * as utils from './GlobalVariables';

export interface AccessButtonProps {
}

  export const AccessibleRouteButton: React.FC<AccessButtonProps> = ({
  }) => {

    const accessibilityDisabledImage = '../images/access_disabled.png';
    const accessibilityEnabledImage = '../images/access_enabled.png';
    const [accessibilityButtonClick, setAccessibilityButtonClick] = useState(false);

    const handleButtonClickAccessibility = () => {
      setAccessibilityButtonClick(!accessibilityButtonClick); //set to false by default on line 14
      utils.setAccessibleRoute(!utils.getAccessibleRoute()); //flips accessible route global state
    };
  
    return(
      <TouchableOpacity
      style={[accessibilityStyles.accessibilityButton, accessibilityButtonClick ? accessibilityStyles.circleButtonClicked : accessibilityStyles.circleButtonUnclicked]}
      onPress={handleButtonClickAccessibility}>
      <Image source={ accessibilityButtonClick ? require(accessibilityEnabledImage) : require(accessibilityDisabledImage)}
        style={accessibilityButtonClick ? accessibilityStyles.wheelchairImage : accessibilityStyles.wheelchairImageDisabled}
      />
      </TouchableOpacity>
    )
  }

  export const SoundButton: React.FC<AccessButtonProps> = ({
   }) => {
 
    const soundDisabledImage = '../images/sound_disabled.png';
    const soundEnabledImage = '../images/sound_enabled.png';
    const [soundButtonClick, setSoundButtonClick] = useState(false);
 
     const handleButtonClickSound = () => {
      setSoundButtonClick(!soundButtonClick); //set to false by default on line 37
      utils.setSound(!utils.getSound()); //flips global sound state
    };
   
     return(
      <TouchableOpacity
      testID = 'soundButton'
      style={[accessibilityStyles.soundButton,soundButtonClick ? accessibilityStyles.circleButtonClicked : accessibilityStyles.circleButtonUnclicked]}
      onPress={handleButtonClickSound}>
      <Image source={soundButtonClick? require(soundEnabledImage) : require(soundDisabledImage)}
        style={soundButtonClick ? accessibilityStyles.soundImageEnabled : accessibilityStyles.soundVoiceImageDisabled}
      />
    </TouchableOpacity>
     )
   }

   export const VoiceCommandButton: React.FC<AccessButtonProps> = ({
   }) => {
 
    const voiceCommandButtonDisabledImage = '../images/mic_disabled.png';
    const voiceCommandButtonEnabledImage = '../images/mic_enabled.png';
    const [voiceCommandButtonClick, setVoiceCommandButtonClick] = useState(false);
 
     const handleButtonClickVoiceCommand = () => {
      setVoiceCommandButtonClick(!voiceCommandButtonClick); //set to false by default on line 61
      utils.setVoiceCommands(!utils.getVoiceCommands()); //flips global voice commands state
    }

     return(
      <TouchableOpacity
          style={[accessibilityStyles.voiceCommandButton, voiceCommandButtonClick ? accessibilityStyles.circleButtonClicked : accessibilityStyles.circleButtonUnclicked]}
          onPress={handleButtonClickVoiceCommand}>
          <Image source={voiceCommandButtonClick? require(voiceCommandButtonEnabledImage) : require(voiceCommandButtonDisabledImage)}
          style={voiceCommandButtonClick ? accessibilityStyles.voiceCommandImageEnabled : accessibilityStyles.soundVoiceImageDisabled}
        />
        </TouchableOpacity>
     )
   }