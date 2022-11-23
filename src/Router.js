import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import First from './pages/First';
import Second from './pages/Second';
import Third from './pages/Third';
import Fourth from './pages/Fourth';
import Fifth from './pages/Fifth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="First"
        component={First}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Second"
        component={Second}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Third"
        component={Third}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
  
}

function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: {
            fontWeight: '700',
            fontSize: 15,
          },
          tabBarIconStyle: { display: 'none' },
          tabBarActiveTintColor: '#000',
        }}>
        <Tab.Screen
          name="Customer"
          component={CustomerStack}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Barber"
          component={Fourth}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Admin"
          component={Fifth}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Router;
