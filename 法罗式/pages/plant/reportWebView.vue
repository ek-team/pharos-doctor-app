<template>
	<view>
		<web-view :src="baseUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl:''
			};
		},
		onLoad(options) {
			
			
			this.baseUrl = 'https://home.ekang.tech/record.html#/ucenter/recovery/recoveryInfo?idCard='+options.idCard
			console.log(this.baseUrl)
			// this.baseUrl = 'https://home.ekang.tech/record.html#/ucenter/recovery/comprehensiveById?userId='+getApp().globalData.docInfo.id
		},
	}
</script>

<style lang="less">

</style>
