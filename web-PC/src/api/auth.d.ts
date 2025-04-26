/// <reference types="./api-base" />
interface AuthEntity {
  accessToken: string
  refreshToken: string
  accessTokenExpires: number
  refreshTokenExpires: number
}
export type AuthResult = CommonResult<AuthEntity>
