
export default function (jsConfig) {
  wx.requestPayment({
    timeStamp: jsConfig.timeStamp,
    nonceStr: jsConfig.nonceStr,
    package: jsConfig.package,
    signType: jsConfig.signType,
    paySign: jsConfig.paySign,
    success: function (res) {
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 1000
      })
    },
    fail: function (res) {
      wx.showToast({
        title: '支付失败',
        icon: 'success',
        duration: 1000
      })
    },
    complete: function (res) {
      if (res.errMsg === 'requestPayment:cancel') {
        wx.showToast({
          title: '取消支付',
          icon: 'none',
          duration: 1000
        })
      }
    }
  })
}
