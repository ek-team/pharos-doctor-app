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
						随访名称：{{followUpName}}
					</view>
					<image src="/static/images/select_right.png" mode="" class="selectFormIcon"></image>
				</view>
				<view class="flexAB">
					<view class="editPullTimeTitle">
						手术名称：{{surgryName}}
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

					<view style="margin-left: 22rpx;position: relative;" v-for="(item,index) in userList">
						<!-- <u-badge :offset="[-20,-20]" :type="type" max="99" style="margin-left: 20rpx;margin-right: 20rpx;" :value="value"></u-badge> -->
						<!-- <u-badge :offset="[-10,-10]" type="error" count="10"></u-badge> -->
						<view>
							<image src="/static/images/user_default_icon.png" mode="" class="userHeaderIcon"></image>
							<view>{{item}}</view>
						</view>
						<view class="angle_mark">
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
							{{item}}
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
									术后第二天
								</view>
							</view>
						</view>
						<view class="flex" style="margin-top: 30rpx;">
							提醒消息
							<textarea cols="30" rows="10" v-model="notice" class="textaInfo"></textarea>
						</view>
						<view class="flexA rowFormStyle">
							附带表单
							<view class="flexA plantPopInfoDay">
								<view class="plantPopInfoDayText">
									测试表单
								</view>
							</view>
						</view>
						<view class="flexA rowFormStyle">
							科教文章
							<view class="flexA plantPopInfoDay">
								<view class="plantPopInfoDayText">
									患教文章13
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
					title: '随访计划',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1, ['#5AA1FF', '#5AA1FF']],
					rightSlot: true,
				},
				followUpName: '我是测试随访计划',
				surgryName: '我是手术名称',
				userList: ['张喜喜', '刘长长'],
				formList: ['测试表单1', '测试表单2', '测试表单3'],
				planClassList: ['测试', 'dfs'],
				notice: '但是发射点',
				showPlanUsers: true,
				showUserForm: true,
				type: "warning",
				value: '新增'
			}
		},
		methods: {
			sublimt() {

			},
			editFollowUp() {
				uni.navigateTo({
					url: `./editFollowUp`
				})
			},
			selectPlanUser() {
				uni.navigateTo({
					url: `./followUpUserList`
				})
			},
			lookOverUserForm(item) {
				uni.navigateTo({
					url: `/pages/formInfo/formFillUser?id=0`
				})
			}
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