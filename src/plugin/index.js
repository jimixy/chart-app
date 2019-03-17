
import Toast from '../../static/vant-ui/toast/toast'

export default function install (proxyMPX) {
  proxyMPX.toast = Toast
  proxyMPX.prototype.testHello = function () {
    console.log('hello', Toast())
  }
}
