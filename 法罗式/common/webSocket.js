class webSocketClass {
  constructor(url, time) {
    this.url = url
    this.data = null
    this.isCreate = false // WebSocket 是否创建成功
    this.isConnect = false // 是否已经连接
    this.isInitiative = false // 是否主动断开
    this.timeoutNumber = time // 心跳检测间隔
    this.heartbeatTimer = null // 心跳检测定时器
    this.reconnectTimer = null // 断线重连定时器
    this.socketExamples = null // websocket实例
    this.againTime = 3 // 重连等待时间(单位秒)
  }

  // 初始化websocket连接
  initSocket() {
	  let openImage= uni.getStorageSync('openImage');
	  if(openImage){
		  uni.removeStorageSync('openImage')
		 return
	  }
    const _this = this
    this.socketExamples = uni.connectSocket({
      url: _this.url,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        _this.isCreate = true
        // console.log(res)
		console.log('websoket成功连接')
		this.createSocket() 
      },
      fail: (rej) => {
        console.error(rej)
        _this.isCreate = false
      }
    })
    
  }

  // 创建websocket连接
  createSocket() {
	  let that = this
    if (this.isCreate) {
      // console.log('WebSocket 开始初始化')
      // 监听 WebSocket 连接打开事件
      try {
        this.socketExamples.onOpen(() => {
			// console.log('已打开',getApp().globalData.docInfo)
		  // return
          this.isConnect = true
          clearInterval(this.heartbeatTimer)
          clearTimeout(this.reconnectTimer)
          // 打开心跳检测,发送认证
		  if(!getApp().globalData.docInfo||!getApp().globalData.docInfo.id){
			  return
		  }
		  let param = {
			msgType:"REQUEST_AUTH",
			userInfo:JSON.stringify({"id":getApp().globalData.docInfo.id,"nickname":getApp().globalData.docInfo.nickname})
		  			  
		  }
		  this.socketExamples.send({
		    data: JSON.stringify(param),
		    success(res) {
		      console.log('认证消息发送成功',res)
		      // resolve(true)
			  that.heartbeatCheck()
		    },
		    fail(error) {
		      // console.log('消息发送失败')
		  		  // console.log(error)
		      // reject(error)
		    }
		  })
          
		  
        })
        // 监听 WebSocket 接受到服务器的消息事件
        this.socketExamples.onMessage((res) => {
			if(JSON.parse(res.data).msgType!="PING"){
				console.log('收到消息1',JSON.parse(res.data).msgType)
				
			}
          uni.$emit('message', res)
		  let data = JSON.parse(res.data)
		  if (data.msgType == 'AUTH_REQUIRED') {
		  	console.log('收到认证失败')
			this.isInitiative = false
		  	this.reconnect()
		  	// return;
		  }else if (data.msgType == 'AUTH_RESULT' && data.data == true) {
			// console.log("认证成功")
			let oldData = uni.getStorageSync('sendData')
			console.log("重新发送消息数组", oldData)
			if (oldData && oldData.length > 0) {
				oldData.map((item,index,arr) => {
					this.sendAgainMessage(JSON.stringify(item),index);
				})
				uni.setStorageSync('sendData', [])
			}

			}
			// else if (data.msgType == 'PING') {
			// 	let chatPing = {
			// 		msgType: 'PONG',
			// 		clientType: "wx"
			// 	}
			// 	this.sendMsg(JSON.stringify(chatPing))
		 //    }else if(data.msgType != 'PONG'){
				
			// }
		  
        })
		
        // 监听 WebSocket 连接关闭事件
        this.socketExamples.onClose(() => {
          console.log('WebSocket 关闭了')
		  // this.sendMsg(JSON.stringify({
			 //  msgType:"PONG" 
		  // }))
          this.isConnect = false
          // this.reconnect()
        })
        // 监听 WebSocket 错误事件
        this.socketExamples.onError((res) => {
          console.log('WebSocket 出错了')
          console.log(res)
		  this.isInitiative = false
		  
		  this.isConnect = false
		  // this.initSocket()
		  this.reconnect()
        })
      } catch (error) {
        console.warn('连接失败',error)
      }
    } else {
      console.warn('WebSocket 初始化失败!')
    }
  }
  // 未发出去的消息
  sendAgainMessage(data,index) {
  	let that = this
  	let list=uni.getStorageSync('sendData')
  	this.socketExamples.send({
  		data: data,
  		success: () => {
  			list.splice(index,1)
  			uni.setStorageSync('sendData',list)
  			console.log('发送重复新消息成功')
  		},
  		fail: () => {
  			that.socketExamples.close();
			that.isInitiative = false
  			that.reconnect()
  			console.log('发送重复消息失败，重新连接socket')
  		}
  	})
  }

  // 发送消息
  sendMsg(value) {
	 console.log('发消息value',value)
	let that = this
	let repeat=false
    const param = value
	if(that.socketExamples&&that.socketExamples._callbacks&&that.socketExamples._callbacks.open.length>1){
		// console.log('删除数组')
		that.socketExamples._callbacks.open.shift()
		that.socketExamples._callbacks.close.shift()
		that.socketExamples._callbacks.error.shift()
		that.socketExamples._callbacks.message.shift()
	}
    return new Promise((resolve, reject) => {
      this.socketExamples.send({
        data: param,
        success(res) {
          // console.log('消息发送成功',res)
          resolve(true)
        },
        fail(error) {
          console.log('消息发送失败',this.socketExamples)
		  // console.log(error)
		  repeat=true
		  let oldData = uni.getStorageSync('sendData');
		  if (oldData) {
		  	if(oldData.length>0){
		  		for(let i=0;i<oldData.length;i++){
		  			let item=oldData[i]
		  			if(item.msgType==res.msgType&&item.msg==res.msg&&repeat){
		  				return
		  			}else{
		  				oldData.push(res)
		  			}
		  		}
		  	}else{
		  		oldData.push(res)
		  	}
		  	uni.setStorageSync('sendData', oldData)
		  } else {
		  	oldData = [];
		  	oldData.push(res)
		  	uni.setStorageSync('sendData', oldData)
		  }
		  // that.socketTask.close();
		  that.isInitiative = false
		  that.reconnect()
          reject(error)
        }
      })
    })
  }

  // 开启心跳检测
  heartbeatCheck() {
	  let that = this
    // console.log('开启心跳')
    that.data = {msgType:"PONG"}
    that.heartbeatTimer = setInterval(() => {
      that.sendMsg(JSON.stringify(that.data))
	  console.log(1111)
    }, that.timeoutNumber * 10000)
  }

  // 重新连接
  reconnect() {
    // 停止发送心跳
    clearTimeout(this.reconnectTimer)
    clearInterval(this.heartbeatTimer)
    // 如果不是人为关闭的话，进行重连
    if (!this.isInitiative) {
      this.reconnectTimer = setTimeout(() => {
        this.initSocket()
      }, this.againTime * 500)
    }
  }
  
  sendCloseSocket() {
	 let openImage= uni.getStorageSync('openImage', 'openImage');
	 if(openImage){
		 return;
	 }
  	let removeChannel = {
  		msgType: "REMOVE_CHANNEL",
  		clientType: "wx"
  	}
  	this.socketExamples.send({
  		data: JSON.stringify(removeChannel),
  		success: () => {
  			this.socketExamples.close();
  			console.log('发送退出app')
  		},
  		fail: () => {
  			console.log('发送退出app失败')
  		}
  	})
  
  }
	
  // 关闭 WebSocket 连接
  closeSocket(reason = '关闭') {
    const _this = this
    this.socketExamples.close({
      reason,
      success() {
        _this.data = null
        _this.isCreate = false
        _this.isConnect = false
        _this.isInitiative = true
        _this.socketExamples = null
        clearInterval(_this.heartbeatTimer)
        clearTimeout(_this.reconnectTimer)
        console.log('关闭 WebSocket 成功')
      },
      fail() {
        console.log('关闭 WebSocket 失败')
      }
    })
  }
}

export default webSocketClass