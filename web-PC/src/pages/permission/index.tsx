import { Permission as PermissionData } from '@/api/permission.d'
import { Table, TableColumnProps, Button, Space } from 'antd'
import AppPage from '@/components/AppPage'
import PermissionHandleModal, { HandleTypes } from './components/HandleModal'
import { useAsyncFn } from 'react-use'
import { useEffect, useState } from 'react'
import { getPermissionList } from '@/api/permission'

const Permission = () => {
  const [handleState, setHandleState] = useState<{
    open: boolean
    type: HandleTypes
    target?: PermissionData
  }>({ open: false, type: HandleTypes.ADD })
  const [getState, doGetPermissions] = useAsyncFn(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
    await getPermissionList()
  })

  useEffect(() => {
    doGetPermissions()
  }, [])

  const handleAdd = () => {
    setHandleState({
      open: true,
      type: HandleTypes.ADD,
    })
  }

  const handleCloseHandleModal = () => {
    setHandleState({
      open: false,
      type: HandleTypes.ADD,
    })
  }
  const columns: TableColumnProps<PermissionData>[] = [
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '权限类型',
      dataIndex: 'type',
      key: 'value',
    },
    {
      title: '权限值',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: '权限描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <span>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </span>
      ),
    },
  ]
  return (
    <AppPage>
      <Space direction="vertical" className="w-full">
        <div className="flex justify-end">
          <Button type="primary" onClick={handleAdd}>
            新增权限
          </Button>
        </div>
        <div>
          <Table columns={columns} loading={getState.loading} />
        </div>
      </Space>

      <PermissionHandleModal
        open={handleState.open}
        type={handleState.type}
        onClose={handleCloseHandleModal}
      />
    </AppPage>
  )
}
export default Permission
