import { Component } from 'inferno'
import { Route } from 'inferno-router'

import { Navigation } from '../shared'

export default class AppRoute extends Component {
  render () {
    return (
      <div className='app-route-container'>
        <Navigation>
          <Route
            {...this.props}
            render={(props) => this.props.renderComponent({ ...props })}
          />
        </Navigation>
      </div>
    )
  }
}
