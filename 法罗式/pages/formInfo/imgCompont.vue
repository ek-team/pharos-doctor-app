<template>
	<view class="inputCompont">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="sublimt">
				保存 
			</view>
		</hx-navbar>
		<view class="tips">
			图片预览
		</view>
		<view class="inputInfo">
			<view class="">
				{{form.name}}
			</view>
			<view class="placeholder">
				<view class="imgInfo flexCC">
					<image src="/static/images/icon_pic@3x1.png" mode="" class="imaIcon"></image>
					点击上传图片
				</view>
			</view>
			
		</view>
		<view class="tips">
			属性编辑
		</view>
		<view class="inputInfos">
			<view class="">标题</view>
			<input type="text" v-model="form.name" placeholder="请输入标题" class="inputInfoa">
		</view>
		<view class="tips">
			属性设置
		</view>
		<view class="isMust flexAB" >
			必填项 
			<u-switch v-model="form.isMust" ></u-switch>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{//自定义头部配置信息
					title: '图片',
					color: '#222',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#fff','#fff']],
					rightSlot:true,
				},
				form:{
					name:'',
					placeholder:'',
					type:5,
					isMust:false,
					formOptionsList:[]
				},
				index:-1,
			};
		},
		onLoad(option){
			console.log(option)
			if(option){
				this.form = JSON.parse(option.data)
				this.index = option.index
			}
			
		},
		methods:{
			sublimt(){
				this.form.isMust = this.form.isMust?1:0
				let data  = {
					form:this.form,
					index:this.index
				}
				uni.setStorageSync('addFormData',data)
				uni.$emit('addFormData',data)
				uni.navigateBack({
					delta: this.index==-1?2:1
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.inputCompont{
	min-height: 100vh;
	background: #f2f2f2;
	.slotRight{
		color: #222;
		font-size: 30rpx;
		margin-right: 30rpx;
		
	}
	.isMust{
		padding:32rpx 22rpx ;
		background: #fff;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #444444;
	}
	.tips{
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		padding: 22rpx;
		color: #888888;
	}
	.inputInfos{
		padding:32rpx 22rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #444444;
		background: #fff;
		.inputInfoa{
			width: 650rpx;
			border: 2rpx solid #ECECEC;
			opacity: 1;
			border-radius: 10rpx;
			padding: 40rpx 28rpx;
			margin: 28rpx 0;
		}
	}
	.inputInfo{
		width: 706rpx;
		padding:32rpx 22rpx;
		
		background: rgba(255,255,255,1);
		border: 2rpx dashed #378EFF;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #444444;
		.placeholder{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #989898;
			width: 600rpx;
			height: 200rpx;
			margin-top: 30rpx;
			.imgInfo{
				width: 176rpx;
				height: 176rpx;
				background: rgba(242,242,242,1);
				opacity: 1;
				border-radius: 20rpx;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #888888;
				flex-direction: column;
				.imaIcon{
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
}
</style>
