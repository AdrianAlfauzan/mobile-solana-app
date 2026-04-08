import { Tabs } from 'expo-router'
import { Text } from 'react-native'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#6b7280',
        headerStyle: {
          backgroundColor: '#3b82f6',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="faucet"
        options={{
          title: 'Faucet',
          tabBarIcon: ({ focused, color }) => <Text style={{ fontSize: 24 }}>💰</Text>,
        }}
      />
    </Tabs>
  )
}
