import { AuthResult } from './auth.d'
import request from './utils'

export interface LoginRequestData {
  account: string
  password: string
}

export const login = (data: LoginRequestData) => {
  return request.post<AuthResult>('/auth/login', data, { secret: false })
}
