<template>
	<view class="myIndex">
		<view class="myIndexs flexAB">
			<image :src="docInfo.avatar?docInfo.avatar:'/static/images/defaultAvatar.png'" mode="" class="docImg"></image>
			<view class="docInfo" @click="openMyQrcode">
				<view class="flexAB">
					{{docInfo.nickname}}
					<image src="/static/images/icon@2x.png" mode="" class="qcodeImg" @></image>
				</view>
				<view class="flexAB" style="margin-top: 20rpx;">
					<view class="">
						
					</view>
					<image src="/static/images/icon_poi@2x.png" mode="" class="qcodeImg"></image>
				</view>
			</view>
		</view>
		<view class="threeMenu flexAA">
			<view class="" @click="toIntegralDetail">
				<image src="/static/images/icon_hea@2x.png" mode="" class="threeMenuIcon"></image>
				<view class="">
					我的法豆
				</view>
			</view>
			<view class="" @click="setUp">
				<image src="/static/images/icon_ser@2x1.png" mode="" class="threeMenuIcon"></image>
				<view class="">
					服务设置
				</view>
			</view>
			<view class="" @click="jumpTeam">
				<image src="/static/images/icon_tea@2x.png" mode="" class="threeMenuIcon"></image>
				<view class="">
					我的团队
				</view>
			</view>
		</view>
		<view class="menu">
			<view class="menuList flexAB" @click="toSet">
				<view class="flexA">
					<image src="/static/images/icon_set@2x1.png" mode="" class="menuListIcon"></image>
					设置
				</view>
				<image src="/static/images/icon_poi@2x(1).png" mode="" class="menuListIcons"></image>
			</view>
			<!-- <view class="menuList flexAB" >
				<view class="flexA">
					<image src="/static/images/icon_set@2x1.png" mode="" class="menuListIcon"></image>
					法豆明细
				</view>
				<image src="/static/images/icon_poi@2x(1).png" mode="" class="menuListIcons"></image>
			</view> -->
			<!-- <view class="menuList flexAB">
				<view class="flexA">
					<image src="/static/images/icon_hel@2x.png" mode="" class="menuListIcon"></image>
					帮助
				</view>
				<image src="/static/images/icon_poi@2x(1).png" mode="" class="menuListIcons"></image>
			</view> -->
			<!-- <view class="menuList flexAB">
				<view class="flexA">
					<image src="/static/images/icon_opi@2x.png" mode="" class="menuListIcon"></image>
					意见反馈
				</view>
				<image src="/static/images/icon_poi@2x(1).png" mode="" class="menuListIcons"></image>
			</view> -->
			<view class="menuList flexAB" @click="ysxy">
				<view class="flexA">
					<image src="/static/images/icon_con@2x.png" mode="" class="menuListIcon"></image>
					隐私政策
				</view>
				<image src="/static/images/icon_poi@2x(1).png" mode="" class="menuListIcons"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				docInfo:{
					avatar:''
				}
			};
		},
		onLoad() {
			
		},
		onShow() {
			if(getApp().globalData.docInfo){
				this.docInfo = getApp().globalData.docInfo
			}
			
		},
		methods:{
			toSet(){
				console.log('设置')
				uni.navigateTo({
					url:'./mySet',
				})
			},
			// 打开我的二维码
			openMyQrcode(){
				uni.navigateTo({
					url:'./myQrcode' 
				})
			},
			toIntegralDetail(){
				uni.navigateTo({
					url:'./integralDetail'
				})
			},
			ysxy(){
				uni.navigateTo({
					url:'../webView/webView'
				})
			},
			jumpTeam(){
				uni.navigateTo({
					url:'./team'
				})
			},
			setUp(){
				uni.navigateTo({
					url:'../serve/setUp'
				})
			},
		}
	}
</script>

<style lang="less" scoped>
.myIndex{
	min-height: 100vh;
	background: #f2f2f2;
	.myIndexs{
		background: #378EFF;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		padding: 0 24rpx 66rpx 24rpx;
		.docImg{
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;
			display: flex;
			margin-right: 20rpx;
		}
		.docInfo{
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			flex: 1;
			.qcodeImg{
				width: 48rpx;
				height: 48rpx;
			}
		}
	}
	.threeMenu{
		width: 706rpx;
		height: 210rpx;
		background: rgba(255,255,255,1);
		border-radius: 20rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		text-align: center;
		margin: 22rpx auto;
		color: #222222;
		.threeMenuIcon{
			width: 88rpx;
			height: 88rpx;
		}
	}
	.menu{
		width: 650rpx;
		background: rgba(255,255,255,1);
		border-radius: 20prx;
		margin: 0 auto;
		padding:10rpx 28rpx ;
		border-radius: 20rpx;
		.menuList{
			padding: 30rpx 0;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
			border-bottom: 1px solid #efefef;
			.menuListIcon{
				width: 48rpx;
				height: 48rpx;
				display: flex;
				margin-right: 30rpx;
			}
			.menuListIcons{
				width: 24rpx;
				height: 24rpx;
			}
		}
		.menuList:last-child{
			border-bottom: none;
		}
	}
}
</style>
