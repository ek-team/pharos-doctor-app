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
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputName: '',
				historyList: []
			}
		},
		onShow() {
			this.historyList = JSON.parse(uni.getStorageSync('searchHistoryList') || '[]')
		},
		methods: {
			itemSearch(value) {
				this.inputName = value
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
						} else if (res.cancel) {
						}
					}
				})
				
			},
			searchConfirm: function(value) {
				console.log('输入框内容' + value)
				this.saveKeyword(value)

			},
			search: function(value) {
				console.log('回车输入框内容' + value)
				this.saveKeyword(value)

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
				}

			},
		}
	}
</script>

<style lang="less" scoped>
	.baseContainer {
		display: flex;
		flex-direction: column;
	}

	.history {
		margin-top: 40rpx;
		margin-bottom: 30rpx;
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