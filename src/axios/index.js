import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
import Utils from '../utils/utils'
export default class Axios {

  static requestList(_this, url, params, isMock) {
    let data = {
      params,
      isMock
    }

    this.ajax({
      url,
      data
    }).then(res => {
      if(res && res. data){
        let list = res.data.list.map((item, index) => {
          item.key = index
          return item
        })
        _this.setState({
          list,
          pagination: Utils.pagination(res.data, (current) => {
            _this.params.page = current
            _this.requestList()
          })
        })
      }
    })
  }

  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, function (err, res) {
        if (res.status === 'success') {
          resolve(res)
        } else {
          reject(res.message)
        }
      })
    })
  }

  static ajax(options) {
    let loading;
    if (options.params && options.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
    }
    let baseApi = 'https://www.easy-mock.com/mock/5c149b721ee30f317685ba15/mockapi'
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: options.type || 'get',
        baseURL: baseApi,
        // timeout: 5000,
        params: options.params || ''
      }).then((response) => {
        if (options.params && options.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        if (response.status === 200) {
          let res = response.data
          if (res.code === 0) {
            resolve(res)
          } else {
            Modal.warning({
              title: '提示',
              content: res.msg
            })
          }
        } else {
          reject(response.code)
        }
      }).catch((err) => {
        if (options.params && options.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        Modal.warning({
          title: '提示',
          content: '获取数据失败'
        })
      })
    })
  }
}