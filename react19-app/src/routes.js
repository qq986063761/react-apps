import { Navigate } from 'react-router-dom'
import ReactAPIDemo from './pages/ReactAPIDemo'
import UIComponentDemo from './pages/UIComponentDemo'

// 路由配置 - 类似 Vue Router 的配置方式
const routes = [
  {
    path: '/',
    element: <Navigate to="/react-api" replace />
  },
  {
    path: '/react-api',
    element: <ReactAPIDemo />,
    meta: {
      title: 'React API 演示',
      description: '各种 Hook 和 API 的实际应用'
    }
  },
  {
    path: '/ui-components',
    element: <UIComponentDemo />,
    meta: {
      title: 'UI 组件演示',
      description: '组件设计模式和交互示例'
    }
  },
  // 大型项目中的路由配置示例
  // {
  //   path: '/dashboard',
  //   element: <DashboardLayout />,
  //   children: [
  //     {
  //       path: '',
  //       element: <DashboardHome />
  //     },
  //     {
  //       path: 'users',
  //       element: <UsersList />
  //     },
  //     {
  //       path: 'settings',
  //       element: <Settings />
  //     }
  //   ]
  // },
  // {
  //   path: '/admin',
  //   element: <AdminLayout />,
  //   children: [
  //     {
  //       path: 'users',
  //       element: <AdminUsers />
  //     },
  //     {
  //       path: 'reports',
  //       element: <AdminReports />
  //     }
  //   ]
  // },
  // 404 页面
  {
    path: '*',
    element: <Navigate to="/react-api" replace />
  }
]

export default routes
