import AppPage from '@/components/AppPage'
import { Button, Space, Table, TableColumnProps } from 'antd'

const RolesPage = () => {
  const columns: TableColumnProps[] = [
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
    },
  ]
  return (
    <AppPage>
      <Space direction="vertical" className="w-full">
        <div className="flex justify-end">
          <Button>新增角色</Button>
        </div>
        <div>
          <Table columns={columns} />
        </div>
      </Space>
    </AppPage>
  )
}

export default RolesPage
