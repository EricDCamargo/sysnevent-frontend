import { z } from 'zod'
import { Category, Location } from '@/utils/enums'

export const buildEventSchema = ({
  selectedCategoryName,
  selectedLocation
}: {
  selectedCategoryName?: string
  selectedLocation?: string
}) => {
  return z.object({
    name: z
      .string()
      .nonempty('Nome é obrigatório.')
      .min(3, 'Nome deve ter pelo menos 3 caracteres.')
      .max(100, 'Nome muito longo.')
      .regex(
        /^[A-Za-zÀ-ú]+(?: [A-Za-zÀ-ú]+)*$/,
        'Nome deve conter apenas letras e espaços.'
      ),

    categoryId: z
      .string()
      .uuid('Categoria inválida.')
      .nonempty('Categoria é obrigatória.'),

    course: z
      .string()
      .optional()
      .refine(
        v => {
          if (selectedCategoryName !== Category.CURSO_ONLINE) return !!v
          return true
        },
        { message: 'Curso é obrigatório.' }
      ),

    semester: z
      .string()
      .optional()
      .refine(
        v => {
          if (selectedCategoryName !== Category.CURSO_ONLINE) return !!v
          return true
        },
        { message: 'Semestre é obrigatório.' }
      ),

    maxParticipants: z.coerce
      .number({ invalid_type_error: 'Limite precisa ser um número.' })
      .min(1, 'Número mínimo de participantes é 1.')
      .max(999, 'Número máximo de participantes é 999.'),

    location: z
      .string()
      .optional()
      .refine(
        v => {
          if (selectedCategoryName !== Category.CURSO_ONLINE) return !!v
          return true
        },
        { message: 'Localização é obrigatória.' }
      ),

    customLocation: z
      .string()
      .optional()
      .refine(
        v => {
          if (selectedLocation === Location.OUTROS) return !!v
          return true
        },
        { message: 'Descrição da localização é obrigatória.' }
      ),

    speakerName: z
      .string()
      .nonempty('Nome do palestrante é obrigatório.')
      .min(3, 'Nome do palestrante deve ter pelo menos 3 caracteres.')
      .max(60, 'Nome do palestrante pode ter no máximo 60 caracteres.')
      .regex(
        /^[A-Za-zÀ-ú.'´`"-]+(?: [A-Za-zÀ-ú.'´`"-]+)*$/,
        'Nome do palestrante deve conter apenas letras, espaços e pontuação comum.'
      ),

    startDate: z.string().nonempty('Data de início é obrigatória.'),

    startTime: z.string().nonempty('Horário de início é obrigatório.'),

    endTime: z.string().nonempty('Horário de término é obrigatório.'),

    duration: z.coerce
      .number()
      .optional()
      .refine(
        v => {
          if (selectedCategoryName === Category.CURSO_ONLINE)
            return v !== undefined && v >= 1
          return true
        },
        { message: 'Duração mínima de 1 hora para Cursos Online.' }
      ),

    description: z.string().optional(),

    isRestricted: z.boolean().optional()
  })
}
