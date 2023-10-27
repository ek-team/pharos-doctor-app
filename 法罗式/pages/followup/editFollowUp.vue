<template>
	<view class="editFollowUpContent">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="sublimt">
				{{rightText}}
			</view>
		</hx-navbar>
		<view class="editName">
			<view class="flexAB">
				<view class="editPullTimeTitle">
					随访名称：
				</view>
				<input type="text" class="editInput" placeholder="请输入随访名称" v-model="followUp.name">

			</view>
			<view class="flexAB">
				<view class="editPullTimeTitle">
					手术名称：
				</view>
				<view class="flexA editInput">
					<input type="text" placeholder="请输入手术名称" v-model="followUp.optionName">
					<!-- <image src="/static/images/icon_cho@2x2.png" mode="" class="selectFormIcon"></image> -->
				</view>
			</view>
		</view>
		<scroll-view scroll-x="false" scroll-y="true" :scroll-into-view="goIndexView" scroll-with-animation="true"
			overflow-y:auto style="height: 65vh;">
			<!-- <list  style="height: 65vh;"> -->
			<view v-for="(item,index) in planClassList">
				<view class="editName">
					<view class="plantPopTitle flexAB">
						<view class="">
							计划节点编辑
						</view>
						<image @click="closePlanClass(index)" src="/static/images/icon_canl@2x1.png" mode=""
							class="closeImg"></image>
					</view>
					<view class="plantPopInfo">
						<view class="flexA">
							节点日期
							<view class="flexA plantPopInfoDay" @click="item.showDateSelect = !item.showDateSelect">
								<view class="plantPopInfoDayText">
									{{item.dayStr == ''?'请选择时间':'术后'+item.dayStr}}
									<!-- {{jhjd.day==''?'请选择时间':jhjd.day}} -->
								</view>
								<image src="/static/images/icon_cho@2x2.png" mode="" class="selectFormIcon"></image>
							</view>

							<u-picker :show="item.showDateSelect" ref="uPicker" :columns="dateList" title="术后"
								@confirm="bindSelectDateChange($event,index)"
								@close="item.showDateSelect=!item.showDateSelect"
								@cancel="item.showDateSelect = !item.showDateSelect"
								@change="bindDatePickerChange($event,index)"></u-picker>
						</view>
						<view class="flex" style="margin-top: 30rpx;">
							提醒消息
							<textarea cols="30" rows="10" v-model="item.notice" placeholder="请输入提醒消息"
								class="textaInfo"></textarea>
						</view>
						<view class="flexA fromInfo">
							<image class="selectIcon" @click="addFrom(index)"
								:src="item.formState==0?'/static/images/icon_cho@2x.png':'/static/images/icon_cli@2x.png'"
								mode="">
							</image>
							附带表单
						</view>
						<view class="selectForm flexAB" v-if="item.formState==1">
							<picker @change="bindPickerChange($event,index)" range-key="title" :value="item.formIndex"
								:range="formList">
								<view class="uni-input flexA">
									<view class="" style="width:480rpx;">
										{{formList.length>0?formList[item.formIndex].title:''}}
									</view>
									<image src="/static/images/icon_cho@2x2.png" mode="" class="selectFormIcon"></image>
								</view>
							</picker>
						</view>
						<view :id="'item'+index" class="flexA fromInfo">
							<image class="selectIcon" @click="addArticle(index)"
								:src="item.articleState==0?'/static/images/icon_cho@2x.png':'/static/images/icon_cli@2x.png'"
								mode="">
							</image>
							科教文章
						</view>
						<view class="selectForm flexAB" v-if="item.articleState==1">
							<picker @change="articleBindPickerChange($event,index)" range-key="title"
								:value="item.articleIndex" :range="articleList">
								<view class="uni-input flexA">
									<view class="" style="width:480rpx;">
										{{articleList.length>0?articleList[item.articleIndex].title:''}}
									</view>
									<image src="/static/images/icon_cho@2x2.png" mode="" class="selectFormIcon"></image>
								</view>
							</picker>
						</view>
					</view>

				</view>
			</view>
			<!-- </list> -->
		</scroll-view>

		<view class="sublimt" @click="addPlanClass">
			添加计划节点
		</view>


	</view>
