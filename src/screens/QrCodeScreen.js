import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QrCodeScreen = ({ route }) => {
  const { qrValue } = route.params;

  useEffect(() => {
    const saveToHistory = async () => {
      const timestamp = new Date().toLocaleString(); 
      const scannedItem = { data: qrValue, timestamp }; 
  
      try {
        const storedHistory = await AsyncStorage.getItem('scanHistory');
        const history = storedHistory ? JSON.parse(storedHistory) : [];
        history.push(scannedItem); 
        await AsyncStorage.setItem('scanHistory', JSON.stringify(history)); 
      } catch (error) {
        console.error('Error saving to history:', error);
      }
    };
  
    saveToHistory();
  }, [qrValue]);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your QR Code</Text>
      <QRCode
        value={qrValue}
        size={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default QrCodeScreen;
