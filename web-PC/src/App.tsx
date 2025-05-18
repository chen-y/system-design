import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ConfigProvider } from 'antd'
import './App.css'
import auth from './utils/auth'
import websocket from './utils/websocket'
import { useEffect } from 'react'

if (!auth.check()) {
  auth.reLogin()
}

function App() {
  useEffect(() => {
    websocket.onConnect({
      uid: auth.accessToken || '',
    })
  }, [])
  return (
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
