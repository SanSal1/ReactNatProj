import { Component } from 'react'
import { Constructor, NativeMethodsMixin } from 'react-native'

export interface MapViewProps {
  latitude: number
  longitude: number
}

declare class MapViewComponent extends Component<MapViewProps> {}

declare const MapViewBase: Constructor<NativeMethodsMixin> &
  typeof MapViewComponent

export default class MapView extends MapViewBase {}
