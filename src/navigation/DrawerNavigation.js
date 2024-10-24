import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import BottomTabNavigation from './BottomTabNavigation';
import SettingsScreen from '../screens/SettingsScreen';
import { StyleSheet, View, Text, Image } from 'react-native';
import { heightRef, widthRef } from "../utils/Dimensions";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <Image source={require('../assets/qrcode.png')} style={styles.qrCodeImage} />
        <Text style={styles.drawerTitle}>Barcode Scanner</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawerStyle, 
        drawerActiveTintColor: '#FFA500',
        drawerInactiveTintColor: '#FFA500', 
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: '#1E1E1E',
  },
  drawerContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  qrCodeImage: {
    width: 50*widthRef, 
    height: 100*heightRef,
    marginBottom: 20,
  },
  drawerTitle: {
    color: '#FFA500',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DrawerNavigation;
