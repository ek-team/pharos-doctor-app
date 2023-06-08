<template>
	<view class="pageStyle">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="addPatient">
				<image src="/static/images/icon_add@3x.png" mode="" class="slotRighticon"></image>
			</view>
		</hx-navbar>
		<view class="fromglList flexAB" v-for="(item,index) in fromglList" :key="index" @click="watchUserForm(item)">
			<!-- <image src="/static/images//icon_form_cat.png" mode="" class="fromglListImg"></image> -->
			<view class="flexAB" style="width:100%;">
				<view class="fromName">
					{{item.userName}}
				</view>
				<view class="fromName">
					{{item.createTime}}
				</view>
				<view class="fromName">
					{{'('+item.scope+')'}}
				</view>
				<image v-if="operationaType == 0" src="/static/images/icon_poi@2x(1).png" mode="" class="fromglListImgs"></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{//自定义头部配置信息
					title: '已填写用户',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:false,
				},
				formId: 0,
				fromglList:[],
				operationaType:0

			};
		},
		onLoad(options) {
			this.formId = options.id
			this.operationaType = options.operationaType
			this.getFormFillUser()

		},
		methods: {
			watchUserForm(item) {
				if(this.operationaType == 0){
					uni.navigateTo({
						url: `./addForm?groupId=${item.groupId}`
					})
				}
				
			},
			getFormFillUser(){
				let data = {
					formId:this.formId,
				}
				this.api.getUserFormFilled(data).then(res=>{
					console.log('当前表单已填写用户',res.data)
					if(res.code == 0 && res.data){
						this.fromglList = res.data
					}
					
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.pageStyle{
		min-height: 100vh;
		background:#F2F2F2 ;
	}
	.fromglList {
		width: 88%;
		// height: 120rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
		margin: 22rpx auto;
		padding: 32rpx;

		.fromListContentLeft {
			width: 10%;
			height: 100%;
		}

		.fromListContentRight {
			width: 90%;
			height: 56rpx;
		}

		.fromglListImg {
			width: 56rpx;
			height: 56rpx;
			display: flex;
			margin-right: 28rpx;
			flex-shrink: 0;
		}

		.fromName {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;

		}

		.fromglListImgs {
			width: 24rpx;
			height: 24rpx;
		}
	}
</style>