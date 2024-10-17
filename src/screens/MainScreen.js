import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

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

  const handlePress = (option) => {
    navigation.navigate('NewQR', { type: option.name });
  };

  return (
    <View style={styles.container}>
      {/* Header Section with Hamburger Icon and Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Generate QR</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="menu" size={30} color="#FFA500" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.grid}>
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handlePress(option)}>
              <Icon name={option.icon} size={30} color="#FFA500" />
              <Text style={styles.buttonText}>{option.name}</Text>
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
    backgroundColor: '#000',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space between title and hamburger icon
    alignItems: 'center', // Center items vertically
    paddingHorizontal: 20, // Optional padding
    marginBottom: 20, // Add some space below the header
  },
  title: {
    fontSize: 24,
    color: '#FFA500',
    flex: 1, // Allow title to take remaining space
    textAlign: 'center', // Center title text
  },
  scrollContainer: {
    flex: 1, // Allow ScrollView to take remaining space
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#333',
    width: 100,
    height: 100,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFA500',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default MainScreen;
