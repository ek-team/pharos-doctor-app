<template>
	<view>
		<mescroll-body ref="mescrollRef" @up="upCallback"  @init="mescrollInit" @down="downCallback">
		
		<view v-for="(item,index) in contentList" :key="index" @click="clickInfo(item,index)">
			<view class="noiceList flexAB">
	
				<view class="noiceInfo">
					<view class="flexAB">
						<view class="contentTitle">
							{{item.title}}
						</view>
					</view>
				</view>
				<view class="tes6t">
					<image class="noiceListImg"
						:src="item.picture"
						mode="" style="width:200rpx;height:140rpx;margin-left: 30rpx;"></image>
				</view>
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
				contentList:[],
				pageNum:1,
				pageSize:10,
				totals:0,
				detailCount:0,
				teamChatId:0,
				userChatId:0,
				chatType:0
				
			};
			},
			onLoad(option) {
				console.log(option)
				this.teamChatId = option.teamChatId
				this.userChatId = option.userChatId
				this.chatType = option.chatType
				
			},
			methods: {
				clickInfo(item, index) {
					console.log("点击了"+ index,item)
					uni.navigateTo({
						url:`/pages/sufferingarticles/articleDetail?id=${item.id}&userChatId=${this.userChatId}&teamChatId=${this.teamChatId}&chatType=${this.chatType}&detailType=0`
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
					this.api.getArticles(data).then(res=>{
						console.log(res)
						if(res.code == 0&&res.data.records.length>0){
							let curPageData = res.data.records;
							let curPageLen = res.data.records.length;
							let totalPage = res.data.total;
							if (page.num == 1) this.contentList = [];
							this.contentList = this.contentList.concat(curPageData);
							this.mescroll.endByPage(curPageLen, totalPage);
						}else{
							this.contentList = []
							this.mescroll.endByPage(0, 1);
						}
					}).catch(reg=>{
						this.contentList = []
						this.mescroll.endByPage(0, 1);
					})
				
				
				},
			
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
