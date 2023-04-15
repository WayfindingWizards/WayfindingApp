import {StyleSheet,Platform} from 'react-native';

export const baseStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  text: {
    fontSize: Platform.OS === 'ios' ? 35 : 45,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: '30%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  image: {
    height: 195,
    width: 275,
    marginTop: '20%',
    marginLeft: '17%',
    justifyContent: 'center',
  },
  navigation: {
    backgroundColor: '#191919',
    paddingHorizontal: 0,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputBox: {
    backgroundColor: '#636363',
    borderRadius: 5,
    padding: 5,
    margin: 10,
    marginBottom: Platform.OS === 'ios' ? 35 : 25,
    width: 200,
    height: 70,
    alignSelf: 'center'
  },
  inputEnabled: {
    paddingTop: 15,
    fontSize: Platform.OS === 'ios' ? 18 : 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  inputDisabled: {
    paddingTop: 15,
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
  buttonDisabled: {
    backgroundColor: '#999999',
  },
  goButtonText: {
    paddingTop: 2,
    fontSize: Platform.OS === 'ios' ? 30 : 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  startOverButtonText: {
    paddingTop: 8,
    fontSize: Platform.OS === 'ios' ? 20 : 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  modelImage:{
    width: '100%',
    height: '100%',
  }
});