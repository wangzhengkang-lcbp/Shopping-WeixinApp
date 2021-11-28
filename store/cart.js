export default {
	namespaced: true, //为当前模块开启命名空间，必须写
	state:{ //状态（数据）
		//初始时先进到本地取数据，有就赋值，没有就赋值空数组
		cart: JSON.parse(uni.getStorageSync("cart") || "[]") //购物车数组
	},
	mutations:{ //方法，用来修改state
		//将数据添加到cart数组
		addGoodsToCart(state, goods){ //第1个参数是当前的state状态    其它参数都是调用该方法时传入的实参值
			let findGoods = state.cart.find(item=>item.goods_id === goods.goods_id)
			if(findGoods){
				//购物车中存在这件商品，只增加数量
				findGoods.goods_count ++ 
			}else{
				//购物车中不存在这件商品，整体push到数组中
				state.cart.push(goods);
			}
			
			// 将购物车数据存到本地
			uni.setStorageSync("cart", JSON.stringify(state.cart));
		},
		
		//通过商品的id删除购物车cart中对应的商品对象
		deleteGoods(state, goods_id){
			//过滤相同id的商品对象，返回新数组
			state.cart = state.cart.filter(item => { //true返回   false过滤
				return item.goods_id !== goods_id
			})
			// 将购物车数据同步存到本地
			uni.setStorageSync("cart", JSON.stringify(state.cart));
		},
		
		//通过商品id修改指定商品的数量
		updateGoodsCount(state, goodsInfo){
			let findGoods = state.cart.find(item=>item.goods_id === goodsInfo.goods_id)
			if(findGoods){
				findGoods.goods_count = goodsInfo.goods_count; //更新商品数量
				uni.setStorageSync("cart", JSON.stringify(state.cart)); //同步到本地
			}
		},
		//通过商品id修改指定商品的选中状态
		updateGoodsChecked(state, goodsInfo){
			let findGoods = state.cart.find(item=>item.goods_id === goodsInfo.goods_id)
			if(findGoods){
				findGoods.goods_checked = goodsInfo.goods_checked; //更新商品状态
				uni.setStorageSync("cart", JSON.stringify(state.cart)); //同步到本地
			}
		},
		
		//修改全部商品的勾选状态
		updateAllGoodsChecked(state, newState){
			state.cart.forEach(item => item.goods_checked = newState);
			uni.setStorageSync("cart", JSON.stringify(state.cart)); //同步到本地
		}
	},
	getters:{ //计算属性，依赖state来做运算并返回结果。 （要有返回值）
		//统计购物车中商品的总数量
		totalGoods(state){
			let n = 0;
			state.cart.forEach((item)=>{
				n += item.goods_count; //累加商品的数量
			})
			return n;
		},
		
		// 统计所有勾选的商品数量
		checkedGoodsSum(state){
			let findGoods = state.cart.filter(item => item.goods_checked) //提取出所有选中的商品
			// let t = 0;
			// findGoods.forEach(item=>{
			// 	t += item.goods_count
			// })
			// return t;
			return  findGoods.reduce((t, item) => t += item.goods_count, 0);
		},
		// 统计已选中的商品的总价格
		checkedGoodsTotal(state){
			let findGoods = state.cart.filter(item => item.goods_checked) //提取出所有选中的商品
			return  findGoods.reduce((t, item) => t += item.goods_count * item.goods_price, 0).toFixed(2);
		}
	}
}