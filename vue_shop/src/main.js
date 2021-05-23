import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import qs from 'qs'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

// 设置一个请求拦截器，来设置访问时请求头带有token
axios.interceptors.request.use(
  config => {
    // 获取token，sessionStorage
    const tokenStr = window.sessionStorage.getItem('token')
    if (tokenStr) {
      config.headers.token = tokenStr
    }
    return config
  }
)
// 设置一个响应的拦截器，来处理token是否无效，如果无效，就弹出提示，有效就继续操作
axios.interceptors.response.use(
  response => {
    // 此时response 中返回的data中的token是后端传回来的
    // console.log(response)
    if (response.data.status === 10016 || response.data.status === 10017) {
      // 如果报异常，则清除已存在的token
      window.sessionStorage.removeItem('token')
      // 跳转页面
      // console.log(response.data.msg)
      alert(response.data.msg)
      location.reload()
      // router.replace(
      //   {
      //     path: '/index'
      //   }
      // )
    }
    return response
  }
)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
