const config = {
  isOnline: process.env.NODE_ENV === 'production',
  apiUrl: 'http://192.168.1.49:8080',
  httpCode: {
    success: 200200
  }
}

config.apiUrl = config.isOnline ? 'http://192.168.1.49:8080' : config.apiUrl // 不准修改

export default config
