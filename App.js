import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react'
import DataContextProvider from './src/context/DataContext';
import Home from './src/pages/Home';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <DataContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataContextProvider>
  );
}
