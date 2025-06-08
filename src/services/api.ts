import axios, { AxiosError } from 'axios'
import { AuthTokenError } from './errors/AuthTokenErorr'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'sonner'

const HTTTP_STATUS = Object.freeze({
  PENDING: 'PENDING',
  FULLFILED: 'FULLFILED',
  REJECTED: 'REJECTED'
})
const debug = {
  debugError: function (msg: string) {
    console.log('%c' + msg, 'color:' + 'tomato' + ';font-weight:bold;')
  },
  debugWarning: function (msg: string) {
    console.log('%c' + msg, 'color:' + 'yellow' + ';font-weight:bold;')
  },
  debugSuccess: function (msg: string) {
    console.log('%c' + msg, 'color:' + 'green' + ';font-weight:bold;')
  }
}

const baseURL = process.env.NEXT_PUBLIC_API_URL

const setupAPIClient = () => {
  const api = axios.create({
    baseURL: baseURL
  })
  api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      const status = error.response?.status

      if (status === StatusCodes.UNAUTHORIZED) {
        // Usuário não autorizado
        toast.error('Sessão expirada. Faça login novamente.')
        if (typeof window !== 'undefined') {
          // Deslogar usuário aqui se necessário
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}

const api = setupAPIClient()
const useApi = () => ({
  a: () => {}
})

export { api, HTTTP_STATUS, debug, useApi }
