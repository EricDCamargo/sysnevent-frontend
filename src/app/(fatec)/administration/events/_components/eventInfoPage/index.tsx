'use client'

import Image from 'next/image'
import { toast } from 'sonner'
import styles from './styles.module.css'
import { Button } from '@/app/_components/button'
import Dropdown from '@/app/_components/inputs/dropDown'
import { useEffect, useState, ChangeEvent, useRef } from 'react'
import { Controller, Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category, Location } from '@/utils/enums'
import 'react-datepicker/dist/react-datepicker.css'

import { CategoryProps } from '@/types/category.type'
import { EventProps } from '@/types/event.type'
import { serviceConsumer } from '@/services/service.consumer'
import FormInput from '@/app/_components/inputs/formInput.tsx/FormInput'
import { getCategoryOptions } from '@/utils'
import { buildEventSchema } from '@/lib/validators/schemas/eventSchema'
import {
  courseOptions,
  locationOptions,
  semesterOptions
} from '@/utils/recordStatus'
import moment from 'moment'
import z from 'zod'
import {
  generateValidStartTimes,
  generateValidEndTimes
} from '@/utils/timeSlotHelpers'
import { Camera, Video, Upload } from 'lucide-react'

interface EventInfoPageProps {
  categories: CategoryProps[]
  event: EventProps | null
  typeOfForm: 'create' | 'edit'
}

