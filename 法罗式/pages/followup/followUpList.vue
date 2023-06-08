<template>
	<view class="followUp">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="addFolow">
				<image src="/static/images/icon_ad@2x.png" mode="" class="addIcon"></image>
			</view>
		</hx-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<view class="searchContainer" @click="toSearch">
			<u-search bgColor="#FFF" :showAction="false" height="35" searchIconSize="35" 
			:disabled="true" placeholder="搜索随访名称,手术名称" v-model="searchValue"></u-search>
			<!-- <image class="searchIcon" src='/static/images/search_icon.png'></image>
			<input :disabled="true" v-model="searchValue" placeholder="搜索随访名称,手术名称"/> -->
		</view>
		<u-tabs lineWidth="40" :activeStyle="{
            color: '#303133',
            fontWeight: 'bold',
			fontSize:'18px',
            transform: 'scale(1.05)' }"
        :inactiveStyle="{
            color: '#606266',
			fontSize:'18px',
            transform: 'scale(1)'
        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 45px;" 
		:list="tabList" :scrollable="false" @click="tabClick"></u-tabs>
		
			<view class="folowList" v-for="(item,index) in folowList" :key="index"  @click="itemDetail(item)">
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
				<view >
					<view class="joinModel" >计划周期：<text>{{item.serviceDay}}</text>
					</view>
					<view class="joinModel" >手术名称：<text>{{item.optionName}}</text>
					</view>
				</view>
				<view v-if="pageSource == 0">
					<view  class="createContianer"  @click="detail(item)">
						详情
					</view>
					<view class="createContianer" @click="toCopyToPerson(item)">
						复制到个人
					</view>
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
				config:{//自定义头部配置信息
					title: '随访计划',
					color: '#222 ',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#f2f2f2','#f2f2f2']],
					rightSlot:true,
				},
				folowList:[],
				totals:0,
				pageSize:4,
				totalPage:0,
				pageNum:1,
				searchValue:'',
				tabList:[{
                    name: '公用',
                }, {
                    name: '个人',
                   
                }],
				tabIndex:0,
				pageSource:0,
				
				
			};
		},
		onLoad(option) {
			this.pageSource = option.pageType
		},
		onShow() {
			let page = {
				num:1
			}
			this.pageNum = 1
			this.upCallback(page)
			console.log('调用了')
		},
		methods:{
			addFolow(){ 
				console.log('新增随访计划')
				uni.navigateTo({
					url:`./editFollowUp?operationaType=0`
				})
			},
			detail(item){
				uni.navigateTo({
					url:`./followUpDetail?id=${item.id}`
				})
			},
			itemDetail(item){
				if(this.pageSource == 1){
					uni.navigateTo({
						url:`./followUpDetail?id=${item.id}`
					})
				}
				
			},
			downCallback(){
				// let page = {
				// 	num: 1
				// }
				// this.pageNum = 1
				// this.folowList = []
				// this.upCallback(page)
				console.log('下拉刷新')
				// if(this.mescroll.optUp.use){
				// 	this.mescroll.resetUpScroll()
				// }else{
				// 	setTimeout(()=>{
				// 		this.mescroll.endSuccess();
				// 	}, 500)
				// }
				this.pageNum = 1
				this.mescroll.resetUpScroll();
			},
			// 去搜索页
			toSearch(){
				uni.navigateTo({
					url:`./searchFollowUp`
				})
			},
			tabClick(e){
				console.log('tab点击',e)
				if(this.tabIndex != e.index){
					this.tabIndex = e.index
					let page = {
						num: 1
					}
					this.pageNum = 1
					this.upCallback(page)
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
			onReachBottom: function() {
				if (this.totals > this.folowList.length) {
					console.log('到底了',this.totals,this.folowList.length)
					console.log(this.pageNum)
					// this.pageNum = this.totals/this.pageSize
					this.pageNum++
					let page = {
						num: this.pageNum
					}
					this.upCallback(page)
				}
			},
			upCallback(page) {//加载
			
				let data = {
					pageSize:this.pageSize,
					pageNum:page.num,
					createType:this.tabIndex == 0?1:null
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
						this.totals = res.data.total
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
		margin: 50rpx auto;
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
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: black;
			margin:40rpx 0 ;
			text{
				color: #222222;
			}
		}
	}
	.createContianer{
		width: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #7eb8ff;
		margin: 15rpx 0  20rpx 0;
		padding: 16rpx 16rpx;
		border-radius: 20rpx;
		color: #fff;
		font-size: 15px;
		.addIcon{
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
		}
	}
	.searchContainer{
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
		
		border-radius: 40rpx;
		margin-right: 50rpx;
		margin-left: 50rpx;
		margin-top: 30rpx;
		padding: 0 20rpx;
		.searchIcon{
			width: 60rpx;
			height: 60rpx;
			margin-right: 10rpx;
		}
	}
}
</style>
