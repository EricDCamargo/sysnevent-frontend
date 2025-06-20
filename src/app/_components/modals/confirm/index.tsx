import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { Button } from '../../button'
import { X } from 'lucide-react'

interface ConfirmModalProps extends React.FormHTMLAttributes<HTMLFormElement> {
  isOpen: boolean
  modalText: { title: string; message: React.ReactNode | string }
  pending?: boolean
  onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  modalText,
  onCancel,
  pending,
  ...rest
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
        <form className={styles.modalForm} {...rest}>
          <div className={styles.modalBody}>{modalText.message}</div>
          <div className={styles.modalFooter}>
            <Button name="Cancelar" type="button" onClick={onCancel} />

            <Button name="Confirmar" type="submit" disabled={pending} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConfirmModal
