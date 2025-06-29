'use client'
import { useContext, useEffect, useTransition } from 'react'
import styles from './styles.module.css'
import { UserProps } from '@/types/user.type'
import { UserContext } from '@/contexts/user'
import { getLabel, roleOptions } from '@/utils/recordStatus'
import { Eye, Trash2, UserPlus } from 'lucide-react'
import { TableColumn } from '@/types/dataTable.type'
import DataTable from '@/app/(fatec)/_components/dataTable/dataTable'
import ConfirmModal from '@/app/_components/modals/confirm'
import { UserRole } from '@/utils/enums'
import Dropdown from '@/app/_components/inputs/dropDown'
import { toast } from 'sonner'

import { buildUserSchema } from '@/lib/validators/schemas/userSchema'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '@/app/_components/inputs/formInput/FormInput'

type UserFormData = z.infer<ReturnType<typeof buildUserSchema>>

interface ManageUsersPageProps {
  users: UserProps[]
}

export default function ManageUsersPage({ users }: ManageUsersPageProps) {
  const {
    newUser,
    loggedUser,
    currentUser,
    editUserModalOpen,
    deleteUserModalOpen,
    setEditUserModalOpen,
    setDeleteUserModalOpen,
    setcurrentUser,
    handleDeleteUser,
    handleUserSubmit
  } = useContext(UserContext)

  const isCreating = !currentUser.id
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserFormData>({
    resolver: zodResolver(buildUserSchema(isCreating)),
    context: { isCreating }
  })

  useEffect(() => {
    const defaultValues = {
      name: currentUser.name || '',
      email: currentUser.email || '',
      role: currentUser.role || UserRole.DOCENT_ASSISTANT,
      password: ''
    }
    reset(editUserModalOpen ? defaultValues : newUser)
  }, [editUserModalOpen, currentUser, reset])

  const handleCancel = () => {
    setEditUserModalOpen(false)
    setDeleteUserModalOpen(false)
    setcurrentUser(newUser)
  }

  const handleViewUser = (user: UserProps) => {
    setcurrentUser(user)
    setEditUserModalOpen(true)
  }
  const handleDelete = (user: UserProps) => {
    setcurrentUser(user)
    setDeleteUserModalOpen(true)
  }

  const columns: TableColumn<UserProps>[] = [
    {
      name: 'Nome',
      selector: row =>
        row.name
          .split(' ')
          .filter(Boolean)
          .filter((_, i, arr) => i === 0 || i === arr.length - 1)
          .join(' ')
    },
    {
      name: <p className={styles.hideScreenOnMobile}>Email</p>,
      selector: row => <p className={styles.hideScreenOnMobile}>{row.email}</p>
    },
    {
      name: 'Cargo',
      selector: row => {
        const roleClass = {
          [UserRole.DOCENT_ASSISTANT]: styles.docent_assistant,
          [UserRole.COORDINATOR]: styles.coordinator,
          [UserRole.ADMIN]: styles.admin
        }[row.role]
        return (
          <p className={`${styles.role} ${roleClass}`}>{getLabel(row.role)}</p>
        )
      }
    },
    {
      name: 'Ações',
      cell: row => (
        <div className={'actions'}>
          <button onClick={() => handleViewUser(row)}>
            <Eye />
          </button>
          <button onClick={() => handleDelete(row)}>
            <Trash2 />
          </button>
        </div>
      )
    }
  ]

  const onFormSubmit = handleSubmit(async (data: UserFormData) => {
    if (currentUser.id === loggedUser?.id && data.role !== loggedUser.role) {
      toast.error('Você não pode alterar o seu próprio tipo de usuário!')
      return
    }

    startTransition(async () => {
      const submissionData = { ...data }
      if (isCreating === false && !submissionData.password) {
        delete submissionData.password
      }

      await handleUserSubmit(submissionData as any)
    })
  })
  const rolePriority: Record<UserRole, number> = {
    ADMIN: 0,
    COORDINATOR: 1,
    DOCENT_ASSISTANT: 2
  }

  return (
    <main>
      <section className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Gerenciar Usuários</h1>
          <div
            className={styles.addUser}
            onClick={() => setEditUserModalOpen(true)}
          >
            <UserPlus size={20} className={styles.addIcon} />
            Adicionar usuário
          </div>
        </header>

        <DataTable
          columns={columns}
          data={[...users].sort(
            (a, b) => rolePriority[a.role] - rolePriority[b.role]
          )}
        />
      </section>
      <ConfirmModal
        modalText={{
          title: `Excluir Usuário`,
          message: (
            <div className={styles.modalDeleteUser}>
              <div>
                <p>Usuário: {currentUser.name}</p>
                <p>E-mail: {currentUser.email}</p>
              </div>
              <p>
                Tem certeza que deseja excluir esse usuário? Essa ação não
                poderá ser desfeita.
              </p>
            </div>
          )
        }}
        isOpen={deleteUserModalOpen}
        onCancel={handleCancel}
        onConfirmSubmit={handleDeleteUser}
      />
      <ConfirmModal
        modalText={{
          title: currentUser.id ? 'Editar Usuário' : 'Adicionar Usuário',
          message: (
            <div className={styles.gridModal}>
              <FormInput
                label="Nome"
                type="text"
                required
                placeholder="Nome:"
                error={!!errors.name}
                errorMessage={errors.name?.message}
                {...register('name')}
              />
              <Dropdown
                label="Cargo"
                title="role"
                required
                options={roleOptions}
                error={!!errors.role}
                errorMessage={errors.role?.message}
                {...register('role')}
              />
              <FormInput
                label="E-mail"
                type="email"
                required
                placeholder="E-mail:"
                error={!!errors.email}
                errorMessage={errors.email?.message}
                {...register('email')}
              />
              <FormInput
                label={isCreating ? 'Senha' : 'Nova Senha (opcional)'}
                type="password"
                required={isCreating}
                placeholder="Senha:"
                error={!!errors.password}
                errorMessage={errors.password?.message}
                {...register('password')}
              />
            </div>
          )
        }}
        isOpen={editUserModalOpen}
        onCancel={handleCancel}
        onSubmit={onFormSubmit}
        pending={isPending}
      />
    </main>
  )
}
