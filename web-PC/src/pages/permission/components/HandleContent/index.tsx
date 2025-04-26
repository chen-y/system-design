import { Form, FormInstance, Input, Radio, Cascader } from 'antd'

import { PermissionType } from '@/api/permission.d'
import { PropsWithChildren } from 'react'

export enum HandleTypes {
  ADD = 'add',
  EDIT = 'edit',
}

export interface PermissionFormValues {
  name: string
  type: PermissionType
  value: string
  description: string
  parent: string[]
}

interface PermissionHandleContentProps {
  form?: FormInstance<PermissionFormValues>
}

const PermissionHandleContent = (
  props: PropsWithChildren<PermissionHandleContentProps>
) => {
  const { form: injectForm } = props
  const [form] = Form.useForm<PermissionFormValues>(injectForm)

  const permissionTypes = [
    {
      label: '菜单',
      value: PermissionType.MENU,
    },
    {
      label: '模块',
      value: PermissionType.MODULE,
    },
    {
      label: '按钮',
      value: PermissionType.BUTTON,
    },
  ]
  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        initialValues={{
          type: PermissionType.MENU,
        }}
      >
        <Form.Item
          label="权限名称"
          name="name"
          rules={[{ required: true, message: '请填写' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="权限类型"
          name="type"
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
        >
          <Radio.Group>
            {permissionTypes.map((item) => (
              <Radio key={item.value} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="权限值"
          name="value"
          rules={[
            {
              required: true,
              message: '请填写',
            },
          ]}
        >
          <Input placeholder="/route1 | btn-save" />
        </Form.Item>
        <Form.Item label="上级" name="parent">
          <Cascader
            placeholder="/a/b/c"
            options={[
              {
                value: 'zh-CN',
                label: '中文',
              },
              {
                value: 'en-US',
                label: '英文',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="权限描述" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default PermissionHandleContent
