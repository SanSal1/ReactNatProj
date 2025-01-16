import { Tabs } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'

export default function RootLayout() {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: { height: 54 },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: t('POSTS'),
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={24} name='view-list' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='users'
        options={{
          title: t('USERS'),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='group' size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
