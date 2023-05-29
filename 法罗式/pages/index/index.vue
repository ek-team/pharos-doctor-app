<template>
	<view class="flsIndex">
		<!-- @up="upCallback" -->
		<mescroll-body ref="mescrollRef" :up="upOption" @init="mescrollInit" @down="downCallback">
			<view class="flsBg">
				<view class="flsButton flex">
					<!-- <input class="searchContianer" @input="clearSearchUser" v-model="inputName" />
					<image src="/static/images/icon_sea@2x.png" mode="" class="flsIndexIcon" @click="serchUser"></image>
					<image src="/static/images/icon_set@2x.png" mode="" class="flsIndexIcon"></image> -->
				</view>
				<view class="docInfo">
					<view class="docName flexAB">
						<view class="flexA">
							<image :src="docInfos.avatar?docInfos.avatar:'/static/images/defaultAvatar.png'" mode=""
								class="docImg"></image>
							<text>{{docInfos.nickname}}</text>

						</view>
					</view>
					<view class="lineWhite">

					</view>
					<view class="patient">
						<view class="module flexAB">
							<!-- <view class="moduleList flexAC" @click="menuJump">
								<view class="badgePosite">
									<image src="/static/images/icon_pat@2x.png" mode="" class="moduleListImg"></image>
									<u-badge :isDot="true" type="primary" style="background:#FF5A5A ;" class="badgePosites"></u-badge>
								</view>
								<text>今日患者管理</text>
							</view> -->
							<view class="moduleList flexAC" @click="business">
								<view class="badgePosite">
									<image src="/static/images/icon_bus@2x.png" mode="" class="moduleListImg"></image>
									<u-badge v-if="waittingCount>0" :isDot="true" type="primary"
										style="background:#FF5A5A ;" class="badgePosites"></u-badge>
								</view>
								<text>待处理业务</text>
							</view>
							<view class="moduleList flexAC" @click="systemMsg">
								<view class="badgePosite">
									<image src="/static/images/index.png" mode="" class="moduleListImg"></image>
									<u-badge v-if="detailCount>0" :isDot="true" type="primary"
										style="background:#FF5A5A ;" class="badgePosites"></u-badge>
								</view>
								<text>系统消息</text>
							</view>


						</view>
					</view>

				</view>

			</view>
			<!--消息列表 @click="login"-->

			<view class="noice">
				<view class="noiceTip flexAB">
					<view class="flexA noiceTips">
						消息
						
						<!-- <image src="/static/images/icon_canl@2x.png" mode="" class="noiceTipsImg"></image> -->
						<view class="flsButton flex">
							<u-search style=" width: 430rpx;" placeholder="请输入搜索内容"  v-model="inputName" @custom="searchConfirm"
								@search="search" ></u-search>
							<!-- <input v-if="false" class="searchContianer" @input="clearSearchUser" v-model="inputName" /> -->
							<!-- <view class="searchContianer"> :action-style="searchStyle"

						</view> -->
							<!-- <image v-if="false" src="/static/images/search_news.png" mode="" class="flsIndexIcon"
								@click="serchUser"></image> -->
							<!-- <image src="/static/images/icon_set@2x.png" mode="" class="flsIndexIcon"></image> -->
						</view>
					</view>
				</view>
				<view v-for="(item,index) in noiteList" :key="index" @click="clickInfo(item,index)">
			 	<view class="noiceList flexAB">
						<!-- <view class="noiceListImgs" :style="item.type==0?'background:#378EFF;':(item.type==1?'background:#FFA041;':'')">
			  		<image class="noiceListImg" :src="item.type==0?'/static/images/icon_sys@2x.png':(item.type==1?'/static/images/icon_ser@2x.png':item.avatar)" mode="" :style="item.type==2?'width:88rpx;height: 88rpx':''"></image>
			  	</view> -->
						<!-- v-if="item.groupType==0" -->
						<view class="noiceListImgs">
							<image class="noiceListImg"
								:src="item.patientAvatar&&item.patientAvatar!='https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'?item.patientAvatar:'/static/images/user_default_icon.png'"
								mode="" style="width:88rpx;height: 88rpx"></image>
						</view>
						<!-- <view class="noiceListImgs flexABW" v-if="item.groupType==1">
					<image class="noiceListImg" v-for="(items,indexs) in item.doctorTeamPeopleList" :key="indexs" :src="items.avatar" mode="" style="width:40rpx;height: 40rpx"></image>
				</view> -->
						<view class="noiceInfo">
							<view class="flexAB">
								<view class="">
									<!-- {{item.type==0?'系统消息':(item.type==1?'服务提醒':item.nickname)}} -->
									<!-- {{item.nickname}} -->
									{{item.patientName}}
									<span v-if="item.groupType==1">{{'('+item.nickname+')'}}</span>
								</view>
								<text class="timeText">{{item.msgTime}}</text>
							</view>
							<view class="flexAB" style="margin-top:10rpx;">
								<text class="lastMsg">{{item.lastMsg}}</text>
								<u-badge type="primary" color="#fff" style="background:#FF5A5A ;"
									:value="item.hasNewMsg" v-if="item.hasNewMsg >0"></u-badge>

							</view>
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
				pageNum: 1,
				noiteList: [

				],
				docInfos: '',
				pageSize: 10,
				totals: 0,
				detailCount: 0,
				inputName: null,
				waittingCount: 0,
				searchStyle:{color:'black','font-size':'20px'},
				upOption:{
					use:false,
					empty:{
						use:true
					}
				}
			}
		},
		onLoad() {

			// this.chatUserPageChatUsers()
		},
		onShow() {
			this.docInfo()
			this.pageNum = 1
			let page = {
				num: 1
			}
			this.noiteList = []
			this.upCallback(page)
			this.getCount()
			this.getWaittingCount()
			uni.$on('message', this.getMessage)
			// this.getMessage()
			// console.log('是否有socket实例', getApp().globalData.socketObj)
		},
		onUnload() {
			uni.$off('message', this.getMessage)
		},
		onReachBottom: function() {
			if (this.totals > this.noiteList.length) {
				console.log('到底了',this.totals,this.noiteList.length)
				console.log(this.pageNum)
				// this.pageNum = this.totals/this.pageSize
				this.pageNum++
				let page = {
					num: this.pageNum
				}
				this.upCallback(page)
			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '/pages/index/login'
				})
			},
			searchConfirm: function(value) {
				console.log('输入框内容' + value)
				if (value) {
					this.serchUser()
				} else {
					this.clearSearchUser()
				}

			},
			search: function(value) {
				console.log('回车输入框内容' + value)
				if (value) {
					this.serchUser()
				} else {
					this.clearSearchUser()
				}
			},
			docInfo() {
				this.api.docInfo().then(res => {
					if (res.code == 0) {
						getApp().globalData.docInfo = res.data
						this.docInfos = res.data
						console.log('获取医生信息' , this.docInfos)
					}
				})
			},
			getCount() {
				this.api.upcomingGetCount().then(res => {
					// console.log('今日处理业务',res)
					if (res.code == 0) {
						this.detailCount = res.data
					}
				})
			},
			getWaittingCount() {
				let body = {

				}
				this.api.getWaittingCount(body).then(res => {
					// console.log('今日处理业务',res)
					if (res.code == 0) {
						this.waittingCount = res.data
					}
				})
			},
			menuJump() {
				uni.navigateTo({
					url: '/pages/patient/dayPatient'
				})
			},
			clickInfo(item, index) {
				// console.log('token',uni.getStorageSync('userInfoFLS').access_token)
				this.api.chatUserGetChat({
					chatUserId: item.chatUserId
				}).then(res => { //patientOtherOrderStatus;//图文咨询状态//0-待接收 1-接收 2-拒绝
					if (item.groupType == 0) {
						if (res.code == 0 && res.data && res.data.patientOtherOrderStatus == 0) {
							console.log('有待接收的图文咨询申请单聊')
							uni.navigateTo({
								url: `../chat/information?id=${res.data.patientOtherOrderNo}&str2=0&from=chatlist&targetUid=${item.targetUid}&name=${item.nickname}&chatType=0&chatId=${item.chatUserId}&groupType=${item.groupType}`
							})
						} else {
							uni.navigateTo({
								url: `/pages/chat/chat?targetUid=${item.targetUid}&name=${item.nickname}&chatType=0&chatId=${item.chatUserId}
								&patientOtherOrderId=${res.code==0&&res.data&&res.data.patientOtherOrderStatus!=0?res.data.patientOtherOrderNo:null}
								&serviceEndTime=${res.data.serviceEndTime}&patientId=${item.patientId}`
							})
						}

					} else if (item.groupType == 1) {
						if (res.code == 0 && res.data && res.data.patientOtherOrderStatus == 0) {
							console.log('有待接收的图文咨询申请群聊')
							uni.navigateTo({
								url: `../chat/information?id=${res.data.patientOtherOrderNo}&str2=0&from=chatlist&chatUserId=${item.chatUserId?item.chatUserId:0}&targetUid=${item.targetUid}&name=${item.nickname}&chatType=1&chatId=${item.chatUserId}&teamId=${res.data.teamId}&groupType=${item.groupType}`
							})
						} else {
							uni.navigateTo({
								url: `/pages/chat/chat?chatUserId=${item.chatUserId?item.chatUserId:0}&name=${item.nickname}
								&chatType=1&targetUid=${item.targetUid}&chatId=${item.chatUserId}
								&patientOtherOrderId=${res.code==0&&res.data&&res.data.patientOtherOrderStatus!=0?res.data.patientOtherOrderNo:null}
								&serviceEndTime=${res.data.serviceEndTime}&patientId=${item.patientId}`
							})
						}

					}
				})
				return


			},
			business() {
				uni.navigateTo({
					url: '/pages/business/business'
				})
			},
			systemMsg() {
				uni.navigateTo({
					url: '/pages/systemmsg/systemmsg'
				})
			},
			downCallback() {
				console.log('下拉刷新')
				let page = {
					num: 1
				}
				this.pageNum = 1
				this.noiteList = []
				this.upCallback(page)
				// this.mescroll.resetUpScroll();
			},
			clearSearchUser() {
				if (!this.inputName) {
					let page = {
						pageNum: 1,
						pageSize: this.pageSize,
						num: 1,
					}
					this.noiteList = []
					this.upCallback(page, 'clearSearch')
				}
			},
			serchUser() {
				let page = {
					pageNum: 1,
					pageSize: this.pageSize,
					num: 1,
				}
				this.noiteList = []
				this.upCallback(page, 'search')
			},
			upCallback(page, type) { //加载
				let that = this
				let data = {
					pageSize: this.pageSize,
					pageNum: page.num,
				}
				if (type == 'search') {
					data.searchName = this.inputName
				}
				// console.log(page,'消息列表提交参数',data)
				this.api.chatUserPageChatUsers(data).then(res => {
					// if(type=='search'){
					// 	console.log('搜索列表',res)
					// }
					// if(type=='clearSearch'){
					// 	console.log('清除搜索',res)
					// }
					// console.log('消息列表',page.num,this.pageSize,res)
					if (res.code == 0 && res.data.records.length > 0) {
						let curPageData = res.data.records;
						let curPageLen = res.data.records.length;
						let totalPage = res.data.total;
						this.totals = res.data.total
						this.detailTime(res.data.records)
						if (page.num == 1) this.noiteList = [];
						this.noiteList = this.noiteList.concat(curPageData);
						this.mescroll.endByPage(curPageLen, totalPage);
						console.log('执行了 noiteList-->',this.noiteList.length)
					} else {
						if (page.num == 1) {
							this.noiteList = []
						}
						// this.noiteList = []
						this.mescroll.endByPage(0, 1);
						console.log('执行了 noiteList-->',this.noiteList.length)
						// if (this.noiteList.length == 0) {
						// 	this.mescroll.endByPage(0, 1);
						// }

					}

					// console.log('收到新消息')
				}).catch(reg => {
					this.noiteList = []
					this.mescroll.endByPage(0, 1);
				})


			},
			getMessage(res) {
				let that = this
				let params = {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				}
				let dataMsg = JSON.parse(res.data)


				// getApp().globalData.callback = function(res) {
				// let dataMsg = JSON.parse(msg.data)
				if (dataMsg.msgType == 'AUTH_RESULT') {

				} else if (dataMsg.msgType == 'PING') {

				} else if (dataMsg.msgType == 'REQUEST_READ') {

				} else if (dataMsg.msgType == 'AUTH_REQUIRED') {

				} else {
					// console.log('新消息',dataMsg)
					// if (data.msgType == 'TIP_GROUP_NEWMESSAGE') {
					// console.log('&&&&&&&&&','新对话框')
					if (that.noiteList.length <= 0) {
						// console.log('消息列表为空',dataMsg)
						that.api.chatUserPageChatUsers(params).then(res => {
							if (res.code == 0) {
								that.detailTime(res.data.records)
								that.noiteList = res.data.records
								that.totals = res.data.total
							}
						})
					} else {
						// console.log(that.chatList,data,JSON.parse(data.msg),"=============================")
						let have = true;
						that.noiteList.map((item, index, arr) => {
							let msg = JSON.parse(dataMsg.msg)
							if (item.chatUserId == dataMsg.chatUserId) {
								that.noiteList.splice(index, 1)
								item.lastMsg = msg.msg

								item.hasNewMsg = item.hasNewMsg ? item.hasNewMsg + 1 : 1;
								// console.log('收到了有该对话',dataMsg)
								// item.lastChatTime=that.detailTime(msg.createTime)

								that.noiteList.unshift(item)
								have = false;
								return;
							} else {
								// console.log('没有该对话的消息',dataMsg)
								that.api.chatUserPageChatUsers(params).then(res => {
									if (res.code == 0) {
										that.detailTime(res.data.records)
										that.noiteList = res.data.records
										that.totals = res.data.total
									}
									// that.chatList = res.data.records
									// that.total=res.data.total
									// that.iniList(that.chatList)
								})
							}
						})
						if (have) {
							that.api.chatUserPageChatUsers(params).then(res => {
								if (res.code == 0) {
									that.detailTime(res.data.records)
									that.noiteList = res.data.records
									that.totals = res.data.total
								}
								// that.chatList = res.data.records
								// that.total=res.data.total
								// that.detailTime(that.chatList)
							})
						}
					}
				}
				// }
			},
			detailTime(list) {
				list.forEach((item, index, arr) => {
					let msgTime
					item.msgTime = ''
					if (item.lastChatTime) {
						msgTime = item.lastChatTime.split('-')[1] + '-' + item.lastChatTime.split('-')[2]
						item.msgTime = msgTime
					}
				})
				return list
			},
		}
	}
