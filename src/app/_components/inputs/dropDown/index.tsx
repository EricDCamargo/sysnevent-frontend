import React from 'react'
import styles from './dropdown.module.css'

interface OptionsType {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  width?: string
  defaultValue?: string
  options: Array<OptionsType>
  name: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  onChange?: (value: string) => void
}

const Dropdown = ({
  label,
  width,
  defaultValue,
  name,
  options,
  disabled,
  error,
  errorMessage,
  onChange
}: SelectProps) => {
  return (
    <div className={styles.content}>
      {label && <label className={styles.dropDownLabel}>{label}</label>}
      <div
        className={`${styles.dropDownContainer} ${
          error && styles.dropDownContainerError
        }`}
        style={{ width }}
      >
        <select
          className={`${styles.dropDown} ${error && styles.dropDownError}`}
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={e => onChange && onChange(e.target.value)}
        >
          {options.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  )
}

export default Dropdown
