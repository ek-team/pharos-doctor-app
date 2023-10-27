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
			// plus.webview.currentWebview().setStyle({ popGesture: 'hide' }) 
		    var currentWebview = this.$scope.$getAppWebview().children()[0];
		    currentWebview.addEventListener("loaded", function() {
		      currentWebview.evalJS(
		        "$(\"ul.fed-part-rows a[href*='xxx.cn']\").parent().hide();"
		      );
		    });
			// plus.webview.currentWebview().addEventListener('popGesture',e=>{  
			//                             if(e.result){  
			//                                  // 你要做的操作  
			// 								 console.log('监听到返回按钮')
			//                             }  
			//                         })
			
		  },
		  onBackPress(e) {
		    this.$scope
		      .$getAppWebview()
		      .children()[0]
		      .back();
		    return true;
		  }
		
	}
</script>

<style lang="less">

</style>
