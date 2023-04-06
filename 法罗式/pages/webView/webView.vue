<template>
	<view>
		<web-view src="https://pharos3.ewj100.com/html/privacy.html"></web-view>
		<!-- <web-view src="https://pharos3.ewj100.com/html/index.html"></web-view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onPageScroll : function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			console.log("滚动距离为：" + e.scrollTop);
		},
	}
</script>

<style lang="less">

</style>
