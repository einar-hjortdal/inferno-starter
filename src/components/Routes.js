// import { Component } from 'inferno' // TODO protected routes
import { Switch, Route } from 'inferno-router'

import { Home } from './Home'
import { NoMatch } from './NoMatch'

export default function Routes (props) {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={(props) => <Home {...props} />}
        loader={Home.getInitialData}
      />

      <Route render={(props) => <NoMatch {...props} />} />
    </Switch>
  )
}
