import { UserProps } from '@/types/user.type'
import { ChangeEvent } from 'react'

const handleChange = <T extends Record<string, any>>(
  setValues: React.Dispatch<React.SetStateAction<T>>,
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target
  const processedValue = type === 'number' ? value.replace(/\D/g, '') : value

  setValues(prev => ({
    ...prev,
    [name]: processedValue
  }))
}

const getUserOptions = (users: UserProps[]) => {
  return users.map(user => ({
    label: user.name,
    value: user.id
  }))
}

const formatPrice = (value: FormDataEntryValue | null | number) => {
  if (!value) return ''
  const num = Number(value.toString().replace(/\D/g, '')) / 100
  const retorno = `R$ ${num.toFixed(2).replace('.', ',')}`

  return retorno
}

const formatCurrency = (value: string | number) => {
  const floatValue = parseFloat(value.toString())

  if (isNaN(floatValue)) return ''

  if (isNaN(floatValue)) return ''
  return floatValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
}

export { handleChange, formatPrice, formatCurrency, getUserOptions }
