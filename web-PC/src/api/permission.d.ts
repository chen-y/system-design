export enum PermissionType {
  MENU = 'menu',
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
  subs?: Permission[]
}
