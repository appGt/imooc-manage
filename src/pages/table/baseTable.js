import React from 'react'
import { Card, Table, message, Modal, Button } from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils';

export default class BaseTable extends React.Component {

  state = {}

  params = {
    page: 1
  }

  componentWillMount() {
    const dataSource = [{
      id: '1',
      name: '胡彦斌',
      age: 32,
      status: '工作',
      address: '西湖区湖底公园1号',
      interest: '篮球',
      sex: 1
    }, {
      id: '2',
      name: '胡彦祖',
      age: 42,
      status: '娱乐',
      address: '西湖区湖底公园1号',
      interest: '足球',
      sex: 1
    }];

    dataSource.map((item, index) => {
      return item.key = index
    })

    this.setState({
      dataSource
    })

    this.request()
  }

  request = () => {
    let _this = this
    axios.ajax({
      url: '/table/list',
      params: {
        page: this.params.page
      },
      isShowLoading: true,
    }).then((res) => {
      res.data.list.map((item, index) => {
        return item.key = index
      })
      this.setState({
        dataSource2: res.data.list,
        selectedRowKeys: [],
        selectedRows: null,
        pagination: Utils.pagination(res.data, (current) => {
          _this.params.page = current;
          this.request();
        })
      })
    })
  }

  onRowClick = (record, index) => {
    let selectedKey = [index]
    Modal.info({
      title: '信息',
      content: `用户名:${record.name}, 年龄：${record.age}`
    })
    this.setState({
      selectedRowKeys: selectedKey,
      selectedItem: record
    })
  }

  handleDelete = () => {
    let rows = this.state.selectedRows
    let ids = []
    rows.map((item, index) => {
      return ids.push(item.id)
    })
    Modal.confirm({
      title: '删除提示',
      content: `确定删除这些数据吗?${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功')
        this.request()
        this.setState({
          selectedCheckRowKeys: [],
          selectedRows: null
        })
      }
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
    const selectedRowKeys = this.state.selectedRowKeys
    const selectedCheckRowKeys = this.state.selectedCheckRowKeys
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      // onChange: (selectedRowKeys, selectedRows) => {
      //   this.setState({
      //     selectedRowKeys,
      //     selectedRows
      //   })
      // }
    }

    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys: selectedCheckRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedCheckRowKeys: selectedRowKeys,
          selectedRows
        })
      }
    }

    return (
      <div>
        <Card title="基础表格" className="card-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
        <Card title="Mock-动态数据表格" className="card-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-单选" className="card-wrap">
          <Table
            bordered
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              }
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-多选" className="card-wrap">
          <div style={{ marginBottom: 10 }}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            rowSelection={rowCheckSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-分页" className="card-wrap">
          <div>
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    )
  }
}