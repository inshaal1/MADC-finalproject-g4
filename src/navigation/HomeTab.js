import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen'; 
import Camera from '../screens/Camera';
import HistoryScreen from '../screens/HistoryScreen';
import { Image, TouchableOpacity, View } from 'react-native'; 
import FontAwesome from '@expo/vector-icons/FontAwesome'; 
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; 
import qrcodeImage from '../assets/qrcode.png'; 

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator 
      initialRouteName="MainScreen"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#1E1E1E', 
          borderTopWidth: 0,
          position: 'absolute',
          width:"90%",
          left:15,
          right:10,
          bottom:10,
          marginBottom: 20,
          height: 55,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 10,
          borderRadius:5,
          shadowOffset: { width: 0, height: 5 },
        },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ focused, size }) => {
          if (route.name === 'Camera') {
            return null; 
          }
          let Icon;
          switch (route.name) {
            case 'MainScreen':
              Icon = (
                <FontAwesome 
                  name="qrcode" 
                  size={size} 
                  color={focused ? '#FFA500' : 'white'} 
                />
              );
              break;
            case 'History':
              Icon = (
                <MaterialIcons 
                  name="history" 
                  size={size} 
                  color={focused ? '#FFA500' : 'white'} 
                />
              );
              break;
            default:
              Icon = <Icon name="circle" />;
          }
          return Icon;
        },
      })}>
      
      <Tab.Screen 
        name="MainScreen" 
        component={MainScreen} 
        options={{
          tabBarLabel: 'Generate',
          headerShown: false,
        }} 
      />
      
      <Tab.Screen 
        name="Camera" 
        component={Camera} 
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={{ top: -35 }}>
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#FFA500',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#FFA500',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.9,
                shadowRadius: 10,
                elevation: 10,
              }}>
                <Image 
                  source={qrcodeImage} 
                  style={{ width: 30, height: 30,  }} 
                />
              </View>
            </TouchableOpacity>
          ),
          headerShown: false,
        }} 
      />
      
      <Tab.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{
          tabBarLabel: 'History',
          headerShown: false,
        }} 
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
