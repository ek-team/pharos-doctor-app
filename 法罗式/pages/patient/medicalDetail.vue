<template>
	<view class="medicalDetail flexB">
		<view class="left">
			<view class="leftMenu flexA" @click="changeMenu(index)" v-for="(item,index) in leftMenu" :key="index" :style="index==menuIndex?'background:#fff;color:#378EFF;':''">
				<view :class="index==menuIndex?'blueRadio':'whiteRadio'" >
					
				</view>
				<view class="" style="width:112rpx;">
					{{item.name}}
				</view>
			</view>
		</view>
		<scroll-view :scroll-top="scrollTop"  scroll-y="true" class="rightMenu" >
			<view id="jcxx">
				<view class="flexA" :style="menuIndex==0?'color:#378EFF;':''">
					<image :src="menuIndex==0?'/static/images/icon_mes_sel@3x(1).png':'/static/images/icon_mes@2x.png'" mode="" class="jcxxIcon"></image>
					基础信息
					
				</view>
				<view class="jcxxInfo flexA">
					<view class="name">
						{{detail.name}}
					</view>
					<view class="name">
						{{detail.sex==0?'男':'女'}}
					</view>
					<view class="name">
						{{detail.weight}}kg
					</view>
					<view class="name">
						{{detail.height}}cm
					</view>
				</view>
			</view>
			<view id="zdxx">
				<view class="flexA" :style="menuIndex==1?'color:#378EFF;':''">
					<image :src="menuIndex==1?'/static/images/icon_dia_sel@3x.png':'/static/images/icon_dia@3x.png'" mode="" class="jcxxIcon"></image>
					诊断信息
				</view>
				<view class="zdxxInfo">
					<view class="zdxxInfos">
						病人主诉 <text>{{detail.inquirys[0].mainComplaint}}</text>
					</view>
					<view class="zdxxInfos">
						诊断结果 <text>{{detail.content}}</text>
					</view>
					<!-- <view class="zdxxInfos">
						病历记录
					</view>
					<view class="zdxxInfoList flexAB">
						<view class="">
							矫健损伤
						</view>
						<view class="">
							2022-6-12 13:14
						</view>
					</view> -->
				</view>
				
			</view>
			<view id="wzd">
				<view class="flexA" :style="menuIndex==2?'color:#378EFF;':''">
					<image :src="menuIndex==2?'/static/images/icon_ask_sel@3x.png':'/static/images/icon_ask@3x.png'" mode="" class="jcxxIcon"></image>
					问诊单
				</view>
				<view class="wzdInfo flexA">
					<view class="" style="margin-right: 60rpx;">
						过敏史
					</view>
					<view :class="detail.inquirys[0].allergy==1?['gmsNo','flexAA']:['gmsYes','flexAA']" style="margin-right:20rpx;">
						<view class="radios"></view>无
					</view>
					<view :class="detail.inquirys[0].allergy==2?['gmsNo','flexAA']:['gmsYes','flexAA']">
						<view class="radios"></view>有
					</view>
				</view>
				<textarea   id="" v-if="detail.inquirys[0].allergy==1" class="textareaValue" v-model="detail.inquirys[0].allergyDesc"  ></textarea>
				<view class="wzdInfo flexA">
					<view class="" style="margin-right: 60rpx;">
						过往史
					</view>
					<view :class="detail.inquirys[0].pastMedicalHistory==1?['gmsNo','flexAA']:['gmsYes','flexAA']" style="margin-right:20rpx;">
						<view class="radios"></view>无
					</view>
					<view :class="detail.inquirys[0].pastMedicalHistory==2?['gmsNo','flexAA']:['gmsYes','flexAA']">
						<view class="radios"></view>有
					</view>
				</view>
				<textarea   id="" v-if="detail.inquirys[0].pastMedicalHistory==1" class="textareaValue" v-model="detail.inquirys[0].pastMedicalHistoryDesc"  ></textarea>
				<view class="wzdInfo flexA">
					<view class="" style="margin-right: 60rpx;">
						肝功能
					</view>
					<view :class="detail.inquirys[0].liverFunction==1?['gmsNo','flexAA']:['gmsYes','flexAA']" style="margin-right:20rpx;">
						<view class="radios"></view>正常
					</view>
					<view :class="detail.inquirys[0].liverFunction==2?['gmsNo','flexAA']:['gmsYes','flexAA']" >
						<view class="radios"></view>异常
					</view>
				</view>
				<view class="wzdInfo flexA">
					<view class="" style="margin-right: 60rpx;">
						肾功能
					</view>
					<view :class="detail.inquirys[0].kidneyFunction==1?['gmsNo','flexAA']:['gmsYes','flexAA']"  style="margin-right:20rpx;">
						<view class="radios"></view>正常
					</view>
					<view :class="detail.inquirys[0].kidneyFunction==2?['gmsNo','flexAA']:['gmsYes','flexAA']" >
						<view class="radios"></view>异常
					</view>
				</view>
				<view class="wzdInfo flexA">
					<view class="" style="margin-right: 60rpx;">
						备&nbsp;&nbsp;&nbsp;&nbsp;孕
					</view>
					<view :class="detail.inquirys[0].pregnancy==1?['gmsNo','flexAA']:['gmsYes','flexAA']"  style="margin-right:20rpx;">
						<view class="radios"></view>无
					</view>
					<view :class="detail.inquirys[0].pregnancy==2?['gmsNo','flexAA']:['gmsYes','flexAA']" >
						<view class="radios"></view>备孕中
					</view>
				</view>
			</view>
			<view id="jcbg">
				<view class="flexA" :style="menuIndex==3?'color:#378EFF;':''">
					<image :src="menuIndex==3?'/static/images/icon_ins_sel@3x.png':'/static/images/icon_ins@3x.png'" mode="" class="jcxxIcon"></image>
					检查报告
				</view>
				<view class="wzdInfo flexA">
					<image :src="detail.inquirys[0].imageUrl" mode="" style="width:100rpx;height: 150rpx;"></image>
				</view>
				
			</view>
			<view id="sfjh">
				<view class="flexA" :style="menuIndex==4?'color:#378EFF;':''">
					<image :src="menuIndex==4?'/static/images/icon_dat_sel@3x.png':'/static/images/icon_pla@3x.png'" mode="" class="jcxxIcon"></image>
					关联的随访计划
				</view>
				<view class="wzdInfo">
					<view class="wzdInfos" v-for="(item,index) in detail.followUpPlans" :key="index">
						<view class="name">
							《{{item.name}}》
						</view>
						<view class="flexAB" v-if="item.followUpPlanNoticeCount">
							随访阶段 {{item.followUpPlanNoticeCount.push}}/{{item.followUpPlanNoticeCount.totalPush}}
							<view class="" style="width:150rpx;">
								<u-line-progress activeColor="#40C8DE" inactiveColor="#f2f2f2"  :percentage="item.baifenbi" :showText="false"></u-line-progress>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view id="blxx">
				<view class="flexA" :style="menuIndex==5?'color:#378EFF;':''">
					<image :src="menuIndex==5?'/static/images/icon_med_sel@3x.png':'/static/images/icon_med@3x1.png'" mode="" class="jcxxIcon"></image>
					病历信息
				</view>
				<view class="wzdInfo">
					<view class="wzdInfos flexAB">
						病历记录时间
						<text>{{detail.createTime}}</text>
					</view>
					<view class="wzdInfos flexAB">
						病历记录人
						<text>{{detail.createUserName}}</text>
					</view>
					
				</view>
				
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import { divide,times} from '@/common/numPrecisions.js'
	export default {
		data() {
			return {
				leftMenu:[
					{
						name:'基础信息',
					},
					{
						name:'诊断信息'
					},
					{
						name:'问诊单'
					},
					{
						name:'检查报告'
					},
					{
						name:'关联随访计划'
					},
					{
						name:'病历信息'
					},
				],
				menuIndex:0,
				scrollTop:0,
				id:0,
				detail:{
					inquirys:[
						{
							
						}
					]
				}
			};
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			this.followUpPlanGetElectronicCaseDetail()
		},
		methods:{
			followUpPlanGetElectronicCaseDetail(){
				let data  = {
					id:this.id
				}
				this.api.followUpPlanGetElectronicCaseDetail(data).then(res=>{
					console.log(res)
					
					if(res.code == 0){
						if(res.data.followUpPlans){
							
						}
						res.data.followUpPlans.map(item=>{
							if(item.followUpPlanNoticeCount){
								item.baifenbi = times(divide(item.followUpPlanNoticeCount.push,item.followUpPlanNoticeCount.totalPush),100)
							}
						})
						console.log(res.data)
						this.detail = res.data
					}
				})
			},
			changeMenu(index){
				this.menuIndex = index
				const query = uni.createSelectorQuery()
				if(index==0){
					query.select('#jcxx').boundingClientRect((data) => {
					    console.log(data, 'data')
						this.scrollTop = data.top
					    
					}).exec()
				}else if(index==1){
					query.select('#zdxx').boundingClientRect((data) => {
					    console.log(data, 'data')
						this.scrollTop = data.top
					    
					}).exec()
				}else if(index==2){
					query.select('#wzd').boundingClientRect((data) => {
					    console.log(data, 'data')
						this.scrollTop = data.top
					    
					}).exec()
				}else if(index==3){
					query.select('#jcbg').boundingClientRect((data) => {
					    console.log(data, 'data')
						this.scrollTop = data.top
					    
					}).exec()
				}else if(index==4){
					query.select('#sfjh').boundingClientRect((data) => {
					    console.log(data, 'data')
						this.scrollTop = data.top
					    
					}).exec()
				}else if(index==5){
					query.select('#blxx').boundingClientRect((data) => {
					    console.log(data, 'data')
						this.scrollTop = data.top
					    
					}).exec()
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.medicalDetail{
	min-height: 100vh;
	.left{
		min-height: 100vh;
		background: #f2f2f2;
		width: 192rpx;
		
		.leftMenu{
			height: 120rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #444444;
			.blueRadio{
				width: 14rpx;
				height: 38rpx;
				background-color: #378EFF;
				border-radius:0 38rpx 38rpx 0;/* 左上、右上、右下、左下 */
				margin-right: 44rpx;
			}
			.whiteRadio{
				width: 14rpx;
				height: 38rpx;
				background-color: #f2f2f2;
				border-radius:0 38rpx 38rpx 0;/* 左上、右上、右下、左下 */
				margin-right: 44rpx;
			}
		}
	}
	.rightMenu{
		height: 100vh;
		width: 530rpx;
		background: #fff;
		#blxx{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #444444;
			border-bottom: 1px solid #ECECEC;
			padding: 30rpx 0;
			.jcxxIcon{
				width: 40rpx;
				height: 40rpx;
			}
			.wzdInfo{
				// margin-left: 40rpx;
				margin: 30rpx 40rpx;
				.wzdInfos{
					margin: 20rpx 0;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #989898;
					text{
						color: #222222;
					}
				}
			}
		}
		#sfjh{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #444444;
			border-bottom: 1px solid #ECECEC;
			padding: 30rpx 0;
			.jcxxIcon{
				width: 40rpx;
				height: 40rpx;
			}
			.wzdInfo{
				// margin-left: 40rpx;
				margin: 30rpx  40rpx;
				.wzdInfos{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					
					.name{
						color: #40C8DE;
						margin: 28rpx 0;
					}
				}
			}
		}
		#jcbg{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #444444;
			border-bottom: 1px solid #ECECEC;
			padding: 30rpx 0;
			.jcxxIcon{
				width: 40rpx;
				height: 40rpx;
			}
			.wzdInfo{
				// margin-left: 40rpx;
				margin: 30rpx  40rpx;
			}
		}
		#wzd{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #444444;
			border-bottom: 1px solid #ECECEC;
			padding: 30rpx 0;
			.jcxxIcon{
				width: 40rpx;
				height: 40rpx;
			}
			.textareaValue{
				padding: 22rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				border: 1px solid #efefef;
				color: #222222;
				width: 420rpx;
				height: 170rpx;
				margin: 20rpx auto;
			}
			.wzdInfo{
				// margin-left: 40rpx;
				margin: 30rpx 0 30rpx 40rpx;
				.gmsNo{
					width: 128rpx;
					height: 56rpx;
					background: rgba(242,242,242,1);
					border-radius: 10rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					.radios{
						width: 16rpx;
						height: 16rpx;
						border: 2rpx solid #989898;
						border-radius: 50%;
					}
				}
				.gmsYes{
					width: 128rpx;
					height: 56rpx;
					background: #DEECFF;
					border-radius: 10rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #378EFF;
					.radios{
						width: 16rpx;
						height: 16rpx;
						background: #378EFF;
						border-radius: 50%;
					}
				}
			}
		}
		#zdxx{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #444444;
			border-bottom: 1px solid #ECECEC;
			padding: 30rpx 0;
			.jcxxIcon{
				width: 40rpx;
				height: 40rpx;
			}
			.zdxxInfo{
				margin-left: 40rpx;
				.zdxxInfos{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #989898;
					margin:20rpx 0 ;
					padding-right: 20rpx;
					text{
						color: #222222;
						margin-left:42rpx;
					}
				}
				.zdxxInfoList{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #222222;
					padding-right: 20rpx;
				}
			}
		}
		#jcxx{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #444444;
			border-bottom: 1px solid #ECECEC;
			padding: 30rpx 0;
			.jcxxIcon{
				width: 40rpx;
				height: 40rpx;
			}
			.jcxxInfo{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #222222;
				margin-top: 20rpx;
				.name{
					margin-left: 40rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
	
}
</style>
