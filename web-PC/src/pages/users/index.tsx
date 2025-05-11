import AppPage from '@/components/AppPage'
import { Button, Modal, Space, Table, TableColumnProps } from 'antd'
import HandleModal, { HandleTypes } from './components/HandleModal'
import { useEffect, useState } from 'react'
import { deleteUser, User, getUserList } from '@/api/user'
import { useAsyncFn } from 'react-use'

const UserPage = () => {
  const [handleState, setHandleState] = useState<{
    open: boolean
    target?: User
    type: HandleTypes
  }>({
    open: false,
    type: HandleTypes.ADD,
  })

  const [getState, doGet] = useAsyncFn(async () => {
    const result = await getUserList()
    return result.data?.data || []
  })

  useEffect(() => {
    doGet()
  }, [])

  const handleAdd = () => {
    setHandleState({
      open: true,
      type: HandleTypes.ADD,
    })
  }

  const handleEdit = (user: User) => {
    setHandleState({
      open: true,
      target: user,
      type: HandleTypes.EDIT,
    })
  }

  const handleDelete = (user: User) => {
    Modal.confirm({
      title: '删除用户',
      content: `是否删除用户${user.name}`,
      okText: '删除',
      okType: 'danger',
      onOk: async () => {
        await deleteUser(user.id!)
      },
    })
  }

  const handleClose = () => {
    setHandleState({
      open: false,
      type: HandleTypes.ADD,
    })
  }
  const columns: TableColumnProps<User>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
    },
    {
      title: '操作',
      dataIndex: 'action',
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
            新增用户
          </Button>
        </div>
        <div>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={getState.value || []}
            loading={getState.loading}
          />
        </div>
      </Space>

      <HandleModal
        open={handleState.open}
        type={handleState.type}
        target={handleState.target}
        onCancel={handleClose}
        onSuccess={async () => {
          await doGet()
          handleClose()
        }}
      />
    </AppPage>
  )
}

export default UserPage
