<template>
	<view class="bussDetail">
		<view class="businessInfo">
			<view class="flexAB" >
				<view class="flexA">
					<image :src="detail.type==1?'/static/images/icon_pat@2x1.png':(detail.type==2?'/static/images/icon_ask@2x.png':'/static/images/icon_new@2x.png')" mode="" class="mesgIcon"></image>
					{{detail.type==1?'新增患者':(detail.type==2?'图文咨询':'新消息')}}
				</view>
				<!-- <u-badge value="1" style="background:#FF5A5A ;" type="success"></u-badge> -->
			</view>
			<view class="flexA" style="margin-top: 20rpx;">
				<view class="bussName">
					<view class="">
						{{detail.content}}
					</view>
					<view class="time">
						新增时间：{{detail.createTime}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				detail:{
					user:{
						nickname:'',
						avatar:''
					}
				},
			};
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			this.upcomingGetById()
		},
		methods:{
			upcomingGetById(){
				let data  ={
					id:this.id
				}
				this.api.upcomingGetById(data).then(res=>{
					console.log(res)
					if(res.code ==0){
						this.detail = res.data
					}
				})
			}
		},
		
	}
</script>

<style lang="less" scoped>
.bussDetail{
	min-height: calc(100vh - 40rpx);
	background: #f2f2f2;
	padding: 20rpx 0;
	.businessInfo{
		padding: 30rpx;
		background: #fff;
		margin:22rpx auto ;
		width: 640rpx;
		border-radius: 20rpx;
		.businessIcon{
			width:88rpx;
			height: 88rpx;
			display: flex;
			margin-right: 30rpx;
		}
		.mesgIcon{
			width:48rpx;
			height: 48rpx;
			display: flex;
			margin-right:24rpx ;
		}
		.bussName{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
			.time{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #989898;
				margin-top: 10rpx;
			}
		}
	}
}
</style>
