<template>
	<view class="medicalRecord">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="addCase">
				<image src="/static/images/icon_add@2x2.png" mode="" class="slotRightIcon"></image>
			</view>
		</hx-navbar>
		<view class="patientInfo flexA">
			<image :src="patirntInfo.avatar" mode="" class="userImg"></image>
			<view class="name">
				{{patirntInfo.nickname}}
			</view>
		</view>
		<view class="medicalRecordList flexB" @click="medicalDetail(item)" v-for="(item,index) in medicalRecordList" :key="index">
			<view class="medicalRecordListLeft">
				<view class="radio" :style="'background:'+ item.color"></view>
				<view class="line" :style="'border-color:'+item.color"></view>
			</view>
			<view class="medicalRecordListRight">
				<view class="rightTitle flexAB" :style="'background:'+item.color">
					<view class="">
						{{item.createTime}}
					</view>
					<view class="flexA">
						<!-- <image src="" mode="" class="docImg"></image> -->
						{{item.createUserName}}
					</view>
				</view>
				<view class="rightInfo">
					<view class="rightInfoname">
						{{item.title}}
					</view>
					<view class="infoList flexA">
						<view class="infoLists">问诊单 
							<image src="/static/images/icon@2x1.png" mode="" class="num"></image>
						</view>
						<view class="infoLists">检查报告 <text>1</text> </view>
						<view class="infoLists">关联随访计划 <text>1</text></view>
					</view>
					<view class="infos flexAB">
						<view class="infosa">{{item.content}}</view>
						<view class="flexA">
							详细 
							<image src="/static/images/icon_poi@2x(1).png" mode="" class="infosImg"></image>
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
					title: '病例记录',
					color: '#222',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#fff','#fff']],
					rightSlot:true,
				},
				medicalRecordList:[
					
				],
				id:0,
				patirntInfo:'' 
			};
		},
		onLoad(option) {
			this.id = option.id
			
		},
		onShow() {
			this.followUpPlanGetElectronicCaseList()
			this.followUpPlanGetPatientDetail()
		},
		methods:{
			followUpPlanGetPatientDetail(){
				let data = {
					patientId:this.id
				}
				this.api.followUpPlanGetPatientDetail(data).then(res=>{
					console.log(res)
					if(res.code ==0){
						this.patirntInfo = res.data
					}
				})
			},
			medicalDetail(item){
				console.log(item)
				uni.navigateTo({
					url:`./medicalDetail?id=${item.id}`
				})
			},
			followUpPlanGetElectronicCaseList(){
				let data  = {
					patientId:this.id
				}
				this.api.followUpPlanGetElectronicCaseList(data).then(res=>{
					console.log(res)
					if(res.code ==0){
						res.data.map(item=>item.color=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,)
						this.medicalRecordList = res.data
					}
				})
			},
			addCase(){
				uni.navigateTo({
					url:`../case/addCase?id=${this.id}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.medicalRecord{
	min-height: 100vh;
	background: #F2F2F2;
	.medicalRecordList{
		padding:   0 22rpx;
		.medicalRecordListRight{
			width: 630rpx;
			border-radius: 20rpx;
			margin-bottom: 22rpx;
			.rightInfo{
				border-bottom-left-radius: 30rpx;
				border-bottom-right-radius: 30rpx;
				background: #fff;
				padding:30rpx 28rpx ;
				.rightInfoname{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #222222;
				}
				.infoList{
					margin: 20rpx 0;
					.infoLists{
						display: inline-flex;
						border: 2rpx solid #E8E8E8;
						padding: 12rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #989898;
						margin-right: 12rpx;
						border-radius: 10rpx;
						.num{
							width: 36rpx;
							height: 36rpx;
							display: flex;
							margin-left: 10rpx;
						}
						text{
							color: #378EFF;
							margin-left: 10rpx;
						}
						
					}
					
				}
				.infos{
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #989898;
					.infosa{
						width: 456rpx;
						white-space: nowrap; //禁止换行
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.infosImg{
						width: 24rpx;
						height: 24rpx;
						display: flex;
						margin-left: 10rpx;
					}
				}
			}
			.rightTitle{
				padding: 20rpx 28rpx;
				background: #378EFF;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				border-top-left-radius: 30rpx;
				border-top-right-radius: 30rpx;
				.docImg{
					width: 56rpx;
					height: 56rpx;
					display: flex;
					border-radius: 50%;
					background: red;
					margin-right: 20rpx;
					
				}
			}
		}
		.medicalRecordListLeft{
			height: auto;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-direction: column;
			.radio{
				width: 28rpx;
				height: 28rpx;
				background: rgba(55,142,255,1);
				border-radius: 50%;
			}
			.line{
				height: 100%;
				border-left: 1px dashed #378EFF;
			}
		}
	}
	.slotRight{
		margin-right: 30rpx;
		width: 80rpx;
		height: 40rpx;
		.slotRightIcon{
			
			width: 35rpx;
			height: 35rpx;
			display: flex;
			margin-left: auto;
		}
	}
	.patientInfo{
		background: #fff;
		padding:33rpx ;
		margin-bottom: 22rpx;
		.userImg{
			width: 88rpx;
			height: 88rpx;
			border-radius: 20rpx;
			display: flex;
			background: red;
		}
		.name{
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			margin-left: 32rpx;
			color: #222222;
		}
	}
}
</style>
