<template>
	<view class="patientList">
		<hx-navbar ref="hxnb" :config="config">
		</hx-navbar>
		<u-search :actionStyle="{
		    fontWeight: 'bold',
			fontSize:'18px' }" :showAction="true" actionText="搜索" height="35" searchIconSize="35"
			style=" margin-left: 40rpx; margin-right:40rpx;" placeholder="搜索姓名,手术名称" v-model="inputName"
			@custom="searchConfirm" @search="search" @change="inputChange" @clear="clearText"></u-search>
		<!-- 	<view class="centerContainer" >
			<view class="checkButtom" v-if="showConfirm" @click="checkAll">
				{{isCheckAll?'取消':'全选'}}
			</view>
		</view> -->
		<view>
			<checkbox-group @change="checkboxChange">
				<label class="list-cell flexABW" v-for="(cell, index) in filterUserList">
					<view class="flexAB">
						<view class="checkboxButtom" v-if="!cell.alreadySelected">
							<!-- <checkbox :value="cell" :checked="cell.checked" /> -->
							<checkbox :value="JSON.stringify(cell)" :checked="cell.checked" />
						</view>
						<image :src="cell.avatar == ''? '/static/images/user_default_icon.png':cell.avatar" mode=""
							class="userImg" @click="jumpDetail(cell)"></image>
						<view class="flexA infoContainer" style="" @click="jumpDetail(cell)">
							<view class="name">
								{{cell.patientName}}
							</view>
						</view>
					</view>
					<view class="operationName">{{cell.diagnosis}}</view>
					<image v-if="cell.alreadySelected" src="/static/images/icon_del@2x.png" mode=""
						class="patientListImgs" @click="delPathen(index)"></image>
				</label>
			</checkbox-group>
		</view>
		<view class="sublimt" @click="btnOperation">
			{{bottomText}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemArr: [],
				list: [],
				config: { //自定义头部配置信息
					title: '患者列表',
					color: '#222',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1, ['#fff', '#fff']],
					rightSlot: true,
				},
				teamId: null,
				userGroupId: null,
				docPatirntList: [], //医生下面的患者
				checkUserList: [],
				showConfirm: false,
				inputName: '',
				showDelete: true,
				filterUserList: [],
				alreadySelectedUsers: [],
				bottomText:'新增患者'



			}
		},
		onLoad(option) {
			this.alreadySelectedUsers = JSON.parse(option.userList)
			this.filterUserList = this.alreadySelectedUsers
			console.log('接收数据',this.filterUserList)
		},
		onShow() {
			this.followUpPlanGetPatientUserByDoctor()
		},
		methods: {
			// 选择随访用户
			checkboxChange(e) {
				this.checkUserList = []
				// console.log('test--->', eval("("+e.detail.value+")"))
				e.detail.value.map(item=>{
					console.log('项目--->',JSON.parse(item).id)
					var itemJson = JSON.parse(item)
					itemJson.alreadySelected = true
					console.log('项目--->',itemJson.alreadySelected)
					this.checkUserList.push(itemJson)
				})
				// console.log('test--->', this.checkUserList)
			},
			searchConfirm: function(value) {
				console.log('输入框内容' + value)
				this.searchUser(value)
				// console.log('搜索结果', this.filterUserList)

			},
			search: function(value) {
				console.log('回车输入框内容' + value)
				this.searchUser(value)
			},
			clearText: function(value) {
				console.log('清除输入框内容' + value)
				this.filterUserList = this.docPatirntList
			},
			inputChange: function(input) {
				this.searchUser(input)
				console.log('实时输入框内容' + input)
			},
			delPathen(index) {
				console.log('删除位置-->',index)
				// this.filterUserList.splice(index,1)
				this.alreadySelectedUsers.splice(index,1)

			},
			searchUser(value) {
				if(this.bottomText ==='新增患者'){
					this.filterUserList = this.alreadySelectedUsers.filter((item) => {//按就诊人name和手术名称搜索
						//函数本身返回布尔值，只有当返回值为true时，当前项存入新数组。
						return (item.patientName&&item.patientName.match(value) != null) || (item.diagnosis&&item.diagnosis.match(value) != null)
					})
				}else{
					this.filterUserList = this.docPatirntList.filter((item) => {//按就诊人name和手术名称搜索
						//函数本身返回布尔值，只有当返回值为true时，当前项存入新数组。
						return (item.patientName&&item.patientName.match(value) != null) || (item.diagnosis&&item.diagnosis.match(value) != null)
					})
				}
				
			},
			btnOperation(){
				if(this.bottomText ==='新增患者'){
					this.filterUserList = this.docPatirntList
					this.bottomText = '保存'
				}else{
					console.log('提交的list--->',this.alreadySelectedUsers.concat(this.checkUserList))
					uni.setStorageSync('selectedUsers',this.alreadySelectedUsers.concat(this.checkUserList))
					uni.navigateBack({
						delta: 1
					})
				}
			},
			followUpPlanGetPatientUserByDoctor() { //医生下面的患者
				this.api.followUpPlanGetPatientUserByDoctor('').then(res => {
					if (res.code == 0) {
						res.data.map(item => {
							var selected = false
							this.alreadySelectedUsers.map(userItem => { //查找userId已被选择的用户
								if (userItem.id == item.id) {
									selected = true
								}
							})
							if(!selected){
								this.docPatirntList.push({
									id: item.id,
									avatar: item.avatar,
									diagnosis: item.diagnosis,
									patientName: item.patientName,
									alreadySelected: selected,
									selectedSaved:false
								})
							}
							
						})
						// this.docPatirntList = res.data
						// this.filterUserList = this.docPatirntList
					}
					console.log(this.docPatirntList)
				})
			},

		}
	}
</script>

<style lang="less" scoped>
	.patientList {
		.slotRight {
			margin-right: 30rpx;

			.slotRighticon {
				width: 35rpx;
				height: 35rpx;
				color: red;
			}
		}

		.list-cell {
			padding: 0 22rpx;
			border-bottom: 1px solid #ECECEC;

			.userImg {
				width: 80rpx;
				height: 80rpx;
				border-radius: 10rpx;
				// background: red;
			}

			.name {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #222222;
				margin-right: 30rpx;
			}

			.sex {
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

				.sexicon {
					width: 28rpx;
					height: 28rpx;
				}
			}

		}

		.sublimt {
			position: fixed;
			bottom: 0;
			width: 60%;
			flex-direction: column;
			height: 88rpx;
			background: rgba(64, 200, 222, 1);
			border-radius: 44rpx;
			text-align: center;
			align-items: center;
			line-height: 88rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin-left: 20%;
			margin-right: 20%;
			margin-bottom: 10rpx;
			z-index: 100;
		}

		.checkboxButtom {
			margin-right: 20rpx;
		}

		.operationName {
			width: 40%;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}

		.infoContainer {
			display: flex;
			justify-content: space-between;
			padding: 38rpx 0;
			margin-left: 20rpx;
		}

		.patientListImgs {
			width: 40rpx;
			height: 40rpx;
		}
	}
</style>