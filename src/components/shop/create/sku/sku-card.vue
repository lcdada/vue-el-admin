<template>
	<div class="card mb-3" style="line-height: 1.2;">
		<div class="card-header d-flex align-items-center">
			规格项：
			<el-input  size="mini" style="width: 200px;" 
			:value="item.name" @input="vModel('name',index,$event)">
				<el-button slot="append" icon="el-icon-more"
				@click="chooseSkus"></el-button>
			</el-input>
			<el-radio-group size="mini"
			:value="item.type" @input="vModel('type',index,$event)"
			style="margin-bottom: -10px;" class="ml-2">
				<el-radio :label="0">无</el-radio>
				<el-radio :label="1">颜色</el-radio>
				<el-radio :label="2">图片</el-radio>
			</el-radio-group>
			<!-- 上移 -->
			<el-button size="mini" icon="el-icon-top" class="ml-auto"
			@click="sortCard('moveUp',index)" 
			:disabled="index===0"></el-button>
			<!-- 下移 -->
			<el-button size="mini" icon="el-icon-bottom"
			@click="sortCard('moveDown',index)"
			:disabled="total === (index+1 )"></el-button>
			<el-button size="mini" type="text" @click="delSkuCard(index)">删除</el-button>
		</div>
		<div class="card-body">
			<!-- 规格属性列表 -->
			<div class="d-flex align-items-center flex-wrap">
				<sku-card-children :type="item.type"
				v-for="(item2,index2) in list"
				:key="index2" :item="item2"
				:index="index2" :cardIndex="index" 
				v-dragging="{ item: item2, list: list, group: `skuItem${index}` }"
				></sku-card-children>
			</div>
			<!-- 增加规格属性 -->
			<div class="mt-2">
				<el-button type="text" size="mini" icon="el-icon-plus"
				@click="addSkuValue(index)">
					增加规格值
				</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import skuCardChildren from './sku-card-children.vue'
	import {mapState,mapMutations} from 'vuex'
	export default{
		inject:['app'],
		props: {
			item: Object,
			index:Number,
			total:Number
		},
		components:{
			skuCardChildren
		},
		data() {
			return {
				list: this.item.list
			}
		},
		mounted () {
			this.$watch('item.list',(newValue,oldValue) => {
				// console.log(newValue)
				this.list = newValue
			})
		    // this.$dragging.$on('dragged', ({ value }) => {
		      
		    // })
		    this.$dragging.$on('dragend', (e) => {
				// console.log(e)
				if(e.group === 'skuItem'+this.index){
					this.sortSkuValue({
						index:this.index,
						value:this.list
					})
				}
		    })
		},
		methods: {
			...mapMutations(['delSkuCard','vModelSkuCard','sortSkuCard','addSkuValue','sortSkuValue']),
			vModel(key,index,value){
				this.vModelSkuCard({key,index,value})
			},
			// 排序规格卡片
			sortCard(action,index){
				this.sortSkuCard({action,index})
			},
			// 选择规格
			chooseSkus(){
				this.app.chooseSkus( (res)=>{
					console.log(res)
					this.vModel('name',this.index,res.name)
					this.vModel('type',this.index,res.type)
					this.vModel('list',this.index,res.list)
					this.list = res.list
				})
			},
		},
	}
</script>

<style>
</style>
