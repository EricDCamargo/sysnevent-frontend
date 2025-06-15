import { Course, Semester, Category, Location } from './enums'

export const CourseLabels: Record<Course, string> = {
  ADS: 'Análise e Desenvolvimento de Sistemas',
  GE: 'Gestão Empresarial',
  GTI: 'Gestão da Tecnologia da Informação',
  GEMP: 'Gestão Empresarial (Matutino)',
  MEC: 'Mecânica'
}

export const SemesterLabels: Record<Semester, string> = {
  SEM1: '1º Semestre',
  SEM2: '2º Semestre',
  SEM3: '3º Semestre',
  SEM4: '4º Semestre',
  SEM5: '5º Semestre',
  SEM6: '6º Semestre'
}

export const LocationLabels: Record<Location, string> = {
  AUDITORIO: 'Auditório',
  BIBLIOTECA: 'Biblioteca',
  SALA_MAKER: 'Sala Maker',
  LAB_MECANICA_METROLOGIA: 'Lab. Mecânica e Metrologia',
  LAB_SISTEMAS_INTEGRADOS: 'Lab. de Sistemas Integrados',
  LAB_HIDRAULICA_PNEUMATICA: 'Lab. Hidráulica e Pneumática',
  LAB_ENSAIOS_METALOGRAFICOS: 'Lab. Ensaios Metalográficos',
  LAB_ELETRONICA_POTENCIA: 'Lab. Eletrônica de Potência',
  LAB_COMANDOS_ELETRICOS: 'Lab. Comandos Elétricos',
  LAB_CONTROLE_PROCESSOS: 'Lab. Controle de Processos',
  LAB_INFORMATICA_1: 'Lab. Informática 1',
  LAB_INFORMATICA_2: 'Lab. Informática 2',
  LAB_INFORMATICA_3: 'Lab. Informática 3',
  LAB_INFORMATICA_4: 'Lab. Informática 4',
  LAB_INFORMATICA_5: 'Lab. Informática 5',
  LAB_INFORMATICA_6: 'Lab. Informática 6',
  SALA_1: 'Sala 1',
  SALA_2: 'Sala 2',
  SALA_3: 'Sala 3',
  SALA_4: 'Sala 4',
  SALA_5: 'Sala 5',
  SALA_6: 'Sala 6',
  SALA_7: 'Sala 7',
  SALA_8: 'Sala 8',
  SALA_9: 'Sala 9',
  SALA_9_3_4: 'Sala 9 (3º e 4º períodos)',
  SALA_10: 'Sala 10',
  SALA_11: 'Sala 11',
  SALA_12: 'Sala 12',
  OUTROS: 'Outros'
}

export const CategoryLabels: Record<Category, string> = {
  PALESTRA: 'Palestra',
  WORKSHOP: 'Workshop',
  OFICINA: 'Oficina',
  CURSO: 'Curso',
  VISITA_TECNICA: 'Visita Técnica'
}

export const semesterOptions = Object.entries(SemesterLabels).map(([value, label]) => ({
  value,
  label
}))

export const locationOptions = Object.entries(LocationLabels).map(([value, label]) => ({
  value,
  label
}))
