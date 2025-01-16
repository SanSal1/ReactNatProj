import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getLocales } from 'expo-localization'

import en from './locales/en.json'
import fi from './locales/fi.json'

const initI18n = async () => {
  const systemLanguage = getLocales()[0]?.languageCode
  const savedLanguage = await AsyncStorage.getItem('locale')
  i18n.use(initReactI18next).init({
    lng: savedLanguage ?? systemLanguage ?? undefined,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: en,
      },
      fi: {
        translation: fi,
      },
    },
  })
}

initI18n()

export default i18n
