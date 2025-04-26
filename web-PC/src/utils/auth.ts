import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  R_EXPIRES_TIME_KEY,
  EXPIRES_TIME_KEY,
} from '@/constants/auth'
import storage from './storage'
import { AuthEntity } from '@/api/auth.d'

class AuthField {
  accessToken?: string
  refreshToken?: string
  accessTokenExpires?: number
  refreshTokenExpires?: number
}

class Auth extends AuthField {
  constructor() {
    super()
    const cachedToken = storage.getOriginItem(ACCESS_TOKEN_KEY)
    const cachedRefreshToken = storage.getOriginItem(REFRESH_TOKEN_KEY)
    const cachedExpires = storage.getOriginItem(EXPIRES_TIME_KEY)
    const cachedRefreshExpires = storage.getOriginItem(R_EXPIRES_TIME_KEY)
    this.accessToken = cachedToken || undefined
    this.refreshToken = cachedRefreshToken || undefined
    this.accessTokenExpires = cachedExpires ? Number(cachedExpires) : undefined
    this.refreshTokenExpires = cachedRefreshExpires
      ? Number(cachedRefreshExpires)
      : undefined
  }

  check() {
    const isValid = this.checkTokenValid() && this.checkRTokenValid()
    return isValid
  }

  checkTokenValid() {
    // token是否存在
    if (this.accessToken) {
      if (this.accessTokenExpires && this.accessTokenExpires > Date.now()) {
        return true
      }
      return false
    }
    return false
  }

  checkRTokenValid() {
    if (this.refreshToken) {
      if (this.refreshTokenExpires && this.refreshTokenExpires > Date.now()) {
        return true
      }
      return false
    }
    return false
  }

  setAuthResult(result: AuthEntity) {
    this.accessToken = result.accessToken
    this.refreshToken = result.refreshToken
    this.accessTokenExpires = result.accessTokenExpires
    this.refreshTokenExpires = result.refreshTokenExpires
    storage.setOriginItem(ACCESS_TOKEN_KEY, result.accessToken)
    storage.setOriginItem(REFRESH_TOKEN_KEY, result.refreshToken)
    storage.setOriginItem(
      EXPIRES_TIME_KEY,
      result.accessTokenExpires.toString()
    )
    storage.setOriginItem(
      R_EXPIRES_TIME_KEY,
      result.refreshTokenExpires.toString()
    )
  }

  logout() {
    this.accessToken = undefined
    this.refreshToken = undefined
    this.accessTokenExpires = undefined
    this.refreshTokenExpires = undefined
    storage.clearItem(ACCESS_TOKEN_KEY)
    storage.clearItem(REFRESH_TOKEN_KEY)
    storage.clearItem(EXPIRES_TIME_KEY)
    storage.clearItem(R_EXPIRES_TIME_KEY)
    window.location.href = '/login'
  }
}

export default new Auth()
