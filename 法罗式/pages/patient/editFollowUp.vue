<template>
	<view class="editFollowUp">
		<hx-navbar ref="hxnb" :config="config">
			<!-- <view class="" slot="right" class="slotRight flexA" @click="sublimt" v-if="followUpId==0"> -->
			<view class="" slot="right" class="slotRight flexA" @click="sublimt">
			
				保存
			</view>
		</hx-navbar>
		<view class="flexAB editName" v-if="typeForm=='editName'">
			<view class="editPullTimeTitle">
				计划名称：
			</view>
			<input type="text" class="editInput" placeholder="请输入计划名称" v-model="from.name">
		</view>
		<view class=" editPullTime" v-if="typeForm=='editPatient'">
			<view class="editPullTimeTitle">
				患者加入模式
			</view>
			<view class="editPullTimeInfo">
				<view class="flex" @click="changeTypes(1)">
					<image :src="from.joinType==1?'/static/images/icon_cli@2x.png':'/static/images/icon_cho@2x.png'"
						mode="" class="editPullTimeInfoImg"></image>
					<view class="">
						<view class="name">
							自动加入
						</view>
						<view class="dep">
							患者在选择你所在的服务团队时会自动执行此计划
						</view>
					</view>
				</view>
				<view class="flex" style="margin-top:30rpx ;" @click="changeTypes(2)">
					<image :src="from.joinType==2?'/static/images/icon_cli@2x.png':'/static/images/icon_cho@2x.png'"
						mode="" class="editPullTimeInfoImg"></image>
					<view class="">
						<view class="name">
							手动管理
						</view>
						<view class="dep">
							手动管理此计划内的患者
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="editPullTime" v-if="typeForm=='editPatient'">
			<view class="editPullTimeTitle flexAB" @click="patientShow =!patientShow">
				计划患者
				<view class="" style="color:#378EFF ;">
