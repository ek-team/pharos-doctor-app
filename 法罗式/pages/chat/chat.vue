<template>
	<view class="chat">
		<!-- 发送语音背景图 -->
		<view class="voiceBg" v-if="showVoiceInput" @click='closeVoiceBg'>
			<view class="vioceActiveBox">
				<image src="/static/images/bg_gif1@2x.gif" class="voiceActiveImg"></image>
			</view>
			<view class="optionBox">
				<view class="optionSend">松开</view>
				<view>发送</view>
			</view>
			<image src="/static/images/bg_yuyin@2x.png" class="voiceBgImg"></image>
		</view>
		<!-- 图文咨询详情 -->
		<view class="imforContent" v-if="patientOtherOrderId!='null'&&patientOtherOrderId" @click="toInformation">
			<view class="topItem">
				<image class="topItemIcon" src="/static/images/graphic_consul_icon.png"></image>
				图文咨询详情
			</view>
		</view>
		<!-- 会话结束提醒 -->
		<view class="tipContent" :style="{'top':topHeigh}" v-if="showTip">
			<view class="topTipItem">
				咨询已关闭，该患者无法主动向你发送消息！
				<image class="topTipItemIcon" src="/static/images/icon_clear.png" @click="clearTips"></image>
			</view>
		</view>
		<hx-navbar ref="hxnb" :config="config">
			<view slot="right" class="slotRight flexA" @click="chatMenuType = !chatMenuType">
				<image src="/static/images/icon_set@3x.png" mode="" class="chatMenuIcon"></image>
			</view>
		</hx-navbar>

		<scroll-view :refresher-enabled="enabledScroll" :scroll-into-view="toView" :refresher-threshold="30"
			:enable-flex="true" :scroll-with-animation="true" style="height:fit-content;max-height: 87vh;"
			class="purchase-body rotateDiv" :eventhandle="true" @scrolltolower="refreshData" scroll-x="false"
			scroll-y="true" :enhanced="true" :paging-enabled="true">
			<view v-if="showImgs" style="width: 200rpx;height: 250rpx;"></view>
			<view style="width: 200rpx;height:100rpx;"></view>
			<view class="chatInfo">
				<view class="chatList">
					<view :class="index==0?'lastChatInfos chatInfos':'chatInfos'" v-for="(item,index) in chatList"
						:key="index" :id="'msg-'+index">
						<view class="time">
							{{item.createTime}}
						</view>
						<!--医生的信息-->
						<view class="docInfo flex" v-if="item.fromUid == docInfo.id">
							<view class="docInfos">
								<view class="name">{{item.user.showName?item.user.showName:item.user.nickname}}</view>
								<!--文字信息-->
								<view class="content requesContent" v-if="item.msgType=='MESSAGE_TEXT'">
									<view>{{item.msg}}</view>
								</view>
								<!--表单信息-->
								<view class="content videoContent formContent" v-if="item.msgType=='FORM'"
									@click="toFormDetail(item,2)">
									<image src="/static/images/icon_for@2x.png" mode="" class="formImg"></image>
									<view class="formTitle">{{item.form? item.form.title:''}}</view>
								</view>
								<!--患教文章-->
								<view class="content videoContent formContent" v-if="item.msgType=='ARTICLE'"
									@click="toArticleDetail(item)">
									<image src="/static/images/icon_for@2x.png" mode="" class="formImg"></image>
									<view class="articleTitle">{{item.article? item.article.title:''}}</view>
								</view>

								<!-- 语音信息 -->
								<view class="content videoContent"
									@click="voiceActive(item.url,index,item.id,item.fromUid)"
									v-if="item.msgType=='VIDEO'">
									<view>{{item.videoDuration}}s″</view>
									<image src="/static/images/voice_right.png" class="msgVideo"></image>
									<view v-if="item.msgType=='VIDEO'&&index==playIndex&&isPlayVoice"
										class="playVoiceBox rightImg">
										<image src="/static/images/playVoice.png" class="voiceImg" v-if="!playImgone">
										</image>
										<image src="/static/images/playVoice.png" class="voiceImg"></image>
									</view>
								</view>

								<!--图片信息作为展示-->
								<view class="content" style="background: white;" v-if="item.msgType=='MESSAGE_PIC'">

									<image :src="item.url" mode="" class="mesImg" @click="watchImg(item.url)"></image>
								</view>
								<!-- 视频信息 -->
								<u-parse class="content requesContent" style="background: white;"
									v-if="item.msgType=='VIDEO_URL'" :pauseVideo="true" :content="item.content">
								</u-parse>
								<!-- <view class="content mpContainer" v-if="item.msgType=='VIDEO_URL'">
									<video :src="item.url" class="mpContent" enable-danmu danmu-btn controls>

									</video>
								</view>    -->
								<!-- 随访消息 -->
								<view class="content requesContent" v-if="item.msgType=='FOLLOW_UP_PLAN'"
									@click="suifnagplant(item)">
									<view class="">
										消息类型:{{item.msg}}
									</view>
									<view class="" v-if="item.followUpPlanNotice">
										提醒:{{item.followUpPlanNotice.followUpPlanContent.notice}}
									</view>
									<view class="" v-if="item.followUpPlanNotice">
										随访阶段:{{item.followUpPlanNotice.push}}/{{item.followUpPlanNotice.totalPush}}
									</view>
									<view class="" v-if="item.followUpPlanNotice">
										查看详情>>
									</view>
								</view>
							</view>
							<image src='/static/images/icon_doctor.png' alt="" class="avatorImg"></image>
							<!-- <image :src="item.user.avatar?item.user.avatar:'/static/images/icon_doctor.png'" alt=""
								class="avatorImg"></image> -->
						</view>
						<!--患者的信息-->
						<view class="patientInfo flex" v-if="item.fromUid !== docInfo.id">
							<image class="avatorImg" @click="toPatientDetail(item)"
								:src="item.user&&item.user.avatar&&item.user.avatar!='https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'?item.user.avatar:'/static/images/user_default_icon.png'"
								alt=""></image>
							<view class="patientInfos">
								<view v-if="item.user" class="name">{{item.fromUid==targetUid?item.user.patientName:item.user.nickname}}
								</view>
								<!--文字信息-->
								<view class="content requesContent" v-if="item.msgType=='MESSAGE_TEXT'">
									{{item.msg}}
								</view>
								<!-- 患者语音消息 -->
								<view class="content videoContent"
									@click="voiceActive(item.url,index,item.id,item.fromUid)"
									v-if="item.msgType=='VIDEO'">
									<image src="/static/images/voice_left.png" class="msgVideo leftVideo"></image>
									<view>{{item.videoDuration}}s″</view>
									<view v-if="item.msgType=='VIDEO'&&index==playIndex&&isPlayVoice"
										class="leftVoiceBox rightImg">
										<image src="/static/images/playVoice.png" class="voiceImg" v-if="!playImgone">
										</image>
										<image src="/static/images/playVoice.png" class="voiceImg"></image>
									</view>
								</view>
								<!--表单信息-->
								<view class="content videoContent formContent" v-if="item.msgType=='FORM'"
									@click="toFormDetail(item,1)">
									<image src="/static/images/icon_for@2x.png" mode="" class="formImg"></image>
									<view class="formTitle">{{item.form? item.form.title:''}}</view>
								</view>
								<!--图片信息-->
								<view class="content" v-if="item.msgType=='MESSAGE_PIC'">
									<image :src="item.url" mode="" class="mesImg" @click="watchImg(item.url)"></image>
								</view>
								<!-- 视频信息 -->
								<u-parse class="content requesContent" v-if="item.msgType=='VIDEO_URL'"
									:pauseVideo="true" :content="item.content">
								</u-parse>
								<!-- <view class="content" v-if="item.msgType=='VIDEO_URL'">
									<video :src="item.url" class="" style=" width:500rpx;"></video>
								</view> -->
								<!-- 图文咨询 -->
								<view class="content requesContent" v-if="item.msgType=='PIC_CONSULTATION'"
									@click="information(item)">
									<view class="">
										咨询类型:{{item.msg}}
									</view>
									<view>咨询描述:{{item.patientOtherOrder.illnessDesc}}</view>
									<!-- <view>订单编号:{{item.patientOtherOrder.orderNo}}</view> -->
									<!-- @click.stop="watchImg(item.patientOtherOrder.imageUrlList[0])" -->
									<image
										v-if="item.patientOtherOrder.imageUrlList&&item.patientOtherOrder.imageUrlList.length>0"
										:src="item.patientOtherOrder.imageUrlList[0]" mode="" style="max-width: 360rpx;" class="mesImg"></image>
									<view class="">
										<!-- <span style="color:#007AFF" v-if="item.str2==0">待接收</span>
										<span style="color:#8b8b8b" v-if="item.str2==1">已接收</span>
										<span style="color:#8b8b8b" v-if="item.str2==2">已拒绝</span> -->
										<!-- <span style="margin-left: 10rpx;">查看详情>></span> -->
										查看详情
									</view>
								</view>
								<!-- 随访消息 -->
								<view class="content requesContent" v-if="item.msgType=='FOLLOW_UP_PLAN'"
									@click="suifnagplant(item)">
									<view class="">
										消息类型:{{item.msg}}
									</view>
									<view class="" v-if="item.followUpPlanNotice">
										提醒:{{item.followUpPlanNotice.followUpPlanContent.notice}}
									</view>
									<view class="" v-if="item.followUpPlanNotice">
										随访阶段:{{item.followUpPlanNotice.push}}/{{item.followUpPlanNotice.totalPush}}
									</view>
									<view class="" v-if="item.followUpPlanNotice">
										查看详情>>
									</view>
								</view>


							</view>

						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="inputButton " :style="showImgs?'padding: 30rpx 0 0 0;':'padding: 30rpx 0 ;'">
			<view class="flexAB" style="padding: 0 34rpx;">
				<image src="/static/images/btn_yuyin@2x.png" class="showImg leftOption" @click="showVoiceImg"
					v-if="inputText"></image>
				<image src="/static/images/btn_dazi@2x.png" class="showImg leftOption" @click="inputText=true"
					v-if="!inputText"></image>
				<view v-if="!inputText" class="innerPuters voiceInput" @longpress="startVoice" @touchend="stopVoice">按住
					说话</view>
				<textarea v-if="inputText" v-model="innerValue" auto-height="true" @focus="focusChange" @input="inputSendText"
					cursor-spacing="30" :show-confirm-bar="false" type="text" placeholder="请输入咨询内容"
					class="innerPuters" />
				<!-- :disable-default-padding="true" -->
				<image src="/static/images/icon_add@2x1.png" mode="" class="showImg rightOption" @click="openMore"
					v-if="!inpuInfo"></image>
				<view class="" @click="sendMsg('text')" v-if="inpuInfo">
					发送
				</view>
			</view>
			<view class="resourcesList" v-if="showImgs">
				<view class="" @click="selctImg" style="margin-right:48rpx;">
					<view class="pohoeImg flexCC">
						<image src="/static/images/icon_pic@2x.png" mode="" class="pohoeImgs"></image>
					</view>

					<view class="">
						相册
					</view>
				</view>
				<view class="" @click="selectVedio" style="margin-right:48rpx;">
					<view class="pohoeImg flexCC">
						<image src="/static/images/icon_php@2x.png" mode="" class="pohoeImgs"></image>
					</view>

					<view class="">
						视频
					</view>
				</view>
				<view class="" @click="toMyCommonWords" style="margin-right:48rpx;">
					<view class="pohoeImg flexCC">
						<image src="/static/images/common_words1.png" mode="" class="pohoeImgs"></image>
					</view>

					<view class="">
						常用语
					</view>
				</view>

				<view class="" @click="toFollowUp" style="margin-right:48rpx;">
					<view class="pohoeImg flexCC">
						<image src="/static/images/plan_icon.png" mode="" class="pohoeImgs"></image>
					</view>

					<view class="">
						随访计划
					</view>
				</view>

				<view class="" @click="tosendForm" style="margin-right:48rpx;">
					<view class="pohoeImg flexCC">
						<image src="/static/images/send_form_icon.png" mode="" class="pohoeImgs"></image>
					</view>

					<view class="">
						表单推送
					</view>
				</view>
				<view class="" @click="tosendArticle" style="margin-right:48rpx;">
					<view class="pohoeImg flexCC">
						<image src="/static/images/send_form_icon.png" mode="" class="pohoeImgs"></image>
					</view>

					<view class="">
						患教文章
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="chatMenuType" mode="top" @close="chatMenuType = false" @open="chatMenuType=true">
			<view class="chatMenu flexAB">
				<view class="chatMenus" @click="patnent()">
					<image src="/static/images/icon_pat@3x.png" mode="" class="chatMenusImg"></image>
					<view class="chatMenusText">
						患者信息
					</view>
				</view>
				<view class="chatMenus" @click="medicalRecord">
					<image src="/static/images/icon_med@3x.png" mode="" class="chatMenusImg"></image>
					<view class="chatMenusText">
						电子病历
					</view>
				</view>
				<view class="chatMenus" @click="addCase">
					<image src="/static/images/icon_new@3x.png" mode="" class="chatMenusImg"></image>
					<view class="chatMenusText">
						新增病例
					</view>
				</view>
				<view class="chatMenus" @click="endConversation">
					<image src="/static/images/icon_don@3x.png" mode="" class="chatMenusImg"></image>
					<view class="chatMenusText">
						结束会话
					</view>
				</view>
				<view class="chatMenus" @click="userReport">
					<image src="/static/images//icon_car@2x.png" mode="" class="chatMenusImg"></image>
					<view class="chatMenusText">
						举报
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="userReportShow" mode="center" @close="userReportShow = false" @open="userReportShow=true">
			<view class="inputInfos">
				<view class="">举报内容</view>
				<textarea type="text" v-model="reportText" placeholder="请输入文本内容" class="inputInfoa"></textarea>
			</view>
			<button @click="reportConfirm" style="margin-bottom: 20rpx;">确定</button>
		</u-popup>
	</view>
