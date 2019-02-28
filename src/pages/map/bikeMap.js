import React from 'react'
import { Card, Form } from 'antd'
import BaseForm from './../../components/BaseForm'
import axios from './../../axios'

export default class BikeMap extends React.Component {

  state = {}
  map = ''

  componentWillMount(){
    this.requestList()
  }

  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city',
      placeholder: '城市',
      initialValue: '1',
      list: [{ id: '0', name: '全部' }, { id: '1', name: '上海' }, { id: '2', name: '深圳' }, { id: '3', name: '广州' }]
    },
    {
      type: '时间查询'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      initialValue: '0',
      list: [{ id: '0', name: '全部', }, { id: '1', name: '进行中', }, { id: '2', name: '行程结束', }]
    }
  ]

  requestList = () => {
    axios.ajax({
      url: '/map/bike_list',
      data: {
        params: this.params
      }
    }).then((res) => {
      if (res.code === 0) {
        this.setState({
          total_count: res.data.total_count
        })
        this.renderMap(res.data)
      }
    })
  }

  //查询表单
  handleFilterSubmit = (filterParams) => {
    this.params = filterParams
    this.requestList()
  }

  //地图渲染
  renderMap = (res) => {
    let list = res.route_list
    this.map = new window.BMap.Map('container')
    let gps1 = list[0].split(',')
    let startPoint = new window.BMap.Point(gps1[0], gps1[1])
    let gps2 = list[list.length - 1].split(',')
    let endPoint = new window.BMap.Point(gps2[0], gps2[1])
    this.map.centerAndZoom(endPoint, 11)
  }

  render() {
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}></BaseForm>
        </Card>
        <Card style={{ marginTop: 10 }}>
          <div>共{this.state.total_count}辆车</div>
          <div id="container" style={{ height: 500 }}></div>
        </Card>
      </div>
    )
  }
}