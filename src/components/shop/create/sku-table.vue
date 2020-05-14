<template>
	<table class="table table-sm table-bordered">
	  <thead>
	    <tr>
	      <th scope="col" class="text-center"
			  style="vertical-align: middle;"
			  v-for="(th,thi) in tableThs" :key="thi"
			  :rowspan="th.rowspan" :colspan="th.colspan"
		  >{{th.name}}</th>
	    </tr>
		<tr>
		  <th scope="col" class="text-center"
			  style="vertical-align: middle;"
			  v-for="(th,thi) in sku_card" :key="thi"
			  rowspan="1" colspan="1"
		  >{{th.name}}</th>
		</tr>
	  </thead>
	  <tbody>
	   <tr v-for="(item,index) in list" :key="index">
	     <!-- 商品规格 -->
	     <th scope="row" v-for="(sku,skuI) in item.skus"
	     :key="skuI" class="text-center">{{sku.value}}</th>
	     <td class="text-center" width="100">
			  <span v-if="!item.image" class="btn btn-light border mr-2"
			   @click="chooseImage(item)">
				<i class="el-icon-plus"></i>
			  </span>
			  <img v-else :src="item.image" class="rounded" 
			  style="width: 45px;height: 45px;cursor: pointer;" @click="chooseImage(item)"/>
	     </td>
	     <td class="text-center" width="100">
	   	<input type="number" v-model="item.pprice" class="form-control text-center"/>
	     </td>
	     <td class="text-center" width="100">
	   	<input type="number" v-model="item.oprice" class="form-control text-center"/>
	     </td>
	     <td class="text-center" width="100">
	   	<input type="number" v-model="item.cprice" class="form-control text-center"/>
	     </td>
	     <td class="text-center" width="100">
	   	<input type="number" v-model="item.stock" class="form-control text-center"/>
	     </td>
	     <td class="text-center" width="100">
	   	<input type="number" v-model="item.volume" class="form-control text-center"/>
	     </td>
	     <td class="text-center" width="100">
	   	<input type="number" v-model="item.weight" class="form-control text-center"/>
	    </td>
	     <td class="text-center" width="100">
	   	<input type="text" v-model="item.code" class="form-control text-center"/>
	     </td>
	   </tr>
	  </tbody>
	</table>
</template>

<script>
	import {mapGetters,mapState} from 'vuex'
	
	export default {
		inject:['app'],
		data() {
			return {
				list: []
			}
		},
		computed: {
			...mapGetters(['tableThs','tableData','skuLabels']),
			...mapState({
				sku_card:state => state.goods_create.sku_card
			})
		},
		watch:{
			tableData(newValue,oldValue){
				this.list = newValue
			}
		},
		methods: {
			// 选择图片方法
			chooseImage(item){
				this.app.chooseImage((res) =>{
					// console.log(res)
					// this.vModel('image',res[0].url)
					console.log(item)
					item.image = res[0].url
				},1)
			}
		},
		mounted() {
			this.list = this.tableData
			// console.log(this.tableData)
		}
	}
</script>

<style>
</style>
