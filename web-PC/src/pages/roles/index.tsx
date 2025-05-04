import { getRoleList, removeRole } from '@/api/role'
import AppPage from '@/components/AppPage'
import { Button, Modal, Space, Table, TableColumnProps } from 'antd'
import { useEffect, useState } from 'react'
import { useAsyncFn } from 'react-use'
import HandleModal, { HandleTypes } from './components/handleModal'
import { Role } from '@/api/role.d'

const RolesPage = () => {
  const [handleState, setHandleState] = useState<{
    open: boolean
    target: Role | null
    type: HandleTypes
  }>({
    open: false,
    target: null,
    type: HandleTypes.ADD,
  })
  const [getState, doGet] = useAsyncFn(async () => {
    const result = await getRoleList()
    return result?.data?.data
  })

  useEffect(() => {
    doGet()
  }, [])

  const handleAdd = () => {
    setHandleState({
      open: true,
      target: null,
      type: HandleTypes.ADD,
    })
  }

  const handleEdit = (role: Role) => {
    setHandleState({
      open: true,
      target: role,
      type: HandleTypes.EDIT,
    })
  }

  const handleRemove = (role: Role) => {
    Modal.confirm({
      title: '删除角色',
      content: `是否删除角色${role.name}`,
      okText: '删除',
      okType: 'danger',
      onOk: async () => {
        await removeRole(role.id)
        handleSuccess()
      },
      onCancel: () => {
        console.info('cancel')
      },
    })
  }

  const handleClose = () => {
    setHandleState({
      open: false,
      target: null,
      type: HandleTypes.ADD,
    })
  }

  const handleSuccess = () => {
    doGet()
    handleClose()
  }
  const columns: TableColumnProps<Role>[] = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: '权限',
      key: 'permissions',
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record: Role) => {
        return (
          <Space>
            <Button type="text" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type="text" onClick={() => handleRemove(record)}>
              删除
            </Button>
          </Space>
        )
      },
    },
  ]
  return (
    <AppPage>
      <Space direction="vertical" className="w-full">
        <div className="flex justify-end">
          <Button type="primary" onClick={handleAdd}>
            新增角色
          </Button>
        </div>
        <div>
          <Table
            columns={columns}
            loading={getState.loading}
            dataSource={getState.value || []}
          />
        </div>
      </Space>

      <HandleModal
        open={handleState.open}
        target={handleState.target || undefined}
        type={handleState.type}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </AppPage>
  )
}

export default RolesPage
