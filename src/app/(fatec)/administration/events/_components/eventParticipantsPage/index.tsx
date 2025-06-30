'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { Printer } from 'lucide-react'
import styles from './styles.module.css'
import { toast } from 'sonner'

import DataTable from '@/app/(fatec)/_components/dataTable/dataTable'
import ConfirmModal from '@/app/_components/modals/confirm'

import { ParticipantProps } from '@/types/participant.type'
import { TableColumn } from '@/types/dataTable.type'
import { serviceConsumer } from '@/services/service.consumer'
import { getParticipantsFiltered } from '@/services/retriveSSRData/retriveParticipantsData'

interface EventParticipantsPageProps {
  initialParticipants: ParticipantProps[]
  event_id: string
}

export default function EventParticipantsPage({
  initialParticipants,
  event_id
}: EventParticipantsPageProps) {
  const [participants, setParticipants] = useState(initialParticipants)

  const [filters, setFilters] = useState({
    includeStudents: false,
    includeFatec: false,
    includeExternal: false
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAttendanceReport, setIsAttendanceReport] = useState(true)
  const [isPending, startTransition] = useTransition()

  const isFirstRender = useRef(true)

  const handleFilterChange = (field: keyof typeof filters, value: boolean) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    async function fetchFilteredParticipants() {
      const newParticipantes = await getParticipantsFiltered({
        event_id,
        onlyStudents: filters.includeStudents,
        onlyFatec: filters.includeFatec,
        onlyExternal: filters.includeExternal
      })

      setParticipants(newParticipantes)
    }

    fetchFilteredParticipants()
  }, [filters, event_id])

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
    }
  }

  const handlePrintReport = () => {
    startTransition(async () => {
      const res = await serviceConsumer().executePost(
        '/reports/participants',
        {
          event_id,
          includeStudents: filters.includeStudents,
          includeFatec: filters.includeFatec,
          includeExternal: filters.includeExternal,
          isAttendanceReport
        },
        undefined,
        { responseType: 'blob' }
      )
      if (res.isOk) {
        const blob = new Blob([res.data], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
          'download',
          `Relatorio de ${isAttendanceReport ? 'Presenças' : 'Incrições'}.pdf`
        )
        document.body.appendChild(link)
        link.click()
        link.remove()
        setIsModalOpen(false)
        toast.success('Relatorio gerado com sucesso!')
      } else {
        toast.warning('Houve um problema ao gerar o relatorio!')
      }
    })
  }

  const columns: TableColumn<ParticipantProps>[] = [
    { name: 'Nome', selector: row => row.name },
    { name: 'Email', selector: row => <p>{row.email}</p> },
    {
      name: 'Presença',
      cell: row => (
        <input
          type="checkbox"
          checked={row.isPresent}
          onChange={() => handleTogglePresence(row.id)}
        />
      )
    }
  ]
  const filterOptions: {
    key: keyof typeof filters
    label: string
  }[] = [
    { key: 'includeStudents', label: 'Alunos' },
    { key: 'includeFatec', label: 'Fatec' },
    { key: 'includeExternal', label: 'Externos' }
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.filtersRow}>
        <h2 className={styles.title}>Lista de Participantes</h2>
        <div
          className={styles.printButton}
          onClick={() => setIsModalOpen(true)}
        >
          <Printer size={18} /> Imprimir como PDF
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        {filterOptions.map(({ key, label }) => (
          <div
            key={key}
            className={`
        ${styles.checkboxButtonWrapper}
        ${filters[key] ? styles.selected : ''}
      `}
            onClick={() => handleFilterChange(key, !filters[key])}
          >
            <input type="checkbox" checked={filters[key]} readOnly />
            {label}
          </div>
        ))}
      </div>

      <DataTable columns={columns} data={participants} />

      <ConfirmModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        pending={isPending}
        modalText={{
          title: 'Tipo de relatório',
          message: (
            <div className={styles.radioGroup}>
              <label
                className={`${styles.radioButtonWrapper} ${
                  isAttendanceReport ? styles.selected : ''
                }`}
                onClick={() => setIsAttendanceReport(true)}
              >
                Lista de Presença
                <input
                  type="radio"
                  name="reportType"
                  checked={isAttendanceReport}
                  onChange={() => setIsAttendanceReport(true)}
                />
              </label>
              <label
                className={`${styles.radioButtonWrapper} ${
                  !isAttendanceReport ? styles.selected : ''
                }`}
                onClick={() => setIsAttendanceReport(false)}
              >
                Lista de Inscrição
                <input
                  type="radio"
                  name="reportType"
                  checked={!isAttendanceReport}
                  onChange={() => setIsAttendanceReport(false)}
                />
              </label>
            </div>
          )
        }}
        onConfirmSubmit={handlePrintReport}
      />
    </div>
  )
}
