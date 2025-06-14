export class AuthTokenError extends Error {
  status: number

  constructor(message?: string, status: number = 401) {
    super(message || 'Erro de autenticação')
    this.status = status
  }
}

export enum ErrorMessages {
  TOKEN_EXPIRED = 'token-expired',
  SERVICE_UNAVAILABLE = 'service-unavailable',
  UNAUTHORIZED = 'unauthorized'
}
