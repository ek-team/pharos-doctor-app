<template>
	<view class="team">
		
		<view class="teamList" v-for="(item,index) in teamList" :key="index" @click="toEditTeam(item)">
			<view class="outContainer content">
				<view>团队名称:  <text>{{item.name}}</text></view>
				<view class="editButton">
					设置
				</view>
			</view>
			<view class="content">
				所属医院:  <text>{{item.hospitalName}}</text>
			</view>
			<view class="content">
				团队介绍: <text>{{item.teamDesc}}</text>
			</view>
			<view class="content">
				创建时间: <text>{{item.createTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teamList:[{name:'1',hospitalName:'1',teamDesc:'1',createTime:'1'}],
				serviceInfo:null,
			};
		},
		onLoad(options) {
			this.doctorTeamQueryMyTeam()
			
			if(options.item){
				this.serviceInfo=options.item
				console.log('团队服务参数',this.serviceInfo)
			}
		},
		methods:{
			doctorTeamQueryMyTeam(){
				this.api.doctorTeamQueryMyTeam().then(res=>{
					console.log(res.data)
					if(res.code ==0){
						this.teamList = res.data
					}
				})
			},
			toEditTeam(item){
				uni.navigateTo({
					url:`../serve/setUpInfo?teamId=${item.id}&item=${JSON.stringify(item)}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.team{
	min-height: calc(100vh - 40rpx);
	background: #f2f2f2;
	padding: 20rpx 0;
	.outContainer{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.editButton{
			background-color: rgb(55, 142, 255);
			color: #fff;
			padding: 4rpx 8rpx;
			// rgb(55, 142, 255);
		}
	}
	
	.teamList{
		width: 650rpx;
		padding: 22rpx;
		background: #fff;
		margin: 0 auto;
		border-radius: 10rpx;
		margin: 20rpx auto;
		font-size: 28rpx;
		color: #989898;
		.content{
			margin: 20rpx 0;
			text{
				color:#222;
				margin-left: 20rpx;
			}
		}
		view{
			// margin: 20rpx 0;
			// text{
			// 	color:#222;
			// 	margin-left: 20rpx;
			// }
		}
	}
}
</style>
