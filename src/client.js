import { hydrate } from 'inferno-hydrate'
import { BrowserRouter } from 'inferno-router'

import { App } from './components'
import './styles/index.less'

hydrate(
  <BrowserRouter>
    <App initialData={window.__initialData__} />
  </BrowserRouter>
  , document.getElementById('root')
)
