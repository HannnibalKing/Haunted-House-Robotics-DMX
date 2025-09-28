import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExperienceProvider } from './src/context/ExperienceContext';
import { DashboardScreen, RootStackParamList } from './src/screens/DashboardScreen';
import { RoomDetailScreen } from './src/screens/RoomDetailScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.ReactElement {
  return (
    <ExperienceProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#0f0f10' },
            headerTintColor: '#f6f7fb',
            contentStyle: { backgroundColor: '#0f0f10' }
          }}
        >
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Scare Experience' }} />
          <Stack.Screen name="RoomDetail" component={RoomDetailScreen} options={{ title: 'Room Intel' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExperienceProvider>
  );
}
