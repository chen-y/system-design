import { AxiosError, AxiosResponse } from 'axios'
import request from './ajax'
import { message } from 'antd'

import auth from '@/utils/auth'

class CustomError extends Error {
  response?: AxiosResponse
}

function handleErrorMassage(err: CustomError) {
  const showErrorTips = err.response?.config?.showErrorTips ?? true
  if (showErrorTips) {
    message.error(err.message || '接口报错')
  }
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

request.interceptors.response.use(
  (response) => {
    if (response.data?.code === 0) {
      return response
    }

    const err = new CustomError(response.data?.data?.message || '接口报错')
    err.response = response
    handleErrorMassage(err)
    return Promise.reject(err)
  },
  (err: AxiosError) => {
    const newErr = new CustomError(err.message || '接口报错')
    newErr.response = err.response
    handleErrorMassage(newErr)
    return Promise.reject(newErr)
  }
)
export default request
