import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from '@/src/context/UserContext';
import RootStackNavigator from '@/src/navigation/RootStackNavigator';
import { Provider } from 'react-redux';
import { store } from '@/src/store/store';

export default function App() {
  return (
  <Provider store={store}>
    <UserProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </UserProvider>
  </Provider>
  );
}

