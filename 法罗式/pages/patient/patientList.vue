<template>
	<view class="patientList">
		<hx-navbar ref="hxnb" :config="config">
			<!-- <view class="" slot="right" class="slotRight flexA" @click="addPatient">
				<image src="/static/images/icon_add@2x2.png" mode="" class="slotRighticon"></image>
			</view> -->
			<!-- <view class="" v-if="userGroupId!=-1" slot="right" class="slotRight flexA" >
				<view class="" @click="deleteGroup">
					删除分组
				</view>
			</view> -->
		</hx-navbar>
		<view class="centerContainer" >
			<!-- 新建分组 -->
			<view class="createContianer" v-if="userGroupId!=-1" @click="toEditGroup">
				<image src='/static/images/edit_icon.png' class="addIcon"></image>
				修改分组
			</view>
			<view class="checkButtom" v-if="showConfirm" @click="checkAll">
				{{isCheckAll?'取消':'全选'}}
			</view>
			<!-- <view class="cancelButtom">取消</view> -->
			<!-- 搜索 -->
			<!-- <view class="searchContainer">
				搜索
			</view> -->
		</view>
		<view>
			<checkbox-group @change="checkboxChange">
				<label class="list-cell flexA" v-for="(cell, index) in itemArr" >
					<view class="checkboxButtom" v-if="showConfirm">
						<checkbox :value="cell" :checked="cell.checked" />
					</view>
					<image :src="cell.avatar" mode="" class="userImg" @click="jumpDetail(cell)"></image>
					<view class="flexA infoContainer" style="" @click="jumpDetail(cell)">
						<view class="name">
							{{cell.patientName}}
						</view>
						<!-- <view class="sex flexA">
							<image :src="item.sex==1?'/static/images/icon_boy@2x.png':'/static/images/icon_gir@2x.png'" mode="" class="sexicon"></image>
							30
						</view> -->
					</view>
					<view class="chatContainer" @click.stop="toChat(cell)">
						<image class="chatIcon" src='/static/images/chat_icon.png' ></image>
					</view>
				</label>
			</checkbox-group>
		</view>
		
		<!-- <view class="list-cell flexA" v-for="(cell, index) in itemArr" @click="jumpDetail(cell)">
			<image :src="cell.avatar" mode="" class="userImg"></image>
			<view class="flexA infoContainer" style="">
				<view class="name">
					{{cell.patientName}}
				</view>
			</view>
			<view class="chatContainer" @click.stop="toChat(cell)">
				<image class="chatIcon" src='/static/images/chat_icon.png' ></image>
			</view>
		</view> -->
		<view class="footerOption">
			<view class="itemOption" @click="checkUser">随访</view>
			<view class="itemOption confirmItem" v-if="showConfirm" @click="toAddFollowUp">确定</view>
		</view>
		<!-- <u-index-list :index-list="indexList">
			<template v-for="(item, index) in list">
				#ifdef APP-NVUE 
				<u-index-anchor :text="indexList[index]"></u-index-anchor>
				 #endif 
				<u-index-item>
					 #ifndef APP-NVUE 
					<u-index-anchor :text="indexList[index]"></u-index-anchor>
					 #endif 
					<view class="list-cell flexA" v-for="(cell, index) in item" @click="jumpDetail(cell)">
						<image :src="cell.avatar" mode="" class="userImg"></image>
						<view class="flexA" style="border-bottom: 1px solid #ECECEC;width:90%;padding:38rpx 0;margin-left:20rpx;">
							<view class="name">
								{{cell.nickname}}
							</view>
							<view class="sex flexA">
								<image :src="item.sex==1?'/static/images/icon_boy@2x.png':'/static/images/icon_gir@2x.png'" mode="" class="sexicon"></image>
								30
							</view>
						</view>
					</view>
				</u-index-item>
			</template>
		</u-index-list> -->
	</view>
</template>

