import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewQR = ({ route }) => {
  const { type } = route.params;

  const generateData = () => {
    // Replace with actual data generation logic based on type
    switch (type) {
      case 'Text':
        return 'Sample Text QR Code';
      case 'Website':
        return 'https://example.com';
      case 'WiFi':
        return 'WIFI:S:YourSSID;T:WPA;P:YourPassword;;';
      case 'Event':
        return 'Event Details Here';
      case 'Contact':
        return 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nEND:VCARD';
      // Add more cases as needed
      default:
        return 'Sample Text QR Code';
    }
  };

  const saveToHistory = async (data) => {
    try {
      const existingHistory = await AsyncStorage.getItem('qrHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.push(data);
      await AsyncStorage.setItem('qrHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving to history', error);
    }
  };

  const qrData = generateData();

  useEffect(() => {
    saveToHistory(qrData);
  }, [qrData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generated QR Code</Text>
      <QRCode value={qrData} size={200} />
      <Text style={styles.description}>Type: {type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    color: '#FFA500',
    marginBottom: 20,
  },
  description: {
    color: '#FFA500',
    marginTop: 20,
  },
});

export default NewQR;
