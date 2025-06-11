import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Premium light theme colors
  const premiumColors = {
    light: {
      tint: '#2563EB', // Premium blue
      activeTint: '#1D4ED8', // Darker blue for active state
      inactiveTint: '#64748B', // Subtle gray for inactive
      background: '#FFFFFF',
      tabBarBackground: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#E2E8F0',
      shadowColor: '#1E293B'
    }
  };

  const currentTheme = premiumColors.light;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: currentTheme.activeTint,
        tabBarInactiveTintColor: currentTheme.inactiveTint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          fontFamily: Platform.select({
            ios: 'SF Pro Text',
            android: 'Roboto',
            default: 'System'
          }),
          marginBottom: Platform.select({
            ios: 0,
            android: 2,
            default: 0
          }),
        },
        tabBarIconStyle: {
          marginTop: Platform.select({
            ios: 2,
            android: 0,
            default: 0
          }),
          
        },
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: currentTheme.tabBarBackground,
            borderTopWidth: 0.5,
            borderTopColor: currentTheme.borderColor,
            paddingTop: 8,
            paddingBottom: 20,
            height: 88,
            shadowColor: currentTheme.shadowColor,
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.08,
            shadowRadius: 8,
          },
          android: {
            backgroundColor: currentTheme.background,
            borderTopWidth: 0.5,
            borderTopColor: currentTheme.borderColor,
            elevation: 12,
            paddingTop: 8,
            paddingBottom: 8,
            height: 68,
            marginBottom: 4,
          },
          default: {
            backgroundColor: currentTheme.background,
            borderTopWidth: 0.5,
            borderTopColor: currentTheme.borderColor,
            paddingTop: 4,
            height: 68,
          },
        }),
        tabBarItemStyle: {
          paddingVertical: 0,
          marginHorizontal: Platform.select({
            ios: 2,
            android: 4,
            default: 2
          }),
        },
      }}>
      
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 28 : 26} 
              name="home" 
              color={color}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="accounts"
        options={{
          title: 'Accounts',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 28 : 26} 
              name="bank" 
              color={color}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="investment"
        options={{
          title: 'Invest',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 28 : 26} 
              name="trending-up" 
              color={color}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="advisor"
        options={{
          title: 'Advisor',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 28 : 26} 
              name="account-supervisor" 
              color={color}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="learning"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 28 : 26} 
              name="book-open-variant" 
              color={color}
            />
          ),
        }}
      />
      
    </Tabs>
  );
}