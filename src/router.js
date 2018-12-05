import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import NoMatch from './pages/nomatch'
import Admin from './admin'
import Home from './pages/home'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loading from './pages/ui/loading'
import Tabs from './pages/ui/tabs'

export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route path="/" render={() =>
            <Admin>
              <Switch>

                <Route path="/" exact component={Home} />
                <Route path="/home" exact component={Home} />
                <Route path="/ui/buttons" component={Buttons}></Route>
                <Route path="/ui/modals" component={Modals}></Route>
                <Route path="/ui/loading" component={Loading}></Route>
                <Route path="/ui/tabs" component={Tabs}></Route>
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