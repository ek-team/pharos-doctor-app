<template>
	<view class="container">
		<view class="infoBox" @click="exit">
			退出登录
			<uni-icons type="right" size="14"></uni-icons>
		</view>
		<view class="infoBox" @click="editPassword">
			修改密码
			<uni-icons type="right" size="14"></uni-icons>
		</view>
		<view class="infoBox" @click="logout">
			注销用户
			<uni-icons type="right" size="14"></uni-icons>
		</view>
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="infoBox" >
			<text>当前版本</text>
			<view class="">
				<text>V {{version}}</text>
			</view>
		</view> -->
		<!-- #endif -->
		<!-- <view class="logout" @click="exit">
			退出登录
		</view> -->
		<!-- 添加常用语 -->
		<u-popup :show="showPop" mode='center' :round="10" >
			<view class="metaDialog">
				<view class="metaTitle">
					修改密码
				</view>
				<view class="meta">
					<input type="password" placeholder="请输入新密码" placeholder-class="formPlaceholder" class="formItem"
						v-model="password" />
						<input type="password" placeholder="请再次输入密码" placeholder-class="formPlaceholder" class="formItem"
						v-model="passwordAgain" />
				</view>
				<view class="noteOperate">
					<view class="cancelNote" @click="cancelEdit">
						取消
					</view>
					<view class="confirmNote" @click="confirmSubmit">
						确认
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPop:false,
				version: null,
				password:null,
				passwordAgain:null,
				docInfo:{},
			};
		},
		onShow() {
			if(getApp().globalData.docInfo){
				this.docInfo = getApp().globalData.docInfo
				console.log('医生信息',this.docInfo)
			}
		},
		methods: {
			// 退出登录
			exit() {
				uni.showModal({
					title: '确认登出',
					content: '退出后不会删除任何历史数据',
					success: function(res) {
						if (res.confirm) {
							uni.clearStorageSync();
							getApp().globalData.socketObj.sendCloseSocket()
							getApp().globalData.socketObj.closeSocket()
							getApp().globalData.socketObj=null
							uni.redirectTo({
								url: '../index/login'
							})
						} else if (res.cancel) {

						}
					}
				});
			},
			logout() {
				let _this = this
				
				uni.showModal({
					title: '确认注销',
					content: '注销后将删除你的所有数据',
					success: function(res) {
						if (res.confirm) {
							_this.api.logoutUser().then(res=>{
								if(res.code==0){
									uni.showToast({
										title:'注销成功！',
										icon:'none'
									})
									setTimeout(()=>{
										uni.clearStorageSync();
										getApp().globalData.socketObj.sendCloseSocket()
										getApp().globalData.socketObj.closeSocket()
										getApp().globalData.socketObj=null
										uni.redirectTo({
											url: '../index/login'
										})
									},500)
								}else{
									uni.showToast({
										title:'注销失败！'+res.code,
										icon:'none'
									})
								}
							})
							
						} else if (res.cancel) {
			
						}
					}
				});
			},
			editPassword(){
				this.showPop=true
			},
			cancelEdit(){
				this.showPop=false
			},
			confirmSubmit(){
				if(!this.password){
					uni.showToast({
						title:'请输入密码！',
						icon:'none'
					})
					return
				}
				if(this.password != this.passwordAgain){
					uni.showToast({
						title:'两次密码不一致！',
						icon:'none'
					})
					return
				}
				this.api.userUpdateById({
					id:this.docInfo.id,
					password:this.password,
				}).then(res=>{
					console.log(this.docInfo.id,'修改密码',res)
					if(res.code==0){
						uni.showToast({
							title:'修改成功！',
							icon:'none'
						})
						setTimeout(()=>{
							uni.clearStorage();
							uni.redirectTo({
								url: '../index/login'
							})
						},500)
					}
					console.log()
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F9F9F9;
	}
	.infoBox {
		background-color: #fff;
		margin: 10rpx 20rpx;
		padding: 30rpx;
		border-radius: 16rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logout {
		position: absolute;
		left: 30rpx;
		right: 30rpx;
		bottom: 300rpx;
		height: 78rpx;
		color: #378EFF;
		border: 3rpx solid #378EFF;
		border-radius: 20rpx;
		text-align: center;
		line-height: 78rpx;
		font-size: 32rpx;
		font-weight: bold;
	}
	// 弹框
	.metaDialog {
		width: 680rpx;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 52rpx 80rpx;
		box-sizing: border-box;
	
		.metaTitle {
			font-size: 32rpx;
			text-align: center;
			color: #333;
		}
	
		.meta {
			border-bottom: 1px solid #E5E5E5;
			height: 98rpx;
			margin-top: 78rpx;
			box-sizing: border-box;
	
			.formItem {
				height: 98rpx;
				line-height: 98rpx;
				font-size: 15px;
				color: #333;
			}
	
			.formPlaceholder {
				font-size: 14px;
			}
	
		}
	
		.noteOperate {
			display: flex;
			align-items: center;
			justify-content: space-between;
	
			.cancelNote {
				width: 40%;
				height: 50px;
				border-radius: 30px;
				color: #1296db;
				border: 1px solid #1296db;
				line-height: 50px;
				font-size: 15px;
				text-align: center;
				margin: 0 auto;
				margin-top: 60px;
			}
	
			.confirmNote {
				width: 40%;
				height: 50px;
				background: linear-gradient(270deg, #108bc8 0%, #1296db 100%);
				border-radius: 30px;
				color: #fff;
				line-height: 50px;
				font-size: 15px;
				text-align: center;
				margin: 0 auto;
				margin-top: 60px;
			}
		}
	}
	
</style>
