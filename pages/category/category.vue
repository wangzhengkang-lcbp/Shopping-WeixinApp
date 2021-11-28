<template>
	<view>
		<!-- 点击跳转到分包中的搜索页面 -->
		<navigator url="../../subPackages/search/search" >
			<search></search>
		</navigator>
		<view class="scroll-view-wrap">
			<!-- 左侧一级导航  滚动区域-->
			<scroll-view class="l-scroll-view" scroll-y :style="{height: windowH+'px'}">
				<block v-for="(item,i) in categoryList" :key="i">
					<view class="l-scroll-item"  @click="clickChange(i)" :class="i===active?'active':''">
						{{item.cate_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧区域    二级分类 -->
			<scroll-view class="r-scroll-view" scroll-y :style="{height: windowH+'px'}" :scroll-top="scrollTop">
				<view class="level2-nav" v-for="(item2, i2) in categoryLevel2" :key="i2">
					<!-- 二级分类的标题内容 -->
					<view class="level2-nav-title">{{item2.cate_name}}</view>
					<!-- 三级分类的图片区域 -->
					<view class="level3-img-list">
						<view class="level3-img-item" v-for="(item3, i3) in item2.children" :key="i3"  @click="goGoodsList(item3.cate_name)">
							<image :src="item3.cate_icon"></image>
							<text>{{item3.cate_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
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
				windowH:0, //窗口高度
				categoryList:[], //分类的全部数据
				active:0 , //当前选中项的下标
				categoryLevel2:[],  //二级分类的数据
				scrollTop: 0  //滚动距离
			};
		},
		methods:{
			async getCategoryList(){
				const {data:res} = await uni.$http.get("/api/categories/catedata");
				if(res.meta.status !== 200) return uni.$showMsg("分类数据请求失败"); 
				this.categoryList = res.message;
				//初始给第0项赋值二级分类数据
				this.categoryLevel2 = this.categoryList[0].children;
			},
			//一级分类的点击事件
			clickChange(i){
				this.active = i;
				//点击一级分类的item，取到对应项的children
				this.categoryLevel2 = this.categoryList[i].children;
				//点击切换1级分类时，右侧区域的滚动距离回到顶部0/-1的位置
				this.scrollTop = this.scrollTop === 0 ? 1 : 0;
			},
			//点击三级分类的item，跳转到商品列表页面,携带分类名称过去
			goGoodsList(cate_name){
				uni.navigateTo({
					url:"/subPackages/goodsList/goodsList?query="+cate_name
				})
			}
		},
		onLoad(){
			//获取可用高度
			this.windowH = uni.getSystemInfoSync().windowHeight - 50;
			// console.log(uni.getSystemInfoSync().windowHeight);
			this.getCategoryList();
		}
	}
</script>

<style lang="scss">
	.scroll-view-wrap{
		display:flex;
		.l-scroll-view{
			width: 120px;
			.l-scroll-item{
				line-height: 60px;
				text-align: center;
				font-size: 12px;
				background-color: #f7f7f7;
			}
			.l-scroll-item.active{
				background-color: #fff;
				color: #f00;
			}
		}
		.r-scroll-view{
			.level2-nav-title{
				padding: 15px;
				font-size: 12px;
				font-weight: bold;
			}
			.level3-img-list{
				display: flex;
				flex-wrap: wrap;
				.level3-img-item{
					display: flex;
					margin-bottom: 16rpx;
					flex-wrap: wrap;
					flex-direction: column;
					align-items: center;
					width: 33%;
					image{
						width: 60px;
						height: 60px;
					}
					text{
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
