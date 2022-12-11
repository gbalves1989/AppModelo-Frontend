import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { signOut } from '../../src/contexts/AuthContext'

const setupAPIClient = (ctx = undefined) => {
  const cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}`,
    },
  })

  api.interceptors.response.use(
    response => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          signOut()
        } else {
          return Promise.reject('Usuário não autorizado.')
        }
      } else {
        return Promise.reject(error.response?.data.message.toString())
      }
    },
  )

  return api
}

export { setupAPIClient }
