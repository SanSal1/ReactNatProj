import { CACHE_KEYS, STALE_TIME } from '@/assets/constants'
import { getTodos } from '@/assets/utils/fetcher'
import FetchResultsWrapper from '@/components/FetchResultsWrapper'
import TodoCard from '@/components/TodoCard'
import UserModal from '@/components/UserModal'
import { Todo } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { View, FlatList } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function TodosListScreen() {
  const theme = useTheme()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<Todo[]>({
    queryKey: [CACHE_KEYS.TODOS],
    queryFn: getTodos,
    staleTime: STALE_TIME,
  })

  return (
    <FetchResultsWrapper hasData={!!todos} error={error} isLoading={isLoading}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <FlatList
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
