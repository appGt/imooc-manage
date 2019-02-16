import React from 'react'
import { Card, Table } from 'antd'
import axios from '../../axios'

export default class HignTable extends React.Component {
  state = {}

  params = {
    page: 1
  }

  componentWillMount() {
    this.request()
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortOrder: sorter.order
    })
  }

  request = () => {
    axios.ajax({
      url: '/table/high/list',
      params: {
        page: this.params.page
      },
      isShowLoading: true,
    }).then((res) => {
      res.data.list.map((item, index) => {
        return item.key = index
      })
      this.setState({
        dataSource: res.data.list,
        selectedRowKeys: [],
        selectedRows: null,
      })
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        width: 50,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 80,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: 80,
      }, {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        width: 80,
        dataIndex: 'status'
      },
      {
        title: '爱好',
        width: 80,
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
        width: 120,
        dataIndex: 'address'
      }
    ]
    const columns2 = [
      {
        title: 'id',
        dataIndex: 'id',
        width: 80,
        fixed: 'left',
        key: 'id2',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 100,
        key: 'name2',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: 100,
        key: 'age2',
      }, {
        title: '性别',
        dataIndex: 'sex',
        width: 100,
        key: 'sex2',
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        width: 100,
        key: 'status2',
        dataIndex: 'status'
      },
      {
        title: '爱好',
        width: 100,
        dataIndex: 'interest',
        key: 'interest2',
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
        width: 120,
        dataIndex: 'address',
        key: 'address21',
      },
      {
        title: '地址',
        width: 120,
        dataIndex: 'address',
        key: 'address22',
      },
      {
        title: '地址',
        width: 120,
        dataIndex: 'address',
        key: 'address23',
      },
      {
        title: '地址',
        width: 120,
        dataIndex: 'address',
        key: 'address24',
      },
      {
        title: '地址',
        width: 120,
        dataIndex: 'address',
        key: 'address25',
      },
      {
        title: '地址',
        width: 120,
        fixed: 'right',
        dataIndex: 'address',
        key: 'address26',
      }
    ]
    const columns3 = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        sorter: (a, b) => {
          return a.age - b.age
        },
        sortOrder: this.state.sortOrder
      }, {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'
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
        <Card title="头部固定" className="card-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{ y: 240 }}
          />
        </Card>
        <Card title="头列固定" className="card-wrap">
          <Table
            bordered
            columns={columns2}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{ y: 300, x: 1300 }}
          />
        </Card>
        <Card title="表格操作" className="card-wrap">
          <Table
            bordered
            columns={columns3}
            dataSource={this.state.dataSource}
            pagination={false}
            onChange={this.handleChange}
          />
        </Card>
      </div>
    )
  }
}