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
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import LoginForm from './pages/form/login'
import RegisterForm from './pages/form/register'
import BaseTable from './pages/table/baseTable'
import HighTable from './pages/table/highTable'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import OrderDetail from './pages/order/detail'
import BikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Rich from './pages/rich/rich'

export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/common" render={() =>
              <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
              </Common>
            } />
            <Route path="/" render={() =>
              <Admin>
                <Switch>

                  <Route path="/" exact component={Home} />
                  <Route path="/home" exact component={Home} />
                  <Route path="/ui/buttons" component={Buttons} />
                  <Route path="/ui/modals" component={Modals} />
                  <Route path="/ui/loading" component={Loading} />
                  <Route path="/ui/tabs" component={Tabs} />
                  <Route path="/ui/gallery" component={Gallery} />
                  <Route path="/ui/carousel" component={Carousel} />
                  <Route path="/form/login" component={LoginForm} />
                  <Route path="/form/reg" component={RegisterForm} />
                  <Route path="/table/basic" component={BaseTable} />
                  <Route path="/table/high" component={HighTable} />
                  <Route path="/city" component={City} />
                  <Route path="/order" component={Order} />
                  <Route path="/bikeMap" component={BikeMap} />
                  <Route path="/charts/bar" component={Bar} />
                  <Route path="/charts/pie" component={Pie} />
                  <Route path="/rich" component={Rich} />
                  <Route component={NoMatch} />

                </Switch>
              </Admin>
            } />

          </Switch>


        </App>
      </HashRouter>
    )
  }
}