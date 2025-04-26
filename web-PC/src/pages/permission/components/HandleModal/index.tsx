import { Drawer, Space, Button, Form } from 'antd'
import PermissionHandleContent, {
  PermissionFormValues,
  HandleTypes,
} from '../HandleContent'
import { useAsyncFn } from 'react-use'

export { HandleTypes }
export interface PermissionHandleModalProps {
  open?: boolean
  type?: HandleTypes
  onClose?: () => void
}

const PermissionHandleModal = (props: PermissionHandleModalProps) => {
  const { open, onClose } = props
  const [form] = Form.useForm<PermissionFormValues>()

  const [submitState, doSubmit] = useAsyncFn(
    async (params: PermissionFormValues) => {
      console.info(params)
      await new Promise((resolve) => {
        setTimeout(resolve, 2000)
      })
    }
  )

  const handleSubmit = async () => {
    const values = await form.validateFields()
    await doSubmit(values)
  }
  return (
    <Drawer
      open={open}
      title="新增权限"
      width={680}
      onClose={onClose}
      footer={
        <div className="text-right">
          <Space>
            <Button
              size="large"
              disabled={submitState.loading}
              onClick={onClose}
            >
              取消
            </Button>
            <Button
              type="primary"
              size="large"
              loading={submitState.loading}
              onClick={handleSubmit}
            >
              提交
            </Button>
          </Space>
        </div>
      }
    >
      <PermissionHandleContent form={form} />
    </Drawer>
  )
}

export default PermissionHandleModal
