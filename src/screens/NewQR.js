import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightRef, widthRef } from '../utils/Dimensions'; // Adjust the import path accordingly

const NewQR = ({ navigation, route }) => { // Added 'navigation' prop
  const { type } = route.params;
  const [qrData, setQrData] = useState('');
  const [inputData, setInputData] = useState({
    text: '',
    website: '',
    wifiName: '',
    wifiPassword: '',
    eventName: '',
    eventDate: '',
    eventTime: '',
    contactName: '',
    contactNumber: '',
    businessName: '',
    businessUrl: '',
    businessDescription: '',
    location: '',
    email: '',
    twitterAccount: '',
    instagramAccount: '',
    whatsappNumber: '',
    telephoneNumber: '', // Add a state for telephone number
  });

  const generateData = () => {
    switch (type) {
      case 'Text':
        return inputData.text || 'No Text Provided';
      case 'Website':
        return inputData.website || 'https://example.com';
      case 'WiFi':
        return inputData.wifiName && inputData.wifiPassword 
          ? `WIFI:S:${inputData.wifiName};T:WPA;P:${inputData.wifiPassword};;` 
          : 'WIFI:No WiFi Details Provided';
      case 'Event':
        return inputData.eventName && inputData.eventDate && inputData.eventTime 
          ? `BEGIN:VEVENT\nSUMMARY:${inputData.eventName}\nDTSTART:${inputData.eventDate}T${inputData.eventTime}\nEND:VEVENT` 
          : 'Event Details Incomplete';
      case 'Contact':
        return inputData.contactName && inputData.contactNumber 
          ? `BEGIN:VCARD\nVERSION:3.0\nFN:${inputData.contactName}\nTEL:${inputData.contactNumber}\nEND:VCARD` 
          : 'Contact Details Incomplete';
      case 'WhatsApp':
        return inputData.whatsappNumber 
          ? `https://wa.me/${inputData.whatsappNumber}` 
          : 'WhatsApp Number Missing';
      case 'Instagram':
        return inputData.instagramAccount 
          ? `https://instagram.com/${inputData.instagramAccount}` 
          : 'Instagram Account Missing';
      case 'Twitter':
        return inputData.twitterAccount 
          ? `https://twitter.com/${inputData.twitterAccount}` 
          : 'Twitter Account Missing';
      case 'Location':
        return inputData.location 
          ? `geo:${inputData.location}` 
          : 'Location Missing';
      case 'Email':
        return inputData.email 
          ? `mailto:${inputData.email}` 
          : 'Email Missing';
      case 'Telephone':
        return inputData.telephoneNumber 
          ? `tel:${inputData.telephoneNumber}` 
          : 'Telephone Number Missing'; // Added case for Telephone
      case 'Business':
        return inputData.businessName && inputData.businessUrl 
          ? `BEGIN:VCARD\nVERSION:3.0\nFN:${inputData.businessName}\nURL:${inputData.businessUrl}\nNOTE:${inputData.businessDescription}\nEND:VCARD` 
          : 'Business Details Incomplete';
      default:
        return 'Invalid QR Type';
    }
  };

  const saveToHistory = async (data) => {
    try {
      const existingHistory = await AsyncStorage.getItem('qrHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      
      const timestamp = new Date().toLocaleString(); 
      history.push({ data, timestamp }); 
      
      await AsyncStorage.setItem('qrHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving to history', error);
    }
  };
  

  const handleGenerate = () => {
    const data = generateData();
    setQrData(data);
    saveToHistory(data);
  };

  const handleInputChange = (key, value) => {
    setInputData((prev) => ({ ...prev, [key]: value }));
  };

  const handleBack = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Generate QR Code</Text>
      <Text style={styles.description}>For: {type}</Text>
      {type === 'Text' && (
        <TextInput
          placeholder="Enter Text"
          value={inputData.text}
          onChangeText={(value) => handleInputChange('text', value)}
          style={styles.input}
          placeholderTextColor="#ccc" // Lighter color for placeholder
        />
      )}
      {type === 'Website' && (
        <TextInput
          placeholder="Enter Website URL"
          value={inputData.website}
          onChangeText={(value) => handleInputChange('website', value)}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
      )}
      {type === 'WiFi' && (
        <>
          <TextInput
            placeholder="WiFi Name"
            value={inputData.wifiName}
            onChangeText={(value) => handleInputChange('wifiName', value)}
            style={styles.input}
            placeholderTextColor="#ccc"
          />
          <TextInput
            placeholder="WiFi Password"
            value={inputData.wifiPassword}
            onChangeText={(value) => handleInputChange('wifiPassword', value)}
            style={styles.input}
            placeholderTextColor="#ccc"
          />
        </>
      )}
      {type === 'Event' && (
        <>
          <TextInput
            placeholder="Event Name"
            value={inputData.eventName}
            onChangeText={(value) => handleInputChange('eventName', value)}
            style={styles.input}
            placeholderTextColor="#ccc"
          />
          <TextInput
            placeholder="Event Date (YYYYMMDD)"
            value={inputData.eventDate}
            onChangeText={(value) => handleInputChange('eventDate', value)}
            style={styles.input}
            placeholderTextColor="#ccc"
          />
          <TextInput
            placeholder="Event Time (HHMM)"
            value={inputData.eventTime}
            onChangeText={(value) => handleInputChange('eventTime', value)}
            style={styles.input}
            placeholderTextColor="#ccc"
          />
        </>
      )}
      {type === 'Contact' && (
        <>
          <TextInput
            placeholder="Contact Name"
            value={inputData.contactName}
            onChangeText={(value) => handleInputChange('contactName', value)}
            style={styles.input}
            placeholderTextColor="#ccc"
          />
          <TextInput
            placeholder="Contact Number"
            value={inputData.contactNumber}
            onChangeText={(value) => handleInputChange('contactNumber', value)}
            style={styles.input}
            placeholderTextColor="#ccc"
          />
        </>
      )}
      {type === 'Business' && (
        <>
          <TextInput
            placeholder="Business Name"
            value={inputData.businessName}
            onChangeText={(value) => handleInputChange('businessName', value)}
            style={styles.input}
            placeholderTextColor="#ccc"
          />
          <TextInput
            placeholder="Business URL"
            value={inputData.businessUrl}
            onChangeText={(value) => handleInputChange('businessUrl', value)}
            style={styles.input}
            placeholderTextColor="#ccc"
          />
          <TextInput
            placeholder="Business Description"
            value={inputData.businessDescription}
            onChangeText={(value) => handleInputChange('businessDescription', value)}
            style={styles.input}
            placeholderTextColor="#ccc"
          />
        </>
      )}
      {type === 'Location' && (
        <TextInput
          placeholder="Your Location (latitude,longitude)"
          value={inputData.location}
          onChangeText={(value) => handleInputChange('location', value)}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
      )}
      {type === 'Email' && (
        <TextInput
          placeholder="Enter Email"
          value={inputData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
      )}
      {type === 'Twitter' && (
        <TextInput
          placeholder="Twitter Account Name"
          value={inputData.twitterAccount}
          onChangeText={(value) => handleInputChange('twitterAccount', value)}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
      )}
      {type === 'Instagram' && (
        <TextInput
          placeholder="Instagram Account Name"
          value={inputData.instagramAccount}
          onChangeText={(value) => handleInputChange('instagramAccount', value)}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
      )}
      {type === 'WhatsApp' && (
        <TextInput
          placeholder="WhatsApp Number"
          value={inputData.whatsappNumber}
          onChangeText={(value) => handleInputChange('whatsappNumber', value)}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
      )}
      {type === 'Telephone' && (
        <TextInput
          placeholder="Telephone Number"
          value={inputData.telephoneNumber}
          onChangeText={(value) => handleInputChange('telephoneNumber', value)}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
      )}
  
      <TouchableOpacity style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </TouchableOpacity>
      
      {qrData && (
  <View style={styles.qrContainer}>
    <View style={styles.qrCodeWrapper}>
      <QRCode value={qrData} size={200} />
    </View>
  </View>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    
    padding: 20 * heightRef,
  },
  backButton: {
    alignSelf: 'flex-start', 
    margin:10,
    marginLeft: 20 * heightRef,
    marginBottom: 20 * heightRef,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10 * widthRef,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  backButtonText: {
    color: '#FFA500',
    fontSize: 24 * heightRef,
    padding:4* widthRef
  },
  title: {
    color: '#FFA500',
    fontSize: 24 * heightRef,
    marginBottom: 20 * heightRef,
  },
  input: {
    height: 40 * heightRef,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5, 
    marginBottom: 15 * heightRef,
    paddingHorizontal: 10,
    color: '#fff', 
    width: '100%', 
  },
  qrContainer: {
    marginVertical: 20 * heightRef, 
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 5,
    paddingVertical: 15 * heightRef, 
    paddingHorizontal: 20 * widthRef, 
    width: '60%', 
    alignItems: 'center',
  },
  buttonText: {
    color: '#000', 
    fontSize: 20 * heightRef, 
  },
  description: {
    color: '#FFA500',
    margin: 5 * heightRef,
    paddingVertical: 15 * heightRef, 
  },
  qrContainer: {
    marginVertical: 20 * heightRef, 
  },
  qrCodeWrapper: {
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 10, 
  },
});

export default NewQR;
