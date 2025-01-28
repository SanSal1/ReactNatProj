import { Todo } from '@/types'
import { ROOT_PATH, API_PATHS, ROOT_PATH_ANDROID } from '../constants'
import { Platform } from 'react-native'

export const fetcher = async (path: string, method = 'GET', body?: object) => {
  const response = await fetch(path, {
    method,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!response.ok) {
    throw new Error('Response not ok')
  }
  const data = await response.json()
  return data
}

export const buildPath = (endpoint: string) => {
  const rootPath = Platform.OS === 'android' ? ROOT_PATH_ANDROID : ROOT_PATH
  return `${rootPath}${endpoint}`
}

export const getTodos = async () => {
  return await fetcher(buildPath(API_PATHS.POSTS))
}

export const postTodo = async (todo: Todo) => {
  return await fetcher(buildPath(API_PATHS.POSTS), 'POST', todo)
}

export const getUsers = async () => {
  return await fetcher(buildPath(API_PATHS.USERS))
}

export const getUser = async (id: number | null) => {
  return await fetcher(buildPath(`${API_PATHS.USERS}/${id}`))
}
