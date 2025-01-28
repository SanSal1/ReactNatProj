import { View } from 'react-native'
import { MapViewProps } from './MapView.d'
import { Link } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'

export default function MapView({ latitude, longitude }: MapViewProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <View>
      <Link
        href={`https://www.google.com/maps/place/${latitude},${longitude}`}
        style={{
          alignSelf: 'flex-start',
          textDecorationLine: 'underline',
          color: theme.colors.primary,
          fontWeight: 600,
        }}
      >
        {t('VIEW_LOCATION_ON_MAP')}
      </Link>
    </View>
  )
}
