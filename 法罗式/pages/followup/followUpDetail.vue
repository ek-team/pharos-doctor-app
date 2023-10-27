<template>
	<view class="editFollowUpContent">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="sublimt">
				发布
			</view>
		</hx-navbar>
		<scroll-view scroll-x="false" scroll-y="true" scroll-with-animation="true" overflow-y:auto
			style="height: 100vh;">
			<view class="editName">
				<view class="flexAB" @click="editFollowUp">
					<view class="editPullTimeTitle">
						随访名称：{{followUp.name}}
					</view>
					<image v-if="followUp.followUpStatus == 0" src="/static/images/select_right.png" mode=""
						class="selectFormIcon"></image>
				</view>
				<view class="flexAB">
					<view class="editPullTimeTitle">
						手术名称：{{followUp.optionName}}
					</view>
				</view>
			</view>
			<view class="editName" v-if="showPlanUsers">
				<view class="flexAB" @click="selectPlanUser">
					<view class="editPullTimeTitle">
						计划患者
					</view>
					<image src="/static/images/select_right.png" mode="" class="selectFormIcon"></image>
				</view>
				<view class="userHeaderView">

					<view v-if="userList.length>0" style="margin-left: 22rpx;position: relative;"
						v-for="(item,index) in userList">
						<!-- <u-badge :offset="[-20,-20]" :type="type" max="99" style="margin-left: 20rpx;margin-right: 20rpx;" :value="value"></u-badge> -->
						<!-- <u-badge :offset="[-10,-10]" type="error" count="10"></u-badge> -->
						<view>
							<image :src="item.avatar == ''? '/static/images/user_default_icon.png':item.avatar" mode=""
								class="userHeaderIcon"></image>
							<view>{{item.patientName}}</view>
						</view>
						<view v-if="item.selectedSaved" class="angle_mark" style="background-color: darkgrey;">
							<view class="header">已选</view>
						</view>
						<view v-else class="angle_mark">
							<view class="header">新增</view>
						</view>
					</view>
				</view>
			</view>
			<view class="editName" v-if="showUserForm">
				<view class="flexAB">
					<view class="editPullTimeTitle">
						表单数据汇总
					</view>

				</view>
				<view v-for="(item,index) in formList">
					<view class="flexAB" @click="lookOverUserForm(item)">
						<view class="editPullTimeTitle">
							{{item?item.title:''}}
						</view>
						<image src="/static/images/select_right.png" mode="" class="selectFormIcon"></image>
					</view>
				</view>
			</view>
			<view v-for="(item,index) in planClassList">
				<view class="editName">
					<view class="plantPopInfo">
						<view class="flexA">
							节点日期
							<view class="flexA plantPopInfoDay">
								<view class="plantPopInfoDayText">
									术后{{item.dayStr}}
								</view>
							</view>
						</view>
						<view class="flex" style="margin-top: 30rpx;">
							提醒消息

							<textarea cols="30" rows="10" v-model="item.notice" class="textaInfo"></textarea>
						</view>
						<view v-if="item.formId>0" class="flexA rowFormStyle">
							附带表单
							<view class="flexA plantPopInfoDay">
								<view class="plantPopInfoDayText">
									{{item.formId>0?item.form.title:''}}
								</view>
							</view>
						</view>
						<view v-if="item.articleId>0" class="flexA rowFormStyle">
							科教文章
							<view class="flexA plantPopInfoDay">
								<view class="plantPopInfoDayText">
									{{item.articleId>0?item.article.title:''}}
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config: { //自定义头部配置信息
					title: '随访计划详情',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1, ['#5AA1FF', '#5AA1FF']],
					rightSlot: true,
				},
				followUp: {
					followUpStatus: 0,
					name: '',
					optionName: '',
					createType: 0,
					joinType: 1, //1自动加入2手动管理
					pushType: 1, //推送时间1首次加入推送，2固定时间推送
					time: '',
					pushHour: '',
					pushMinute: '',
					patientUserCount: 0, //患者数量
					followUpPlanPatientUsers: [], //随访患者的id
					followUpPlanContentList: [], //随访患者的计划
				},
				followUpName: '我是测试随访计划',
				surgryName: '我是手术名称',
				userList: [],
				followUpPlanPatientUsers: [],
				formList: [],
				planClassList: [],
				notice: '但是发射点',
				showPlanUsers: true,
				showUserForm: true,
				type: "warning",
				value: '新增',
				id: 0,
			}
		},
		onLoad(option) {
			this.id = option.id ? option.id : 0

		},
		onShow() {
			if (this.id > 0) {
				this.formList = []
				this.planClassList = []

				this.followUpPlanGetDetailById()
			}
			

		},
		methods: {
			sublimt() {
				if(this.userList.length<=0){
					uni.showToast({
						title: '请添加患者',
						icon: "none"
					})
					return
				}
				this.followUp.followUpPlanContentList = this.planClassList
				let data = this.followUp
				let arr = []
				this.userList.map(item=>arr.push(item.id))
				console.log('data--->', data)
				data.followUpPlanPatientUsers = arr
				data.patientUserCount = this.followUp.followUpPlanPatientUsers.length
				data.followUpStatus = 1
				this.api.followUpPlanUpdateById(data).then(res => {
					if (res.code == 0) {
						uni.navigateBack({
							delta: 1
						})
					} else {
						uni.showToast({
							title: '保存失败' + res.code,
							icon: "none"
						})
					}
				})
			},
			editFollowUp() {
				uni.navigateTo({
					url: `./editFollowUp?operationaType=1&id=${this.followUp.id}&name=${this.followUp.name}
					&optionName=${this.followUp.optionName}&planClassList=${JSON.stringify(this.planClassList)}`
				})
			},
			selectPlanUser() {
				// this.userList.map(item => {
				// 	item.alreadySelected = true
				// 	this.followUp.followUpPlanPatientUsers.push(item)
				// })
				uni.navigateTo({
					url: `./followUpUserList?userList=${JSON.stringify(this.userList)}`
				})
			},
			lookOverUserForm(item) {
				uni.navigateTo({
					url: `/pages/formInfo/formFillUser?id=${item.id}&operationaType=1`
				})
			},
			followUpPlanGetDetailById() {
				let data = {
					id: this.id
				}
				this.api.followUpPlanGetDetailById(data).then(res => {
					console.log(res)
					if (res.code == 0) {
						console.log(res.data)
						this.followUp = {
							...this.followUp,
							...res.data
						}
						this.followUp.followUpPlanPatientUsers = []
						// this.userList = []
						if(this.userList.length>0){
							this.userList = this.userList.filter((item) => {//保留已经选过 还未提交的患者
								return (item.alreadySelected && !item.selectedSaved)
							})
						}
						
						res.data.followUpPlanPatientUserList.map(item => {
							this.userList.push({
								patientName: item.user.patientName,
								avatar: item.user.avatar,
								id: item.user.id,
								diagnosis: item.user.diagnosis,
								alreadySelected: true,
								selectedSaved:true

							})
						})
						if (uni.getStorageSync('selectedUsers')) {
							if(uni.getStorageSync('selectedUsers').length>0){
								this.userList = uni.getStorageSync('selectedUsers')
								console.log('选择--->', this.userList)
							}
							
							uni.removeStorageSync('selectedUsers')
						}
						res.data.followUpPlanContentList.map(item => {
							if (item.formId > 0 && item.form) {
								this.formList.push({
									title: item.form.title,
									id: item.form.id,
								})
							}

						})
						this.planClassList = res.data.followUpPlanContentList
						if (this.followUp.followUpStatus == 1) {
							this.showUserForm = true
						} else {
							this.showUserForm = false
						}
						// this.from.time = res.data.pushHour + ':' + res.data.pushMinute
						// console.log('推送时间',this.from.time)
						// res.data.followUpPlanContentList.map(item=>{
						// 	item.formTitle = item.form.title
						// })
						// console.log(this.from.followUpPlanPatientUsers)
					}
				})
			},

		}
	}
