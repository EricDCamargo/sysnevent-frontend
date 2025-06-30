'use client'

import { getCookieServer } from '@/lib/cookieServer'
import { getActiveBanners } from '@/services/retriveSSRData/retriveBannerData'
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
  activeBanners: BannerProps[]
  setEditBannerModalOpen: Dispatch<SetStateAction<boolean>>
  setDeleteBannerModalOpen: Dispatch<SetStateAction<boolean>>
  setCurrentBanner: Dispatch<SetStateAction<BannerProps>>
  handleBannerSubmit: (
    formData: FormData,
    onSuccess?: () => void
  ) => Promise<void>
  handleBannerDelete: () => Promise<void>
  refreshActiveBanners: () => Promise<void>
}

type BannerProviderProps = {
  children: ReactNode
  initialActiveBanners: BannerProps[]
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

export function BannerProvider({
  children,
  initialActiveBanners
}: BannerProviderProps) {
  const router = useRouter()
  const [editBannerModalOpen, setEditBannerModalOpen] = useState<boolean>(false)
  const [deleteBannerModalOpen, setDeleteBannerModalOpen] =
    useState<boolean>(false)

  const [activeBanners, setActiveBanners] =
    useState<BannerProps[]>(initialActiveBanners)
  const [currentBanner, setCurrentBanner] = useState<BannerProps>(newBanner)

  const refreshActiveBanners = async () => {
    const banners = await getActiveBanners()
    setActiveBanners(banners)
  }
  const endpoint = '/events/banners'
  const handleBannerSubmit = useCallback(
    async (formData: FormData, onSuccess?: () => void) => {
      const isUpdate = !!currentBanner.id
      const token = await getCookieServer()

      try {
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
          refreshActiveBanners()
          router.refresh()
          if (onSuccess) onSuccess()
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
      const res = await serviceConsumer(token).executeDelete(endpoint, {
        id: currentBanner.id
      })

      if (res.isOk) {
        toast.success(res.message)
        setDeleteBannerModalOpen(false)
        setCurrentBanner(newBanner)
        refreshActiveBanners()
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
        activeBanners,
        setEditBannerModalOpen,
        setDeleteBannerModalOpen,
        setCurrentBanner,
        handleBannerSubmit,
        handleBannerDelete,
        refreshActiveBanners
      }}
    >
      {children}
    </BannerContext.Provider>
  )
}
