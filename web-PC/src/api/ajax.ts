import axios from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    secret?: boolean
    showErrorTips?: boolean
  }
}

/**
 * @example
 * ajax.get(url, { secret: false })
 */

const instance = axios.create({
  baseURL: '/api',
})

export default instance
