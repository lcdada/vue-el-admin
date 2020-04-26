
import $Util from '@/common/util.js'
export default {
	state:{
		skus_type:0,
		title: "",// 商品名称
		category: [],
		desc:"",
		unit:"",
		stock:0,
		min_stock:0,
		display_stock:0,
		status:0,
		express:"",
		
		banners:[], // 商品大图
		
		oprice:0, // 市场价格
		pprice:0, // 销售价格
		cprice:0, // 成本价格
		weight:0, // 重量
		volume:0, // 体积
		// 规格卡片
		sku_card:[
			{
				name:"颜色",
				type:0,//规格类型0无1颜色2图片
				list:[
					{
						name:"黄色",
						image:"",
						color:""
					},
					{
						name:"红色",
						image:"",
						color:""
					}
				] 
			}
		]
	},
	getters:{
		
	},
	mutations:{
		// 修改state
		vModelState(state,{key,value}){
			state[key] = value
			console.log(value)
		},
		// 增加规格卡片
		addSukCard(state){
			state.sku_card.push({
				name:"规格名称",
				type:'0',
				list:[]
			})
		},
		// 删除规格卡片
		delSkuCard(state,index){
			state.sku_card.splice(index,1)
		},
		// 修改卡片 
		vModelSkuCard(state,{key,index,value}){
			state.sku_card[index][key] = value 
		},
		// 规格卡片排序
		sortSkuCard(state,{action,index}){
			$Util[action](state.sku_card,index)
		},
		// 增加指定规格卡片的规格属性
		addSkuValue(state,index){
			console.log(state)
			console.log(index)
			state.sku_card[index].list.push({
				name:'规格名称',
				image:"",
				color:""
			})
		},
		// 删除指定规格卡片的规格属性
		delSkuValue(state,{cardIndex,valueIndex}){
			state.sku_card[cardIndex].list.splice(valueIndex,1)
		}
	},
	actions:{
		
	}
}