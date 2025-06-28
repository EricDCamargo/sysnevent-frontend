'use client'

import { serviceConsumer } from '@/services/service.consumer'
import { UserProps } from '@/types/user.type'
import { UserRole } from '@/utils/enums'
import { menuItems, MenuItemsProps } from '@/utils/paths'
import { deleteCookie } from 'cookies-next'
import { StatusCodes } from 'http-status-codes'
import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect
} from 'react'
import { toast } from 'sonner'

type UserContextData = {
  newUser: UserProps
  loggedUser: UserProps | null
  currentUser: UserProps
  deleteUserModalOpen: boolean
  editUserModalOpen: boolean
  selectedUser: string
  filteredMenuItems: MenuItemsProps[]
  setLoggedUser: Dispatch<SetStateAction<UserProps | null>>
  setSelectedUser: Dispatch<SetStateAction<string>>
  setcurrentUser: Dispatch<SetStateAction<UserProps>>
  setDeleteUserModalOpen: Dispatch<SetStateAction<boolean>>
  setEditUserModalOpen: Dispatch<SetStateAction<boolean>>
  handleLogout(): Promise<void>
  determinatesActiveLink: (
    href: string,
    subHref?: string
  ) => boolean | '' | undefined
  handleDeleteUser: () => Promise<void>
  handleUserSubmit: (DATA: {
    name: string
    email: string
    role: UserRole
    password?: string
  }) => Promise<void>
}

type UserProviderProps = {
  children: ReactNode
  initialUser: UserProps | null
}
export const newUser: UserProps = {
  id: '',
  name: '',
  email: '',
  role: UserRole.DOCENT_ASSISTANT,
  password: '',
  created_at: '',
  updated_at: ''
}
export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children, initialUser }: UserProviderProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState<boolean>(false)
  const [editUserModalOpen, setEditUserModalOpen] = useState<boolean>(false)

  const [loggedUser, setLoggedUser] = useState<UserProps | null>(initialUser)
  const [currentUser, setcurrentUser] = useState<UserProps>(newUser)

  const [selectedUser, setSelectedUser] = useState<string>('')


  async function handleLogout() {
    deleteCookie('session', { path: '/' })
    router.replace('/')
    setLoggedUser(null)
    toast.success('Logout feito com sucesso!')
  }

  const filteredMenuItems = (() => {
    if (!loggedUser) return []

    switch (loggedUser.role) {
      case UserRole.DOCENT_ASSISTANT:
        return menuItems.filter(
          item => item.href === '/administration' || item.subHref === '/events'
        )
      case UserRole.COORDINATOR:
        return menuItems.filter(
          item =>
            item.href === '/administration' ||
            item.subHref === '/administration/categories' ||
            item.href === '/administration/banners'
        )
      case UserRole.ADMIN:
        return menuItems
      default:
        return []
    }
  })()

  const determinatesActiveLink = (href: string, subHref?: string) => {
    return pathname === href || (subHref && pathname.startsWith(subHref))
  }

  const handleUserSubmit = useCallback(
    async (DATA: {
      name: string
      email: string
      role: UserRole
      password?: string
    }) => {
      const isUpdate = !!currentUser.id
      try {
        const res = isUpdate
          ? await serviceConsumer().executePut(
              '/users',
              { user_id: currentUser.id },
              DATA
            )
          : await serviceConsumer().executePost('users', DATA)
        if (
          res.isOk &&
          (res.status === StatusCodes.CREATED || res.status === StatusCodes.OK)
        ) {
          toast.success(res.message)
          setEditUserModalOpen(false)
          setcurrentUser(newUser)

          router.refresh()
        } else {
          toast.error(res.message)
        }
      } catch (err) {
        console.error(err)
        toast.error(`Erro ao ${isUpdate ? 'editar' : 'cadastrar'} usuario!`)
      }
    },
    [currentUser]
  )

  const handleDeleteUser = async () => {
    if (!currentUser.id) {
      return
    }
    try {
      const res = await serviceConsumer().executeDelete('/users', {
        user_id: currentUser.id
      })
      if (res.isOk) {
        toast.success(res.message)
        setDeleteUserModalOpen(false)
        setcurrentUser(newUser)
        router.refresh()
      }
    } catch (err) {
      console.log(err)
      toast.error('Erro ao remover usuario!')
    }
  }

  return (
    <UserContext.Provider
      value={{
        newUser,
        currentUser,
        loggedUser,
        deleteUserModalOpen,
        editUserModalOpen,
        selectedUser,
        filteredMenuItems,
        setEditUserModalOpen,
        setDeleteUserModalOpen,
        setcurrentUser,
        setLoggedUser,
        handleLogout,
        determinatesActiveLink,
        handleDeleteUser,
        handleUserSubmit,
        setSelectedUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
