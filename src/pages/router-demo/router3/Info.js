import React from 'react'

export default class Info extends React.Component {
  render() {
    return (
      <div>
        test 动态路由
        {this.props.match.params.value}
      </div>
    )
  }
}