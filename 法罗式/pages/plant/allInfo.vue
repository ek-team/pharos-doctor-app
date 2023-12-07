<template>
	<view class="allInfo">
		<hx-navbar ref="hxnb" :config="config"></hx-navbar>
		<view class="plantList flexB" v-for="(item,index ) in plantAll" :key="index" @click="deytail(item)">
			<view class="plantListLeft">
				<view class="leftRadio"></view>
				<view class="leftLine"></view>
			</view>
			<view class="plantListRight">
				<view class="plantListRightTitle">
					{{item.followUpPlan.name}}
				</view>
				<view class="plantListRightInfo">
					<view class="" style="width:500rpx;">
						<text>提醒：</text>{{item.followUpPlanContent.notice}}
					</view>
					<view class="planTip">
						已提醒 
					</view>
					<view class="planInfos flexAB" >
						随访阶段{{item.push}}/{{item.totalPush}}
						<view class="" style="width:150rpx;">
							<u-line-progress activeColor="#40C8DE" inactiveColor="#fff"  :percentage="item.baifenbi" :showText="false"></u-line-progress>
						</view>
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
				config:{//自定义头部配置信息
					title: '全部计划',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:false,
				},
				id:0,
				plantAll:[]
			};
		},
		onLoad(option) {
			this.id  = option.id
			this.followUpPlanGetPatientAllPlan()
		},
		methods:{
			deytail(item){
				console.log(item)
				uni.navigateTo({
					url:`./detail?id=${item.followUpPlanContentId}`
				})
			},
			followUpPlanGetPatientAllPlan(){
				let data  = {
					patientId:this.id
				}
				this.api.followUpPlanGetPatientAllPlan(data).then(res=>{
					if(res.code ==0){
						console.log(res)
						this.plantAll = res.data
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.allInfo{
	padding:22rpx 0 22rpx 0;
	.plantList{
		padding: 0 22rpx 0 22rpx;
		background: #fff;
		height: auto;
		.plantListRight{
			width: 666rpx;
			height: auto;
			padding-bottom: 22rpx;
			.plantListRightTitle{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #40C8DE;
			}
			.plantListRightInfo{
				width: 626rpx;
				background: rgba(242,242,242,1);
				border-radius: 10rpx;
				margin-top: 20rpx;
				font-size: 20rpx;
				font-family: PingFang SC;
				padding: 24rpx 20rpx;
				font-weight: 400;
				color: #666666;
				position: relative;
				text{
					color: #43C8EB;
				}
				.planTip{
					position: absolute;
					top: 0;
					right: 0;
					background: url('/static/images/bg@2x.png') no-repeat;
					background-size:84rpx 34rpx;				
					width: 84rpx;
					height: 34rpx;
					font-size: 16rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 34rpx;
					text-align: center;
					color: #FFFFFF;
				}
				.planInfos{
					white-space: nowrap; //禁止换行
					overflow: hidden;
					
					text-overflow: ellipsis;
					margin:20rpx 0 0;
					.tips{
						color: #43C8EB;
					}
				}
			}
		}
		.plantListLeft{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-direction: column;
			height: auto;
			.leftRadio{
				width: 16rpx;
				height: 16rpx;
				border: 2rpx solid #FFBBBB;
				border-radius: 50%;
			}
			.leftLine{
				height: 100%;
				border-left: 1rpx solid #FFBBBB;
				
			}
		}
	}
	
}
</style>
