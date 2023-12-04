import { hydrate } from 'inferno-hydrate'
import { BrowserRouter } from 'inferno-router'

import { App } from './components'
import './styles/index.less'

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
)