export default function EventInfoPage({
  categories,
  typeOfForm,
  event
}: EventInfoPageProps) {
  const [image, setImage] = useState<File>()
  const [previewImage, setPreviewImage] = useState<string>('')
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const [unavailableDates, setUnavailableDates] = useState<string[]>([])
  const [availableTimeSlots, setAvailableTimeSlots] = useState<
    { start: string; end: string }[]
  >([])
  const [validStartTimes, setValidStartTimes] = useState<string[]>([])
  const [validEndTimes, setValidEndTimes] = useState<string[]>([])

  useEffect(() => {
    setPreviewImage(event?.banner || '')
  }, [event])

  function handleFileImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      toast.warning('Nenhum arquivo selecionado.')
      return
    }
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      toast.warning('Formato não permitido!')
      return
    }

    setPreviewImage(URL.createObjectURL(file))
    setImage(file)
  }

  const initialLocationRef = useRef<string | undefined>(event?.location)

  type FormValues = z.infer<ReturnType<typeof buildEventSchema>>

  const dynamicResolver: Resolver<FormValues> = async (
    values,
    context,
    options
  ) => {
    const selectedCategoryName = categories.find(
      c => c.id === values.categoryId
    )?.name
    const selectedLocation = values.location
    const schema = buildEventSchema({ selectedCategoryName, selectedLocation })
    return await zodResolver(schema)(values, context, options)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control
  } = useForm({
    resolver: dynamicResolver,
    defaultValues: {
      name: event?.name || '',
      course: event?.course || '',
      semester: event?.semester || '',
      maxParticipants: event?.maxParticipants ?? undefined,
      location: event?.location || '',
      customLocation: event?.customLocation || '',
      speakerName: event?.speakerName || '',
      startDate: event?.startDate
        ? moment.parseZone(event.startDate).format('YYYY-MM-DD')
        : '',
      startTime: event?.startTime
        ? moment(event.startTime).format('HH:mm')
        : '',
      endTime: event?.endTime ? moment(event.endTime).format('HH:mm') : '',
      duration: event?.duration ?? undefined,
      description: event?.description || '',
      categoryId: event?.categoryId || '',
      isRestricted: event?.isRestricted ?? false
    }
  })

  const watchedCategoryId = watch('categoryId')
  const watchedLocation = watch('location')
  const watchedStartDate = watch('startDate')
  const watchedStartTime = watch('startTime')

  // Regra: mostrar Duração vs Localização
  const isCursoOnline =
    categories.find(c => c.id === watchedCategoryId)?.name ===
    Category.CURSO_ONLINE

  const shouldEnableDateField = isCursoOnline || watchedLocation

  // Regra: buscar unavailableDates
  useEffect(() => {
    if (
      watchedLocation &&
      watchedLocation !== Location.OUTROS &&
      !isCursoOnline
    ) {
      serviceConsumer()
        .executeGet('/events/unavailable-dates', {
          location: watchedLocation,
          ...(event?.id && { ignoreEventId: event.id })
        })
        .then(r => {
          setUnavailableDates(r.data)
        })
        .catch(() => toast.error('Não foi possível carregar datas.'))
    } else {
      setUnavailableDates([])
    }
  }, [watchedLocation, isCursoOnline])

  useEffect(() => {
    if (
      watchedStartDate &&
      watchedLocation &&
      watchedLocation !== Location.OUTROS &&
      !isCursoOnline
    ) {
      serviceConsumer()
        .executeGet('/events/available-time-slots', {
          location: watchedLocation,
          date: watchedStartDate,
          ...(event?.id && { ignoreEventId: event.id })
        })
        .then(r => setAvailableTimeSlots(r.data))
        .catch(() => toast.error('Não foi possível carregar horários.'))
    } else if (watchedLocation === Location.OUTROS || isCursoOnline) {
      // regra: se OUTROS ou curso-online libera tudo
      setAvailableTimeSlots([{ start: '07:30', end: '23:30' }])
    }
  }, [watchedStartDate, watchedLocation, isCursoOnline])

  // depois do useEffect que carrega availableTimeSlots

  useEffect(() => {
    if (availableTimeSlots.length > 0) {
      setValidStartTimes(generateValidStartTimes(availableTimeSlots))
    } else {
      setValidStartTimes([])
    }
  }, [availableTimeSlots])

  useEffect(() => {
    if (watchedStartTime && availableTimeSlots.length > 0) {
      setValidEndTimes(
        generateValidEndTimes(watchedStartTime, availableTimeSlots)
      )
    } else {
      setValidEndTimes([])
    }
  }, [watchedStartTime, availableTimeSlots])

  useEffect(() => {
    // Quando já temos horários válidos E uma data selecionada
    if (validStartTimes.length > 0 && watchedStartDate) {
      const firstStartTime = validStartTimes[0]
      setValue('startTime', firstStartTime)

      // Calcula os horários de fim e preenche com o mais próximo (30min após)
      const ends = generateValidEndTimes(firstStartTime, availableTimeSlots)
      setValidEndTimes(ends)

      if (ends.length > 0) {
        setValue('endTime', ends[0])
      }
    }
  }, [validStartTimes, watchedStartDate])

  useEffect(() => {
    // Ignora a primeira renderização (localização original do evento)
    if (
      initialLocationRef.current !== undefined &&
      watchedLocation !== initialLocationRef.current &&
      !isCursoOnline
    ) {
      setValue('startDate', '')
      setValue('startTime', '')
      setValue('endTime', '')
      setValidStartTimes([])
      setValidEndTimes([])
      setAvailableTimeSlots([])
      toast.info('Selecione novamente a data para carregar os horários.')
    }
  }, [watchedLocation, watchedCategoryId])

  const onSubmit = async (data: any) => {
    const formData = new FormData()

    // Converte data e horários para formato ISO UTC
    const startDate = moment.parseZone(data.startDate).startOf('day')
    const startTime = moment.parseZone(`${data.startDate}T${data.startTime}`)
    const endTime = moment.parseZone(`${data.startDate}T${data.endTime}`)

    formData.append('startDate', startDate.toISOString())
    formData.append('startTime', startTime.toISOString())
    formData.append('endTime', endTime.toISOString())

    // Adiciona os demais campos normalmente
    const fieldsToIgnore = ['startDate', 'startTime', 'endTime']
    for (const [key, value] of Object.entries(data)) {
      if (
        value !== undefined &&
        value !== null &&
        !fieldsToIgnore.includes(key)
      ) {
        formData.append(key, value.toString())
      }
    }

    formData.append('file', image!)

    try {
      if (typeOfForm === 'create') {
        const res = await serviceConsumer().executePost('/events', formData)
        toast.success(res.message)
      } else {
        const res = await serviceConsumer().executePut(
          '/events',
          { event_id: event?.id },
          formData
        )
        toast.success(res.message)
      }
    } catch (error) {
      toast.error('Erro ao salvar evento. Verifique os campos.')
      console.error(error)
    }
  }

  const optionsWithAll = [
    { label: 'Escolha a categoria', value: '' },
    ...getCategoryOptions(categories)
  ]

  return (
    <main>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formToCreateNewEvent}
      >
        <div
          className={styles.uploadArea}
          onClick={() => inputFileRef.current?.click()}
        >
          <input
            type="file"
            required={!previewImage}
            accept="image/png, image/jpeg"
            onChange={handleFileImage}
            className={styles.inputF}
            ref={inputFileRef}
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
          <FormInput
            label="Nome do Evento"
            type="text"
            placeholder="Nome"
            error={!!errors.name}
            errorMessage={errors.name?.message}
            {...register('name')}
          />

          <Dropdown
            label="Categoria"
            options={optionsWithAll}
            {...register('categoryId')}
          />

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
            label="Máximo de Participantes"
            type="number"
            placeholder="Limite"
            error={!!errors.maxParticipants}
            errorMessage={errors.maxParticipants?.message}
            {...register('maxParticipants')}
          />

          {isCursoOnline ? (
            <FormInput
              label="Duração (horas)"
              type="number"
              placeholder="Duração"
              error={!!errors.duration}
              errorMessage={errors.duration?.message}
              {...register('duration')}
            />
          ) : (
            <>
              <Dropdown
                label="Localização"
                options={locationOptions}
                {...register('location')}
              />
              {watchedLocation === Location.OUTROS && (
                <FormInput
                  label="Localização Personalizada"
                  type="text"
                  placeholder="Descreva a localização"
                  error={!!errors.customLocation}
                  errorMessage={errors.customLocation?.message}
                  {...register('customLocation')}
                />
              )}
            </>
          )}

          <FormInput
            label="Nome do Palestrante"
            type="text"
            placeholder="Palestrante"
            error={!!errors.speakerName}
            errorMessage={errors.speakerName?.message}
            {...register('speakerName')}
          />

          <Controller
            control={control}
            name={'startDate'}
            render={({ field, fieldState }) => (
              <FormInput
                label={'Data de inicio'}
                type="date"
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                disabled={!shouldEnableDateField}
                min={moment().format('YYYY-MM-DD')}
                {...field}
                onChange={e => {
                  const selectedDate = e.target.value
                  // Validação manual de datas indisponíveis
                  if (
                    selectedDate &&
                    unavailableDates.includes(selectedDate) &&
                    !isCursoOnline &&
                    watchedLocation !== Location.OUTROS
                  ) {
                    toast.error(
                      'Esta data está indisponível para a localização selecionada.'
                    )
                    field.onChange('') // Limpa o campo
                  } else {
                    field.onChange(selectedDate)
                  }
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="startTime"
            render={({ field }) => (
              <Dropdown
                label="Hora Início"
                options={validStartTimes.map(t => ({ label: t, value: t }))}
                {...field}
                disabled={!watchedStartDate && !isCursoOnline}
              />
            )}
          />

          <Controller
            control={control}
            name="endTime"
            render={({ field }) => (
              <Dropdown
                label="Hora Fim"
                options={validEndTimes.map(t => ({ label: t, value: t }))}
                {...field}
                disabled={!watchedStartTime && !isCursoOnline}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="isRestricted"
          render={({ field }) => (
            <div className={styles.toggleContainer}>
              <label htmlFor="isRestrictedToggle">Evento Restrito?</label>
              <input
                id="isRestrictedToggle"
                type="checkbox"
                checked={field.value}
                onChange={e => field.onChange(e.target.checked)}
              />
              <span>{field.value ? 'Sim' : 'Não'}</span>
            </div>
          )}
        />

        <textarea
          placeholder="Descrição do evento"
          {...register('description')}
        />

        <div className={styles.buttonSubmit}>
          <Button type="submit" name="Salvar" />
        </div>
      </form>
    </main>
  )
}
