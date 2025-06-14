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
      <form className={styles.modalContainer} action={onConfirm}>
        <div className={styles.modalHeader}>
          <h1 className={styles.title}>{modalText.title}</h1>
          <X size={50} className={styles.closeIcon} onClick={onCancel} />
        </div>

        <div className={styles.modalBody}>{modalText.message}</div>
        <div className={styles.modalFooter}>
          <Button name="Cancelar" type="button" onClick={onCancel} />

          <Button name="Confirmar" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default ConfirmModal
