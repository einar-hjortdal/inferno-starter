import AppRoute from './components/Routes/AppRoute'

import { Home } from './components/Home'
import { NoMatch } from './components/NoMatch'

export const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
    wrapper: AppRoute,
    getInitialData: Home.getInitialData
  },
  {
    path: '*',
    component: NoMatch
  }
]
