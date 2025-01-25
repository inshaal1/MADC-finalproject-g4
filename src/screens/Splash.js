import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  navigate,
  navigation,
} from "react-native";
import React from "react";
import {
  fullHeight,
  fullWidth,
  heightRef,
  widthRef,
} from "../utils/Dimensions";
import Icon from "react-native-vector-icons/Ionicons";

const Splash = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/qrcode.png")}
          style={styles.qrImage}
        />
      </View>

      <Text style={styles.description}>
        Go and enjoy our features for free and make your life easy with us.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("DrawerNavigation")}
      >
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
    marginBottom: 40,
  },
  qrImage: {
    width: 200 * widthRef,
    height: 200 * heightRef,
    resizeMode: "contain",
    margin: 50 * heightRef,
    marginBottom: 250 * heightRef,
  },
  description: {
    textAlign: "center",
    marginHorizontal: 50 * widthRef,
    marginVertical: 2 * heightRef,
    width: 0.9 * fullWidth,
    height: 72 * heightRef,
    fontSize: 16 * heightRef,
    color: "#000000",
  },
  button: {
    backgroundColor: "#333333",
    marginbottom: 50 * heightRef,
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
