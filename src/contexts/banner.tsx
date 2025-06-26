'use client'

import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '@/services/service.consumer'
import { BannerProps } from '@/types/banner.type'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/navigation'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState
} from 'react'
import { toast } from 'sonner'

type BannerContextData = {
  newBanner: BannerProps
  editBannerModalOpen: boolean
  deleteBannerModalOpen: boolean
  currentBanner: BannerProps
  setEditBannerModalOpen: Dispatch<SetStateAction<boolean>>
  setDeleteBannerModalOpen: Dispatch<SetStateAction<boolean>>
  setCurrentBanner: Dispatch<SetStateAction<BannerProps>>
  handleBannerSubmit: (formData: FormData) => Promise<void>
  handleBannerDelete: () => Promise<void>
}

type BannerProviderProps = {
  children: ReactNode
}

export const newBanner: BannerProps = {
  id: '',
  name: '',
  imageUrl: '',
  order: 0,
  isActive: true,
  createdAt: '',
  updatedAt: ''
}

export const BannerContext = createContext({} as BannerContextData)

export function BannerProvider({ children }: BannerProviderProps) {
  const router = useRouter()
  const [editBannerModalOpen, setEditBannerModalOpen] = useState<boolean>(false)
  const [deleteBannerModalOpen, setDeleteBannerModalOpen] =
    useState<boolean>(false)

  const [currentBanner, setCurrentBanner] = useState<BannerProps>(newBanner)

  const handleBannerSubmit = useCallback(
    async (formData: FormData) => {
      const isUpdate = !!currentBanner.id
      const token = await getCookieServer()

      try {
        const endpoint = '/events/banners'

        const res = isUpdate
          ? await serviceConsumer(token).executePut(
              endpoint,
              { id: currentBanner.id },
              formData
            )
          : await serviceConsumer(token).executePost(endpoint, formData)

        if (
          res.isOk &&
          (res.status === StatusCodes.CREATED || res.status === StatusCodes.OK)
        ) {
          toast.success(res.message)
          setEditBannerModalOpen(false)
          setCurrentBanner(newBanner)
          router.refresh()
        } else {
          toast.error(res.message)
        }
      } catch (err) {
        console.error(err)
        toast.error(`Erro ao ${isUpdate ? 'editar' : 'cadastrar'} banner!`)
      }
    },
    [currentBanner]
  )

  const handleBannerDelete = async () => {
    if (!currentBanner.id) return

    try {
      const token = await getCookieServer()
      const res = await serviceConsumer(token).executeDelete(
        `/banners?id=${currentBanner.id}`
      )

      if (res.isOk) {
        toast.success(res.message)
        setDeleteBannerModalOpen(false)
        setCurrentBanner(newBanner)
        router.refresh()
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      console.error(err)
      toast.error('Erro ao remover banner!')
    }
  }

  return (
    <BannerContext.Provider
      value={{
        newBanner,
        editBannerModalOpen,
        deleteBannerModalOpen,
        currentBanner,
        setEditBannerModalOpen,
        setDeleteBannerModalOpen,
        setCurrentBanner,
        handleBannerSubmit,
        handleBannerDelete
      }}
    >
      {children}
    </BannerContext.Provider>
  )
}
