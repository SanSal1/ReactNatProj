import { View, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'

export default function NotFound() {
  const theme = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.onError }]}>
      <Text variant='headlineLarge' style={{ color: theme.colors.error }}>
        404
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
