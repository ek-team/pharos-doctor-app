<template>
	<view class="addPatient">
		<hx-navbar ref="hxnb" :config="config"></hx-navbar>
		<view class="addPatientForm">
			<view class="flexAB form">
				<text>姓名</text>
				<input type="text" v-model="from.name"  placeholder="请输入患者真实姓名" class="innerValue">
			</view>
			<view class="flexAB form">
				<text>手机号</text> <input v-model="from.phone" @blur="phoneBlue" type="tel" placeholder="请输入患者手机号" class="innerValue">
			</view>
			<view class="flexAB form">
				<text>身份证号</text> <input v-model="from.idCard" @blur="checkIDBlur" type="text" placeholder="请输入患者身份证号" class="innerValue">
			</view>
			<view class="flexAB form">
				<text>性别</text>
				<view class="flexA sexInfo">
					<view class="flexA" style="margin-right:100rpx;" @click="changSex(1)">
						<image :src="from.sex==1?'/static/images/icon_cli@2x.png':'/static/images/icon_cho@2x.png'" mode="" class="sexIcon"></image>
						男
					</view>
					<view class="flexA" @click="changSex(2)">
						<image :src="from.sex==2?'/static/images/icon_cli@2x.png':'/static/images/icon_cho@2x.png'" mode="" class="sexIcon"></image>
						女
					</view>
				</view>
			</view>
		</view>
		<view class="sublimt" @click="sublimt">
			保存
		</view>
	</view>
</template>

<script>
	import {checkPhone,checkID} from '@/static/utils/utils.js'
	export default {
		data() {
			return {
				config:{//自定义头部配置信息
					title: '添加患者',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:false,
				},
				from:{
					sex:1,
					phone:'',
					name:'',
					idCard:''
					
				},
				idCardType:false,
				phoneType:false,
			};
		},
		methods:{
			changSex(type){
				this.from.sex=type
			},
			phoneBlue(){
				if(checkPhone(this.from.phone)){//通过
					this.phoneType = true
				}else{//不通过
					this.phoneType = false
					uni.showToast({
						title:'手机号输入不正确！',
						icon:"none"
					})
				}
			},
			checkIDBlur(){
				if(checkID(this.from.idCard)){//通过
					this.idCardType = true
				}else{//不通过
					this.idCardType = false
					uni.showToast({
						title:'身份证输入不正确！',
						icon:"none"
					})
				}
				
			},
			sublimt(){
				if(this.from.name==''){
					uni.showToast({
						title:'请输入姓名！',
						icon:"none"
					})
					return
				}
				if(!this.phoneType){
					uni.showToast({
						title:'手机号输入不正确！',
						icon:"none"
					})
					return
				}
				if(!this.idCardType){
					uni.showToast({
						title:'身份证输入不正确！',
						icon:"none"
					})
					return
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.addPatient{
	min-height: 100vh;
	background: #fff;
	
	.addPatientForm{
		padding: 54rpx;
		
		.form{
			margin: 56rpx 0;
			text{
				width: 120rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #222222;
			}
			.sexInfo{
				width: 480rpx;
				.sexIcon{
					width: 40rpx;
					height: 40rpx;
					display: flex;
					margin-right: 20rpx;
				}
			}
			
			.innerValue{
				width: 400rpx;
				height: 40rpx;
				background: rgba(248,248,248,1);
				border-radius: 20rpx;
				padding: 20rpx 40rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 40rpx;
				color: #989898;
			}
		}
		
	}
	.sublimt{
		width: 706rpx;
		height: 88rpx;
		background: rgba(55,142,255,1);
		border-radius: 20rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		margin: 134rpx auto 0;
	}
}
</style>
