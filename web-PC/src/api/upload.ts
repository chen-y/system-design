import request from './utils'

export const uploadToMemory = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post('/upload/memory', formData)
}
