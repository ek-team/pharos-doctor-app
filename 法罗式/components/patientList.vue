<template>
	<view class="patientList">
		<view class="flexB" style="margin:  0 0 30rpx 0;" v-for="(item,index) in patientList" :key="index" @click="chat(item)">
			<image :src="item.user.avatar" v-if="item.user" mode="" class="userIcon"></image>
			<view class="patientInfos">
				<view class="patientInfo flexAB">
					<view class="flexA"  v-if="item.user">
						{{item.user.nickname}}<text>《{{item.followUpPlan.name}}》</text>
					</view>
					<view class="flexA"  v-else>
						<text>《{{item.followUpPlan.name}}》</text>
					</view>
				</view>
				<view class="plan flexA">
					<view class="planTip">
						已提醒
					</view>
					<view class="planInfo">
						<view class="planInfos">
							<text class="tips">提醒：</text>  <text>{{item.followUpPlanContent.notice}}</text>
						</view>
						<view class="planInfos" v-if="item.followUpPlanContent.form">
							<text class="tips">表单：</text>  <text>{{item.followUpPlanContent.form.title}}</text>
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
	</view>
</template>

<script>
	export default {
		props:['patientList'],
		name:"patientList",
		data() {
			return {
				
			};
		},
		methods:{
			chat(item){
				// uni.navigateTo({
				// 	url:`/pages/plant/detail?id=${item.followUpPlanContentId}`
				// })
			}
		}
	}
</script>

<style lang="less" scoped>
.patientList{
	padding: 30rpx;
	background: #fff;
	.userIcon{
		width: 72rpx;
		height: 72rpx;
	}
	.patientInfos{
		
		flex: 1;
		margin-left:20rpx;
		.patientInfo{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
			margin-top: 10rpx;
			text{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				margin-left: 32rpx;
				color: #40C8DE;
			}
		}
		.plan{
			margin-top: 16rpx;
			position: relative;
			.planTip{
				position: absolute;
				top: 0;
				right: 0;
				background: url('/static/images/bg@2x.png') no-repeat;
				width: 84rpx;
				background-size: 84rpx 34rpx;
				height: 34rpx;
				font-size: 16rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 34rpx;
				text-align: center;
				color: #FFFFFF;
			}
			.planInfo{
				padding: 22rpx 24rpx;
				background: #F2F2F2;
				flex: 1;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				.planInfos{
					white-space: nowrap; //禁止换行
					overflow: hidden;
					text-overflow: ellipsis;
					margin:10rpx 0;
					width:500rpx;
					.tips{
						color: #43C8EB;
						
					}
				}
			}
		}
	}
	
	
	
}
</style>