type TableColumn<T> = {
  name: string
  sortable?: boolean
} & (
  | { selector: (row: T) => React.ReactNode; cell?: never }
  | { cell: (row: T) => React.ReactNode; selector?: never }
)

export type { TableColumn }
