<template>
	<view class="content">
		<view class="title">{{contentTitle}}</view>
		<view v-if="isShow" style="margin-left: 20rpx;margin-top: 40rpx;">益慷医生  {{date}}</view>
		<image style="width: 100%;height: 400rpx;margin-top: 40rpx;" :src="imgPath"></image>
		<view class="textContent">{{textContent}}</view>
		<view class="endText">{{tailText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contentTitle:'',
				textContent:'',
				imgPath:'',
				date:'',
				isShow:false,
				tailText:''
			}
		},
		methods: {
			
		},
		onLoad(option) {
			console.log(option.imgPath)
			console.log(option.contentTitle)
			this.contentTitle = option.contentTitle
			this.textContent = option.content
			this.date = option.date
			this.imgPath = option.imgPath
			this.tailText = option.tailText
		}
	}
</script>

<style>
	.content{
		min-height: 100vh;
	}
	.title{
		margin: 20rpx;
		font-size: 22px;
		font-weight: 600;
	}
	.textContent{
		padding: 30rpx;
		font-size: 18px;
	}
	.endText{
		padding: 30rpx;
		font-size: 18px;
		margin-bottom: 50rpx;
		font-weight: 600;
	}

</style>
