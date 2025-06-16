'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import styles from './styles.module.css'
import { getCategoryOptions } from '@/utils'
import { Button } from '@/app/_components/button'
import { Camera, Upload, Video } from 'lucide-react'
import { CategoryProps } from '@/types/category.type'
import { useEffect, useState, ChangeEvent } from 'react'
import Dropdown from '@/app/(fatec)/_components/dropDown'
import {
  courseOptions,
  locationOptions,
  semesterOptions
} from '@/utils/recordStatus'
import { EventProps } from '@/types/event.type'
import { Category, Location } from '@/utils/enums'
import { serviceConsumer } from '@/services/service.consumer'

interface DetailManageEventsPage {
  categories: CategoryProps[]
  event: EventProps | null
  typeOfForm: 'create' | 'edit'
}

export default function DetailManageEventsPage({
  categories,
  typeOfForm,
  event
}: DetailManageEventsPage) {
  const [image, setImage] = useState<File>()
  const [previewImage, setPreviewImage] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>(
    event?.categoryId || ''
  )
  const [selectedLocation, setSelectedLocation] = useState<string>(
    event?.location || ''
  )
  const [selectedStartDate, setSelectedStartDate] = useState<string>('')
  const [unavailableDates, setUnavailableDates] = useState<string[]>([])
  const [availableTimeSlots, setAvailableTimeSlots] = useState<
    { start: string; end: string }[]
  >([])
  const [isRestricted, setIsRestricted] = useState<boolean>(
    event?.isRestricted || false
  )

  const selectedCategoryObj = categories.find(
    cat => cat.id === selectedCategory
  )

  useEffect(() => {
    setPreviewImage(event?.banner || '')
  }, [event])

  useEffect(() => {
    // Quando categoria mudar:
    if (!selectedCategory) return

    if (selectedCategoryObj?.name === Category.CURSO_ONLINE) {
      setSelectedLocation('')
      setUnavailableDates([])
      setSelectedStartDate('')
      setAvailableTimeSlots([])
    } else {
      setSelectedStartDate('')
      setAvailableTimeSlots([])
    }
  }, [selectedCategory])

  useEffect(() => {
    // Quando localização mudar:
    async function fetchUnavailableDates() {
      if (
        selectedLocation &&
        selectedCategoryObj?.name !== Category.CURSO_ONLINE
      ) {
        try {
          const data = await serviceConsumer().executeGet(
            '/events/unavailable-dates',
            {
              location: selectedLocation
            }
          )

          setUnavailableDates(data.data)
        } catch (error) {
          toast.error('Erro ao buscar datas indisponíveis.')
        }
      }
    }
    fetchUnavailableDates()
  }, [selectedLocation, selectedCategoryObj])

  useEffect(() => {
    // Quando data mudar:
    async function fetchAvailableTimeSlots() {
      if (
        selectedLocation &&
        selectedStartDate &&
        selectedCategoryObj?.name !== Category.CURSO_ONLINE
      ) {
        try {
          const data = await serviceConsumer().executeGet(
            '/events/available-time-slots',
            {
              location: selectedLocation,
              date: selectedStartDate
            }
          )

          setAvailableTimeSlots(data.data)
        } catch (error) {
          toast.error('Erro ao buscar horários disponíveis.')
        }
      }
    }
    fetchAvailableTimeSlots()
  }, [selectedStartDate, selectedLocation, selectedCategoryObj])

  function handleFileImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        toast.warning('Formato não permitido!')
        return
      }
      setPreviewImage(URL.createObjectURL(file))
      setImage(file)
    }
  }

  function isDateDisabled(dateStr: string) {
    return unavailableDates.includes(dateStr)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const payload = {
      name: formData.get('name'),
      categoryId: formData.get('category'),
      course: formData.get('course'),
      semester: formData.get('semester'),
      maxParticipants: formData.get('maxParticipants'),
      location: formData.get('location'),
      duration: formData.get('duration'),
      speakerName: formData.get('speakerName'),
      startDate: formData.get('startDate'),
      startTime: formData.get('startTime'),
      endTime: formData.get('endTime'),
      description: formData.get('description'),
      isRestricted: isRestricted // <-- Incluindo o estado do botão
    }

    console.log(payload)

    try {
      const res = await serviceConsumer().executePost('/events', payload)
      toast.warning(res.message)
    } catch (error) {
      toast.warning(`Erro ao criar evento, erro: ${error}`)
    }

    // Aqui você faz o envio para sua API
    toast.success('Formulário pronto para envio!')
  }

  return (
    <main className={styles.mainToCreateNewEvent}>
      <form onSubmit={onSubmit} className={styles.formToCreateNewEvent}>
        <h1>{typeOfForm === 'create' ? 'Criar um Evento' : 'Editar Evento'}</h1>

        <nav className={styles.navbarLink}>
          <span>Informações</span>
          <Link href={`participants`}>Participantes</Link>
        </nav>

        {/* Upload de Banner */}
        <div className={styles.uploadArea}>
          <input
            type="file"
            accept="image/png, image/jpeg"
            required={typeOfForm === 'create' && !previewImage}
            onChange={handleFileImage}
            className={styles.inputF}
          />

          {previewImage ? (
            <Image
              alt="Preview"
              src={previewImage}
              className={styles.preview}
              fill
              quality={100}
              priority
            />
          ) : (
            <>
              <div className={styles.images}>
                <Camera size={25} />
                <span>|</span>
                <Video size={25} />
              </div>
              <p>Arraste e solte os arquivos</p>
              <span className={styles.spanF}>
                <Upload size={25} />
                <span>Upload</span>
              </span>
            </>
          )}
        </div>

        <div className={styles.grid}>
          {/* Nome */}
          <input
            type="text"
            name="name"
            placeholder="Nome do Evento"
            required
            defaultValue={event?.name || ''}
          />

          {/* Categoria */}
          <Dropdown
            name="category"
            defaultValue={selectedCategory}
            onChange={value => setSelectedCategory(value)}
            options={getCategoryOptions(categories)}
          />

          {/* Duration (se for curso online) */}
          {selectedCategoryObj?.name === Category.CURSO_ONLINE && (
            <input
              name="duration"
              type="number"
              placeholder="Duração em minutos"
              step={30}
              min={30}
              required
              defaultValue={event?.duration}
            />
          )}

          {/* Curso e Semestre */}
          <Dropdown
            name="course"
            defaultValue={event?.course || ''}
            options={courseOptions}
          />
          <Dropdown
            name="semester"
            defaultValue={event?.semester || ''}
            options={semesterOptions}
          />

          {/* Limite de Participantes */}
          <input
            name="maxParticipants"
            placeholder="Limite de Inscrições"
            type="number"
            required
            min={1}
            max={999}
            defaultValue={event?.maxParticipants}
          />

          {/* Localização (se não for Curso Online) */}
          {selectedCategoryObj?.name !== Category.CURSO_ONLINE && (
            <>
              <Dropdown
                name="location"
                defaultValue={selectedLocation}
                options={locationOptions}
                onChange={value => setSelectedLocation(value)}
              />

              {selectedLocation === Location.OUTROS && (
                <input
                  name="customLocation"
                  type="text"
                  placeholder="Descreva a localização"
                  required
                  defaultValue={event?.customLocation}
                />
              )}
            </>
          )}

          {/* Nome do Palestrante */}
          <input
            name="speakerName"
            placeholder="Nome do Palestrante/Responsável"
            required
            defaultValue={event?.speakerName}
          />

          {/* Data (habilita apenas após escolher localização ou se for Curso Online) */}
          <input
            name="startDate"
            type="date"
            required
            value={selectedStartDate}
            onChange={e => setSelectedStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            disabled={
              selectedCategoryObj?.name !== Category.CURSO_ONLINE &&
              !selectedLocation
            }
            style={
              isDateDisabled(selectedStartDate)
                ? { backgroundColor: '#f8d7da' }
                : {}
            }
          />

          {/* Horários (só habilita se já tiver data e slots carregados) */}
          <input
            name="startTime"
            type="time"
            required
            disabled={!selectedStartDate || availableTimeSlots.length === 0}
            defaultValue={event?.startTime}
          />
          <input
            name="endTime"
            type="time"
            required
            disabled={!selectedStartDate || availableTimeSlots.length === 0}
            defaultValue={event?.endTime}
          />
        </div>
        <div className={styles.toggleContainer}>
          <label htmlFor="isRestrictedToggle">Evento Restrito?</label>
          <input
            id="isRestrictedToggle"
            type="checkbox"
            checked={isRestricted}
            onChange={() => setIsRestricted(!isRestricted)}
          />
          <span>{isRestricted ? 'Sim' : 'Não'}</span>
        </div>
        {/* Descrição */}
        <textarea
          name="description"
          placeholder="Descrição do evento"
          defaultValue={event?.description}
        />

        {/* Botão */}
        <div className={styles.buttonSubmit}>
          <Button type="submit" name="Salvar" />
        </div>
      </form>
    </main>
  )
}
