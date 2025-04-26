import axios, { AxiosError, AxiosResponse, AxiosInstance } from 'axios'
import { AuthResult } from '@/api/auth.d'

import auth from '@/utils/auth'

class CustomError extends Error {
  response?: AxiosResponse
}

declare module 'axios' {
  interface AxiosRequestConfig {
    secret?: boolean
  }
}

/**
 * @example
 * ajax.get(url, { secret: false })
 */

const instance = axios.create({
  baseURL: '/api',
})

instance.interceptors.request.use(async (config) => {
  const secret = config.secret ?? true
  if (secret) {
    // 1. 检查token是否过期/存在
    if (auth.checkTokenValid()) {
      // pass
      config.headers.Authorization = `Bearer ${auth.accessToken}`
      return config
    }
    // accessToken过期
    // 2. 检查refreshToken是否过期/存在
    if (auth.checkRTokenValid()) {
      const result = await instance.post(
        '/auth/refresh',
        {
          refreshToken: auth.refreshToken,
        },
        { secret: false }
      )
      auth.setAuthResult(result.data.data)
      return config
    }
    console.info('登录出错')
    // 3. 都过期，需要重新登录
    // window.location.href = '/login'
    return Promise.reject(new CustomError('请登录'))
  }

  return config
})

instance.interceptors.response.use((response) => {
  if (response.data?.code === 0) {
    return response
  }

  const err = new CustomError(response.data?.message || '接口报错')
  err.response = response
  return Promise.reject(err)
})

export default instance
