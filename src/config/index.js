const config = {
  isOnline: process.env.NODE_ENV === 'production',
  // apiUrl: 'http://192.168.1.49:8080',
  apiUrl: 'http://bl.7yue.pro/v1',
  appkey: 'AbhC31IG7ruCDp57',
  httpCode: {
    success: 200200
  }
}

config.apiUrl = config.isOnline ? 'http://192.168.1.49:8080' : config.apiUrl // 不准修改

export default config
