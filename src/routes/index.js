// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Hot = lazy(() => import('../pages/protected/Hot'))
// const Transactions = lazy(() => import('../pages/protected/Transactions'))
// const Bills = lazy(() => import('../pages/protected/Bills'))
const Long = lazy(() => import('../pages/protected/Long'))
const Short = lazy(() => import('../pages/protected/Short'))

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
    path: '/hot',
    component: Hot,
  },
  {
    path: '/long',
    component: Long,
  },
  {
    path: '/short',
    component: Short,
  },
  {
    path: '/404',
    component: Page404,
  },
]

export default routes
