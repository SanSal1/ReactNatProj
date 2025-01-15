import { Tabs } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'steelblue',
        tabBarStyle: { height: 54 },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={24} name='view-list' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='users'
        options={{
          title: 'Users',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='group' size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
