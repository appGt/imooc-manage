import React from 'react'
import { Card, Form, Input, Checkbox, Button, Radio, Select, DatePicker, Switch, Icon, InputNumber, Upload, message } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea
class RegisterForm extends React.Component {

  state = {}

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        userImg: imageUrl,
        loading: false,
      }));
    }
  }

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${userInfo.username} 校验通过`)
      }
    })
    console.log(userInfo)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    }
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    }
    return (
      <div>
        <Card title="注册页面" className="card-wrap">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
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
                })(<Input type="text" placeholder="请输入用户名" />)
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码'
                    }
                  ]
                })(<Input type="password" placeholder="请输入密码" />)
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  rules: [
                    {
                      required: true,
                      message: '请选择性别'
                    }
                  ]
                })(
                  <RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: 18,
                })(
                  <InputNumber />
                )
              }
            </FormItem>
            <FormItem label="现在的状态" {...formItemLayout}>
              {
                getFieldDecorator('status', {
                  initialValue: '1'
                })(
                  <Select>
                    <Option value="0">---</Option>
                    <Option value="1">111</Option>
                    <Option value="2">222</Option>
                    <Option value="3">333</Option>
                    <Option value="4">444</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {
                getFieldDecorator('interest', {
                  initialValue: '1'
                })(
                  <Select mode="multiple">
                    <Option value="1">篮球</Option>
                    <Option value="2">足球</Option>
                    <Option value="3">爬山</Option>
                    <Option value="4">看书</Option>
                    <Option value="5">橄榄球</Option>
                    <Option value="6">足球</Option>
                    <Option value="7">爬山</Option>
                    <Option value="8">看书</Option>
                    <Option value="9">篮球</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Switch />
                )
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment(new Date())
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                )
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '皇后大道东'
                })(
                  <TextArea
                    autosize={
                      {
                        minRows: 4,
                        maxRows: 5
                      }
                    }
                  />
                )
              }
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('avatar')(
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    onChange={this.handleChange}
                  >
                    {this.state.userImg ? <img src={this.state.userImg} alt=""/> : <Icon type="plus" />}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('porotol')(
                  <Checkbox>我已经阅读过协议<a href="#">协议</a></Checkbox>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>注册</Button>
            </FormItem>
          </Form>

        </Card>
      </div>
    )
  }
}

export default Form.create()(RegisterForm)

