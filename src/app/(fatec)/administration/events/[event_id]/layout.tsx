import TabsNav from '../_components/tabsNav/TabsNav'
import styles from './styles.module.css'

interface EventLayoutProps {
  children: React.ReactNode
  params: Promise<{
    event_id: string
  }>
}

export default async function EventLayout({
  children,
  params
}: EventLayoutProps) {
  const { event_id } = await params
  return (
    <main>
      <section className={styles.eventLayout}>
        <TabsNav eventId={event_id} />
        {children}
      </section>
    </main>
  )
}
