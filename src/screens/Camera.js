import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Camera = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    // Save the scanned data with a timestamp to history
    const timestamp = new Date().toLocaleString(); // Get current date and time
    const scannedItem = { data, timestamp }; // Create an object to hold both

    try {
      const storedHistory = await AsyncStorage.getItem('scanHistory');
      const history = storedHistory ? JSON.parse(storedHistory) : [];
      history.push(scannedItem); // Push scanned item with timestamp to history
      await AsyncStorage.setItem('scanHistory', JSON.stringify(history)); // Save back to storage
    } catch (error) {
      console.error('Error saving to history:', error); // Log any error that occurs
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      <Text style={styles.instructions}>
        Point the camera at a QR code to scan it.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Camera;
