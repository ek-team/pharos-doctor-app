<template>
	<view class="container">
		<view class="navContainer">
			<view class="navItem" :class="index==activeIndex?'activeItem':''" v-for="(item,index) in navList" @click="checkTeamPatient(item,index)">
				{{item.name}}
			</view>
		</view>
		<view class="centerContainer">
			<!-- 新建分组 -->
			<view class="createContianer" @click="toAddGroup">
				<image src='/static/images/addIcon.png' class="addIcon"></image>
				新建分组
			</view>
			<!-- 搜索 -->
			<view class="searchContainer" @click="toSearch">
				<image class="searchIcon" src='/static/images/search_icon.png'></image>
				<input :disabled="true" v-model="searchValue" placeholder="搜索患者姓名、分组"/>
			</view>
		</view>
		<!-- 团队列表 -->
		<view class="patientContainer">
			<view class="lengthContainer">全部分组</view>
			<view class="teamContainer" v-for="(item,index) in groupList" @click="toPatientList(item)" @longpress="deleteGroup(item)">
				<view class="teatLeftContainer">
					<image src="/static/images/notGroup.png" class="groupIcon"></image>
					{{item.name}}
				</view>
				<view class="countContainer">
					共{{item.count}}人<image src='/static/images/select_right.png' class="selectIcon"></image>
				</view>
			</view>
		</view>
	<!-- 	<view class="footerOption">
			<view class="itemOption" @click="toAddFollowUp">随访</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList:[{name:'我的患者'}],
				searchValue:null,
				groupList:[],
				activeIndex:0,
				checkTeam:null,
			}
		},
		onLoad(){
			// 获取我所在团队的列表
		},
		onUnload() {
			uni.removeStorageSync('checkPatientList')
			uni.removeStorageSync('checkIdList')
			uni.removeStorageSync('followUpPlanPatientUserList')
		},
		onShow() {
			this.getMyTeam()
			this.getTeamGroup()
		},
		methods: {
			getMyTeam(){
				this.navList=[{name:'我的患者'}]
				this.api.queryMyTeamNoResultHospital().then(res=>{
					// console.log('团队列表接口',res.data)
					this.navList=this.navList.concat(res.data)
				})
				//this.api.queryMyTeamNoResultHospital //团队列表接口this.navList=
				//this.api.userGroupGetUserToGroupCount  查询分组列表teamId//如果是在团队下查询 传这个参数 否则不用传  this.groupList=
			},
			getTeamGroup(){

				this.api.userGroupGetUserToGroupCount({
					teamId:this.activeIndex==0?'':this.checkTeam.id
				}).then(res=>{
					this.groupList= res.data
					// console.log('分组列表',res.data,this.activeIndex==0?'':this.checkTeam.id)
				})
			},
			checkTeamPatient(item,index){
				this.checkTeam=item
				this.activeIndex=index
				this.getTeamGroup()
			},
			// 去新建分组页
			toAddGroup(){
				let url='./addGroup'
				if(this.activeIndex!=0){
					url='./addGroup?teamId='+this.checkTeam.id
				}
				uni.navigateTo({
					url:url
				})
			},
			// 去搜索页
			toSearch(){
				uni.navigateTo({
					url:'../searchPatient'
				})
			},
			toAddFollowUp(){
				// console.log('去选择用户')
				if(this.activeIndex!=0){
					uni.navigateTo({
						url:'./noGroupPatientList?teamId='+this.checkTeam.id+'&type=followUp'
					})
				}else{
					uni.navigateTo({
						url:'./noGroupPatientList?type=followUp'
					})
				}

			},
			deleteGroup(item){
				console.log(item)
				let that=this
				if(item.id!=-1){
					let title="是否删除'"+item.name+"'分组？"
					uni.showModal({
						title: title,
						success: (res) => {
							if (res.confirm) {
								that.api.userGroupDeleteById({
									id:item.id
								}).then(resp=>{
									if(resp.code==0){
										uni.showToast({
											title:'删除成功',
											icon:'none'
										})
										that.getTeamGroup()
									}
								})
							}
							if(res.cancel){
								
							}
						}
						
					})
				}
			},
			toPatientList(item){
				let url='../patientList?userGroupId='+item.id+'&title='+item.name
				if(this.activeIndex!=0){
					url=url+'&teamId='+this.checkTeam.id
				}
				uni.navigateTo({
					url:url
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #F8F8F8;
	}
	.container{
		display: flex;
		flex-direction: column;
	}
	.navContainer{
		background-color: #fff;
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10rpx 0rpx 0 10rpx;
		overflow-x: scroll;
		.navItem{
			box-sizing: border-box;
			display: flex;
			align-items: center;
			height: 70rpx;
			padding-bottom: 10rpx;
			margin-right: 50rpx;
			font-size: 13px;
			color: #888888;
			display: flex;
			justify-content: center;
			white-space:nowrap;
			border-bottom: #fff 4px solid;
		}
		.activeItem{
			box-sizing: border-box;
			font-size: 14px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			border-bottom: #007AFF 4px solid;
		}
	}

	.centerContainer{
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
		background-color: #F3F3F3;
		padding: 20rpx 0;
		.createContianer{
			display: flex;
			flex-direction: row;
			align-items: center;
			background: #7eb8ff;
			margin: 0 15rpx 0 30rpx;
			padding: 16rpx 20rpx;
			border-radius: 50rpx;
			color: #fff;
			font-size: 15px;
			.addIcon{
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}
		.searchContainer{
			display: flex;
			flex-direction: row;
			align-items: center;
			flex: 1;
			background-color: #fff;
			border-radius: 12rpx;
			margin-right: 30rpx;
			padding: 0 20rpx;
			.searchIcon{
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}
	}
	.patientContainer{
		display: flex;
		flex-direction: column;
		background-color: #fff;
		margin-top: 20rpx;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		.lengthContainer{
			// border: 100rpx 100rpx 0rpx 0rpx;
			padding: 10rpx 30rpx;

		}
		.teamContainer{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 20rpx 30rpx;
			border-top: 1px solid #f8f8f8;
			.teatLeftContainer{
				display: flex;
				flex: 1;
				flex-direction: row;
				align-items: center;
				color: #808080;
				.groupIcon{
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
				}
			}
			.countContainer{
				display: flex;
				background-color: #F8F8F8;
				padding: 6px 20rpx;
				border-radius: 30rpx;
				color: #8b8b8b;
				font-size: 13px;
				.selectIcon{
					width: 36rpx;
					height: 36rpx;
				}
			}
		}
	}
	.footerOption{
		height: 100rpx;
		box-sizing: border-box;
		width:100%;
		padding: 20rpx;
		background-color: #F3F3F3;
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		color:#007AFF;
		.itemOption{
			display: flex;
			align-items: center;
			height: fit-content;
			padding:0 20rpx;
			font-size: 18px;
			font-weight: bold;
			// border-right: 1px solid #007AFF;
		}
	}

</style>
