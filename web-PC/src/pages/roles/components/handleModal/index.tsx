import { Drawer, Space, Button, Form } from 'antd'
import HandleContent, { HandleTypes } from '../handleContent'
import { Role } from '@/api/role.d'
import { useAsyncFn } from 'react-use'
import { createRole, updateCreate } from '@/api/role'
import { useEffect } from 'react'
import { getUniqueIdsByTreeArray } from '@/utils/permission'

export { HandleTypes }

export interface HandleModalProps {
  open?: boolean
  target?: Role
  type: HandleTypes
  onClose?: () => void
  onSuccess?: () => void
}

const HandleModal = (props: HandleModalProps) => {
  const { open = false, type, target, onClose, onSuccess } = props
  const [form] = Form.useForm()

  const [submitState, doSubmit] = useAsyncFn(async () => {
    const { permissions, ...other } = await form.validateFields()

    let permissionIds
    if (permissions) {
      permissionIds = getUniqueIdsByTreeArray(permissions)
    }

    const params = {
      ...other,
      permissionIds,
    }

    if (type === HandleTypes.ADD) {
      await createRole(params)
    }

    if (type === HandleTypes.EDIT) {
      await updateCreate({
        ...params,
        id: target?.id,
      })
    }

    onSuccess?.()
  }, [type])

  useEffect(() => {
    if (!open) {
      form.resetFields()
    }
  }, [open])

  useEffect(() => {
    if (open && type === HandleTypes.EDIT) {
      form.setFieldsValue({
        name: target?.name,
        description: target?.description,
      })
    }
  }, [open, target, type])

  const title = target ? '编辑角色' : '新增角色'
  return (
    <Drawer
      open={open}
      title={title}
      width={'50%'}
      onClose={onClose}
      footer={
        <div className="text-right">
          <Space>
            <Button disabled={submitState.loading}>取消</Button>
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
