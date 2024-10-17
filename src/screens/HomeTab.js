import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './MainScreen'; // Ensure MainScreen is imported
import Camera from './Camera';
import HistoryScreen from './HistoryScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator 
      initialRouteName="MainScreen"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: 'black', borderTopWidth: 0 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'MainScreen':
              iconName = 'plus-circle';
              break;
            case 'Camera':
              iconName = 'camera';
              break;
            case 'History':
              iconName = 'history';
              break;
            default:
              iconName = 'circle';
          }
          return (
            <Icon 
              name={iconName} 
              color={focused ? '#FFA500' : 'white'} 
              size={size} 
            />
          );
        },
      })}
    >
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
          tabBarLabel: 'Scan',
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
