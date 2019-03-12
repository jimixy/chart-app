import request from '../utils/request'

class Index {
  static index () {
    return request.get('/sys/account/getBasicInfo', {})
  }
}

export default Index