</template>

<script>
	// import myVideo from '@/components/myVideo.vue'
	// import yyVideoPlayer from '@/components/yy-video-player/yy-video-player.nvue';
	import WebSocketClass from '../../common/webSocket'
	const recorderManager = uni.getRecorderManager()
	const innerAudioContext = uni.createInnerAudioContext()
	innerAudioContext.autoplay = false
	import {
		dateToTimestamp
	} from '@/static/utils/utils.js'
	export default {
		data() {
			return {
				formId: null, //推送的表单id
				playImgone: false,
				setTimeFun: null,
				playIndex: 0,
				isPlayVoice: false,
				videoUrl: null, //语音地址
				videoLength: 0, //语音时长
				timer: null,
				toView: 'msg-9',
				triggered: false, //刷新
				enabledScroll: false, //滚动条是否禁止
				showVoiceInput: false, //语音背景
				inputText: true, //输入文字
				showImgs: false,
				innerValue: '',
				inpuInfo: false,
				chatMenuType: false,
				articleId: 0,
				config: { //自定义头部配置信息
					title: '张医生的团队',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1, ['#4C6DE7', '#4C6DE7']],
					rightSlot: true,
				},
				chatList: [{
					followUpPlanNotice: {
						followUpPlanContent: {
							notice: ''
						}

					}
				}],
				// scrollTop:100000,
				scrollTop: 10,
				pageNum: 1,
				targetUid: 0,
				chatUserId: 0,
				pageSize: 10,
				pageNum: 1,
				urlImg: '',
				docInfo: '',
				chatType: 0, //0单聊1群聊,
				chatId: null,
				patientOtherOrderId: null,
				teamId: null,
				videoMpUrl: null,
				// loadList:[],
				view: '',
				showTip: false,
				topHeigh: '100rpx',
				picList: [],
				userReportShow: false,
				reportText: '',
				patientId: null


			};
		},
		components: {
			// yyVideoPlayer,
			// myVideo
		},
		onLoad(option) {
			console.log('option',option)
			this.chatId = option.chatId
			this.targetUid = option.targetUid //患者id
			this.chatUserId = option.chatUserId //群聊id
			this.patientId = option.patientId
			console.log('病人Id-->', this.patientId)
			this.topHeigh = (uni.getSystemInfoSync().statusBarHeight + 44) * 2 + 'rpx'
			// this.styleVar['--topHeigh'] = (uni.getSystemInfoSync().statusBarHeight + 44)*2 + 'rpx'
			// this.docInfo = getApp().globalData.docInfo
			// console.log(this.docInfo)
			console.log('设置高度--->', this.topHeigh)
			this.config.title = option.name
			this.chatType = option.chatType
			this.patientOtherOrderId = option.patientOtherOrderId
			this.teamId = option.teamId
			console.log(option.serviceEndTime)
			if (option.serviceEndTime) {
				var endTimestamp = dateToTimestamp(option.serviceEndTime)
				console.log(endTimestamp)
				console.log(new Date().getTime())
				if (new Date().getTime() > endTimestamp) {
					this.showTip = true
				} else {
					this.showTip = false
				}
			}
		},
		onShow() {
			this.docInfo = getApp().globalData.docInfo
			console.log(this.docInfo)
			this.pageNum = 1,
				this.chatList = []
			this.sendReadMsg()
			this.chatMsgQueryChatMsgHistory()

		},
		onUnload() {
			uni.removeStorageSync('sendText')
			this.sendReadMsg()
			// this.sendMsg('reder')
			this.offSocker()
			this.closeVoice()
		},
		// onPullDownRefresh(){
		// 	this.pageNum ++
		// 	this.$nextTick(function() {
		// 		this.scrollTop = 0
		// 	});
		// 	this.chatMsgQueryChatMsgHistory()
		// },
		methods: {
			sendReadMsg() {
				let params = {
					myUserId: this.docInfo.id,
				}
				if (this.chatUserId) {
					params.chatUSerId = this.chatId
				} else {
					params.targetUid = this.targetUid
				}
				this.api.chatMsgReadMsg(params).then(res => {
					// console.log('res',res,params)
				})
			},
			getAllPic() {
				let params = {
					msgId: this.chatList.length > 0 ? this.chatList[0].id : 0,
				}
				if (params.msgId != 0) {
					this.api.getChatAllMsgPic(params).then(res => {
						if (res.code == 0 && res.data) {
							this.picList = res.data.reverse()
						}
						console.log('res', res)
					})
				}


			},
			closeVoice() { //退出聊天页停止播放语音
				this.isPlayVoice = false
				innerAudioContext.stop();
				innerAudioContext.autoplay = false
				clearInterval(this.setTimeFun)
				this.closeVoiceBg()
			},
			offSocker() {
				uni.$off('message', this.getMessage)
				// getApp().globalData.socketObj.closeSocket()
				// getApp().globalData.socketObj = null
			},
			patnent() { //获取患者id
				this.offSocker()
				uni.navigateTo({
					url: `/pages/patient/patientDetail?id=${this.targetUid}&chatId=${this.chatId}&teamId=${this.teamId}`
				})

			},
			addCase() {
				this.offSocker()
				uni.navigateTo({
					url: `/pages/case/addCase?id=${this.targetUid}`
				})
			},
			userReport() {
				this.userReportShow = true
				this.chatMenuType = false
			},
			reportConfirm() {
				if (this.reportText.length <= 0) {
					uni.showToast({
						title: '请输入举报内容',
						icon: 'none'
					})
					return
				}
				let params = {
					reportDesc: this.reportText,
				}
				this.api.userReoport(params).then(res => {
					console.log('举报返回----->', res)
					if (res.code == 0) {
						uni.showToast({
							title: '提交成功',
							icon: 'none'
						})
					}

				})
				this.userReportShow = false
				this.chatMenuType = false
			},
			// 结束对话
			endConversation() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确认结束当前会话吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('会话id----------->' + that.chatId)
							that.api.endChatByChatUserId({
								chatUserId: that.chatId
								// chatUserId:that.chatUserId
							}).then(res => {
								uni.showToast({
									title: '已结束会话！',
									icon: 'none',
									duration: 1000
								})
								uni.navigateBack({
									delta: 1
								})
							})
						} else if (res.cancel) {
							uni.showToast({
								title: '已取消',
								icon: 'none',
								duration: 1000
							})
						}
					},
				})

			},
			medicalRecord() {
				this.offSocker()
				uni.navigateTo({
					url: `../patient/medicalRecord?id=${this.targetUid}`
				})
			},
			suifnagplant(item) {
				this.offSocker()
				uni.navigateTo({
					url: `/pages/patient/followUpDetail?id=${item.followUpPlanNotice.followUpPlanId}`
				})
			},
			toInformation() {
				this.offSocker()
				uni.navigateTo({
					url: `./information?id=${this.patientOtherOrderId}&str2=1`
				})
			},
			clearTips() {
				this.showTip = false
			},
			information(item) {
				this.offSocker()
				uni.navigateTo({
					url: `./information?id=${item.patientOtherOrder.id}&str2=${item.str2}&msgId=${item.id}`
				})
			},
			getElementScollTop() {
				const query = uni.createSelectorQuery()
				query.select('.chatInfo').boundingClientRect((data) => {
						console.log(data, 'data')
						console.log(this.scrollTop)
						uni.pageScrollTo({
							scrollTop: this.scrollTop, //滚动的距离
							duration: 0, //过渡时间
						})

					})
					.exec()
			},
			// 查看患者详情
			toPatientDetail(item) {
				console.log('患者详情', this.targetUid, item.fromUid, this.patientId)
				// return
				if (this.targetUid == item.fromUid) {
					this.offSocker()
					uni.navigateTo({
						url: `/pages/patient/patientDetail?id=${this.targetUid}&chatId=${this.chatId}`
					})
				}

			},
			watchImg(item) {
				var index = 0
				for (var i = 0; i < this.picList.length; i++) {
					if (item === this.picList[i]) {
						index = i
					}
				}
				console.log('查看当前图片---->', item, index)
				uni.previewImage({
					current: index,
					urls: this.picList
				})
			},
			selctImg() { //打开本地相册
				uni.setStorageSync('openImage', 'openImage')

				let that = this
				uni.chooseImage({
					sourceType: ['album', 'camera'],
					sizeType: ['original', 'compressed'],
					count: 1,
					success: (res) => {
						console.log(res)
						const tempFilePaths = res.tempFilePaths; //获取到本地图片地址
						console.log(tempFilePaths[0])
						/* 上传图片 */
						const uploadTask = uni.uploadFile({
							// url : 'https://api.jhxiao-school.com/file/upload',
							url: 'https://home.ekang.tech/file/upload',
							filePath: tempFilePaths[0],
							fileType: 'image',
							methods: 'post',
							name: 'file',
							success: function(flieRes) {
								if (flieRes.data) {
									that.urlImg = JSON.parse(flieRes.data)
									that.sendMsg('img')
								}
							},
							fail: function(reg) {
								console.log(reg)
							}
						});
					}
				})
			},
			selectVedio() {
				let that = this
				uni.chooseVideo({
					maxDuration: 10,
					count: 1,
					// camera: this.cameraList[this.cameraIndex].value,
					sourceType: ['album', 'camera'],
					success: (res) => {
						// console.log('视频',JSON.stringify(res.tempFilePath))

						// return
						const uploadTask = uni.uploadFile({
							// url : 'https://api.jhxiao-school.com/file/upload',
							url: 'https://home.ekang.tech/file/upload',
							filePath: res.tempFilePath,
							methods: 'post',
							name: 'file',
							success: function(flieRes) {
								if (flieRes.data) {
									console.log('上传后的视频地址', JSON.parse(flieRes.data))
									that.videoMpUrl = JSON.parse(flieRes.data)
									// that.urlImg = JSON.parse(flieRes.data)
									that.sendMsg('mp4')
								}
							},
							fail: function(reg) {
								console.log(reg)
							}
						});
					},
					fail: (err) => {

					},
				})
			},
			toMyCommonWords() { //常用语
				uni.navigateTo({
					url: './myCommonWords'
				})
			},
			// 随访计划
			toFollowUp() {
				uni.navigateTo({
					url: '../patient/followUp'
				})
			},
			// 表单推送
			tosendForm() {
				uni.navigateTo({
					url: '../formInfo/formList?type=checkSend'
				})
			},
			tosendArticle() {
				uni.navigateTo({
					url: `/pages/sufferingarticles/sufferingarticles?userChatId=${this.targetUid}&teamChatId=${this.chatUserId}&chatType=${this.chatType}`

				})
			},
			shijianc(time) {
				let date = new Date(time)
				let Y = date.getFullYear() + '-'
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
				let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
				let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
				let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
				let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
				return Y + M + D + h + m + s
			},
			getMessage(msg) {

				let dataMsg = JSON.parse(msg.data)
				//计算时间
				if (dataMsg.msgType == 'AUTH_RESULT') {

				} else if (dataMsg.msgType == 'PING') {

				} else if (dataMsg.msgType == 'REQUEST_READ') {

				} else if (dataMsg.msgType == 'RESPONSE_MESSAGE') {
					console.log("kkkkkkkkkkkkkkkkkkkkkkk", dataMsg.data)
					for (let i = 0; i < this.chatList.length; i++) {
						if (this.chatList[i].id == dataMsg.data.id) {
							return
						}
					}
					if (dataMsg.data.msgType == 'VIDEO_URL') {
						// item.url='https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4'
						let content = '<video  style="max-width:100%;max-height: 600rpx;display:block;margin:0 auto;" src=' +
							dataMsg.data.url + '></video>'
						// console.log('视频富文本',content)
						dataMsg.data.content = content
					}
					dataMsg.data.createTime = this.shijianc(dataMsg.data.createTime)
					console.log('转化时间--->',dataMsg.data.createTime,dataMsg.data.createTime)
					this.chatList.unshift(dataMsg.data)



					//this.chatMsgQueryChatMsgHistory('refresh')
					// if(dataMsg.data.chatUserId){//患者消息
					// 	this.chatList.push(dataMsg.data)
					// 	this.scrollTop = 100001
					// 	this.getElementScollTop()
					// }else{
					// 	if(dataMsg.data.fromUid == this.docInfo.id){//医生信息
					// 		dataMsg.data.user = ''
					// 		dataMsg.data.createTime = this.shijianc(dataMsg.data.createTime)
					// 		dataMsg.data.user = this.docInfo
					// 		console.log(dataMsg.data)
					// 		this.chatList.push(dataMsg.data)
					// 		this.scrollTop = 100001
					// 		this.getElementScollTop()
					// 	}else{//出了医生本人信息
					// 		this.chatList.push(dataMsg.data)
					// 		this.scrollTop = 100001
					// 		this.getElementScollTop()
					// 	}
					// }




				} else {
					this.chatMsgQueryChatMsgHistory('refresh')
				}

			},
			chatMsgQueryChatMsgHistory(type) { //聊天历史
				let that = this
				let data = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}
				// console.log(data)
				if (this.chatType == 0) { //单聊
					data.targetUid = this.targetUid
				}
				if (this.chatType == 1) { //群聊
					data.chatUserId = this.chatUserId
				}
				if (this.patientId && this.patientId != 'undefined') {
					data.patientId = this.patientId
				}
				// console.log('聊天记录参数',data)
				this.api.chatMsgQueryChatMsgHistory(data).then(res => {
					if (res.code == 0) {
						console.log('聊天历史记录', res.data.records)
						let arr = res.data.records
						res.data.records.map(item => {
							// console.log('名字',item.user.nickname)
							if (item.msgType == 'VIDEO_URL') {
								// item.url='https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4'
								let content =
									'<video  style="max-width:100%;max-height: 600rpx;display:block;margin:0 auto;" src=' +
									item.url + '></video>'
								// console.log('视频富文本',content)
								item.content = content
							}
						})
						let list = type == 'refresh' ? arr : this.chatList.concat(arr)
						this.chatList = list
						if (that.pageNum == 1) {
							that.getAllPic()
							let listLength = that.chatList.length - 1
							that.toView = 'msg-' + listLength
						}
						// let arr  = res.data.records.reverse()
						// this.chatList=type=='refresh'?arr: arr.concat(this.chatList)
						// console.log('请求页数',that.pageNum)
						if (uni.getStorageSync('selfSend')) {
							let selfSendData = uni.getStorageSync('selfSend')
							if (selfSendData.type == 'text') {
								that.innerValue = selfSendData.msg
								console.log('发送常用语')
							} else if (selfSendData.type == 'form') {
								that.formId = selfSendData.msg
							} else if (selfSendData.type == 'article') {
								that.articleId = selfSendData.msg
							}
							uni.removeStorageSync('selfSend')
							that.sendMsg(selfSendData.type)

							console.log('移除缓存')
						}
						// uni.stopPullDownRefresh()
						// this.$nextTick(function() {
						// 	this.getElementScollTop()
						// });
						uni.$on('message', that.getMessage)
						// console.log('接收到消息')
						// return
						if (getApp().globalData.socketObj) {
							// 如果sockt实例未连接
							if (!getApp().globalData.socketObj.isConnect) {
								getApp().globalData.socketObj.initSocket()
								console.log('实例未连接,重新连接')
							}

						} else {
							return
							// 如果没有sockt实例，则创建
							getApp().globalData.socketObj = new WebSocketClass(
								`${getApp().globalData.socketUrl}`, 60
							)

							getApp().globalData.socketObj.initSocket()

							console.log('没有sockt实例，则创建')


							// setTimeout(function(){
							// 	that.sendMsg('reder')
							// },500)

						}
					}
				})
			},
			closeVoiceBg() {
				this.showVoiceInput = false
				clearInterval(this.timer)
			},
			// 语音输入
			startVoice(e) {
				console.log('长按')
				this.showVoiceInput = true
				this.videoLength = 0
				this.timer = setInterval(() => {
					// this.microphoneShow = !this.microphoneShow
					this.videoLength++
					// console.log('麦克风动图', this.microphoneShow)
				}, 1000)
				//开始录音的时候
				const options = {
					duration: 60000, //指定录音的时长，单位 ms
					sampleRate: 16000, //采样率
					numberOfChannels: 1, //录音通道数
					encodeBitRate: 96000, //编码码率
					format: 'mp3', //音频格式，有效值 aac/mp3
					frameSize: 50, //指定帧大小，单位 KB
				}
				//开始录音
				// 麦克风动

				recorderManager.start(options);
				recorderManager.onStart(() => {
					console.log('开始录音')
				});
				//错误回调
				recorderManager.onError((res) => {

					console.log(res, '错误回调');

				})

			},
			// 停止语音
			stopVoice() {
				console.log('结束长按')
				var that = this;
				recorderManager.stop();
				this.showVoiceInput = false
				clearInterval(this.timer)
				recorderManager.onStop((res) => {
					if (that.videoLength < 1) {
						uni.showToast({
							title: '说话时间太短',
							icon: "error"
						})
						console.log(that.videoLength, '长度')
						return
					}
					uni.showLoading({
						title: '发送中'
					})
					console.log('录音停止并上传')
					var src = res.tempFilePath; //语音临时文件
					uni.uploadFile({
						url: 'https://home.ekang.tech/file/upload',
						name: "file",
						filePath: src, //filePath只能是String
						// fileType:'image',
						methods: 'post',
						header: {
							// 'Content-Type':'application/json',
							'token': uni.getStorageSync('token')
						},
						formData: {
							//   user: 'tesdt'
						},
						success: function(flieRes) {
							if (flieRes.data) {
								that.videoUrl = JSON.parse(flieRes.data)
								that.sendMsg('video')
								uni.hideLoading()
								// app.sendSocketMessage(JSON.stringify(vedioMessage))
							}
						},
						fail: function(res) {
							uni.showToast({
								title: res.body,
								icon: 'none',
								duration: 2000
							});
						}
					});
				})
			},
			// 查看表单详情
			toFormDetail(item, type) {
				console.log('去表单页', item)
				if (type == 1) {
					uni.navigateTo({
						url: `../patient/userFormDetail?userId=${this.targetUid}&formId=${item.str1}&msgId=${item.str3}&chatGroupId=${item.str4}&from=chat` //表单详情页
					})
				} else {
					uni.navigateTo({
						url: `../patient/userFormDetail?userId=${this.targetUid}&formId=${item.str1}&msgId=${item.id}&chatGroupId=${item.str4}&from=chat` //表单详情页
					})
				}

				// return
				// uni.navigateTo({
				// 	url:`../patient/userFormDetail?formId=${item.str1}&userId=${item.user.id}`//表单答案和详情页
				// })
			},
			// 查看文章详情
			toArticleDetail(item) {
				console.log('去患教文章', item)
				uni.navigateTo({
					url: `/pages/sufferingarticles/articleDetail?id=${item.article.id}&userChatId=${this.targetUid}&teamChatId=${this.chatUserId}&chatType=${this.chatType}&detailType=1`
				})

			},
			// 播放语音
			voiceActive(url, index, msgId, fromUid) {
				this.playIndex = index
				var voiceSrc = url;
				innerAudioContext.autoplay = !innerAudioContext.autoplay;
				if (innerAudioContext.autoplay) {
					innerAudioContext.src = voiceSrc;
					innerAudioContext.play();
					this.isPlayVoice = true
					this.chatList[index].isPlay = true
					this.setTimeFun = setInterval(() => {
						this.playImgone = !this.playImgone
					}, 1000)
					innerAudioContext.autoplay = true
					innerAudioContext.onPlay(() => {
						// console.log('监听播放哈哈哈哈哈哈');
					})
				} else {
					this.list[index].isPlay = false
					this.isPlayVoice = false
					innerAudioContext.stop();
					innerAudioContext.autoplay = false
					clearInterval(this.setTimeFun)
					innerAudioContext.onStop(() => {})

				}
				innerAudioContext.onEnded(() => {
					// console.log('播放结束了',this.list[index].isPlay)
					this.chatList[index].isPlay = false
					this.isPlayVoice = false
					clearInterval(this.setTimeFun)
					innerAudioContext.autoplay = false
				})

			},
			refreshData() {
				let that = this
				this.pageNum++
				let data = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}
				if (this.chatType == 0) { //单聊
					data.targetUid = this.targetUid
				}
				if (this.chatType == 1) { //群聊
					data.chatUserId = this.chatUserId
				}
				if (this.patientId && this.patientId != 'undefined') {
					data.patientId = this.patientId
				}
				this.api.chatMsgQueryChatMsgHistory(data).then(res => {
					// console.log('聊天记录',res.data)
					if (res.code == 0) {
						let arr = res.data.records
						let list = this.chatList.concat(arr)
						this.chatList = list
						if (that.pageNum == 1) {
							let listLength = that.chatList.length - 1
							that.toView = 'msg-' + listLength
						}
						if (uni.getStorageSync('sendText')) {
							// console.log('发送常用语')
							that.innerValue = uni.getStorageSync('sendText')
							that.sendMsg('text')
							uni.removeStorageSync('sendText')
						}
					}
				})
			},
			showVoiceImg() {
				this.inputText = false
				this.showImgs = false
			},
			openMore() {
				this.showImgs = !this.showImgs
				this.inputText = true
			},
			inputSendText(e) {
				// console.log('输入框有值1', e.detail.value)
				// console.log('输入框有值2', this.innerValue)
				if (e.detail.value) {
					// console.log('输入框有值')
					this.inpuInfo = true
				} else {
					// console.log('输入框没有值')
					this.inpuInfo = false
				}
			},
			focusChange(event){
				this.showImgs = false
				console.log('焦点--->',event.detail)
			},
			sendMsg(type) { //发送消息
				console.log('发送消息')

				let param = {}
				let that = this
				param.type = 1
				if (this.chatType == 1) {
					param.chatUserId = this.chatUserId
				}
				if (this.chatType == 0) {
					param.targetUid = this.targetUid
				}
				if (this.patientId && this.patientId != 'undefined') {
					param.patientId = this.patientId
				}
				// console.log(param)
				switch (type) {
					case 'text': //文字消息
						param.msgType = "MESSAGE_TEXT"
						param.msg = that.innerValue
						break;
					case 'img': //图片消息
						param.msgType = "MESSAGE_PIC"
						param.url = that.urlImg
						break;
					case 'reder':
						param.msgType = 'REQUEST_READ'
						param.targetUid = that.targetUid
						param.chatUserId = that.chatUserId

						break;
					case 'video':
						param.msgType = 'VIDEO'
						param.msg = '语音'
						param.videoDuration = that.videoLength
						param.url = that.videoUrl

						break;
					case 'form':
						param.msgType = 'FORM'
						param.str1 = that.formId
						break;
					case 'mp4':
						param.msgType = 'VIDEO_URL'
						param.msg = '视频'
						param.url = that.videoMpUrl
						break;
					case 'article':
						param.msgType = "ARTICLE"
						param.str1 = this.articleId
						param.msg = '文章'
						break;

				}
				if (!getApp().globalData.socketObj.isConnect) {
					getApp().globalData.socketObj.initSocket()
					console.log('--实例未连接,重新连接')
					// let oldData=[JSON.stringify(param)]
					// uni.setStorageSync('sendData',oldData)
				}
				getApp().globalData.socketObj.sendMsg(JSON.stringify(param))
				this.innerValue = ''
				this.inpuInfo = false
			}
		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}
