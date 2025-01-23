import { PLACEHOLDER_PATHS, PLACEHOLDER_ROOT_URL } from '../constants'

export const fetcher = async (path: string) => {
  const response = await fetch(path)
  if (!response.ok) {
    throw new Error('Response not ok')
  }
  const data = await response.json()
  return data
}

export const getTodos = async () => {
  return await fetcher(`${PLACEHOLDER_ROOT_URL}${PLACEHOLDER_PATHS.TODOS}`)
}

export const getUsers = async () => {
  return await fetcher(`${PLACEHOLDER_ROOT_URL}${PLACEHOLDER_PATHS.USERS}`)
}

export const getUser = async (id: number | null) => {
  return await fetcher(
    `${PLACEHOLDER_ROOT_URL}${PLACEHOLDER_PATHS.USERS}/${id}`,
  )
}
