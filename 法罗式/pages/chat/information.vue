<template>
	<view class="information">
		<!-- <view class="informations">
			订单编号： <text>{{informationDetail.orderNo}}</text>
		</view>
		<view class="informations">
			订单金额： <text>{{informationDetail.amount}}</text>
		</view> -->
		<view class="informations">
			有效时长： <text>{{informationDetail.efficientHour}}</text>
		</view>
		<view class="informations descContent">
			咨询描述： <text>{{informationDetail.illnessDesc}}</text>
		</view>
	<!-- 	<view class="informations" v-if="informationDetail.imageUrl">
			<view class="">
				单图描述：
			</view>
			<image :src="informationDetail.imageUrl" @click="watchImg(informationDetail.imageUrl)" class="informationsImg" mode=""></image>
		</view> -->
		<view class="informations" v-if="informationDetail.imageUrlList.length >0">
			<view class="">
				图片描述：
			</view>
			<image v-for="(item,index) in informationDetail.imageUrlList" @click="watchImg(informationDetail.imageUrlList,index,'list')" class="informationsImg" :src="item" mode=""></image>
		</view>
		<view class="informations">
			创建时间：
			<text>{{informationDetail.createTime}}</text>
		</view>


		<view class="infoTitle">患者信息</view>
		<view class="informations infoDetail" @click="toPatientDetail">
			<view>
				患者名字： <text>{{informationDetail.user.patientName}}</text>
			</view>
			<image src='/static/images/select_right.png' class="toIcon"></image>
		</view>
		<view class="informations">
			年龄： <text>{{informationDetail.user.age}}</text>
		</view>
		<view class="informations">
			过敏史： <text>{{informationDetail.allergy==1?'有':'无'}}</text>
		</view>
		<view class="informations">
			过往病史： <text>{{informationDetail.pastMedicalHistory==1?'有':'无'}}</text>
		</view>
		<view class="informations">
			肝功能： <text>{{informationDetail.liverFunction==1?'异常':'正常'}}</text>
		</view>
		<view class="informations"  style="padding-bottom: 200rpx;">
			肾功能： <text>{{informationDetail.kidneyFunction==1?'异常':'正常'}}</text>
		</view>

		<view class="footerContainer" v-if="showOption">
			<view v-if="(isLeader&&groupType==1)||groupType==0" class="refuseBtn optionText" @click="confirmOption('refuse')">拒绝</view>
			<view class="refuseBtn confirmBtn">
				<view class="optionText" @click="confirmOption('recieve')">接收</view>
				<view >咨询费用：￥{{informationDetail.amount?informationDetail.amount:0}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				id:0,
				msgId:null,
				str2:null,
				showOption:true,
				informationDetail:{
					imageUrlList:[]
				},
				from:null,
				chatUserId:null,
				targetUid:null,
				name:null,
				chatType:null,
				chatId:null,
				str2:null,
				isLeader:false,
				groupType:0,
				teamId:null,
				docInfo:null
			};
		},
		onLoad(option) {
			console.log('咨询状态',option.str2,option.from)
			this.from=option.from
			if(option.str2==0){//操作按钮
				this.showOption=true
			}else{
				this.showOption=false
			}
			this.str2=option.str2
			this.msgId=option.msgId
			this.id = option.id?option.id:0
			this.chatUserId=option.chatUserId
			this.targetUid=option.targetUid
			this.name=option.name
			this.chatType=option.chatType
			this.chatId=option.chatId
			this.teamId = option.teamId
			this.groupType = option.groupType
			console.log('groupType---->'+this.groupType)
			this.doctorPointGetByPatientOtherOrderId()
		},
		onShow() {
			this.docInfo = getApp().globalData.docInfo
			this.getIsLeaderStatus()
		},
		methods:{
			watchImg(url,index,type){
				// console.log('图片索引',index)

				uni.previewImage({
					urls:url,
					current:index,
				})
			},
			doctorPointGetByPatientOtherOrderId(){
				let data  = {
					id:this.id
				}
				this.api.doctorPatientOtherOrderId(data).then(res=>{
					// console.log('图文咨询详情',res.data)
					if(res.code ==0){
						this.informationDetail  =res.data
						if(res.data.acceptStatus==0){//待接收
							this.showOption=true
						}else{
							this.showOption=false
						}
					}
				})
			},
			getIsLeaderStatus(){
				console.log('teamId------>'+this.teamId)
				if(this.teamId){
					let data = {
						teamId:this.teamId,
						doctorId:this.docInfo.id
					}
					this.api.doctorIsLeader(data).then(res=>{
						
						if(res.code == 0){
							this.isLeader = res.data
						}
					})
				
				}
				
			},
			toPatientDetail(){
				// console.log('图文咨询详情',this.informationDetail)
				uni.navigateTo({
					url:'../patient/patientDetail?id='+this.informationDetail.user.id
				})
			},
			confirmOption(type){

				uni.showModal({
					title: type=='refuse'?'是否拒绝患者的咨询?':'是否接受患者的咨询?',
					// content: '本次更新内容：\n1、运费、发送订单\n2、退出app后收到消息在通知栏显示\n3、转诊选择医生加上医助选择',
					success: (res) => {
						// console.log(type=='refuse'?2:1)
						if (res.confirm) {
							this.api.receiverPicConsultation({
								patientOtherOrderId:this.id,
								// msgId:this.msgId,
								str2:type=='refuse'?2:1
							}).then(res=>{
								uni.showToast({
									title:type=='refuse'?'已拒绝':'已接收',
									icon:'none'
								})
								this.showOption=false
								// console.log(res)
								console.log("用户Id----->"+this.chatUserId)
								setTimeout(()=>{
									if(this.from=='chatlist'&&type!='refuse'){
										if(this.chatType==0){
											uni.redirectTo({
												url:`/pages/chat/chat?targetUid=${this.targetUid}&name=${this.name}&chatType=0&chatId=${this.chatId}&patientOtherOrderId=${this.id}`
											})
										}else{
											uni.redirectTo({
												url:`/pages/chat/chat?chatUserId=${this.chatUserId?this.chatUserId:0}&name=${this.name}&chatType=1&targetUid=${this.targetUid}&chatId=${this.chatId}&patientOtherOrderId=${this.id}`
											})
										}
									}
								},500)

							})
						}
						if(res.cancel){
							console.log('取消')
						}
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
.information{
	min-height: 100vh;
	background: #f2f2f2;
	.informations{
		width: 650rpx;
		padding: 20rpx;
		background: #fff;
		color: #666;
		font-size: 28rpx;
		margin:0  auto;
		.toIcon{
			width: 36rpx;
			height: 36rpx;
		}
		.informationsImg{
			width: 200rpx;
			height: 200rpx;
		}
		text{
			color: #222;
		}
	}
}
.descContent{
	word-break: break-all;
}
.infoDetail{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.infoTitle{
	margin:30rpx 0 10rpx 40rpx;
}
.footerContainer{
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
	justify-content: center;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 30rpx 30rpx;
	.refuseBtn{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		border: 1px solid #4C6DE7;
		border-radius: 10rpx;
		padding: 10rpx 0;
		color:	#4C6DE7;
	}
	.confirmBtn{
		background-color: #4C6DE7;
		color: #fff;
		margin-left: 20rpx;
	}
	.optionText{
		font-size: 20px;

	}
}
</style>