</style>
<style lang="less" scoped>
	.inputInfos {
		padding: 32rpx 22rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #444444;
		background: #fff;

		.inputInfoa {
			width: 650rpx;
			border: 2rpx solid #ECECEC;
			opacity: 1;
			border-radius: 10rpx;
			padding: 40rpx 28rpx;
			margin: 28rpx 0;
		}
	}

	.chat {
		-webkit-user-select: text;

		.chatMenu {
			padding: 100rpx 36rpx 84rpx 36rpx;
			background: #fff;
			flex-wrap: wrap;

			.chatMenus {
				width: 112rpx;
				margin: 24rpx 30rpx;

				.chatMenusImg {
					width: 96rpx;
					height: 96rpx;
					display: flex;
					margin: 0 auto;
				}

				.chatMenusText {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					text-align: center;
					margin-top: 24rpx;
					color: #444444;
				}
			}
		}

		.slotRight {
			margin-right: 30rpx;
			height: 40rpx;
			width: 50rpx;

			.chatMenuIcon {
				width: 34rpx;
				height: 8rpx;
			}
		}

		.rotateDiv {
			transform: rotate(180deg);
		}

		.chatInfo {
			background-color: #F9F9F9;
			padding: 0 30rpx 100rpx 0;

			.chatInfos {
				transform: rotate(180deg);
				padding: 30rpx 0;
				box-sizing: border-box;

				.time {
					text-align: center;
					// color: #666;
					color: #999;
					margin-bottom: 30rpx;
				}

				.docInfo {
					padding: 0 30rpx;
					max-width: 80%;
					margin-left: auto;
					justify-content: flex-end;

					.docInfos {
						.name {
							text-align: right;
							margin-bottom: 20rpx;
						}

						.content {
							// width: 100%;
							border-radius: 10rpx;
							background: #4C6DE7;
							color: #fff;
							padding: 30rpx;
							font-size: 30rpx;
							word-wrap: break-word;
							word-break: break-all;

							// font-size: 20rpx;
							.mesImg {
								max-width: 400rpx;;
								height: 400rpx;
							}
						}

						.formContent {
							min-width: 400rpx;
							background-color: #fff;
							color: #333;
							// border: 1px solid #4C6DE7;
							// border: 1px solid #4CD964;
						}

					}

					.avatorImg {
						width: 80rpx;
						height: 80rpx;
						display: flex;
						margin-left: 30rpx;
					}
				}

				.patientInfo {
					max-width: 90%;
					margin: 30rpx 0;

					.patientInfos {
						.name {
							text-align: left;
							margin-bottom: 20rpx;
						}

						.content {
							// width: 100%;
							box-sizing: border-box;
							border-radius: 10rpx;
							background: #fff;
							word-wrap: break-word;
							word-break: break-all;
							// color: #fff;

							padding: 30rpx;
							// font-size: 20rpx;
							font-size: 30rpx;
						}

						.mesImg {
							max-width: 400rpx;
							height: 400rpx;
						}

						.imgtext {
							border-radius: 10rpx;
							background: #4C6DE7;
							color: #fff;
							padding: 30rpx;
							font-size: 20rpx;
						}
					}

					.avatorImg {
						width: 80rpx;
						height: 80rpx;
						display: flex;
						margin-right: 30rpx;
					}
				}
			}

		}

		.mpContainer {
			position: relative;

			.mpContent {
				// position: absolute;
				background-color: red;
				width: 300rpx;
				z-index: -1;
			}
		}

		.lastChatInfos {
			margin-top: 100rpx;
		}

		.inputButton {
			width: 100%;
			// height: 80rpx;

			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			// background: #F6F6F6;
			background: #F3F3F3;

			.sendIcon {
				width: 60rpx;
				height: 60rpx;
			}

			.leftOption {
				margin-right: 20rpx;
			}

			.rightOption {
				margin-left: 20rpx;
			}

			.showImg {
				width: 52rpx;
				height: 52rpx;
			}

			.innerPuters {
				display: flex;
				flex-direction: row; 
				font-size: 15px;
				color: #222;
				background: #fff;
				width: 500rpx;
				// min-height: 44rpx;
				// max-height: 160rpx;
				max-height: 300rpx;
				min-height: 40rpx;
				line-height: 40rpx;
				padding: 20rpx 20rpx;
				// padding-bottom: 20rpx;
				overflow-y: scroll;

			}

			.voiceInput {
				display: flex;
				justify-content: center;
				font-weight: bold;
			}

			.resourcesList {
				// height: 250rpx;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				margin: 30rpx;
				// background: #fff;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #222222;
				padding: 0 32rpx;
				// justify-content: flex-start;
				justify-content: space-around;
				text-align: center;

				.pohoeImg {
					// margin: 0 auto;
					width: 120rpx;
					height: 120rpx;
					background: #fff;

					.pohoeImgs {
						width: 52rpx;
						height: 52rpx;
						display: flex;
					}
				}
			}
		}
	}

	.formImg {
		width: 80rpx;
		height: 80rpx;
		margin-right: 30rpx;
	}

	.formTitle {
		// margin-right: 180rpx;
	}

	.articleTitle {
		width: 300rpx;
		font-size: 10pt !important;
		overflow: hidden !important;
		text-overflow: ellipsis !important;
		display: -webkit-box !important;
		-webkit-line-clamp: 2; //文字上限行
		-webkit-box-orient: vertical;
	}

	.requesContent {
		max-width: 400rpx;
		box-sizing: border-box;
	}

	.videoContent {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;

		.msgVideo {
			margin-left: 20rpx;
			width: 40rpx;
			height: 40rpx;

		}

		.leftVideo {
			margin-left: 0;
			margin-right: 20rpx;
		}
	}

	.voiceImg {
		width: 40rpx;
		height: 40rpx;
	}

	.playVoiceBox {
		width: 80rpx;
		position: absolute;
		left: -100rpx;
		bottom: 0rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		height: 90rpx;
	}

	.leftVoiceBox {
		width: 80rpx;
		position: absolute;
		right: -100rpx;
		bottom: 0rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		height: 90rpx;
	}

	.rightImg {
		margin-top: 20rpx;
	}

	.voiceBg {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		width: 100%;
		// min-height: 100%;
		height: 100%;
		position: absolute;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	/* 松开 发送按钮 */
	.optionBox {
		position: relative;
		margin-bottom: 32rpx;
		display: flex;
		justify-content: center;
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #E6E6E6;
	}


	/* 语音输入效果图 */
	.vioceActiveBox {
		display: flex;
		justify-content: center;
		margin-bottom: 62rpx;
	}

	.voiceActiveImg {
		width: 414rpx;
		height: 116rpx;
	}

	.optionSend {
		margin-right: 20rpx;
	}

	.voiceBgImg {
		width: 100%;
		height: 260rpx;
	}

	// 图文咨询
	.imforContent {
		position: absolute;
		top: 150rpx;
		// top:50rpx;
		background-color: #fff;
		color: #000;
		padding: 20rpx 40rpx;
		display: flex;
		flex-direction: row;
		width: 100%;
		z-index: 10;
		display: flex;
		flex-direction: row;
		align-items: center;

		.topItem {
			display: flex;
			flex-direction: row;
			align-items: center;
			color: #1296db;

			.topItemIcon {
				width: 80rpx;
				height: 80rpx;
				margin-right: 20rpx;
			}
		}
	}

	.tipContent {
		position: absolute;
		top: 148rpx;
		// top:50rpx;
		background-color: #ffeecb;
		padding: 20rpx 40rpx;
		display: flex;
		flex-direction: row;
		width: 100%;
		z-index: 10;
		display: flex;
		flex-direction: row;
		align-items: center;

		.topTipItem {
			display: flex;
			flex-direction: row;
			align-items: center;
			color: #ec8f4b;
			font-size: 25rpx;

			.topTipItemIcon {
				width: 30rpx;
				height: 30rpx;
				margin-right: 20rpx;
			}
		}
	}
</style>
