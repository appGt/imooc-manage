import React from 'react'
import { Card, Tabs, message, Icon } from 'antd'
import './ui.less';

const TabPane = Tabs.TabPane
export default class Modals extends React.Component {

  handleChange = (key) => {
    message.info(key)
  }

  componentWillMount () {
    const panes = [
      {
        title: 'Tab 1',
        content: 'Tab 1',
        key: '1'
      },
      {
        title: 'Tab 2',
        content: 'Tab 2',
        key: '2'
      },
      {
        title: 'Tab 3',
        content: 'Tab 3',
        key: '3'
      },
    ]
    this.setState({
      panes
    })
  }

  render() {
    return (
      <div>
        <Card title="标签页" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleChange}>
            <TabPane tab="Tab 1" key="1">Tab1</TabPane>
            <TabPane tab="Tab 2" key="2">Tab2</TabPane>
            <TabPane tab="Tab 3" key="3">Tab3</TabPane>
          </Tabs>
        </Card>
        <Card title="标签页icon" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleChange}>
            <TabPane tab={<span><Icon type="edit"/>Tab 1</span>} key="1">Tab1</TabPane>
            <TabPane tab={<span><Icon type="picture" />Tab 1</span>} key="2">Tab2</TabPane>
            <TabPane tab={<span><Icon type="team" />Tab 1</span>} key="3">Tab3</TabPane>
          </Tabs>
        </Card>
        <Card title="标签页3" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleChange}>
            {
              this.state.panes.map((pane) => {
                return <TabPane
                  tab={pane.title}
                  key={pane.key}
                  >
                  {pane.content}
                </TabPane>
              })
            }
          </Tabs>
        </Card>
      </div>
    )
  }
}