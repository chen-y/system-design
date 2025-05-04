import request from './utils'
import { GetRolesRes, CreateRoleReq, UpdateRoleReq } from './role.d'

export const getRoleList = () => {
  return request.post<GetRolesRes>('/role/list')
}

export const createRole = (data: CreateRoleReq) => {
  return request.post('/role/create', data)
}

export const updateCreate = (data: UpdateRoleReq) => {
  return request.post('/role/update', data)
}

export const removeRole = (id: number) => {
  return request.post('/role/delete', { id })
}
