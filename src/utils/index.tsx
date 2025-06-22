import { CategoryProps } from '@/types/category.type'
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

const getCategoryOptions = (categories: CategoryProps[]) => {
  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category.id
  }))
  return categoryOptions
}



export { handleChange, getCategoryOptions, getUserOptions }
