<template>
	<view class="addForm">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="addForm">
				{{id==0||changeFlag?'保存':'删除'}}
			</view>
		</hx-navbar>
		<view class="formBG">
			<view class="blueBg">

			</view>
			<view class="grayBg">

			</view>
			<view class="formName">
				<view class="formNames">
					<view class="name">
						表单名称
					</view>
					<input type="text" :disabled="id==0?false:true" v-model="form.title" placeholder="请输入表单名称..."
						class="nameInfo">
				</view>
			</view>
		</view>
		<view class="formAdd">
			<view class="" v-for="(item,index) in form.formSettings" :key="index" @click="selectIndex=index">
				<view class="inputInfo">
					<image src="/static/images/icon_set@3x.png" mode="" class="formAddIcon"></image>
					<view class="inputInfos " v-if="item.type==1">
						<view class="flexAB">
							{{item.name}}
							<text v-if="groupId > 0">{{'('+form.formUserDataList[index].answer+')'}}</text>
							<text v-else >{{item.placeholder}}</text>
						</view>
						<!-- 答案对应的分数 -->
						<view class="inputInfosList">
							<view v-if="groupId==0" class="flexA" style="margin: 28rpx 0;" v-for="(items,indexs) in item.formOptionsList"
								:key="indexs">
								{{items.text}}
								<text v-if="items.score" style="margin-left: 14rpx;">{{'('+items.score+')'}}分</text>
							</view>
							<view v-if="groupId>0" class="flexA" style="margin: 28rpx 0;">
								<text v-if="form.formUserDataList[index].answer" style="margin-left: 14rpx;">{{'('+form.formUserDataList[index].scope+')'}}分</text>
								<!-- <text  style="margin-left: 14rpx;">10分</text> -->
							</view>
						</view>
					</view>
					<view class="inputInfos" v-if="item.type==3">
						<view class="flexAB">
							{{item.name}}
						</view>
						<view v-if="groupId==0" style="height: 200rpx;margin-top: 20rpx;color:#989898;border: 1px solid  #ECECEC;padding: 20rpx;">
							{{item.placeholder}}
							</view>
							<view v-else style="height: 200rpx;margin-top: 20rpx;color:#989898;border: 1px solid  #ECECEC;padding: 20rpx;">
								{{form.formUserDataList[index].answer}}
								</view>
						<!-- 答案对应的分数 -->
						<view class="inputInfosList">
							<view class="flexA" style="margin: 28rpx 0;" v-for="(items,indexs) in item.formOptionsList"
								:key="indexs">
								{{items.text}}
								<text v-if="items.score" style="margin-left: 14rpx;">{{'('+items.score+'分)'}}</text>
							</view>
						</view>
					</view>
					<view class="inputInfos" v-if="item.type==2">
						<view class="">
							{{item.name}}(单选题)
						</view>
						<view class="inputInfosList">
							<view class="flexA" style="margin: 28rpx 0;" v-for="(items,indexs) in item.formOptionsList"
								:key="indexs">
								<image v-if="groupId>0 && items.id == form.formUserDataList[index].answer && items.formSettingId == form.formUserDataList[index].formSettingId" src="/static/images/icon_cli@2x.png" mode="" class="inputInfosListImg"></image>
								<image v-else src="/static/images/icon_cho@2x.png" mode="" class="inputInfosListImg"></image>
								{{items.text}}
								<text v-if="items.score" style="margin-left: 14rpx;">{{'('+items.score+'分)'}}</text>
							</view>
						</view>
					</view>
					<view class="inputInfos" v-if="item.type==4">
						<view class="inputInfosList">
							{{item.text}}
						</view>
					</view>
					<view class="inputInfos" v-if="item.type==5 && answerImgList.length>0 && !config.rightSlot" @click="viewImg(answerImgList)"> <!-- 5图片 -->
						<view class="">
							{{item.name}}
						</view>
						<view class="imgContainer" v-for="(items,indexs) in answerImgList">
							<image class="imgItem" :src="items"></image>
						</view>
					</view>
					<view class="inputInfos" v-else-if="item.type==5">
						<view class="">
							{{item.name}}
						</view>
						<!-- <view class="inputInfosList">
							<view class="imgInfo flexCC">
								<image src="/static/images/icon_pic@3x1.png" mode="" class="imaIcon"></image>
								点击上传图片
							</view>
						</view> -->
					</view>
					<view class="inputInfos" v-if="item.type==6">
						<view class="">
							{{item.name}}(多选题)
						</view>
						<view class="inputInfosList">
							<view class="flexA" style="margin: 28rpx 0;" v-for="(items,indexs) in item.formOptionsList"
								:key="indexs">
								<image v-if ="items.checked" src="/static/images/icon_checkbox_selected.png" mode="" class="inputInfosListImg"></image>
								<image v-else src="/static/images/icon_chos@3x.png" mode="" class="inputInfosListImg"></image>
								
								{{items.text}}
								<text v-if="items.score" style="margin-left: 14rpx;">{{'('+items.score+'分)'}}</text>
							</view>
						</view>
					</view>
					<!-- <view class="editByutton" v-if="selectIndex==index&& id !==0 && groupId==0">
						<view class="flexAC editByuttons" @click="editForm(item,index)">
							<image src="/static/images/icon_edi@3x.png" mode="" class="editIcon"></image>
							编辑
						</view>
						<view class="flexAC editByuttons" @click="delForm(index)">
							<image src="/static/images/icon_canl@3x.png" mode="" class="editIcon"></image>
							删除
						</view>
					</view> -->
				</view>
			</view>
		</view>
		<view class="addFormButton flexAC" @click="formInfo" v-if="id==0 && groupId==0">
			<image src="/static/images/icon_add@3x1.png" mode="" class="addFormIcon"></image>
			添加字段
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config: { //自定义头部配置信息
					title: '创建表单',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1, ['#378EFF', '#378EFF']],
					rightSlot: true,
				},
				checkboxChecked:false,
				selectIndex: -1,
				form: {
					title: '',
					formSettings: [

					], //组建名称
					formUserDataList: [

					],
				},
				id: 0,
				changeFlag:false,
				groupId: 0,
				answerImgList:[]
			};
		},
		watch:{
			
		},
		onShow() {
			let that = this
			if (uni.getStorageSync('addFormData')) {
				let data = uni.getStorageSync('addFormData')
				if (data.index != -1) {
					// this.changeFlag = true
					that.form.formSettings[data.index] = data.form
					that.$forceUpdate()
				} else {
					that.form.formSettings.push(data.form)
				}
				uni.removeStorageSync('addFormData')
			}
			// uni.$on('addFormData',function(data){

			// 	if(data.index !=-1){
			// 		console.log('添加了表单11',data,data.index)
			// 		that.form.formSettings[data.index] = data.form
			// 		that.$forceUpdate()
			// 	}else{
			// 		that.form.formSettings.push(data.form)
			// 	}

			// })

		},
		onLoad(option) {
			console.log(option)
			if (option) {
				this.id = option.id ? option.id : 0
				this.groupId = option.groupId ? option.groupId : 0
				if (this.groupId != 0) {
					this.config.title = '查看表单'
					this.config.rightSlot = false
				}
				if (this.id != 0) {
					this.formGetById()
				}else if (this.groupId != 0) {
					this.formGetByGroupId()
				}

			}
		},
		methods: {
			formGetById() {
				let data = {
					id: this.id
				}
				this.api.formGetById(data).then(res => {
					// console.log('表单详情',res.data)
					if (res.code == 0) {
						this.form = {
							...this.form,
							...res.data
						}
					}
				})
			},
			formGetByGroupId() {
				let data = {
					groupId: this.groupId
				}
				this.api.getUserFormFilledDetail(data).then(res => {
					console.log('填写表单详情', res.data)
					if (res.code == 0) {
						this.form = {
							...this.form,
							...res.data
						}
						for(var i=0;i<this.form.formUserDataList.length;i++){//多选题 数据转换
							let optionsList = this.form.formSettings[i]
							if(optionsList.type == 6){
								var answerList = this.form.formUserDataList[i].answer
								for(var j=0;j<optionsList.formOptionsList.length;j++){
									var item = optionsList.formOptionsList[j]	
									for(var k=0;k<answerList.length;k++){
										console.log('id--->',item.id,answerList[k])
										if(item.id == answerList[k] ){
											this.form.formSettings[i].formOptionsList[j].checked = true
											console.log('判断到了',this.form.formSettings[i].formOptionsList[j].checked)
										}
									}
									
								}
							}else if(optionsList.type == 5){//答案是图片
								this.answerImgList = this.form.formUserDataList[i].answer
							}
						
						}
						// console.log('转换后的数据---',this.form.formSettings)
					}
				})
			},
			delForm(index) {
				this.form.formSettings.splice(index, 1)
				this.selectIndex = -1
			},
			viewImg(list) {
				uni.previewImage({
					urls: list
				})
			},
			editForm(item, index) {
				let urls = ''
				switch (item.type) {
					case 1:
						urls = './inputCompont'
						break;
					case 2:
						urls = './radioCompont'
						break;
					case 3:
						urls = './textACompont'
						break;
					case 4:
						urls = './textCompont'
						break;
					case 5:
						urls = './imgCompont'
						break;
					case 6:
						urls = './checkputCompont'
						break;
				}
				urls = urls + `?data=${JSON.stringify(item)}&index=${index}`
				console.log('去编辑', index)
				uni.navigateTo({
					url: urls
				})
			},
			addForm() {
				let data = this.form
				if (this.form.title == '') {
					uni.showToast({
						title: '请输入表单名称',
						icon: 'error'
					})
					return
				}
				console.log('提交的表单数据', data)
				if (this.id == 0 || this.changeFlag) {
					this.api.formSave(data).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								title: '添加成功！'
							})
							this.form = {
								title: '',
								formSettings: []
							}
							uni.navigateBack({
								delta: 1
							})
						}
					})
				} else {
					console.log('删除')
					this.api.formDeleteById(data).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								title: '删除成功！'
							})
							uni.navigateBack({
								delta: 1
							})
						}
					})
				}

			},
			formInfo() {
				console.log(1111)
				uni.navigateTo({
					url: './formInfo'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.imgAnswer {
		display: flex;
		flex-direction: row;
		// justify-content: ;
		flex-wrap: wrap;
	}
	.itemAnswer {
		padding: 0 20rpx;
		margin-top: 20rpx;
	}
	.imgContainer {
		width: 25%;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
	
		.imgItem {
			width: 150rpx;
			height: 150rpx;
			margin-right: 20rpx;
		}
	}
	.addForm {
		min-height: calc(100vh - 20rpx);
		background: #f2f2f2;
		padding: 0 0 20rpx 0;

		.formAdd {
			width: 706rpx;
			margin: 0 auto;

			.inputInfo {
				background: #fff;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #444444;
				padding: 22rpx 28rpx;
				margin: 20rpx auto;
				border-radius: 20rpx;
				position: relative;

				.inputInfos {
					padding: 28rpx 0;

					.inputInfosList {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #222222;

						.inputInfosListImg {
							width: 32rpx;
							height: 32rpx;
							display: flex;
							margin-right: 20rpx;
						}

						.imgInfo {
							width: 176rpx;
							height: 176rpx;
							background: rgba(242, 242, 242, 1);
							opacity: 1;
							border-radius: 20rpx;
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #888888;
							flex-direction: column;
							margin-top: 28rpx;

							.imaIcon {
								width: 48rpx;
								height: 48rpx;
							}
						}
					}

				}

				.editByutton {
					position: absolute;
					width: 230rpx;
					height: 210rpx;
					background: rgba(255, 255, 255, 1);
					border: 2rpx solid #CECECE;
					box-shadow: 0px 6rpx 12rpx #C1C7CE;
					opacity: 1;
					border-radius: 10rpx;
					right: 20rpx;
					top: 58rpx;
					z-index: 10;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #444444;

					.editByuttons {
						height: 106rpx;

					}

					.editByuttons:first-child {
						border-bottom: 1px solid #CECECE;
					}

					.editIcon {
						width: 36rpx;
						height: 36rpx;
						display: flex;
						margin-right: 24rpx;
					}
				}

				.formAddIcon {
					width: 34rpx;
					height: 8rpx;
					display: flex;
					margin-left: auto;
				}

				text {
					width: 500rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #989898;
				}
			}
		}

		.slotRight {
			margin-right: 30rpx;
			color: #fff;
			font-size: 30rpx;

		}

		.addFormButton {
			width: 706rpx;
			height: 112rpx;
			background: rgba(255, 255, 255, 1);
			line-height: 112rpx;
			border-radius: 20rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
			margin: 22rpx auto;

			.addFormIcon {
				width: 36rpx;
				height: 36rpx;
				display: flex;
				margin-right: 20rpx;
			}
		}

		.formBG {
			position: relative;

			.blueBg {
				height: 186rpx;
				width: 100%;
				background: #378EFF;
			}

			.grayBg {
				height: 128rpx;
				width: 100%;
				background: #f2f2f2;
			}

			.formName {
				position: absolute;
				z-index: 10;
				width: 750rpx;
				left: 0;
				top: 44rpx;
				right: 0;

				.formNames {
					width: 650rpx;
					border-radius: 20rpx;
					background: #fff;
					padding: 32rpx 28rpx;
					margin: 0 auto;

					.name {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #444444;
					}

					.nameInfo {
						padding: 32rpx;
						border: 2rpx solid #ECECEC;
						flex: 1;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #222;
						margin: 32rpx auto;
					}
				}
			}
		}
	}
</style>