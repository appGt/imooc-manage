import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import NoMatch from './pages/nomatch'
import Admin from './admin'
import Buttons from './pages/ui/buttons'

export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route path="/" render={() =>
            <Admin>
              <Switch>

                <Route path="/ui/buttons" component={Buttons}></Route>
                <Route component={NoMatch}></Route>

              </Switch>
            </Admin>
          } />
          <Route path="/order/detail" component={Login} />
        </App>
      </HashRouter>
    )
  }
}