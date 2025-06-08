interface EventsPageProps {
  events: string
}

export default async function EventsPage({ events }: EventsPageProps) {
  //const events = await getEvents()
  return <div>Essa é a pagina publica de eventos{events}</div>
}
