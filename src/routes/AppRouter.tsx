import React, { lazy, Suspense, useMemo } from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { ROUTE_PATH } from '../constants/routing'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import RouterError from '@/components/RouterError'
import ProtectedRoute from './ProtectedRoute'

interface ILayoutProps {
  children: React.ReactNode;
}
interface IRoutesConfig {
  path: string,
  layout: React.ComponentType<ILayoutProps>,
  component: React.ComponentType<any>,
  requireAuth?: boolean,
  requiredPermission?: string,
}


const Home = lazy(() => import('../pages/home'))
const Login = lazy(() => import('../pages/login'))
const GameDetail = lazy(() => import('../pages/game-detail'))
const GameList = lazy(() => import('../pages/game-list'))
const CreateGame = lazy(() => import('../pages/create-game'))


const routesConfig = [
  {
    path: ROUTE_PATH.LOGIN,
    layout: AuthLayout,
    component: Login,
    requireAuth: false,
  },
  {
    path: ROUTE_PATH.HOME,
    layout: MainLayout,
    component: Home,
  },
  {
    path: ROUTE_PATH.GAME_DETAIL,
    layout: MainLayout,
    component: GameDetail,
  },
  {
    path: ROUTE_PATH.GAME,
    layout: MainLayout,
    component: GameList,
  },
  {
    path: ROUTE_PATH.GAME_MANAGEMENT.CREATE_GAME,
    layout: MainLayout,
    component: CreateGame,
  },
]

const createAppRouter = () =>
  createHashRouter(
    routesConfig.map(({ path, layout: Layout, component: Component, requireAuth = true, requiredPermission }: IRoutesConfig) => ({
      path,
      errorElement: <RouterError />,
      element: (
        <ProtectedRoute requireAuth={requireAuth} requiredPermission={requiredPermission}>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          </Layout>
        </ProtectedRoute>
      ),
    }))
  )


export function AppRouter() {
  const router = useMemo(() => createAppRouter(), [])

  return <RouterProvider router={router} />
}
