'use client'

import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.css'
import { useFormStatus } from 'react-dom'
import { LoaderCircle } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset' | undefined
}

export function Button({ name, onClick, type, ...rest }: ButtonProps) {
  const { pending } = useFormStatus()

  const isDisabled = rest.disabled || (pending && type === 'submit')

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={styles.button}
      onClick={onClick}
      {...rest}
    >
      {isDisabled && type == 'submit' ? (
        <LoaderCircle className={styles.icon} />
      ) : (
        name
      )}
    </button>
  )
}
