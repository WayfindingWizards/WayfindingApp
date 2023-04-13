import {StyleSheet} from 'react-native';

export const baseStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: '25%',
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
    paddingHorizontal: 10,
    paddingVertical: 15,
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
    width: 200,
    height: 70,
  },
  inputEnabled: {
    paddingTop: 15,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  inputDisabled: {
    paddingTop: 15,
    fontSize: 22,
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
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  startOverButtonText: {
    paddingTop: 8,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
 
  
  modelImage:{
    width: '100%',
    height: '100%',
  }
});