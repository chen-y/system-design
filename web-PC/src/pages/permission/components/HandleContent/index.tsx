import { Form, FormInstance, Input, Radio, Cascader } from 'antd'

import { PermissionType, Permission } from '@/api/permission.d'
import { PropsWithChildren, useEffect, useMemo } from 'react'
import { permissionTypeMap } from '@/utils/permission'

export enum HandleTypes {
  ADD = 'add',
  EDIT = 'edit',
}

export interface PermissionFormValues {
  name: string
  type: PermissionType
  value: string
  description: string
  parent: number[]
}

export interface PermissionHandleContentProps {
  form?: FormInstance<PermissionFormValues>
  permissions?: Permission[]
}

const PermissionHandleContent = (
  props: PropsWithChildren<PermissionHandleContentProps>
) => {
  const { form: injectForm, permissions } = props
  const [form] = Form.useForm<PermissionFormValues>(injectForm)

  const parentTree = useMemo(() => {
    const genTree = (list: Permission[]): Array<any> => {
      return list.map((permission) => {
        const subs = permission.subs
        return {
          value: permission.id,
          label: permission.name,
          children: subs ? genTree(subs) : null,
          isLeaf: !subs?.length,
        }
      })
    }
    return genTree(permissions || [])
  }, [permissions])

  const permissionTypes = Array.from(permissionTypeMap.entries())

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
            {permissionTypes.map(([type, entity]) => (
              <Radio key={type} value={type}>
                {entity.name}
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
          <Cascader changeOnSelect placeholder="/a/b/c" options={parentTree} />
        </Form.Item>
        <Form.Item label="权限描述" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default PermissionHandleContent
