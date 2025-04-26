import { Permission as PermissionData } from '@/api/permission.d'
import { Table, TableColumnProps, Button, Space } from 'antd'
import AppPage from '@/components/AppPage'
import PermissionHandleModal from './components/HandleModal'

const Permission = () => {
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
          <Button type="primary">新增权限</Button>
        </div>
        <div>
          <Table columns={columns} />
        </div>
      </Space>

      <PermissionHandleModal />
    </AppPage>
  )
}
export default Permission
