import React from 'react'
import { Card, Form } from 'antd'
import BaseForm from './../../components/BaseForm'
import axios from './../../axios'

export default class BikeMap extends React.Component {

  state = {}
  map = ''

  componentWillMount() {
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
    //添加地图控件
    this.map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    this.map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));

    //绘制起点终点
    let gps1 = list[0].split(',')
    let startPoint = new window.BMap.Point(gps1[0], gps1[1])
    let gps2 = list[list.length - 1].split(',')
    let endPoint = new window.BMap.Point(gps2[0], gps2[1])
    this.map.centerAndZoom(endPoint, 11)

    let startPointIcon = new window.BMap.Icon('./assets/start_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42) //设置起终点偏移
    })
    let bikeMarerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon })
    this.map.addOverlay(bikeMarerStart)
    let endPointIcon = new window.BMap.Icon('./assets/end_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42) //设置起终点偏移
    })
    let bikeMarerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon })
    this.map.addOverlay(bikeMarerEnd)

    //绘制车辆行驶路线
    let routeList = []
    list.forEach((item) => {
      let p = item.split(',')
      routeList.push(new window.BMap.Point(p[0], p[1]))
    })

    let polyLine = new window.BMap.Polyline(routeList, {
      strokerColor: '#ef4136',
      strokeWeiht: 2,
      strokeOpacity: 1
    })
    this.map.addOverlay(polyLine)

    //绘制服务区
    let servicePointList = []
    let serviceList = res.service_list
    serviceList.forEach((item) => {
      servicePointList.push((new window.BMap.Point(item.lon, item.lat)))
    })

    let serviceLine = new window.BMap.Polyline(servicePointList, {
      strokerColor: '#ef4136',
      strokeWeiht: 2,
      strokeOpacity: 1
    })
    this.map.addOverlay(serviceLine)

    //绘制地图中的自行车图标
    let bikeList = res.bike_list
    let bikeIcon = new window.BMap.Icon('./assets/bike.jpg', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42) //设置起终点偏移
    })
    bikeList.forEach((item) => {
      let p = item.split(',')
      let point = new window.BMap.Point(p[0], p[1])
      let bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon })
      this.map.addOverlay(bikeMarker)
    })
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