import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router.js'
//导入mui框架样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

Vue.config.productionTip = false
//导入auth.js
import auth from './auth.js'
//注册auth
Vue.use(auth)
//导入axios配置文件
import axios from './axios.js'
//注册axios
Vue.use(axios)
//导入mint-ui组件库
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//注册mint-ui
Vue.use(MintUI)

import VuePreview from 'vue-preview';
Vue.use(VuePreview);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
