import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Main from './Main'
import Info from './Info'
import About from './../router1/About'
import Topic from './../router1/Topic'
import Home from './Home'
import NoMatch from './NoMatch'

export default class IRoute extends React.Component {
  render() {
    return (
      <HashRouter>
        <Home>
          <Switch>
            <Route path="/main" render={() =>
              <Main>
                <Route path="/main/:value" component={Info}></Route>
              </Main>
            }></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topic" component={Topic}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Home>
      </HashRouter>
    )
  }
}