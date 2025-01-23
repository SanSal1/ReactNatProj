import { CACHE_KEYS, STALE_TIME } from '@/assets/constants'
import { getUsers } from '@/assets/utils/fetcher'
import FetchResultsWrapper from '@/components/FetchResultsWrapper'
import UserCard from '@/components/UserCard'
import UserModal from '@/components/UserModal'
import { User } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { View, FlatList } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function TodoUsersScreen() {
  const theme = useTheme()

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: [CACHE_KEYS.USERS],
    queryFn: getUsers,
    staleTime: STALE_TIME,
  })

  return (
    <FetchResultsWrapper hasData={!!users} error={error} isLoading={isLoading}>
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
          data={users}
          style={{ width: '100%' }}
          renderItem={({ item }) => (
            <UserCard
              user={item}
              handleViewUser={() => setSelectedUserId(item.id)}
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
