import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import {baseStyles} from '../styles/BaseStyles';
import { accessibilityStyles } from '../styles/AccessibilityButtonStyles';
import * as utils from './GlobalVariables';
import {InvalidDestinationPopup, NoStartPopup, BathroomPopup, HelpPopup} from './Popups';
import { findRoom } from './FindRoom';
import { AccessibleRouteButton, SoundButton, VoiceCommandButton } from './AccessibilityButtons';

const App: React.FC = () => {
  const backgroundImage = 'AwesomeProject/images/Asset5.png';
  const stomperImage = 'AwesomeProject/images/Asset7.png';

  const [userDestination, setUserDestination] = useState(''); {/*used to change input box as user types in destination*/}
  const [accessibilityButtonClick, setAccessibilityButtonClick] = useState(false);
  const [soundButtonClick, setSoundButtonClick] = useState(false);
  const [noStartPopup, setNoStartPopupVisible] = useState<boolean>(false);
  const [invalidDestinatonPopup, setInvalidDestinationPopupVisible] = useState<boolean>(false);
  const [bathroomPopup, setBathroomPopupVisible] = useState<boolean>(false);
  const [helpPopup, setHelpPopupVisible] = useState<boolean>(false);
  const [render, setRender] = useState(false); {/*used to manually rerender the app when necessary*/}

  const isGoButtonEnabled = () => {
    if (!userDestination) return false;
    else if (utils.getMapVisible()) return false;
    return true;
  };

  const handleGoButtonPress = () => {
    const roomFound: boolean = findRoom(userDestination);

    if (!roomFound&& userDestination!='Bathroom') {
      utils.setDestination(userDestination);
      setInvalidDestinationPopupVisible(true);
    } else if (!utils.getOrigin()) { //checks to see if beacons have found origin
      utils.setDestination(userDestination);
      setNoStartPopupVisible(true);
    } else if (userDestination === 'Bathroom' && !utils.getIsBathroomSet()) {
      setBathroomPopupVisible(true);
    } else { {/*if destination is valid*/}
      utils.setDestination(userDestination);
      utils.setMapVisible(true);
      setRender(!render); {/*app wasn't rerendering so map wasn't showing, needed manual rerender*/}
    }
  };

  const handleStartOverButtonPress = () => {
    utils.reset();
    setUserDestination('');
  };

  const handleHelpButtonPress = () => {
    setHelpPopupVisible(true);
  }

  return (
    //background image
    <ImageBackground
      testID = 'backgroundImage'
      source={require(backgroundImage)}
      style={baseStyles.background}>
      {/* Determines if home screen or map screen is displayed*/}
      {!utils.getMapVisible() && (
        <View testID = 'homePage'>
          <Text id = 'welcomeText' style={baseStyles.text}>Welcome To MNSU Wayfinder!</Text>
          <Image
            id = 'stomperImage'
            source={require(stomperImage)}
            style={baseStyles.image}
          />
        </View>
      )}
      {utils.getMapVisible() && (
        <View testID = 'mapVisiblePage'>
          <Image source={require('AwesomeProject/images/model.png')} style = {baseStyles.modelImage}></Image>
        </View>
      )}
      {/* accessibility and sound buttons */}
      <TouchableOpacity
        style={[accessibilityStyles.helpButton, accessibilityStyles.circleButtonUnclicked]}
        onPress={handleHelpButtonPress}>
        <Text style={accessibilityStyles.helpButtonText}>?</Text>
      </TouchableOpacity>
      <AccessibleRouteButton ID='accessibility button'></AccessibleRouteButton>
      <SoundButton ID='soundButton'></SoundButton>
      <VoiceCommandButton ID='voice command button'></VoiceCommandButton>

      {/* destination input and go button */}
      <View style={baseStyles.navigation} id = 'navigationContainer'>
        <View style={baseStyles.inputBox} id = 'destinationInputBox'>
          <TextInput
            testID = 'destinationInput'
            style={
              isGoButtonEnabled() ? baseStyles.inputEnabled : baseStyles.inputDisabled
            }
            placeholder="Enter Destination"
            placeholderTextColor="#CCCCCC"
            onChangeText={setUserDestination}
            value={userDestination}
            editable={!utils.getMapVisible()}
          />
        </View>

        {/*Determines if go button or start over button is displayed*/}
        <View>
        {!utils.getMapVisible() && (
            <TouchableOpacity
              testID = 'goButton'
              style={[baseStyles.goButton, userDestination ? baseStyles.goButtonEnabled : baseStyles.buttonDisabled]}
              disabled={!userDestination} //disabled if destination is empty
              onPress={handleGoButtonPress}>
              <Text style={baseStyles.goButtonText}>GO</Text>
            </TouchableOpacity>
          )}
          {utils.getMapVisible() && (
            <TouchableOpacity
              testID = 'startOverButton'
              style={[baseStyles.goButton,userDestination ? baseStyles.goButtonEnabled : baseStyles.buttonDisabled]}
              disabled={!userDestination}
              onPress={handleStartOverButtonPress}>
              <Text style={baseStyles.startOverButtonText}>Start Over</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* displays popups if condition is true */}
      {helpPopup && (<HelpPopup modalVisible={helpPopup} setModalVisible={setHelpPopupVisible}/>)}
      {noStartPopup && (<NoStartPopup modalVisible={noStartPopup} setModalVisible={setNoStartPopupVisible}/>)}
      {invalidDestinatonPopup && (<InvalidDestinationPopup modalVisible={invalidDestinatonPopup} setModalVisible={setInvalidDestinationPopupVisible}/>)}
      {bathroomPopup && (<BathroomPopup modalVisible={bathroomPopup} setModalVisible={setBathroomPopupVisible}/>) }  
    </ImageBackground>
  );
};
export default App;