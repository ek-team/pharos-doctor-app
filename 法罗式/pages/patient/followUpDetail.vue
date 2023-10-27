<template>
	<view class="followUpDetail">
		<hx-navbar ref="hxnb" :config="config">
			<!-- <view class="" slot="right" class="slotRight flexA" v-if="id==0" > -->
			<view class="" slot="right" class="slotRight flexA" >
				<!-- <image src="/static/images/icon_me@2x.png" mode="" class="slotRighticon"></image> -->
				<view class="" @click="asublimtFolow">
					提交
				</view>
			</view>z
		</hx-navbar>
		<view class="flexAB follow" @click="editFollow('editName')">
			<view class="name flexA">
				<image src="/static/images/icon_pla@2x1.png" mode="" class="nameImg"></image>
				计划名称:
			</view>
			<view class="flexA names">
				{{from.name}}
				<image src="/static/images/icon_poi@2x(1).png" mode="" class="namesIcon"></image>
			</view>
		</view>
		<view class="follows" @click="editFollow('editPatient')">
			<view class="flexAB followa">
				<view class="name flexA">
					<image src="/static/images/icon_pat@2x2.png" mode="" class="nameImg"></image>
					计划患者
				</view>
				<view class="flexA names">
					<image src="/static/images/icon_poi@2x(1).png" mode="" class="namesIcon"></image>
				</view>
			</view>
			<view class="joinModel">
				加入模式:
				<text>{{from.joinType==1?'自动加入':'手动管理'}}</text>
			</view>
			<view class="people flexAB" v-if="from.followUpPlanPatientUsers.length>0">
				<view class="peopleList flexA">
					<view class="peopleInfo" v-for="item in from.followUpPlanPatientUsers.slice(0,5)">
						<image :src="item.avatar?item.avatar:'/static/images/user_default_icon.png'" mode="" class="peopleImg"></image>
						<view class="peopleName">
							{{item.nickname}}
						</view>
					</view>
				</view>
				<view class="poeNum">
					更多
					{{from.followUpPlanPatientUsers.length}}人
				</view>
			</view>
		</view>
		<!-- <view class="times flexAB" @click="editFollow('editPullTime')">
			首次推入时间
			 <view class="flexA" style="color: #222222;">
			 	{{from.pushType==1?'患者加入时':'固定时间推送' + from.time}}
				<image src="/static/images/icon_poi@2x(1).png" mode="" class="namesIcon"></image>
			 </view>

		</view> -->
		<!-- <view class="times flexAB" @click="editFollow('editPullTimes')">
			后续推送时间
			 <view class="flexA" style="color: #222222;">
			 	患者加入时
				<image src="/static/images/icon_poi@2x(1).png" mode="" class="namesIcon"></image>
			 </view>

		</view> -->
		<view class="follows" @click="editFollow('editCase')">
			<view class="flexAB followa">
				<view class="name flexA">
					<image src="/static/images/icon_pla@2x3.png" mode="" class="nameImg"></image>
					计划
				</view>
				<!-- <view class="flexA names" v-if="id==0"> -->
					<view class="flexA names" >
					<image src="/static/images/icon_edi@2x.png" mode="" class="namesIcon" style="width:40rpx;height:40rpx;"></image>
				</view>
			</view>
			<view class="" style="margin-top: 30rpx;">
				<view class="plant flexB" v-for="(item,index) in from.followUpPlanContentList" :key="index">
					<view class="">
						{{item.day}}
					</view>
					<view class="plantJJ">
						<view class="raios">

						</view>
						<view class="grayLine">

						</view>
					</view>
					<view class="plantInfo">
						<view class="">
							<text>提醒:</text>{{item.notice}}
						</view>
						<view class="" v-if="item.formTitle">
							<text>《{{item.formTitle}}》</text>
						</view>

					</view>

				</view>

			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{//自定义头部配置信息
					title: '随访计划',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#5AA1FF','#5AA1FF']],
					rightSlot:true,
				},
				id:0,//0添加 其他编辑
				from:{
					name:'',
					joinType:1,//1自动加入2手动管理
					pushType:1,//推送时间1首次加入推送，2固定时间推送
					time:'',
					pushHour:'',
					pushMinute:'',
					patientUserCount:0,//患者数量
					followUpPlanPatientUsers:[],//随访患者的id
					followUpPlanContentList:[],//随访患者的计划
				},
				type:null,
			};
		},
		onLoad(option) {
			this.id = option.id?option.id:0
			// this.id = 0
			this.type=option.type
			if(this.type=='pateintList'){
				this.from.followUpPlanPatientUsers=uni.getStorageSync('followUpPlanPatientUserList')
			}
			if(option.id>0){
				this.followUpPlanGetDetailById()
			}
		},
		onShow() {
			let that = this
			uni.$on('updateData',function(data){
				// that.testdata = data
				that.from = data
			})
		},
		methods:{
			followUpPlanGetDetailById(){
				let data = {
					id:this.id
				}
				this.api.followUpPlanGetDetailById(data).then(res=>{
					console.log(res)
					if(res.code==0){
						console.log(res.data)
						this.from = {...this.from,...res.data}
						this.from.followUpPlanPatientUsers = []
						res.data.followUpPlanPatientUserList.map(item=>{
							this.from.followUpPlanPatientUsers.push({
								nickname:item.user.nickname,
								avatar:item.user.avatar,
								id:item.user.id,
							})
						})
						this.from.time = res.data.pushHour + ':' + res.data.pushMinute
						// console.log('推送时间',this.from.time)
						res.data.followUpPlanContentList.map(item=>{
							item.formTitle = item.form.title
						})
						console.log(this.from.followUpPlanPatientUsers)
					}
				})
			},
			editFollow(type){
				// console.log('去添加计划患者',this.from.followUpPlanPatientUsers)
				// return
				// if(type=='editCase'&&this.id!=0){
				// 	return
				// }
				uni.navigateTo({
					url:`./editFollowUp?type=${type}&data=${JSON.stringify(this.from)}&id=${this.id}`
				})
			},
			asublimtFolow(){//保存信息


				let data  = this.from

				let that = this

				if(data.name==''){
					uni.showToast({
						title:'请输入计划名称',
						icon:"none"
					})
					return
				}
				if(this.from.followUpPlanPatientUsers.length ==0){
					uni.showToast({
						title:'请选择计划患者',
						icon:"none"
					})
					return
				}
				if(data.pushType==2){
					if(data.time==''){
						uni.showToast({
							title:'请选择固定推送时间',
							icon:"none"
						})
						return
					}else{
						data.pushHour = data.time.split(':')[0]
						data.pushMinute = data.time.split(':')[1]
					}

				}
				if(this.from.followUpPlanContentList.length ==0){
					uni.showToast({
						title:'请添加计划列表',
						icon:"none"
					})
					return
				}

				let arr = []
				this.from.followUpPlanPatientUsers.map(item=>arr.push(item.id))
				data.followUpPlanPatientUsers = arr
				data.patientUserCount = this.from.followUpPlanPatientUsers.length
				// console.log('随访计划提交的参数',data)
				if(this.id==0){
					this.api.followUpPlanSave(data).then(res=>{
						console.log(res)
						if(res.code==0){
							that.from = {
								name:'',
								joinType:1,//1自动加入2手动管理
								pushType:1,//推送时间1首次加入推送，2固定时间推送
								// time:'',
								pushHour:'',
								pushMinute:'',
								patientUserCount:0,//患者数量
								followUpPlanPatientUsers:[],//随访患者的id
								followUpPlanContentList:[],//随访患者的计划
							}
							uni.showToast({
								title:'添加成功！'
							})
							if(this.type=='pateintList'){
								uni.removeStorageSync('checkIdList')
								// console.log(res,'清除缓存')

								uni.redirectTo({
									url:'./followUp',
								})

							}


						}
					})
				}else{
					console.log('修改随访计划',data)
					data.id = this.id
					this.api.followUpPlanUpdateById(data).then(res=>{
						console.log('修改',res)
						if(res.code==0){
							console.log(res.data)
							uni.showToast({
								title:'保存成功！'
							})
							uni.navigateBack({
							    delta: 1
							});
							// this.followUpPlanGetDetailById()
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.followUpDetail{
	min-height: 100vh;
	background: linear-gradient(180deg, #4797FF 0%, #FFFFFF 100%);
	.slotRight{

		display: flex;
		margin-right: 30rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.follow{
		width: 642rpx;
		background: rgba(255,255,255,1);
		padding:32rpx ;
		border-radius: 20rpx;
		margin: 22rpx auto;
		.name{
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #444444;
			.nameImg{
				width: 56rpx;
				height: 56rpx;
				display: flex;
				margin-right: 28rpx;
			}
		}
		.names{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			max-width: 60%;
			color: #222222;
			.namesIcon{
				width: 30rpx;
				height: 30rpx;
				display: flex;
				margin-left: 10rpx;
			}
		}

	}
	.follows{
		padding:32rpx;
		border-radius: 20rpx;
		margin: 22rpx auto;
		width: 642rpx;
		background: #fff;
		.followa{
			.name{
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #444444;
				.nameImg{
					width: 56rpx;
					height: 56rpx;
					display: flex;
					margin-right: 28rpx;
				}
			}
			.names{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				max-width: 60%;
				color: #222222;
				.namesIcon{
					width: 30rpx;
					height: 30rpx;
					display: flex;
					margin-left: 10rpx;
				}
			}

		}
	}
	.joinModel{
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		margin: 32rpx 0;
		text{
			color: #222222;
		}
	}
	.people{
		.poeNum{
			width: 52rpx;
			height: 68rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
		}
		.peopleList{
			margin-right: 38rpx;
			flex: 1;
			.peopleInfo{
				margin-right: 20rpx;
				.peopleImg{
					width: 72rpx;
					height: 72rpx;
					// background: red;
					border-radius: 50%;
				}
				.peopleName{
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					margin-top: 20rpx;
					color: #666666;
					text-align: center;
				}
			}
		}
	}
	.times{
		width: 642rpx;
		background: rgba(255,255,255,1);
		padding:32rpx ;
		border-radius: 20rpx;
		margin: 22rpx auto;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		.namesIcon{
			width: 30rpx;
			height: 30rpx;
			display: flex;
			margin-left:20rpx;
		}
	}
	.plant{
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #444444;
		height: auto;
		.plantJJ{
			width:12rpx;
			height: auto;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-direction: column;
			.raios{
				width:12rpx;
				height: 12rpx;
				border-radius: 50%;
				border: 1px solid #BEBEBE;
			}
			.grayLine{
				height: 100%;
				border-left: 1px dashed #efefef;
			}
		}
		.plantInfo{
			width: 500rpx;
			padding: 22rpx;
			background: rgba(242,242,242,1);
			border-radius: 10rpx;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
			margin-bottom:28rpx ;
			margin-left: 30rpx;
			text{
				color: #43C8EB;
			}
		}
	}

}
</style>
