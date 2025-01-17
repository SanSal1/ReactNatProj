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
        tabBarStyle: {
          height: 58,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.surfaceVariant,
        },
        tabBarLabelStyle: {
          color: theme.colors.onSurface,
          fontFamily: 'SpaceGrotesk',
          fontSize: 14,
          fontWeight: 600,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: t('POSTS'),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              size={24}
              name='view-list'
              color={
                focused ? theme.colors.primary : theme.colors.onPrimaryContainer
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name='users'
        options={{
          title: t('USERS'),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name='group'
              size={24}
              color={
                focused ? theme.colors.primary : theme.colors.onPrimaryContainer
              }
            />
          ),
        }}
      />
    </Tabs>
  )
}
