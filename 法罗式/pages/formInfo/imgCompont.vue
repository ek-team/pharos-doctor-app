<template>
	<view class="inputCompont">
		<hx-navbar ref="hxnb" :config="config">
			<view class="" slot="right" class="slotRight flexA" @click="sublimt">
				保存 
			</view>
		</hx-navbar>
		<view class="tips">
			标题预览
		</view>
		<view class="infos">
			<view class="">
				{{form.name}}
			</view>
			<!-- <view class="flexA" >
				<view class="upload" @click="selctImg">
					<image src="/static/images/icon_add@3x2.png" mode="" class="uploadIcon"></image>
					<view class="">
						上传图片
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
			</view> -->
			
		</view>
		<view class="tips">
			属性编辑
		</view>
		<view class="inputInfos">
			<view class="">标题</view>
			<input type="text" v-model="form.name" placeholder="请输入标题" class="inputInfoa">
		</view>
		<view class="tips">
			属性设置
		</view>
		<view class="isMust flexAB" >
			必填项 
			<u-switch v-model="form.isMust" ></u-switch>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{//自定义头部配置信息
					title: '图片',
					color: '#222',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1,['#fff','#fff']],
					rightSlot:true,
				},
				form:{
					name:'',
					placeholder:'',
					type:5,
					isMust:false,
					formOptionsList:[],
					imageUrl:''
				},
				index:-1,
			};
		},
		onLoad(option){
			console.log(option)
			if(option){
				this.form = JSON.parse(option.data)
				this.index = option.index
			}
			
		},
		methods:{
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
				this.form.isMust = this.form.isMust?1:0
				let data  = {
					form:this.form,
					index:this.index
				}
				uni.setStorageSync('addFormData',data)
				uni.$emit('addFormData',data)
				uni.navigateBack({
					delta: this.index==-1?2:1
				})
			},
			watchImg(){
				uni.previewImage({
					urls:[this.form.imageUrl]
				})
			},
		}
	}
</script>

<style lang="less" scoped>
.inputCompont{
	min-height: 100vh;
	background: #f2f2f2;
	.slotRight{
		color: #222;
		font-size: 30rpx;
		margin-right: 30rpx;
		
	}
	.isMust{
		padding:32rpx 22rpx ;
		background: #fff;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #444444;
	}
	.tips{
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		padding: 22rpx;
		color: #888888;
	}
	.inputInfos{
		padding:32rpx 22rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #444444;
		background: #fff;
		.inputInfoa{
			width: 650rpx;
			border: 2rpx solid #ECECEC;
			opacity: 1;
			border-radius: 10rpx;
			padding: 40rpx 28rpx;
			margin: 28rpx 0;
		}
	}
	.inputInfo{
		width: 706rpx;
		padding:32rpx 22rpx;
		
		background: rgba(255,255,255,1);
		border: 2rpx dashed #378EFF;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #444444;
		.placeholder{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #989898;
			width: 600rpx;
			height: 200rpx;
			margin-top: 30rpx;
			.imgInfo{
				width: 176rpx;
				height: 176rpx;
				background: rgba(242,242,242,1);
				opacity: 1;
				border-radius: 20rpx;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #888888;
				flex-direction: column;
				.imaIcon{
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
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
</style>
