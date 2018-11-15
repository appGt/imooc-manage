import React from 'react'
import {HashRouter ,Route, Link} from 'react-router-dom'
import Main from './/Main'
import About from './../router1/About'
import Topic from './../router1/Topic'
import Home from './Home'

export default class IRoute extends React.Component {
  render(){
    return (
      <HashRouter>
        <Home>
          <Route path="/main" render={()=>
            <Main>
              <Route path="/main/a" component={About}></Route>
            </Main>
          }></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/topic" component={Topic}></Route>
        </Home>
      </HashRouter>
    )
  }
}