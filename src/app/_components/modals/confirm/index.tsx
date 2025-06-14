import React, { FormHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'
import { Button } from '../../button'
import { X } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  modalText: { title: string; message: ReactNode | string }
  onConfirm: string | ((formData: FormData) => void | Promise<void>)
  onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  modalText,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h1 className={styles.title}>{modalText.title}</h1>
          <X className={styles.closeIcon} onClick={onCancel} />
        </div>
        <form className={styles.modalForm} action={onConfirm}>
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
