export enum PermissionType {
  MENU = 'menu',
  MODULE = 'module',
  BUTTON = 'button',
}

export interface Permission {
  id: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
  value: string
  type: PermissionType
  parentId?: number
  subs?: Permission[]
}

export type PermissionListResult = CommonResult<Permission[]>
