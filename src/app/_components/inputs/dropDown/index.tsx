import React from 'react'
import styles from './dropdown.module.css'

interface OptionsType {
  value: string | number
  label: string | number
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  width?: string
  options: Array<OptionsType>
  error?: boolean
  errorMessage?: string
}

const Dropdown = ({
  label,
  width,
  options,
  error,
  errorMessage,
  ...rest
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
          {...rest}
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
