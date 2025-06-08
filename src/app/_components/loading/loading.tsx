import { LoaderCircle } from 'lucide-react'

import styles from './loading.module.css'

export default function Loading() {
  return (
    <div className={styles.container}>
      <LoaderCircle className={styles.icon} />
    </div>
  )
}
