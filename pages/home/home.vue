<template>
	<view>
		<!-- 点击跳转到分包中的搜索页面 -->
		<navigator url="../../subPackages/search/search" >
			<search></search>
		</navigator>
		<!-- 轮播 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true"  interval="2000"  duration="1000"  :circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="`../../subPackages/goodsDetail/goodsDetail?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类导航 -->
		<view class="grid-wrap">
			<view class="grid-item" v-for="(item, i) in navList" :key="i">
				<image :src="item.image_src"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
	
		<!-- 楼层推广 -->
		<view class="floor-wrap">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 标题图片 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="img-box">
					<!-- 商品展示的区域  左1  右4 -->
					<view class="l-box">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}"  mode="widthFix"></image>
					</view>
					<view class="r-box" >
						<view v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}"  mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import setBadgeMixins from "../../mixins/setTabbarBadge.js"
	export default {
		//将setBadgeMixins混入到当前的页面中
		mixins:[setBadgeMixins],
		
		data() {
			return {
				swiperList:[],//轮播图的数据数组
				navList:[], //导航的数据数组
				floorList:[] //推广区块的数据数组
			};
		},
		
		methods:{
			//请求轮播数据
			async getSwiperData(){
				const {data:res} = await uni.$http.get("/api/home/swiperdata");
				if(res.meta.status !== 200) return uni.$showMsg("轮播数据请求失败"); 
				this.swiperList = res.message;
			},
			// 请求导航数据
			async getNavData(){
				const {data:res} = await uni.$http.get("/api/home/catenav");
				if(res.meta.status !== 200) return uni.$showMsg("导航数据请求失败"); 
				this.navList = res.message;
			},
			//请求推广区块的数据
			async getFloorData(){
				const {data:res} = await uni.$http.get("/api/home/floordata");
				if(res.meta.status !== 200) return uni.$showMsg("推广区块数据请求失败"); 
				this.floorList = res.message;
			},
			
		},
		//加载页面
		onLoad(){
			this.getSwiperData();
			this.getNavData();
			this.getFloorData();
		},
		
	}
</script>

<style lang="scss">
	.search{
		//吸顶
		position: sticky;
		top:0;
		z-index: 999;
	}
	.swiper{
		height: 330rpx;
		.swiper-item,
		image{
			// display: block;
			width: 100%;
			height: 100%;
		}
	}
	
	.grid-wrap{
		display: flex;
		margin: 15rpx 0;
		flex-wrap: wrap;
		.grid-item{
			display: flex;
			width: 20%;
			height: 150rpx;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			image{
				width: 60rpx;
				height: 60rpx;
			}
			text{
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}
	}
	
	.floor-title{
		width: 100%;
		height: 60rpx;
	}
	.floor-item{
		.img-box{
			display: flex;
		}
		.r-box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>
