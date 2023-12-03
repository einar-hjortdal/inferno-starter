import { Route, Switch } from 'inferno-router'

import { routes } from '../../routes'

export default function Routes (props) {
  const routeComponents = []
  for (const route of routes) {
    const Component = route.component
    if (route.wrapper) {
      const Wrapper = route.wrapper
      routeComponents.push(
        <Wrapper
          path={route.path}
          exact={route.exact}
          renderComponent={(routeProps) =>
            <Component {...props} {...routeProps} />}
        />
      )
    } else {
      routeComponents.push(
        <Route
          path={route.path}
          exact={route.exact}
          render={(routeProps) =>
            <Component {...props} {...routeProps} />}
        />
      )
    }
  }

  return (
    <Switch>
      {routeComponents}
    </Switch>
  )
}
