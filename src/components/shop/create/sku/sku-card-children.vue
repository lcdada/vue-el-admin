<template>
	<div class="border py-1 px-2 rounded mr-2 position-relative
	d-flex align-items-center">
		<div  v-if="type != 0">
			<!-- 颜色选择 -->
			<el-color-picker size="mini"
			v-if="type === 1"></el-color-picker>
			<!-- 图片选择 -->
			<span class="btn btn-light border" v-else>
				<i class="el-icon-plus"></i>
			</span>
		</div>
		<input v-if="type === 0"  :value="item.name" class="form-control text-center border-0" style="width: 80px;font-size: 15px;">
		<!-- 删除 -->
		<span class="btn btn-light p-0 position-absolute"
		style="line-height: 1;right: -10px;top: -10px;"
		@click="delSkuValue({cardIndex:cardIndex,valueIndex:index})">
			<i class="el-icon-circle-close"></i>
		</span>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default{
		props: {
			type:{
				type: Number,
				default: 0,
			},
			item:Object,
			index:Number,
			cardIndex:Number
		},
		methods: {
			...mapMutations(['delSkuValue'])
		},
	}
</script>

<style>
</style>
