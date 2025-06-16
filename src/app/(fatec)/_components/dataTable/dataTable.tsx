import React from 'react'
import styles from './dataTable.module.css'
import { TableColumn } from '@/types/dataTable.type'

interface DataTableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
}

export default function DataTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        {data.length === 0 ? (
          <div className={styles.noData}>Nenhum registro disponível</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                {columns.map((col, index) => (
                  <th key={index} className={styles.tableCell}>
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={styles.tableRow}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={styles.tableCell}>
                      {col.cell ? (
                        col.cell(item)
                      ) : (
                        <span>{col.selector(item)}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className={styles.showOnMobileOnly}>
        <p>Vire a tela para visualizar todas as informações</p>
        <div></div>
      </div>
    </div>
  )
}
