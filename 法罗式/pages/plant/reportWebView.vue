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
			// console.log(getApp().globalData.docInfo.id)
			
			this.baseUrl = 'https://pharos3.ewj100.com/record.html#/ucenter/recovery/recoveryInfo?idCard='+options.idCard
			// this.baseUrl = 'https://pharos3.ewj100.com/record.html#/ucenter/recovery/comprehensiveById?userId='+getApp().globalData.docInfo.id
		},
	}
</script>

<style lang="less">

</style>
