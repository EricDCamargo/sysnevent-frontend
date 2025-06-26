'use server'

import { serviceConsumer } from '@/services/service.consumer'
import { StatusCodes } from 'http-status-codes'
import { cookies } from 'next/headers'

interface AuthResponse {
  message: string
  isOk: boolean
  status: number
  data?: any
}

const DEFAULT_SERVER_ERROR: AuthResponse = {
  message: 'Erro. Tente novamente mais tarde!',
  isOk: false,
  status: StatusCodes.INTERNAL_SERVER_ERROR
}

async function handleLogin(formData: FormData): Promise<AuthResponse> {
  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const response = await serviceConsumer().executePost('/session', {
      email,
      password
    })

    if (
      !response.data.needsSecretWordSetup &&
      response.isOk &&
      response.status === StatusCodes.OK
    ) {
      const expressTime = 60 * 60 * 24 * 1000

      const cookieStore = await cookies()
      cookieStore.set('session', response.data.token, {
        maxAge: expressTime,
        path: '/',
        httpOnly: false,
        secure: process.env.NEXT_ENVIRONMENT === 'production'
      })
    }

    return response
  } catch (err) {
    return DEFAULT_SERVER_ERROR
  }
}

async function handleRegisterSecretWord(
  formData: FormData,
  token: string
): Promise<AuthResponse> {
  const secretWord = formData.get('secretWord')

  try {
    const response = await serviceConsumer(token).executePost(
      '/register-secret',
      {
        secretWord
      }
    )

    if (response.isOk && response.status === StatusCodes.OK) {
      const expressTime = 60 * 60 * 24 * 30 * 1000

      const cookieStore = await cookies()
      cookieStore.set('session', token, {
        maxAge: expressTime,
        path: '/',
        httpOnly: false,
        secure: process.env.NEXT_ENVIRONMENT === 'production'
      })
    }
    const { data, ...rest } = response
    return rest
  } catch (err) {
    return DEFAULT_SERVER_ERROR
  }
}

async function handleResetPassword(formData: FormData): Promise<AuthResponse> {
  const email = formData.get('email')
  const secretWord = formData.get('secretWord')
  const newPassword = formData.get('newPassword')

  try {
    const response = await serviceConsumer().executePost('/reset-password', {
      email,
      secretWord,
      newPassword
    })
    const { data, ...rest } = response
    return rest
  } catch (err) {
    console.log('err', err)
    return DEFAULT_SERVER_ERROR
  }
}

async function handleRegister(formData: FormData): Promise<AuthResponse> {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const role = formData.get('role')

  try {
    const response = await serviceConsumer().executePost('/users', {
      name,
      email,
      password,
      role
    })

    const { data, ...rest } = response
    return rest
  } catch (err) {
    return DEFAULT_SERVER_ERROR
  }
}

export {
  handleLogin,
  handleRegister,
  handleRegisterSecretWord,
  handleResetPassword
}
