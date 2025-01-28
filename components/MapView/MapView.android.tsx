import NativeMapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { MapViewProps } from './MapView.d'
import { MAP_ZOOM } from '@/assets/constants'
import { View } from 'react-native'

export default function MapView({ latitude, longitude }: MapViewProps) {
  return (
    <View style={{ width: '100%', height: 200 }}>
      <NativeMapView
        provider={PROVIDER_GOOGLE}
        style={{
          width: '100%',
          height: '100%',
        }}
        region={{
          latitude,
          longitude,
          latitudeDelta: MAP_ZOOM,
          longitudeDelta: MAP_ZOOM,
        }}
        rotateEnabled={false}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </NativeMapView>
    </View>
  )
}
