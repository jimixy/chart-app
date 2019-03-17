import request from '../utils/request'

class Index {
  static index () {
    return request.get('/classic/latest', {})
  }
}

export default Index
