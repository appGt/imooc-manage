import React from 'react'
import { Card, Table, message } from 'antd'
import axios from './../../axios'

export default class BaseTable extends React.Component {

  state = {}

  componentWillMount() {
    const dataSource = [{
      id: '1',
      name: '胡彦斌',
      age: 32,
      status: '工作',
      address: '西湖区湖底公园1号',
      interest: '篮球',
      sex: '1'
    }, {
      id: '2',
      name: '胡彦祖',
      age: 42,
      status: '娱乐',
      address: '西湖区湖底公园1号',
      interest: '足球',
      sex: '1'
    }];

    this.setState({
      dataSource
    })

    this.request()
  }

  request = () => {
    axios.ajax({
      url: '/table/list',
      params:{
        page: 1
      },
      isShowLoading: true,
    }).then((data) => {
      this.setState({
        dataSource2: data.list
      })
    })
  }
  
  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '年龄',
        dataIndex: 'age'
      },{
        title: '性别',
        dataIndex: 'sex',
        render(sex){
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'status'
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interset) {
          let config = {
            '1': '游泳',
            '2': '足球',
            '3': '写作',
            '4': '打码',
            '5': '吃吃吃',
            '6': '看剧',
            '7': '画画',
            '8': '跳舞',
          }
          return config[interset]
        }
      },
      {
        title: '地址',
        dataIndex: 'address'
      }
    ]
    return (
      <div>
        <Card title="基础表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
            rowKey={recode => recode.id}
          />
        </Card>
        <Card title="动态数据表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
            rowKey={recode => recode.id}
          />
        </Card>
      </div>
    )
  }
}