<template>
	<view class="login">

		<input type="text" placeholder="请输入手机号" v-model="username" class="loginInput">
		<input type="text" placeholder="请输入密码" v-model="password" class="loginInput">
		<view class="sublimt" @click="login">
			登录
		</view>
		<view class="sublimt" @click="register">
			注册
		</view>
		<view class="xy flexAC">
			<view class="flexA" style="margin-right: 20rpx;" @click="agreen=false">
				<image :src="agreen?'/static/images/icon_cho@2x.png':'/static/images/icon_cli@2x.png'"
					class="changeIcon" mode=""></image>
				拒绝
			</view>
			<view class="flexA" @click="agreen=!agreen">
				<image :src="!agreen?'/static/images/icon_cho@2x.png':'/static/images/icon_cli@2x.png'"
					class="changeIcon" mode=""></image>
				同意
			</view>
			<text @click="isAgree = true">《法罗适隐私政策》</text>
		</view>
		<Privacy v-if="isAgree" @agreePre="agreePre"></Privacy>
	</view>
</template>

<script>
	import WebSocketClass from '../../common/webSocket'
	import Privacy from '@/components/privacy.vue'
	export default {
		data() {
			return {
				username: '',
				password: '',
				agreen: false,
				isAgree: true
			};
		},
		onLoad() {

		},
		onShow() {
			// this.login()
		},
		components: {
			Privacy
		},
		methods: {
			agreePre() {
				this.isAgree = false
				this.agreen = false
			},
			register() {
				console.log('执行了')
				uni.navigateTo({
					url: '/pages/index/register'
				})

			},
			login() {

				let data = {
					username: this.username,
					password: this.password,
					randomStr: '55711671529860129&amp',
					code: '&amp',
					grant_type: 'password'
				}
				if (this.agreen) {
					this.api.login(data).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.setStorageSync('userInfoFLS', res.data)
							getApp().globalData.userInfo = res.data
							console.log('用户信息--->'+res.data)
							this.api.docInfo().then(res => {
								if (res.code == 0) {

									getApp().globalData.docInfo = res.data
									console.log('医生信息--->'+getApp().globalData.docInfo.nickname)
									console.log('医生信息--->'+getApp().globalData.docInfo.id)
									// 连接socket
									if (getApp().globalData.socketObj) {
										// 如果sockt实例未连接
										if (!getApp().globalData.socketObj.isConnect) {
											getApp().globalData.socketObj.initSocket()
										}
									} else {
										// 如果没有sockt实例，则创建
										getApp().globalData.socketObj = new WebSocketClass(
											`${getApp().globalData.socketUrl}`, 60
										)

										getApp().globalData.socketObj.initSocket()




										// uni.$on('message',that.getMessage)
										// setTimeout(function(){
										// 	that.sendMsg('reder')
										// },500)

									}
								}

							})

							uni.switchTab({
								url: '/pages/index/index'
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				} else {
					uni.showToast({
						title: '请阅读并同意法罗适用户协议与隐私政策',
						icon: 'none'
					})
				}


			}
		}
	}
</script>

<style lang="less" scoped>
	.login {
		min-height: 100vh;
		background-color: #fff;

		.loginInput {
			width: 620rpx;
			padding: 50rpx 0;
			border-bottom: 1px solid #F2F2F2;
			margin: 0 auto;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}

		.sublimt {
			width: 616rpx;
			height: 88rpx;
			background: rgba(55, 142, 255, 1);
			margin: 40rpx auto;
			border-radius: 20rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 88rpx;
			text-align: center;
			color: #FFFFFF;
		}

		.xy {

			.changeIcon {
				width: 28rpx;
				height: 28rpx;
				display: flex;
				align-items: center;

			}

			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #6666;

			text {
				color: #378EFF;
			}
		}
	}
</style>
