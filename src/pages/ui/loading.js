import React from 'react'
import { Card, Spin, Icon, Alert } from 'antd'
import './ui.less';

export default class Modals extends React.Component {

  render() {
    const iconLoading = <Icon type="loading" />
    return (
      <div>
        <Card title="Spin用法" className="card-wrap">
          <Spin size="small"/>
          <Spin size="default" />
          <Spin size="large" />
          <Spin indicator={iconLoading}/>
        </Card>
        <Card title="内容遮罩" className="card-wrap">
          <Alert 
            message="react"
            description="welcome"
            type="info"
          />
          <Spin indicator={iconLoading}>
            <Alert
              message="react"
              description="welcome"
              type="warn"
            />
          </Spin>
          <Spin indicator={iconLoading} tip="Loading">
            <Alert
              message="react"
              description="welcome"
              type="error"
            />
          </Spin>
          <Spin  tip="Loading">
            <Alert
              message="react"
              description="welcome"
              type="success"
            />
          </Spin>
        </Card>
      </div>
    )
  }
}