<!-- 				<view class="" v-if="followUpId==0" style="color:#378EFF ;"> -->
					+添加
				</view>
			</view>
			<view class="patientList flexAB" v-for="(item,index) in from.followUpPlanPatientUsers" :key="index">
				<view class="flexA">
					<image :src="item.avatar?item.avatar:'/static/images/user_default_icon.png'" mode="" class="patientListImg"></image>
					<view class="name">
						{{item.nickname}}
					</view>
				</view>
				<image src="/static/images/icon_del@2x.png" mode="" class="patientListImgs"
					@click="delPathen(index)"></image>
				<!-- 	<image v-if="followUpId==0" src="/static/images/icon_del@2x.png" mode="" class="patientListImgs"
					@click="delPathen(index)"></image> -->
			</view>
		</view>

		<view class=" editPullTime" v-if="typeForm=='editPullTime'">
			<view class="editPullTimeTitle">
				首次推送时间
			</view>
			<view class="editPullTimeInfo">
				<view class="flex" @click="changeType(1)">
					<image :src="from.pushType==1?'/static/images/icon_cli@2x.png':'/static/images/icon_cho@2x.png'"
						mode="" class="editPullTimeInfoImg"></image>
					<view class="">
						<view class="name">
							患者加入时
						</view>
						<view class="dep">
							患者加入计划时立即推送随访计划内容
						</view>
					</view>
				</view>
				<view class="flex" style="margin-top:30rpx ;">
					<image @click="changeType(2)"
						:src="from.pushType==2?'/static/images/icon_cli@2x.png':'/static/images/icon_cho@2x.png'"
						mode="" class="editPullTimeInfoImg"></image>
					<view class="">
						<view class="name" @click="changeType(2)">
							固定时间
						</view>
						<view class="dep">
							<picker mode="time" start="00:00" end="23:50" @change="bindTimeChange">
								<view class="flexA" style="width:300rpx;">
									{{from.time==''?'请选择时间':from.time}}
									<image src="/static/images/icon_poi@2x(1).png" mode=""
										style="width:30rpx;height:30rpx;"></image>
								</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class=" editPullTime" v-if="typeForm=='editPullTimes'">
			<view class="editPullTimeTitle">
				后续推送时间
			</view>
			<view class="editPullTimeInfo">
				<view class="flex" @click="changeType(1)">
					<image  :src="jsonType==1?'/static/images/icon_cli@2x.png':'/static/images/icon_cho@2x.png'" mode="" class="editPullTimeInfoImg"></image>
					<view class="">
						<view class="name" >
							患者加入时
						</view>
						<view class="dep">
							患者加入计划时立即推送随访计划内容
						</view>
					</view>
				</view>
				<view class="flex" style="margin-top:30rpx ;">
					<image @click="changeType(2)" :src="jsonType==2?'/static/images/icon_cli@2x.png':'/static/images/icon_cho@2x.png'" mode="" class="editPullTimeInfoImg"></image>
					<view class="">
						<view class="name" @click="changeType(2)">
							固定时间
						</view>
						<view class="dep">
							<picker mode="time" :value="time" start="00:00" end="23:50" @change="bindTimeChange">
								<view class="flexA" style="width:300rpx;">
									{{time}}
									<image src="/static/images/icon_poi@2x(1).png" mode="" style="width:30rpx;height:30rpx;"></image>
								</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="" style="min-height: 100vh;background: #fff;padding: 22rpx;" v-if="typeForm=='editCase'">
			<view class="plant flexB" v-for="(item,index) in from.followUpPlanContentList" :key="index">
				<view class="">
					{{item.day}}
				</view>
				<view class="plantJJ">
					<view class="raios">

					</view>
					<view class="grayLine" v-if="index !==from.followUpPlanContentList.length-1">

					</view>
				</view>
				<view class="plantInfo">
					<view class="" @click="selectIndex=index">
						<view class="">
							<text>提醒:</text>{{item.notice}}
						</view>
						<view class="">
							<text>{{item.formTitle}}</text>
						</view>

					</view>
					<!-- <view class="buttonList" v-if="index==selectIndex&&followUpId==0"> -->
						<view class="buttonList" v-if="index==selectIndex">
						<view class="edit" @click="editJj(item)">
							编辑
						</view>
						<view class="del" @click="delForm(index)">
							删除
						</view>
					</view>
				</view>
			</view>
			<view class="sublimt" @click="addjj" v-if="followUpId==0">
				添加计划节点
			</view>
		</view>
		<u-picker :show="patientShow" :columns="docPatirntList" @cancel="patientShow=false" @confirm="confirmUser"
			keyName="nickname"></u-picker>
		<u-popup :show="showPlant" :round="10" @close="close" @open="open">
			<view class="plantPop ">
				<view class="plantPopTitle flexAB">
					<view class=""></view>
					<view class="">
						计划节点编辑
					</view>
					<image @click="close" src="/static/images/icon_canl@2x1.png" mode="" class="closeImg"></image>
				</view>
				<view class="plantPopInfo">
					<view class="flexA">
						节点日期
						<!-- <picker mode="date" class="plantPopInfoDay" :value="jhjd.day" :start="startDate" end="2099-12-21" @change="bindDateChange">
							<view class="uni-input">{{jhjd.day}}</view>
						</picker> -->
						<view class="plantPopInfoDay" @click="show = !show">
							{{jhjd.day==''?'请选择时间':jhjd.day}}
						</view>
						<u-picker :show="show" ref="uPicker" :columns="dateList" @confirm="bindSelectDateChange"@close="show=!show"@cancel="show = !show" @change="bindDatePickerChange"></u-picker>
						<!-- <u-select :show="show" v-model="damtInfo" mode="mutil-column" :list="dateList" @confirm="bindSelectDateChange"></u-select> -->
						<!-- <u-datetime-picker :show="show" v-model="damtInfo" @confirm="bindDateChange" @close="show=!show"
							@cancel="show = !show" mode="datetime" :minDate="minDateTime" :formatter="formatter">
						</u-datetime-picker> -->
						<!-- <uni-datetime-picker type="date" class="plantPopInfoDay" start="2021-3-20"
				end="2021-6-20" :clear-icon="false" v-model="jhjd.day" @change="maskClick" placeholder="请选择日期"/>
					 -->
						<!-- <uni-datetime-picker type="date" :clear-icon="false" v-model="jhjd.day" @maskClick="maskClick" /> -->
						<!-- <input type="number" v-model="jhjd.day" class="plantPopInfoDay" placeholder="请输入天数"> -->

					</view>
					<view class="flex" style="margin-top: 30rpx;">
						提醒消息
						<textarea cols="30" rows="10" v-model="jhjd.notice" placeholder="请输入提醒消息"
							class="textaInfo"></textarea>
					</view>
					<view class="flexA fromInfo">
						<image class="selectIcon" @click="addFrom"
							:src="formState==0?'/static/images/icon_cho@2x.png':'/static/images/icon_cli@2x.png'"
							mode=""></image>
						附带表单
					</view>
					<view class="selectForm flexAB" v-if="formState==1">
						<picker @change="bindPickerChange" range-key="title" :value="formIndex" :range="list">
							<view class="uni-input flexA">
								<view class="" style="width:560rpx;">
									{{list[formIndex].title}}
								</view>
								<image src="/static/images/icon_cho@2x2.png" mode="" class="selectFormIcon"></image>
							</view>
						</picker>
						<view class="">

						</view>

					</view>
				</view>
				<view class="sublimt" @click="addJHJD">
					保存
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import {
		componTime
	} from '@/static/utils/utils.js'
	export default {
		name: 'editFollowUp',
		data() {
			return {
				show: false,
				typeForm: '',
				minDateTime: Number(new Date()),
				patientShow: false, //添加患者现实
				jsonType: 1,
				selectIndex: 0,
				formState: 0, //0不带表单1带
				formIndex: 0,
				config: { //自定义头部配置信息
					title: '',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1, ['#378EFF', '#378EFF']],
					rightSlot: true,
				},
				showPlant: false,
				list: [

				],
			
				dateList: [
				                    [],
				                    [],
									[]
								],
				from: {
					name: '',
					joinType: 1, //1自动加入2手动管理
					pushType: 1, //推送时间1首次加入推送，2固定时间推送
					time: '',
					pushHour: '',
					pushMinute: '',
					patientUserCount: 0, //患者数量
					followUpPlanPatientUsers: [], //随访患者的id
					followUpPlanContentList: [], //随访患者的计划
				},
				docPatirntList: [], //医生下面的患者
				jhjd: {
					day: '',
					notice: '',
					formId: 0
				},
				buttonType: 'add',
				startDate: '', //初始化时间
				damtInfo: '', //原来的时间
				followUpId: null,
				number:1,
				numberType:1,
				hour:1,
				picker:null
			};
		},
		onLoad(option) {
			console.log(option)
			this.typeForm = option.type
			this.from = JSON.parse(option.data)
			this.followUpId = option.id
			// this.followUpId = 0
			// for (var i = 0; i < 31; i++) {
			// 	this.dateList[0][i] = i
			// }
			this.dateList[1][0] = '立即提醒'
			this.dateList[1][1] = '天后'
			this.dateList[1][2] = '周后'
			this.dateList[1][3] = '月后'
			this.dateList[1][4] = '年后'
			// for (var i = 0; i < 24; i++) {
			// 	this.dateList[2][i] = (i+1) +':00'
			// }
			switch (option.type) {
				case 'editName':
					this.config.title = '计划名称'
					break;
				case 'editPatient':
					this.config.title = '计划患者'
					break;
				case 'editPullTime':
					this.config.title = '首次推送时间'
					break;
				case 'editPullTimes':
					this.config.title = '后续推送时间'
					break;
				case 'editCase':
					this.config.title = '编辑计划'
					this.compontTime()
					break;

			}
			this.followUpPlanGetPatientUserByDoctor()
			this.formPageScoped()
		},
		methods: {
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				if (type === 'hour') {
					return `${value}时`
				}
				if (type === 'minute') {
					return `${value}分`
				}
				return value
			},
			compontTime() {
				this.startDate = new Date()
			},
			bindDateChange(e) {
				this.damtInfo = e.value
				this.jhjd.day = componTime(e.value, "{y}-{m}-{d} {h}:{i}:{s}")
				this.show = false
				console.log(this.jhjd.day)
			},
			bindSelectDateChange(e) {
				// this.damtInfo = e.value
				// this.jhjd.day = componTime(e.value, "{y}-{m}-{d} {h}:{i}:{s}")
				this.show = false
				var dataList = e.value
				if(dataList[1]=='立即提醒'){
					this.jhjd.day = dataList[1]
				}else{
					this.jhjd.day = dataList[0]+dataList[1]+dataList[2]
				}
				
				console.log(e.value)
			},
			delForm(index) {
				this.from.followUpPlanContentList.splice(index, 1)
			},
			addFrom() {
				this.formState = this.formState == 0 ? 1 : 0
			},
			addjj() {
				this.showPlant = !this.showPlant,
					this.buttonType = 'add'
				this.jhjd = {
					day: '',
					notice: '',
					formId: 0,
					formTitle: ''
				}
				this.formState = 0
				this.formIndex = 0
			},
			editJj(item) { //编辑
				this.buttonType = 'edit'
				this.jhjd = item
				console.log(item)
				this.damtInfo = new Date(item.day).getTime()
				if (item.formId == 0) {
					this.formState = 0
				} else {
					this.formState = 1
					this.formIndex = this.list.findIndex(items => items.id == item.formId)
				}
				this.showPlant = !this.showPlant
			},
			addJHJD() { //保存计划节点
				this.showPlant = !this.showPlant
				this.jhjd.formId = this.formState == 0 ? 0 : this.list[this.formIndex].id
				this.jhjd.formTitle = this.formState == 0 ? '' : this.list[this.formIndex].title
				this.jhjd.number = this.number
				this.jhjd.numberType = this.numberType
				this.jhjd.hour = this.hour
				if (this.buttonType == 'add') { //添加
					this.from.followUpPlanContentList.push(this.jhjd)
				} else {
					this.from.followUpPlanContentList[this.selectIndex] = this.jhjd

				}


			},
			delPathen(index) {
				this.from.followUpPlanPatientUsers.splice(index, 1)
			},
			confirmUser(e) {
				for (let i = 0; i < this.from.followUpPlanPatientUsers.length; i++) {
					let item = this.from.followUpPlanPatientUsers[i]
					if (item.id == e.value[0].id) {
						uni.showToast({
							title: '已选择了患者，无需重复添加',
							icon: 'none',
						})
						return
					}
				}
				// return
				this.from.followUpPlanPatientUsers.push(e.value[0])
				this.patientShow = !this.patientShow
			},
			followUpPlanGetPatientUserByDoctor() { //医生下面的患者
				this.api.followUpPlanGetPatientUserByDoctor('').then(res => {
					console.log(res)
					if (res.code == 0) {
						this.docPatirntList.push(res.data)
					}
				})
			},
			formPageScoped() {
				let data = {
					pageNum: 1,
					pageSize: 100
				}
				this.api.formPageScoped(data).then(res => {
					console.log(res.data)
					if (res.code == 0) {
						this.list = res.data.records
					}
				})
			},
			sublimt() {
				console.log(this.from)
				uni.$emit('updateData', this.from)
				uni.navigateBack({
					delta: 1
				})

			},
			open() {
				// console.log('open');
			},
			close() {
				this.showPlant = false
				// console.log('close');
			},
			changeType(type) {
				this.from.pushType = type
			},
			changeTypes(type) {
				this.from.joinType = type
			},
			bindTimeChange: function(e) {
				this.from.time = e.detail.value
			},
			bindDatePickerChange: function(e) {
				if(e.columnIndex == 1 && e.index == 0){
					this.dateList[0] = []
					this.dateList[2] = []
					this.picker.setColumnValues(0, this.dateList[0])
					this.picker.setColumnValues(2, this.dateList[2])
					return 
				}else if(e.columnIndex == 1 && e.index != 0 && this.dateList[0].length <=0){
					this.picker = this.$refs.uPicker
					for (var i = 0; i < 30; i++) {
						this.dateList[0][i] = i+1
					}
					for (var i = 0; i < 24; i++) {
						this.dateList[2][i] = (i+1) +':00'
					}
					this.picker.setColumnValues(0, this.dateList[0])
					this.picker.setColumnValues(2, this.dateList[2])
				}
				console.log('执行了'+this.dateList[0].length);
				if(e.columnIndex == 0){
					this.number = e.index+1
				}
				if(e.columnIndex == 1){
					this.numberType = e.index+1
				}
				if(e.columnIndex == 2){
					this.hour = e.index+1
				}
				
				
			},
			bindPickerChange(e) {
				console.log(e.detail.value)
				this.formIndex = e.detail.value
				this.jhjd.formId = this.list[e.detail.value].id
				this.jhjd.formTitle = this.list[e.detail.value].title
			}
		}
	}
