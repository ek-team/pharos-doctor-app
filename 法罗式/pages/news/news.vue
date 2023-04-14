<template>
	<view>
		<view v-for="(item,index) in contentList" :key="index" @click="clickInfo(item,index)">
			<view class="noiceList flexAB">

				<view class="noiceInfo">
					<view class="flexAB">
						<view class="contentTitle">
							{{item.contentTitle}}
						</view>
					</view>
				</view>
				<view class="tes6t">
					<image class="noiceListImg"
						:src="item.imgPath"
						mode="" style="width:200rpx;height:140rpx;margin-left: 30rpx;"></image>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import testJsonData from "@/static/asset/mock_article.json";
	export default {
		data() {
			return {
				contentList:testJsonData
			}
		},
		methods: {
			clickInfo(item, index) {
				console.log("点击了"+ index,item)
				uni.navigateTo({
					url:`/pages/news/newsDetail?id=${index}&contentTitle=${item.contentTitle}&content=${item.content}&date=${item.date}&imgPath=${item.imgPath}&tailText=${item.tailText}`
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	
	.noiceList {
		margin: 30rpx auto;
		padding: 20rpx;
		border-bottom:1rpx solid lightgrey;
		
		
		.noiceListImgs {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 200rpx;
			height: 200rpx;
			margin-right: 32rpx;
			border-radius: 10rpx;

		}
		
		
		

	}
	.noiceInfo {
		flex: 1;
		width: 580rpx;
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	
		view {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
		}
	
		text {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #BDBDBD;
		}
	}
	.contentTitle{
		 overflow: hidden;
		    -webkit-line-clamp: 2;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-box-orient: vertical;
	}
</style>