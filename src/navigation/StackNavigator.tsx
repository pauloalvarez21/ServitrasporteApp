import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DeviceInfoScreen from '../screens/DeviceInfoScreen';
import { PermissionScreen } from '../screens/PermissionScreen';

// Define los tipos de rutas
export type RootStackParamList = {
  Home: undefined;
  Device: undefined;
  PermissionScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#ffffff'},
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Device" component={DeviceInfoScreen} />
      <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
    </Stack.Navigator>
  );
};
