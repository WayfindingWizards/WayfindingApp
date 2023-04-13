import {StyleSheet} from 'react-native';

export const helpStyles = StyleSheet.create({

text: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    justifyContent: 'flex-start',
    marginTop: 15
},
explanationContainers:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 10,
    padding: 10
},
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
    justifyContent: 'center'
},
buttonImage:{
    height: 40,
},
enabledDisabledImageAndText:{
    alignItems: 'center',
},
helpOkButton: {
    marginTop: 20,
    backgroundColor: '#5B4379',
    borderRadius: 5,
    width: 100,
    height: 40,
    marginLeft: 100,
    justifyContent: 'center',
  },
  enabledDisabledText: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '500',
    justifyContent: 'flex-start',
    marginHorizontal: 15,
  },
});