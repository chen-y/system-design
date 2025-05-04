import { Permission } from '@/api/permission.d'
import { getPermissionTree } from '@/api/permission'
import { Form, FormInstance, Input, Cascader } from 'antd'
import { useEffect, useState, useMemo } from 'react'

export enum HandleTypes {
  ADD = 'add',
  EDIT = 'edit',
}

export interface HandleContentProps {
  form: FormInstance
  type: HandleTypes
}

const HandleContent = (props: HandleContentProps) => {
  const [form] = Form.useForm(props.form)
  const [permissions, setPermissions] = useState<Permission[]>([])

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

  useEffect(() => {
    getPermissionTree().then((res) => {
      setPermissions(res?.data?.data)
    })
  }, [])
  return (
    <Form form={form} labelCol={{ span: 4 }}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: '请输入' }]}
        label="角色名称"
      >
        <Input placeholder="请输入角色名称" maxLength={24} />
      </Form.Item>
      <Form.Item name="description" label="描述">
        <Input.TextArea rows={3} placeholder="请输入描述" maxLength={24} />
      </Form.Item>
      <Form.Item name="permissions" label="权限">
        <Cascader options={parentTree} multiple></Cascader>
      </Form.Item>
    </Form>
  )
}

export default HandleContent
