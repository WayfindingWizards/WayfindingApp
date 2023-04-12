import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import {styles} from './Styles';
import * as utils from './GlobalVariables';
import {InvalidDestinationPopup, NoStartPopup, BathroomPopup} from './Popups';
import { findRoom } from './FindRoom';
import useBLE from './useBLE';

const App: React.FC = () => {
  const backgroundImage = 'AwesomeProject/images/Asset5.png';
  const stomperImage = 'AwesomeProject/images/Asset7.png';
  const soundImageDisabledImage = 'AwesomeProject/images/Asset8.png';
  const soundImageEnabledImage = 'AwesomeProject/images/Asset10.png';
  const accessibilityImageDisabledImage = 'AwesomeProject/images/Asset2.png';
  const accessibilityImageEnabledImage = 'AwesomeProject/images/Asset9.png';

  const [userDestination, setUserDestination] = useState(''); {/*used to change input box as user types in destination*/}
  const [accessibilityButtonClick, setAccessibilityButtonClick] = useState(false);
  const [soundButtonClick, setSoundButtonClick] = useState(false);
  const [noStartPopup, setNoStartPopupVisible] = useState<boolean>(false);
  const [invalidDestinaitonPopup, setInvalidDestinaitonPopupVisible] = useState<boolean>(false);
  const [bathroomPopup, setBathroomPopupVisible] = useState<boolean>(false);
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
    const roomFound: boolean = findRoom(userDestination);
    scanForDevices();

    if (!roomFound&& userDestination!='Bathroom') {
      utils.setDestination(userDestination);
      setInvalidDestinaitonPopupVisible(true);
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

  const handleButtonClickSound = () => {
    setSoundButtonClick(!soundButtonClick);
  };

  const handleButtonClickAccessibility = () => {
    setAccessibilityButtonClick(!accessibilityButtonClick);
    utils.setAccessibleRoute(!utils.getAccessibleRoute());
  };

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
          <Image
            id = 'stomperImage'
            source={require(stomperImage)}
            style={styles.image}
          />
        </View>
      )}
      {utils.getMapVisible() && (
        <View testID = 'mapVisiblePage'>
          <Text style={styles.text}>Map Visible</Text>
        </View>
      )}
      {/* accessibility and sound buttons */}
      <TouchableOpacity
        testID = 'accessibilityButton'
        style={[
          styles.accessibilityButton,
          accessibilityButtonClick
            ? styles.circleButtonClicked
            : styles.circleButtonUnclicked,
        ]}
        onPress={handleButtonClickAccessibility}>
        <Image
          source={
            accessibilityButtonClick
              ? require(accessibilityImageEnabledImage)
              : require(accessibilityImageDisabledImage)
          }
          style={styles.wheelchairImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        testID = 'soundButton'
        style={[
          styles.soundButton,
          soundButtonClick
            ? styles.circleButtonClicked
            : styles.circleButtonUnclicked,
        ]}
        onPress={handleButtonClickSound}>
        <Image
          source={
            soundButtonClick
              ? require(soundImageEnabledImage)
              : require(soundImageDisabledImage)
          }
          style={
            soundButtonClick
              ? styles.soundImageEnabled
              : styles.soundImageDisabled
          }
        />
      </TouchableOpacity>
      {/* destination input and go button */}
      <View style={styles.navigation} id = 'navigationContainer'>
        <View style={styles.inputBox} id = 'destinationInputBox'>
          <TextInput
            testID = 'destinationInput'
            style={
              isGoButtonEnabled() ? styles.inputEnabled : styles.inputDisabled
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
              style={[
                styles.goButton,
                userDestination
                  ? styles.goButtonEnabled
                  : styles.buttonDisabled,
              ]}
              disabled={!userDestination}
              onPress={handleGoButtonPress}>
              <Text style={styles.goButtonText}>GO</Text>
            </TouchableOpacity>
          )}
          {utils.getMapVisible() && (
            <TouchableOpacity
              testID = 'startOverButton'
              style={[
                styles.goButton,
                userDestination
                  ? styles.goButtonEnabled
                  : styles.buttonDisabled,
              ]}
              disabled={!userDestination}
              onPress={handleStartOverButtonPress}>
              <Text style={styles.startOverButtonText}>Start Over</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* displays popups if condition is true */}
      {noStartPopup && (
        <NoStartPopup
          testID = 'noStartPopup'
          modalVisible={noStartPopup}
          setModalVisible={setNoStartPopupVisible}
        />
      )}
      {invalidDestinaitonPopup && (
        <InvalidDestinationPopup
          testID = 'invalidDestinationPopup'
          modalVisible={invalidDestinaitonPopup}
          setModalVisible={setInvalidDestinaitonPopupVisible}
        />
      )}
      {bathroomPopup && (
        <BathroomPopup
          testID = 'bathroomPopup'
          modalVisible={bathroomPopup}
          setModalVisible={setBathroomPopupVisible}
        />
      )}
    </ImageBackground>
  );
};
export default App;