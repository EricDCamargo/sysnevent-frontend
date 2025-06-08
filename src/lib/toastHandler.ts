'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { ErrorMessages } from '@/services/errors/AuthTokenErorr'

export default function ToastHandler() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const error = searchParams.get('error')

    switch (error) {
      case ErrorMessages.UNAUTHORIZED:
        toast.warning('Você não possui permissão para acessar essa página!')
        break
      case ErrorMessages.TOKEN_EXPIRED:
        toast.error('Seu token expirou, por favor faça login novamente.')
        break
      case ErrorMessages.SERVICE_UNAVAILABLE:
        toast.error('Serviço indisponível, tente novamente mais tarde.')
        break
      default:
        break
    }
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete('error')

    const newUrl = `${window.location.pathname}?${newParams.toString()}`
    router.replace(newUrl)
  }, [searchParams, router])

  return null
}
