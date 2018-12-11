import React from 'react'
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd'

const FormItem = Form.Item
class LoginForm extends React.Component {

  handleClick = () => {
    let userInfo = this.props.form.getFieldsValue()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${userInfo.username} 校验通过`)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem>
              <Input type="text" placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平表单" style={{ marginTop: 10 }}>
          <Form style={{ width: 300 }} id="components-form-demo-normal-login">
            <FormItem>
              {
                getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名!'
                    },
                    {
                      min: 8,
                      max: 15,
                      message: '长度不在范围内'
                    }
                  ]
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="请输入用户名" />
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  initialValue: 'jack',
                  rules: []
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )
              }
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" onClick={this.handleClick} className="login-form-button">登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(LoginForm)