import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import DetailScreen from '../screens/DetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerShown: true,
            title: 'Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
