import {mapGetters}  from "vuex"
export default {
	computed:{
		...mapGetters("moduleCart", ["totalGoods"]),
	},
	methods:{
		//设置tabbar上购物车的数字角标
		setCartBadge(){
			uni.setTabBarBadge({
				index: 2,
				text: this.totalGoods+""   
			})
		}
	},
	watch:{
		//监听totalGoods数据值的变化
		totalGoods(){
			this.setCartBadge(); 
		}
	},
	onShow(){
		this.setCartBadge();
	}
}