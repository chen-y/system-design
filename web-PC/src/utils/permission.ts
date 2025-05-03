import { PermissionType, Permission } from '@/api/permission.d'

export const permissionTypeMap = new Map([
  [PermissionType.MENU, { name: '菜单' }],
  [PermissionType.MODULE, { name: '模块' }],
  [PermissionType.BUTTON, { name: '按钮' }],
])

export function getTreePathById(tree: Permission[], id?: number) {
  const deepEach = (nodes: Permission[]) => {
    const path: number[] = []
    for (const node of nodes) {
      if (node.id === id) {
        path.push(node.id)
        return path
      }

      if (node.subs && node.subs.length > 0) {
        const subPath = deepEach(node.subs)
        if (subPath.length > 0) {
          path.push(node.id, ...subPath)
          return path
        }
      }
    }
    return path
  }

  return deepEach(tree)
}
