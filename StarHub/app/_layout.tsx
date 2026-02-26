import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#888',
      tabBarStyle: { backgroundColor: '#000', borderTopColor: '#222', height: 60, paddingBottom: 5 },
      headerShown: false,
    }}>
      <Tabs.Screen name="index" options={{ title: 'WhatsApp', tabBarIcon: ({color}) => <Ionicons name="logo-whatsapp" size={24} color={color} /> }} />
      <Tabs.Screen name="instagram" options={{ title: 'Instagram', tabBarIcon: ({color}) => <Ionicons name="logo-instagram" size={24} color={color} /> }} />
      <Tabs.Screen name="youtube" options={{ title: 'YouTube', tabBarIcon: ({color}) => <Ionicons name="logo-youtube" size={24} color={color} /> }} />
    </Tabs>
  );
}