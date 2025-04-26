import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ConfigProvider } from 'antd'
import './App.css'
import auth from './utils/auth'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    console.info(!auth.check())
    if (!auth.check()) {
      router.navigate({
        pathname: '/login',
      })
    }
  }, [])
  return (
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
