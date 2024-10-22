import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity, Animated } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fullHeight, fullWidth } from '../utils/Dimensions';

const Camera = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    startScanLineAnimation();
  }, []);

  const startScanLineAnimation = () => {
    scanLineAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: fullWidth * 0.6, // Move scan line within the scan area
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0, // Move back to the start position
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return;

    setScanned(true);
    setScannedData(`Bar code with type ${type} and data ${data} has been scanned!`);
    setModalVisible(true);

    const timestamp = new Date().toLocaleString();
    const scannedItem = { data, timestamp };
    try {
      const storedHistory = await AsyncStorage.getItem('scanHistory');
      const history = storedHistory ? JSON.parse(storedHistory) : [];
      history.push(scannedItem);
      await AsyncStorage.setItem('scanHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setModalVisible(false);
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
      
      <Animated.View
        style={[
          styles.scanLine,
          { transform: [{ translateY: scanLineAnim }] }, // Move the line based on animated value
        ]}
      />

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={handleScanAgain} />
      )}

      <Text style={styles.instructions}>
        Point the camera at a QR code to scan it.
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleScanAgain} // Close modal on back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{scannedData}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleScanAgain}
            >
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
