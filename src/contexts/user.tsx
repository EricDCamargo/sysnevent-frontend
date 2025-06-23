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
  isUserModalOpen: boolean
  isConfirmModalOpen: boolean
  onEdition: boolean
  selectedUser: string
  filteredMenuItems: MenuItemsProps[]
  setOnEdition: Dispatch<SetStateAction<boolean>>
  setLoggedUser: Dispatch<SetStateAction<UserProps | null>>
  setSelectedUser: Dispatch<SetStateAction<string>>
  setcurrentUser: Dispatch<SetStateAction<UserProps>>
  setUserModalOpen: Dispatch<SetStateAction<boolean>>
  setConfirmModalOpen: Dispatch<SetStateAction<boolean>>
  handleLogout(): Promise<void>
  determinatesActiveLink: (href: string, subHref: string | undefined) => boolean
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

export function UserProvider({ children }: UserProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isUserModalOpen, setUserModalOpen] = useState<boolean>(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
  const [onEdition, setOnEdition] = useState<boolean>(true)

  const [loggedUser, setLoggedUser] = useState<UserProps | null>(null)
  const [currentUser, setcurrentUser] = useState<UserProps>(newUser)

  const [selectedUser, setSelectedUser] = useState<string>('')

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await serviceConsumer().executeGet('/me')
        if (res.isOk && res.data) {
          setLoggedUser(res.data)
        } else {
          setLoggedUser(null)
        }
      } catch (e) {
        setLoggedUser(null)
      }
    }
    fetchUser()
  }, [])

  async function handleLogout() {
    deleteCookie('session', { path: '/' })
    router.replace('/')
    setLoggedUser(null)
    toast.success('Logout feito com sucesso!')
  }

  const filteredMenuItems =
    loggedUser?.role === UserRole.ADMIN
      ? menuItems
      : menuItems.filter(
          ({ href, subHref }) =>
            href === '/administration' || subHref === '/events'
        )

  const determinatesActiveLink = (
    href: string,
    subHref: string | undefined
  ) => {
    if (pathname === href || (subHref && pathname.includes(subHref))) {
      return true
    }
    return false
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
          setUserModalOpen(false)
          setcurrentUser(newUser)
          setOnEdition(true)
          router.refresh()
        } else {
          toast.error(res.message)
        }
      } catch (err) {
        console.error(err)
        toast.error(`Erro ao ${isUpdate ? 'editar' : 'cadastrar'} usuario!`)
        setOnEdition(true)
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
        setConfirmModalOpen(false)
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
        isUserModalOpen,
        onEdition,
        isConfirmModalOpen,
        selectedUser,
        filteredMenuItems,
        setConfirmModalOpen,
        setOnEdition,
        setUserModalOpen,
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
