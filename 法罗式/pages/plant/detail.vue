<template>
	<view class="plantDetail">
		<view class="plantDetails">
			<view class="time flexAB">
				节点日期
				<view class="times">
					第{{plantDetail.day}}天
				</view>
			</view>
			<view class="time flexB">
				提醒消息
				<view class="notic">
					{{plantDetail.notice}}
				</view>
			</view>
			<view class="time flexB">
				附带表单
				<view class="notia">
					《{{plantDetail.form.title}}》
				</view>
			</view>
			<view class="time flexB">
				节点状态
				<view class="notia" :style="plantDetail.status==0?'':'color:red;'">
					{{plantDetail.status==0?'可用':'不可用'}}
				</view>
			</view>
			<view class="buttonList flexAB">
				<view class="flexAC buttin" @click="stop">
					
					{{plantDetail.status==0?'停止执行':'重新启用'}}
				</view>
				<view class="flexAC buttin" @click="editInfo">
					<image src="/static/images/icon_edi@3x.png" mode="" class="editIcon"></image>
					编辑
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				plantDetail:{
					form:{
						title:''
					}
				},
			};
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id?option.id:0
			
		},
		onShow() {
			this.followUpPlanGetFollowUpPlanContentDetail()
		},
		methods:{
			stop(){
				let data  = {
					id:this.id,
					notice:this.plantDetail.notice,
					formId:this.plantDetail.form.id,
					status:this.plantDetail.status==0?1:0,
				}
				this.api.followUpPlanUpdateFollowUpPlanContent(data).then(res=>{
					console.log(res)
					if(res.code == 0){
						uni.showToast({
							title:'操作成功！'
						})
						this.followUpPlanGetFollowUpPlanContentDetail()
					}
				})
			},
			editInfo(){
				uni.navigateTo({
					url:`./info?id=${this.id}`
				})
			},
			followUpPlanGetFollowUpPlanContentDetail(){
				let data  = {
					followUpPlanContentId:this.id
				}
				this.api.followUpPlanGetFollowUpPlanContentDetail(data).then(res=>{
					console.log(res)
					if(res.code ==0){
						this.plantDetail = res.data
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.plantDetail{
	min-height: calc(100vh - 22rpx);
	background: #f2f2f2;
	padding-top: 22rpx;
	.plantDetails{
		width: 706rpx;
		background: rgba(255,255,255,1);
		border-radius: 20rpx;
		margin: 0 auto;
		.buttonList{
			height: 88rpx;
			background: #fff;
			border-bottom-left-radius: 20rpx;
			border-bottom-right-radius: 20rpx;
			.buttin{
				background: rgba(230,235,242,1);
				width: 350rpx;
				text-align: center;
				line-height: 88rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #378EFF;
				.editIcon{
					width: 32rpx;
					height: 32rpx;
					display: flex;
					margin-right: 20rpx;
				}
			}
		}
		.time{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
			border-bottom: 1px solid #f2f2f2;
			padding: 32rpx 28rpx;
			.times{
				
				color: #222222;
			}
			.notic{
				
				color: #222222;
				width: 482rpx;
			}
			.notia{
				width: 482rpx;
				color: #378EFF;
			}
		}
	}
}
</style>
