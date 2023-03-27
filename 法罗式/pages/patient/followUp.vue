<template>
	<view class="followUp">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="addFolow">
				<image src="/static/images/icon_ad@2x.png" mode="" class="addIcon"></image>
			</view>
		</hx-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="folowList" v-for="(item,index) in folowList" :key="index" @click="detail(item)">
				<view class="flexAB">
					<image src="/static/images/icon_pla@2x1.png" mode="" class="folowListImg"></image>
					<view class="flexAB" style="width:100%;">
						<text class="name">{{item.name}}</text>
						<view class="num">
							{{item.patientUserCount}}人
						</view>
					</view>
				</view>
				<view class="flexA joinModel">
					加入模式：
					<text>{{item.joinType==1?'自动加入':'手动管理'}}</text>
				</view>
				<view class="flexA joinModel">
					推送节点：<text>{{item.pushType==1?'患者加入时':'固定时间：' + item.pushHour + ':'+item.pushMinute }}</text>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				config:{//自定义头部配置信息
					title: '随访计划',
					color: '#222 ',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#f2f2f2','#f2f2f2']],
					rightSlot:true,
				},
				folowList:[],
				pageSize:10,
				totalPage:0
			};
		},
		onShow() {
			let page = {
				num:1
			}
			this.upCallback(page)
			console.log('调用了')
		},
		methods:{
			addFolow(){
				uni.navigateTo({
					url:`./followUpDetail?id=${0}`
				})
			},
			detail(item){
				uni.navigateTo({
					url:`./followUpDetail?id=${item.id}`
				})
			},
			downCallback(){
				this.mescroll.resetUpScroll();
			},
			upCallback(page) {//加载
				let data = {
					pageSize:this.pageSize,
					pageNum:page.num,
				}
				// console.log('pageNum'+page.num)
				// console.log('totalPage'+this.totalPage)
				// if(page.num>1&&page.num>this.totalPage){
				// 	return
				// }
				this.api.followUpPlanPage(data).then(res=>{
					console.log(res)
					if(res.code == 0&&res.data.records.length>0){
						let curPageData = res.data.records;
						let curPageLen = res.data.records.length;
						let totalPage = parseInt(res.data.total/this.pageSize)+1;
						this.totalPage = totalPage
						if (page.num == 1) this.folowList = [];
						this.folowList = this.folowList.concat(curPageData);
						this.mescroll.endByPage(curPageLen, totalPage);
					}else{
						this.folowList = []
						this.mescroll.endByPage(0, 1);
					}
				}).catch(reg=>{
					this.folowList = []
					this.mescroll.endByPage(0, 1);
				})
				
				
			},
		}
	}
</script>

<style lang="less" scoped>
.followUp{
	min-height: 100vh;
	background: #f2f2f2;
	.addIcon{
		width:60rpx;
		height: 60rpx;
		margin-right: 40rpx;
	}
	.folowList{
		width: 662rpx;
		background: rgba(255,255,255,1);
		padding:32rpx ;
		border-radius: 20rpx;
		margin: 22rpx auto;
		.folowListImg{
			width: 56rpx;
			height: 56rpx;
			display: flex;
			margin-right:28rpx ;
			flex-shrink: 0;
		}
		.name{
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
		}
		.num{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
		}
		.joinModel{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #989898;
			margin:20rpx 0 ;
			text{
				color: #222222;
			}
		}
	}
}
</style>
