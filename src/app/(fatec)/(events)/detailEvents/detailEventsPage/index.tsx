'use client'

import { EventProps } from '@/types/event.type'
import styles from './styles.module.css'
import Image from 'next/image'
import { formatEventDate } from '@/lib/helper'
import EventsGrid from '@/app/(fatec)/_components/eventsGrid/EventsGrid'
import { Button } from '@/app/_components/button'
import { CalendarDays, MapPin } from 'lucide-react'
import ConfirmModal from '@/app/_components/modals/confirm'
import { StatusCodes } from 'http-status-codes'
import { useMemo, useState, useTransition } from 'react'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import { handleRegisterParticipant } from '@/hooks/participant/useParticipant'
import Dropdown from '@/app/_components/inputs/dropDown'
import { courseOptions, semesterOptions } from '@/utils/recordStatus'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '@/app/_components/inputs/formInput/FormInput'
import { buildParticipantSchema } from '@/lib/validators/schemas/participantSchema'

interface EventsPage {
  event: EventProps | null
  events: EventProps[]
  currentEventId: string
}

export default function DetailEventsPage({
  event,
  events,
  currentEventId
}: EventsPage) {
  if (!event) return <p>Evento não encontrado.</p>

  const [isSubscribeModalOpen, setSubscribeModalOpen] = useState(false)
  const [participantType, setParticipantType] = useState<'ALUNO' | 'OUTROS'>(
    'ALUNO'
  )

  const allowedDomains = (process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAINS || '')
    .split(',')
    .map(domain => domain.trim().toLowerCase())

  const participantSchema = useMemo(() => {
    return buildParticipantSchema({
      allowedDomains,
      isRestricted: event.isRestricted,
      participantType
    })
  }, [allowedDomains, event.isRestricted, participantType])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(participantSchema),
    defaultValues: {
      email: '',
      name: '',
      ra: '',
      course: '',
      semester: ''
    }
  })
  const [isPending, startTransition] = useTransition()
  const handleCloseModal = () => {
    setSubscribeModalOpen(false)
    reset()
  }

  const onClientSubmit = handleSubmit(async data => {
    const formData = new FormData()
    formData.append('eventId', currentEventId)
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    startTransition(async () => {
      const result = await handleRegisterParticipant(formData)

      if (result.isOk) {
        setSubscribeModalOpen(false)
        reset()
        Swal.fire({
          icon: 'success',
          title: 'Você está inscrito!',
          text: result.message,
          confirmButtonText: 'OK'
        })
      } else if (result.status === StatusCodes.CONFLICT) {
        Swal.fire({
          icon: 'warning',
          title: result.message,
          html: `Verifique sua caixa de email <b>${data.email}</b> para mais informações.`,
          confirmButtonText: 'OK'
        })
      } else {
        toast.error(result.message)
      }
    })
  })

  const formattedDate = formatEventDate(
    event.startDate,
    event.startTime,
    event.endTime
  )

  return (
    <main className={styles.container}>
      <section className={styles.wrapper}>
        <Image
          src={event.banner ?? '/event_placeholder.svg'}
          alt={`Imagem do evento ${event.name}`}
          width={800}
          height={400}
          className={styles.eventImage}
        />

        <section className={styles.eventDetails}>
          <h1 className={styles.eventTitle}>{event.name}</h1>
          <p className={styles.eventResponsible}>Por: {event.speakerName}</p>
          <div className={styles.eventInfo}>
            <div className={styles.detailBlock}>
              <h2 className={styles.detailTitle}>Data e Hora</h2>
              <div className={styles.infoItem}>
                <CalendarDays size={20} />
                <span>{formattedDate}</span>
              </div>
            </div>
            <div className={styles.detailBlock}>
              <h2 className={styles.detailTitle}>Local do Evento</h2>
              <div className={styles.infoItem}>
                <MapPin size={20} />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
          <div className={styles.detailBlock}>
            <h2 className={styles.detailTitle}>Descrição</h2>
            <p className={styles.eventDescription}>{event.description}</p>
          </div>
          <Button
            type={'button'}
            name="Inscreva-se"
            onClick={() => setSubscribeModalOpen(true)}
          />
        </section>
      </section>

      <section className={styles.otherEventsSection}>
        <h2>Outros eventos que podem te interessar</h2>
        <EventsGrid events={events} mode="public" />
      </section>

      <ConfirmModal
        modalText={{
          title: 'Preencha os dados',
          message: (
            <div className={styles.gridModal}>
              <FormInput
                label="Email"
                type="email"
                placeholder="Email"
                error={!!errors.email}
                errorMessage={errors.email?.message}
                {...register('email')}
              />

              <FormInput
                label="Nome"
                type="text"
                placeholder="Nome"
                error={!!errors.name}
                errorMessage={errors.name?.message}
                {...register('name')}
              />

              <div className={styles.radioGroup}>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    value="ALUNO"
                    checked={participantType === 'ALUNO'}
                    onChange={() => setParticipantType('ALUNO')}
                  />
                  Sou aluno(a)
                </label>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    value="OUTROS"
                    checked={participantType === 'OUTROS'}
                    onChange={() => setParticipantType('OUTROS')}
                  />
                  Outros
                </label>
              </div>

              {participantType === 'ALUNO' && (
                <>
                  <Dropdown
                    label="Curso"
                    options={courseOptions}
                    error={!!errors.course}
                    errorMessage={errors.course?.message}
                    {...register('course')}
                  />

                  <Dropdown
                    label="Semestre"
                    options={semesterOptions}
                    error={!!errors.semester}
                    errorMessage={errors.semester?.message}
                    {...register('semester')}
                  />

                  <FormInput
                    label="RA"
                    type="text"
                    placeholder="RA"
                    error={!!errors.ra}
                    maxLength={13}
                    errorMessage={errors.ra?.message}
                    {...register('ra')}
                  />
                </>
              )}
            </div>
          )
        }}
        isOpen={isSubscribeModalOpen}
        onCancel={handleCloseModal}
        onSubmit={onClientSubmit}
        pending={isPending}
      />
    </main>
  )
}
