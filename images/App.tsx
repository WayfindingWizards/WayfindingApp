import React, {useState} from 'react';
import {View,TextInput,TouchableOpacity,Text,Image,ImageBackground,} from 'react-native';
import {styles} from '../styles/Styles';
import * as utils from '../components/GlobalVariables';
import {InvalidDestinationPopup, NoStartPopup, BathroomPopup, HelpPopup} from '../components/Popups';
import { findRoom } from '../components/FindRoom';
import Video from 'react-native-video';
import useBLE from './useBLE';

const App: React.FC = () => {
  const backgroundImage = 'AwesomeProject/images/Asset5.png';
  const stomperImage = 'AwesomeProject/images/Asset7.png';
  const soundImageDisabledImage = 'AwesomeProject/images/Asset8.png';
  const soundImageEnabledImage = 'AwesomeProject/images/Asset10.png';
  const accessibilityImageDisabledImage = 'AwesomeProject/images/access_disabled.png';
  const accessibilityImageEnabledImage = 'AwesomeProject/images/Asset9.png';
  const voiceCommandButtonImageDisabled = 'AwesomeProject/images/mic_disabled.png';
  const voiceCommandButtonImageEnabled = 'AwesomeProject/images/mic_enabled.png';

  const [userDestination, setUserDestination] = useState(''); {/*used to change input box as user types in destination*/}
  const [accessibilityButtonClick, setAccessibilityButtonClick] = useState(false);
  const [voiceCommandButtonClick, setVoiceCommandButtonClick] = useState(false);
  const [soundButtonClick, setSoundButtonClick] = useState(false);
  const [noStartPopup, setNoStartPopupVisible] = useState<boolean>(false);
  const [invalidDestinaitonPopup, setInvalidDestinaitonPopupVisible] = useState<boolean>(false);
  const [bathroomPopup, setBathroomPopupVisible] = useState<boolean>(false);
  const [helpPopup, setHelpPopupVisible] = useState<boolean>(false);
  const [render, setRender] = useState(false); {/*used to manually rerender the app when necessary*/}
  const {requestPermissions, scanForPeripherals, closestBeacon} = useBLE();

  // I think this needs to be called once and continues to scan and update closestBeacon
  const scanForDevices = () => {
    requestPermissions(isGranted => {
      if (isGranted) {
        scanForPeripherals();
      }
    });
  };

  const isGoButtonEnabled = () => {
    if (!userDestination) return false;
    else if (utils.getMapVisible()) return false;
    return true;
  };

  const handleGoButtonPress = () => {
    const roomFound: boolean = findRoom(userDestination); // calls roomFound function in FindRoom.tsx
    scanForDevices();

    if (!roomFound&& userDestination!='Bathroom') { 
      utils.setDestination(userDestination); // sets global destination variable to local destination variable
      setInvalidDestinaitonPopupVisible(true); //default set to false on line 20
    } else if (!utils.getOrigin()) { //checks to see if beacons have found origin
      utils.setDestination(userDestination); // see line 34
      setNoStartPopupVisible(true); //default set to false on line 19
    } else if (userDestination === 'Bathroom' && !utils.getIsBathroomSet()) {
      setBathroomPopupVisible(true); //default set to false on line 21
    } else { {/*if destination is valid*/}
      utils.setDestination(userDestination); // see line 34
      utils.setMapVisible(true); // sets global mapVisible variable to true
      setRender(!render); {/*app wasn't rerendering so map wasn't showing, needed manual rerender*/}
    }
  };

  const handleStartOverButtonPress = () => {
    utils.reset();
    setUserDestination('');
  };

  const handleButtonClickSound = () => {
    setSoundButtonClick(!soundButtonClick);
  };

  const handleButtonClickAccessibility = () => {
    setAccessibilityButtonClick(!accessibilityButtonClick);
    utils.setAccessibleRoute(!utils.getAccessibleRoute());
  };

  const handleButtonClickVoiceCommand = () => {
    setVoiceCommandButtonClick(!voiceCommandButtonClick);
  }

  const handleHelpButtonPress = () => {
    setHelpPopupVisible(true)
  }

  return (
    //background image
    <ImageBackground
      testID = 'backgroundImage'
      source={require(backgroundImage)}
      style={styles.background}>
      {/* Determines if home screen or map screen is displayed*/}
      {!utils.getMapVisible() && (
        <View testID = 'homePage'>
          <Text id = 'welcomeText' style={styles.text}>Welcome To MNSU Wayfinder!</Text>
          <Image id = 'stomperImage' source={require(stomperImage)} style={styles.image}/>
        </View>
      )}
      {utils.getMapVisible() && (
      <View>
        <Image source={require('AwesomeProject/images/model.png')} style={styles.modelImage}/>
      </View>
      )}
      {/* accessibility and sound buttons */}
      <TouchableOpacity
          style={[styles.helpButton, styles.circleButtonUnclicked]}
          onPress={handleHelpButtonPress}>
          <Text style={styles.helpButtonText}>?</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={[styles.voiceCommandButton, voiceCommandButtonClick ? styles.circleButtonClicked : styles.circleButtonUnclicked]}
          onPress={handleButtonClickVoiceCommand}>
          <Image source={voiceCommandButtonClick? require(voiceCommandButtonImageEnabled) : require(voiceCommandButtonImageDisabled)}
          style={voiceCommandButtonClick ? styles.voiceCommandImageEnabled : styles.soundVoiceImageDisabled}
        />
        </TouchableOpacity>
      <TouchableOpacity
        testID = 'accessibilityButton'
        style={[styles.accessibilityButton, accessibilityButtonClick ? styles.circleButtonClicked : styles.circleButtonUnclicked]}
        onPress={handleButtonClickAccessibility}>
        <Image source={ accessibilityButtonClick ? require(accessibilityImageEnabledImage) : require(accessibilityImageDisabledImage)}
          style={accessibilityButtonClick ? styles.wheelchairImage : styles.wheelchairImageDisabled}
        />
      </TouchableOpacity>
      <TouchableOpacity
        testID = 'soundButton'
        style={[styles.soundButton,soundButtonClick ? styles.circleButtonClicked : styles.circleButtonUnclicked]}
        onPress={handleButtonClickSound}>
        <Image source={soundButtonClick? require(soundImageEnabledImage) : require(soundImageDisabledImage)}
          style={soundButtonClick ? styles.soundImageEnabled : styles.soundVoiceImageDisabled}
        />
      </TouchableOpacity>
      {/* destination input and go button */}
      <View style={styles.navigation} id = 'navigationContainer'>
        <View style={styles.inputBox} id = 'destinationInputBox'>
          <TextInput
            testID = 'destinationInput'
            style={isGoButtonEnabled() ? styles.inputEnabled : styles.inputDisabled}
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
              style={[styles.goButton, userDestination ? styles.goButtonEnabled : styles.buttonDisabled]}
              disabled={!userDestination} //disabled if destination is empty
              onPress={handleGoButtonPress}>
              <Text style={styles.goButtonText}>GO</Text>
            </TouchableOpacity>
          )}
          {utils.getMapVisible() && (
            <TouchableOpacity
              testID = 'startOverButton'
              style={[styles.goButton,userDestination ? styles.goButtonEnabled : styles.buttonDisabled]}
              disabled={!userDestination}
              onPress={handleStartOverButtonPress}>
              <Text style={styles.startOverButtonText}>Start Over</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* displays popups if condition is true */}
      {helpPopup && <HelpPopup testID = 'noStartPopup' modalVisible={helpPopup} setModalVisible={setHelpPopupVisible}/>}
      {noStartPopup && (
        <NoStartPopup testID = 'noStartPopup' modalVisible={noStartPopup} setModalVisible={setNoStartPopupVisible}/>
      )}
      {invalidDestinaitonPopup && (
        <InvalidDestinationPopup testID = 'invalidDestinationPopup' modalVisible={invalidDestinaitonPopup} setModalVisible={setInvalidDestinaitonPopupVisible}/>
      )}
      {bathroomPopup && (
        <BathroomPopup testID = 'bathroomPopup' modalVisible={bathroomPopup} setModalVisible={setBathroomPopupVisible}/> //shows bathroom popup
      )}
    </ImageBackground>
  );
};
export default App;