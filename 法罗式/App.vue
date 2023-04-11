<script>
	import WebSocketClass from 'common/webSocket'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if(uni.getStorageSync('userInfoFLS')){
				this.globalData.userInfo = uni.getStorageSync('userInfoFLS')
				uni.switchTab({
					url:'/pages/index/index',
					success() {
						// #ifdef APP-PLUS
						plus.navigator.closeSplashscreen()
						// #endif
					}
				})
			}else{
				uni.reLaunch({
					url:'/pages/index/login',
					success() {
						// #ifdef APP-PLUS
						 plus.navigator.closeSplashscreen()
						 // #endif
					}
				})
			}
			if(!plus.runtime.isAgreePrivacy()){
			    //弹出自定义隐私政策提示框
			  }
		},
		onShow: function() {
			// #ifdef APP-PLUS
			plus.runtime.setBadgeNumber(0);
			console.log(uni.getSystemInfoSync().statusBarHeight)
			if (uni.getSystemInfoSync().platform == 'android') {
				// 当前平台是安卓时
				plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
					let data = {
					  version: widgetInfo.version,
					  model: "Android"
					}
					this.api.appVersionUpdate(data).then(res => {
						 console.log(res)
						 if (res.code == 0) {
						       var urlData = res.data;
						       if(urlData){
								   uni.showModal({
										title: '是否进行更新?',
										// content: '本次更新内容：\n1、运费、发送订单\n2、退出app后收到消息在通知栏显示\n3、转诊选择医生加上医助选择',
										success: (res) => {
											if (res.confirm) {
											    uni.showLoading({
													title: '下载安装中请稍等',
													mask: true,
												})
												uni.downloadFile({
													url: urlData.apkUrl,
													success: (downloadResult) => {
														 if (downloadResult.statusCode == 200){
															 plus.runtime.install(downloadResult.tempFilePath, {force: false},
																function() {
																  // uni.showToast({
																  //  title: '更新成功',
																  //  icon: 'none'
																  // })
																  plus.runtime.restart()
																},
																function(e) {
																	 uni.showToast({
																	  title: '更新失败',
																	  icon: 'none'
																	 })
																}
															)
														 }
													}
												})

											}else if (res.cancel) {
											   console.log('用户点击了取消')
											}
										},
										fail(res) {
										  uni.showToast({
										   title: '下载失败',
										   icon: 'none'
										  })
										}

									})

							   }
						}
					})
				})
			} else if (uni.getSystemInfoSync().platform == 'ios') {
				 plus.runtime.getProperty(plus.runtime.appid, (widgetInfo)=>{
					let data = {
					   version: widgetInfo.version,
					   model: "ios"
					}
					 this.api.appVersionUpdate(data).then(res => {
						 console.log(res)
						  if (res.code == 0) {
							   if (res.data) {
								    uni.showModal({
										  title: '是否进行更新？',
										  success: (res) => {
											    if (res.confirm) {
													var appleId =1621920994; //apple id  在 app conection 上传的位置可以看到  https://appstoreconnect.apple.com/
													plus.runtime.launchApplication(
														{action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`},
														function(e) {
															console.log(
															  'Open system default browser failed: ' +e.message
															);
														}
													)
												}else if (res.cancel) {
													 uni.showToast({
													  title: '取消更新',
													  icon: 'none'
													 })

												}
										  },
										   fail: (res) => {console.log(res.errMsg) }
									})

							   }
						  }
					 })
				 })
			}
			
			// #endif
			// return
			this.api.docInfo().then(res=>{
				if(res.code == 0){
					getApp().globalData.docInfo = res.data
					this.docInfos = res.data
					if (this.globalData.socketObj) {
						// 如果sockt实例未连接
						if (!this.globalData.socketObj.isConnect) {
						  this.globalData.socketObj.initSocket()
						}
						// console.log('sockt实例未连接',this.globalData.socketObj)
					} else {
						// 如果没有sockt实例，则创建
						this.globalData.socketObj = new WebSocketClass(
						  `${this.globalData.socketUrl}`,60
						)
						// console.log('创建实例')
						this.globalData.socketObj.initSocket()
						// console.log('APP.vue连接socket',this.globalData.socketObj)
						
					} 
				}
			})
			


		},
		onHide: function() {
			console.log('App Hide')
			if (this.globalData.socketObj){
				this.globalData.socketObj.sendCloseSocket();
				this.globalData.socketObj.closeSocket()
				this.globalData.socketObj = null  
				
				// console.log('退出')
			}
			
		},
		reciveMsg(res){
			
		},
		globalData:{
			userInfo:null,//用户信息
			docInfo:null,//医生信息
			socketObj:null,
			// socketUrl:'wss://api.jhxiao-school.com/ws',
			socketUrl:'wss://pharos3.ewj100.com/ws',
			// callback:function() {},
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
