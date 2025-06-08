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

  return (
    <button
      type={type}
      disabled={pending}
      className={styles.button}
      onClick={onClick}
      {...rest}
    >
      {pending && type == 'submit' ? (
        <LoaderCircle className={styles.icon} />
      ) : (
        name
      )}
    </button>
  )
}
