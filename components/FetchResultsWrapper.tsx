import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet } from 'react-native'
import { useTheme, Text, ActivityIndicator } from 'react-native-paper'

export default function FetchResultsWrapper({
  hasData,
  error,
  isLoading,
  children,
}: {
  hasData: boolean
  error: Error | null
  isLoading: boolean
  children: ReactNode
}) {
  const theme = useTheme()
  const { t } = useTranslation()

  if (error) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text>{t('ERROR')}</Text>
      </View>
    )
  }
  if (!hasData || isLoading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator size='large' />
      </View>
    )
  }
  return children
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
