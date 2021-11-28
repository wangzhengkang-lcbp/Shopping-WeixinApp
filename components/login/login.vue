<template>
	<view class="login-wrap">
		<uni-icons type="contact" size="100" color="#cccccc"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
	</view>
</template>

<script>
	import {mapMutations} from "vuex"
	export default {
		name:"login",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations("moduleUser", ["updateUserInfo", "updateToken"]),
			getUserInfo(){
				//获取用户信息
				uni.getUserProfile({
					desc:"用于登录",
					success:(res)=>{
						console.log("成功", res);
						this.updateUserInfo(res.userInfo);//将userInfo存入到vuex
						//获取登录成功后的token
						this.getToken(res);
					},
					fail:(err)=>{
						// console.log("拒绝",err);
						uni.$showMsg("您拒绝了登录，将导致无法愉快剁手")
					}
				})
			},
			// 获取登录的token
			async getToken(info){
				const [err, res] = await uni.login().catch(err=>err); 
				if(err || res.errMsg !== "login:ok") return uni.$showMsg("login登录失败")
				//成功
				// 发送code到后端
				const {data:loginRes} = await uni.$http.post("/login/user", {
					code: res.code,
					rawData: info.rawData
				})
				// console.log(data);
				this.updateToken(loginRes.msg.token) //存储token
				// 当需要获取用户敏感数据的时候，发起请求时，携带token过去
				// 后端：取出token， 和 数据库中的token对比是否一致
			}
		}
	}
</script>

<style lang="scss">
	.login-wrap{
		height: 700rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.btn-login{
			width: 70%;
			border-radius: 100px;
			background-color: #c82523;
		}
	}
</style>
