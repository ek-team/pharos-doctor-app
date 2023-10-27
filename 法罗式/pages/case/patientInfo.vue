<template>
	<view class="patientInfo">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="sublimt">
				保存
			</view>
		</hx-navbar>
		<view class="patientInfos">
			<view class="caseInfos flexAB">
				<view class="flexA">
					姓名
				</view>
				<view class="flexA">
					<input type="text" v-model="form.name" placeholder="请输入姓名" class="caseInfosa">
				</view>
			</view>
			<view class="caseInfos flexAB">
				<view class="flexA">
					性别
				</view>
				<view class="flexA">
					<picker @change="bindPickerChange" range-key="label" :value="formIndex" :range="ageLsit">
						<view class="flexA">
							<view class="" style="width:400rpx;text-align: right;">
								{{ageLsit[formIndex]?ageLsit[formIndex].label:'暂未选择'}}
							</view>
							<image src="/static/images/icon_poi@2x(1).png" mode="" class="caseInfosIcons"></image>
						</view>
					</picker>
				</view>
			</view>
			<view class="caseInfos flexAB">
				<view class="flexA">
					生日
				</view>
				<view class="flexA">
					<picker @change="bindPickerChange" mode="date" :value="form.birthDay" >
						<view class="flexA">
							<view class="" style="width:300rpx;text-align: right;">
								{{form.birthDay?form.birthDay:'请选择日期'}}
							</view>
							<image src="/static/images/icon_poi@2x(1).png" mode="" class="caseInfosIcons"></image>
						</view>
					</picker>
				</view>
			</view>
			<view class="caseInfos flexAB">
				<view class="flexA">
					体重
				</view>
				<view class="flexA">
					<input type="number" v-model="form.weight" placeholder="请输入体重" class="caseInfosa">kg
				</view>
			</view>
			<view class="caseInfos flexAB">
				<view class="flexA">
					身高
				</view>
				<view class="flexA">
					<input type="number" v-model="form.height" placeholder="请输入身高" class="caseInfosa">cm
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
					title: '基础信息',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:true,
				},
				form:{
					weight:'',
					height:'',
					sex:0,
					name:'',
					birthDay:'',
				},
				ageLsit:[
					{
						value:1,
						label:'男'
					},
					{
						value:2,
						label:'女'
					},
				],
				formIndex:0
			};
		},
		onLoad(option) {
			console.log(JSON.parse(option.data))
			let formData = JSON.parse(option.data)
			this.form = {...this.form,...formData}
			if(this.form.sex == 1){
				this.formIndex = 0
			}else{
				this.formIndex = 1
			}
		},
		methods:{
			bindPickerChange(e){
				console.log(e)
				this.form.birthDay = e.detail.value
			},
			sublimt(){
				let data = {
					data:this.form,
					type:'patient'
				}
				if(this.form.name ==''){
					uni.showToast({
						title:'请填写姓名',
						icon:"none"
					})
					return
				}else if(this.form.birthDay ==''){
					uni.showToast({
						title:'请填写生日',
						icon:"none"
					})
					return
				}else if(this.form.weight ==''){
					uni.showToast({
						title:'请填写体重',
						icon:"none"
					})
					return
				}else if(this.form.height ==''){
					uni.showToast({
						title:'请填写身高',
						icon:"none"
					})
					return
				}else{
					uni.$emit('updataUser',data)
					uni.navigateBack({
						delta: 1
					})
				}
				
				
			}
		}
	}
</script>

<style lang="less" scoped>
.patientInfo{
	min-height: 100vh;
	background: #f2f2f2;
	.slotRight{
		margin-right: 20rpx;
		color: #fff;
		font-size: 30rpx;
	}
	.patientInfos{
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
			.caseInfosa{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				width: 400rpx;
				text-align: right;
				color: #222222;
				margin-right: 20rpx;
			}
		}
	}
}
</style>
