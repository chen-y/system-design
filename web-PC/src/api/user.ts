import { Role } from './role.d'
import request from './utils'

export interface User {
  id?: string
  name: string
  email: string
  createdAt?: string
  updatedAt?: string
  password?: string
  roles?: Role[]
}

type AddUserRes = CommonResult<boolean>
type DeleteUserRes = CommonResult<boolean>
type UpdateUserRes = CommonResult<boolean>
type GetUserListRes = CommonResult<User[]>

export const addUser = (data: User) => {
  return request.post<AddUserRes>('/user/create', data)
}

export const getUserList = () => {
  return request.post<GetUserListRes>('/user/list')
}

export const deleteUser = (id: string) => {
  return request.post<DeleteUserRes>(`/user/delete`, { id })
}
export const updateUser = (data: User) => {
  return request.post<UpdateUserRes>(`/user/update`, data)
}
