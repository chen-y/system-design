import { Outlet } from 'react-router'
import ErrorBoundary from './error-boundary'
import { Layout } from 'antd'
import AppHeader from '@/components/AppHeader'
import AppMenu from '@/components/AppMenu'

const { Content, Header, Sider } = Layout

const BaseLayout = () => {
  return (
    <Layout className="h-full">
      <Header>
        <AppHeader />
      </Header>
      <Layout>
        <Sider>
          <AppMenu />
        </Sider>
        <Content>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  )
}

export default BaseLayout
