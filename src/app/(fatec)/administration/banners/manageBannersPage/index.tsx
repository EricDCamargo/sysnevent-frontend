'use client'

import styles from './styles.module.css'
import { CirclePlus, Eye, Trash2 } from 'lucide-react'
import { TableColumn } from '@/types/dataTable.type'
import DataTable from '@/app/(fatec)/_components/dataTable/dataTable'
import { BannerProps } from '@/types/banner.type'
import { useContext, useRef, useState } from 'react'
import { BannerContext } from '@/contexts/banner'
import ConfirmModal from '@/app/_components/modals/confirm'
import FormInput from '@/app/_components/inputs/formInput/FormInput'
import Dropdown from '@/app/_components/inputs/dropDown'
import Image from 'next/image'
import { Upload, Camera, Video } from 'lucide-react'
import { toast } from 'sonner'
import { serviceConsumer } from '@/services/service.consumer'

interface ManageBannersPageProps {
  initialBanners: BannerProps[]
  avalibleOrder: number[]
}

export default function ManageBannersPage({
  initialBanners,
  avalibleOrder
}: ManageBannersPageProps) {
  const {
    setCurrentBanner,
    currentBanner,
    deleteBannerModalOpen,
    editBannerModalOpen,
    newBanner,
    setDeleteBannerModalOpen,
    setEditBannerModalOpen,
    handleBannerDelete,
    handleBannerSubmit,
    refreshActiveBanners
  } = useContext(BannerContext)

  const [banners, setBanners] = useState<BannerProps[]>(initialBanners)

  const [previewImage, setPreviewImage] = useState(currentBanner.imageUrl || '')
  const [imageFile, setImageFile] = useState<File>()
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const handleCancel = () => {
    setCurrentBanner(newBanner)
    setDeleteBannerModalOpen(false)
    setEditBannerModalOpen(false)
    setPreviewImage('')
  }

  const handleView = (banner: BannerProps) => {
    setCurrentBanner(banner)
    setPreviewImage(banner.imageUrl || '')
    setEditBannerModalOpen(true)
  }

  const handleDelete = (banner: BannerProps) => {
    setCurrentBanner(banner)
    setDeleteBannerModalOpen(true)
  }

  const handleToggleActive = async (id: string) => {
    const res = await serviceConsumer().executePatch(
      '/events/banners/toggle-status',
      {
        bannerId: id
      }
    )

    setBanners(prev =>
      prev.map(b => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    )
    if (res.isOk) {
      refreshActiveBanners()
    }

    toast.success(res.message)
  }

  const columns: TableColumn<BannerProps>[] = [
    {
      name: 'Baner',
      cell: row => (
        <Image
          width={70}
          height={70}
          src={row.imageUrl}
          alt="Foto do produto"
        />
      )
    },
    {
      name: <p className={styles.hideScreenOnMobile}>Título</p>,
      selector: row => <p className={styles.hideScreenOnMobile}>{row.name}</p>
    },
    { name: 'Ordem', selector: row => row.order.toString() },
    {
      name: 'Ações',
      cell: row => (
        <div className="actions">
          <div className={styles.toggleContainer}>
            <input
              id="isActiveToggle"
              type="checkbox"
              checked={row.isActive}
              onChange={() => handleToggleActive(row.id)}
              title="Ativar/desativar baner"
            />
          </div>
          <button onClick={() => handleView(row)}>
            <Eye />
          </button>
          <button onClick={() => handleDelete(row)}>
            <Trash2 />
          </button>
        </div>
      )
    }
  ]

  const handleFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return toast.warning('Nenhum arquivo selecionado.')

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      toast.warning('Formato não permitido!')
      return
    }
    setImageFile(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const handleSubmit = async (formData: FormData) => {
    if (imageFile) formData.append('file', imageFile)
    await handleBannerSubmit(formData, () => {
      setImageFile(undefined)
      setPreviewImage('')
    })
  }

  const orderOptions = avalibleOrder.map(o => ({
    label: o.toString(),
    value: o
  }))

  return (
    <main>
      <section className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Gerenciar Baners</h1>
          <div
            className={styles.addBanner}
            onClick={() => setEditBannerModalOpen(true)}
          >
            <CirclePlus size={20} color="black" />
            Adicionar baner
          </div>
        </header>

        <DataTable columns={columns} data={banners} />
      </section>

      <ConfirmModal
        modalText={{
          title: 'Excluir Baner',
          message: (
            <div className={styles.modalDeleteBanner}>
              <span>Tem certeza que deseja excluir este baner?</span>

              <p>{currentBanner.name}</p>
            </div>
          )
        }}
        isOpen={deleteBannerModalOpen}
        onCancel={handleCancel}
        onConfirmSubmit={handleBannerDelete}
      />

      <ConfirmModal
        modalText={{
          title: currentBanner.id ? 'Editar Baner' : 'Adicionar Baner',
          message: (
            <div className={styles.formToCreateNewBanner}>
              <div
                className={styles.uploadArea}
                onClick={() => inputFileRef.current?.click()}
              >
                <input
                  type="file"
                  required={!previewImage}
                  accept="image/png, image/jpeg"
                  onChange={handleFileImage}
                  className={styles.inputF}
                  ref={inputFileRef}
                />
                {previewImage ? (
                  <Image
                    alt="Preview"
                    src={previewImage}
                    className={styles.preview}
                    fill
                    quality={100}
                  />
                ) : (
                  <>
                    <div className={styles.images}>
                      <Camera size={25} />
                      <span>|</span>
                      <Video size={25} />
                    </div>
                    <p>Arraste e solte os arquivos</p>
                    <span className={styles.spanF}>
                      <Upload size={25} />
                      <span>Upload</span>
                    </span>
                  </>
                )}
              </div>

              <div className={styles.grid}>
                <FormInput
                  label="Título"
                  type="text"
                  name="name"
                  placeholder="Digite o nome do baner"
                  required
                  defaultValue={currentBanner.name}
                />

                <Dropdown
                  label="Ordem"
                  name="order"
                  required
                  options={orderOptions}
                  defaultValue={currentBanner.order}
                />
              </div>
            </div>
          )
        }}
        isOpen={editBannerModalOpen}
        onCancel={handleCancel}
        onConfirmSubmit={formData => {
          handleSubmit(formData)
        }}
      />
    </main>
  )
}
