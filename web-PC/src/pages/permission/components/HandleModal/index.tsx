import { Drawer, Space, Button } from 'antd'
import PermissionHandleContent from '../HandleContent'
const PermissionHandleModal = () => {
  return (
    <Drawer
      open={true}
      title="新增权限"
      footer={
        <div className="text-right">
          <Space>
            <Button size="large">取消</Button>
            <Button type="primary" size="large">
              提交
            </Button>
          </Space>
        </div>
      }
    >
      <PermissionHandleContent />
    </Drawer>
  )
}

export default PermissionHandleModal
