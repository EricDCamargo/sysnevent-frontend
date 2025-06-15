import React from 'react'
import styles from './dateInput.module.css'

interface DateInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  name?: string
  width?: string
  disabled?: boolean
  type?: string
}

export const DateInput = ({
  label,
  value,
  onChange,
  name,
  width,
  disabled,
  type = 'date'
}: DateInputProps) => {
  return (
    <div className={styles.dateInputContainer} style={{ width }}>
      {label && <label>{label}</label>}
      <input
        className={styles.dateInput}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