</script>

<style scoped lang="less">
	.flsIndex {
		min-height: 100vh;
		background: #f2f2f2;

		.flsBg {
			background: #378EFF;

			// .flsButton {
				
			// 	width: 90%;
			// 	justify-content: flex-end;
			// 	padding: 0 0 40rpx 0;
			// 	align-items: center;
			// 	margin-left: 180rpx;
			// 	.searchContianer {
			// 		width: 400rpx;
			// 		height: 60rpx;
			// 		border-radius: 10rpx;
			// 		background-color: rgba(205, 236, 255, 0.2);
			// 		padding: 0 20rpx;
			// 		color: #fff;
			// 	}

			// 	.flsIndexIcon {
			// 		width: 44rpx;
			// 		height: 44rpx;
			// 		display: flex;
			// 		margin: 0 15rpx;
			// 	}
			// }

			.docInfo {
				height: 250rpx;
				background: #fff;
				position: relative;
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
				padding: 0 24rpx;

				.docName {
					font-size: 14px;
					padding: 10rpx 30rpx;
					color: #222;
					position: absolute;
					top: -30rpx;
					height: 180rpx;
					flex: 1;

					.docImg {
						width: 124rpx;
						height: 124rpx;
						display: flex;
						background: #fff;
						border-radius: 50%;
					}

					text {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #000000;
						margin-left: 20rpx;
					}

				}

				.lineWhite {
					height: 120rpx;
				}

				.patient {

					.module {
						.moduleList {
							width: 330rpx;
							height: 90rpx;
							border: 2rpx solid #E2E2E2;
							opacity: 1;
							border-radius: 10rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 90rpx;
							margin-top: 20rpx;
							color: #000000;

							.badgePosite {
								position: relative;
								width: 48rpx;
								height: 48rpx;
								margin-right: 20rpx;

								.badgePosites {
									position: absolute;
									right: -10rpx;
									top: -10rpx;
								}

								.moduleListImg {
									width: 48rpx;
									height: 48rpx;
									display: flex;

								}
							}


						}
					}
				}
			}

		}


		.noice {

			padding: 40rpx 22rpx;
			background: #fff;
			margin: 22rpx auto 0;

			.noiceTip {
				font-size: 12px;
				color: #666;

				.noiceTips {
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #222222;
					display: flex;
					flex-direction: row;
					// align-items: center;

					// background-color: red;
					.noiceTipsImg {
						width: 52rpx;
						height: 52rpx;
						display: flex;
						margin-left: 22rpx;
					}
				}
			}

			.noiceList {
				margin: 30rpx auto;
				padding: 20rpx;

				.noiceListImgs {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 88rpx;
					height: 88rpx;
					margin-right: 32rpx;
					border-radius: 10rpx;

					.noiceListImg {
						width: 52rpx;
						height: 52rpx;
					}
				}

				.noiceInfo {
					flex: 1;
					width: 580rpx;
					height: 88rpx;
					display: flex;
					justify-content: space-between;
					flex-direction: column;

					view {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #222222;
					}

					text {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #BDBDBD;
					}
				}

			}
		}
	}

	.flsButton {

		justify-content: flex-end;
		// padding: 0 0 0rpx 0;
		align-items: center;
		margin-left: 180rpx;
		font-weight: 500;
		font-size: 15px;

		.searchContianer {
			width: 400rpx;
			height: 60rpx;
			border-radius: 10rpx;
			// background-color: rgba(205, 236, 255, 0.2);
			border: 1px solid #c5c5c5;
			padding: 0 20rpx;
		}

		.flsIndexIcon {
			width: 44rpx;
			height: 44rpx;
			display: flex;
			margin: 0 15rpx;
		}
	}

	.lastMsg {
		word-wrap: break-word;
		word-break: break-all;
		width: 500rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1; /** 显示的行数 **/
	}

	.timeText {
		font-size: 13px;
	}
</style>
