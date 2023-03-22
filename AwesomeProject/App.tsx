import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const App = () => {
  const [startPoint, setStartPoint] = useState('');
  const [destinationPoint, setDestinationPoint] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter starting point"
            onChangeText={setStartPoint}
            value={startPoint}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter destination point"
            onChangeText={setDestinationPoint}
            value={destinationPoint}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 10,
    width: '100%',

  },
  input: {
    fontSize: 15,
  },
});

export default App;