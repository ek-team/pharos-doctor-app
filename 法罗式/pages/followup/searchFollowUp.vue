<template>
	<view class="baseContainer">
		<u-search :actionStyle="{
            fontWeight: 'bold',
			fontSize:'18px' }" :showAction="true" actionText="搜索" height="35" searchIconSize="35"
			style=" margin-left: 40rpx; margin-right:40rpx;" placeholder="搜索随访名称,手术名称" v-model="inputName"
			@custom="searchConfirm" @search="search" @clear="clearText"></u-search>
		<view class="history" v-if="historyList.length>=1">
			<view class="iconfont icon-lishi:before" style="width: 17rpx;display: inline;"></view>
			<text class="history_text">历史搜索</text>
			<view style="float: right;margin-right: 20rpx;font-size: 14px;" @click="clearHistory()">清除历史</view>
			<!-- <u-empty mode="search" style="font-size: 18rpx;" v-if="searchHistoryList.length<1"></u-empty> -->
			<view class="history_viewContent">
				<view class="history_view" v-for="(item,index) in historyList" :key="index" @click="itemSearch(item)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="folowList" v-for="(item,index) in folowList" :key="index">
			<view class="flexAB">
				<!-- <image src="/static/images/icon_pla@2x1.png" mode="" class="folowListImg"></image> -->
				<view class="flexAB" style="width:100%;">
					<text class="name">{{item.name}}--随访计划</text>
					<view class="num">
						{{item.patientUserCount}}人
					</view>
				</view>
			</view>
			<view class="flexAB">
				<view>
					<view class="joinModel">计划周期：<text>{{item.serviceDay}}</text>
					</view>
					<view class="joinModel">手术名称：<text>{{item.optionName}}</text>
					</view>
				</view>
				<view v-if="pageSource == 0">
					<view class="createContianer" @click="detail(item)">
						详情
					</view>
					<view class="createContianer" @click="toCopyToPerson(item)">
						复制到个人
					</view>
				</view>

			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputName: '',
				historyList: [],
				folowList: [],
				pageSource: 0
			}
		},
		onShow() {
			this.historyList = JSON.parse(uni.getStorageSync('searchHistoryList') || '[]')
		},
		methods: {
			detail(item){
				uni.navigateTo({
					url:`./followUpDetail?id=${item.id}`
				})
			},
			itemSearch(value) {
				this.inputName = value
				this.getFollowUpList(value)
			},
			// 清空历史搜素
			clearHistory() {
				let that = this
				uni.showModal({
					title: '删除提示',
					content: '是否清空搜索记录',
					confirmText: '清除',
					success: function(res) {
						if (res.confirm) {
							uni.showToast({
								title: '已清空'
							});
							uni.removeStorage({
								key: 'searchHistoryList'
							});

							that.historyList = [];
						} else if (res.cancel) {}
					}
				})

			},
			searchConfirm: function(value) {
				console.log('输入框内容' + value)
				this.saveKeyword(value)
				this.getFollowUpList(value)

			},
			search: function(value) {
				console.log('回车输入框内容' + value)
				this.saveKeyword(value)
				this.getFollowUpList(value)

			},
			clearText: function(value) {
				console.log('清除输入框内容' + value)

			},
			saveKeyword: function(inputName) {
				if (inputName == '') {
					uni.showModal({
						title: '搜索内容不能为空'
					});
				} else {
					if (this.historyList.includes(inputName)) {
						let i = this.historyList.indexOf(inputName);
						this.historyList.splice(i, 1);
						this.historyList.unshift(inputName)
					} else {
						this.historyList.unshift(inputName)
						uni.setStorageSync('searchHistoryList', JSON.stringify(this.historyList))
					}
					if(this.historyList.length>8){
						this.historyList.pop()
					}
				}

			},
			toCopyToPerson(item){
				let that = this
				uni.showModal({
					title: '操作提示',
					content: '确认复制随访计划',
					success: function(res) {
						if (res.confirm) {
							let data ={
								followUpPlanId:item.id
							}
						that.api.copyFollowUpPlan(data).then(res=>{
							console.log('复制结果',res.data)
							if(res.code == 0){
								uni.showToast({
									title:'复制完成',
									icon:'none'
								})
							}
						})
						} else if (res.cancel) {
				
						}
					}
				});
				
					
			},
			getFollowUpList(input) { //加载
			this.folowList = []
				let data = {
					pageSize: 1000,
					pageNum: 1,
					name:input
				}
				this.api.followUpPlanPage(data).then(res => {
					console.log(res)
					if (res.code == 0 && res.data.records.length > 0) {
						this.folowList = res.data.records
					} else {
						this.folowList = []
					}
				}).catch(reg => {
					this.folowList = []
				})


			}
		}
	}
</script>

<style lang="less" scoped>
	.baseContainer {
		display: flex;
		flex-direction: column;
	}

	.folowList {
		width: 662rpx;
		background: #eee;
		padding: 32rpx;
		border-radius: 20rpx;
		margin: 20rpx auto;

		.folowListImg {
			width: 56rpx;
			height: 56rpx;
			display: flex;
			margin-right: 28rpx;
			flex-shrink: 0;
		}

		.name {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
		}

		.num {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
		}

		.joinModel {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: black;
			margin: 40rpx 0;

			text {
				color: #222222;
			}
		}
	}

	.createContianer {
		width: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #7eb8ff;
		margin: 15rpx 0 20rpx 0;
		padding: 16rpx 16rpx;
		border-radius: 20rpx;
		color: #fff;
		font-size: 15px;

		.addIcon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
		}
	}

	.history {
		margin-top: 40rpx;
		margin-bottom: 10rpx;
	}

	.history_text {
		margin-left: 20rpx;
		font-size: 16px;
	}

	.history_viewContent {
		flex-wrap: wrap;
		justify-content: flex-start;
		display: flex;
		padding: 0 30rpx;
	}

	.history_view {
		background-color: #E2E0E0;
		padding: 15rpx 25rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		font-size: 14px;
		border-radius: 30rpx;
		text-align: center;
	}
</style>