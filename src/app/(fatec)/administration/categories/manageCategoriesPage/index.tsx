'use client';
import styles from './styles.module.css'
import { CirclePlus, Eye, Trash2 } from 'lucide-react'
import { TableColumn } from '@/types/dataTable.type'
import DataTable from '@/app/(fatec)/_components/dataTable/dataTable'
import { CategoryProps } from '@/types/category.type';
import { useContext, useState } from 'react';
import { CategoryContext } from '@/contexts/category';
import ConfirmModal from '@/app/_components/modals/confirm';

interface ManageCategoriesPageProps {
  categories: CategoryProps[]
}

export default function ManageCategoriesPage({ categories }: ManageCategoriesPageProps) {
  const { setCurrentCategory, currentCategory, handleCategoryDelete, handleCategorySubmit } = useContext(CategoryContext);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
  const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);

  const columns: TableColumn<CategoryProps>[] = [
    { name: 'Categorias', selector: row => row.name },
    {
      name: 'Data de Criação',
      selector: row => new Date(String(row.createdAt)).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')
    },
    {
      name: <p className={styles.hideScreenOnMobile}>Última atualização</p>,
      selector: row => <p className={styles.hideScreenOnMobile}>{new Date(String(row.updatedAt)).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</p>
    },
    {
      name: 'Ações',
      cell: row => (
        <div className={styles.actions}>
          <button onClick={() => { setCurrentCategory({ id: row.id, name: row.name, createdAt: row.createdAt, updatedAt: row.updatedAt }); setDeleteCategoryModalOpen(true) }}>
            <Trash2 size={18} />
          </button>
          <button onClick={() => { setCurrentCategory({ id: row.id, name: row.name, createdAt: row.createdAt, updatedAt: row.updatedAt }); setEditCategoryModalOpen(true) }}>
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
            <h1 className={styles.title}>
              Gerenciar Categorias
            </h1>
            <div className={styles.addCategory} onClick={() => { setCurrentCategory({ id: '', name: '', createdAt: '', updatedAt: '' }); setEditCategoryModalOpen(true) }}>
              <CirclePlus size={20} color='black' />
              Adicionar categoria
            </div>
          </header>

          <DataTable columns={columns} data={categories} />
        </section >
      </main >
      {/* DELETE CATEGORY */}
      <ConfirmModal
        modalText={{
          title: `Excluir Categoria`,
          message: (
            <>
              <div style={{fontSize: "20px"}}>
                <div>
                  <br />
                  <p>Tem certeza que deseja excluir essa categoria?</p>
                  <br />
                </div>
                <p>{currentCategory.name}</p>
                <br />
              </div>
            </>
          )
        }}
        isOpen={deleteCategoryModalOpen}
        onCancel={() => setDeleteCategoryModalOpen(false)}
        onConfirm={() => { handleCategoryDelete(); setDeleteCategoryModalOpen(false)}}
      />
      {/* CREATE OR EDIT CATEGORY */}
      <ConfirmModal
        modalText={{
          title: `${currentCategory.id !== '' ? 'Editar Categoria' : "Adicionar Categoria"}`,
          message: (
            <div className={styles.inputCreateOrEditCategory}>
              <input type="text" placeholder='Qual o nome da categoria?' defaultValue={currentCategory.name} onChange={(e) =>
                setCurrentCategory({ ...currentCategory, name: e.target.value })
              } />
            </div>
          )
        }}
        isOpen={editCategoryModalOpen}
        onCancel={() => setEditCategoryModalOpen(false)}
        onConfirm={() => { handleCategorySubmit({ name: currentCategory.name }); setEditCategoryModalOpen(false)}}
      />
    </>
  )
}