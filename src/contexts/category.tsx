'use client'

import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '@/services/service.consumer'
import { CategoryProps } from '@/types/category.type'
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

type CategoryContextData = {
  newCategory: CategoryProps
  editCategoryModalOpen: boolean
  deleteCategoryModalOpen: boolean
  currentCategory: CategoryProps
  setEditCategoryModalOpen: Dispatch<SetStateAction<boolean>>
  setDeleteCategoryModalOpen: Dispatch<SetStateAction<boolean>>
  setCurrentCategory: Dispatch<SetStateAction<CategoryProps>>
  handleCategorySubmit: (DATA: { name: string }) => Promise<void>
  handleCategoryDelete: () => Promise<void>
}

type CategoryProviderProps = {
  children: ReactNode
}

export const newCategory: CategoryProps = {
  id: '',
  name: '',
  createdAt: '',
  updatedAt: ''
}

export const CategoryContext = createContext({} as CategoryContextData)

export function CategoryProvider({ children }: CategoryProviderProps) {
  const router = useRouter()
  const [editCategoryModalOpen, setEditCategoryModalOpen] =
    useState<boolean>(false)
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] =
    useState<boolean>(false)

  const [currentCategory, setCurrentCategory] =
    useState<CategoryProps>(newCategory)

  const handleCategorySubmit = useCallback(
    async (DATA: { name: string }) => {
      const isUpdate = !!currentCategory.id
      const token = await getCookieServer()
      // ISSO ESTÁ GERANDO ERRO DE CORS, REMOVI O "TOKEN" DO serviceConsumer
      try {
        const res = isUpdate
          ? await serviceConsumer(token).executePut(
              '/events/categories',
              { id: currentCategory.id },
              DATA
            )
          : await serviceConsumer(token).executePost('events/categories', DATA)
        if (
          res.isOk &&
          (res.status === StatusCodes.CREATED || res.status === StatusCodes.OK)
        ) {
          toast.success(res.message)
          setEditCategoryModalOpen(false)
          setCurrentCategory(newCategory)

          router.refresh()
        } else {
          toast.error(res.message)
        }
      } catch (err) {
        console.error(err)
        toast.error(`Erro ao ${isUpdate ? 'editar' : 'cadastrar'} categoria!`)
      }
    },
    [currentCategory]
  )

  const handleCategoryDelete = async () => {
    if (!currentCategory.id) {
      return
    }
    try {
      const res = await serviceConsumer().executeDelete('/events/categories', {
        id: currentCategory.id
      })
      if (res.isOk) {
        toast.success(res.message)
        setDeleteCategoryModalOpen(false)
        setCurrentCategory(newCategory)
        router.refresh()
      }
    } catch (err) {
      console.log(err)
      toast.error('Erro ao remover categoria!')
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        newCategory,
        editCategoryModalOpen,
        deleteCategoryModalOpen,
        currentCategory,
        setEditCategoryModalOpen,
        setDeleteCategoryModalOpen,
        setCurrentCategory,
        handleCategorySubmit,
        handleCategoryDelete
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
