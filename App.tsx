/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import UserSearch from './src/screens/UserSearch';
import UserDetails from './src/screens/UserDetails';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserDirectory">
        <Stack.Screen name="UserDirectory" component={UserSearch} />
        <Stack.Screen name="UserProfile" component={UserDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
