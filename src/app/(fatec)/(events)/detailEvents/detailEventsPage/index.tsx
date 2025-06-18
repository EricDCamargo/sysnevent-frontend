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
import { useState } from 'react'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import { handleRegisterParticipant } from '@/hooks/participant/useParticipant'
import Dropdown from '@/app/(fatec)/_components/dropDown'
import { courseOptions, semesterOptions } from '@/utils/recordStatus'
import { RAFatec } from '@/lib/validacaoRA'

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
  const [raError, setRaError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)

  const rawDomains = process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAINS || ''
  const allowedDomains = rawDomains
    .split(',')
    .map(domain => domain.trim().toLowerCase())

  const handleCloseModal = () => {
    setSubscribeModalOpen(false)
    setEmailError(null)
    setRaError(null)
  }

  async function handleSubmitSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    if (participantType === 'ALUNO') {
      const ra = formData.get('ra') as string
      if (!RAFatec.validateRA(ra)) {
        setRaError('RA inválido para Fatec')
        return
      }
    }
    const email = formData.get('email') as string

    // Validação de domínio se o evento for restrito
    if (event?.isRestricted) {
      const emailIsValid = allowedDomains.some(domain =>
        email.toLowerCase().endsWith(domain)
      )
      if (!emailIsValid) {
        setEmailError('Este evento é restrito a emails institucionais Fatec.')
        return
      }
    }
    setEmailError(null)
    setRaError(null)

    formData.append('eventId', currentEventId)
    const result = await handleRegisterParticipant(formData)

    if (result.isOk && result.status === StatusCodes.CREATED) {
      setSubscribeModalOpen(false)
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
        html: `Verifique sua caixa de email <b>${email}</b> para mais informações.`,
        confirmButtonText: 'OK'
      })
    } else {
      toast.error(result.message)
    }
  }
  const formattedDate = formatEventDate(
    event.startDate,
    event.startTime,
    event.endTime
  )
  return (
    <main className={styles.container}>
      <section className={styles.wrapper}>
        <Image
          src={'/event_placeholder.svg'}
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
              <input
                type="email"
                required
                name="email"
                placeholder="Email"
                className={styles.input}
                style={emailError ? { borderColor: '#d32f2f' } : undefined}
                onBlur={e => {
                  if (event.isRestricted) {
                    const value = e.target.value
                    const emailIsValid = allowedDomains.some(domain =>
                      value.toLowerCase().endsWith(domain)
                    )
                    setEmailError(
                      emailIsValid
                        ? null
                        : 'Este evento é restrito a emails institucionais Fatec.'
                    )
                  } else {
                    setEmailError(null)
                  }
                }}
              />

              <input
                type="text"
                required
                name="name"
                placeholder="Nome"
                className={styles.input}
              />
              <div className={styles.radioGroup}>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="participantType"
                    value="ALUNO"
                    checked={participantType === 'ALUNO'}
                    onChange={() => setParticipantType('ALUNO')}
                  />
                  Sou aluno(a)
                </label>

                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="participantType"
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
                    name="course"
                    defaultValue=""
                    options={courseOptions}
                  />
                  <Dropdown
                    name="semester"
                    defaultValue=""
                    options={semesterOptions}
                  />
                  <input
                    type="number"
                    required
                    name="ra"
                    placeholder="Seu RA"
                    className={styles.input}
                    style={raError ? { borderColor: '#d32f2f' } : undefined}
                    onBlur={e => {
                      const value = e.target.value
                      if (!RAFatec.validateRA(value)) {
                        setRaError('RA inválido para Fatec')
                      } else {
                        setRaError(null)
                      }
                    }}
                  />
                  {raError && <span className={styles.error}>{raError}</span>}
                </>
              )}
              {emailError && <span className={styles.error}>{emailError}</span>}
            </div>
          )
        }}
        isOpen={isSubscribeModalOpen}
        onCancel={handleCloseModal}
        onConfirm={handleSubmitSubscribe}
      />
    </main>
  )
}
