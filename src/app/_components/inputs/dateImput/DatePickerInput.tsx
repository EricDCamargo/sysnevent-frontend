'use client'

import React from 'react'
import { Controller } from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './styles.module.css'
import moment from 'moment'

interface DatePickerInputProps {
  control: any
  name: string
  label: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  unavailableDates: string[]
  isCursoOnline: boolean
}

export const DatePickerInput = ({
  control,
  name,
  label,
  error,
  errorMessage,
  disabled,
  unavailableDates,
  isCursoOnline
}: DatePickerInputProps) => {
  return (
    <div className={styles.formInputContainer}>
      <label>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ReactDatePicker
            {...field}
            
            className={styles.myDateInput}
            calendarClassName={styles.myCalendar}
            dayClassName={date =>
              unavailableDates.includes(moment(date).format('YYYY-MM-DD'))
                ? styles.disabledDay
                : ''
            }
            excludeDates={unavailableDates.map(d => moment(d).toDate())}
            disabled={disabled}
            onChange={d => field.onChange(moment(d).format('YYYY-MM-DD'))}
            dateFormat="yyyy-MM-dd"
            popperPlacement="bottom-start"
            withPortal
          />
        )}
      />
      {error && <span className={styles.error}>{errorMessage}</span>}
    </div>
  )
}
