import { CACHE_KEYS, STALE_TIME } from '@/assets/constants'
import { getTodos, postTodo } from '@/assets/utils/fetcher'
import FetchResultsWrapper from '@/components/FetchResultsWrapper'
import TodoCard from '@/components/TodoCard'
import UserModal from '@/components/UserModal'
import { spacing } from '@/themes'
import { Todo } from '@/types'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Button, Checkbox, TextInput, useTheme } from 'react-native-paper'

export default function TodosListScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const queryClient = useQueryClient()

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [completed, setCompleted] = useState(false)

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<Todo[]>({
    queryKey: [CACHE_KEYS.POSTS],
    queryFn: getTodos,
    staleTime: STALE_TIME,
  })

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.POSTS] })
    },
  })

  const handleAddTodo = () => {
    if (!title || !todos) return
    const newTodo: Todo = {
      id: Math.max(...todos.map(({ id }) => id)) + 1,
      userId: null,
      title,
      completed,
    }
    setTitle('')
    setCompleted(false)
    mutation.mutate(newTodo)
  }

  return (
    <FetchResultsWrapper hasData={!!todos} error={error} isLoading={isLoading}>
      <View
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                marginBottom: spacing(1),
                padding: 16,
                backgroundColor: theme.colors.primaryContainer,
                borderBottomColor: theme.colors.outline,
                borderBottomWidth: 1,
                rowGap: spacing(1),
              }}
            >
              <TextInput
                label={t('TITLE')}
                value={title}
                onChangeText={setTitle}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <Checkbox.Item
                  label={t('COMPLETED')}
                  status={completed ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setCompleted(!completed)
                  }}
                  position='leading'
                  style={{ paddingHorizontal: spacing(1), paddingVertical: 0 }}
                />
                <Button
                  icon={() => (
                    <MaterialIcons
                      size={20}
                      name='add'
                      color={
                        !title
                          ? theme.colors.onSurfaceDisabled
                          : theme.colors.onPrimary
                      }
                    />
                  )}
                  mode='contained'
                  onPress={handleAddTodo}
                  contentStyle={{ flexDirection: 'row-reverse' }}
                  disabled={!title}
                >
                  {t('CREATE')}
                </Button>
              </View>
            </View>
          }
          keyExtractor={(item) => item.id.toString()}
          data={todos}
          style={{ width: '100%' }}
          renderItem={({ item }) => (
            <TodoCard
              todo={item}
              handleViewUser={() => setSelectedUserId(item.userId)}
            />
          )}
        />
        <UserModal
          selectedUserId={selectedUserId}
          open={selectedUserId !== null}
          handleClose={() => setSelectedUserId(null)}
        />
      </View>
    </FetchResultsWrapper>
  )
}
