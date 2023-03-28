<template>
	<view>
		<web-view src='http://mp.weixin.qq.com/mp/homepage?__biz=MzUyNDkxMzMyNw==&hid=5&sn=b5fe982b9c9e10f2d1f9e35e2f4337f5&scene=18#wechat_redirect'></web-view>
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
		onReady() {
		    var currentWebview = this.$scope.$getAppWebview().children()[0];
		    currentWebview.addEventListener("loaded", function() {
		      currentWebview.evalJS(
		        "$(\"ul.fed-part-rows a[href*='xxx.cn']\").parent().hide();"
		      );
		    });
		  },
		  onBackPress(e) {
		    this.$scope
		      .$getAppWebview()
		      .children()[0]
		      .back();
		    return true;
		  }
		// onReady() {
		// 			var pages = getCurrentPages();
		// 			var page = pages[pages.length - 1];
		// 			var currentWebview = page.$getAppWebview();
		// 			var url = currentWebview.children()[0].getURL();
		// 			console.log('=== url ===', url);
		// 			var wv = currentWebview.children()[0];
		// 			wv.overrideUrlLoading({
		// 				mode: 'reject',
		// 				match: '.*'
		// 			}, function(e) {
		// 				console.log('reject url: ' + e.url);
		// 				uni.navigateTo({
		// 					url: `/pages/webbox/webbox?weburl=${e.url}`
		// 				})
		// 			});
		// 		},
		// 		onBackPress(e) {
		// 			let pages = getCurrentPages()
		// 			let page = pages[pages.length - 1];
		// 			let currentPages = page.$getAppWebview()
		// 			currentPages.close()
		// 			return false
		// 		},
	}
</script>

<style lang="less">

</style>
