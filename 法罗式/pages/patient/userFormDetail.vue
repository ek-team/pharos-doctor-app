<template>
	<view class="formContainer">
		<hx-navbar ref="hxnb" :config="config">
			<!-- <view class="" slot="right" class="slotRight flexA" @click="sublimt">
				{{!datainfo.doctorUserAction?'添加':'保存'}}
			</view> -->
		</hx-navbar>
		<view class="titleContainer">{{form.title}}</view>
		<view class="scopeContent" v-if="form.scope">综合得分：<span style="color:red">{{form.scope}}</span>分</view>
		<view class="listContainer" v-for="(item,index) in form.formSettings">
			<view>{{index+1+'.'}}{{item.type!=4?item.name:item.text}}</view> <!-- 4文本 -->
			<view class="itemAnswer" v-if="item.type==1"> <!-- 1输入框 -->
				<input class="itemInput" v-model="item.answer" :disabled="true" />
			</view>
			<view class="itemAnswer" v-if="item.type==2"> <!-- 2单选 -->
				<radio-group>
					<label class="uni-list-cell uni-list-cell-pd radioItem"
						v-for="(items, indexs) in item.formOptionsList" :key="items.id">
						<view>
							<radio :value="item.id" :checked="items.checked" :disabled="!items.checked" />
						</view>
						<view>{{items.text}}</view>
					</label>
				</radio-group>
			</view>
			<view class="itemAnswer" v-if="item.type==3"> <!-- 3多行文本 -->
				<view class="itemInput textItem">
					{{item.answer}}
				</view>
			</view>
			<view class="itemAnswer imgAnswer" v-if="item.type==5" @click="viewImg(item.answer)"> <!-- 5图片 -->
				<view class="imgContainer" v-for="(items,indexs) in item.answer">
					<image class="imgItem" :src="items"></image>
				</view>
			</view>
			<view class="itemAnswer" v-if="item.type==6"> <!-- 6多选 -->
				<checkbox-group>
					<label class="uni-list-cell uni-list-cell-pd radioItem"
						v-for="(items, indexs) in item.formOptionsList" :key="items.id">
						<view>
							<checkbox :value="item.id" :checked="items.checked" :disabled="true" />
						</view>
						<view>{{items.text}}</view>
					</label>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config: { //自定义头部配置信息
					title: '表单详情',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1, ['#378EFF', '#378EFF']],
					rightSlot: true,
				},
				form: {},
				formAnswer: [],
				userId: null,
				formId: null,
				from: null,
				msgId: null,
				groupId: null,
				chatGroupId: null
			}
		},
		onLoad(options) {
			this.userId = options.userId
			this.formId = options.formId
			this.from = options.from
			this.msgId = options.msgId
			this.groupId = options.groupId
			this.chatGroupId = options.chatGroupId
			console.log('接受的参数', options)
			if (this.from == 'chat') {
				if (this.chatGroupId != 'undefined') {
					this.getFormByGroupId()
				} else {
					this.getFormByUserId()
				}

			} else {
				// 填写的表单
				this.getFormDetail()
			}
			// this.getFormDetail()

		},
		methods: {
			getFormByUserId() {
				this.api.formGetById({
					id: this.formId,
					strId: this.msgId,
					patientUserId: this.userId,
				}).then(res => {
					if (res.code == 0) {
						this.form = res.data
						this.formAnswer = res.data.formUserDataList

						if (res.data && res.data.formSettings) {
							this.detailData()
						}
					}
					console.log('聊天记录里的表单详情', res)
				})
			},
			getFormByGroupId() {
				this.api.getFormDetailByGroupId({
					groupId: this.chatGroupId
				}).then(res => {
					if (res.code == 0) {
						this.form = res.data
						this.formAnswer = res.data.formUserDataList

						if (res.data && res.data.formSettings) {
							this.detailData()
						}
					}
					console.log('聊天记录里的表单详情', res)
				})
			},
			getFormDetail() {
				this.api.getUserDataDetailByFormId({
					userId: this.userId,
					formId: this.formId,
					groupId: this.groupId
				}).then(res => {
					if (res.code == 0) {
						console.log('列表进来的表单详情', res)
						this.form = res.data
						this.formAnswer = res.data.formUserDataList

						if (res.data && res.data.formSettings) {
							this.detailData()
						}
					}

				})
			},
			detailData() {
				this.form.formSettings.forEach((items, indexs, arrs) => {
					this.formAnswer.map(item => {
						items.answer = this.formAnswer[indexs].answer
					})
					if (items.type == 2) { //单选
						items.formOptionsList.forEach(item => {
							if (item.id == this.formAnswer[indexs].answer) {
								item.checked = true
							} else {
								item.checked = false
							}
						})
					}
					if (items.type == 6) { //多选
						items.formOptionsList.forEach(item => {
							if (this.formAnswer[indexs].answer.indexOf(item.id) >= 0) {
								item.checked = true
							} else {
								item.checked = false
							}
						})
					}
				})
			},
			viewImg(list) {
				uni.previewImage({
					urls: list
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.formContainer {
		display: flex;
		flex-direction: column;
	}

	.titleContainer {
		display: flex;
		justify-content: center;
		margin: 20rpx 0 40rpx 0;
		font-size: 18px;
		color: #333333;
		font-weight: bold;
	}

	.scopeContent {
		margin-left: 20rpx;

	}

	.listContainer {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		margin-bottom: 10rpx;

		.itemAnswer {
			padding: 0 20rpx;
			margin-top: 20rpx;
		}

		.itemInput {
			background-color: #F8F8F8;
			width: 500rpx;
			border: 1px solid #F3F3F3;
			border-radius: 10rpx;
			padding: 10rpx 20rpx;
			color: #555555;
			font-size: 14px;
		}

		.textItem {
			min-height: 300rpx;
		}

		.noBorder {
			border: none;
			background-color: #fff;
		}

		.radioItem {
			display: flex;
			flex-direction: row;
			margin-bottom: 20rpx;
		}

		.imgAnswer {
			display: flex;
			flex-direction: row;
			// justify-content: ;
			flex-wrap: wrap;
		}

		.imgContainer {
			width: 25%;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: center;

			.imgItem {
				width: 100rpx;
				height: 100rpx;
				margin-right: 20rpx;
			}
		}
	}
</style>