// import store from '../store/user'
import Config from '../config'

class Token {
  static requestToken (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: Config.apiUrl + url,
        data: data,
        method: 'POST',
        success: res => {
          resolve(res.data)
        },
        fail: e => {
        }
      })
    })
  }

  static refreshToken () {
    return new Promise((resolve, reject) => {
      const wxParams = {}
      wx.login({
        success: res => {
          wxParams.code = res.code
          this.getUserInfo().then(result => {
            wxParams.encryptedData = result.encryptedData
            wxParams.iv = result.iv
            wxParams.userInfo = result.userInfo
            store.dispatch('modifyUserInfo', result.userInfo)
            this.requestToken('/plan/login/miniAppsLogin', wxParams).then(res => {
              resolve(res)
            })
          })
        }
      })
    })
  }

  static getUserInfo () {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: result => {
                resolve(result)
              }
            })
          } else {
            console.log('没有授权')
          }
        }
      })
    })
  }

  static getToken () {
    return new Promise((resolve) => {
      resolve('eyJraWQiOiIxMTAzNTUzNDg1NDcwMTAxNTA2IiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJwYXNzd29yZCI6IjczNTE1NjZmZWZjNjBjN2FhMDE2ZDk4ZTFmMGE0YzQ4OTY2NjM1ZTQiLCJzYWx0IjoiM2M5ODBkNTk4YjhjNTIzNSIsImlzcyI6InRtcy1hdXRoIiwiaWQiOjExMDM1NTM0ODU0NzAxMDE1MDYsImlhdCI6MTU1MjI5MTkzNiwidXNlcm5hbWUiOiJhZG1pbiJ9.wbr8EMk5xrh_i2C93IDwd3PixwIoBe35sBbp1HStq38')
    //   if (store.getters.checkTokenExpire) {
    //     this.refreshToken().then(res => {
    //       const data = {
    //         token: res.data.member_id,
    //         expire_time: -1
    //       }
    //       store.dispatch('modifyLoginInfo', data)
    //       resolve(data.token)
    //     })
    //   } else {
    //     resolve(store.getters.token)
    //   }
    })
  }
}

export default Token
