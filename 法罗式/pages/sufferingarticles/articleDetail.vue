<template>
	<view class="content">
		<view class="title">{{detail.title}}</view>
		<view v-if="isShow" style="margin-left: 20rpx;margin-top: 40rpx;">益慷护Pro  {{date}}</view>
		<!-- <image style="width: 100%;height: 400rpx;margin-top: 40rpx;" :src="imgPath"></image> -->
		<!-- <view class="textContent">{{textContent}}</view> -->
		<u-parse class="textContent" style="background: white;" :content="detail.content" >
		</u-parse>
		<view v-if="detailType == 0" class="bottomView">
			<view class="btnCustomStyle"  @click='sendMsg'>发送</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				detail:{
					
				},
				isShow:false,
				teamChatId:0,
				userChatId:0,
				chatType:0,
				detailType:0
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			this.teamChatId = option.teamChatId
			this.userChatId = option.userChatId
			this.chatType = option.chatType
			this.detailType = option.detailType
			this.upcomingGetById()
		},
		methods: {
			upcomingGetById(){
				let data  ={
					id:this.id
				}
				this.api.getArticleDetail(data).then(res=>{
					console.log('患教详情',res)
					if(res.code ==0){
						this.detail = res.data
					}
				})
			},
			sendMsg(){//发送消息
				console.log('发送消息')
				let selfSendData={
					selfSend:true,
					type:'article',
					msg:this.id
				}
				uni.setStorageSync('selfSend',selfSendData)
				uni.navigateBack({
					delta: 2
				})
				// let param = {}
				// param.type=1
				// if(this.chatType == 1){//群聊
				// 	param.chatUserId = this.teamChatId
				// }
				// if(this.chatType == 0){//单聊
				// 	param.targetUid = this.userChatId
				// }
				// param.msgType="ARTICLE",
				// param.str1=this.id
				// param.msg='文章'
				
				// if (!getApp().globalData.socketObj.isConnect) {
				//   getApp().globalData.socketObj.initSocket()
				//   console.log('实例未连接,重新连接')
				//   // let oldData=[JSON.stringify(param)]
				//   // uni.setStorageSync('sendData',oldData)
				// }
				// getApp().globalData.socketObj.sendMsg(JSON.stringify(param))
				// uni.navigateBack({
				// 	delta: 2
				// })
			}
		}
	}
</script>

<style lang="less">
.content{
		min-height: 100vh;
	}
	.title{
		margin: 20rpx;
		font-size: 22px;
		font-weight: 600;
	}
	.textContent{
		padding: 10rpx;
		font-size: 18px;
		margin-bottom: 50rpx;
	}
	.bottomView{
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		background: white;
	}
	.btnCustomStyle{
		background-color: royalblue;
		margin-left: 70%;
		margin-top: 10rpx;
		width: 20%;
		padding: 10rpx;
		border-radius: 10rpx;
		text-align: center;
		font-size: 30rpx;
		color: white;
	}
</style>
