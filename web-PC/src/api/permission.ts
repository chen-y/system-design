import { PermissionListResult } from './permission.d'
import request from './utils'
// import { CommonResult } from './api-base.d'

export const getPermissionList = () => {
  return request.get<PermissionListResult>('/api/permission')
}
