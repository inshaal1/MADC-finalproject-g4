import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet ,navigate,navigation} from 'react-native';
import { fullHeight, fullWidth, heightRef, widthRef } from "../utils/Dimensions";

const SettingsScreen = ({ navigation }) => {
  const [isVibrateEnabled, setIsVibrateEnabled] = useState(false);
  const [isBeepEnabled, setIsBeepEnabled] = useState(false);

  const toggleVibrate = () => setIsVibrateEnabled((prev) => !prev);
  const toggleBeep = () => setIsBeepEnabled((prev) => !prev);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowBox} onPress={() => navigation.goBack()}>
        <Text style={styles.arrow}>{'<'}</Text>
      </TouchableOpacity>

      <View style={styles.marginBottom} />

      <Text style={styles.header}>Settings</Text>

      <View style={styles.box}>
        <View style={styles.option}>
          <Text style={styles.optionText}>Vibrate</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#FFC107" }}
            thumbColor={isVibrateEnabled ? "#FFC107" : "#f4f3f4"}
            onValueChange={toggleVibrate}
            value={isVibrateEnabled}
          />
        </View>
        <Text style={styles.description}>Vibration when scan is done.</Text>
      </View>

      <View style={styles.box}>
        <View style={styles.option}>
          <Text style={styles.optionText}>Beep</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#FFC107" }}
            thumbColor={isBeepEnabled ? "#FFC107" : "#f4f3f4"}
            onValueChange={toggleBeep}
            value={isBeepEnabled}
          />
        </View>
        <Text style={styles.description}>Beep when scan is done.</Text>
      </View>

      <View style={styles.sectionSpacing} />

      <Text style={styles.header}>Support</Text>

      <View style={styles.supportBox}>
        <TouchableOpacity style={[styles.supportOption, styles.borderBottom]}>
          <Text style={styles.supportText}>Rate Us</Text>
          <Text style={styles.supportDescription}>Your best reward to us.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.supportOption, styles.borderBottom]}>
          <Text style={styles.supportText}>Share</Text>
          <Text style={styles.supportDescription}>Share app with others.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.supportOption}>
          <Text style={styles.supportText}>Privacy Policy</Text>
          <Text style={styles.supportDescription}>Follow our policies that benefit you.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: fullHeight,
    width: fullWidth,
    backgroundColor: "#1E1E1E",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10 * widthRef,
    paddingTop: 40 * heightRef,
  },
  arrowBox: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12 * widthRef,
    padding: 5 * widthRef,
    elevation: 10,  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 * heightRef },
    shadowOpacity: 0.5,  
    shadowRadius: 5 * widthRef,  
    width: 25 * widthRef,
    height: 27 * widthRef,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 5 * widthRef,
  },
  arrow: {
    fontSize: 15 * widthRef,
    color: '#FFC107',
  },
  marginBottom: {
    marginBottom: 15 * heightRef,
  },
  header: {
    fontSize: 18 * widthRef,
    color: '#FFC107',
    marginBottom: 15 * heightRef,
    alignSelf: 'flex-start',
    marginLeft: 5 * widthRef,
  },
  box: {
    backgroundColor: '#1E1E1E',
    width: '95%',
    paddingVertical: 10 * heightRef,
    paddingHorizontal: 10 * widthRef,
    borderRadius: 10 * widthRef,
    marginBottom: 16 * heightRef,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 * heightRef },
    shadowOpacity: 0.2,
    shadowRadius: 2.5 * widthRef,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1 * heightRef,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 12 * widthRef,
  },
  description: {
    color: '#B0B0B0',
    fontSize: 8 * widthRef,
  },
  sectionSpacing: {
    marginBottom: 30 * heightRef,
  },
  supportBox: {
    backgroundColor: '#1E1E1E',
    width: '95%',
    paddingVertical: 1 * heightRef,
    borderRadius: 10 * widthRef,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 * heightRef },
    shadowOpacity: 0.2,
    shadowRadius: 2.5 * widthRef,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
  supportOption: {
    paddingVertical: 10 * heightRef,
    paddingHorizontal: 8 * widthRef,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    width: '100%',
  },
  supportText: {
    color: '#FFFFFF',
    fontSize: 12 * widthRef,
  },
  supportDescription: {
    color: '#B0B0B0',
    fontSize: 8 * widthRef,
  },
});

export default SettingsScreen;
