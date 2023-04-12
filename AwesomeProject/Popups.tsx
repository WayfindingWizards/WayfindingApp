import React, {useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import {styles} from './Styles';
import * as utils from './GlobalVariables';

export interface CustomModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  testID: string;
}

export const NoStartPopup: React.FC<CustomModalProps> = ({
  modalVisible,
  setModalVisible,
  testID,
}) => {
  const [originInput, setOriginInput] = useState('');

  const handleOkButtonClick = () => {
    utils.setOrigin(originInput);
    setModalVisible(!modalVisible);
    utils.setMapVisible(true);
  };

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>We couldn't find you.</Text>
          <Text style={styles.modalText}>Please enter the closest room.</Text>
          <TextInput
            style={styles.modalTextContainer}
            placeholder="Room"
            placeholderTextColor="#BABABA"
            onChangeText={setOriginInput}
            value={originInput}
          />
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
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Please select what type of bathroom you want.
          </Text>
          <View style={styles.bathroomButtonContainer}>
            <TouchableOpacity
              style={[
                styles.bathroomButton,
                mensBathroomClick
                  ? styles.bathroomButtonClicked
                  : styles.bathroomButtonUnclicked,
              ]}
              onPress={() => handleBathroomButtonClick('Mens Bathroom')}>
              <Text style={styles.modalOkButtonText}>Men</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.bathroomButton,
                womensBathroomClick
                  ? styles.bathroomButtonClicked
                  : styles.bathroomButtonUnclicked,
              ]}
              onPress={() => handleBathroomButtonClick('Womens Bathroom')}>
              <Text style={styles.modalOkButtonText}>Women</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bathroomButton, styles.buttonDisabled]}
              disabled={true}
              onPress={() => handleBathroomButtonClick('All Gender')}>
              <Text style={styles.modalOkButtonText}>All Gender</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalOkButtonContainer}>
            <TouchableOpacity
              style={[
                styles.modalOkButton,
                okButtonEnabled
                  ? styles.modalOkButtonEnabled
                  : styles.buttonDisabled,
              ]}
              disabled={!okButtonEnabled}
              onPress={handleOkButtonClick}>
              <Text style={styles.modalOkButtonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOkButton}
              onPress={handleCancelButtonClick}>
              <Text style={styles.modalOkButtonText}>Cancel</Text>
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
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Invalid Destination</Text>
          <Text style={styles.modalText}>
            Please enter a valid destination.
          </Text>
          <TouchableOpacity
            testID = 'okButton'
            style={styles.modalOkButton}
            onPress={handleOkButtonClick}>
            <Text  style={styles.modalOkButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};