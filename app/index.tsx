import { View, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'

export default function Index() {
  const theme = useTheme()
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text
        variant='headlineLarge'
        style={{ color: theme.colors.onBackground }}
      >
        Home screen
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
