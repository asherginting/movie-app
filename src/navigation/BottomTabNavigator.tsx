import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

const Tab = createBottomTabNavigator();

const ROUTES = {
  HOME: 'Home',
  FAVORITES: 'Favorites',
} as const;

type RouteNames = (typeof ROUTES)[keyof typeof ROUTES];

const ICON_NAMES: Record<RouteNames, {active: string; inactive: string}> = {
  [ROUTES.HOME]: {active: 'home', inactive: 'home-outline'},
  [ROUTES.FAVORITES]: {active: 'heart', inactive: 'heart-outline'},
};

const getTabBarIcon = (
  route: {name: RouteNames},
  focused: boolean,
  color: string,
  size: number,
): JSX.Element => {
  const iconName = ICON_NAMES[route.name][focused ? 'active' : 'inactive'];
  return <Icon name={iconName} size={size} color={color} />;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          getTabBarIcon({name: route.name as RouteNames}, focused, color, size),
        tabBarActiveTintColor: '#8A2BE2',
        tabBarInactiveTintColor: '#808080',
      })}>
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.FAVORITES} component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
