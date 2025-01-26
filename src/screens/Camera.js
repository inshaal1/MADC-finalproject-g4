import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';  // Fixed import
import AsyncStorage from '@react-native-async-storage/async-storage';

const Camera = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('Error requesting camera permission:', error);
        setHasPermission(false);
      }
    };

    getCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return;

    setScanned(true);
    setScannedData(`Data: ${data} has been scanned!`);
    setModalVisible(true);

    const timestamp = new Date().toLocaleString();
    const scannedItem = { data, timestamp };

    try {
      const storedHistory = await AsyncStorage.getItem('scanHistory');
      const history = storedHistory ? JSON.parse(storedHistory) : [];
      history.push(scannedItem);
      await AsyncStorage.setItem('scanHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving scan history:', error);
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setModalVisible(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera. Please grant permission in settings.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={handleScanAgain} />}

      <Text style={styles.instructions}>Point the camera at a QR code to scan it.</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleScanAgain}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{scannedData}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleScanAgain}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#FFA500',
  },
  instructions: {
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FFA500',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: '#000',
  },
});

export default Camera;
