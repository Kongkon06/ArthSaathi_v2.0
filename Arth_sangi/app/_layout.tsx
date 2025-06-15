import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";
//import { RecoilRoot } from 'recoil';
//import { UserProvider } from '@/atoms/UserContext';
//import { AccountProvider } from '@/atoms/AccountContext'; 

import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { AppProvider } from '@/atoms/AppProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppProvider>
      <Stack>
         <Stack.Screen name="launchscreen" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      </AppProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}