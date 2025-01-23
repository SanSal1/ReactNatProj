import { CACHE_KEYS, STALE_TIME } from '@/assets/constants'
import { getUser } from '@/assets/utils/fetcher'
import { spacing } from '@/themes'
import { Todo, User } from '@/types'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useQuery } from '@tanstack/react-query'
import { View, Pressable } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'

export default function TodoCard({
  todo,
  handleViewUser,
}: {
  todo: Todo
  handleViewUser: () => void
}) {
  const theme = useTheme()

  const { data: user, error } = useQuery<User>({
    queryKey: [CACHE_KEYS.USER, todo.userId],
    queryFn: () => getUser(todo.userId),
    staleTime: STALE_TIME,
  })

  return (
    <View
      style={{
        paddingHorizontal: spacing(1),
        paddingVertical: spacing(0.5),
      }}
    >
      <Card
        style={{
          backgroundColor: todo.completed
            ? theme.colors.secondaryContainer
            : theme.colors.primaryContainer,
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
                style={{
                  textDecorationLine: user ? 'underline' : 'none',
                  color: todo.completed
                    ? theme.colors.onSecondaryContainer
                    : theme.colors.onPrimaryContainer,
                }}
              >
                {error ? 'n/a' : (user?.username ?? '...')}
              </Text>
            </Pressable>
          }
          right={
            todo.completed
              ? () => (
                  <MaterialIcons
                    size={28}
                    name={todo.completed ? 'check' : 'close'}
                    style={{ marginRight: spacing(2) }}
                    color={theme.colors.secondary}
                  />
                )
              : undefined
          }
        />

        <Card.Content>
          <Text>{todo.title}</Text>
        </Card.Content>
      </Card>
    </View>
  )
}
