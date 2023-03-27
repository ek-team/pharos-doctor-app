<template>
	<view class="baseContainer">
		<view class="topSearch">
			<view class="searchContainer" >
				<image class="searchIcon" src='/static/images/search_icon.png'></image>
				<input  v-model="searchValue" placeholder="搜索患者姓名、分组"/>
			</view>
			<view class="searchButton" @click="searchList">搜索</view>
		</view>
		<view class="patientContainer">
			<view class="userListContainer" v-for="(item,index) in userList" >
				<view class="infoLeft">
					<view class="leftContainer" @click="jumpDetail(item)">
						<view class="headerContainer">{{item.patientName?item.patientName.charAt(0):''}}</view>
							{{item.patientName}}
						</view>
					<view>
						<image class="chatIcon" src='/static/images/chat_icon.png' @click="toChat(item)" ></image>
					</view>
				</view>
			</view>
			<view class="userListContainer" v-for="(item,index) in userGroupList" @click="toPatientList(item)">
				<view class="teamContainer">
					<view class="teatLeftContainer">
						<image src="/static/images/notGroup.png" class="groupIcon"></image>
						{{item.name}}
					</view>
					<view class="countContainer">
						共{{item.count}}人<image src='/static/images/select_right.png' class="selectIcon"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'patientList',
		data() {
			return {
				searchValue:null,
				userList:[],
				userGroupList:[],
			}
		},
		onLoad() {
		},
		methods:{
			searchList(){
				this.api.searchUserGroup({
					key:this.searchValue
				}).then(res=>{
					// console.log('搜索列表',res.data)
					if(res.data){
						this.userList=res.data.userList
						this.userGroupList=res.data.userGroupList
					}
				})
			},
			jumpDetail(item){
				uni.navigateTo({
					url:`./patientDetail?id=${item.id}`
				})
			},
			toChat(item){
				// let chatType=this.teamId?1:0 //0单聊1群聊
				uni.navigateTo({
					url:'../chat/chat?targetUid='+item.id+'&name='+item.patientName+'&chatType=0' //0单聊1群聊
				})
			},
			toPatientList(item){
				// console.log(this.checkTeam,)
				let url='./patientList?userGroupId='+item.id+'&title='+item.name
				if(item.teamId){
					url=url+'&teamId='+item.teamId
				}
				uni.navigateTo({
					url:url
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.baseContainer{
		display: flex;
		flex-direction: column;
	}
	.topSearch{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		// margin: 0 20rpx;
		background-color: #F3F3F3;
		padding: 10rpx 20rpx;
		.searchContainer{
			background-color: #fff;
			padding: 20rpx 20rpx;
			border-radius: 12rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			flex: 1;
			margin-right: 20rpx;
			.searchIcon{
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}
		.searchButton{
			background-color: #4aa1f1;
			color:#fff;
			border-radius: 10rpx;
			padding: 20rpx 20rpx;
		}
	}
	.patientContainer{
		display: flex;
		flex-direction: column;
	}
	.userListContainer{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-top:1px solid #f8f8f8;
		padding: 20rpx;
		.infoLeft{
			width: 100%;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.leftContainer{
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.headerContainer{
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #75b8ff;
				color: #fff;
				margin-right: 20rpx;
				font-size: 40rpx;
			}
			.chatIcon{
				width: 50rpx;
				height: 50rpx;
			}
		}
		.teamContainer{
			width: 100%;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 20rpx 0rpx;
			// border-top: 1px solid #f8f8f8;
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
</style>
