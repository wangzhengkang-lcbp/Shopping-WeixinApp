<template>
	<view>
		<view class="search-wrap">
			<uni-search-bar @input="input" placeholder="搜索" radius="20" cancelButton="none" bgColor="#fff"></uni-search-bar>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history-wrap" v-if="searchResult.length === 0">
			<view class="search-history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="14" @click="clearHistory"></uni-icons>
			</view>
			<view class="search-history-list">
				<uni-tag :text="item" v-for="(item,i) in history" :key="i" @click="goGoodsList(item)"></uni-tag>
			</view>
		</view>
		<!-- 搜索结果列表 -->
		<view class="search-result-list" v-else>
			<view class="search-result-item" v-for="(item, i) in searchResult" :key="i" @click="goGoodsDetail(item.goods_id)">
				<uni-icons type="search" size="18"></uni-icons>
				<view class="goods-name">{{item.goods_name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchResult:[],//搜索结果的数据
				keywords:"", //搜索的关键词内容
				timer:null,
				historyData:[] //历史数据数组
			};
		},
		computed:{
			history(){
				return [...this.historyData].reverse(); //倒序排序数组
			}
		},
		methods:{
			input(value){ //value是输入框内的内容
				clearTimeout(this.timer); //停止上一个settimeout的执行
				this.timer = setTimeout(()=>{
					this.keywords = value;
					if(this.keywords === ""){
						this.searchResult = [];
					}else{
						//根据用户输入的关键词，发起请求得到搜索结果
						this.getSearchDataList();	
					}
				}, 500)
			},
			//请求获取搜索结果的数据
			async getSearchDataList(){
				const {data:res} = await uni.$http.get("/api/search/qs", {
					query:this.keywords   //携带的请求参数
				});
				if(res.meta.status !== 200) return uni.$showMsg("轮播数据请求失败"); 
				this.searchResult = res.message;
				this.saveHistory();
			},
			//处理搜索记录，并存储到历史数组中
			saveHistory(){
				// this.historyData.push(this.keywords); //每次搜索请求时，将关键词存到历史数组
				// 顺序 / 关键词重复
				let set = new Set(this.historyData);
				set.delete(this.keywords); //删除重复值
				set.add(this.keywords); //往set中追加数据
				// console.log(set);
				this.historyData = Array.from(set);
				
				//存储到本地
				uni.setStorageSync('s_history', JSON.stringify(this.historyData));
				
			},
			//清空历史记录
			clearHistory(){
				//清空数组
				this.historyData = [];
				//清空本地的记录
				uni.setStorageSync('s_history', "[]");
			},
			
			//跳转到商品详情，并传递商品的id
			goGoodsDetail(goods_id){
				uni.navigateTo({
					url:"/subPackages/goodsDetail/goodsDetail?goods_id="+goods_id
				})
			},
			//点击搜索历史，跳转到关键词搜索的结果列表
			goGoodsList(item){
				uni.navigateTo({
					url:"/subPackages/goodsList/goodsList?query="+item
				})
			}
		},
		onLoad(){
			this.historyData = JSON.parse(uni.getStorageSync("s_history") || "[]" ) 
		}
	}
</script>

<style lang="scss">
	.search-wrap{
		background-color: #c82523;
	}
	.search-result-list{
		.search-result-item{
			padding: 10px 0 10px 6px;
			border-bottom: 1px solid #f8f8f8;
			display: flex;
			justify-content: center;
			.goods-name{
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 14px;
				color: #3f3f3f;
			}
		}
		
	}
	
	.search-history-wrap{
		padding: 0 10px;
		.search-history-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 14px;
			border-bottom: 1px solid #d0d0d0;
		}
		.search-history-list{
			margin-top: 6px;
			.uni-tag{
				margin: 0 6px;
			}
		}
	}
</style>
