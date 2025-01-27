import { Todo } from '@/types'
import { ROOT_PATH, API_PATHS } from '../constants'

export const fetcher = async (path: string, method = 'GET', body?: object) => {
  const response = await fetch(path, { method, body: JSON.stringify(body) })
  if (!response.ok) {
    throw new Error('Response not ok')
  }
  const data = await response.json()
  return data
}

export const getTodos = async () => {
  return await fetcher(`${ROOT_PATH}${API_PATHS.POSTS}`)
}

export const postTodo = async (todo: Todo) => {
  return await fetcher(`${ROOT_PATH}${API_PATHS.POSTS}`, 'POST', todo)
}

export const getUsers = async () => {
  return await fetcher(`${ROOT_PATH}${API_PATHS.USERS}`)
}

export const getUser = async (id: number | null) => {
  return await fetcher(`${ROOT_PATH}${API_PATHS.USERS}/${id}`)
}
