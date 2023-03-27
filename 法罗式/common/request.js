let config = {
	url:'https://pharos3.ewj100.com'
	// url:'https://health.hzsysf.com'
}
// https://pharos3.ewj100.com/oauth/token?username=admin&password=pharosbto1&randomStr=55711671529860129&code=&grant_type=password
let requestStatus = true //防止接口重复 true允许请求，false不允许

	
export default {//导出接口对象
  async get(params) {
    return await this.requests(params, 'GET');
    
  },
  async post(params) {
    
    return await this.requests(params, 'POST')
  },
  requests(params, type) {
    let url = config.url + params.url
	let userInfo = uni.getStorageSync('userInfoFLS'),
      method = type,
      header = params.header || {},
      data = params.data;
    method = method.toUpperCase();
    header['content-type'] = params.queryString ? 'application/json' : 'application/json';
	//设置请求头
	if(params.url.indexOf('user/register')<0){
		
	header['Authorization'] = params.url!=='/oauth/token'?'Bearer '+ userInfo.access_token:'Basic dGVzdDp0ZXN0'
	}
    
    return new Promise((ResultCode, err) => {
		uni.request({
		  url,
		  method,
		  header,
		  data,
		  dataType: 'json',
		  timeout: 5000,
		  sslverify: false,
		  success: res => {
			requestStatus = true
			if (typeof res === Boolean) {//返回response
			  ResultCode(res)
			} else {
			  ResultCode(res.data)
			}
		    switch (res.data.code) {//状态码控制
		      case 1://参数请求错误
		        //后端请求错误
		        uni.showToast({
		          title: res.data.msg,
		          icon: 'none'
		        });
		        break;
			  case 401://token过期
				uni.removeStorage({
					key:'userInfoFLS'
				})
				getApp().globalData.userInfo =null
				uni.redirectTo({
					url:'/pages/index/login'
				})
				break;
				case 500://token过期
				 uni.showToast({
				   title: '网络错误',
				   icon: 'none'
				 });
				  break;
			  default:
						
		    }
		    typeof params.success == "function" && params.success(res.data);
		  },
		  fail: (e) => {
		    console.log("网络请求fail:" + JSON.stringify(e));
		    uni.hideLoading();
			requestStatus = true
		    typeof params.fail == "function" && params.fail(e.data);
		  }
		})
		
      
    })
	}
  }