</script>

<style lang="less" scoped>
	.editFollowUp {
		min-height: 100vh;
		background: #F2F2F2;

		.slotRight {
			margin-right: 30rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}

		.editName {
			width: 642rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20rpx;
			margin: 22rpx auto;
			padding: 32rpx;

			.editPullTimeTitle {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				padding: 32rpx;
				color: #444444;
				// width:130rpx;
				flex-shrink: 0;
			}

			.editInput {
				width: 300rpx;
				font-size: 32rpx;
				text-align: right;

			}
		}

		.editPullTime {
			width: 706rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20rpx;
			margin: 22rpx auto;

			.editPullTimeTitle {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				padding: 32rpx;
				color: #444444;
				border-bottom: 1px solid #ECECEC;
			}

			.editPullTimeInfo {
				padding: 32rpx;

				.editPullTimeInfoImg {
					width: 40rpx;
					height: 40rpx;
					display: flex;
					margin-right: 20rpx;
				}

				.name {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #222222;
				}

				.dep {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					margin-top: 16rpx;
					color: #989898;
				}
			}

			.patientList {
				padding: 16rpx 32rpx;

				.patientListImg {
					width: 72rpx;
					height: 72rpx;
					display: flex;
					margin-right: 28rpx;
					// background: red;
					border-radius: 50%;
				}

				.name {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
				}

				.patientListImgs {
					width: 36rpx;
					height: 36rpx;
				}
			}
		}

		.plant {
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #444444;
			height: auto;

			.plantJJ {
				width: 12rpx;
				height: auto;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				flex-direction: column;

				.raios {
					width: 12rpx;
					height: 12rpx;
					border-radius: 50%;
					border: 1px solid #BEBEBE;
				}

				.grayLine {
					height: 100%;
					border-left: 1px dashed #efefef;
				}
			}

			.plantInfo {
				width: 550rpx;
				padding: 22rpx;
				background: rgba(242, 242, 242, 1);
				border-radius: 10rpx;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				margin-bottom: 28rpx;
				margin-left: 30rpx;

				text {
					color: #43C8EB;
				}

				.buttonList {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					margin-top: 20rpx;

					.edit {
						width: 78rpx;
						height: 40rpx;
						background: rgba(64, 200, 222, 1);
						border-radius: 10rpx;
						text-align: center;
						line-height: 40rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						margin-right: 20rpx;
					}

					.del {
						width: 78rpx;
						height: 40rpx;
						background: #FF5A5A;
						border-radius: 10rpx;
						text-align: center;
						line-height: 40rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
			}
		}

		.plantPop {
			.plantPopTitle {
				padding: 32rpx;
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

			.plantPopInfo {
				padding: 50rpx 40rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #222222;

				.plantPopInfoDay {
					width: 400rpx;
					height: 68rpx;
					line-height: 68rpx;
					border: 2rpx solid #E8E8E8;
					border-radius: 10rpx;
					margin: 0 18rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #989898;
					padding: 0 32rpx;
				}

				.textaInfo {
					width: 400rpx;
					height: 308rpx;
					border: 2rpx solid #E8E8E8;
					opacity: 1;
					border-radius: 10rpx;
					margin: 0 18rpx;
					font-size: 28rpx;
					padding: 22rpx 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #989898;
				}
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

			.selectForm {
				width: 610rpx;
				border: 2rpx solid #E8E8E8;
				opacity: 1;
				padding: 22rpx 30rpx;
				border-radius: 10rpx;
				margin: 22rpx 0 0 0;

				.selectFormIcon {
					width: 32rpx;
					height: 32rpx;
				}
			}

			.sublimt {
				width: 80%;
				height: 88rpx;
				background: rgba(64, 200, 222, 1);
				border-radius: 44rpx;
				text-align: center;
				line-height: 88rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				margin: 40rpx auto;
			}
		}

		.sublimt {
			width: 80%;
			height: 88rpx;
			background: rgba(64, 200, 222, 1);
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin: 40rpx auto;
		}
	}
</style>
