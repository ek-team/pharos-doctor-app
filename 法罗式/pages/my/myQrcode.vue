<template>
<!-- 	<view class="qrCodeContainer">
		<view class="content">
			<view class="itemQrCode" v-for="(item,index) in myQrCode">
				<view class="itemContent">
				<view class="codeName" style="">{{item.name}}</view>
				<image :src="item.qrCode" mode="widthFix" class="qrCodeImg"></image>
				</view>
			</view>
		</view>
	</view> -->
	
	<swiper class="swiper-box" :autoplay="false" :circular="false" previous-margin="20px" next-margin="50px">
				<swiper-item v-for="(item, index) in myQrCode" :key="index" >
					<view  class="swiperItem">
						<view class="top-view">
							<image class="img-header" src="../../static/images/icon_doctor.png"></image>
							<view class="info-view">
								<view class="codeName" style="">{{item.name}}</view>
								<view class="codeName" style="">{{item.hospitalName}}</view>
							</view>
							
						</view>
						<image :src="item.qrCode" mode="widthFix" class="qrCodeImg"></image>
						<view class="bottom-text">扫一扫，在家也能问诊了!</view>
					</view>
				</swiper-item>
			</swiper>
</template>

<script>
	export default {
		data() {
			return{
				myQrCode:null,
				 swiperIndex: 0
			}
		},
		onLoad() {
			this.getMyQrcode()
		},
		methods:{
			getMyQrcode(){
				this.api.userGetDoctorQrCode().then(res=>{
					if(res.code==0&&res.data){
						this.myQrCode=res.data
					}
					console.log('医生二维码',res.data)
				})
			},
			swiperChange: function(e){
				this.swiperIndex = e.detail.current;
			}
			
		}
	}
</script>

<style>
	page{
		background-color: #eaf0f0;
	}
	.qrCodeContainer{
		display: flex;
		justify-content: center;
		align-items: center;
		/* height: 100vh; */
	}
	.content{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		overflow-x: scroll;
		margin-top: 200rpx;
		margin-right: 30rpx;
		/* width: 600rpx; */
		/* height: 600rpx; */
		box-sizing: border-box;
		/* border: 1px solid #c6c6c6; */
		padding: 20rpx;
	}
	.itemQrCode{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 20rpx;
		background-color: #fff;
		
	}
	.itemContent{
		border-radius: 120rpx;
		background-image: "/static/images/card.png";
	}
	.top-view{
		width: 100%;
		height: 220rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		padding-top: 15rpx;
		background-color:#6e8af8 ;
		border-top-left-radius: 15rpx;
		border-top-right-radius: 15rpx;
	}
	.info-view{
		display: flex;
		flex-direction: column;
		justify-content: start;
		margin: 10rpx;
	}
	.bottom-text{
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 40rpx;
		margin-bottom: 40rpx;
	}
	.img-header{
		width: 160rpx;
		height: 160rpx;
	}
	.codeName{
		width:100%;
		display: flex;
		justify-content: left;
		font-size: 40rpx;
		padding-top: 10rpx;
		color: white;
	}
	.qrCodeImg{
		width: 400rpx;
		margin-top: 50rpx;
		/* height: 560rpx; */
	}
	.swiper-box {
			width: 100%;
			height: 880rpx;
		}
	
		.swiperItem {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: white;
			margin: 10px;
			border-radius: 15rpx;
			/* app上运行不显示图片，就需要加下面这行，设置高度 */
			height: 800rpx;
		}
	

</style>
