<template>
	<!-- 商品当前项 -->
	<view class="goods-item" >
		<!-- 左侧 -->
		<view class="goods-item-l">
			<radio v-if="showRadio" color="#f00" @click="radioChecked" :checked="goodsInfo.goods_checked"></radio>
			<image :src="goodsInfo.pictures_small[0]" class="goods-img"></image>
		</view>
		<!-- 右侧 -->
		<view class="goods-item-r">
			<view class="goods-name">{{goodsInfo.goods_name}}</view>
			<view class="goods-info">
				<view class="goods-price">￥{{goodsInfo.goods_price}}</view>
				<uni-number-box v-if="showNumber" :value="goodsInfo.goods_count" :min="1" @change="changeNumber"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goods",
		//props接收父组件传来的数据
		props:{
			goodsInfo:{
				type: Object,
				default:{} //默认值为空对象
			},
			showRadio:{
				type: Boolean,
				default:false
			},
			showNumber:{
				type: Boolean,
				default:false
			}
		},
		data() {
			return {
				active:false
			};
		},
		methods:{
			radioChecked(){
				// this.active = !this.active;
				//在子组件内部，调用父组件给它绑定的@change-checked事件
				this.$emit("change-checked", {
					goods_id: this.goodsInfo.goods_id,
					goods_checked: !this.goodsInfo.goods_checked //状态取反
				})
			},
			//点击修改数量时触发
			changeNumber(val){
				//在子组件内部，调用父组件给它绑定的change-num事件
				this.$emit("change-num", {
					goods_id: this.goodsInfo.goods_id,
					goods_count: val //商品的最新数量
				})
			}
		}
	}
	/**
	 * 定义组件时，一般考虑组件的复用性
	 * 谁使用了这个组件，谁就给这个组件传数据进去
	 * 数据的可控性：谁的数据谁负责修改
	 */
</script>

<style lang="scss">
	.goods-item{
		width: 750rpx;
		display: flex;
		padding: 6px;
		border-bottom: 1px solid #f0f0f0;
		box-sizing: border-box;
		.goods-item-l{
			display: flex;
			align-items: center;
			.goods-img{
				display: block;
				width: 100px;
				height: 100px;
			}
		}
		.goods-item-r{
			display: flex;
			margin-left: 6px;
			flex-direction: column;
			justify-content: space-between;
			.goods-name{
				font-size: 14px;
			}
			.goods-info{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.goods-price{
					font-size: 16px;
					color: #f00;
				}
			}
		}
	}
</style>
