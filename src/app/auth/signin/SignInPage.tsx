'use client'

import React from 'react'
import AuthPage from '../_components/AuthPage'
import { StatusCodes } from 'http-status-codes'
import { handleLogin } from '@/hooks/user/useAuth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const SignInPage: React.FC = () => {
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    const result = await handleLogin(formData)

    if (result.isOk && result.status === StatusCodes.OK) {
      toast.success(result.message)
      router.push('/fatec/administration')
    } else {
      toast.error(result.message)
    }
  }
  return (
    <AuthPage>
      <AuthPage.Title>Bem-vindo de volta</AuthPage.Title>
      <AuthPage.Form props={{ action: onSubmit }}>
        <AuthPage.Input
          type="email"
          required
          name="email"
          placeholder="Digite seu email"
        />
        <AuthPage.Input
          type="password"
          required
          name="password"
          placeholder="Senha"
        />
      </AuthPage.Form>
    </AuthPage>
  )
}
export default SignInPage
