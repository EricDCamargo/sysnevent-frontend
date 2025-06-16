// raFatec.ts

export interface RAComponents {
  fatec: string
  curso: string
  anoIngresso: string
  semestreIngresso: string
  turno: string
  numeroSequencial: string
  digitoVerificador: string
}

// Lista de códigos válidos de FATECs conforme site oficial do CPS
const validFatecCodes = new Set([
  '002',
  '003',
  '005',
  '109',
  '111',
  '126',
  '127',
  '129',
  '137',
  '146',
  '160',
  '167',
  '168',
  '178',
  '184',
  '196',
  '209',
  '216',
  '217',
  '269',
  '270',
  '272',
  '283',
  '284',
  '292',
  '294',
  '298',
  '299'
  // Atualize conforme novas unidades forem adicionadas
])

export class RAFatec {
  static readonly RA_LENGTH = 13

  /**
   * Verifica se o RA possui 13 dígitos numéricos (estrutura válida).
   * @param ra string RA bruto
   * @returns boolean indicando validade estrutural
   */
  static isValidRA(ra: string): boolean {
    const cleanRA = ra.replace(/\D/g, '')
    return /^\d{13}$/.test(cleanRA)
  }

  /**
   * Parseia o RA em seus componentes.
   * @param ra string RA válido (13 dígitos)
   * @throws Error se RA inválido
   * @returns RAComponents com partes do RA
   */
  static parseRA(ra: string): RAComponents {
    const cleanRA = ra.replace(/\D/g, '')

    if (!this.isValidRA(cleanRA)) {
      throw new Error(
        `RA inválido. Deve conter exatamente ${this.RA_LENGTH} dígitos numéricos.`
      )
    }

    return {
      fatec: cleanRA.slice(0, 3),
      curso: cleanRA.slice(3, 6),
      anoIngresso: `20${cleanRA.slice(6, 8)}`,
      semestreIngresso: cleanRA[8],
      turno: this.parseTurno(cleanRA[9]),
      numeroSequencial: cleanRA.slice(10, 13),
      digitoVerificador: cleanRA.slice(12)
    }
  }

  /**
   * Formata o RA no padrão legível.
   * Exemplo: 0030481321099 -> 003.048.13.21.099-9
   * @param ra string RA bruto
   * @returns string formatada
   */
  static formatRA(ra: string): string {
    const cleanRA = ra.replace(/\D/g, '')
    if (cleanRA.length !== this.RA_LENGTH) return ra

    return `${cleanRA.slice(0, 3)}.${cleanRA.slice(3, 6)}.${cleanRA.slice(
      6,
      8
    )}.${cleanRA[8]}${cleanRA[9]}.${cleanRA.slice(10, 13)}-${cleanRA.slice(12)}`
  }

  /**
   * Verifica se o código da Fatec é válido com base na lista oficial.
   * @param code string com 3 dígitos
   * @returns boolean
   */
  static isValidFatec(code: string): boolean {
    return validFatecCodes.has(code)
  }

  /**
   * Verifica se o RA é válido e pertence a uma Fatec reconhecida.
   * @param ra string RA bruto
   * @returns boolean
   */
  static validateRA(ra: string): boolean {
    if (!this.isValidRA(ra)) return false

    try {
      const { fatec } = this.parseRA(ra)
      return this.isValidFatec(fatec)
    } catch {
      return false
    }
  }

  /**
   * Converte o número do turno em string legível.
   * @param turno string (1, 2 ou 3)
   * @returns string
   */
  private static parseTurno(turno: string): string {
    switch (turno) {
      case '1':
        return 'Manhã'
      case '2':
        return 'Tarde'
      case '3':
        return 'Noite'
      default:
        return 'Desconhecido'
    }
  }
}
