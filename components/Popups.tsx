import React, {useState} from 'react';
import {Modal,Text,TouchableOpacity,View,TextInput,Image,KeyboardAvoidingView,Platform} from 'react-native';
import { popupStyles } from '../styles/PopupStyles';
import { baseStyles } from '../styles/BaseStyles';
import * as utils from './GlobalVariables';
import {findRoom} from './FindRoom';

const ViewComponent = Platform.OS === 'ios' ? KeyboardAvoidingView : View; //manage difference in keyboardAvoiding in ios and android

export interface CustomModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoStartPopup: React.FC<CustomModalProps> = ({
  modalVisible,
  setModalVisible
}) => {
  const [originInput, setOriginInput] = useState('');
  const [validInput, setValidInput] = useState(true);
  //const ViewComponent = Platform.OS === 'ios' ? KeyboardAvoidingView : View; //manage difference in keyboardAvoiding in ios and android

  const handleOkButtonClick = () => {

    //tests if the origin input is a valid room
    if(!findRoom(originInput)){
      setValidInput(false) // default to true on line 22
    }else{
    utils.setOrigin(originInput); // set global origin to local input
    setModalVisible(!modalVisible); //hides modal
    if (utils.getDestination() != 'BATHROOM')
      utils.setMapVisible(true); // sets global map visible to true
    }
  };

  return (

    <Modal animationType="fade" transparent visible={modalVisible}>
      <ViewComponent style={popupStyles.modalBackground} behavior="padding">
        <View style={popupStyles.modalContainer}>
          {validInput && <View>
            <Text style={popupStyles.modalText}>We couldn't find you.</Text>
            <Text style={popupStyles.modalText}>Please enter the closest room.</Text></View>}
          {!validInput && <View>
            <Text style={popupStyles.modalText}>That was an invalid room.</Text>
            <Text style={popupStyles.modalText}>Please enter a valid room.</Text></View>}
          {/*starting point input box */}
          <TextInput
            style={popupStyles.modalTextContainer}
            placeholder="Room"
            placeholderTextColor="#BABABA"
            onChangeText={setOriginInput}
            value={originInput.trim().toLocaleUpperCase()}/>
          <TouchableOpacity
            style={[
              popupStyles.modalOkButton,
              originInput
                ? popupStyles.modalOkButtonEnabled
                : baseStyles.buttonDisabled,
            ]}
            onPress={handleOkButtonClick}
            disabled= {!originInput}>
            <Text style={popupStyles.modalOkButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </ViewComponent>
    </Modal>
  );
};

export const BathroomPopup: React.FC<CustomModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [bathroomInput, setBathroomInput] = useState('');
  const [mensBathroomClick, setMensBathroomClick] = useState(false);
  const [womensBathroomClick, setWomensBathroomClick] = useState(false);
  const [allGenderButtonClicked, setAllGenderButtonClicked] = useState(false);
  const [okButtonEnabled, setOkButtonEnabled] = useState(false);

  const handleOkButtonClick = () => {
    utils.setDestination(bathroomInput); //sets global destiation to bathroom input
    utils.setIsBathroomSet(true); //sets global IsBathroomSet to true
    setModalVisible(!modalVisible); //closes popup
    //utils.setMapVisible(true); //sets global map visible to true
  };

  const handleCancelButtonClick = () => {
    setModalVisible(!modalVisible); //closes modal
    setOkButtonEnabled(false); //disables ok button
    utils.setIsBathroomSet(false); //sets global IsBathroomSet to false
  };

  const handleBathroomButtonClick = (bathroom: string) => {
    if (bathroom === 'Mens Bathroom') {
      setMensBathroomClick(!mensBathroomClick);
      {/*ensures only one bathroom button is selected*/}
      setAllGenderButtonClicked(false); 
      setWomensBathroomClick(false);
      setOkButtonEnabled(true);
    } else if (bathroom === 'Womens Bathroom') {
      setWomensBathroomClick(!womensBathroomClick);
      {/*ensures only one bathroom button is selected*/}
      setMensBathroomClick(false);
      setAllGenderButtonClicked(false);
      setOkButtonEnabled(true);
    } else {
      {/*ensures only one bathroom button is selected*/}
      {/*all gender option is disabled for now*/}
      setAllGenderButtonClicked(!allGenderButtonClicked);
      setMensBathroomClick(false);
      setWomensBathroomClick(false);
      setOkButtonEnabled(true);
    }
    setBathroomInput(bathroom);
    utils.setIsBathroomSet(true); // sets global
  };

  return (
    <Modal animationType="fade" transparent visible={true}>

      <KeyboardAvoidingView style={popupStyles.modalBackground} behavior="padding">
        <View style={popupStyles.modalContainer}>
          <Text style={popupStyles.modalText}>
            Please select what type of bathroom you want.
          </Text>
          <View style={popupStyles.bathroomButtonContainer}>
            {/*bathroom buttons */}
            <TouchableOpacity
              style={[
                popupStyles.bathroomButton,
                mensBathroomClick
                  ? popupStyles.bathroomButtonClicked
                  : popupStyles.bathroomButtonUnclicked,
              ]}
              onPress={() => handleBathroomButtonClick('Mens Bathroom')}>
              <Text style={popupStyles.modalOkButtonText}>Men</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                popupStyles.bathroomButton,
                womensBathroomClick
                  ? popupStyles.bathroomButtonClicked
                  : popupStyles.bathroomButtonUnclicked,
              ]}
              onPress={() => handleBathroomButtonClick('Womens Bathroom')}>
              <Text style={popupStyles.modalOkButtonText}>Women</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[popupStyles.bathroomButton, baseStyles.buttonDisabled]}
              disabled={true}
              onPress={() => handleBathroomButtonClick('All Gender')}>
              <Text style={popupStyles.modalOkButtonText}>All Gender</Text>
            </TouchableOpacity>
          </View>
          {/*ok and cancel button*/}
          <View style={popupStyles.modalOkButtonContainer}>
            <TouchableOpacity
              style={[
                popupStyles.modalOkButton,
                okButtonEnabled
                  ? popupStyles.modalOkButtonEnabled
                  : baseStyles.buttonDisabled,
              ]}
              disabled={!okButtonEnabled} //disabled if no bathroom button is selected
              onPress={handleOkButtonClick}>
              <Text style={popupStyles.modalOkButtonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={popupStyles.modalOkButton}
              onPress={handleCancelButtonClick}>
              <Text style={popupStyles.modalOkButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export const InvalidDestinationPopup: React.FC<CustomModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  {
    /* This doesn't change ready to route as the user needs to change the destination input */
  }
  const handleOkButtonClick = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={popupStyles.modalBackground}>
        <View style={popupStyles.modalContainer}>
          <Text style={popupStyles.modalText}>Invalid Destination.</Text>
          <Text style={popupStyles.modalText}>
            Please enter a valid destination.
          </Text>
          {/*ok button*/}
          <TouchableOpacity
            testID = 'okButton'
            style={popupStyles.modalOkButton}
            onPress={handleOkButtonClick}>
            <Text  style={popupStyles.modalOkButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const HelpPopup: React.FC<CustomModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  {
    /* This doesn't change ready to route as the user needs to change the destination input */
  }
  const handleOkButtonClick = () => {
    setModalVisible(!modalVisible); //closes popup
  };

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={popupStyles.modalBackground}>
        <View style={popupStyles.modalContainer}>
          {/*help menu image*/}
          <Image style = {[{height:330}, {width: 290}]} source={require('../images/help_menu.png')} ></Image>
          {/*ok button*/}
          <TouchableOpacity
            testID = 'okButton'
            style={popupStyles.modalOkButton}
            onPress={handleOkButtonClick}>
            <Text style={popupStyles.modalOkButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

//only used when beacons are found (at this time, beacons on 2nd floor used for pathfinding even when on 1st or 3rd floor)
export const FloorPopup: React.FC<CustomModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [floorInput, setFloorInput] = useState('');
  const [floor1Click, setFloor1Click] = useState(false);
  const [floor2Click, setFloor2Click] = useState(false);
  const [floor3Click, setFloor3Click] = useState(false);
  const [okButtonEnabled, setOkButtonEnabled] = useState(false);

  const handleOkButtonClick = () => {
    utils.setFloor(floorInput); //sets global floor to floor input
    utils.setIsFloorSet(true); //sets global IsFloorSet to true
    setModalVisible(!modalVisible); //closes popup
    utils.setMapVisible(true); //sets global map visible to true
  };

  const handleCancelButtonClick = () => {
    setModalVisible(!modalVisible); //closes modal
    setOkButtonEnabled(false); //disables ok button
    utils.setIsFloorSet(false); //sets global IsFloorSet to false
  };

  const handleFloorButtonClick = (floor: string) => {
    if (floor === 'N1') {
      setFloor1Click(!floor1Click);
      {/*ensures only one floor button is selected*/}
      setFloor2Click(false); 
      setFloor3Click(false);
      setOkButtonEnabled(!floor1Click); //disable the Ok button if unclicked, enable if clicked
    } else if (floor === 'N2') {
      setFloor2Click(!floor2Click);
      {/*ensures only one floor button is selected*/}
      setFloor1Click(false); 
      setFloor3Click(false);
      setOkButtonEnabled(!floor2Click); //disable the Ok button if unclicked, enable if clicked
    } else if (floor === 'N3'){
      setFloor3Click(!floor3Click);
      {/*ensures only one floor button is selected*/}
      setFloor1Click(false); 
      setFloor2Click(false);
      setOkButtonEnabled(!floor3Click); //disable the Ok button if unclicked, enable if clicked
    } 
    setFloorInput(floor);
    utils.setIsFloorSet(true); // sets global
  };

  return (
    <Modal animationType="fade" transparent visible={true}>

      <KeyboardAvoidingView style={popupStyles.modalBackground} behavior="padding">
        <View style={popupStyles.modalContainer}>
          <Text style={popupStyles.modalText}>
            Please select which floor you are on.
          </Text>
          <View style={popupStyles.floorButtonContainer}>
            {/*floor buttons */}
            <TouchableOpacity
              style={[
                popupStyles.floorButton,
                floor1Click
                  ? popupStyles.floorButtonClicked
                  : popupStyles.floorButtonUnclicked,
              ]}
              onPress={() => handleFloorButtonClick('N1')}>
              <Text style={popupStyles.modalOkButtonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                popupStyles.floorButton,
                floor2Click
                  ? popupStyles.floorButtonClicked
                  : popupStyles.floorButtonUnclicked,
              ]}
              onPress={() => handleFloorButtonClick('N2')}>
              <Text style={popupStyles.modalOkButtonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                popupStyles.floorButton,
                floor3Click
                  ? popupStyles.floorButtonClicked
                  : popupStyles.floorButtonUnclicked,
              ]}
              onPress={() => handleFloorButtonClick('N3')}>
              <Text style={popupStyles.modalOkButtonText}>3</Text>
            </TouchableOpacity>
          </View>
          {/*ok and cancel button*/}
          <View style={popupStyles.modalOkButtonContainer}>
            <TouchableOpacity
              style={[
                popupStyles.modalOkButton,
                okButtonEnabled
                  ? popupStyles.modalOkButtonEnabled
                  : baseStyles.buttonDisabled,
              ]}
              disabled={!okButtonEnabled} //disabled if no floor button is selected
              onPress={handleOkButtonClick}>
              <Text style={popupStyles.modalOkButtonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={popupStyles.modalOkButton}
              onPress={handleCancelButtonClick}>
              <Text style={popupStyles.modalOkButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};