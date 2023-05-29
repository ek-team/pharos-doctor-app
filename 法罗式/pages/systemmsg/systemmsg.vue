<template>
	<view class="business">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="allReader">
				<image src="/static/images/icon_canl@2x.png" mode="" class="clearIcon"></image>一键已读
			</view>
		</hx-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="businessInfo" v-for="(item,index) in businessList" :key="index" @click="jumpDetail(item)">
				<view class="flexAB" >
					<view class="flexA">
						<image :src="item.type==1?'/static/images/icon_pat@2x1.png':(item.type==2?'/static/images/icon_ask@2x.png':'/static/images/icon_new@2x.png')" mode="" class="mesgIcon"></image>
						{{item.type==1?'新增患者':(item.type==2?'图文咨询':'新消息')}}
					</view>
					<view>
						<span v-if="item.redStatus==0" style="color:red">未读</span>
						<span v-if="item.redStatus==1" style="color:#808080">已读</span>
					</view>
					<!-- <u-badge value="1" style="background:#FF5A5A ;" type="success"></u-badge> -->
				</view>
				<view class="flexA" style="margin-top: 20rpx;">
					<image :src="item.user.avatar" mode="" class="businessIcon"></image>
					<view class="bussName">
						<view class="">
							{{item.user.nickname}}
						</view>
						<view class="time">
							新增时间：{{item.createTime}}
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>

	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				config:{//自定义头部配置信息
					title: '系统消息',
					color: '#222',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#fff','#fff']],
					rightSlot:true,
				},
				businessList:[],
				pageNum:1,
				pageSize:10
			};
		},
		onLoad() {

		},
		methods:{
			jumpDetail(item){
				console.log('图文咨询项',item)
				// return
				if(item.type==2){//图文咨询
				this.api.chatUserGetChat({
					chatUserId:item.chatUserId
				}).then(res=>{
					if(item.chatUser&&item.chatUser.groupType == 0){//单聊
						if(res.code == 0 && res.data && res.data.patientOtherOrderStatus == 0){//图文咨询0-待接收 1-接收 2-拒绝 3-结束
							uni.navigateTo({
								url:`../chat/information?id=${res.data.patientOtherOrderNo}&str2=0t&from=chatlist&targetUid=${item.userId}&name=${item.user.patientName}&chatType=0&chatId=${item.chatUserId}&groupType=${item.chatUser.groupType}`
							})
						}else{
							uni.navigateTo({
								url:`/pages/chat/chat?targetUid=${item.userId}&name=${item.user.patientName}&chatType=0&chatId=${item.chatUserId}&patientOtherOrderId=${res.code==0&&res.data&&res.data.patientOtherOrderStatus!=0?res.data.patientOtherOrderNo:null}`
							})
						}	
					}else if(item.chatUser&&item.chatUser.groupType == 1){//群聊
						if(res.code == 0 && res.data && res.data.patientOtherOrderStatus == 0){//图文咨询0-待接收 1-接收 2-拒绝 3-结束
							uni.navigateTo({
								url:`../chat/information?id=${res.data.patientOtherOrderNo}&str2=0&from=chatlist&chatUserId=${item.chatUserId?item.chatUserId:0}&targetUid=${item.userId}&name=${item.user.patientName}&chatType=1&chatId=${item.chatUserId}&teamId=${res.data.teamId}&groupType=${item.chatUser.groupType}`
							})
						}else{
							uni.navigateTo({
								url:`/pages/chat/chat?chatUserId=${item.chatUserId?item.chatUserId:0}&name=${item.user.patientName}&chatType=1&targetUid=${item.userId}&chatId=${item.chatUserId}&patientOtherOrderId=${res.code==0&&res.data&&res.data.patientOtherOrderStatus!=0?res.data.patientOtherOrderNo:null}`
							})
						}
					}
				})
					
				}else{

				}
				this.api.upcomingGetById({
					id:item.id
				}).then(res=>{
					// console.log('待办详情标记已读',res)
				})
				// return
				// uni.navigateTo({
				// 	url:'../chat/information?id='+item.id
				// })
				// uni.navigateTo({
				// 	url:`./detail?id=${item.id}`
				// })

			},
			allReader(){
				this.api.allReader().then(res=>{
					console.log(res)
					if(res.code == 0){
						uni.showToast({
							title:'操作成功！'
						})
						let page = {
							num:1
						}
						this.upCallback(page)
					}
				})
			},
			downCallback(){
				this.mescroll.resetUpScroll();
			},
			upCallback(page) {//加载
				let data = {
					pageSize:this.pageSize,
					pageNum:page.num,
				}
				this.api.systemMsgPage(data).then(res=>{
					console.log(res)
					if(res.code == 0&&res.data.records.length>0){
						let curPageData = res.data.records;
						let curPageLen = res.data.records.length;
						let totalPage = res.data.total;
						if (page.num == 1) this.businessList = [];
						this.businessList = this.businessList.concat(curPageData);
						this.mescroll.endByPage(curPageLen, totalPage);
					}else{
						this.businessList = []
						this.mescroll.endByPage(0, 1);
					}
				}).catch(reg=>{
					this.businessList = []
					this.mescroll.endByPage(0, 1);
				})


			},

		}
	}
</script>

<style lang="less" scoped>
.business{
	// padding: 30rpx;
	min-height: 100vh;
	background: #f2f2f2;
	.slotRight{
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #BDBDBD;
		margin-right: 20rpx;
		.clearIcon{
			width: 40rpx;
			height: 40rpx;
		}
	}

	.businessInfo{
		padding: 30rpx;
		background: #fff;
		margin:22rpx auto ;
		width: 640rpx;
		border-radius: 20rpx;
		.businessIcon{
			width:88rpx;
			height: 88rpx;
			display: flex;
			margin-right: 30rpx;
		}
		.mesgIcon{
			width:48rpx;
			height: 48rpx;
			display: flex;
			margin-right:24rpx ;
		}
		.bussName{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
			.time{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #989898;
				margin-top: 10rpx;
			}
		}
	}

}
</style>
