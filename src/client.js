import { hydrate } from 'inferno-hydrate'
import { BrowserRouter } from 'inferno-router'

import { App } from './components'
import './styles/index.less'

hydrate(
  <BrowserRouter initialData={window.__initialData__}>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
)
