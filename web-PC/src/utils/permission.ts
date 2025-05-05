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

type TreeArray = Array<number[]>
export function getUniqueIdsByTreeArray(tree: TreeArray) {
  const uniqueIds = new Set<number>()
  const each = (arr: Array<number[] | number>) => {
    for (const item of arr) {
      if (Array.isArray(item)) {
        each(item)
      } else {
        uniqueIds.add(item)
      }
    }
  }
  each(tree)
  return Array.from(uniqueIds)
}

export function getPermissionNamesByTree(tree: Permission[]) {
  const names: string[] = []
  const deepEach = (nodes: Permission[], path: string[]) => {
    for (const node of nodes) {
      if (node.subs?.length) {
        deepEach(node.subs, [...path, node.name])
      } else {
        names.push([...path, node.name].join('/'))
      }
    }
  }
  deepEach(tree, [])
  return names
}
