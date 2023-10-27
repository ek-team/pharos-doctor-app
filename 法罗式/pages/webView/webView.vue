<template>
	<view>
		<!-- <web-view src="http://192.168.9.20:10011/html/privacy.html"></web-view> -->
		<web-view src="http://192.168.9.20:10011/html/index.html"></web-view>
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
