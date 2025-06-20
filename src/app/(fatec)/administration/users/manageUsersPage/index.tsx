'use client'
import { useContext, useState } from 'react'
import styles from './styles.module.css'
import { UserProps } from '@/types/user.type'
import { UserContext } from '@/contexts/user'
import { getLabel } from '@/utils/recordStatus'
import { Eye, Trash2, UserPlus } from 'lucide-react'
import { TableColumn } from '@/types/dataTable.type'
import DataTable from '@/app/(fatec)/_components/dataTable/dataTable'
import ConfirmModal from '@/app/_components/modals/confirm'
import { UserRole } from '@/utils/enums'

interface ManageUsersPageProps {
  users: UserProps[]
}

export default function ManageUsersPage({ users }: ManageUsersPageProps) {
  const { setcurrentUser, currentUser, handleDeleteUser, handleUserSubmit } =
    useContext(UserContext)
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false)
  const [editUserModalOpen, setEditUserModalOpen] = useState(false)

  const columns: TableColumn<UserProps>[] = [
    { name: 'Nome', selector: row => row.name },
    {
      name: <p className={styles.hideScreenOnMobile}>Email</p>,
      selector: row => <p className={styles.hideScreenOnMobile}>{row.email}</p>
    },
    {
      name: 'Cargo',
      selector: row => <p className={styles.roleBadge}>{getLabel(row.role)}</p>
    },
    {
      name: 'Ações',
      cell: row => (
        <div className={styles.actions}>
          <button
            onClick={() => {
              setcurrentUser({
                created_at: row.created_at,
                email: row.email,
                id: row.id,
                name: row.name,
                role: row.role,
                updated_at: row.updated_at
              })
              setDeleteUserModalOpen(true)
            }}
          >
            <Trash2 size={18} />
          </button>

          <button
            onClick={() => {
              setcurrentUser({
                created_at: row.created_at,
                email: row.email,
                id: row.id,
                name: row.name,
                role: row.role,
                updated_at: row.updated_at
              })
              setEditUserModalOpen(true)
            }}
          >
            <Eye size={18} />
          </button>
        </div>
      )
    }
  ]

  return (
    <>
      <main>
        <section className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Gerenciar Usuários</h1>
            <div
              className={styles.addUser}
              onClick={() => {
                setcurrentUser({
                  created_at: '',
                  email: '',
                  name: '',
                  role: UserRole.DOCENT_ASSISTANT,
                  updated_at: '',
                  id: '',
                  password: ''
                }),
                  setEditUserModalOpen(true)
              }}
            >
              <UserPlus size={20} color="black" />
              Adicionar usuário
            </div>
          </header>

          <DataTable
            columns={columns}
            data={[...users].sort(
              (a, b) =>
                ['ADMIN', 'COORDINATOR', 'DOCENT_ASSISTANT'].indexOf(a.role) -
                ['ADMIN', 'COORDINATOR', 'DOCENT_ASSISTANT'].indexOf(b.role)
            )}
          />
        </section>
      </main>
      {/* DELETE MODAL */}
      <ConfirmModal
        modalText={{
          title: `Excluir Usuário`,
          message: (
            <>
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
            </>
          )
        }}
        isOpen={deleteUserModalOpen}
        onCancel={() => setDeleteUserModalOpen(false)}
        onSubmit={() => {
          handleDeleteUser()
          setDeleteUserModalOpen(false)
        }}
      />
      {/* CREATE OR EDIT USER */}
      <ConfirmModal
        modalText={{
          title: `${
            currentUser.id !== '' ? 'Editar Usuário' : 'Adicionar Usuário'
          }`,
          message: (
            <>
              <section>
                <div className={styles.modalEditUser}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Nome</label>
                      <input
                        type="text"
                        placeholder="Nome:"
                        value={currentUser.name}
                        onChange={e =>
                          setcurrentUser({
                            ...currentUser,
                            name: e.target.value
                          })
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Cargo</label>
                      <select
                        value={currentUser.role}
                        onChange={e =>
                          setcurrentUser({
                            ...currentUser,
                            role: e.target.value as UserRole
                          })
                        }
                      >
                        <option value="ADMIN">Admin</option>
                        <option value="COORDINATOR">Coordenador</option>
                        <option value="DOCENT_ASSISTANT">
                          Docente Assistente
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>E-mail</label>
                      <input
                        type="email"
                        placeholder="E-mail:"
                        value={currentUser.email}
                        onChange={e =>
                          setcurrentUser({
                            ...currentUser,
                            email: e.target.value
                          })
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Senha</label>
                      <input
                        type="password"
                        placeholder="Senha:"
                        value={currentUser.password}
                        onChange={e =>
                          setcurrentUser({
                            ...currentUser,
                            password: e.target.value
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </section>
            </>
          )
        }}
        isOpen={editUserModalOpen}
        onCancel={() => setEditUserModalOpen(false)}
        onSubmit={() => {
          setEditUserModalOpen(false)
          handleUserSubmit({
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role,
            password: currentUser.password
          })
        }}
      />
    </>
  )
}
