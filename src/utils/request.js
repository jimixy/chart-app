import mpx from '@mpxjs/core'
import mpxFetch from '@mpxjs/fetch'

import Config from '../config/index'
import Token from '../api/Token'

setTimeout(() => {
  // 延迟才能获得getCurrentPages数据
  console.log('getCurrentPages', getCurrentPages())
  console.log('mpx', mpx, mpx.toast({
    message: '123321231'
  }), mpx.prototype.testHello)
}, 200)

mpx.use(mpxFetch)

// 请求拦截器
mpx.xfetch.interceptors.request.use(function (config) {
  // console.log('request-config', config)
  return new Promise((resolve, reject) => {
    Token.getToken().then(res => {
      if (res) {
        config.header = Object.assign({}, {
          'Authorization': res,
          'content-type': 'application/json',
          'appkey': Config.appkey
        },
        config.header)
        resolve(config)
      }
    })
  })
})

// 处理后台返回数据
function handlerResponseData (response) {
  let data = response.data
  const result = {
    httpCode: response.statusCode,
    httpMsg: response.errMsg,
    serverCode: 0,
    serverMsg: '',
    serverData: {}
  }
  if (response.statusCode === 200) {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch (e) {
        data = {
          code: 1,
          msg: `服务器异常，请稍后重试`,
          data: {}
        }
      }
    }
    result.serverCode = data.code
    result.serverMsg = data.msg || `服务器繁忙，请稍后重试`
    result.serverData = data.data
  }
  return result
}

// 判断请求是否成功
function isSuccess (response) {
  return (response.httpCode === 200 && response.serverCode === Config.httpCode.success)
}

// 请求成功拦截器
function interceptorsResponse (response) {
  const responseData = handlerResponseData(response)
  if (isSuccess(responseData)) {
    return responseData.serverData || {}
  } else {
    return Promise.reject(responseData)
  }
}

mpx.xfetch.interceptors.response.use(interceptorsResponse)

const request = {
  done (url, data = {}, method = 'get', header = {}) {
    url = url.indexOf('https') === -1 ? Config.apiUrl + url : url
    return mpx.xfetch.fetch({
      url,
      method,
      data,
      header
    }).catch(e => {
      if (e.httpCode === 404) {
        wx.showToast({
          title: '请求有误',
          icon: 'none',
          duration: 1000
        })
        console.log('请求有误', e)
      }
    })
  },
  post (url, data = {}, header = {}) {
    return request.done(url, data, 'POST', header)
  },
  get (url, data = {}, header = {}) {
    return request.done(url, data, 'GET', header)
  }
}

export default request
