import { Drawer } from 'expo-router/drawer'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import '@/i18n/index'
import { useTranslation } from 'react-i18next'
import { Pressable, View } from 'react-native'
import { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import {
  configureFonts,
  IconButton,
  PaperProvider,
  Text,
} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import IconDropdown from '@/components/IconDropdown'
import { darkTheme, lightTheme, fontConfig, spacing } from '@/themes'
import { ThemeMode } from '@/types'
import { ASYNC_STORAGE_KEYS } from '@/assets/constants'

const langs = [
  { label: 'EN', value: 'en' },
  { label: 'FI', value: 'fi' },
]

const fonts = configureFonts({ config: fontConfig })

export default function RootLayout() {
  const queryClient = new QueryClient()
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.LIGHT)

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.LOCALE, lang)
    i18n.changeLanguage(lang)
  }

  const toggleTheme = async () => {
    const newValue =
      themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.THEME_MODE, newValue)
    setThemeMode(newValue)
  }

  const loadTheme = async () => {
    const savedThemeMode = await AsyncStorage.getItem(
      ASYNC_STORAGE_KEYS.THEME_MODE,
    )
    if (
      savedThemeMode === ThemeMode.LIGHT ||
      savedThemeMode === ThemeMode.DARK
    ) {
      setThemeMode(savedThemeMode)
    }
  }

  useEffect(() => {
    loadTheme()
  }, [])

  const theme = {
    ...(themeMode === ThemeMode.LIGHT ? lightTheme : darkTheme),
    fonts,
  }

  const [loaded] = useFonts({
    SpaceGrotesk: require('../assets/fonts/SpaceGrotesk-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            screenOptions={{
              drawerActiveTintColor: theme.colors.primary,
              drawerStyle: { backgroundColor: theme.colors.surface },
              drawerLabelStyle: {
                color: theme.colors.onSurface,
                fontFamily: 'SpaceGrotesk',
                fontSize: 16,
                fontWeight: 600,
              },
              header: ({ navigation, options }) => (
                <View
                  style={{
                    backgroundColor: theme.colors.primary,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: spacing(1),
                    height: 66,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: spacing(1),
                    }}
                  >
                    <Pressable
                      onPress={() => navigation.openDrawer()}
                      style={{ padding: spacing(1) }}
                    >
                      <MaterialIcons
                        name='menu'
                        size={28}
                        color={theme.colors.onPrimary}
                      />
                    </Pressable>
                    <Text
                      variant='headlineSmall'
                      style={{
                        fontWeight: 500,
                        color: theme.colors.onPrimary,
                      }}
                    >
                      {options.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: spacing(0.5),
                    }}
                  >
                    <IconButton
                      icon='theme-light-dark'
                      iconColor={theme.colors.onPrimary}
                      size={24}
                      onPress={toggleTheme}
                    />
                    <IconDropdown
                      icon='translate'
                      color={theme.colors.onPrimary}
                      options={langs}
                      onChange={changeLanguage}
                      selectedOption={currentLanguage}
                    />
                  </View>
                </View>
              ),
            }}
          >
            <Drawer.Screen
              name='index'
              options={{
                title: t('HOME'),
                drawerIcon: ({ focused }) => (
                  <MaterialIcons
                    size={24}
                    name='home'
                    color={
                      focused
                        ? theme.colors.primary
                        : theme.colors.onPrimaryContainer
                    }
                  />
                ),
              }}
            />
            <Drawer.Screen
              name='(tabs)'
              options={{
                title: t('TODOS'),
                drawerIcon: ({ focused }) => (
                  <MaterialIcons
                    size={24}
                    name='view-list'
                    color={
                      focused
                        ? theme.colors.primary
                        : theme.colors.onPrimaryContainer
                    }
                  />
                ),
              }}
            />
            <Drawer.Screen
              name='+not-found'
              options={{
                title: t('NOT_FOUND_PAGE'),
                drawerItemStyle: { display: 'none' },
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </PaperProvider>
  )
}
