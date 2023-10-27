<template>
	<view class="patientIndex">
		<view class="patientTitle">
			<view class="bigLine">
				<view class="bigLines"></view>
			</view>
			<view class="menuInfo flexAA">
				<view class="" @click="addPatient">
					<image src="/static/images/icon_add@2x.png" mode="" class="menuInfoIcon"></image>
					<view class="">
						添加患者
					</view>
				</view>
				<!-- <view class="" @click="addFolow">
					<image src="/static/images/icon_pla@2x.png" mode="" class="menuInfoIcon"></image>
					<view class="">
						新建计划
					</view>
				</view> -->
				<view class="" @click="fromgl">
					<image src="/static/images/icon_set@2x2.png" mode="" class="menuInfoIcon"></image>
					<view class="">
						表单管理
					</view>
				</view>
			</view>
			<view class="white"></view>
			
		</view>
		<view class="partienList flexAA">
			<view class="partienLists" @click="jumpPatientList" style="background: url('/static/images/bg_pat@2x.png')  no-repeat;background-size: 342rpx 168rpx;">
				患者列表
			</view>
			<view class="partienLists" @click="jumpFollowUp" style="background: url('/static/images/bg_sf@2x.png') no-repeat; background-size: 342rpx 168rpx;">
				随访计划
			</view>
		</view>
		<view class="" style="margin-top:40rpx;background: #fff;border-top-left-radius: 40rpx;border-top-right-radius: 40rpx;">
			<!-- <dayPicker ></dayPicker> -->
			<u-tabs :list="list1" @click="clickMenu" :activeStyle="{
			    color: '#378EFF',
			    fontWeight: 'bold',
			    transform: 'scale(1.05)'
			}" style="background: #fff;"></u-tabs>
			<patientList :patientList="patientList" v-if="patientShow"></patientList>
		</view>
	</view>
</template>

<script>
	import dayPicker from '@/components/dayPicker.vue'
	import patientList from '@/components/patientList.vue'
	import { divide,times} from '@/common/numPrecisions.js'
	export default {
		data() {
			return {
				list1: [{
					name: '按患者',
					id:0
				},{
					name: '按计划',
					id:1
				}],
				patientList:[
					{
						user:{
							avatar:''
						}
					}
				],
				patientShow:false,
			};
		},
		onLoad() {
			this.followUpPlanGetThisDayPatient()
		},
		methods:{
			clickMenu(e){
				console.log(e)
				this.patientShow = false
				if(e.id==0){
					this.followUpPlanGetThisDayPatient()
				}else{
					this.followUpPlanGetThisDayFollowUpPlan()
				}
				
			},
			followUpPlanGetThisDayPatient(){
				this.api.followUpPlanGetThisDayPatient('').then(res=>{
					// console.log(res)
					if(res.code == 0){
						res.data.map(item=>item.baifenbi = times(divide(item.push,item.totalPush),100))
						// console.log('按患者的进度条',res.data)
						this.patientList = res.data
						this.patientShow = true
					}
				})
			},
			followUpPlanGetThisDayFollowUpPlan(){
				this.api.followUpPlanGetThisDayFollowUpPlan('').then(res=>{
					// console.log(res)
					if(res.code == 0){
						res.data.map(item=>item.baifenbi = times(divide(item.push,item.totalPush),100))
						this.patientList = res.data
						this.patientShow = true
						// console.log('按计划的进度条',res.data)
					}
				})
			},
			addFolow(){
				uni.navigateTo({
					url:`./followUpDetail?id=${0}`
				})
			},
			addPatient(){
				// uni.navigateTo({
				// 	url:'./addPatient'
				// })
				uni.navigateTo({
					url:'../my/myQrcode'
				})
				// uni.showToast({
				// 	// title:'该功能暂不支持开放！',
				// 	// icon:"none",
					
				// })
			},
			fromgl(){
				uni.navigateTo({
					url:'../formInfo/formList'
				})
			},
			jumpPatientList(){
				uni.navigateTo({
					url:'./patientGroupList/patientGroupList'
				})
				// uni.navigateTo({
				// 	url:'./patientList'
				// })
			},
			jumpFollowUp(){
				// uni.navigateTo({
				// 	url:'./followUp'
				// })
				uni.navigateTo({
					url:'/pages/followup/followUpList?pageType=0'
				})
			},
		},
		components:{
			dayPicker,
			patientList,
		}
	}
</script>

<style lang="less" scoped>
.patientIndex{
	min-height: 100vh;
	background: #f2f2f2;
	.patientTitle{
		background: #378EFF;
		height: 300rpx;
		border-bottom-left-radius: 40%;
		border-bottom-right-radius: 40%;
		position: relative;
		.bigLine{
			width: 100%;
			height: 58rpx;
			background: #78B4FF;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.bigLines{
				width: 718rpx;
				height: 24rpx;
				background: #0553B7;
				border-radius: 4rpx;
			}
			
		}
		.menuInfo{
			width: 706rpx;
			position: absolute;
			height: 250rpx;
			background: rgba(255,255,255,1);
			border-radius: 0px 0px 20rpx 20rpx;
			margin: -30rpx auto;
			left: 24rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			text-align: center;
			color: #222222;
			z-index: 10;
			.menuInfoIcon{
				width: 100rpx;
				height: 100rpx;
			}
		}
		.white{
			height: 32rpx;
			position: absolute;
			bottom: -2rpx;
			width: 750rpx;
			background: #f2f2f2;
		}
	}
	.partienList{
		margin-top: 22rpx;
		.partienLists{
			width: 342rpx;
			height: 168rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 168rpx;
			color: #222222;
			text-indent: 32rpx;
		}
	}
}
</style>
