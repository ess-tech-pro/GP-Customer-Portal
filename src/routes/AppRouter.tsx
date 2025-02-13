import React, { lazy, Suspense, useMemo } from 'react'
import { RouterProvider, Navigate, createHashRouter } from 'react-router-dom'
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
const GameDetail = lazy(() => import('../pages/game-detail'))
const GameList = lazy(() => import('../pages/game-list'))
const CreateRegisterGame = lazy(() => import('../pages/create-edit-register-game'))
const RegisterGameList = lazy(() => import('../pages/register-game-list'))
const ManagementUserList = lazy(() => import('../pages/management-user/user-list'))
const ManagementUserCreate = lazy(() => import('../pages/management-user/create-edit-user'))
const ManagementUserEdit = lazy(() => import('../pages/management-user/create-edit-user'))
const ManagementUserDetail = lazy(() => import('../pages/management-user/user-detail'))
const ManagementOrganizationList = lazy(() => import('../pages/management-organization/organization-list'))
const ManagementOrganizationCreate = lazy(() => import('../pages/management-organization/create-edit-organization'))

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
    path: ROUTE_PATH.GAME_DETAIL,
    layout: MainLayout,
    component: GameDetail,
    requireAuth: true,
  },
  {
    path: ROUTE_PATH.GAME,
    layout: MainLayout,
    component: GameList,
    requireAuth: true,
  },
  {
    path: ROUTE_PATH.GAME_MANAGEMENT.CREATE_REGISTER_GAME,
    layout: MainLayout,
    component: CreateRegisterGame,
    requireAuth: true,
  },
  {
    path: ROUTE_PATH.GAME_MANAGEMENT.REGISTER_GAME_LIST,
    layout: MainLayout,
    component: RegisterGameList,
    requireAuth: true,
  },
  {
    path: ROUTE_PATH.MANAGEMENT_USER,
    layout: MainLayout,
    component: ManagementUserList,
    requireAuth: true,
  },
  {
    path: ROUTE_PATH.MANAGEMENT_USER_CREATE,
    layout: MainLayout,
    component: ManagementUserCreate,
    requireAuth: true,
  },
  {
    path: ROUTE_PATH.MANAGEMENT_USER_EDIT,
    layout: MainLayout,
    component: ManagementUserEdit,
    requireAuth: true,
  },
  {
    path: ROUTE_PATH.MANAGEMENT_USER_DETAIL,
    layout: MainLayout,
    component: ManagementUserDetail,
    requireAuth: true,
  },
  {
    path: ROUTE_PATH.MANAGEMENT_ORGANIZATION.ORGANIZATION_LIST,
    layout: MainLayout,
    component: ManagementOrganizationList,
    requireAuth: true,
  },
  {
    path: ROUTE_PATH.MANAGEMENT_ORGANIZATION.ORGANIZATION_CREATE,
    layout: MainLayout,
    component: ManagementOrganizationCreate,
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
  createHashRouter(
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
