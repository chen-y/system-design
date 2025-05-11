import { getRoleList } from '@/api/role'
import { Form, FormInstance, Input, Select } from 'antd'
import { useEffect } from 'react'
import { useAsyncFn } from 'react-use'

export enum HandleTypes {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

interface HandleContentProps {
  form: FormInstance
  type: HandleTypes
}

const HandleContent = (props: HandleContentProps) => {
  const { form, type } = props
  const [internalForm] = Form.useForm(form)

  const [{ value: roleList }, doGetRoleList] = useAsyncFn(async () => {
    const result = await getRoleList()
    return result?.data?.data || []
  })

  useEffect(() => {
    doGetRoleList()
  }, [])
  return (
    <Form form={internalForm} labelCol={{ span: 4 }}>
      <Form.Item
        name="name"
        label="账号名称"
        rules={[{ required: true, message: '请填写' }]}
      >
        <Input placeholder="请输入账号名称" />
      </Form.Item>
      <Form.Item
        name="email"
        label="账号邮箱"
        rules={[{ required: true, message: '请填写' }]}
      >
        <Input placeholder="请输入用户邮箱" />
      </Form.Item>
      <Form.Item
        name="password"
        label="账号密码"
        rules={[{ required: type === HandleTypes.ADD, message: '请填写' }]}
      >
        <Input placeholder="请输入用户密码" />
      </Form.Item>
      <Form.Item name="roles" label="账号角色">
        <Select placeholder="请选择" mode="multiple">
          {roleList?.map((role) => {
            return (
              <Select.Option key={role.id} value={role.id}>
                {role.name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
    </Form>
  )
}

export default HandleContent
