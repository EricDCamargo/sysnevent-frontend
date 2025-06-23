'use client'

import DataTable from '@/app/(fatec)/_components/dataTable/dataTable'
import { serviceConsumer } from '@/services/service.consumer'
import { TableColumn } from '@/types/dataTable.type'
import { ParticipantProps } from '@/types/participant.type'
import { Eye, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface EventParticipantsPageProps {
  initialParticipants: ParticipantProps[]
}

export default function EventParticipantsPage({
  initialParticipants
}: EventParticipantsPageProps) {
  const [participants, setParticipants] = useState(initialParticipants)

  async function handleTogglePresence(participantId: string) {
    try {
      await serviceConsumer().executePatch('/participants/presence/toggle', {
        participantId
      })

      setParticipants(prev =>
        prev.map(p =>
          p.id === participantId ? { ...p, isPresent: !p.isPresent } : p
        )
      )

      toast.success('Presença atualizada com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar presença.')
      console.error(error)
    }
  }
  const columns: TableColumn<ParticipantProps>[] = [
    { name: 'Nome', selector: row => row.name },
    {
      name: 'Email',
      selector: row => <p>{row.email}</p>
    },

    {
      name: 'Presença',
      cell: row => (
        <div className={'actions'}>
          <input
            type="checkbox"
            checked={row.isPresent}
            onChange={() => handleTogglePresence(row.id)}
          />
        </div>
      )
    }
  ]
  return (
    <div>
      <DataTable columns={columns} data={participants} />
    </div>
  )
}
