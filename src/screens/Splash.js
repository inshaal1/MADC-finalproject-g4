import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { fullHeight, fullWidth, heightRef, widthRef } from "../utils/Dimensions";
import Icon from 'react-native-vector-icons/Ionicons';

const Splash = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 2300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../assets/qrcode.png')} style={styles.qrImage} />
      </View>

      <Animated.Text
        style={[
          styles.description,
          {
            transform: [{ scale: scaleAnim }], // Apply scale animation
          },
        ]}
      >
        Go and enjoy our features for free and make your life easy with us.
      </Animated.Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('DrawerNavigation')}>
        <Text style={styles.buttonText}>Let's Start</Text>
        <Icon name="arrow-forward" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    height: fullHeight,
    width: fullWidth,
    backgroundColor: "#F7A90A",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: 100 * heightRef,
  },
  qrImage: {
    width: 200 * widthRef,
    height: 200 * heightRef,
    resizeMode: "contain",
    margin: 50 * heightRef,
    marginBottom: 200 * heightRef,
  },
  description: {
    textAlign: "center",
    marginHorizontal: 10 * widthRef,
    fontSize: 18 * heightRef,
    color: "#000000",
    marginBottom: 50 * heightRef,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  button: {
    backgroundColor: "#333333",
    marginBottom: 50 * heightRef,
    marginTop: 4 * heightRef,
    paddingVertical: 15 * heightRef,
    paddingHorizontal: 30 * widthRef,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginRight: 10,
  },
});
