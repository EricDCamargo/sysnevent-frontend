import { z } from 'zod'
import { RAFatec } from '@/lib/validacaoRA'

export const buildParticipantSchema = ({
  allowedDomains,
  isRestricted,
  participantType
}: {
  allowedDomains: string[]
  isRestricted: boolean
  participantType: 'ALUNO' | 'OUTROS'
}) => {
  return z.object({
    email: z
      .string()
      .nonempty('Email é obrigatório.')
      .email('Email inválido.')
      .refine(
        email => {
          const isInstitutional = allowedDomains.some(domain =>
            email.toLowerCase().endsWith(domain)
          )

          if (isRestricted || participantType === 'ALUNO') {
            return isInstitutional
          }

          return true
        },
        { message: 'Email institucional Fatec inválido.' }
      ),
    name: z.string().nonempty('Nome é obrigatório.'),
    ra: z
      .string()
      .refine(
        ra => {
          if (participantType === 'ALUNO') {
            return ra && RAFatec.validateRA(ra)
          }
          return true
        },
        { message: 'RA inválido ou obrigatório para alunos.' }
      )
      .optional(),
    course: z
      .string()
      .optional()
      .refine(
        course => {
          if (participantType === 'ALUNO') return !!course
          return true
        },
        { message: 'Curso é obrigatório.' }
      ),
    semester: z
      .string()
      .optional()
      .refine(
        semester => {
          if (participantType === 'ALUNO') return !!semester
          return true
        },
        { message: 'Semestre é obrigatório.' }
      )
  })
}
