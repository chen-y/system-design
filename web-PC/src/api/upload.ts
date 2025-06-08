import request from './utils'

export interface IFile {
  id: number
  file?: File
  url?: string
  fileName?: string
  type: string
  createdAt: string
  updatedAt: string
  userId: number
  fileFor: string
}

export const uploadToMemory = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post<CommonResult<IFile>>('/upload/memory', formData)
}

export const uploadToDB = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post<CommonResult<IFile>>('/upload/db', formData)
}

export const getFiles = () => {
  return request.post<CommonResult<IFile[]>>('/files')
}
