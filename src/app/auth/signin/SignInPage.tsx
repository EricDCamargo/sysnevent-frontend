'use client'

import React, { useState } from 'react'
import AuthPage from '../_components/AuthPage'
import { StatusCodes } from 'http-status-codes'
import { handleLogin, handleRegisterSecretWord } from '@/hooks/user/useAuth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/_components/button'
import ConfirmModal from '@/app/_components/modals/confirm'
import styles from './SignIn.module.css'

export const SignInPage: React.FC = () => {
  const router = useRouter()
  const [isSecretWordModalOpen, setSecredWordModalOpen] = useState(false)
  const [token, setToken] = useState('')

  async function onSubmit(formData: FormData) {
    const result = await handleLogin(formData)

    toast.success(result.message)
    if (result.data.needsSecretWordSetup) {
      setToken(result.data.token)
      setSecredWordModalOpen(true)
    } else {
      if (result.isOk && result.status === StatusCodes.OK) {
        router.push('/administration')
      }
    }
  }
  async function handleSubmitSecretWord(formData: FormData) {
    const result = await handleRegisterSecretWord(formData, token)
    toast.success(result.message)
    if (result.isOk && result.status === StatusCodes.OK) {
      router.push('/administration')
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
        <Button name="Enviar" type="submit" />
        <AuthPage.Link href="/forgot-password">
          Recuperar minha senha
        </AuthPage.Link>
      </AuthPage.Form>
      <ConfirmModal
        modalText={{
          title: 'Proteja sua conta',
          message: (
            <>
              <p className={styles.alert}>
                Notamos que ainda não cadastrou sua palavra secreta.
                <br />
                Para garantir a segurança da sua conta, insira sua palavra
                secreta no campo abaixo:
              </p>
              <AuthPage.Input
                type="password"
                required
                name="secretWord"
                placeholder="Digite sua palavra secreta"
                className={styles.input}
              />

              <p className={`${styles.alert} ${styles.warning}`}>
                Atenção: A palavra secreta será utilizada para recuperar sua
                senha, e não poderá ser alterada. Guarde-a cuidadosamente antes
                de confirmar.
              </p>
            </>
          )
        }}
        isOpen={isSecretWordModalOpen}
        onCancel={() => setSecredWordModalOpen(false)}
        onConfirm={handleSubmitSecretWord}
      />
    </AuthPage>
  )
}
export default SignInPage
