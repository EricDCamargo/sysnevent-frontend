'use client'
import { useContext } from 'react'
import styles from './styles.module.css'
import { UserProps } from '@/types/user.type'
import { UserContext } from '@/contexts/user'
import { getLabel, roleOptions } from '@/utils/recordStatus'
import { Eye, Trash2, UserPlus } from 'lucide-react'
import { TableColumn } from '@/types/dataTable.type'
import DataTable from '@/app/(fatec)/_components/dataTable/dataTable'
import ConfirmModal from '@/app/_components/modals/confirm'
import { UserRole } from '@/utils/enums'
import FormInput from '@/app/_components/inputs/formInput.tsx/FormInput'
import Dropdown from '@/app/_components/inputs/dropDown'
import { toast } from 'sonner'

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

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const role = formData.get('role') as UserRole
    const password = formData.get('password') as string

    if (currentUser.id === loggedUser?.id && role !== loggedUser.role) {
      toast.error('Você não pode alterar o seu próprio tipo de usuário!')
      return
    }

    await handleUserSubmit({ name, email, role, password })
  }
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
        action={handleDeleteUser}
      />
      <ConfirmModal
        modalText={{
          title: currentUser.id ? 'Editar Usuário' : 'Adicionar Usuário',
          message: (
            <div className={styles.gridModal}>
              <FormInput
                label="Nome"
                name="name"
                type="text"
                required
                placeholder="Nome:"
                defaultValue={currentUser.name}
              />
              <Dropdown
                label="Cargo"
                name="role"
                title="role"
                required
                options={roleOptions}
                defaultValue={currentUser.role}
              />
              <FormInput
                label="E-mail"
                type="email"
                name="email"
                required
                placeholder="E-mail:"
                defaultValue={currentUser.email}
              />
              <FormInput
                label="Senha"
                name="password"
                type="password"
                required={!currentUser.id}
                placeholder="Senha:"
                defaultValue={currentUser.password}
              />
            </div>
          )
        }}
        isOpen={editUserModalOpen}
        onCancel={handleCancel}
        onConfirmSubmit={formData => {
          handleSubmit(formData)
        }}
      />
    </main>
  )
}
