interface EventsPageProps {
  events: string
}

export default async function EventsPage({ events }: EventsPageProps) {
  //const events = await getEvents()
  return <h1>Essa é a pagina publica de eventos{events}</h1>
}
