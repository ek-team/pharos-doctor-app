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
						<view class="checkboxButtom" v-if="showConfirm">
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
					<view>全髋关节置换</view>
					<image v-if="showDelete" src="/static/images/icon_del@2x.png" mode="" class="patientListImgs"
						@click="delPathen(index)"></image>
				</label>
			</checkbox-group>
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
				

			}
		},
		onLoad(option) {
			
		},
		onShow() {
			this.followUpPlanGetPatientUserByDoctor()
		},
		methods: {
			// 选择随访用户
			checkboxChange(e) {
				console.log('test--->', e)
				this.checkUserList = e.detail.value
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
			inputChange:function(input){
				this.searchUser(input)
				console.log('实时输入框内容' + input)
			},
			delPathen(index) {

			},
			searchUser(value){
				this.filterUserList = this.docPatirntList.filter((item) => {
					//函数本身返回布尔值，只有当返回值为true时，当前项存入新数组。
					return item.patientName.match(value) != null
				})
			},
			followUpPlanGetPatientUserByDoctor() { //医生下面的患者
				this.api.followUpPlanGetPatientUserByDoctor('').then(res => {
					if (res.code == 0) {
						this.docPatirntList = res.data
						this.filterUserList = this.docPatirntList
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

		.checkboxButtom {
			margin-right: 20rpx;
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