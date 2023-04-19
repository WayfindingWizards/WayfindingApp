import {StyleSheet, Platform} from 'react-native';

//included Platform.OS calls since ios and android were found to format differently

export const accessibilityStyles = StyleSheet.create({
  accessibilityButton: {
    borderRadius: 80,
    marginBottom: 135,
    marginLeft: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: 65,
    height: 65,
    justifyContent: 'center',
    padding: 13,
  },
  soundButton: {
    borderRadius: 80,
    marginBottom: 135,
    alignSelf: 'flex-end',
    marginLeft: Platform.OS === 'ios' ? '81%' : '81.5%',
    margin: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: 65,
    height: 65,
    justifyContent: 'center',
  },
  voiceCommandButton: {
    borderRadius: 80,
    marginBottom: 210,
    alignSelf: 'flex-end',
    margin: 10,
    marginLeft: Platform.OS === 'ios' ? '81%' : '81.5%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: 65,
    height: 65,
    justifyContent: 'center',
  },
  wheelchairImage: {
    width: 35,
    height: 43,
    justifyContent: 'center',
  },
  wheelchairImageDisabled: {
    width: 50,
    height: 50,
    marginLeft: -5,
  },
  soundImageEnabled: {
    width: 40,
    height: 35,
    margin: 14,
  },
  soundVoiceImageDisabled: {
    width: 50,
    height: 50,
    margin: 8,
  },
  // no voice command disabled since styling was same as sound
  voiceCommandImageEnabled: {
    width: 30,
    height: 44,
    marginLeft: 18,
    margin: 10,
  },
  //changes background of accessibility buttons
  circleButtonClicked: {
    backgroundColor: '#FFF',
  },
  circleButtonUnclicked: {
    backgroundColor: '#000',
  },
  helpButton: {
    borderRadius: 80,
    marginLeft: Platform.OS === 'ios' ? '5%' : '3%',
    marginTop: Platform.OS === 'ios' ? '10%' : '3%',
    position: 'absolute',
    width: Platform.OS === 'ios' ? 30 : 30,
    height: Platform.OS === 'ios' ? 15 : 30,
    justifyContent: 'center',
  },
  helpButtonText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#B3B3B3',
    textAlign: 'center',
  },
});
