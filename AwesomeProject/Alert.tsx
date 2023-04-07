// import React, { useState } from 'react';
// import { Modal, Text, TouchableOpacity, View, Button, StyleSheet, TextInput} from 'react-native';
// import {styles} from './Styles';

// export let originInput: string = '';
// export let bathroomInput: string = '';
// export let okButtonHit = false;

// export interface CustomModalProps {
//     modalVisible: boolean;
//     setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   }



// export const NoStartPopup: React.FC<CustomModalProps> = ({ modalVisible, setModalVisible}) => {

//   const setUserOrigin = (userInput: string) => {
//     originInput = userInput;
//   }

//   const handleOkButtonClick = () => {
//     okButtonHit = true;
//     setModalVisible(!modalVisible)
//   }

//   return(
//       <Modal animationType="fade" transparent visible={modalVisible}>
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalText}>
//               We couldn't find you.
//             </Text>
//             <Text style={styles.modalText}>
//               Please enter the closest room.
//             </Text>
//             <TextInput
//               style={styles.modalTextContainer}
//               placeholder="Room"
//               placeholderTextColor="#BABABA"
//               onChangeText={setUserOrigin}
//               value={originInput}/>
//             <TouchableOpacity
//               style={styles.modalOkButton}
//               onPress={handleOkButtonClick}>
//               <Text style={styles.modalOkButtonText}>OK</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     )
//   }
  
// export const BathroomPopup: React.FC<CustomModalProps> = ({ modalVisible, setModalVisible}) => {
    
//   const handleOkButtonClick = () => {
//     okButtonHit = true;
//     setModalVisible(!modalVisible)
//   }

//     return (
//       <Modal animationType="fade" transparent visible={true}>
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalText}>
//               Please select what type of bathroom you want.
//             </Text>
//             <View style={styles.bathroomButtonContainer}>
//               <TouchableOpacity
//                 style={styles.bathroomButton}
//                 onPress={() => bathroomInput = 'Mens Bathroom'}>
//                 <Text style={styles.modalOkButtonText}>Men</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.bathroomButton}
//                 onPress={() => bathroomInput = 'Womens Bathroom'}>
//                 <Text style={styles.modalOkButtonText}>Women</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.bathroomButton, styles.buttonDisabled]}
//                 disabled={true}
//                 onPress={() => bathroomInput = 'All Gender'}>
//                 <Text style={styles.modalOkButtonText}>All Gender</Text>
//               </TouchableOpacity>
//             </View>
            
//             <TouchableOpacity
//               style={styles.modalOkButton}
//               onPress={handleOkButtonClick}>
//               <Text style={styles.modalOkButtonText}>OK</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     );
//   };


//   export const InvalidDestination: React.FC<CustomModalProps> = ({ modalVisible, setModalVisible}) => {
    
//     const handleOkButtonClick = () => {
//       okButtonHit = true;
//       setModalVisible(!modalVisible)
//     }

//     return(
//       <Modal animationType="fade" transparent visible={modalVisible}>
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalText}>
//               Invalid Destination
//             </Text>
//             <Text style={styles.modalText}>
//               Please enter a valid destination.
//             </Text>
//             <TouchableOpacity
//               style={styles.modalOkButton}
//               onPress={handleOkButtonClick}>
//               <Text style={styles.modalOkButtonText}>OK</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     )
//   }


