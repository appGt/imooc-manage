import React from 'react'
import { Card } from 'antd'
import echartTheme from './../echartTheme';

//按需加载
import echarts from 'echarts/lib/echarts'
//导入柱形图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends React.Component {
  componentWillMount() {
    //修改主题色
    echarts.registerTheme('Imooc', echartTheme)
  }

  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'bar',
          data: [100, 200, 300, 400, 500, 600, 700]
        }
      ]
    }
    return option
  }
  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      legend: {
        data: ['ofo', '摩拜', '小蓝']
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'ofo',
          type: 'bar',
          data: [100, 200, 300, 400, 30, 99, 77]
        },
        {
          name: '摩拜',
          type: 'bar',
          data: [100, 22, 33, 400, 33, 66, 11]
        },
        {
          name: '小蓝',
          type: 'bar',
          data: [100, 200, 44, 400, 66, 600, 700]
        }
      ]
    }
    return option
  }
  render() {
    return (
      <div>
        <Card title="柱形图表之一">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }}></ReactEcharts>
        </Card>
        <Card title="柱形图表之二" style={{ marginTop: 10 }}>
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }}></ReactEcharts>
        </Card>
      </div>
    )
  }
}