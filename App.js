import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react'
import DataContextProvider from './src/context/DataContext';

// Pages
import AddList from './src/pages/AddList';
import Home from './src/pages/Home';
import ListDetails from './src/pages/ListDetails';
import Login from './src/pages/Login';
import Profile from './src/pages/Profile';
import SignUp from './src/pages/SignUp';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <DataContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="AddList" component={AddList} />
          <Stack.Screen name="ListDetails" component={ListDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataContextProvider>
  );
}
