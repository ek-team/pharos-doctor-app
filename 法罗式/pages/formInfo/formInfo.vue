<template>
	<view class="formInfo">
		<view class="formInfos">
			<view class="title">
				请选择需要添加的字段类型
			</view>
			<view class="menuList flexAB">
				<view class="menuLists"  v-for="(item,index) in menuList" :key="index" @click="jump(item)">
					<image :src="item.icon" mode="" class="menuListsIcon"></image>
					<view class="name">
						{{item.name}}
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
				menuList:[
					{
						name:'单行输入框',
						icon:require('@/static/images/icon_alo@3x.png'),
						url:'./inputCompont',
					},
					{
						name:'多行输入框',
						icon:require('@/static/images/icon_dou@3x.png'),
						url:'./textACompont',
					},
					{
						name:'单选',
						icon:require('@/static/images/icon_sin@3x.png'),
						url:'./radioCompont',
					},
					{
						name:'多选',
						icon:require('@/static/images/icon_mul@3x.png'),
						url:'./checkputCompont',
					},
					{
						name:'文本',
						icon:require('@/static/images/icon_tex@3x.png'),
						url:'./textCompont',
					},
					{
						name:'图片',
						icon:require('@/static/images/icon_pic@3x.png'),
						url:'./imgCompont',
					}
				]
			};
		},
		methods:{
			jump(item){
				uni.navigateTo({
					url:`${item.url}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.formInfo{
	min-height: calc(100vh - 40rpx);
	background: #f2f2f2;
	padding: 20rpx 0;
	.formInfos{
		width: 706rpx;
		height: 580rpx;
		background: rgba(255,255,255,1);
		margin: 0 auto;
		border-radius: 20rpx;
		.title{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #444444;
			padding: 36rpx 28rpx;
			border-bottom: 1px solid #f2f2f2;
		}
		.menuList{
			display: flex;
			flex-wrap: wrap;
			.menuLists{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #444444;
				width: 234rpx;
				height: 234rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				border-right: 1px solid #f2f2f2;
				border-bottom: 1px solid #f2f2f2;
				.menuListsIcon{
					width: 66rpx;
					height: 66rpx;
				}
				.name{
					margin-top: 10rpx;
				}
			}
			.menuLists:nth-child(3){
				border-right: none;
			}
			.menuLists:nth-child(4){
				border-bottom: none;
			}
			.menuLists:nth-child(5){
				border-bottom: none;
			}
			.menuLists:nth-child(6){
				border-bottom: none;
				border-right: none;
			}
		}
	}
}
</style>
