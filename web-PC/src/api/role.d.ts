export interface Role {
  id: number
  name: string
  description: string
  permissionIds: string[]
  userId: number
  createdAt: string
  updatedAt: string
}

export type GetRolesRes = CommonResult<Role[]>

export type CreateRoleReq = Omit<Role, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateRoleReq = Omit<Role, 'createdAt' | 'updatedAt'>
