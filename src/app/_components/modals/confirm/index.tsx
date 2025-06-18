import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { Button } from '../../button'
import { X } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  modalText: { title: string; message: React.ReactNode | string }
  onConfirm: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>
  onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  modalText,
  onConfirm,
  onCancel
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h1 className={styles.title}>{modalText.title}</h1>
          <X className={styles.closeIcon} onClick={onCancel} />
        </div>
        <form className={styles.modalForm} onSubmit={onConfirm}>
          <div className={styles.modalBody}>{modalText.message}</div>
          <div className={styles.modalFooter}>
            <Button name="Cancelar" type="button" onClick={onCancel} />

            <Button name="Confirmar" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConfirmModal
