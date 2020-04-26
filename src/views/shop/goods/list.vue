<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1rem; margin-bottom: 0!important;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
		    <el-tab-pane :label="tab.name" v-for="(tab,tabI) in tabbars" :key="tab.key">
				
				<button-search ref="buttonSearch" placeholder="要搜索的商品" @search="searchEvent">
					<!-- 左边 -->
					<template #left>
						<router-link :to="{name:'shop_goods_create'}">
							<el-button type="success" size="mini">发布商品</el-button>
						</router-link>
						<el-button type="danger" size="mini">批量删除</el-button>
					</template>
					<!-- 高级搜索 -->
					<template #form>
						<el-form inline ref="form" :model="form" label-width="80px">
							<el-form-item label="商品名称">
								<el-input v-model="form.name" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="商品编码" class="mb-0">
								<el-input v-model="form.name" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="商品类型" class="mb-0">
								<el-select v-model="form.type" placeholder="请选择商品类型" size="mini">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="商品分类" class="mb-0">
								<el-input v-model="form.name" size="mini"></el-input>
							</el-form-item>
							<el-form-item class="mb-0">
								<el-button type="info" size="mini"@click="searchEvent">搜索</el-button>
								<el-button size="mini" @click="clearSearch">清空删选条件</el-button>
							</el-form-item>
						</el-form>
					</template>
				</button-search>
				<!-- 商品列表 -->
				<el-table border class="mt-3"
				  :data="tableData[tabI].list"
				  style="width: 100%"
				  @selection-change="handleSelectionChange">
				  <el-table-column
					type="selection"
					width="45" align="center">
				  </el-table-column>
				  <el-table-column
					label="商品"
					width="300">
					<template slot-scope = "scope">
						<div class="media">
						  <img class="mr-3" style="width: 60px;height: 60px;" :src="scope.row.cover">
						  <div class="media-body">
						    <p class="mt-0">{{scope.row.title}}</p>
						    <p class="mb-0">分类：{{scope.row.category}}</p>
						    <p class="mb-0">时间：{{scope.row.create_time}}</p>
						  </div>
						</div>
					</template>
				  </el-table-column>
				  <el-table-column
					prop="type" align="center"
					label="商品类型"
					>
				  </el-table-column>
				  <el-table-column
					prop="sale_count" align="center"
					label="实际销量">
				  </el-table-column>
				  <el-table-column
					align="center" prop="order"
					label="商品排序"
					>
				  </el-table-column>
				  <el-table-column
					prop="status" align="center"
					label="商品状态"
					> 
					<template slot-scope="scope">
						
						<el-button
						type="success"
						size="mini"
						@click="scope.row.ischeck = 1"
						plain>审核通过
						</el-button>
						
						<el-button class="ml-0 mt-2"
						type="danger"
						size="mini"
						@click="scope.row.ischeck = 2"
						plain>审核通过
						</el-button>
						
						<!-- <el-button 
						:type="scope.row.status ? 'success' : 'danger'"
						size="mini"
						@click="changeStatus(scope.row)"
						plain>{{scope.row.status ? '上架' : '下架'}}
						</el-button> -->
					</template>
				  </el-table-column>
				  <el-table-column
					prop="stock" align="center"
					label="总库存">
				  </el-table-column>
				  <el-table-column
					prop="pprice" align="center"
					label="价格"
					>
				  </el-table-column>
				  <el-table-column
					label="操作"
					width="150px">
					<template slot-scope="scope">
						<el-button-group>
							<el-button type="primary" size="mini" plain>编辑</el-button>
							<el-button type="danger" size="mini" plain @click="deleteItem(scope.$index)">删除 </el-button>
						</el-button-group>
					</template>
				  </el-table-column>
				</el-table>
				<div style="height: 60px;"></div>
				<el-footer class="border-top d-flex align-items-center px-0  position-fixed bg-white" 
				style="bottom: 0;left: 200px;right: 0; z-index: 100;">
					<!-- 底部 -->
					<div style="flex:1" class="px-2">
						<el-pagination
						  :current-page="tableData[tabI].currentPage"
						  :page-sizes="[100, 200, 300, 400]"
						  :page-size="100"
						  layout="total, sizes, prev, pager, next, jumper"
						  :total="400">
						</el-pagination>
					</div>
				</el-footer>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import buttonSearch from "@/components/common/button-search.vue"
	 export default{
		 components:{
			 buttonSearch
		 },
		 data() {
		 	return {
		 		tabIndex: 0,
				tabbars:[
					{ name:"审核中",key:"checking"},
					{ name:"出售中",key:"saling"},
					{ name:"已下架",key:"off"},
					{ name:"库存预警" ,key:"min_stock"},
					{ name:"回收站" ,key:"delete"},
				],
				// 高级搜索
				form:{
					title:"",
					category_id:"",
					name:"",
					code:"",
					type:"",
					category:"",
				},
				tableData: [],
				multipleSelection: []
		 	}
		 },
		 created() {
		 	this.__getData()
		 },
		  methods: {
			  // 生成数据
			  __getData(){
				  for (let i = 0; i < this.tabbars.length; i++) {
						this.tableData.push({
							currentPage:1,
							list:[]
						})
						for (let j = 0; j < 20; j++) {
							this.tableData[i].list.push({
								id:j,
								title:"荣耀v10 全网通"+i+"-"+j,
								titlepic:"",
								create_time:"2019-09-09 18:37:12",
								pprice:1000,
								category:"手机",
								type:"普通商品",
								cover:"https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1208538952,1443328523&fm=26&gp=0.jpg",
								order:100,
								status:1,
								stock:200,
								// 0审核 1通过 2 未通过
								ischeck:1
							})
						}
				  }
			  },
			  // 上下架
			  changeStatus(item){
				  item.status = item.status === 1 ? 0 : 1
			  },
			  // 删除当前商品
			  deleteItem(index){
				  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				  	confirmButtonText: '确定',
				  	cancelButtonText: '取消',
				  	type: 'warning'
				  }).then(() => {
				  	this.tableData[this.tabIndex].list.splice(index,1) 
				  })
				  
			  },
			   handleClick(tab, event) {
				 console.log(tab, event);
			   },
			   // 清空删选条件
			   clearSearch(){
				   this.form = {
						title:"",
						category_id:"",
						name:"",
						code:"",
						type:"",
						category:"",
						cover:'',
						category:"",
						create_time:""
					},
					this.$refs.buttonSearch[this.tabIndex].closeSuperSearch()
			   },
			   // 搜索
			   searchEvent(e = false){
				   
				   // 简单搜索
				   if(e){
					    console.log('简单搜索事件',e)
				   }
				   // 高级搜索
				   console.log('搜索事件') 
			   },
			     handleSelectionChange(val) {
				   this.multipleSelection = val;
				 }
		 }
	 }
</script>

<style>
</style>
