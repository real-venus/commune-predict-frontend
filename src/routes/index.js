// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/integration',
    component: Integration,
  },
  {
    path: '/404',
    component: Page404,
  },
]

export default routes
