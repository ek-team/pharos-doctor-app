<template>
	<view class="container">
		<view class="userContainer">
			<checkbox-group @change="checkboxChange">
				<label class="userListContainer" v-for="(item,index) in list" :key="item.id">
					<view class="infoLeft">
						<view class="headerContainer">{{item.patientName?item.patientName.charAt(0):''}}</view>
							{{item.patientName}}
					</view>
					<view>
							<checkbox :value="item.id" :checked="item.checked" />
					</view>
					
				</label>
			</checkbox-group>
		</view>
		<view class="confirmContainer" @click="confirmCheck">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				checkList:[],
				checkIdList:[],
				teamId:null,
				type:null,
			}
		},
		onLoad(options){
			this.teamId=options.teamId
			this.type=options.type
			this.getList()
			if(uni.getStorageSync('checkPatientList')){
				this.checkList=uni.getStorageSync('checkPatientList')
				this.checkList.map(item=>{
					this.checkIdList.push(item.id)
				})
			}
			
		},
		methods:{
			getList(){
				let teamId=this.teamId=='undefined'||!this.teamId?'':this.teamId
				this.api.getUserNoGroup({
					teamId:teamId
				}).then(res=>{
					if(res.data){
						res.data.forEach(item=>{
							this.checkList.map(items=>{
								if(items.id==item.id){
									item.checked=true
								}
								// else{
								// 	item.checked=false
								// }
							})
						})
						this.list=res.data
					}
					
					// console.log('未分组的患者列表',res,teamId)
				})
			},
			checkboxChange(e){
				this.checkIdList=e.target.value
				// console.log('多选',e.target.value)
			},
			confirmCheck(){
				if(this.checkIdList.length<=0){
					uni.showToast({
						title:'请选择成员！',
						icon:'none'
					})
					return
					
				}
				let checkList=[]
				this.list.map(items=>{
					this.checkIdList.map(item=>{
						if(items.id==item){
							console.log('选择的项',items)
							checkList.push(items)
						}
					})
				})
				if(this.type!='followUp'){
					let pages = getCurrentPages(); //获取所有页面栈实例列表
					let nowPage = pages[pages.length - 1]; //当前页页面实例
					let prevPage = pages[pages.length - 2]; //上一页页面实例
					let beforeList=uni.getStorageSync('checkPatientList')
					checkList=beforeList.concat(checkList)
					let beforeIdList=
					prevPage.$vm.checkPatientList =checkList; 
					prevPage.$vm.checkIdList =this.checkIdList
					// console.log('之前的列表',uni.getStorageSync('checkPatientList'),checkList,'选择的分组列表')
					// return
					uni.removeStorageSync('checkPatientList')
					uni.navigateBack({
						delta: 1
					})
					
				}else{
					let list=[]
					checkList.map(item=>{
						list.push({
							nickname:item.patientName,
							avatar:item.avatar,
							id:item.id,
						})
					})
					uni.setStorageSync('followUpPlanPatientUserList',list)
					uni.redirectTo({
						url:'../followUpDetail?type=pateintList&id=0',
					})
				}
				
				
			},
		},
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
			.infoLeft{
				display: flex;
				flex-direction: row;
				align-items: center;
			}
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
	.confirmContainer{
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
