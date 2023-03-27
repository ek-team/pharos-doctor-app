<template>
	<view class="Inquiries">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="sublimt">
				保存
			</view>
		</hx-navbar>
		<view class="info">
			<view class="infos">
				<view class="">
					主诉
				</view>
				<input type="text" v-model="form.mainComplaint" placeholder="请输入主诉信息..." class="infosInfo">
			</view>
			<view class="infos">
				<view class="">
					历史处方/病历/检查报告
				</view>
				<view class="flexA">
					<view class="upload" @click="selctImg">
						<image src="/static/images/icon_add@3x2.png" mode="" class="uploadIcon"></image>
						<view class="">
							上传资料
						</view>
					</view>
					<view class="imgInfo" v-if="form.imageUrl">
						<image :src="form.imageUrl"  mode="" class="imglist"></image>
						<view class="mask">
							<view class="buttonList flexAB">
								<view class="" @click="form.imageUrl=''">
									删除
								</view>
								<view class="" @click="watchImg">
									查看
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="info" style="margin-top: 22rpx;">
			<view class="infos">
				<view class="flexAB">
					<view class="">
						过敏史
					</view>
					<view class="flexA">
						<view :class="form.allergy==2?'buttonChanges':'buttonChange'" @click="form.allergy=2">
							无
						</view>
						<view :class="form.allergy==1?'buttonChanges':'buttonChange'" @click="form.allergy=1">
							有
						</view>
					</view>
				</view>
				<input type="text" v-model="form.allergyDesc" v-if="form.allergy==1" placeholder="请填写过敏药物" class="infosInfo">
			</view>
			<view class="infos">
				<view class="flexAB">
					<view class="">
						过往病史
					</view>
					<view class="flexA">
						<view :class="form.pastMedicalHistory==2?'buttonChanges':'buttonChange'" @click="form.pastMedicalHistory=2">
							无
						</view>
						<view :class="form.pastMedicalHistory==1?'buttonChanges':'buttonChange'" @click="form.pastMedicalHistory=1">
							有
						</view>
					</view>
				</view>
				<input type="text" v-model="form.pastMedicalHistoryDesc" v-if="form.pastMedicalHistory==1" placeholder="请填写肝肾功能情况及过往病史" class="infosInfo">
			</view>
			<view class="infos">
				<view class="flexAB">
					<view class="">
						肝功能
					</view>
					<view class="flexA">
						<view :class="form.liverFunction==2?'buttonChanges':'buttonChange'" @click="form.liverFunction=2">
							异常
						</view>
						<view :class="form.liverFunction==1?'buttonChanges':'buttonChange'" @click="form.liverFunction=1">
							正常
						</view>
					</view>
				</view>
			</view>
			<view class="infos">
				<view class="flexAB">
					<view class="">
						肾功能
					</view>
					<view class="flexA">
						<view :class="form.kidneyFunction==2?'buttonChanges':'buttonChange'" @click="form.kidneyFunction=2">
							异常
						</view>
						<view :class="form.kidneyFunction==1?'buttonChanges':'buttonChange'" @click="form.kidneyFunction=1">
							正常
						</view>
					</view>
				</view>
			</view>
			<view class="infos">
				<view class="flexAB">
					<view class="">
						备孕情况
					</view>
					<view class="flexA">
						<view :class="form.pregnancy==2?'buttonChanges':'buttonChange'" @click="form.pregnancy=2">
							无
						</view>
						<view :class="form.pregnancy==1?'buttonChanges':'buttonChange'" @click="form.pregnancy=1">
							备孕中
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
					title: '问诊单',
					color: '#fff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#378EFF','#378EFF']],
					rightSlot:true,
				},
				form:{
					mainComplaint:'',
					imageUrl:'',
					allergy:2,
					allergyDesc:'',
					pastMedicalHistoryDesc:'',
					pastMedicalHistory:2,
					liverFunction:2,
					kidneyFunction:2,
					pregnancy:2
				},
			};
		},
		onLoad(option) {
			console.log(option)
			this.form = JSON.parse(option.data)
		},
		methods:{
			watchImg(){
				uni.previewImage({
					urls:[this.form.imageUrl]
				})
			},
			bindPickerChange(e){
				this.formIndex = e.detail.value
			},
			selctImg(){//打开本地相册
				let that = this
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['original', 'compressed'],
					count:1,
					success: (res) => {
						console.log(res)
						const tempFilePaths = res.tempFilePaths; //获取到本地图片地址
						console.log(tempFilePaths[0])
						/* 上传图片 */
						const uploadTask = uni.uploadFile({
							  url : 'https://pharos3.ewj100.com/file/upload',
							  filePath: tempFilePaths[0],
							  fileType: 'image',
							  methods: 'post',
							  name: 'file',
							  success: function (flieRes) {
								  console.log(flieRes.data)
							   if(flieRes.data){
								   that.form.imageUrl = JSON.parse(flieRes.data)
							   }
							  },
							  fail:function(reg){
								  console.log(reg)
							  }
						});
					}
				})
			},
			sublimt(){
				let data = {
					data:this.form,
					type:'Inquiries'
				}
				if(this.form.mainComplaint==''){
					uni.showToast({
						title:'请填写主诉',
						icon:"none"
					})
					return
				}else if(this.form.imageUrl==''){
					uni.showToast({
						title:'请上传图片',
						icon:"none"
					})
					return
				}else if(this.form.imageUrl==''){
					uni.showToast({
						title:'请上传图片',
						icon:"none"
					})
					return
				}else if(this.form.allergy==1&&this.form.allergyDesc==''){
					uni.showToast({
						title:'请填写过敏史',
						icon:"none"
					})
					return
				}else if(this.form.pastMedicalHistory==1&&this.form.pastMedicalHistoryDesc==''){
					uni.showToast({
						title:'请填写过往病史',
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
.Inquiries{
	min-height: 100vh;
	background: #f2f2f2;
	.slotRight{
		margin-right: 20rpx;
		color: #fff;
		font-size: 30rpx;
	}
	.info{
		.infos{
			padding: 48rpx 22rpx;
			background: #fff;
			border-bottom: 1px solid #ECECEC;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #222;
			.infosInfo{
				font-size: 28rpx;
				margin-top: 20rpx;
			}
			.buttonChange{
				width: 128rpx;
				height: 56rpx;
				background: rgba(242,242,242,1);
				opacity: 1;
				border-radius: 10rpx;
				text-align: center;
				line-height: 56rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #989898;
				margin: 0 20rpx;
			}
			.buttonChanges{
				width: 128rpx;
				height: 56rpx;
				background: rgba(222,236,255,1);
				opacity: 1;
				border-radius: 10rpx;
				text-align: center;
				line-height: 56rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color:#378EFF;
				margin: 0 20rpx;
			}
			.imgInfo{
				width: 220rpx;
				height: 290rpx;
				margin-top: 28rpx;
				position: relative;
				.imglist{
					width: 220rpx;
					height: 290rpx;
					display: flex;
					margin-right: 20rpx;
				}
				.mask{
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					background: rgba(0, 0, 0, .6);
					width: 100%;
					.buttonList{
						background: #fff;
						z-index: 10;
						position: absolute;
						bottom: 0;
						left: 0;
						font-size: 28rpx;
						right: 0;
						
						view{
							padding:20rpx 0 ;
							flex: 1;
							text-align: center;
							border-right: 1px solid #efefef;
							color: red;
						}
						view:last-child{
							border:none;
							color: #222;
						}
					}
				}
			}
			
			.upload{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 40px;
				color: #378EFF;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				width: 220rpx;
				height: 290rpx;
				background: rgba(242,242,242,1);
				border-radius: 20rpx;
				margin-top: 28rpx;
				margin-right: 20rpx;
				.uploadIcon{
					width: 34rpx;
					height: 34rpx;
				}
			}
		}
	}
}
</style>
