'use client'

import { useEffect, useState } from 'react'
import styles from './search.module.css'
import { Search, X } from 'lucide-react'
interface SearchProps {
  setDateToPage: ([]: any) => void
  data: any[]
  searchValue: string
}

export const SearchInput = ({
  setDateToPage,
  data,
  searchValue
}: SearchProps) => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!search) {
      setDateToPage(data)
    } else {
      const filteredData = data.filter(field => {
        const fieldValue = field[searchValue]
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(search.toLowerCase())
        }
        return false
      })
      setDateToPage(filteredData)
    }
  }, [search, data, searchValue])

  return (
    <div className={styles.searchContainer}>
      <Search className={styles.ico} />
      <input
        placeholder={'Pesquisar'}
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.input}
      />
      <div className={styles.clearContainer}>
        {search && (
          <button className={styles.clearButton} onClick={() => setSearch('')}>
            <X className={styles.ico} />
          </button>
        )}
      </div>
    </div>
  )
}
