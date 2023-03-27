<template>
	<view class="container">
		<hx-navbar ref="hxnb" :config="config">
			
		</hx-navbar>
		<view class="titleContainer">分组名称<span style="color: red;">*</span></view>
		<view class="titleContainer">
			<input placeholder="请输入分组名称" class="inputContent" v-model="groupName"/>
		</view>
		<view class="titleContainer groupTop">分组成员</view>
		<view class="titleContainer addGroupOption"  @click="toCheckPatient">
			<image src="/static/images/add_user.png" class="addUserIcon"></image>
			添加成员
		</view>
		<view class="userContainer">
			<view class="userListContainer" v-for="(item,index) in checkPatientList">
				<view class="userContainerLeft">
					<view class="headerContainer">
						{{item.patientName?item.patientName.charAt(0):''}}
					</view>
					<text>{{item.patientName}}</text>
				</view>
				
				
				<image class="deletdIcon" src="/static/images/icon_del@2x.png" @click="deleteUser(item,index)"></image>
				
			</view>
		</view>
		<view class="addContainer" @click="submit">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{//自定义头部配置信息
					title: '新建分组',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:false,
				},
				groupName:null,
				checkPatientList:[],
				checkIdList:[],
				teamId:null,
				groupId:null,
				type:null,
			}
		},
		onLoad(options){
			this.type=options.type
			this.groupId=options.groupId
			if(options.type=='edit'){
				this.config.title='修改分组'
			}
			this.teamId=options.teamId
			// 获取我所在团队的列表
			this.getGroupDetail()
		},
		methods: {
			getGroupDetail(){
				// this.checkIdList=[]
				this.api.getUserGroupDetail({
					id:this.groupId
				}).then(res=>{
					if(res.data){
						this.groupName=res.data.name
						if(res.data.users){
							this.checkPatientList=res.data.users
							res.data.users.map(item=>{
								this.checkIdList.push(item.id)
							})
						}
						
					}
				})
			},
			detailIdList(){
				this.checkIdList=[]
				this.checkPatientList.map(item=>{
					this.checkIdList.push(item.id)
				})
			},
			submit(){
				if(!this.groupName){
					uni.showToast({
						title:'请输入分组名称',
						icon:'none'
					})
					return
				}else if(this.checkIdList.length<=0&&this.type!='edit'){
					uni.showToast({
						title:'请添加成员！',
						icon:'none'
					})
					return
				}
				
				this.detailIdList()
				if(this.type=='edit'){
					// return
					this.api.updateUserGroup({
						id:this.groupId,
						name:this.groupName,
						userIds:this.checkIdList,
					}).then(res=>{
						if(res.code==0){
							uni.showToast({
								title:'修改成功！',
								icon:'none'
							})
							setTimeout(()=>{
								uni.setStorageSync('fresh',true)
								uni.setStorageSync('groupName',this.groupName)
								// uni.navigateBack()
								uni.navigateBack({
									delta: 1
								})
							},500)
						}
						
						
					})
				}else{
					// console.log('新增')
					// return
					this.api.addUserGroup({
						name:this.groupName,
						teamId:!this.teamId||this.teamId=='undefined'?'':this.teamId,
						userIds:this.checkIdList,
					}).then(res=>{
						if(res.code==0){
							uni.showToast({
								title:'添加成功！',
								icon:'none'
							})
							setTimeout(()=>{
								uni.setStorageSync('fresh',true)
								uni.navigateBack()
							},500)
						}
						
					})
				}
				
				// console.log(this.groupName,this.checkPatientList,this.checkIdList)
				//this.api.addUserGroup  添加患者分组name teamId//如果在团队下新建分组传这个参数 不是就不传
				//  修改患者分组 参数 id name
				//添加患者到分组 添加患者到分组 userIds用户id数组 userGroupId//分组id
			},
			deleteUser(item,index){
				this.checkPatientList.splice(index,1)
				this.checkIdList.splice(index,1)
			},
			// 选择分组成员
			toCheckPatient(){
				console.log('添加成员',this.teamId)
				uni.setStorageSync('checkPatientList',this.checkPatientList)
				uni.navigateTo({
					url:'./noGroupPatientList?teamId='+this.teamId
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
	.titleContainer{
		// color:#888;
		padding: 20rpx;
		border-bottom: 1px solid #eeeeee;
		background-color: #fff;
	}
	.inputContent{
		// color:#000000;
		padding: 0 20rpx;
		color:#666;
	}
	.groupTop{
		margin-top: 20rpx;
	}
	.addGroupOption{
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #F8F8F8;
		border: none;
		.addUserIcon{
			width: 60rpx;
			height: 60rpx;
			margin-right: 30rpx;
		}
	}
	.userContainer{
		display: flex;
		flex-direction: column;
		background-color: #fff;
		.userListContainer{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-top:1px solid #f8f8f8;
			padding: 20rpx;
		}
		.deletdIcon{
			width: 60rpx;
			height: 60rpx;
		}
		.userContainerLeft{
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
	}
	.addContainer{
		width: 100%;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #1785FF;
		padding:20rpx 0;
		font-size: 20px;
		color: #fff;
	}
</style>
