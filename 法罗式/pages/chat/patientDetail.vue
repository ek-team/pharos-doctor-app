<template>
	<view class="patientDetail">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="addPatient">
				<image src="/static/images/icon_me@2x.png" mode="" class="slotRighticon"></image>
			</view>
		</hx-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{//自定义头部配置信息
					title: '患者详情',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:true,
				},
			};
		},
		onLoad(option) {
			console.log(option)
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped>
.patientDetail{
	
}
</style>
