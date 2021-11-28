<template>
	<view>
		<!-- 轮播展示 -->
		<swiper class="swiper-wrap" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goodsInfo.pictures_big" :key="i">
				<image :src="item" @click="previewImg(i)"></image>
			</swiper-item>
		</swiper>
		
		<!-- 商品信息区域 -->
		<view class="goods-info-wrap">
			<view class="price">￥{{goodsInfo.goods_price}}</view>
			<view class="name">{{goodsInfo.goods_name}}</view>
			<view class="recommend">
				<uni-fav :checked="isFav" class="favBtn" circle="true" bgColor="#fff" bgColorChecked="#dd524d" @click="favClick"/>
				<text>发货：湖南长沙</text>
				<text>快递：免运费</text>
			</view>
		</view>
	
		<!-- 商品的详情图片 -->
		<view class="goods-detail">
			<image v-for="(item,i) in goodsInfo.goods_introduce" :key="i" :src="item" mode="widthFix" ></image>
		</view>
	
		<!-- 商品的导航按钮组 -->
		<view class="goods-nav-btn">
			<uni-goods-nav 
				:fill="true"  
				:options="options" 
				@click="clickLeftOptions" 
				:buttonGroup="buttonGroup"  
				@buttonClick="buttonClick" 
			/>
		</view>
	</view>
</template>

<script>
	//1. 导入vuex
	import {mapMutations, mapGetters} from "vuex"
	export default {
		data() {
			return {
				goodsInfo:{}, //商品详情数据
				isFav:false, //收藏按钮的选中状态
				//左侧按钮的配置对象
				options:[ 
					{
						text:"店铺",
						icon:"shop"
					},
					{
						text:"购物车",
						icon:"cart",
						info:6  //角标的数字
					}
				],
				buttonGroup:[//右侧按钮的配置对象
					{
						text:"加入购物车",
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text:"立即购买",
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		methods:{
			//2.将需要使用的方法解构到methods
			...mapMutations("moduleCart", ["addGoodsToCart"]),
			//请求获取商品详情数据
			async getGoodsDetail(goods_id){
				console.log(goods_id);
				const {data:res} = await uni.$http.get("/api/goods/detail",{goods_id});
				if(res.meta.status !== 200) return uni.$showMsg("商品轮播数据请求失败"); 
				this.goodsInfo = res.message[0];
			},
			
			//预览大图
			previewImg(i){
				uni.previewImage({
					current: i, //预览时，显示当前urls数组中的第i张图
					urls: this.goodsInfo.pictures_big
				})
			},
			
			//切换收藏状态
			favClick(){
				this.isFav = !this.isFav;
			},
			
			//点击左侧的按钮图标
			clickLeftOptions(e){
				if(e.index === 1){
					// 跳转到购物车页面
					uni.switchTab({
						url:"../../pages/cart/cart"
					})
				}
			},
			//点击右侧的按钮图标
			buttonClick(e){
				if(e.index === 0){ //点击了加入购物车
					let goods = {
						goods_id: this.goodsInfo.goods_id,
						goods_price: this.goodsInfo.goods_price,
						goods_name: this.goodsInfo.goods_name,
						goods_count: 1,
						pictures_small: this.goodsInfo.pictures_small,
						goods_checked: true //商品的选中状态
					}
					//调用vuex的方法，将当前的商品数据作为参数传入
					this.addGoodsToCart(goods);
					uni.$showMsg("加入购物车成功")
				}
			}
		},
		computed:{
			...mapGetters("moduleCart", ["totalGoods"])
		},
		watch:{
			//监听数据的变化，数据产生变化时，会自动触发
			totalGoods:{
				handler(newVal){ //回调
					this.options[1].info = newVal;
				},
				immediate: true //当前的监听的方法会在开始监听之后先调用1次
			}
		},
		onLoad(options){
			this.getGoodsDetail(options.goods_id);
		}	
	}
</script>

<style lang="scss">
	.swiper-wrap{
		height: 750rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.goods-info-wrap{
		padding: 10px;
		.price{
			color: #c60000;
			font-size: 18px;
			font-weight: bold;
			margin: 10px 0;
		}
		.name{
			font-size: 14px;
		}
		.recommend{
			display: flex;
			margin: 10px -0px;
			justify-content: space-between;
			font-size: 14px;
			align-items: center;
			color: #666;
		}
	}
	.goods-detail{
		image{
			display: block;
			width: 750rpx;
		}
	}
	.goods-nav-btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
