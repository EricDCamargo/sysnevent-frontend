import React from 'react'
import styles from './dropdown.module.css'

interface OptionsType {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  width?: string
  defaultValue: string
  options: Array<OptionsType>
  name: string
  disabled?: boolean
  onChange?: (value: string) => void
}

const Dropdown = ({
  label,
  width,
  defaultValue,
  name,
  options,
  disabled,
  onChange
}: SelectProps) => {
  return (
    <div className={styles.dropDownContainer} style={{ width }}>
      {label && <label>{label}</label>}
      <select
        className={styles.dropDown}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        required
        onChange={e => onChange && onChange(e.target.value)}
      >
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}
export default Dropdown
