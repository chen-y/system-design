export interface Role {
  id: number
  name: string
  description: string
  permissionIds?: string[] // 权限id数组，提交时使用
  permissions?: Permission[] // 权限树，获取时使用
  userId: number
  createdAt: string
  updatedAt: string
}

export type GetRolesRes = CommonResult<Role[]>

export type CreateRoleReq = Omit<Role, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateRoleReq = Omit<Role, 'createdAt' | 'updatedAt'>
