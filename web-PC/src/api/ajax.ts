import axios, { AxiosResponse } from 'axios'

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

export default instance
