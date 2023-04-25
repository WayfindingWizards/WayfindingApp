import {StyleSheet, Platform} from 'react-native';

export const baseStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  welcomeText: {
    //to accomidate the difference between ios and android
    fontSize: Platform.OS === 'ios' ? 35 : 45,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: '30%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  stomperImage: {
    height: 195,
    width: 275,
    marginTop: '15%',
    marginLeft: '17%',
    justifyContent: 'center',
  },
  navigationContainer: {
    backgroundColor: '#191919',
    paddingHorizontal: 0,
    //to accomidate the difference between ios and android
    paddingVertical: Platform.OS === 'ios' ? 12 : 8, 
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  destinationInputBox: {
    backgroundColor: '#636363',
    borderRadius: 5,
    padding: 5,
    margin: 10,
    //to accomidate the difference between ios and android
    marginBottom: Platform.OS === 'ios' ? 35 : 25,
    width: 200,
    height: 70,
    alignSelf: 'center',
  },
  inputEnabled: {
    paddingTop: 15,
    //to accomidate the difference between ios and android
    fontSize: Platform.OS === 'ios' ? 18 : 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  inputDisabled: {
    paddingTop: 15,
    //to accomidate the difference between ios and android
    fontSize: Platform.OS === 'ios' ? 18 : 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#999999',
  },
  goButton: {
    borderRadius: 5,
    padding: '5%',
    margin: 10,
    width: 140,
    height: 70,
  },
  goButtonEnabled: {
    backgroundColor: '#5B4379',
  },
  //used for go button and ok buttons on popups
  buttonDisabled: {
    backgroundColor: '#999999',
  },
  goButtonText: {
    paddingTop: 2,
    //to accomidate the difference between ios and android
    fontSize: Platform.OS === 'ios' ? 30 : 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  startOverButtonText: {
    paddingTop: 8,
    //to accomidate the difference between ios and android
    fontSize: Platform.OS === 'ios' ? 20 : 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  //3D model image on route screen
  modelImage: {
    width: '100%',
    height: '100%',
  },
  closestBeaconContainer: {
    width: 65,
    height: 110,
    backgroundColor: '#191919',
    margin: 20,
    marginLeft: '80%',
    paddingTop: 10,
    borderRadius: 10,
  },
  closestBeaconText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
  },
});
