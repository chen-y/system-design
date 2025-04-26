import { AxiosResponse } from 'axios'
import request from './ajax'

import auth from '@/utils/auth'

class CustomError extends Error {
  response?: AxiosResponse
}

request.interceptors.request.use(async (config) => {
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
      await auth.reLogin()
      return config
    }
    console.info('登录出错')
    // 3. 都过期，需要重新登录
    // window.location.href = '/login'
    return Promise.reject(new CustomError('请登录'))
  }

  return config
})

request.interceptors.response.use((response) => {
  if (response.data?.code === 0) {
    return response
  }

  const err = new CustomError(response.data?.message || '接口报错')
  err.response = response
  return Promise.reject(err)
})

export default request
