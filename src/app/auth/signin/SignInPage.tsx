'use client'

import React, { useState } from 'react'
import AuthPage from '../_components/AuthPage'
import { StatusCodes } from 'http-status-codes'
import {
  handleLogin,
  handleRegisterSecretWord,
  handleResetPassword
} from '@/hooks/user/useAuth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/_components/button'
import ConfirmModal from '@/app/_components/modals/confirm'
import styles from './SignIn.module.css'
import Swal from 'sweetalert2'

export const SignInPage: React.FC = () => {
  const router = useRouter()
  const [isSecretWordModalOpen, setSecredWordModalOpen] = useState(false)
  const [isResetPasswordModalOpen, setResetPasswordModalOpen] = useState(false)
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
  async function handleSubmitSecretWord(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const result = await handleRegisterSecretWord(formData, token)

    if (result.isOk && result.status === StatusCodes.OK) {
      setResetPasswordModalOpen(false)
      Swal.fire({
        icon: 'success',
        title: 'Sua palavra chave foi cadastrada!',
        text: 'Você sera redirecionado para o sistema.',
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false
      })
      router.push('/administration')
    } else {
      toast.info(result.message)
    }
  }

  async function handleSubmitResetPassword(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const result = await handleResetPassword(formData)
    if (result.isOk && result.status === StatusCodes.OK) {
      setResetPasswordModalOpen(false)
      Swal.fire({
        icon: 'success',
        title: 'Senha redefinida com sucesso!',
        text: 'Você já pode acessar sua conta com a nova senha.',
        confirmButtonText: 'OK'
      })
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
        <Button name="Enviar" type="submit" />
        <AuthPage.Text onClick={() => setResetPasswordModalOpen(true)}>
          Recuperar minha senha
        </AuthPage.Text>
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
      <ConfirmModal
        modalText={{
          title: 'Recuperação de senha',
          message: (
            <>
              <AuthPage.Input
                type="email"
                required
                name="email"
                placeholder="Email"
                className={styles.input}
              />

              <AuthPage.Input
                type="password"
                required
                name="secretWord"
                placeholder="Palavra Secreta"
                className={styles.input}
              />
              <AuthPage.Input
                type="password"
                required
                name="newPassword"
                placeholder="Nova Senha"
                className={styles.input}
              />
            </>
          )
        }}
        isOpen={isResetPasswordModalOpen}
        onCancel={() => setResetPasswordModalOpen(false)}
        onConfirm={handleSubmitResetPassword}
      />
    </AuthPage>
  )
}
export default SignInPage
