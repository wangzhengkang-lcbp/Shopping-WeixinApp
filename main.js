// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from "./store/index.js"

// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
// 将按需导入的 $http 挂载到 wx 顶级对象之上，方便全局调用
uni.$http = $http
// 配置请求的前缀
$http.baseUrl = 'http://www.yz520.xyz'
// $http.baseUrl = 'http://localhost:8000'

// 请求拦截器：请求开始之前展示 loading 效果
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 响应拦截器：请求完成之后隐藏 loading 效果
$http.afterRequest = function () {
  uni.hideLoading()
}

//封装一个全局的消息提示框
uni.$showMsg = function(title = "数据请求失败", duration = 1500, icon = "none" ){
	uni.showToast({
		title,
		duration,
		icon
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store,  //将store挂载到当前的vue实例
})
app.$mount()

// #endif


// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif