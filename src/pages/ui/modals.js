import React from 'react'
import { Card, Button, Modal } from 'antd'
import './ui.less';

export default class Modals extends React.Component {

  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false,
  }

  handleOpen = (type) => {
    this.setState({
      [type]: true
    })
  }

  handleConfirm = (type) => {
    Modal.confirm({
      title: '确认？',
      content: 'are you ready ?',
      onOk() {
        console.log('ok')
      },
      onCancel() {
        console.log('cancel')
      }
    })
  }

  render() {
    return (
      <div>
        <Card title="基础模态框" className="card-wrap">
          <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open</Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px</Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal4')}>居中</Button>
        </Card>
        <Card title="信息确认框" className="card-wrap">
          <Button type="primary" onClick={() => this.handleConfirm('showConfirm1')}>confirm</Button>
          <Button type="primary" onClick={() => this.handleConfirm('showConfirm2')}>confirm</Button>
          <Button type="primary" onClick={() => this.handleConfirm('showConfirm3')}>confirm</Button>
          <Button type="primary" onClick={() => this.handleConfirm('showConfirm4')}>confirm</Button>
        </Card>
        <Modal
          title="React"
          visible={this.state.showModal1}
          onCancel={() => {
            this.setState({
              showModal1: false
            })
          }}
        >
          <p>1111111</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.showModal2}
          okText="确定"
          cancelText="取消"
          onCancel={() => {
            this.setState({
              showModal2: false
            })
          }}
        >
          <p>22222</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.showModal3}
          onCancel={() => {
            this.setState({
              showModal3: false
            })
          }}
        >
          <p>3333333</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.showModal4}
          onCancel={() => {
            this.setState({
              showModal4: false
            })
          }}
        >
          <p>444444</p>
        </Modal>
      </div>
    )
  }
}