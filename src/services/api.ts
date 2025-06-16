import axios, { AxiosError } from 'axios'
import { AuthTokenError } from './errors/AuthTokenErorr'
import { StatusCodes } from 'http-status-codes'

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

  const TOKEN_ERROR_MESSAGES = [
    'Token não encontrado!',
    'Token invalido ou expirado!'
  ]
  api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      const status = error.response?.status

      // Usuário não autorizado
      if (status === StatusCodes.UNAUTHORIZED) {
        const backendMessage = (error.response?.data as any)?.error

        // Se a requisição for feita no lado do cliente (browser) podemos executar uma ação, como redirecionar o usuário para a página de login, no momento o middleware faz isso, mas podemos fazer aqui também
        if (typeof window !== 'undefined') {
        }
        // Se a requisição for feita no lado do servidor (SSR) e foi realmente um erro de token, significa que o usuário não está autenticado, nesse caso, por questões de segurança da aplicação retornamos apenas o statusCode e a mensagem de erro que o servidor obteve da API
        else if (TOKEN_ERROR_MESSAGES.includes(backendMessage)) {
          return Promise.reject(new AuthTokenError(backendMessage, status))
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
