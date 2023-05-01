import React, {useState,useEffect} from 'react';
import {View,TextInput,TouchableOpacity,Text,Image,ImageBackground,KeyboardAvoidingView,Platform} from 'react-native';
import {baseStyles} from '../styles/BaseStyles';
import { accessibilityStyles } from '../styles/AccessibilityButtonStyles';
import * as utils from './GlobalVariables';
import {InvalidDestinationPopup, NoStartPopup, BathroomPopup, HelpPopup} from './Popups';
import { findRoom } from './FindRoom';
import { AccessibleRouteButton, SoundButton, VoiceCommandButton } from './AccessibilityButtons';
import useBLE from './useBLE';


const App: React.FC = () => {
  const backgroundImage = 'AwesomeProject/images/app_background.png';
  const stomperImage = 'AwesomeProject/images/stomper.png';

  const [userDestination, setUserDestination] = useState(''); {/*used to change input box as user types in destination*/}
  const [noStartPopup, setNoStartPopupVisible] = useState<boolean>(false);
  const [invalidDestinatonPopup, setInvalidDestinationPopupVisible] = useState<boolean>(false);
  const [bathroomPopup, setBathroomPopupVisible] = useState<boolean>(false);
  const [helpPopup, setHelpPopupVisible] = useState<boolean>(false);
  const [render, setRender] = useState(false); {/*used to manually rerender the app when necessary*/}
  const {requestPermissions, scanForPeripherals, closestBeacon} = useBLE();

  const ViewComponent = Platform.OS === 'ios' ? KeyboardAvoidingView : View; //manage difference in keyboardAvoiding in ios and android

  useEffect(() => {
    scanForDevices();
    console.log(utils.getClosestBeacon()); //scans for devices when app is rendered and running
  }, [] );

  const scanForDevices = () => {
    requestPermissions((isGranted: boolean) => {
      if (isGranted) {
        scanForPeripherals();
      }
  });
}

  const isGoButtonEnabled = () => {
    if (!userDestination) return false;
    else if (utils.getMapVisible()) return false;
    return true;
  };
  
  const handleGoButtonPress = () => {
    const roomFound: boolean = findRoom(userDestination);

    if (!roomFound&& userDestination!='Bathroom') {
      utils.setDestination(userDestination); // sets destination global to userDestination
      setInvalidDestinationPopupVisible(true); //set to false by default on line 23
    } else if (utils.getClosestBeacon() == -1 && !utils.getOrigin()) { //checks to see if beacons have found origin
      utils.setDestination(userDestination); //sets destination global to userDestination
      setNoStartPopupVisible(true); //set to false by default on line 22
    } else if (userDestination === 'Bathroom' && !utils.getIsBathroomSet()) {
      setBathroomPopupVisible(true); //set to false by default on line 24
    } else { {/*if destination is valid*/}
      utils.setDestination(userDestination); //sets destination global to user destination
      utils.setMapVisible(true); //sets mapVisible global to true
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
      {/*home screen visible*/}
      {!utils.getMapVisible() && (
        <View testID = 'homePage'>
          <Text id = 'welcomeText' style={baseStyles.welcomeText}>Welcome To MNSU Wayfinder!</Text>
          <Image
            id = 'stomperImage'
            source={require(stomperImage)}
            style={baseStyles.stomperImage}
          />
        </View>
      )}
      {/*map visible*/}
      {utils.getMapVisible() && (
        <View testID = 'mapVisiblePage'>
          {/*map image*/}
          <ImageBackground source={require('../images/model_image.png')} style = {baseStyles.modelImage}>
              {/*closest beacon container*/}
              <View style = {baseStyles.closestBeaconContainer}>
                  <Text style = {baseStyles.closestBeaconText}>Closest Beacon:</Text>
                  <Text style = {[baseStyles.closestBeaconText,{fontSize: 40}]}>{utils.getClosestBeacon()}</Text>
             </View>
          </ImageBackground>
          
        </View>
      )}
      {/* accessibility and sound buttons */}
      <TouchableOpacity
        style={[accessibilityStyles.helpButton, accessibilityStyles.circleButtonUnclicked]}
        onPress={handleHelpButtonPress}>
        <Text style={accessibilityStyles.helpButtonText}>?</Text>
      </TouchableOpacity>
      
        <AccessibleRouteButton></AccessibleRouteButton>
        <SoundButton></SoundButton>
        <VoiceCommandButton></VoiceCommandButton>

      {/* destination input and go button */}
      <ViewComponent style={baseStyles.navigationContainer} id = 'navigationContainer' behavior="padding">

        <View style={baseStyles.destinationInputBox} id = 'destinationInputBox'>
          <TextInput
            testID = 'destinationInput'
            style={
              isGoButtonEnabled() ? baseStyles.inputEnabled : baseStyles.inputDisabled //disables input if start over button is displayed
            }
            placeholder="Enter Destination"
            placeholderTextColor="#CCCCCC"
            onChangeText={setUserDestination}
            value={userDestination}
            editable={!utils.getMapVisible()} // is editable if global map visible is false
          />
        </View>

        {/*Determines if go button or start over button is displayed*/}
        <View>
        {/*displays go button when home screen is visible*/}
        {!utils.getMapVisible() && (
            <TouchableOpacity
              testID = 'goButton'
              style={[baseStyles.goButton, userDestination ? baseStyles.goButtonEnabled : baseStyles.buttonDisabled]}
              disabled={!userDestination} //disabled if destination is empty
              onPress={handleGoButtonPress}>
              <Text style={baseStyles.goButtonText}>GO</Text>
            </TouchableOpacity>
          )}

          {/*displays start over button when map is visible*/}
          {utils.getMapVisible() && (
            <TouchableOpacity
              testID = 'startOverButton'
              style={[baseStyles.goButton,userDestination ? baseStyles.goButtonEnabled : baseStyles.buttonDisabled]}
              disabled={!userDestination} //disabled if userDestination is empty
              onPress={handleStartOverButtonPress}>
              <Text style={baseStyles.startOverButtonText}>Start Over</Text>
            </TouchableOpacity>
          )}
        </View>

      </ViewComponent>
      {/* displays popups if popup is set to true in the go button handler*/}
      {helpPopup && (<HelpPopup modalVisible={helpPopup} setModalVisible={setHelpPopupVisible}/>)}
      {noStartPopup && (<NoStartPopup modalVisible={noStartPopup} setModalVisible={setNoStartPopupVisible}/>)}
      {invalidDestinatonPopup && (<InvalidDestinationPopup modalVisible={invalidDestinatonPopup} setModalVisible={setInvalidDestinationPopupVisible}/>)}
      {bathroomPopup && (<BathroomPopup modalVisible={bathroomPopup} setModalVisible={setBathroomPopupVisible}/>) }  
    </ImageBackground>
  );
};
export default App;
