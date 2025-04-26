import { Form, Button, Input, theme } from 'antd'
import { useAsyncFn } from 'react-use'
import { login } from '@/api/auth'
import auth from '@/utils/auth'
import { useNavigate, Navigate } from 'react-router'

const { Item: FormItem } = Form

interface FormValues {
  account?: string
  password?: string
}

const Login = () => {
  const [form] = Form.useForm()
  const { token } = theme.useToken()
  const navigate = useNavigate()

  const [submitState, submit] = useAsyncFn(async (values: FormValues) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })

    const result = await login(values as Required<FormValues>)
    // console.info(result.data.data)
    if (result.data?.data) {
      auth.setAuthResult(result.data.data)
      // window.location.href = '/'
      navigate({ pathname: '/' }, { replace: true })
    }
  })

  if (auth.check()) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <div className="h-full bg-gray-200 relative overflow-auto">
      <div className="absolute top-1/2 left-1/2 w-3md bg-white  -translate-1/2 rounded-xl overflow-hidden">
        <div
          className="text-2xl p-3 text-center"
          style={{
            background: token.colorPrimary,
            color: token.colorBgBase,
          }}
        >
          请登录
        </div>
        <div className="p-6">
          <Form size="large" form={form} onFinish={submit}>
            <FormItem
              label="账户"
              name="account"
              rules={[{ required: true, message: '请输入账户' }]}
            >
              <Input />
            </FormItem>
            <FormItem
              label="密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '最少6个字符' },
              ]}
            >
              <Input.Password />
            </FormItem>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={submitState.loading}
            >
              登录
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
