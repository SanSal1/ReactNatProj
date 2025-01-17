import { Drawer } from 'expo-router/drawer'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import '@/i18n/index'
import { useTranslation } from 'react-i18next'
import { Pressable, View } from 'react-native'
import { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import {
  configureFonts,
  IconButton,
  PaperProvider,
  Text,
} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import IconDropdown from '@/components/IconDropdown'
import { darkTheme, lightTheme, fontConfig } from '@/themes'
import { ThemeMode } from '@/types'

const langs = [
  { label: 'EN', value: 'en' },
  { label: 'FI', value: 'fi' },
]

const fonts = configureFonts({ config: fontConfig })

export default function RootLayout() {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.LIGHT)

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem('locale', lang)
    i18n.changeLanguage(lang)
  }

  const toggleTheme = async () => {
    const newValue =
      themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
    await AsyncStorage.setItem('isLightTheme', newValue)
    setThemeMode(newValue)
  }

  const loadTheme = async () => {
    const savedThemeMode = await AsyncStorage.getItem('locale')
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
                  padding: 8,
                  height: 66,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 8,
                  }}
                >
                  <Pressable
                    onPress={() => navigation.openDrawer()}
                    style={{ padding: 8 }}
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
                    columnGap: 4,
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
            name='posts'
            options={{
              title: t('POSTS'),
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
    </PaperProvider>
  )
}
