import { Drawer, Space, Button, Form } from 'antd'
import PermissionHandleContent, {
  PermissionFormValues,
  HandleTypes,
  PermissionHandleContentProps,
} from '../HandleContent'
import { useAsyncFn } from 'react-use'
import { createPermission } from '@/api/permission'
import { useEffect } from 'react'
import { Permission } from '@/api/permission.d'
import { getTreePathById } from '@/utils/permission'

export { HandleTypes }
export interface PermissionHandleModalProps
  extends Pick<PermissionHandleContentProps, 'permissions'> {
  open?: boolean
  type?: HandleTypes
  editTarget?: Permission
  onClose?: () => void
  onSuccess?: () => void
}

const PermissionHandleModal = (props: PermissionHandleModalProps) => {
  const { open, permissions, editTarget, onClose, onSuccess } = props
  const [form] = Form.useForm<PermissionFormValues>()

  useEffect(() => {
    if (!open) {
      form.resetFields()
    }
  }, [open])

  useEffect(() => {
    if (open) {
      const parentPath = getTreePathById(
        permissions || [],
        editTarget?.parentId
      )
      console.info(parentPath)
      form.setFieldsValue({
        name: editTarget?.name,
        type: editTarget?.type,
        value: editTarget?.value,
        description: editTarget?.description,
        parent: parentPath,
      })
    }
  }, [open, permissions])

  const [submitState, doSubmit] = useAsyncFn(
    async (params: PermissionFormValues) => {
      console.info(params)
      const { parent, ...mainData } = params
      await new Promise((resolve) => {
        setTimeout(resolve, 2000)
      })
      await createPermission({
        ...mainData,
        parentId: parent ? parent[parent.length - 1] : undefined,
      })
      onSuccess?.()
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
      destroyOnClose={true}
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
      <PermissionHandleContent form={form} permissions={permissions} />
    </Drawer>
  )
}

export default PermissionHandleModal
