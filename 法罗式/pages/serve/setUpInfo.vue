<template>
	<view class="setUpInfo">
		<hx-navbar ref="hxnb" :config="config">
			<view v-if="!disableInput && serviceStatus==0" class="" slot="right" class="slotRight flexA" @click="sublimt">
				{{!datainfo.doctorUserAction?'添加':'保存'}}
			</view>
		</hx-navbar>
		<view class="setUpInfos flexAB">
			<view>{{config.title}}</view>
			<u-switch @change="change"  v-model="checked"></u-switch>
		</view>

		<view class="setUpInfos flexAB">
			收费价格
			<input type="number" v-model="form.price" v-bind:disabled="disableInput" class="setUpInfosInput" :placeholder="placeholder1">
		</view>
		<view class="setUpInfos flexAB">
			每日接单数量限制
			<input type="number" inputmode="numeric" @input="inputContent" v-bind:disabled="disableInput" v-model="form.count" class="setUpInfosInput"
				:placeholder="placeholder2">
		</view>
		<!-- <view class="setUpInfos flexAB">
			过期时间
			<view class="flexA">
				<input type="number" inputmode="numeric" v-model="form.hour" class="setUpInfosInput" placeholder="请输入过期时间">小时
			</view>
		</view> -->
		<!-- <view class="setUpInfos flexAB">
			所属团队
			<picker @change="bindPickerChange" range-key="name" :value="formIndex" :range="teamList">
				<view class="flexA">
					<view class="" style="width:460rpx;text-align: right;">
						{{teamList[formIndex]?teamList[formIndex].name:'请选择团队'}}
					</view>
					<image src="/static/images/icon_poi@2x(1).png" mode=""  class="infosImg"></image>
				</view>
			</picker>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				config: { //自定义头部配置信息
					title: '',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1, ['#378EFF', '#378EFF']],
					rightSlot: true,
				},
				id: 0,
				form: {
					teamId: '',
					price: '',
					count: '',
					hour: ''
				},
				serviceStatus:0,
				teamList: [],
				formIndex: -1,
				datainfo: '', //详情
				teamId: null,
				checked: false,
				disableInput:false,
				placeholder1:'请输入收费价格',
				placeholder2:"请输入每日接单数量限制"

			};
		},
		onLoad(option) {
			if (option.teamId) { //从团队列表跳过去
				this.teamId = option.teamId
				this.config.title = '团队图文咨询'
				this.getDetail(option.teamId)
				console.log('从团队跳过来')
				return
			}
			this.datainfo = JSON.parse(option.item)
			// console.log('获取的参数',this.datainfo)
			this.config.title = this.datainfo.category
			this.doctorUserActionGetServiceDetail()


		},
		methods: {
			change(status) {
				console.log(status);
				this.disableInput = !status
				if(this.disableInput){
					this.api.doctorCloseService({
						id: this.form.id
					}).then(res=>{
						console.log('关闭结果',res)
						this.placeholder1 = ''
						this.placeholder2 = ''
						// this.form.price = ''
						// this.form.count = ''
					})
					
				}else{
					this.serviceStatus = 0
					this.placeholder1 ='请输入收费价格',
					this.placeholder2 = "请输入每日接单数量限制"
				}
			},
			// 团队跳过来
			getDetail(teamId) {
				this.api.getFromTeamService({
					teamId: teamId
				}).then(res => {
					this.form = res.data
					console.log('服务详情',res.data)
					if (res.data && res.data.id) {
						this.datainfo = {
							doctorUserAction: res.data.id
						}
					}
					// this.doctorTeamQueryMyTeam()
				})
			},
			bindPickerChange(e) {
				console.log(e.detail.value)
				this.formIndex = e.detail.value
			},
			inputContent() {

			},
			sublimt() {
				// if(this.formIndex ==-1){
				// 	uni.showToast({
				// 		title:'请选择所属团队',
				// 		icon:"none"
				// 	})
				// 	return
				// }
				console.log('价格', this.form)

				if (this.form.price === '' || (!this.form.price && this.form.price != 0)) {
					uni.showToast({
						title: '请输入价格',
						icon: "none"
					})
					return
				}
				if (this.form.count === '' || (!this.form.count && this.form.count != 0)) {
					uni.showToast({
						title: '请输入接单数量限制',
						icon: "none"
					})
					return
				}
				if (!Number.isInteger(Number(this.form.count))) {
					uni.showToast({
						title: '接单数量限制请输入整数',
						icon: "none"
					})
					return
				}
				// if(this.form.hour ===''||(!this.form.hour&&this.form.hour!=0)){
				// 	uni.showToast({
				// 		title:'请输入过期时间',
				// 		icon:"none"
				// 	})
				// 	return
				// }
				// if(!Number.isInteger(Number(this.form.hour))){
				// 	uni.showToast({
				// 		title:'过期时间请输入整数',
				// 		icon:"none"
				// 	})
				// 	return
				// }
				let data = {
					// teamId:this.teamList[this.formIndex].id,
					teamId: this.teamId ? this.teamId : '',
					price: this.form.price,
					count: this.form.count,
					hour: this.form.hour,
					id: this.form.id,
					doctorUserServiceSetUpId: this.datainfo.id
				}
				// console.log('图文咨询服务设置参数',data)
				if (this.datainfo.doctorUserAction || (this.teamId && this.form.id)) { //修改
					this.api.doctorUserActionUpdateService(data).then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: '保存成功！'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				} else {
					this.api.doctorUserActionOpenService(data).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								title: '开通成功！'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				}
			},
			doctorTeamQueryMyTeam() {
				this.api.doctorTeamQueryMyTeam().then(res => {
					// console.log(res.data)
					if (res.code == 0) {
						this.formIndex = res.data.findIndex(item => item.id == this.form.teamId)
						this.teamList = res.data

					}
				})
			},
			doctorUserActionGetServiceDetail() {
				let data = {
					id: this.datainfo.doctorUserAction ? this.datainfo.doctorUserAction.id : ''
				}
				this.api.doctorUserActionGetServiceDetail(data).then(res => {
					console.log(res)
					if (res.code == 0 && res.data) {
						this.form = res.data
						this.disableInput = false
						this.serviceStatus = res.data.status
						if(this.serviceStatus == 0){
							this.checked = true
						}else{
							this.checked = false
						}
						// this.doctorTeamQueryMyTeam()
					}else{
						this.disableInput = true
						this.placeholder1 = ''
						this.placeholder2 = ''
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.setUpInfo {
		min-height: 100vh;
		background: #f2f2f2;

		.slotRight {
			// margin-right: 30rpx;
			color: #fff;
			font-size: 30rpx;
			width: 80rpx;
			height: 40rpx;
		}

		.setUpInfos {
			padding: 30rpx;
			background: #fff;
			border-bottom: 1px solid #efefef;
			color: #222;
			font-size: 28rpx;

			.setUpInfosInput {
				width: 400rpx;
				color: #FF7F00;
				font-size: 28rpx;
				text-align: right;
			}

			.infosImg {
				width: 24rpx;
				height: 24rpx;
				display: flex;
				margin-left: 20rpx;
			}
		}
	}
</style>