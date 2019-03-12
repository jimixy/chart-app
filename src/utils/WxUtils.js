export default class WxUtils {
  static get tabUrls () {
    return [
      '/pages/index/index',
      '/pages/member/index',
      '/pages/mine/index',
      '/pages/order/index'
    ]
  }

  static isTab (url) {
    return this.tabUrls.some(path => path === url)
  }

  static handleScanUrl (url) {
    return url.indexOf('/') === 0 ? url : '/' + url
  }

  static redirect (url) {
    url = this.handleScanUrl(url)
    if (this.isTab(url)) {
      wx.switchTab({
        url: url
      })
    } else {
      wx.redirectTo({
        url: url
      })
    }
  }

  static navigate (url, params) {
    url = this.handleScanUrl(url)
    if (this.isTab(url)) {
      wx.switchTab({
        url: url
      })
    } else {
      wx.navigateTo({
        url: url
      })
    }
  }

  static wxPay (param) {
    return new Promise((resolve, reject) => {
      param.complete = res => {
        if (res.errMsg.toLocaleLowerCase() === 'requestPayment:ok'.toLocaleLowerCase()) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 1000
          })
          resolve(res)
        } else {
          wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 1000
          })
          reject(res)
        }
      }
      wx.requestPayment(param)
    })
  }

  static wxDownload (config) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: config.url,
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          wx.showToast({
            title: '下载失败',
            icon: 'none',
            duration: 1000
          })
        }
      })
    })
  }
}
