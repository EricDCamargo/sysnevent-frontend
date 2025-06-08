export class AuthTokenError extends Error {
  constructor() {
    super('Error with AuthToken')
  }
}

export enum ErrorMessages {
  TOKEN_EXPIRED = 'token-expired',
  SERVICE_UNAVAILABLE = 'service-unavailable',
  UNAUTHORIZED = 'unauthorized'
}
