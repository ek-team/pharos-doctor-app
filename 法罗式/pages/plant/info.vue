<template>
	<view class="info">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="sublimt">
				保存
			</view>
		</hx-navbar>
		<view class="infos flexAB">
			节点日期
			<text>
				第{{plantDetail.day}}天
			</text>
		</view>
		<view class="infos">
			提醒消息
			<textarea name="" v-model="plantDetail.notice" id="" class="textareainfo" cols="30" rows="10"></textarea>
		</view>
		<view class="infos flexAB">
			附带表单
			<picker @change="bindPickerChange" range-key="title" :value="formIndex" :range="list">
				<view class="flexA">
					<view class="" style="width:460rpx;text-align: right;">
						{{list[formIndex]?list[formIndex].title:'请选择表单'}}
					</view>
					<image src="/static/images/icon_cho@2x2.png" mode=""  class="infosImg"></image>
				</view>
			</picker>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{//自定义头部配置信息
					title: '计划节点编辑',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:true,
				},
				time:'',
				formIndex:0,
				list:[],
				id:0,
				plantDetail:{
					form:{
						title:''
					}
				}
			};
		},
		onLoad(option) {
			this.id  =option.id
			this.formPageScoped()
			
		},
		methods:{
			followUpPlanGetFollowUpPlanContentDetail(){
				let data  = {
					followUpPlanContentId:this.id
				}
				this.api.followUpPlanGetFollowUpPlanContentDetail(data).then(res=>{
					console.log(res)
					if(res.code ==0){
						this.formIndex = this.list.findIndex(item=>item.id==res.data.form.id)
						this.plantDetail = res.data
					}
				})
			},
			sublimt(){
				let data  = {
					id:this.id,
					notice:this.plantDetail.notice,
					formId:this.list[this.formIndex].id,
					status:0,
				}
				this.api.followUpPlanUpdateFollowUpPlanContent(data).then(res=>{
					console.log(res)
					if(res.code == 0){
						uni.showToast({
							title:'修改成功！'
						})
					}
				})
			},
			formPageScoped(){
				let data ={
					pageNum:1,
					pageSize:100
				}
				this.api.formPageScoped(data).then(res=>{
					console.log(res.data)
					if(res.code == 0){
						this.list = res.data.records
						this.followUpPlanGetFollowUpPlanContentDetail()
					}
				})
			},
			bindPickerChange(e){
				console.log(e.detail.value)
				this.formIndex = e.detail.value
			},
			
		}
	}
</script>

<style lang="less" scoped>
.info{
	min-height: calc(100vh - 22rpx);
	padding-top: 22rpx;
	background: #f2f2f2;
	.slotRight{
		margin-right: 30rpx;
		color: #fff;
		font-size:32rpx ;
	}
	.infos{
		width: 650rpx;
		padding:36rpx 28rpx ;
		background: rgba(255,255,255,1);
		border-radius: 20rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		margin: 22rpx auto;
		.textareainfo{
			width: 596rpx;
			height: 312rpx;
			border: 2rpx solid #ECECEC;
			opacity: 1;
			border-radius: 10rpx;
			padding:32rpx ;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
			margin: 20rpx auto;
		}
		text{
			width: 500rpx;
			height: 44rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
			text-align: right;
			.infosImg{
				width: 24rpx;
				height: 24rpx;
				display: flex;
				margin-left: 20rpx;
			}
		}
		.infosImg{
			width: 24rpx;
			display: flex;
			margin-left: 20rpx;
			height: 24rpx;
		}
		
	}
}
</style>
