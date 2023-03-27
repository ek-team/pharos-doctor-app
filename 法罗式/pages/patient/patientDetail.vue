<template>
	<view class="patientDetail">
		<hx-navbar ref="hxnb" :config="config">
			<!-- <view class="" slot="right" class="slotRight flexA" @click="watchBB">
				<image src="/static/images/icon_me@2x.png" mode="" class="slotRightIcon"></image>
			</view> -->
		</hx-navbar>
		<view class="patientInfo flexA">
			<image :src="patirntInfo.avatar?patirntInfo.avatar:'/static/images/user_default_icon.png'" mode=""
				class="patientImg"></image>
			<view class="patientInfos">
				<view class="">
					{{patirntInfo.patientName}} {{patirntInfo.sexCode==1?'男':'女'}} {{patirntInfo.age}}
					<!-- <span style="margin-left: 20rpx;">(分组){{patirntInfo.userGroupName?patirntInfo.userGroupName:''}}</span> -->
				</view>
				<view class="" style="font-size: 24rpx;margin-top: 20rpx;">
					{{patirntInfo.electronicCase?patirntInfo.electronicCase.content:''}}
				</view>
				<view class="remarkContainer" style="" @click="editRemark">
					<view v-if="patirntInfo.remark" class="remarContent">{{patirntInfo.remark}}</view>
					{{patirntInfo.remark?'编辑':'添加'}}备注信息
					<image src="/static/images/white_edit_icon.png" class="editIcon"></image>
				</view>
			</view>
		</view>
		<view class="medicalRecord flexAA">
			<view class="" @click="allForm">
				<image src="/static/images/form_data_icon.png" mode="" class="medicalRecordImg"></image>
				<view class="medicalRecordText">
					表单数据
				</view>
			</view>
			<view class="" @click="medicalRecord">
				<image src="/static/images/icon_car@2x.png" mode="" class="medicalRecordImg"></image>
				<view class="medicalRecordText">
					电子病历
				</view>
			</view>
			<view class="" @click="watchBB">
				<image src="/static/images/sport_data_icon1.png" mode="" class="medicalRecordImg"></image>
				<view class="medicalRecordText">
					锻炼数据
				</view>
			</view>
			<!-- <view class="medicalRecordInfo flex">
				<view class="" style="margin-top:20rpx;">
					最新记录：{{patirntInfo.electronicCase.createTime}}
				</view>
				<view class="" >
					摘要：{{patirntInfo.electronicCase.title}}
				</view>
			</view>
			<image src="/static/images/icon_poi@2x(1).png" mode="" class="medicalRecordIcon"></image> -->
		</view>
		<view class="grayLine">

		</view>
		<view class="patientOption">
			<view class="topTitle">对患者发起</view>
			<view class="optionList">
				<view class="itemOption" @click="toChat">
					<image src="/static/images/chat_follow_up.png" class="optionIcon"></image>
					<view class="optionItemText">会话随访</view>
				</view>
				<!-- <view class="itemOption">
					<image src="/static/images/chat_follow_up.png" class="optionIcon"></image>
					<view class="optionItemText">会话随访</view>
				</view> -->
			</view>
		</view>
		<view class="grayLine">

		</view>
		<view class="patientOption">
			<view class="topTitle">管理计划</view>
			<view class="optionList">
				<view class="itemOption" @click="addNewPlan">
					<image src="/static/images/add_plan_icon.png" class="optionIcon"></image>
					<view class="optionItemText">新建计划</view>
				</view>
				<view class="itemOption" @click="allInfo">
					<image src="/static/images/view_all_plan1.png" class="optionIcon"></image>
					<view class="optionItemText">查看全部计划</view>
				</view>
			</view>
		</view>
		<view class="grayLine">

		</view>
		<view class="patientOption">
			<view class="topTitle">所在分组</view>
			<view class="addGroupOption" @click="addNewGroup">
				<image src="/static/images/add_new_icon.png" class="addIcon"></image>
				<view>添加分组</view>
			</view>
			<view class="inGroupContent">
				<view class="inGroupItem" v-for="(item,index) in userGroupList">
					<image src="/static/images/group_icon2.png" class="groupIcon"></image>
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="grayLine">

		</view>
		<!-- <view class="plant">
			<view class="plantTitle flexAB" @click="allForm">
				<view class="">
					表单列表
				</view>
				<view class="" style="color: #989898;font-size: 28rpx;">
					查看全部
				</view>
			</view>

			<view class="plantTitle flexAB">
				<view class="">
					计划管理
				</view>
				<view class="" style="color: #989898;font-size: 28rpx;" @click="allInfo">
					查看全部
				</view>
			</view>
			<view class="plantList flexB" v-for="(item,index ) in patirntInfo.followUpPlanNoticeList" :key="index">
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
		</view> -->
		<!-- <web-view  :webview-styles="webviewStyles" src="https://pharos3.ewj100.com/record.html#/ucenter/recovery/comprehensiveById?userId=1" ></web-view> -->
		<!-- 备注信息 -->
		<u-popup :show="reMarkShow" mode="center" @close="reMarkShow = false">
			<view class="popupContainer">
				<view class="popTitle">{{patirntInfo.remark?'编辑':'添加'}}备注信息</view>
				<!-- <text>备注信息</text> -->

				<view class="popContent">
					<textarea cols="30" rows="7" v-model="remark" placeholder="请输入备注信息"
						class="textaInfo textContent"></textarea>
				</view>
				<view class="popContent buttonContent">
					<button class="mini-btn" type="default" size="mini" @click="reMarkShow = false">取消</button>
					<button type="primary" size="mini" @click="submitRemark">确定</button>
				</view>
			</view>

		</u-popup>
		<!-- 会话随访 -->
		<u-popup :show="effectiveTime" mode="center" @close="effectiveTime = false">
			<view class="popupContainer">
				<view class="popTitle">会话随访</view>
				<view class="popContent">

					<view class="itemContent">
						<text>有效时间</text>
						<input cols="20" type="number" v-model="hour" placeholder="请输入会话有效时间" class="textaInfo" />
						<text>(小时)</text>
					</view>
				</view>
				<view class="popContent buttonContent">
					<button class="mini-btn" type="default" size="mini" @click="effectiveTime = false">取消</button>
					<button type="primary" size="mini" @click="openChat">确定</button>
				</view>
			</view>

		</u-popup>
		<!-- 添加分组 -->
		<u-popup :show="groupsShow" mode="center" :round="10" @close="groupsShow = false">
			<view class="groupContainer">
				<view class="centerTitle">分组管理</view>
				<view class="groupContent">
					<view class="groupItem" @click="item.check=!item.check" :class="item.check?'checkGroupItem':''"
						v-for="(item,index) in groulist">
						{{item.name}}
					</view>
				</view>
				<view class="submitOption">
					<view class="submitContainer" @click="submitMoveGroup">提交</view>
				</view>
				<view class="submitOption">
					<view class="optionBox" @click="addGoupsShow=true">
						<image src="/static/images/blue_add.png" class="addIcon"></image>
						新建分组
					</view>

				</view>
			</view>
		</u-popup>
		<!-- 新建分组 -->
		<u-popup :show="addGoupsShow" mode="center" :round="10" @close="addGoupsShow = false">
			<view class="groupContainer">
				<view class="centerTitle">新建分组</view>
				<view class="groupContent addContent">
					<!-- <view class="groupItem" > -->
					<text>分组名称</text>
					<input cols="20" v-model="inputGroupName" placeholder="请输入分组名称" class="textaInfo" />
					<!-- </view> -->
				</view>
				<view class="submitOption">
					<view class="submitContainer" @click="submitAddGroup">提交</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		divide,
		times
	} from '@/common/numPrecisions.js'
	export default {
		data() {
			return {
				config: { //自定义头部配置信息
					title: '患者详情',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1, ['#378EFF', '#378EFF']],
					rightSlot: true,
				},
				id: 0,
				patirntInfo: {
					electronicCase: {
						createTime: ''
					}
				},
				webviewStyles: {
					width: "375",
					height: "200"
				},
				reMarkShow: false,
				effectiveTime: false,
				hour: null,
				chatId: null,
				remark: null,
				teamId: null,
				groupsShow: false,
				userGroupList: [],
				groulist: [],
				addGoupsShow: false,
				checkGroupIds: [],
				inputGroupName: null,
			};
		},
		onLoad(option) {
			// console.log('接受的参数',option)
			this.chatId = option.chatId
			this.id = option.id
			if (option.teamId && option.teamId != "undefined") {
				this.teamId = option.teamId
			} else {
				this.teamId = null
			}

			this.followUpPlanGetPatientDetail()
			this.getFormList()
			this.getGroupList()
		},
		onUnload() {
			uni.removeStorageSync('followUpPlanPatientUserList')
			// console.log('销毁')
		},
		methods: {
			getFormList() {
				this.api.formUserDataGetDataByFormId({
					userId: this.id
				}).then(res => {
					console.log(this.id, '表单列表', res)
				})
			},
			getGroupList() {
				this.api.userGroupGetUserOnGroup({
					userId: this.id
				}).then(res => {
					if (res.code == 0 && res.data) {
						this.userGroupList = res.data
						// console.log('患者所在分组',res.data )
					}

				})
			},
			// 查看用户数据
			watchBB() {
				uni.navigateTo({
					url: '../plant/reportWebView?idCard=' + this.patirntInfo.idCard
				})
			},
			// 添加备注
			editRemark() {
				this.reMarkShow = true
			},
			submitRemark() {
				if (!this.remark) {
					uni.showToast({
						title: '请输入备注信息！',
						icon: 'none'
					})
					return
				}
				console.log(this.id, this.remark)
				this.api.followUpPlanDoctorRemark({
					userId: this.id,
					remark: this.remark,
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						uni.showToast({
							title: '添加成功！',
							icon: 'none'
						})
						this.reMarkShow = false
						this.followUpPlanGetPatientDetail()
						// console.log('添加备注',res)
					}

				})
			},
			// 查看表单
			allForm() {
				uni.navigateTo({
					url: './userFormList?userId=' + this.id
				})
			},
			// 新建计划
			addNewPlan() {
				// this.type=='pateintList'
				let list = [{
					nickname: this.patirntInfo.patientName,
					avatar: this.patirntInfo.avatar,
					id: this.id,
				}]
				uni.setStorageSync('followUpPlanPatientUserList', list)
				uni.navigateTo({
					url: `../patient/followUpDetail?id=${0}&type=pateintList`
				})

			},
			// 查看所有计划
			allInfo() {
				uni.navigateTo({
					url: `../plant/allInfo?id=${this.id}`
				})
			},
			// 添加分组
			addNewGroup() {
				console.log("teamId------>" + this.teamId)
				this.api.userGroupGetUserMoveGroup({
					userId: this.id,
					teamId: this.teamId
				}).then(res => {
					if (res.code == 0 && res.data) {
						res.data.map(item => {
							item.check = false
						})
						// console.log('能移动的分组',res.data)
						this.groulist = res.data
					}

					this.groupsShow = true
				})

				return
				uni.navigateTo({
					url: './patientGroupList/addGroup'
				})
			},
			// 添加移动分组
			submitMoveGroup() {
				let ids = []
				this.groulist.map(item => {
					console.log(item)
					if (item.check) {
						ids.push(item.id)
					}
				})
				this.checkGroupIds = ids
				console.log('选择的分组', this.checkGroupIds)
				// return
				if (this.checkGroupIds.length <= 0) {
					uni.showToast({
						title: '请选择分组！',
						icon: 'none'
					})
					return
				}
				this.api.userGroupMoveUserToGroup({
					userId: this.id,
					groupIds: this.checkGroupIds
				}).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '添加成功！',
							icon: 'none'
						})

						this.addGoupsShow = false
						this.groupsShow = false
						this.getGroupList()
					}
				})
			},
			// 新建分组
			submitAddGroup() {
				if (!this.inputGroupName) {
					uni.showToast({
						title: '请输入分组名称！',
						icon: 'none'
					})
					return
				}
				this.api.addUserGroup({
					name: this.inputGroupName,
					teamId: this.teamId,
					userIds: [this.id],
				}).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '添加成功！',
							icon: 'none'
						})

						this.addGoupsShow = false
						this.groupsShow = false
						this.getGroupList()
					}

				})
			},
			// 会话随访
			toChat() {
				this.effectiveTime = true
			},
			// 去会话随访
			openChat() {
				if (!this.hour) {
					uni.showToast({
						title: '请输入会话有效时间',
						icon: 'none'
					})
					return
				}
				console.log('', this.chatId, this.hour)
				// return
				let postData = {
					hour: this.hour,
					userId: this.id
				}
				if (this.chatId && this.chatId != 'undefined') {
					postData.chatUserId = this.chatId
				}
				if (this.teamId && this.teamId != 'undefined') {
					postData.teamId = this.teamId
				}
				// console.log('提交的会话参数',postData)
				this.api.chatUserOpenChat(postData).then(res => {
					if (res.code == 0) {
						console.log('会话随访', res)
						uni.showToast({
							title: '设置成功',
							// icon:'none'
						})
						setTimeout(() => {
							this.effectiveTime = false
							uni.navigateBack()
						}, 500)
					}

				})
			},
			followUpPlanGetPatientDetail() {
				let data = {
					patientId: this.id
				}
				this.api.followUpPlanGetPatientDetail(data).then(res => {
					// console.log('患者详情',res.data)
					if (res.code == 0) {
						if (res.data.remark) {
							this.remark = res.data.remark
						}
						if (res.data.followUpPlanNoticeList) {
							res.data.followUpPlanNoticeList.map(item => {
								console.log(item.push, item.totalPush)
								if (item.push && item.totalPush) {
									item.baifenbi = times(divide(item.push, item.totalPush), 100)
								} else {
									item.baifenbi = 0
								}
								//
							})
						}
						this.patirntInfo = res.data
					}
				})
			},
			// 电子病历
			medicalRecord() {
				uni.navigateTo({
					url: `./medicalRecord?id=${this.id}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #F2F2F2;
	}

	.patientDetail {
		.plant {
			.plantList {
				padding: 22rpx;
				background-color: #F2F2F2;
				// background: #fff;
				height: auto;

				.plantListRight {
					width: 666rpx;
					height: auto;

					.plantListRightTitle {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #40C8DE;
					}

					.plantListRightInfo {
						width: 626rpx;
						background: rgba(242, 242, 242, 1);
						border-radius: 10rpx;
						margin-top: 20rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						padding: 24rpx 20rpx;
						font-weight: 400;
						color: #666666;
						position: relative;

						text {
							color: #43C8EB;
						}

						.planTip {
							position: absolute;
							top: 0;
							right: 0;
							background: url('/static/images/bg@2x.png') no-repeat;
							background-size: 84rpx 34rpx;
							width: 84rpx;
							height: 34rpx;
							font-size: 16rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 34rpx;
							text-align: center;
							color: #FFFFFF;
						}

						.planInfos {
							white-space: nowrap; //禁止换行
							overflow: hidden;

							text-overflow: ellipsis;
							margin: 20rpx 0 0;

							.tips {
								color: #43C8EB;
							}
						}
					}
				}

				.plantListLeft {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					flex-direction: column;
					height: auto;

					.leftRadio {
						width: 16rpx;
						height: 16rpx;
						border: 2rpx solid #FFBBBB;
						border-radius: 50%;
					}

					.leftLine {
						height: 100%;
						border-left: 1rpx solid #FFBBBB;

					}
				}
			}

			.plantTitle {
				padding: 28rpx 22rpx;
				border-bottom: 1px solid #efefef;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #222222;
			}
		}

		.patientOption {
			display: flex;
			flex-direction: column;

			// padding: 20rpx;
			.topTitle {
				border-bottom: 1px solid #F2F2F2;
				font-size: 18px;
				font-weight: 500;
				padding: 30rpx 20rpx;
			}

			.optionList {
				display: flex;
				flex-direction: row;
				padding: 30rpx 30rpx 30rpx 50rpx;

				.itemOption {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 30rpx;
				}

				.optionItemText {
					display: flex;
					justify-content: center;
					font-size: 16px;
					color: #9f9f9f;
				}
			}

			.addGroupOption {
				display: flex;
				align-items: center;
				padding: 40rpx;

				.addIcon {
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
				}

			}

			.inGroupContent {
				padding: 0rpx 40rpx;
				margin-bottom: 30rpx;

				.inGroupItem {
					display: flex;
					align-items: center;
					padding: 40rpx 20rpx 40rpx 20rpx;
					border-top: 1px solid #ebebeb;
					color: #888888;
				}

				.groupIcon {
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
				}
			}
		}

		.optionIcon {
			width: 88rpx;
			height: 88rpx;
			margin-bottom: 20rpx;
			// display: flex;
			// margin: 0 auto;
		}

		.slotRight {
			margin-right: 20rpx;
			width: 50rpx;
			height: 50rpx;

			.slotRightIcon {
				width: 36rpx;
				height: 10rpx;
			}
		}

		.grayLine {
			height: 22rpx;
			background: #F2F2F2;
		}

		.medicalRecord {
			padding: 16rpx 34rpx;
			background: #fff;

			.medicalRecordIcon {
				width: 30rpx;
				height: 30rpx;
			}

			.medicalRecordImg {
				width: 88rpx;
				height: 88rpx;
				display: flex;
				margin: 0 auto;
			}

			.medicalRecordText {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #222222;
			}

			.medicalRecordInfo {
				flex: 1;
				margin: 0 60rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				flex-direction: column;
				// align-items: ce;
				justify-content: space-between;
				height: 130rpx;

			}

		}

		.patientInfo {
			background: #378EFF;
			padding: 44rpx 22rpx;

			.patientImg {
				width: 88rpx;
				height: 88rpx;
				display: flex;
				border-radius: 10rpx;
				margin-right: 32rpx;
				background: #e5e5e5;
				border-radius: 50%;
			}

			.patientInfos {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;

				.remarkContainer {
					display: flex;
					flex-direction: row;

					font-size: 24rpx;
					margin-top: 20rpx;

					.remarContent {
						max-width: 160rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						height: 30rpx;
						margin-right: 20rpx;
					}

					.editIcon {
						width: 30rpx;
						height: 30rpx;
						margin-left: 10rpx;
					}
				}

			}
		}
	}

	.popupContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.popTitle {
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		font-size: 18px;
		font-weight: 500;
	}

	.popContent {
		padding: 50rpx 36rpx 0rpx 36rpx;
		background: #fff;

		// flex-wrap: wrap;
		.itemContent {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.textaInfo {
			border: 1px solid #cacaca;
			margin: 0 20rpx;
			padding: 8rpx 20rpx;
		}

		.textContent {
			width: 500rpx;
		}
	}

	.buttonContent {
		display: flex;
		justify-content: center;
		margin: 40rpx 0 100rpx 0;
		width: 70%;
	}

	.groupContainer {
		display: flex;
		flex-direction: column;
		width: 600rpx;
		padding: 20rpx;
		border-radius: 10rpx;
	
	.centerTitle {
			display: flex;
			justify-content: center;
			font-size: 17px;
			font-weight: 500;
			margin-bottom: 30rpx;
		}

		.groupContent {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-bottom: 30rpx;
			height: 300rpx;
			overflow-y: scroll;
			margin: 20rpx 30rpx 30rpx 30rpx;

			.groupItem {
				border: 1px solid #d5d5d5;
				padding: 6rpx 10rpx;
				font-size: 14px;
				border-radius: 8rpx;
				margin-right: 16rpx;
				height: fit-content;
				color: #9c9c9c;
			}

			.textaInfo {
				border: 1px solid #cacaca;
				margin: 0 20rpx;
				padding: 8rpx 20rpx;
			}

			.checkGroupItem {
				border: 1px solid #378EFF;
				color: #378EFF;
			}
		}

		.addContent {
			height: 200px;
			display: flex;
			align-items: center;
		}

		.submitOption {
			display: flex;
			justify-content: center;
			margin-bottom: 30rpx;

			.submitContainer {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 80%;
				background-color: #378EFF;
				color: #fff;
				padding: 10rpx;
			}

			.optionBox {
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #378EFF;

				.addIcon {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}
			}
		}

	}
</style>
