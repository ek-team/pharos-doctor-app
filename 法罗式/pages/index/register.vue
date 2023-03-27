<template>
	<view class="content">
		<hx-navbar ref="hxnb" :config="config">
		</hx-navbar>
		<!-- <view class="login_img"><image mode="aspectFill" src="/static/image/iamhe.png"></image></view> -->

		<view class="login_from">

			<view class="login_from_input">
				<view class="login_from_name">用户名</view>
				<view class="login_from_fun"><input type="text" v-model="username" placeholder="请输入用户名"></view>
			</view>
			<view class="login_from_input">
				<view class="login_from_name">手机号</view>
				<view class="login_from_fun"><input type="number" v-model="phone" placeholder="请输入手机号码"></view>
			</view>
			<view class="login_from_input">
				<view class="login_from_name">密码</view>
				<view class="login_from_fun"><input type="text" v-model="password" password="true" placeholder="请输入登录密码"></view>
			</view><view class="login_from_input">
				<view class="login_from_name">确认密码</view>
				<view class="login_from_fun"><input type="text" v-model="passwordAgain" password="true" placeholder="请确认密码"></view>
			</view>
<view class="login_from_input">
				<view class="login_from_name">邀请码</view>
				<view class="login_from_fun"><input type="text" v-model="invitationCode" placeholder="请输入邀请码"></view>
			</view>

			<!-- <view class="login_from_input">
				<view class="login_from_name">邀请码</view>
				<view class="login_from_fun">
					<input type="text" placeholder="请输入邀请码">
					<label class="cuIcon-scan cuicon"></label>
				</view>
			</view> -->

			<view class="login_from_dl">
				<button @click="register">注册</button>
			</view>

			<!-- <view class="logo_xieyi">
				<label @click="moutcl" :class="gouxSta?'cuIcon-squarecheckfill':'cuIcon-square'"></label>
				<view class="logo_text">请勾选并阅读<text>《注册协议》</text>及<text>《隐私协议》</text></view>
			</view> -->

		</view>

	</view>
</template>
<script>
	export default {

		data() {
			return {
				config: { //自定义头部配置信息
					title: '注册',
					color: '#222',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [1, ['#fff', '#fff']],
					rightSlot: true,
				},
				phone:'',
				username:'',
				password:'',
				passwordAgain:'',
				invitationCode:''//默认511
			}
		},
		onLoad() {},
		methods: {
			register(){
				let param = {
					deptId: this.invitationCode,
					nickname:this.username,
					password:this.password,
					phone:this.phone
				}
				if(!param.nickname){
					uni.showToast({
						title:'用户名不能为空',
						icon:'none'
					})
					return
				}
				if(!param.phone){
					uni.showToast({
						title:'手机号不能为空',
						icon:'none'
					})
					return
				}
				if(!param.password){
					uni.showToast({
						title:'密码不能为空',
						icon:'none'
					})
					return
				}if(param.password != this.passwordAgain){
					uni.showToast({
						title:'两次密码不一致',
						icon:'none'
					})
					return
				}
				if(param.deptId != '511'){
					uni.showToast({
						title:'邀请码不对',
						icon:'none'
					})
					return
				}
				this.api.registerUser(param).then(res=>{
					if(res.code ==0){
						uni.showToast({
							title:'注册成功',
							icon:'none'
						})
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.showToast({
							title:'注册失败',
							icon:'none'
						})
					}
				})
				
			}

		}
	}
</script>
<style>
	page {
		background: #fff;
	}

	.login_img {
		width: 100%;
		height: auto;
		margin-top: 90upx;
	}

	.login_img image {
		width: 170upx;
		height: 170upx;
		display: block;
		margin: 0px auto;
		border-radius: 50%;
	}

	.login_from {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 20upx 8%;
	}

	.login_from_input {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px #eee solid;
		padding: 40upx 0px;
		margin: 0px auto;
	}

	.login_from_name {
		width: 30%;
	}

	.login_from_fun {
		width: 80%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.login_from_fun input {
		width: 100%;
		text-align: left;
		font-size: 14px;
	}


	.login_from_dl {
		width: 100%;
		height: 50px;
		line-height: 50px;
		margin-top: 150upx;
	}

	.login_from_dl button {
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: rgba(55,142,255,1);
		color: #fff;
		border-radius: 50px;
	}

	.logo_xieyi {
		width: 100%;
		height: 40px;
		line-height: 40px;
		display: flex;
		flex-direction: row;
		margin-top: 30upx;
		align-items: center;
		color: #444;
		font-size: 14px;
		justify-content: center;
	}

	.logo_xieyi label {
		font-size: 18px;
		margin-right: 1%;
		display: block;
		width: 15px;
		height: 15px;
	}

	.cuIcon-squarecheckfill {
		color: #FF3B00;
	}

	.logo_text text {
		color: #FF3B00;
	}

	.getyzm {
		width: 60%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		color: #FF3B00;
	}

	.cuicon {
		font-size: 18px;
	}

	.regFrom_tom_yzlabel {
		width: 60%;
		text-align: right;
	}

	.cuIcon-squarecheckfill {
		background: #FF3B00;
		position: relative;
		border: 2px #ccc solid;
		box-sizing: border-box;
		border-radius: 3px;
	}

	.cuIcon-square {
		background: #fff;
		border: 2px #ccc solid;
		box-sizing: border-box;
		border-radius: 3px;
	}
</style>
