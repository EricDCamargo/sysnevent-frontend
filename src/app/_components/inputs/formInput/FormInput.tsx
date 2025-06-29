'use client'

import React from 'react'
import styles from './formInput.module.css'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: boolean
  errorMessage?: string
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  errorMessage,
  ...rest
}) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        className={`${styles.inputField} ${error ? styles.inputError : ''}`}
        {...rest}
      />
      {error && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  )
}

export default FormInput
