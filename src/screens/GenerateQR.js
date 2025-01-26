import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; 
import { useNavigation } from '@react-navigation/native';
import { fullHeight, fullWidth, heightRef, widthRef } from "../utils/Dimensions";

const GenerateQR = () => {
  const navigation = useNavigation();
  const options = [
    { name: 'Text', icon: 'format-textbox', type: 'MaterialCommunityIcons' }, 
    { name: 'Website', icon: 'globe', type: 'FontAwesome' },
    { name: 'WiFi', icon: 'wifi', type: 'FontAwesome' },
    { name: 'Event', icon: 'calendar', type: 'FontAwesome' },
    { name: 'Contact', icon: 'address-card', type: 'FontAwesome' },
    { name: 'Business', icon: 'briefcase', type: 'FontAwesome' },
    { name: 'Location', icon: 'map-marker', type: 'FontAwesome' },
    { name: 'WhatsApp', icon: 'whatsapp', type: 'FontAwesome' },
    { name: 'Email', icon: 'envelope', type: 'FontAwesome' },
    { name: 'Twitter', icon: 'twitter', type: 'FontAwesome' },
    { name: 'Instagram', icon: 'instagram', type: 'FontAwesome' },
    { name: 'Telephone', icon: 'phone', type: 'FontAwesome' },
  ];

  const handlePress = (type) => {
    navigation.navigate('NewQR', { type });
  };

  const renderIcon = (iconName, iconType) => {
    const iconSize = 30; // You can change this size if needed
    if (iconType === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons
          name={iconName}
          size={iconSize}
          color="#FFA500"
          style={styles.buttonImage} 
        />
      );
    }
    return (
      <Icon
        name={iconName}
        size={iconSize}
        color="#FFA500"
        style={styles.buttonImage}
      />
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Generate QR</Text>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
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
              {renderIcon(option.icon, option.type)}
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
    paddingTop: 40 * heightRef,
    paddingBottom: 120 * heightRef,
    height: fullHeight,
    width: fullWidth,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20 * widthRef,
    marginBottom: 10 * widthRef,
   },
  title: {
    fontSize: 22,
    color: '#FFF',
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
    marginVertical: 20 * heightRef,
    padding: 1 * widthRef,
  },
  buttonText: {
    color: '#000',
    marginTop: 30 * widthRef,
    textAlign: 'center',
    top: -60 * heightRef,
    backgroundColor: '#FFA500',
    paddingHorizontal: 3 * widthRef,
    borderRadius: 3 * widthRef,
    margin:0,
    fontWeight: '400'
  },
  buttonImage: {
    textAlign: 'center',
    top: -40 * heightRef,
    padding: 0 * widthRef,
  },
});

export default GenerateQR;
