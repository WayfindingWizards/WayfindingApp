import React, {useState} from 'react';
import {View,TextInput,TouchableOpacity,Text,Image,ImageBackground,KeyboardAvoidingView,Platform} from 'react-native';
import {baseStyles} from '../styles/BaseStyles';
import { accessibilityStyles } from '../styles/AccessibilityButtonStyles';
import * as utils from './GlobalVariables';
import {InvalidDestinationPopup, NoStartPopup, BathroomPopup, HelpPopup} from './Popups';
import { findRoom } from './FindRoom';
import { AccessibleRouteButton, SoundButton, VoiceCommandButton } from './AccessibilityButtons';

const App: React.FC = () => {
  const backgroundImage = 'AwesomeProject/images/app_background.png';
  const stomperImage = 'AwesomeProject/images/stomper.png';

  const [userDestination, setUserDestination] = useState(''); {/*used to change input box as user types in destination*/}
  const [noStartPopup, setNoStartPopupVisible] = useState<boolean>(false);
  const [invalidDestinatonPopup, setInvalidDestinationPopupVisible] = useState<boolean>(false);
  const [bathroomPopup, setBathroomPopupVisible] = useState<boolean>(false);
  const [helpPopup, setHelpPopupVisible] = useState<boolean>(false);
  const [render, setRender] = useState(false); {/*used to manually rerender the app when necessary*/}

  const ViewComponent = Platform.OS === 'ios' ? KeyboardAvoidingView : View; //manage difference in keyboardAvoiding in ios and android

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
    } else if (!utils.getOrigin()) { //checks to see if beacons have found origin
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
          <Text id = 'welcomeText' style={baseStyles.text}>Welcome To MNSU Wayfinder!</Text>
          <Image
            id = 'stomperImage'
            source={require(stomperImage)}
            style={baseStyles.image}
          />
        </View>
      )}
      
      {/*map visible*/}
      {utils.getMapVisible() && (
        <View testID = 'mapVisiblePage'>
          <Image source={require('AwesomeProject/images/model_image.png')} style = {baseStyles.modelImage}></Image>
        </View>)}
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
      <ViewComponent style={baseStyles.navigation} id = 'navigationContainer' behavior="padding">

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
              disabled={!userDestination}
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
