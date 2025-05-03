import {
  PermissionListResult,
  CreatePermissionRequest,
  CreatePermissionResult,
  RemovePermissionResult,
} from './permission.d'
import request from './utils'
// import { CommonResult } from './api-base.d'

export const getPermissionList = () => {
  return request.post<PermissionListResult>('/permission/list')
}

export const getPermissionTree = () => {
  return request.post<PermissionListResult>('/permission/tree')
}

export const createPermission = (data: CreatePermissionRequest) => {
  return request.post<CreatePermissionResult>('/permission/create', data)
}

export const removePermission = (id: number) => {
  return request.post<RemovePermissionResult>('/permission/delete', { id })
}
