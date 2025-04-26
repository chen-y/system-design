import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import BaseLayout from '../layout/base-layout'
import Loading from '../components/Loading'

import { loader } from '../pages/home'
import { Path } from '@/constants/path'

function lazyLoading(Component: ReturnType<typeof lazy>) {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: Path.ROOT,
    loader: () => {
      // if (false) {
      //   return redirect('/login')
      // }
      return null
    },
    element: <BaseLayout />,
    children: [
      {
        index: true,
        loader: loader,
        element: lazyLoading(lazy(() => import('../pages/home'))),
      },
      {
        path: Path.PERMISSION,
        element: lazyLoading(lazy(() => import('../pages/permission'))),
      },
      {
        path: Path.ROLES,
        element: lazyLoading(lazy(() => import('../pages/roles'))),
      },
      {
        path: Path.USERS,
        element: lazyLoading(lazy(() => import('../pages/users'))),
      },
    ],
  },
  {
    path: Path.LOGIN,
    element: lazyLoading(lazy(() => import('../pages/login'))),
  },
  {
    path: '*',
    element: (
      <div>
        <div>404</div>
      </div>
    ),
  },
])

export default router
