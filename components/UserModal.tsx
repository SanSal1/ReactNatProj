import { CACHE_KEYS, STALE_TIME } from '@/assets/constants'
import { getUser } from '@/assets/utils/fetcher'
import { spacing } from '@/themes'
import { User } from '@/types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useTheme, Text, Modal, Portal, IconButton } from 'react-native-paper'

export default function UserModal({
  selectedUserId,
  open,
  handleClose,
}: {
  selectedUserId: number | null
  open: boolean
  handleClose: () => void
}) {
  const theme = useTheme()
  const { t } = useTranslation()
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: [CACHE_KEYS.USER, selectedUserId],
    queryFn: () => getUser(selectedUserId),
    staleTime: STALE_TIME,
    enabled: selectedUserId !== null,
    placeholderData: keepPreviousData,
  })

  if (error) {
    return (
      <ModalWrapper title={t('ERROR')} open={open} handleClose={handleClose}>
        <View
          style={{
            marginVertical: spacing(1),
            padding: spacing(1),
            backgroundColor: theme.colors.errorContainer,
          }}
        >
          <Text style={{ color: theme.colors.onErrorContainer }}>
            {t('UNABLE_TO_FETCH')}
          </Text>
        </View>
      </ModalWrapper>
    )
  }
  if (!user || isLoading) {
    return <ModalWrapper title='...' open={open} handleClose={handleClose} />
  }
  return (
    <ModalWrapper title={user.username} open={open} handleClose={handleClose}>
      <Text
        variant='headlineSmall'
        style={{ color: theme.colors.onPrimaryContainer }}
      >
        {user.name}
      </Text>
      <Text
        variant='titleSmall'
        style={{ color: theme.colors.onPrimaryContainer, opacity: 0.7 }}
      >
        {`${user.email} | ${user.phone} | ${user.website}`}
      </Text>
      <View
        style={{
          marginVertical: spacing(1),
          padding: spacing(1),
          backgroundColor: theme.colors.surface,
        }}
      >
        <Text
          variant='titleLarge'
          style={{ color: theme.colors.onPrimaryContainer }}
        >
          {user.company.name}
        </Text>
        <Text
          variant='titleSmall'
          style={{
            color: theme.colors.onPrimaryContainer,
            fontStyle: 'italic',
            opacity: 0.8,
          }}
        >
          {user.company.catchPhrase}
        </Text>
        <Text
          variant='titleSmall'
          style={{
            color: theme.colors.onPrimaryContainer,
            fontStyle: 'italic',
            opacity: 0.8,
          }}
        >
          {user.company.bs}
        </Text>
      </View>
    </ModalWrapper>
  )
}

function ModalWrapper({
  title,
  children,
  open,
  handleClose,
}: {
  title?: string
  children?: ReactNode
  open: boolean
  handleClose: () => void
}) {
  const theme = useTheme()
  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={handleClose}
        style={{
          paddingHorizontal: spacing(2),
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        contentContainerStyle={{
          paddingHorizontal: spacing(2),
          paddingVertical: spacing(3),
          backgroundColor: theme.colors.primaryContainer,
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Text
            variant='headlineLarge'
            style={{ color: theme.colors.onPrimaryContainer }}
          >
            {title}
          </Text>
          <View style={{ position: 'relative', width: 40 }}>
            <IconButton
              icon='close'
              iconColor={theme.colors.onPrimaryContainer}
              size={24}
              onPress={handleClose}
              style={{
                position: 'absolute',
                top: spacing(-1.5),
                right: spacing(-1),
              }}
            />
          </View>
        </View>
        {children}
      </Modal>
    </Portal>
  )
}
