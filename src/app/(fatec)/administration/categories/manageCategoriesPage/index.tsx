'use client'
import styles from './styles.module.css'
import { CirclePlus, Eye, Trash2 } from 'lucide-react'
import { TableColumn } from '@/types/dataTable.type'
import DataTable from '@/app/(fatec)/_components/dataTable/dataTable'
import { CategoryProps } from '@/types/category.type'
import { useContext, useState } from 'react'
import { CategoryContext } from '@/contexts/category'
import ConfirmModal from '@/app/_components/modals/confirm'
import FormInput from '@/app/_components/inputs/formInput.tsx/FormInput'
import moment from 'moment'

interface ManageCategoriesPageProps {
  categories: CategoryProps[]
}

export default function ManageCategoriesPage({
  categories
}: ManageCategoriesPageProps) {
  const {
    setCurrentCategory,
    currentCategory,
    deleteCategoryModalOpen,
    editCategoryModalOpen,
    newCategory,
    setDeleteCategoryModalOpen,
    setEditCategoryModalOpen,
    handleCategoryDelete,
    handleCategorySubmit
  } = useContext(CategoryContext)

  const handleCancel = () => {
    setCurrentCategory(newCategory)
    setDeleteCategoryModalOpen(false)
    setEditCategoryModalOpen(false)
  }

  const handleViewCategory = (category: CategoryProps) => {
    setCurrentCategory(category)
    setEditCategoryModalOpen(true)
  }
  const handleDeleteCategory = (category: CategoryProps) => {
    setCurrentCategory(category)
    setDeleteCategoryModalOpen(true)
  }

  const columns: TableColumn<CategoryProps>[] = [
    { name: 'Categorias', selector: row => row.name },
    {
      name: 'Data de Criação',
      selector: row =>
        moment.parseZone(row.createdAt).format('DD/MM/YYYY HH:MM')
    },
    {
      name: <p className={styles.hideScreenOnMobile}>Última atualização</p>,
      selector: row => (
        <p className={styles.hideScreenOnMobile}>
          {moment.parseZone(row.updatedAt).format('DD/MM/YYYY HH:MM')}
        </p>
      )
    },
    {
      name: 'Ações',
      cell: row => (
        <div className={'actions'}>
          <button onClick={() => handleViewCategory(row)}>
            <Eye />
          </button>
          <button onClick={() => handleDeleteCategory(row)}>
            <Trash2 />
          </button>
        </div>
      )
    }
  ]

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string
    await handleCategorySubmit({ name })
  }

  return (
    <main>
      <section className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Gerenciar Categorias</h1>
          <div
            className={styles.addCategory}
            onClick={() => {
              setEditCategoryModalOpen(true)
            }}
          >
            <CirclePlus size={20} color="black" />
            Adicionar categoria
          </div>
        </header>

        <DataTable columns={columns} data={categories} />
      </section>
      <ConfirmModal
        modalText={{
          title: 'Excluir Categoria',
          message: (
            <div className={styles.modalDeleteCategory}>
              <span>Tem certeza que deseja excluir essa categoria?</span>
              <p>{currentCategory.name}</p>
            </div>
          )
        }}
        isOpen={deleteCategoryModalOpen}
        onCancel={handleCancel}
        action={handleCategoryDelete}
      />

      <ConfirmModal
        modalText={{
          title: currentCategory.id
            ? 'Editar Categoria'
            : 'Adicionar Categoria',
          message: (
            <FormInput
              label="Categoria"
              type="text"
              name="name"
              placeholder="Qual o nome da categoria?"
              required
              defaultValue={currentCategory.name}
            />
          )
        }}
        isOpen={editCategoryModalOpen}
        onCancel={handleCancel}
        action={handleSubmit}
      />
    </main>
  )
}
