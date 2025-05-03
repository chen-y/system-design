import { Permission as PermissionData } from '@/api/permission.d'
import { Table, TableColumnProps, Button, Space, Modal } from 'antd'
import AppPage from '@/components/AppPage'
import PermissionHandleModal, { HandleTypes } from './components/HandleModal'
import { useAsyncFn } from 'react-use'
import { useEffect, useState } from 'react'
import { getPermissionTree, removePermission } from '@/api/permission'
import { permissionTypeMap } from '@/utils/permission'

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
    const result = await getPermissionTree()
    return result?.data?.data
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

  const handleSuccess = () => {
    doGetPermissions()
    handleCloseHandleModal()
  }

  const handleEdit = (record: PermissionData) => {
    setHandleState({
      open: true,
      type: HandleTypes.EDIT,
      target: record,
    })
  }

  const handleDelete = (record: PermissionData) => {
    Modal.confirm({
      title: '删除权限',
      content: '确定删除该权限吗？',
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk: async () => {
        await removePermission(record.id)
        await doGetPermissions()
      },
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
      render: (type) => {
        return permissionTypeMap.get(type)?.name
      },
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
        <Space>
          <Button type="text" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="text" onClick={() => handleDelete(record)}>
            删除
          </Button>
        </Space>
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
          <Table
            rowKey={(p) => p.id}
            columns={columns}
            loading={getState.loading}
            childrenColumnName="subs"
            dataSource={getState.value || []}
          />
        </div>
      </Space>

      <PermissionHandleModal
        open={handleState.open}
        type={handleState.type}
        editTarget={handleState.target}
        permissions={getState.value || []}
        onClose={handleCloseHandleModal}
        onSuccess={handleSuccess}
      />
    </AppPage>
  )
}
export default Permission
