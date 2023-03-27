<template>
	<view class="setUp">
		<hx-navbar ref="hxnb" :config="config">
			<!-- <view class="" slot="right" class="slotRight flexA" @click="sublimt">
				保存
			</view> -->
		</hx-navbar>
		<view class="setupList" v-for="(item,index) in setup" :key="index" @click="setUpInfo(item)">
			<view class="flexAB">
				<view class="flexA">
					<text>服务类型:</text>{{item.category}}
				</view>
				<view class="flexA">
					<text style="color:#FF7F00;" v-if="item.doctorUserAction&&item.category!='团队图文咨询'">{{item.doctorUserAction.price}}</text>
					<image src="/static/images/icon_poi@2x(1).png" mode="" class="rightIcon"></image>
				</view>
			</view>
			<view class="dec">
				<text>服务描述:</text>{{item.serviceDesc}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{//自定义头部配置信息
					title: '服务设置',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:false,
				},
				setup:[],
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.doctorUserActionQueryService()
		},
		methods:{
			setUpInfo(item){
				if(item.category=='团队图文咨询'){
					uni.navigateTo({
						// url:'../my/team?item='+JSON.stringify(item)
						url:`../my/team?item=${JSON.stringify(item)}`
					})
					return
				}
				uni.navigateTo({
					url:`./setUpInfo?item=${JSON.stringify(item)}`
				})
			},
			doctorUserActionQueryService(){
				this.api.doctorUserActionQueryService('').then(res=>{
					// console.log(res)
					if(res.code ==0){
						this.setup=res.data
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.setUp{
	min-height: calc(100vh - 40rpx);
	background: #f2f2f2;
	padding: 20rpx 0;
	.setupList{
		width: 650rpx;
		padding: 22rpx;
		background: #fff;
		margin: 20rpx auto;
		border-radius: 10rpx;
		color: #222;
		font-size: 28rpx;
		text{
			color: #989898;
		}
		.rightIcon{
			width: 30rpx;
			height: 30rpx;
		}
		.dec{
			color: #222;
			font-size: 28rpx;
			margin-top: 20rpx;
		}
		
	}
}
</style>
