import axios from 'axios'
import config from './config.js'

export default {
  install: function (vue) {
    //创建一个axios
    var auth = vue.prototype.$auth
    var obj = axios.create({
      baseURL: config.baseURL
    })
    //添加一个请求拦截器去处理添加Authorization
    obj.interceptors.request.use(function (conf) {
      conf.headers.Authorization = auth.getAuthorization()
      return conf
    })
    vue.prototype.$http = obj
  }
}
