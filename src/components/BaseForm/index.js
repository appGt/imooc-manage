import React from 'react'
import { Card, Table, message, Modal, Button, Select, Form, DatePicker } from 'antd'
import axios from '../../axios/index'
import Utils from './../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option

class FilterForm extends React.Component {
  handleFilterSubmit = () => {
    let fieldsValu = this.props.form.getFieldsValue()
  }
}