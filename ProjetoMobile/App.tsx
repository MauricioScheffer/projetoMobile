import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {} from 'react-native';
import  HomeNavigator  from './src/navigation/Screen.tsx';
// import Cad from './Cad';

export default function App() {
  return (
    <NavigationContainer>
       <HomeNavigator/>
    </NavigationContainer>
  );
}