<script>
	export default {
		name:'patientList',
		data() {
			return {
				indexList: [],
				itemArr: [],
				list:[],
				config:{//自定义头部配置信息
					title: '患者列表',
					color: '#222',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#fff','#fff']],
					rightSlot:true,
				},
				teamId:null,
				userGroupId:null,
				showConfirm:false,
				isCheckAll:false,
				checkUserList:[],
			};
		},
		onLoad(options) {
			// if(options.title){
			// 	this.config.title=options.title
			// }
			this.teamId=options.teamId
			this.userGroupId=options.userGroupId
			this.getList()
		},
		onBackPress() {
			uni.removeStorageSync('followUpPlanPatientUserList')
			console.log('销毁缓存')
		},
		onShow() {
			// if(uni.getStorageSync('groupName')){
			// 	this.config.title=uni.getStorageSync('groupName')
			// 	uni.removeStorageSync('groupName')
			// }
			if(uni.getStorageSync('fresh')){
				this.getList()
				uni.removeStorageSync('fresh')
			}
				
		},
		methods:{
			// 选择随访用户
			checkboxChange(e){
				this.checkUserList=e.target.value
				// console.log('选择',e)
			},
			jumpDetail(item){
				console.log('团队Id',this.teamId)
				uni.navigateTo({
					url:`./patientDetail?id=${item.id}&teamId=${this.teamId}`
				})
				
			},
			toChat(item){
				// let chatType=this.teamId?1:0 //0单聊1群聊
				uni.navigateTo({
					url:'../chat/chat?targetUid='+item.id+'&name='+item.patientName+'&chatType=0'+'&teamId='+this.teamId+'&patientId='+item.patientId//0单聊1群聊
				})
			},
			// 选择用户
			checkUser(){
				this.showConfirm=!this.showConfirm
			},
			// 选择所有用户
			checkAll(){
				this.isCheckAll=!this.isCheckAll
				this.itemArr.forEach(item=>{
					if(this.isCheckAll){
						item.checked=true
					}else{
						item.checked=false
					}
				})
				if(this.isCheckAll){
					this.checkUserList=this.itemArr
				}else{
					this.checkUserList=[]
				}
				
			},
			toAddFollowUp(){
				// console.log('选择的随访用户',this.checkUserList)
				let list=[]
				this.checkUserList.map(item=>{
					list.push({
						nickname:item.patientName,
						avatar:item.avatar,
						id:item.id,
					})
				})
				uni.setStorageSync('followUpPlanPatientUserList',list)
				uni.navigateTo({
					url:'./followUpDetail?type=pateintList&id=0',
				})
			},
			addPatient(){
				uni.navigateTo({
					url:'./addPatient'
				})
			},
			// 删除分组
			deleteGroup(){
				let that=this
				uni.showModal({
					title:'确定删除改分组?',
					// content: '本次更新内容：\n1、运费、发送订单\n2、退出app后收到消息在通知栏显示\n3、转诊选择医生加上医助选择',
					success: (res) => {
						// console.log(type=='refuse'?2:1)
						if (res.confirm) {
							that.api.userGroupDeleteById({
								id:that.userGroupId
							}).then(resp=>{
								if(resp.code==0){
									uni.showToast({
										title:'删除成功',
										icon:'none'
									})
								}
								console.log('删除接口',resp)
								setTimeout(()=>{
									uni.navigateBack()
								},500)
							})
						}
						if(res.cancel){
							console.log('取消')
						}
					}
				})
			},
			// 修改分组
			toEditGroup(){
				
				uni.navigateTo({
					url:'./patientGroupList/addGroup?type=edit'+'&teamId='+this.teamId+'&groupId='+this.userGroupId
				})
			},
			getList(){
				let data  = {
					pageNum:1,
					pageSize:1000,
					userGroupId:this.userGroupId
				}
				if(this.teamId){
					data.teamId=this.teamId
				}
				this.api.getUserGroup(data).then(res=>{
					console.log('患者列表',data,res.data.records)
					if(res.code ==0){
						res.data.records.map(item=>{
							item.checked=false
						})
						// this.indexList = Object.keys(res.data.records)
						this.itemArr = Object.values(res.data.records)
						consle.log()
						
					}
				})
			},
			userGroupPageQueryPatientUserSort(){
				let data  = {
					pageNum:1,
					pageSize:1000,
				}
				this.api.userGroupPageQueryPatientUserSort(data).then(res=>{
					// console.log(res)
					if(res.code ==0){
						this.indexList = Object.keys(res.data.records)
						this.itemArr = Object.values(res.data.records)
						consle.log()
						
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.patientList{
	.slotRight{
		margin-right: 30rpx;
		.slotRighticon{
			width: 35rpx;
			height: 35rpx;
			color: red;
		}
	}
	.list-cell{
		padding: 0 22rpx;
		.userImg{
			width: 72rpx;
			height: 72rpx;
			display: flex;
			border-radius: 10rpx;
			// background: red;
		}
		.name{
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222222;
			margin-right: 30rpx;
		}
		.sex{
			display: inline-flex;
			border-radius: 20rpx;
			background: #fff;
			padding: 0 20rpx;
			border: 1px solid #989898;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			height: 44rpx;
			line-height: 44rpx;
			color: #666666;
			.sexicon{
				width: 28rpx;
				height: 28rpx;
			}
		}
		
	}
}
.checkButtom{
	border: 1px solid #7eb8ff;
	color: #7eb8ff;
	padding: 6rpx 10rpx;
	border-radius: 10rpx;
	margin-left: 30rpx;
}
.cancelButtom{
	color: #7eb8ff;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 20rpx;

}
.centerContainer{
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
		.createContianer{
			display: flex;
			flex-direction: row;
			align-items: center;
			background: #7eb8ff;
			margin: 0 15rpx 0 30rpx;
			padding: 6rpx 10rpx;
			border-radius: 30rpx;
			color: #fff;
			font-size: 13px;
			.addIcon{
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
			
		}
		.searchContainer{
			display: flex;
			flex: 1;
			background-color: #fff;
			border-radius: 16rpx;
		}
	}
	.checkboxButtom{
		margin-right: 20rpx;
	}
	.infoContainer{
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #ECECEC;
		width:90%;
		padding:38rpx 0;
		margin-left:20rpx;
	}
	.chatContainer{
		display: flex;
		align-items: center;
		margin-right: 20rpx;
	}
	.chatIcon{
		width: 50rpx;
		height: 50rpx;
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
		justify-content: space-between;
		// justify-content: center;
		color:#007AFF;
		.itemOption{
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			height: fit-content;
			padding:0 20rpx;
			font-size: 18px;
			font-weight: bold;
			border-right: 1px solid #007AFF;
			box-sizing: border-box;
		}
		.confirmItem{
			border-right: none;
		}
	}
	
</style>
