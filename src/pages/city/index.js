import React from 'react'
import { Card, Table, message, Modal, Button, Select, Form } from 'antd'
import axios from '../../axios/index'
import Utils from './../../utils/utils'
const FormItem = Form.Item
const Options = Select.Option

export default class HignTable extends React.Component {
  state = {
    list: [],
    isShowOpenCity: false
  }

  params = {
    page: 1
  }

  componentWillMount() {
    this.request()
  }

  request = () => {
    axios.ajax({
      url: '/open_city',
      params: {
        page: this.params.page
      },
      isShowLoading: true,
    }).then((res) => {
      let list = res.data.list.map((item, index) => {
        item.key = index
        return item
      })
      this.setState({
        list: list,
        pagination: Utils.pagination(res, (current) => {
          _this.params.page = current
          _this.requestList()
        })
      })
    })
  }

  // 开通城市
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }

  // 城市开通提交
  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue()
    console.log(cityInfo)
    axios.ajax({
      url: 'city/open',
      data: {
        params: cityInfo
      }
    }).then((res) => {
      if (res.code == '0') {
        message.success('开通成功')
        this.setState({
          isShowOpenCity: false
        })
        this.requestList()
      }
    })
  }

  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      },
      {
        title: '城市名称',
        dataIndex: 'name',
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode) {
          return mode == 1 ? '停车点' : '禁停区'
        }
      }, {
        title: '运营模式',
        dataIndex: 'op_mode',
        render(op_mode) {
          return op_mode === 1 ? '自营' : '加盟'
        }
      },
      {
        title: '城市管理员',
        dataIndex: 'cit_admins',
        render(arr) {
          return arr.map((item) => {
            return item.user_name
          }).join(',')
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time'
      },
      {
        title: '操作时间',
        dataIndex: 'update_time',
        render: Utils.formatDate
      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ]

    return (
      <div>
        <Card>
          <FileForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div class="card-wrap">
          <Table
            bordered
            culumns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}
          onOk={this.handleSubmit}
        >
          <OpenCityForm wrappedComponentRef={(inst) => { this.cityForm = inst }} />
        </Modal>
      </div>
    )
  }
}

class FilterForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="inline">
        <FormItem></FormItem>
      </Form>
    )
  }
}