<template>
	<view>
		<view class="search-wrap">
			<!-- 模拟的搜索框 -->
			<view class="search-box">
				<uni-icons type="search" size="18"></uni-icons>
				<text>搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.search-wrap{
		padding: 5px 10px;
		height: 50px;
		background-color: #c82523;
		.search-box{
			display: flex;
			align-items: center;
			justify-content: center;
			height: 40px;
			background-color: #fff;
			border-radius: 20px;
			text{
				margin-left: 6px;
				font-size: 14px;
			}
		}
	}
</style>
