import React from 'react'
import {Card, Button} from 'antd'
import './ui.less';

export default class Buttons extends React.Component {
  render() {
    return (
      <div>
        <Card title="基础按钮">
          <Button type="primary">Imooc</Button>
          <Button >Imooc</Button>
          <Button type="dashed">Imooc</Button>
          <Button type="danger">Imooc</Button>
          <Button disabled>Imooc</Button>
        </Card>
      </div>
    )
  }
}