import Vue from "vue"
import Vuex from "vuex"
import moduleCart from "./cart.js"
import moduleUser from "./user.js"

//将vuex挂载到Vue上
Vue.use(Vuex);

//创建一个store的实例对象
const store = new Vuex.Store({
	//将模块挂载到store上
	modules:{
		// moduleCart: moduleCart    (访问时通过moduleCart名称访问)
		moduleCart,
		moduleUser,
	}
})

/* 
	全局共享的数据仓库（只希望使用，修改数据时只能在当前的store内去修改）
		购物车中商品的相关数据
			价格 名称 图片 数量  勾选状态
			修改数量的变化    修改状态的变化  
			存到本地一份
			
		用户的信息数据
			头像
			昵称
			存到本地一份
		
 */

export default store;