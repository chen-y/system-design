import { Drawer, Form, Space, Button } from 'antd'
import HandleContent, { HandleTypes } from '../HandleContent'
import { User } from '@/api/user'
import { useAsyncFn } from 'react-use'
import { addUser, updateUser } from '@/api/user'
import { useEffect } from 'react'
import { getRoleList } from '@/api/role'

export { HandleTypes }

interface HandleModalProps {
  type: HandleTypes
  open: boolean
  target?: User
  onCancel: () => void
  onSuccess: () => void
}

const HandleModal = (props: HandleModalProps) => {
  const { type, open, target, onCancel, onSuccess } = props
  const [form] = Form.useForm()

  useEffect(() => {
    if (!open) {
      form.resetFields()
    }
  }, [open])

  useEffect(() => {
    if (open && type === HandleTypes?.EDIT && target) {
      form.setFieldsValue({
        name: target.name,
        email: target.email,
        password: target.password,
        roles: target.roles,
      })
    }
  }, [target, open, type])

  const [submitState, doSubmit] = useAsyncFn(async () => {
    const values = await form.validateFields()

    if (type === HandleTypes?.ADD) {
      await addUser(values)
    } else {
      await updateUser({
        ...values,
        id: target?.id,
      })
    }
    onSuccess?.()
  }, [type, target])
  return (
    <Drawer
      open={open}
      onClose={onCancel}
      width={'50%'}
      title={type === HandleTypes?.ADD ? '新增用户' : '修改用户信息'}
      footer={
        <div className="text-right">
          <Space>
            <Button onClick={onCancel} disabled={submitState.loading}>
              取消
            </Button>
            <Button
              type="primary"
              loading={submitState.loading}
              onClick={doSubmit}
            >
              确定
            </Button>
          </Space>
        </div>
      }
    >
      <HandleContent form={form} type={type} />
    </Drawer>
  )
}
export default HandleModal
