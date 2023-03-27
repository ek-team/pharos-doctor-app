<template>
	<view class="inputCompont">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="sublimt">
				保存 
			</view>
		</hx-navbar>
		<view class="tips">
			多行输入框预览
		</view>
		<view class="inputInfo">
			<view class="">
				{{form.name}}
			</view>
			<view class="placeholder">{{form.placeholder}}</view>
		</view>
		<view class="tips">
			属性编辑
		</view>
		<view class="inputInfos">
			<view class="">标题</view>
			<input type="text" v-model="form.name" placeholder="请输入标题" class="inputInfoa">
			<view class="">输入提示</view>
			<input type="text" v-model="form.placeholder" placeholder="请输入提示" class="inputInfoa">
		</view>
		<view class="tips">
			答案
		</view>
		<view class="isMust optionContent"  v-for="(item,index) in form.formOptionsList" :key="index">
			<view class="flexAB">
				<input type="text" placeholder="输入答案" v-model="item.text" class="raiodInfo">
				<image src="/static/images/icon_can@3x.png" mode="" class="delicon" @click="delItem(index)"></image>
			</view>
			<view class="itemScope">
				<view class="scopeTitle">分数</view>
				<input type="number" v-model="item.score" placeholder="请输入分数" class="inputInfoa">
			</view>
			
		</view>
		<view class="isMusts flexAB" @click="addRadio">
			+ 选项
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
					title: '多行输入框',
					color: '#222',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#fff','#fff']],
					rightSlot:true,
				},
				form:{
					name:'',
					score:null,
					placeholder:'',
					type:3,
					isMust:false,
					formOptionsList:[]
				},
				index:-1
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
			addRadio(){
				this.form.formOptionsList.push({
					text:'',
					score:null,
				})
			},
			delItem(index){
				this.form.formOptionsList.splice(index,1)
			},
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
	.isMusts{
		padding:32rpx 22rpx ;
		background: #fff;
		color: #378EFF;
		font-size: 28rpx;
		font-family: PingFang SC;
	}
	.optionContent{
		display: flex;
		flex-direction: column;
		padding:32rpx 22rpx ;
		background: #fff;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #444444;
		.raiodInfo{
			width: 400rpx;
			font-size: 30rpx;
			color: #222;
		}
		.delicon{
			width: 34rpx;
			height: 34rpx;
		}
		.inputInfoa{
			width: 300rpx;
			border: 2rpx solid #ECECEC;
			opacity: 1;
			border-radius: 10rpx;
			padding: 20rpx 28rpx;
			margin: 28rpx 0;
		}
		.itemScope{
			display: flex;
			flex-direction: row;
			align-items: center;
			.scopeTitle{
				margin-right: 20rpx;
			}
		}
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
		}
	}
}
</style>
