const checkPhone = (phone) =>{//手机正则验证
  if(!(/^1[3456789]\d{9}$/.test(phone))){ 
    return 0; //正则未通过
  } else{
    return 1//正则通过
  }
}

const upLoadImg=(file)=>{//文件上传
	uni.uploadFile({
		url: getApp().globalData.upLoadImgUrl, //仅为示例，非真实的接口地址
		filePath: file,
		name: 'file',
		success: (reg) => {
			let rega = JSON.parse(reg.data)
			if(rega.status == 0){
				return rega.msg
			}
		}
	});
}

const checkCode = (val) =>{//身份证校验code吗

  let p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

  let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];

  let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];

  let code = val.substring(17);

  if(p.test(val)) {

      let sum = 0;

      for(let i=0;i<17;i++) {

          sum += val[i]*factor[i];

      }

      if(parity[sum % 11] == code.toUpperCase()) {

          return true;

      }

  }

  return false;

}

const checkDate = (val)=>  {//身份证校验日期

  let pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;

  if(pattern.test(val)) {

      let year = val.substring(0, 4);

      let month = val.substring(4, 6);

      let date = val.substring(6, 8);

      let date2 = new Date(year+"-"+month+"-"+date);

      if(date2 && date2.getMonth() == (parseInt(month) - 1)) {

          return true;

      }

  }

  return false;

}

const checkID =  (val) =>{//身份证校验

  if(checkCode(val)) {

      let date = val.substring(6,14);

      if(checkDate(date)) {

          if(checkProv(val.substring(0,2))) {

              return true;

          }

      }

  }

  return false;

}

const checkProv =  (val) =>{//身份证校验地区

  let pattern = /^[1-9][0-9]/;

  let provs = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门"};

  if(pattern.test(val)) {

      if(provs[val]) {

          return true;

      }

  }

  return false;

}

const componTime =  (time, cFormat) =>{//时间戳转为年月日时分秒
	if (arguments.length === 0) {
	    return null;
	  }
	  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
	  let date;
	  if (typeof time === 'object') {
	    date = time;
	  } else {
	    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
	      time = parseInt(time);
	    }
	    if (typeof time === 'number' && time.toString().length === 10) {
	      time = time * 1000;
	    }
	    date = new Date(time);
	  }
	  const formatObj = {
	    y: date.getFullYear(),
	    m: date.getMonth() + 1,
	    d: date.getDate(),
	    h: date.getHours(),
	    i: date.getMinutes(),
	    s: date.getSeconds(),
	    a: date.getDay()
	  };
	  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
	    let value = formatObj[key];
	    // Note: getDay() returns 0 on Sunday
	    if (key === 'a') {
	      return ['日', '一', '二', '三', '四', '五', '六'][value];
	    }
	    if (result.length > 0 && value < 10) {
	      value = '0' + value;
	    }
	    return value || 0;
	  });
	  return time_str;
}

const dateToTimestamp=(dateStr)=> {
  return new Date(dateStr.replace(/-/g, "/")).getTime()
}





module.exports = {
	checkPhone,
	upLoadImg,
	checkID,
	componTime,
	dateToTimestamp
}