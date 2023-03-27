<template>
	<view class="container" @click="showDelete=false">
		<view class="addWords" @click="toAddWords">
			<view class="addItemImg"><image src="/static/images/blue_add_icon.png" class="addImg"></image></view>
			<view class="addItemText">添加常用语</view>
		</view>
		<view class="boxContainer" v-for="(item,index) in wordsList" :key='index' @longpress="showDeleteTool(index)" v-if="wordsList.length>0" @click="sendMessage(item)">
			<view class="listContainer" >
				<image src="/static/images/blue_edit.png" class="editText" @click.stop="editWords(item)"></image>
				{{item.text}}
			</view>
			<view class="deleteChat" v-if="showDelete&&deleteIndex==index" @click.stop="deleteWords(item)">删除</view>
		</view>
		<!-- 没有消息 -->
		<view class="noOrder" v-if="wordsList.length==0">
			<view class="noOrderText">
				还没有添加常用语
			</view>
		</view>
		<!-- 添加常用语 -->
		<u-popup :show="showAdd" mode='center' :round="10" >
			<view class="metaDialog">
				<view class="metaTitle">
					{{type=='add'?添加常用语:'修改'}}
				</view>
				<view class="meta">
					<input type="text" placeholder="请输入常用语" placeholder-class="formPlaceholder" class="formItem"
						v-model="commonWords" />
				</view>
				<view class="noteOperate">
					<view class="cancelNote" @click="cancelAdd">
						取消
					</view>
					<view class="confirmNote" @click="confirmSubmit">
						确认
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				targetId:null,
				commonWords:null,
				editCommonWords:null,
				id:null,
				wordsList:[],
				deleteIndex:null,
				showDelete:false,
				wordId:null,
				avatar:null,
				nickname:null,
				showAdd:false,
				type:'',
			}
		},
		onShow() {
			this.id=uni.getStorageSync('userId')
			// 常用语列表
			this.getWordsList()
		},
		onLoad(options) {
			if(options.targetId){
				this.targetId=options.targetId
			}
			this.avatar=options.avatar
			this.nickname=options.nickname
		},
		methods: {
			// 加载常用语列表
			getWordsList(){
				this.api.commonTermsList().then(res=>{
					console.log('列表',res.data)
					this.wordsList=res.data
				})
			},
			sendMessage(item){
				uni.navigateBack()
				let selfSendData={
					selfSend:true,
					type:'text',
					msg:item.text
				}
				uni.setStorageSync('selfSend',selfSendData)
				// console.log('发送消息',item.text)
			},
			// 打开添加常用语弹框
			toAddWords(){
				this.showAdd=true
				this.type='add'
			},
			// 取消添加
			cancelAdd(){
				this.showAdd=false
			},
			// 编辑常用语
			editWords(item){
				// console.log('编辑',item)
				this.wordId=item.id
				this.commonWords=item.text
				this.showAdd=true
				this.type='edit'
			},
			// 添加常用语按钮
			confirmSubmit(){
				if(!this.commonWords){
					uni.showToast({
						title:'请输入！',
						icon:'none'
					})
					return
				}
				if(this.type=='add'){
					console.log('添加',this.commonWords)
					this.api.commonTermsSave({
						text:this.commonWords
					}).then(res=>{
						if(res){
							uni.showToast({
								title:'添加成功',
								icon:'none'
							})
						}
						this.showAdd=false
						this.getWordsList()
					})
				}else{
					this.api.commonTermsUpdate({
						text:this.commonWords,
						id:this.wordId,
					}).then(res=>{
						uni.showToast({
							title:'修改成功',
							icon:'none'
						})
						this.showAdd=false
						this.getWordsList()
					})
				}
				// console.log('添加的常用语',this.commonWords)
			},
			// 展示删除框
			showDeleteTool(index){
				this.deleteIndex=index,
				this.showDelete=true
			},
			// 删除改常用语
			deleteWords(item){
				// console.log('删除',item)
				this.api.commonTermsDeleteById({
					id:item.id
				}).then(res=>{
					uni.showToast({
						title:'已删除',
						icon:'none'
					})
					this.showDelete=false
					this.getWordsList()
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F3F3F3;
	}
	/* 没有占位符 */
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
	.container{
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		/* align-items: center; */
	}
	/* 添加 */
	.addWords{
		padding: 40rpx;
		background-color: #FFFFFF;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-bottom: 40rpx;
	}
	.addItemImg{
		display: flex;
		flex:1;
		justify-content: center;
	}
	.addItemText{
		display: flex;
		flex:1;
		justify-content: center;
	}
	.addImg{
		width: 100rpx;
		height: 100rpx;
	}
	/* 列表 */
	.listContainer{
		margin-bottom: 40rpx;
		padding: 50rpx 40rpx 40rpx 40rpx;
		background-color: #FFFFFF;
		display: flex;
		
	}
	.editText{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 10rpx;
		top:10rpx
	}
	.boxContainer{
		position: relative;
	}
	/* 删除常用语 */
	.deleteChat {
		background-color: #FAF9F9;
		width: fit-content;
		padding: 20rpx 40rpx;
		box-shadow: darkgrey 10rpx 10rpx 10rpx 5rpx;
		z-index: 1000;
		position: absolute;
		left: 50%;
		bottom: 0;
		font-size: 28rpx;
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
			border-bottom: 1px solid #E5E5E5;
			height: 98rpx;
			margin-top: 78rpx;
			box-sizing: border-box;
	
			.formItem {
				height: 98rpx;
				line-height: 98rpx;
				font-size: 15px;
				color: #333;
			}
	
			.formPlaceholder {
				font-size: 14px;
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
				color: #1296db;
				border: 1px solid #1296db;
				line-height: 50px;
				font-size: 15px;
				text-align: center;
				margin: 0 auto;
				margin-top: 60px;
			}
	
			.confirmNote {
				width: 40%;
				height: 50px;
				background: linear-gradient(270deg, #108bc8 0%, #1296db 100%);
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
