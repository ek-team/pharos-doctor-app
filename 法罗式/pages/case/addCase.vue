<template>
	<view class="addCase">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="sublimt">
				保存
			</view>
		</hx-navbar>
		<view class="caseInfo">
			<view class="caseInfos flexAB" >
				<view class="flexA">
					<image src="/static/images/icon_mes@2x.png" mode="" class="caseInfosIcon"></image>
					病历名称
				</view>
				<view class="flexA">
					 <input type="text" v-model="form.title" placeholder="请填写病历名称" style="width:300rpx;font-size:28rpx;color:#222;text-align: right;">
				</view>
			</view>
			<view class="caseInfos flexAB" >
				<view class="flexA">
					<image src="/static/images/icon_mes@2x.png" mode="" class="caseInfosIcon"></image>
					病历诊断
				</view>
				<view class="flexA">
					<input type="text" v-model="form.content" placeholder="请填写病历诊断"  style="width:300rpx;font-size:28rpx;color:#222;text-align: right;">
				</view>
			</view>
			<view class="caseInfos flexAB" @click="jumpPatient">
				<view class="flexA">
					<image src="/static/images/icon_mes@2x.png" mode="" class="caseInfosIcon"></image>
					基础信息
				</view>
				<view class="flexA">
					 
					 <text :style="patientType?'':'color:#378EFF;'">{{patientType?'已完善':'待完善'}}</text>
					<image src="/static/images/icon_poi@2x(1).png" mode="" class="caseInfosIcons"></image>
				</view>
			</view>
			<view class="caseInfos flexAB" @click="Inquiries">
				<view class="flexA">
					<image src="/static/images/icon_ask@3x.png" mode="" class="caseInfosIcon"></image>
					问诊单
				</view>
				<view class="flexA">
					 <text :style="wzdType?'':'color:#378EFF;'">{{wzdType?'已完善':'待完善'}}</text>
					<image src="/static/images/icon_poi@2x(1).png" mode="" class="caseInfosIcons"></image>
				</view>
			</view>
			<view class="caseInfos flexAB">
				<view class="flexA">
					<image src="/static/images/icon_pla@3x.png" mode="" class="caseInfosIcon"></image>
					关联随访计划
				</view>
				<view class="flexA">
					<picker @change="bindPickerChange" range-key="name" :value="formIndex" :range="folowList">
						<view class="flexA">
							<view class="" style="width:400rpx;text-align: right;">
								{{folowList[formIndex]?folowList[formIndex].name:'无'}}
							</view>
							<image src="/static/images/icon_poi@2x(1).png" mode="" class="caseInfosIcons"></image>
						</view>
					</picker>
					
					
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
					title: '添加病例',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:true,
				},
				formIndex:-1,
				folowList:[],
				id:0,//患者的id
				form:{
					title:'',//标题
					content:'',//详细内容
					weight:'',
					height:'',
					sex:0,
					name:'',
					birthDay:'',
					
					Inquiries:[]
				},
				followUpPlanIds:[],
				patientType:false,
				wzdType:false,
			};
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			this.followUpPlanPage()
		},
		onShow() {
			let that = this
			uni.$on('updataUser',function(data){
				console.log(data)
				if(data.type =='patient'){
					that.form = {...that.form,...data.data}
					console.log(that.form)
					that.patientType = true
				}else if(data.type =='Inquiries'){
					that.form.Inquiries = [data.data]
					that.wzdType = true
				}
				
			})
			
		},
		methods:{
			jumpPatient(){
				console.log(this.form)
				this.patientType =false,
				uni.navigateTo({
					url:`./patientInfo?data=${JSON.stringify(this.form)}`
				})
			},
			Inquiries(){
				this.wzdType = false
				uni.navigateTo({
					url:`./Inquiries?data=${JSON.stringify(this.form.Inquiries[0])}`
				})
			},
			bindPickerChange(e){
				this.formIndex = e.detail.value
				this.followUpPlanIds= [this.folowList[e.detail.value].id]
			},
			followUpPlanPage(){
				let data = {
					pageSize:1000,
					pageNum:1,
				}
				this.api.followUpPlanPage(data).then(res=>{
					console.log(res)
					if(res.code == 0&&res.data.records.length>0){
						this.folowList = this.folowList.concat(res.data.records);
					}
				})
			},
			sublimt(){
				let data = {
					patientId:this.id,
					followUpPlanIds : this.followUpPlanIds,
					inquirys:this.form.Inquiries,
					title:this.form.title,//详细内容
					content:this.form.content,//详细内容
					weight:this.form.weight,//详细内容
					height:this.form.height,//详细内容
					sex:this.form.sex,//详细内容
					name:this.form.name,//详细内容
					birthDay:this.form.birthDay//详细内容
				}
				if(this.form.title==''){
					uni.showToast({
						title:'请填写病历名称',
						icon:'none'
					})
					return
				}else if(this.form.content==''){
					uni.showToast({
						title:'请填写病历诊断',
						icon:'none'
					})
					return
				}else if(!this.patientType){
					uni.showToast({
						title:'请填写完整基础信息',
						icon:'none'
					})
					return
				}else if(!this.wzdType){
					uni.showToast({
						title:'请填写完整问诊单',
						icon:'none'
					})
					return
				}else if(this.followUpPlanIds.length == 0){
					uni.showToast({
						title:'请选择关联随访计划',
						icon:'none'
					})
					return
				}
				
				console.log(data)
				
				this.api.electronicCaseSave(data).then(res=>{
					if(res.code ==0){
						uni.showToast({
							title:'添加成功',
						})
						this.form={
							title:'',//标题
							content:'',//详细内容
							weight:'',
							height:'',
							sex:0,
							name:'',
							birthDay:'',
							Inquiries:[]
						}
						this.patientType =false,
						this.wzdType=false
						this.formIndex = -1
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.addCase{
	min-height: 100vh;
	background: #f2f2f2;
	.slotRight{
		width: 80rpx;
		height: 40rpx;
		margin-right: 20rpx;
		color: #fff;
		font-size: 30rpx;
	}
	.caseInfo{
		
		background: #fff;
		
		.caseInfos{
			padding: 48rpx 22rpx ;
			border-bottom: 1px solid #ECECEC;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #444444;
			.caseInfosIcon{
				width: 40rpx;
				height: 40rpx;
				display: flex;
				margin-right: 20rpx;
			}
			.caseInfosIcons{
				width: 30rpx;
				height: 30rpx;
				display: flex;
				margin-left: 20rpx;
			}
		}
	}
}
</style>