</template>

<script>
	var inputObj = {
		formId: 0,
		formTitle: '',
		articleId: 0,
		articleTitle: '',
		formIndex: 0,
		articleIndex: 0,
		formState: 0,
		articleState: 0,
		showDateSelect: false,
		notice: '',
		dayStr: '',
		day: '',
		number: 1,
		numberType: 2,
		hour: 1,
	}
	export default {
		data() {
			return {
				config: { //自定义头部配置信息
					title: '新建随访计划',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1, ['#5AA1FF', '#5AA1FF']],
					rightSlot: true,
				},
				rightText:'保存',
				dateList: [
					[],
					[],
					[]
				],
				followUp: {
					id:0,
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
				formList: [],
				articleList: [],
				planClassList: [],
				goIndexView: '',
				currentViewId: 0,
				picker: null,
				operationType: 0 ,//0新建，1编辑
				followUpId:0

			}
		},
		onLoad(option) {
			this.operationType = option.operationaType
			if (this.operationType == 0) {
				this.config.title = '新建随访计划'
				this.planClassList.push(JSON.parse(JSON.stringify(inputObj)))
			} else {
				this.config.title = '编辑随访计划'
				this.followUp.name = option.name
				this.followUp.optionName = option.optionName
				this.followUpId = option.id
				let list = JSON.parse(option.planClassList) 
				console.log('传递的节点', list)
				list.map(item=>{
					var itemObj = JSON.parse(JSON.stringify(inputObj))
					itemObj.formId = item.formId
					if(item.formId>0){
						itemObj.formTitle = item.form.title
					}
					if(item.articleId>0){
						itemObj.articleTitle = item.article.title
					}
					itemObj.articleId = item.articleId
					itemObj.formState = item.formId>0?1:0
					itemObj.articleState = item.articleId>0?1:0
					itemObj.notice = item.notice
					itemObj.number = item.number
					itemObj.numberType = item.numberType
					itemObj.hour = item.hour
					itemObj.day = item.day
					itemObj.dayStr = item.dayStr	
					this.planClassList.push(itemObj)
					console.log('转换后的数据-->',this.planClassList)
				})
			}

			this.dateList[1][0] = '天后'
			this.dateList[1][1] = '周后'
			this.dateList[1][2] = '月后'
			this.dateList[1][3] = '年后'
			for (var i = 0; i < 30; i++) {
				this.dateList[0][i] = i + 1
			}
			for (var i = 0; i < 24; i++) {
				this.dateList[2][i] = (i + 1) + ':00'
			}
			this.formPageScoped()
			this.getArticles()
		},
		methods: {
			sublimt: function() {
				if (this.followUp.name == '') {
					uni.showToast({
						title: '请输入随访名称',
						icon: "none"
					})
					return
				}
				if (this.followUp.optionName == '') {
					uni.showToast({
						title: '请输入手术名称',
						icon: "none"
					})
					return
				}
				for (var i = 0; i < this.planClassList.length; i++) {
					let obj = this.planClassList[i]
					if (obj.dayStr == '' || obj.notice == '') {
						uni.showToast({
							title: '请填写节点信息',
							icon: "none"
						})
						return
					}
				}
				this.followUp.followUpPlanContentList = this.planClassList
				console.log('随访计划参数--->', this.followUp)
				if(this.operationType == 0){
					this.api.followUpPlanSave(this.followUp).then(res => {
						console.log('新建随访计划返回--->', res.data)
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
				}else{
					this.followUp.followUpPlanContentList = this.planClassList
					this.followUp.id = this.followUpId
					this.api.followUpPlanUpdateById(this.followUp).then(res=>{
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
				}
				
			},
			addFrom(index) {
				this.planClassList[index].formState = this.planClassList[index].formState == 0 ? 1 : 0
				if (this.planClassList[index].formState == 0) {
					this.planClassList[index].formId = 0
					this.planClassList[index].formTitle = ''
				} else if (this.planClassList[index].formIndex == 0) { //默认选中第一项 给数据赋值
					this.planClassList[index].formId = this.formList[0].id
					this.planClassList[index].formTitle = this.formList[0].title
				}
			},
			addArticle(index) {
				this.planClassList[index].articleState = this.planClassList[index].articleState == 0 ? 1 : 0
				// this.articleState = this.articleState == 0 ? 1 : 0
				if (this.planClassList[index].articleState == 0) {
					this.planClassList[index].articleId = 0
					this.planClassList[index].articleTitle = ''
				} else if (this.planClassList[index].articleIndex == 0) { //默认选中第一项 给数据赋值
					this.planClassList[index].articleId = this.articleList[0].id
					this.planClassList[index].articleTitle = this.articleList[0].title
				}
			},
			formPageScoped() {
				let data = {
					pageNum: 1,
					pageSize: 100
				}
				this.api.formPageScoped(data).then(res => {
					console.log(res.data)
					if (res.code == 0) {
						this.formList = res.data.records
						// var tempId = 0
						this.planClassList.map((outItem,outIndex)=>{
							this.formList.map((item,index)=>{
								if(outItem.formId == item.id){
									this.planClassList[outIndex].formIndex = index
								}
							})
						})
						
						
					}
				})
			},
			getArticles() { //加载
				let data = {
					pageNum: 1,
					pageSize: 100
				}
				this.api.getArticles(data).then(res => {
					console.log(res)
					if (res.code == 0 && res.data.records.length > 0) {
						this.articleList = res.data.records
						this.planClassList.map((outItem,outIndex)=>{
							this.articleList.map((item,index)=>{
								if(outItem.articleId == item.id){
									this.planClassList[outIndex].articleIndex = index
								}
							})
						})
					} else {
						this.articleList = []
					}
				}).catch(reg => {
					this.contentList = []
				})


			},
			bindPickerChange(e, index) { //表单选择
				console.log(e.detail.value)
				let position = e.detail.value
				this.planClassList[index].formIndex = e.detail.value
				this.planClassList[index].formId = this.formList[position].id
				this.planClassList[index].formTitle = this.formList[position].title
			},
			articleBindPickerChange(e, index) { //科教文章
				let position = e.detail.value
				this.planClassList[index].articleIndex = e.detail.value
				this.planClassList[index].articleId = this.articleList[position].id
				this.planClassList[index].articleTitle = this.articleList[position].title
				console.log('文章选择', e.detail.value,this.articleList[position].title);
			},
			bindSelectDateChange(e, index) { //节点日期
				console.log('确认了', e);
				var dataList = e.value
				this.planClassList[index].dayStr = dataList[0] + dataList[1] + dataList[2]
				this.planClassList[index].showDateSelect = false
			},
			bindDatePickerChange(e, index) {
				// if (e.columnIndex == 1 && e.index != 0 && this.dateList[0].length <= 0) {
				// 	this.picker = this.$refs.uPicker

				// 	this.picker.setColumnValues(0, this.dateList[0])
				// 	this.picker.setColumnValues(2, this.dateList[2])
				// }
				console.log('执行了', e);
				if (e.columnIndex == 0) {
					this.planClassList[index].number = e.index + 1
				}
				if (e.columnIndex == 1) {
					this.planClassList[index].numberType = e.index + 2
				}
				if (e.columnIndex == 2) {
					this.planClassList[index].hour = e.index + 1
				}

			},
			addPlanClass() { //添加节点
				this.planClassList.push(JSON.parse(JSON.stringify(inputObj))) //深copy
				this.currentViewId = this.planClassList.length - 1
				setTimeout(() => {
					this.goIndexView = 'item' + this.currentViewId
				}, 500)

			},
			closePlanClass(index) {
				this.planClassList.splice(index, 1)
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
				color: #989898;
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
			width: 510rpx;
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
			width: 32rpx;
			height: 32rpx;
		}

		.editName {
			width: 642rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20rpx;
			margin: 22rpx auto;
			padding: 20rpx;

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