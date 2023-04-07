import React, { useState } from 'react';
import { View, TextInput,TouchableOpacity, Text, Image, ImageBackground, Modal, } from 'react-native';
import {styles} from './Styles';

  export let destination: string;
  export let origin: string;
  export let bathroom: string;
  export let okButtonClick: boolean;

export interface CustomModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoStartPopup: React.FC<CustomModalProps> = ({ modalVisible, setModalVisible}) => {
  const [userOrigin, setUserOrigin] = useState('');

  const handleOkButtonClick = () => {
    okButtonClick = true;
    setModalVisible(!modalVisible)
    origin = userOrigin;
  }

  return(
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              We couldn't find you.
            </Text>
            <Text style={styles.modalText}>
              Please enter the closest room.
            </Text>
            <TextInput
              style={styles.modalTextContainer}
              placeholder="Room"
              placeholderTextColor="#BABABA"
              onChangeText={setUserOrigin}
              value={userOrigin}/>
            <TouchableOpacity
              style={styles.modalOkButton}
              onPress={handleOkButtonClick}>
              <Text style={styles.modalOkButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
  
const BathroomPopup: React.FC<CustomModalProps> = ({ modalVisible, setModalVisible}) => {
  const [userBathroom, setUserBathroom] = useState('');

  const handleOkButtonClick = () => {
    okButtonClick = true;
    setModalVisible(!modalVisible)
    bathroom = userBathroom;
  }

    return (
      <Modal animationType="fade" transparent visible={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Please select what type of bathroom you want.
            </Text>
            <View style={styles.bathroomButtonContainer}>
              <TouchableOpacity
                style={styles.bathroomButton}
                onPress={() => setUserBathroom('Mens Bathroom')}>
                <Text style={styles.modalOkButtonText}>Men</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bathroomButton}
                onPress={() => setUserBathroom('Womens Bathroom')}>
                <Text style={styles.modalOkButtonText}>Women</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.bathroomButton, styles.buttonDisabled]}
                disabled={true}
                onPress={() => setUserBathroom('All Gender')}>
                <Text style={styles.modalOkButtonText}>All Gender</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={styles.modalOkButton}
              onPress={handleOkButtonClick}>
              <Text style={styles.modalOkButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };


  const InvalidDestination: React.FC<CustomModalProps> = ({ modalVisible, setModalVisible}) => {
    
    const handleOkButtonClick = () => {
      okButtonClick = true;
      setModalVisible(!modalVisible)
    }

    return(
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Invalid Destination
            </Text>
            <Text style={styles.modalText}>
              Please enter a valid destination.
            </Text>
            <TouchableOpacity
              style={styles.modalOkButton}
              onPress={handleOkButtonClick}>
              <Text style={styles.modalOkButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  const App: React.FC = () => {
    var soundImageDisabled = "AwesomeProject/images/Asset8.png"
    var soundImageEnabled = "AwesomeProject/images/Asset10.png"
    var accessibilityImageDisabled = "AwesomeProject/images/Asset2.png"
    var accessibilityImageEnabled = "AwesomeProject/images/Asset9.png"

    const [userDestination, setUserDestination] = useState('');
    const [accessibilityButtonClick, setAccessibilityButtonClick] = useState(false);
    const [soundButtonClick, setSoundButtonClick] = useState(false);
    const [noStartPopup, setNoStartPopupVisible] = useState<boolean>(false);
    const [invalidDestinaitonPopup, setInvalidDestinaitonPopupVisible] = useState<boolean>(false);
    const [bathroomPopup, setBathroomPopupVisible] = useState<boolean>(false);
    const [readyToRoute, setReadyToRoute] = useState<boolean>(false);
    const [map, setMap] = useState<Boolean>(false);

    const handleGoButtonPress = () => {

      if (userDestination != destination) {
        okButtonClick = false;
      }
      
      if (userDestination === 'XXX') {
        destination = userDestination
        setInvalidDestinaitonPopupVisible(true);
      }
      else if(!okButtonClick && userDestination=== 'N245'){
        destination = userDestination
        setNoStartPopupVisible(true);
      }
      else if (!okButtonClick && userDestination === 'Bathroom') {
        destination = userDestination
        setBathroomPopupVisible(true);
      }else{
        setReadyToRoute(true);
        setMap(true);
      }
    }

    const handleButtonClickSound = () => {
      setSoundButtonClick(!soundButtonClick);
    };

    const handleButtonClickAccessibility = () => {
      setAccessibilityButtonClick(!accessibilityButtonClick);
    };

    const isGoButtonEnabled = () => {
      if (!userDestination) return false;
      else if (map) return false;
      return true;
    }


    const handleStartOverButtonPress = () => {
      setReadyToRoute(false);
      setUserDestination('')
      setMap(false);
      destination = '';
      origin = '';
      bathroom = '';
      okButtonClick = false;
    }

    
    return (
      //background image
      <ImageBackground source={require('AwesomeProject/images/Asset5.png')} style={styles.background}>
        {/* message and image */}
         {!readyToRoute && <View>
          <Text style={styles.text}>Welcome To MNSU Wayfinder!</Text>
          <Image source={require('AwesomeProject/images/Asset7.png')} style={styles.image}/>
        </View>}
        {readyToRoute && <View>
          <Text style={styles.text}>Map Visible</Text>
        </View>}
        {/* accessibility and sound buttons */}
        <TouchableOpacity style={[styles.accessibilityButton,accessibilityButtonClick?styles.circleButtonClicked:styles.circleButtonUnclicked]} onPress={handleButtonClickAccessibility}>
          <Image source={accessibilityButtonClick?require(accessibilityImageEnabled):require(accessibilityImageDisabled)} style={styles.wheelchairImage} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.soundButton,soundButtonClick?styles.circleButtonClicked:styles.circleButtonUnclicked]} onPress= {handleButtonClickSound}>
          <Image source={soundButtonClick?require(soundImageEnabled):require(soundImageDisabled)} style={soundButtonClick?styles.soundImageEnabled:styles.soundImageDisabled} />
        </TouchableOpacity>
        {/* destination input and go button */}
        <View style={styles.navigation}>
          <View style={styles.inputBox}>
            <TextInput
              style={isGoButtonEnabled()? styles.inputEnabled: styles.inputDisabled}
              placeholder="Enter Destination"
              placeholderTextColor="#CCCCCC"
              onChangeText={setUserDestination}
              value={userDestination}
              editable = {!map}
            />
          </View>
          <View>
            {!map && <TouchableOpacity style={[styles.goButton, userDestination ? styles.goButtonEnabled : styles.buttonDisabled]} disabled={!userDestination} onPress={handleGoButtonPress}>
              <Text style={styles.goButtonText}>GO</Text>
            </TouchableOpacity>}
            {map &&<TouchableOpacity style={[styles.goButton, userDestination ? styles.goButtonEnabled : styles.buttonDisabled]} disabled={!userDestination} onPress={handleStartOverButtonPress}>
              <Text style={styles.startOverButtonText}>Start Over</Text>
            </TouchableOpacity>}
          </View>
        </View>
        {/* displays popups if condition is true */}
        {noStartPopup && <NoStartPopup modalVisible={noStartPopup} setModalVisible={setNoStartPopupVisible} />}
        {invalidDestinaitonPopup && <InvalidDestination modalVisible={invalidDestinaitonPopup} setModalVisible={setInvalidDestinaitonPopupVisible}/> }
        {bathroomPopup && <BathroomPopup modalVisible={bathroomPopup} setModalVisible={setBathroomPopupVisible} />}
      </ImageBackground>
      
    );
  };
  

  export default App;
