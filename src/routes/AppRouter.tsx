import React, { lazy, Suspense, useMemo } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { ROUTE_PATH } from '../constants/routing'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import RouterError from '@/components/RouterError'

interface IProctedRoute {
  children: React.ReactNode,
  requireAuth: boolean
}

const Home = lazy(() => import('../pages/home'))
const Login = lazy(() => import('../pages/login'))
const GameDetail = lazy(() => import('../pages/game/detail'))
const GameList = lazy(() => import('../pages/game-list'))

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
    requireAuth: true,
  },
  {
    path: ROUTE_PATH.GAME.DETAIL,
    layout: MainLayout,
    component: GameDetail,
    requireAuth: true,
  },
  {
    path: ROUTE_PATH.GAME.LIST,
    layout: MainLayout,
    component: GameList,
    requireAuth: true,
  },
]

const ProtectedRoute = ({ children, requireAuth }: IProctedRoute) => {
  const isAuthenticated = localStorage.getItem('accessToken')
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const createAppRouter = () =>
  createBrowserRouter(
    routesConfig.map(({ path, layout: Layout, component: Component, requireAuth = false }) => ({
      path,
      errorElement: <RouterError />,
      element: (
        <ProtectedRoute requireAuth={requireAuth}>
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
