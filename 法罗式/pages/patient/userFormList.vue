<template>
	<view class="formContainer">
		<hx-navbar ref="hxnb" :config="config">
			<!-- <view class="" slot="right" class="slotRight flexA" @click="sublimt">
				{{!datainfo.doctorUserAction?'添加':'保存'}}
			</view> -->
		</hx-navbar>
		<view class="listContainer" v-for="(item,index) in list" @click="toFormDetail(item)">
			<view class="leftContainer">
				<image src="/static/images/form_icon.png" class="formImg"></image>
				<view class="infoContainer">
					<view>{{item.title}}</view>
					<view class="createTime">{{item.createTime}}</view>
				</view>
			</view>
			<view class="rightContainer">查看详情</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				config:{//自定义头部配置信息
					title: '患者表单列表',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:true,
				},
				userId:null,
				list:[{createTime: "2023-02-08 17:18:55",createUserId: 2279,deptId: 510,id: 27,"status": 0,title: "测试表单"},{createTime: "2023-02-08 17:18:55",createUserId: 2279,deptId: 510,id: 27,"status": 0,title: "测试表单11"}]
			}
		},
		onLoad(options) {
			this.userId=options.userId
			// 填写的表单列表 
			this.getFormList()
		},
		methods:{
			getFormList(){
				this.api.formUserDataGetDataByFormId({
					userId:this.userId
				}).then(res=>{
					this.list=res.data
					console.log(this.id,'表单列表',res)
				})
			},
			toFormDetail(item){
				// console.log(item)
				uni.navigateTo({
					url:'./userFormDetail?userId='+this.userId+'&formId='+item.id+'&groupId='+item.groupId
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	.formContainer{
		display: flex;
		flex-direction: column;
	}
	.listContainer{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		border-bottom: 1px solid #ececec;
		padding: 40rpx 20rpx 20rpx 20rpx;
		.leftContainer{
			display: flex;
			flex: 1;
			flex-direction: row;
			align-items: center;
		}
		.rightContainer{
			color: #808080;
		}
		.infoContainer{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.createTime{
				margin-top: 6rpx;
				font-size: 30rpx;
				color: #808080;
			}
		}
		.formImg{
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
		}
	}
</style>
