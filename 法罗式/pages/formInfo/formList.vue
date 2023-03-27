<template>
	<view class="fromgl">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="addPatient">
				<image src="/static/images/icon_add@3x.png" mode="" class="slotRighticon"></image>
			</view>
		</hx-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="fromglList flexAB" v-for="(item,index) in fromglList" :key="index" @click="watchPatient(item)">
				<image src="/static/images/icon_for@2x.png" mode="" class="fromglListImg" ></image>
				<view class="flexAB" style="width:100%;">
					<view class="fromName">
						{{item.title}}
					</view>
					<image src="/static/images/icon_poi@2x(1).png" mode="" class="fromglListImgs"></image>
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
					title: '表单管理',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:true,
				},
				pageSize:10,
				fromglList:[],
				type:null,
			};
		},
		onLoad(options) {
			this.type=options.type
			// let page = {
			// 	num : 1
			// }
			// this.upCallback(page)
		},
		onShow() {
			let page = {
				num : 1
			}
			this.upCallback(page)
		},
		methods:{
			addPatient(){
				uni.navigateTo({
					url:'./addForm?id=0'
				})
			},
			watchPatient(item){
				if(this.type=='checkSend'){
					let selfSendData={
						selfSend:true,
						type:'form',
						msg:item.id
					}
					uni.setStorageSync('selfSend',selfSendData)
					uni.navigateBack()
					// console.log('选择表单发送',)
					
				}else{
					uni.navigateTo({
						url:`./addForm?id=${item.id}`
					})
				}
			},
			downCallback(){
				this.mescroll.resetUpScroll();
			},
			upCallback(page) {//加载
				let data = {
					pageSize:this.pageSize,
					pageNum:page.num,
				}
				this.api.formPageMyScoped(data).then(res=>{
					// console.log('表单列表',res.data.records)
					if(res.code == 0&&res.data.records.length>0){
						let curPageData = res.data.records;
						let curPageLen = res.data.records.length;
						let totalPage = res.data.total;
						if (page.num == 1) this.fromglList = [];
						this.fromglList = this.fromglList.concat(curPageData);
						this.mescroll.endByPage(curPageLen, totalPage);
					}else{
						this.fromglList = []
						this.mescroll.endByPage(0, 1);
					}
				}).catch(reg=>{
					this.fromglList = []
					this.mescroll.endByPage(0, 1);
				})
				
				
			},
		}
	}
</script>

<style lang="less" scoped>
.fromgl{
	min-height: 100vh;
	background:#F2F2F2 ;
	.slotRight{
		margin-right: 30rpx;
		.slotRighticon{
			width: 35rpx;
			height: 35rpx;
		}
	}
	.fromglList{
		width: 642rpx;
		// height: 120rpx;
		background: rgba(255,255,255,1);
		border-radius: 20rpx;
		margin: 22rpx auto;
		padding: 32rpx;
		.fromglListImg{
			width: 56rpx;
			height: 56rpx;
			display: flex;
			margin-right: 28rpx;
			flex-shrink: 0;
		}
		.fromName{
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
			
		}
		.fromglListImgs{
			width: 24rpx;
			height: 24rpx;
		}
	}
}
</style>
