<template>
	<view class="userinfo-wrap">
		<!-- 头像区域 -->
		<view class="userinfo-box">
			<image :src="userInfo.avatarUrl" class="avatar"></image>
			<text class="nickname">{{userInfo.nickName}}</text>
		</view>
		<!-- 面板1 -->
		<view class="panel1">
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/qianbao.png"></image>
				<text>待付款</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/wuliu.png"></image>
				<text>待收货</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/tuikuanguanli.png"></image>
				<text>待评价</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/xiaoxi.png"></image>
				<text>退款/售后</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/dingdan.png"></image>
				<text>订单</text>
			</view>
		</view>
		
		<!-- 面板2-->
		<view class="panel2">
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/dianpu.png"></image>
				<text>待付款</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/hongbao.png"></image>
				<text>待付款</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/quan.png"></image>
				<text>待付款</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/yue.png"></image>
				<text>待付款</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/zhichengpingshen.png"></image>
				<text>待付款</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/baokuan.png"></image>
				<text>待付款</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/tongzhi.png"></image>
				<text>待付款</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/shoucang.png"></image>
				<text>待付款</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/bangzhu.png"></image>
				<text>待付款</text>
			</view>
			<view class="item">
				<image class="icon" src="http://www.yz520.xyz/icon/loginout.png"></image>
				<text>退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		name:"userinfo",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState("moduleUser", ["userInfo"])
		}
	}
</script>

<style lang="scss">
	.userinfo-box{
		display: flex;
		align-items: center;
		padding: 10px;
		background-color: #c82523;
		.avatar{
			width: 50px;
			height: 50px;
			border-radius: 50px;
			border: 4px solid #fff;
		}
		.nickname{
			margin-left: 10px;
			color: #fff;
			font-size: 16px;
			font-weight: bold;
		}
	}

	.panel1{
		display: flex;
		width: 100%;
		margin-bottom: 20px;
		background-color: #fff;
		.item{
			display: flex;
			width: 20%;
			height: 60px;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			font-size: 12px;
			color: #686868;
			.icon{
				width: 24px;
				height: 24px;
			}
		}
	}
	.panel2{
		display: flex;
		flex-wrap: wrap;
		width: 700rpx;
		margin: 20px auto;
		border-radius: 10px;
		background-color: #fff;
		.item{
			display: flex;
			width: 25%;
			height: 60px;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			font-size: 12px;
			color: #686868;
			.icon{
				width: 24px;
				height: 24px;
			}
		}
	}
	
</style>