</script>

<style lang="less" scoped>
	.editFollowUpContent {
		min-height: 100vh;
		background: linear-gradient(180deg, #4797FF 0%, #FFFFFF 100%);

		.plantPopTitle {
			padding-bottom: 32rpx;
			border-bottom: 1px solid #ECECEC;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;

			.closeImg {
				width: 26rpx;
				height: 26rpx;
			}
		}

		.box {
			width: 100px;
			height: 100px;
			background-color: #909193;
			border-radius: 15px;
		}

		.plantPopInfo {
			padding: 10rpx 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;

			.plantPopInfoDay {
				width: 340rpx;
				height: 68rpx;
				line-height: 68rpx;
				border: 2rpx solid #E8E8E8;
				border-radius: 10rpx;
				margin: 0 18rpx;
				color: #989898;
				padding: 0 32rpx;
			}

			.plantPopInfoDayText {
				width: 310rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			.textaInfo {
				width: 340rpx;
				height: 160rpx;
				border: 2rpx solid #E8E8E8;
				opacity: 1;
				border-radius: 10rpx;
				margin: 0 18rpx;
				font-size: 28rpx;
				padding: 22rpx 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
		}

		.rowFormStyle {
			margin-top: 20rpx;
		}

		.fromInfo {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
			margin-top: 20rpx;

			.selectIcon {
				width: 40rpx;
				height: 40rpx;
				display: flex;
				margin-right: 20rpx;

			}
		}

		.angle_mark {
			position: absolute;
			top: -10rpx;
			right: -10rpx;
			background-color: #ff0000;
			width: 60rpx;
			height: 35rpx;
			align-items: center;
			transform: rotate(45deg);

			// 角标文字
			.header {
				position: absolute;
				color: #fff;
				width: 100%;
				bottom: 0;
				left: 0;
				font-size: 16rpx;
				text-align: center;
			}
		}

		.userHeaderView {
			display: flex;
			justify-content: left;
			align-items: center;
			flex-wrap: wrap;
		}

		.selectForm {
			width: 510rpx;
			border: 2rpx solid #E8E8E8;
			opacity: 1;
			padding: 22rpx 30rpx;
			border-radius: 10rpx;
			margin: 22rpx 0 0 0;

			.selectFormIcon {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.sublimt {
			position: fixed;
			bottom: 0;
			width: 60%;
			flex-direction: column;
			height: 88rpx;
			background: rgba(64, 200, 222, 1);
			border-radius: 44rpx;
			text-align: center;
			align-items: center;
			line-height: 88rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin-left: 20%;
			margin-right: 20%;
			margin-bottom: 10rpx;
			z-index: 100;
		}

		.slotRight {
			margin-right: 30rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}

		.followUpName {}

		.followUpNameInput {}

		.selectFormIcon {
			width: 40rpx;
			height: 40rpx;
		}

		.userHeaderIcon {
			width: 120rpx;
			height: 120rpx;
		}

		.editName {
			width: 642rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20rpx;
			margin: 22rpx auto;
			padding: 20rpx;

			.editPullTimeTitle {
				padding: 20rpx;
				// width:130rpx;
				flex-shrink: 0;
			}

			.editInput {
				width: 300rpx;
				height: 68rpx;
				line-height: 68rpx;
				font-size: 32rpx;
				text-align: left;
				border: 2rpx solid #E8E8E8;
				border-radius: 10rpx;
				padding: 0 32rpx;

			}
		}
	}
</style>