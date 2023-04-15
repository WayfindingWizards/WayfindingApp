import React, {useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image
} from 'react-native';
import { popupStyles } from '../styles/PopupStyles';
import { baseStyles } from '../styles/BaseStyles';
import { helpStyles } from '../styles/HelpPopupStyles';
import { accessibilityStyles } from '../styles/AccessibilityButtonStyles';
import * as utils from './GlobalVariables';

export interface CustomModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoStartPopup: React.FC<CustomModalProps> = ({
  modalVisible,
  setModalVisible
}) => {
  const [originInput, setOriginInput] = useState('');

  const handleOkButtonClick = () => {
    utils.setOrigin(originInput);
    setModalVisible(!modalVisible);
    utils.setMapVisible(true);
  };

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={popupStyles.modalBackground}>
        <View style={popupStyles.modalContainer}>
          <Text style={popupStyles.modalText}>We couldn't find you.</Text>
          <Text style={popupStyles.modalText}>Please enter the closest room.</Text>
          <TextInput
            style={popupStyles.modalTextContainer}
            placeholder="Room"
            placeholderTextColor="#BABABA"
            onChangeText={setOriginInput}
            value={originInput}
          />
          <TouchableOpacity
            style={popupStyles.modalOkButton}
            onPress={handleOkButtonClick}>
            <Text style={popupStyles.modalOkButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    utils.setDestination(bathroomInput);
    utils.setIsBathroomSet(true);
    setModalVisible(!modalVisible);
    utils.setMapVisible(true);
  };

  const handleCancelButtonClick = () => {
    setModalVisible(!modalVisible);
    setOkButtonEnabled(false);
    utils.setIsBathroomSet(false);
  };

  const handleBathroomButtonClick = (bathroom: string) => {
    if (bathroom === 'Mens Bathroom') {
      setMensBathroomClick(!mensBathroomClick);
      setAllGenderButtonClicked(false);
      setWomensBathroomClick(false);
      setOkButtonEnabled(true);
    } else if (bathroom === 'Womens Bathroom') {
      setWomensBathroomClick(!womensBathroomClick);
      setMensBathroomClick(false);
      setAllGenderButtonClicked(false);
      setOkButtonEnabled(true);
    } else {
      setAllGenderButtonClicked(!allGenderButtonClicked);
    }

    setBathroomInput(bathroom);
    utils.setIsBathroomSet(true);
  };

  return (
    <Modal animationType="fade" transparent visible={true}>
      <View style={popupStyles.modalBackground}>
        <View style={popupStyles.modalContainer}>
          <Text style={popupStyles.modalText}>
            Please select what type of bathroom you want.
          </Text>
          <View style={popupStyles.bathroomButtonContainer}>
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
          <View style={popupStyles.modalOkButtonContainer}>
            <TouchableOpacity
              style={[
                popupStyles.modalOkButton,
                okButtonEnabled
                  ? popupStyles.modalOkButtonEnabled
                  : baseStyles.buttonDisabled,
              ]}
              disabled={!okButtonEnabled}
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
      </View>
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
          <Text style={popupStyles.modalText}>Invalid Destination</Text>
          <Text style={popupStyles.modalText}>
            Please enter a valid destination.
          </Text>
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
    setModalVisible(!modalVisible);
  };

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={helpStyles.modalBackground}>
        <View style={helpStyles.modalContainer}>
          <View style={helpStyles.explanationContainers}>
            <Text style = {helpStyles.text}>Accessible Route:</Text>
            <View style = {helpStyles.enabledDisabledImageAndText}>
              <Image style = {accessibilityStyles.wheelchairImageDisabled} source = {require('AwesomeProject/images/access_ena_image.png')} />
              <Text style = {helpStyles.enabledDisabledText}>Enabled</Text>
            </View>
            <View style = {helpStyles.enabledDisabledImageAndText}>
              <Image style = {accessibilityStyles.wheelchairImageDisabled} source = {require('AwesomeProject/images/access_dis_image.png')} />
              <Text style = {helpStyles.enabledDisabledText}>Disabled</Text>
            </View>
          </View>
          <TouchableOpacity
            testID = 'okButton'
            style={helpStyles.helpOkButton}
            onPress={handleOkButtonClick}>
            <Text  style={popupStyles.modalOkButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}