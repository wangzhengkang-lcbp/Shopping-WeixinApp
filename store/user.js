export default {
	namespaced: true, //为当前模块开启命名空间，必须写
	state:{ //状态（数据）
		userInfo: JSON.parse(uni.getStorageSync("userinfo") || "{}"),
		token: ""  //登录成功后的加密字符串（验证登录状态/权限）
	},
	mutations:{ //方法，用来修改state
		//设置用户的基本信息
		updateUserInfo(state, userInfo){
			state.userInfo = userInfo; //赋值给vuex里的userInfo
			uni.setStorageSync("userinfo", JSON.stringify(state.userInfo)) //存本地
		},
		//设置token字符串
		updateToken(state, token){
			state.token = token; 
			uni.setStorageSync("token", JSON.stringify(state.token)) 
		},
	},
	getters:{ //计算属性，依赖state来做运算并返回结果。 （要有返回值）
		
	}
}