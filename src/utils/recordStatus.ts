import { Course, Semester, Location, UserRole } from './enums'

export const CourseLabels: Record<string, string> = {
  ['']: 'Escolha o curso',
  [Course.ADS]: 'Análise e Desenvolvimento de Sistemas',
  [Course.GE]: 'Gestão Empresarial',
  [Course.GTI]: 'Gestão da Tecnologia da Informação',
  [Course.GEMP]: 'Gestão Empresarial (Matutino)',
  [Course.MEC]: 'Mecatrônica Industrial'
}

export const SemesterLabels: Record<string, string> = {
  ['']: 'Escolha o semestre',
  [Semester.SEM1]: '1º Semestre',
  [Semester.SEM2]: '2º Semestre',
  [Semester.SEM3]: '3º Semestre',
  [Semester.SEM4]: '4º Semestre',
  [Semester.SEM5]: '5º Semestre',
  [Semester.SEM6]: '6º Semestre'
}

export const LocationLabels: Record<string, string> = {
  ['']: 'Escolha a localização',
  [Location.AUDITORIO]: 'Auditório',
  [Location.BIBLIOTECA]: 'Biblioteca',
  [Location.SALA_MAKER]: 'Sala Maker',
  [Location.LAB_MECANICA_METROLOGIA]: 'Lab. Mecânica e Metrologia',
  [Location.LAB_SISTEMAS_INTEGRADOS]: 'Lab. de Sistemas Integrados',
  [Location.LAB_HIDRAULICA_PNEUMATICA]: 'Lab. Hidráulica e Pneumática',
  [Location.LAB_ENSAIOS_METALOGRAFICOS]: 'Lab. Ensaios Metalográficos',
  [Location.LAB_ELETRONICA_POTENCIA]: 'Lab. Eletrônica de Potência',
  [Location.LAB_COMANDOS_ELETRICOS]: 'Lab. Comandos Elétricos',
  [Location.LAB_CONTROLE_PROCESSOS]: 'Lab. Controle de Processos',
  [Location.LAB_INFORMATICA_1]: 'Lab. Informática 1',
  [Location.LAB_INFORMATICA_2]: 'Lab. Informática 2',
  [Location.LAB_INFORMATICA_3]: 'Lab. Informática 3',
  [Location.LAB_INFORMATICA_4]: 'Lab. Informática 4',
  [Location.LAB_INFORMATICA_5]: 'Lab. Informática 5',
  [Location.LAB_INFORMATICA_6]: 'Lab. Informática 6',
  [Location.SALA_1]: 'Sala 1',
  [Location.SALA_2]: 'Sala 2',
  [Location.SALA_3]: 'Sala 3',
  [Location.SALA_4]: 'Sala 4',
  [Location.SALA_5]: 'Sala 5',
  [Location.SALA_6]: 'Sala 6',
  [Location.SALA_7]: 'Sala 7',
  [Location.SALA_8]: 'Sala 8',
  [Location.SALA_9]: 'Sala 9',
  [Location.SALA_9_3_4]: 'Sala 9 (3º e 4º períodos)',
  [Location.SALA_10]: 'Sala 10',
  [Location.SALA_11]: 'Sala 11',
  [Location.SALA_12]: 'Sala 12',
  [Location.OUTROS]: 'Outros'
}

export const CategoryLabels: Record<string, string> = {
  PALESTRA: 'Palestra',
  WORKSHOP: 'Workshop',
  OFICINA: 'Oficina',
  CURSO: 'Curso',
  VISITA_TECNICA: 'Visita Técnica'
}

const roleLabels: Record<string, string> = {
  [UserRole.DOCENT_ASSISTANT]: 'AUX. DOCENTE',
  [UserRole.COORDINATOR]: 'COORDENADOR',
  [UserRole.ADMIN]: 'ADMINISTRADOR'
}

export const getLabel = (key: string): string => {
  if (Object.values(UserRole).includes(key as UserRole)) {
    return roleLabels[key] ?? 'Função desconhecida'
  }
  if (Object.values(Location).includes(key as Location)) {
    return LocationLabels[key] ?? 'Localização desconhecida'
  }
  if (Object.values(Semester).includes(key as Semester)) {
    return SemesterLabels[key] ?? 'Semestre desconhecido'
  }
  if (Object.values(Course).includes(key as Course)) {
    return CourseLabels[key] ?? 'Curso desconhecido'
  }

  return 'Valor desconhecido'
}

export const semesterOptions = Object.entries(SemesterLabels).map(
  ([value, label]) => ({
    value,
    label
  })
)

export const locationOptions = Object.entries(LocationLabels).map(
  ([value, label]) => ({
    value,
    label
  })
)

export const courseOptions = Object.entries(CourseLabels).map(
  ([value, label]) => ({
    value,
    label
  })
)

export const roleOptions = Object.entries(roleLabels).map(
  ([value, label]) => ({
    value,
    label
  })
)
