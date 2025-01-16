import { Drawer } from 'expo-router/drawer'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import '@/i18n/index'
import { useTranslation } from 'react-i18next'
import { Pressable, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const langs = [
  { label: 'EN', value: 'en' },
  { label: 'FI', value: 'fi' },
]

export default function RootLayout() {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language
  const [selectedLng, setSelectedLng] = useState<string | null>(currentLanguage)
  const [open, setOpen] = useState(false)

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem('locale', lang)
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    if (selectedLng) {
      changeLanguage(selectedLng)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLng])

  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: 'steelblue',
        header: ({ navigation, options }) => (
          <View
            style={{
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
                <MaterialIcons name='menu' size={28} color='black' />
              </Pressable>
              <Text style={{ padding: 8, fontSize: 22, fontWeight: 500 }}>
                {options.title}
              </Text>
            </View>
            <DropDownPicker
              containerStyle={{ width: 80 }}
              style={{ borderWidth: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }}
              labelStyle={{ fontWeight: 500, fontSize: 16, textAlign: 'right' }}
              dropDownContainerStyle={{ borderWidth: 0 }}
              TickIconComponent={() => (
                <MaterialIcons name='check' size={24} color='steelblue' />
              )}
              open={open}
              setOpen={setOpen}
              value={selectedLng}
              setValue={setSelectedLng}
              items={langs}
              ArrowUpIconComponent={() => (
                <MaterialIcons name='language' size={24} color='black' />
              )}
              ArrowDownIconComponent={() => (
                <MaterialIcons name='language' size={24} color='black' />
              )}
            />
          </View>
        ),
      }}
    >
      <Drawer.Screen
        name='index'
        options={{
          title: t('HOME'),
          drawerIcon: ({ color }) => (
            <MaterialIcons size={24} name='home' color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='posts'
        options={{
          title: t('POSTS'),
          drawerIcon: ({ color }) => (
            <MaterialIcons size={24} name='view-list' color={color} />
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
  )
}
