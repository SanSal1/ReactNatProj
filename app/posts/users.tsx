import { View, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'

export default function UsersScreen() {
  const theme = useTheme()
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text
        variant='headlineLarge'
        style={{ color: theme.colors.onBackground }}
      >
        Users
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
