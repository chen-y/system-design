import { Menu } from 'antd'
import { Path } from '@/constants/path'
import { useNavigate, matchPath, useMatches } from 'react-router'
import { useEffect, useMemo } from 'react'
const AppMenu = () => {
  const navigate = useNavigate()
  const matches = useMatches()

  const selectKeys = useMemo(() => {
    return matches?.map((item) => {
      const { pathname } = item
      return pathname
    })
  }, [matches])

  return (
    <div>
      <Menu
        selectedKeys={selectKeys}
        onSelect={({ keyPath }) => {
          // console.info(selectKeys, keyPath)
          if (keyPath) {
            navigate(keyPath[0])
          }
        }}
        items={[
          {
            key: Path.PERMISSION,
            label: '页面权限',
          },
          {
            key: Path.ROLES,
            label: '角色管理',
          },
          {
            key: Path.USERS,
            label: '用户管理',
          },
          {
            key: Path.UPLOAD,
            label: '文件上传',
          },
        ]}
      />
    </div>
  )
}

export default AppMenu
