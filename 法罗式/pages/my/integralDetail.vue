<template>
	<view class="container">
		<hx-navbar ref="hxnb" :config="config">
		</hx-navbar>
		<view class="intergralTop">
			<!-- <view class="bindBtn" @click="getcode" v-if="!wxInfo.nickname">
				暂未绑定微信账号，去绑定
			</view> -->
			<!-- v-if="wxInfo.nickname" -->
			<view style="margin-top: 20rpx;">
				<!-- 蓝色区域 125-->
				<view class="integralTop">
					<view class="integralTotal flexBetween" style="background-color: #007AFF;">
						<!-- <image src="/static/images/img1.png" mode="" class="integralImg"></image> -->
						<view class="integralItem flexColumn">
							<view class="integralNum">
								{{waitAmount?waitAmount:0}}
							</view>
							<view class="integralTitle font-24">
								待入账金额
							</view>
						</view>
						<view class="integralItem flexColumn">
							<view class="integralNum">
								{{withdrawAmount?withdrawAmount:0}}
							</view>
							<view class="integralTitle font-24">
								已提现
							</view>
						</view>
						<view class="integralItem flexColumn">
							<view class="integralNum">
								{{totalAmount?totalAmount:0}}
							</view>
							<view class="integralTitle font-24">
								总累计获得
							</view>
						</view>
					</view>
				</view>
				<!-- v-if="wxInfo.nickname" -->
				<!-- <view class="integralList " >
					<picker mode="date" :value="date" :end="endDate" fields="month" @change="bindDateChange">
						<view class="integralTime font333 font-24 flex">
							{{date}}
							<view class="triangle">
							</view>
						</view>
					</picker>
					<view class="integralTotal font-22">
						合计：获得{{totalTimeAmount?totalTimeAmount:0}}元，已提现{{withdrawAmount?withdrawAmount:0}}元
					</view>
				</view> -->
			</view>
			<!-- 提现列表 -->
			<view class="list">
				<scroll-view scroll-y="true" refresher-enabled="true" :refresher-threshold="200"
					:refresher-triggered="triggered" @refresherrefresh="onRefresh" :scroll-top="scrollTop"
					@scrolltolower="toLower" @scrolltoupper="toUpper" style="top:290px !important;" class="scroll">
					<view class="integralListItem" v-for="(item,index) in integralList" :key='index'>
						<view class="integralItemTop flexBetween">
							
							<view class="amount font333 flex">
								<view class="font-22">
									法豆：
								</view>
								+{{item.point}}(元)
							</view>
							<view class="pharmacyName font333">
								{{ item.pointDesc}}
							</view>
						</view>
						<view class="integralItemBottom flexBetween">
							<view class="font333 flex font-22">
								<!-- 描述： -->
								{{item.doctorTeamName}}
							</view>
						</view>
						<view class="integralItemBottom flexBetween ">
							<view class="integralItemTime font-22">
								{{item.createTime}}
							</view>
						<!-- 	<view class="withdraw flexCenter" v-if="item.state==0" @click="toWithdraw(item.orderNo)">
								提现
							</view>
							<view class="hasWithdraw flexCenter" v-if="item.state==1">
								已提现
							</view> -->
						</view>
					</view>
					<view class="noOrder" v-if="noIntegral">
						<view class="noOrderText">
							还没有明细
						</view>
					</view>
					<uni-load-more :status="status" v-if="!noIntegral" :showIcon='showIcon' />
				</scroll-view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{//自定义头部配置信息
					title: '法豆明细',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:true,
				},
				date: '',
				endDate: '',
				// scroll-view参数
				triggered: false,
				scrollTop: 0,
				totalAmount: '', //累计金额
				waitAmount: '', //待入帐金额
				totalTimeAmount: '', //时间查询总佣金
				withdrawAmount: '', //时间查询 已提现金额
				page: {
					pageNum: 1,
					pageSize: 30,
					total: 0
				},
				integralList: [],

				showIcon: true, //loadingde的icon
				status: 'loading', //当前loading状态  loading more nomore
				noIntegral: false, //是否有数据

				sweixin: null,
				wxInfo: {}
			};
		},

		onLoad() {
			var date = new Date();
			this.date = date.getFullYear() + "-" + (date.getMonth() + 1);
			this.endDate = date.getFullYear() + "-" + date.getMonth() + 1;
			// this.getPlus();
		},
		onShow() {
			this.getTotal();
			this.integralList = [];
			this.page.pageNum = 1;
			this.getList();
		},
		methods: {
			bindDateChange(e) {
				// console.log(e.target.value)
				this.date = e.target.value;
				this.integralList = [];
				this.page.pageNum = 1;
				this.getList();

			},

			// 查询总数居和每月合计
			getTotal() {
				this.api.doctorPointGetDoctorTotalPoint().then(res=>{
					if(res.code==0){
						this.triggered = false;
						this.totalAmount = res.data.totalPoint;
						this.waitAmount = res.data.pendingWithdraw;
						this.withdrawAmount = res.data.withdraw;
					}
					// console.log('总积分',res)
				})
				
			},
			// 获得提现列表
			getList() {
				this.status = 'loading';
				this.api.doctorPointGetDoctorPoint({
					pageNum: this.page.pageNum,
					pageSize: this.page.pageSize,
				}).then(res=>{
					this.triggered = false;
					if(res.code==0){
						this.integralList=this.integralList.concat(res.data.records)
						this.page.total = res.data.total;
						if (this.integralList.length == 0) {
							this.noIntegral = true;
						} else {
							// 列表中有数据
							this.noIntegral = false;
							if (res.data.total == this.integralList.length) {
								this.status = 'no-more'
							} else {
								this.status = 'more';
							}
						}
						this.showIcon = true;
					}
					// console.log('明细',res)
				})
			},

			toLower() {
				if (this.integralList.length < this.page.total) {
					this.page.pageNum++;
					this.getList();
				}
			},
			toUpper() {
				// this.integralList = [];
				// this.page.pageNum = 1;
				// this.getList();
			},
			onRefresh() {
				this.triggered = true;
				this.integralList = [];
				this.page.pageNum = 1;
				this.showIcon = false;
				this.noIntegral = false;
				this.getList();

			},
			// 去提现
			toWithdraw(orderNo) {
				// console.log(orderNo)
				https('weChat/splitaccount/splitaccount', 'get', {
					orderNo: orderNo
				}).then(res => {
					// console.log(res.data)
					if (res.code == 200) {
						this.integralList.map((item, index) => {
							if (orderNo == item.orderNo) {
								item.state = 1;
							}
						})
						uni.showToast({
							title: '提现成功',
							icon: 'none'
						})
					}
				})
			},
			getPlus() {
				//获取当前显示的webview
				var pages = getCurrentPages()
				var page = pages[pages.length - 1]
				var currentWebview = page.$getAppWebview()
				//调用H5+APP的扩展API
				var shares = null;
				let that = this
				var pusher = plus.share.getServices(function(s) {
					shares = {};
					for (var i in s) {
						var t = s[i];
						shares[t.id] = t;
					}
					that.sweixin = shares['weixin'];
				}, function(e) {
					console.log("获取分享服务列表失败：" + e.message);
				});
				//放入当前的webview
				currentWebview.append(pusher);
			},
			getcode() {
				// 调用微信小程序
				// uni.navigateTo({
				// 	url:'../splitAccountBind/splitAccountBind'
				// })
				// return
				this.sweixin.launchMiniProgram({
					id: 'gh_8e1a3fb99b2a', //要跳转小程序的原始ID
					path: 'pages/bindAccount/bingAccount?token=' + uni.getStorageSync('token')
				})

			},
			// 获取微信是否绑定
			getUserInfo() {
				http('wx/getWxLogin', 'get').then(res => {
					if (res.code == 200) {
						console.log(res.data)
						this.wxInfo = res.data;
					}

				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F9F9F9;
		// background-color: red;
	}
	.bindBtn {
		width: 446rpx;
		height: 80rpx;
		border-radius: 40rpx;
		border: 4rpx solid #378EFF;
		margin: 0 auto;
		margin-top: 80rpx;
		padding: 0 !important;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #378EFF;
	}

	.hasBind {
		display: flex;
		align-items: center;
		padding: 20rpx 50rpx;
		justify-content: space-between;
		// background-color: #fff;
		height: 80px;

		.wxHead {
			width: 100rpx;
			height: 100rpx;
			object-fit: cover;
		}

		.wxAccount {
			font-size: 16px;
			color: #555555;
		}

		.resetBind {
			width: 200rpx;
			height: 80rpx;
			border-radius: 40rpx;
			border: 4rpx solid #378EFF;
			padding: 0 !important;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #378EFF;
		}
	}

	.integralTop {
		background-color: #fff;
		box-sizing: border-box;
		height: 125px;

		.integralTotal {
			width: 690rpx;
			height: 200rpx;
			background: linear-gradient(266deg, #378EFF 0%, #27a9ff 100%);
			box-shadow: 0rpx 4rpx 14rpx 10rpx rgba(208, 221, 235, 0.29);
			border-radius: 16rpx;
			margin: 0 auto;
			position: relative;
			// padding: 0 196rpx 0 94rpx;
			padding: 0 94rpx 0 94rpx;
			box-sizing: border-box;

			.integralImg {
				width: 148rpx;
				height: 124rpx;
				object-fit: cover;
				position: absolute;
				right: 0;
				bottom: 14rpx;
			}

			.integralItem {
				.integralNum {
					color: #fff;
					font-size: 42rpx;
				}

				.integralTitle {
					color: rgba(255, 255, 255, 0.5);
				}
			}
		}
	}
	.flexBetween{
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	}
	.flexColumn{
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.integralList {
		height: 50px;
		padding: 26rpx 30rpx 0 26rpx;
		box-sizing: border-box;

		.integralTime {
			display: flex;
			align-items: center;
			.triangle {
				width: 0;
				height: 0;
				border-top: 8rpx solid #333;
				border-left: 6rpx solid transparent;
				border-right: 6rpx solid transparent;
				margin-left: 2rpx;
			}

		}

		.integralTotal {
			color: #B1B1B1;
			margin-top: 4rpx;
		}


	}

	// 列表
	.list {
		width: 690rpx;
		margin: 0 auto;
		margin-top: 10px;
		.integralListItem {
			width: 100%;
			padding: 25rpx 44rpx 25rpx;
			box-sizing: border-box;
			background-color: #fff;
			box-shadow: 0 4rpx 14rpx 10rpx rgba(224, 212, 212, 0.14);
			border-radius: 16rpx;
			margin-top: 20rpx;

			.integralItemTop {
				.pharmacyName {
					font-size: 26rpx;
				}

				.amount {
					font-size: 36rpx;
					color:#378EFF;
				}
			}

			.integralItemBottom {
				margin-top: 10rpx;

				.integralItemTime {
					color: #B1B1B1;
				}

				.withdraw {
					width: 88rpx;
					height: 48rpx;
					border-radius: 2rpx;
					border: 2rpx solid #378EFF;
					color: #378EFF;
					font-size: 28rpx;
				}

				.hasWithdraw {
					width: 88rpx;
					height: 48rpx;
					border-radius: 2rpx;
					border: 2rpx solid #C0C0C0;
					color: #C0C0C0;
					font-size: 28rpx;
				}
			}

		}

		.nomore {
			color: #B1B1B1;
			font-size: 24rpx;
			text-align: center;
			margin-top: 40rpx;
		}
	}

	/* 没有订单 */
	.noOrder {
		display: flex;
		flex-direction: column;
		align-items: center;

		.noOrderImg {
			width: 354rpx;
			height: 234rpx;
			object-fit: cover;
			margin-top: 136rpx;
		}

		.noOrderText {
			font-size: 13px;
			color: #8F8C8C;
			text-align: center;
			margin-top: 40rpx;
		}
	}
	// 弹框
	.metaDialog {
		width: 680rpx;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 52rpx 80rpx;
		box-sizing: border-box;

		.metaTitle {
			font-size: 32rpx;
			text-align: center;
			color: #333;
		}

		.meta {
			// border-bottom: 1px solid #E5E5E5;
			height: 98rpx;
			margin-top: 78rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			// align-items: center;
			.formItemTitle{
				display: flex;
				align-items: flex-end;
				color: #828282;
			}
			.formItem {
				// height: 98rpx;
				// line-height: 98rpx;
				display: flex;
				// align-items: flex-end;
				font-size: 15px;
				color: #333;
				border-bottom: 1px solid #E5E5E5;
			}

			.formPlaceholder {
				font-size: 14px;
				display: flex;
				align-items: flex-end;
			}

		}

		.noteOperate {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.cancelNote {
				width: 40%;
				height: 50px;
				border-radius: 30px;
				color: #378EFF;
				border: 1px solid #378EFF;
				line-height: 50px;
				font-size: 15px;
				text-align: center;
				margin: 0 auto;
				margin-top: 60px;
			}

			.confirmNote {
				width: 40%;
				height: 50px;
				background: linear-gradient(270deg, #378EFF 0%, #27a9ff 100%);
				border-radius: 30px;
				color: #fff;
				line-height: 50px;
				font-size: 15px;
				text-align: center;
				margin: 0 auto;
				margin-top: 60px;
			}
		}


	}

</style>
