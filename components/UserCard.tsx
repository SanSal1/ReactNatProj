import { spacing } from '@/themes'
import { User } from '@/types'
import { View, Pressable } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'

export default function UserCard({
  user,
  handleViewUser,
}: {
  user: User
  handleViewUser: () => void
}) {
  const theme = useTheme()
  return (
    <View
      style={{
        paddingHorizontal: spacing(1),
        paddingVertical: spacing(0.5),
      }}
    >
      <Card
        style={{
          backgroundColor: theme.colors.primaryContainer,
        }}
      >
        <Card.Title
          title={
            <Pressable
              style={{ alignSelf: 'flex-start' }}
              onPress={handleViewUser}
            >
              <Text
                variant='titleLarge'
                style={{ textDecorationLine: user ? 'underline' : 'none' }}
              >
                {user.username}
              </Text>
            </Pressable>
          }
        />
        <Card.Content>
          <Text
            variant='titleMedium'
            style={{ color: theme.colors.onPrimaryContainer }}
          >
            {user.name}
          </Text>
          <Text
            variant='titleSmall'
            style={{ color: theme.colors.outlineVariant }}
          >
            {`${user.email} | ${user.phone} | ${user.website}`}
          </Text>
        </Card.Content>
      </Card>
    </View>
  )
}
