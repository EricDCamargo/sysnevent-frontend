import { UserRole } from '@/utils/enums'
import z from 'zod'

const allowedDomains = (process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAINS || '')
  .split(',')
  .map(domain => domain.trim().toLowerCase())

export const buildUserSchema = (isCreating: boolean) =>
  z
    .object({
      name: z
        .string()
        .nonempty('Nome é obrigatório.')
        .min(3, 'Nome deve ter pelo menos 3 caracteres.')
        .max(100, 'Nome muito longo.')
        .regex(
          /^[A-Za-zÀ-ú]+(?: [A-Za-zÀ-ú]+)*$/,
          'Nome deve conter apenas letras e espaços.'
        ),
      email: z
        .string()
        .nonempty('O e-mail é obrigatório.')
        .email('Formato de e-mail inválido.')
        .refine(
          email => {
            // Garante que o e-mail termine com um dos domínios permitidos
            return allowedDomains.some(domain =>
              email.toLowerCase().endsWith(domain)
            )
          },
          {
            message: 'Apenas e-mails institucionais da Fatec são permitidos.'
          }
        ),
      role: z.nativeEnum(UserRole, {
        errorMap: () => ({ message: 'Selecione um cargo válido.' })
      }),
      // O campo de senha é opcional no schema base...
      password: z.string().optional()
    })
    .refine(
      data => {
        // ... mas usamos .refine para torná-lo obrigatório condicionalmente.
        if (isCreating) {
          // Se estiver criando, a senha deve existir e ter no mínimo 6 caracteres.
          return data.password && data.password.length >= 6
        }
        // Se estiver editando, a validação da senha não é forçada aqui.
        return true
      },
      {
        // Mensagem de erro que será exibida se a condição acima falhar.
        message: 'A senha é obrigatória e deve ter no mínimo 6 caracteres.',
        path: ['password'] // Associa este erro especificamente ao campo 'password'.
      }
    )
