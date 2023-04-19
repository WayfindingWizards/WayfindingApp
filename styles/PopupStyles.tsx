import {StyleSheet} from 'react-native';

export const popupStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  modalTextContainer: {
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
    width: 200,
    height: 50,
    textAlign: 'center',
  },
  modalOkButtonContainer: {
    flexDirection: 'row',
  },
  modalOkButton: {
    marginTop: 20,
    backgroundColor: '#5B4379',
    borderRadius: 5,
    margin: 10,
    width: 100,
    height: 40,
    justifyContent: 'center',
  },
  modalOkButtonEnabled: {
    backgroundColor: '#5B4379',
  },
  modalOkButtonText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  bathroomButtonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
  },
  bathroomButton: {
    borderRadius: 70,
    margin: 5,
    width: 90,
    height: 40,
    justifyContent: 'center',
    padding: 5,
  },
  bathroomButtonClicked: {
    backgroundColor: '#000000',
  },
  bathroomButtonUnclicked: {
    backgroundColor: '#5B4379',
  },
});
