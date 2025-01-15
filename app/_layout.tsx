import { Drawer } from 'expo-router/drawer'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function RootLayout() {
  return (
    <Drawer screenOptions={{ drawerActiveTintColor: 'steelblue' }}>
      <Drawer.Screen
        name='index'
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => (
            <MaterialIcons size={24} name='home' color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='posts'
        options={{
          title: 'Posts',
          drawerIcon: ({ color }) => (
            <MaterialIcons size={24} name='view-list' color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='+not-found'
        options={{
          title: '404: Page not found',
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  )
}
