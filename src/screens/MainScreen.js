import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { fullHeight, fullWidth, heightRef, widthRef } from "../utils/Dimensions";

const MainScreen = () => {
  const navigation = useNavigation();
  const options = [
    { name: 'Text', icon: 'font' },
    { name: 'Website', icon: 'globe' },
    { name: 'WiFi', icon: 'wifi' },
    { name: 'Event', icon: 'calendar' },
    { name: 'Contact', icon: 'address-card' },
    { name: 'Business', icon: 'briefcase' },
    { name: 'Location', icon: 'map-marker' },
    { name: 'WhatsApp', icon: 'whatsapp' },
    { name: 'Email', icon: 'envelope' },
    { name: 'Twitter', icon: 'twitter' },
    { name: 'Instagram', icon: 'instagram' },
    { name: 'Telephone', icon: 'phone' },
  ];

  const handlePress = (type) => {
    navigation.navigate('NewQR', { type });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Generate QR</Text>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('SettingsScreen')}>
          <MaterialIcons name="menu" size={30} color="#FFA500" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.grid}>
          {options.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.button} 
              onPress={() => handlePress(option.name)} 
            >
              <Text style={styles.buttonText}>{option.name}</Text>
              <Icon style={styles.buttonImage} name={option.icon} size={30} color="#FFA500" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingTop: 40,
    height: fullHeight,
    width: fullWidth,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20 * widthRef,
    marginBottom: 20 * widthRef,
  },
  title: {
    fontSize: 26,
    color: '#FFF',
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#1E1E1E',
    width: 55 * widthRef,
    height: 100 * heightRef,
    margin: 10 * heightRef,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5 * widthRef,
    borderWidth: 1,
    borderColor: '#FFA500',
    marginVertical:20*heightRef,
    padding: 1* widthRef
  },
  buttonText: {
    color: '#000',
    marginTop: 30 * widthRef,
    textAlign: 'center',
    top: -60 * heightRef,
    backgroundColor: '#FFA500',
    paddingHorizontal: 3 * widthRef,
    borderRadius: 3 * widthRef,
  },
  buttonImage: {
    marginTop: 0,
    textAlign: 'center',
    top: -35 * heightRef,
    padding: 1* widthRef
  },
});

export default MainScreen;
