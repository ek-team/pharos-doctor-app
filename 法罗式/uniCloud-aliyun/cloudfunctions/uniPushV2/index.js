// 简单的使用示例  
'use strict';
const uniPush = uniCloud.getPushManager({
	appId: "__UNI__FBC5308"
}) //注意这里需要传入你的应用appId  
// exports.main = async (event, context) => {  
//     return await uniPush.sendMessage({  
//         "push_clientid": "3286209b81ee39c8122284ea3ebe2297", //张伦手机    //填写上一步在uni-app客户端获取到的客户端推送标识push_clientid  
//         // "push_clientid": "faf52e0c82013edd17e0a0ed75bb6d44",//焦恒手机     //填写上一步在uni-app客户端获取到的客户端推送标识push_clientid  
//         "force_notification":true,  //填写true，客户端就会对在线消息自动创建“通知栏消息”。  
//         "title": "通知栏显示的标题",      
//         "content": "通知栏显示的内容",  
//         "payload": {  
//             "text":"体验一下uni-push2.0"  
//         }  
//     })  
// };
exports.main = async (event) => {
	let obj = JSON.parse(event.body)
	const res = await uniPush.sendMessage({
		"push_clientid": obj.cids, // 设备id，支持多个以数组的形式指定多个设备，如["cid-1","cid-2"]，数组长度不大于1000  
		"title": obj.title, // 标题  
		"content": obj.content, // 内容  
		"payload": obj.data, // 数据  
		"force_notification": true, // 服务端推送 需要加这一句  
		"request_id": obj.request_id, //请求唯一标识号，10-32位之间；如果request_id重复，会导致消息丢失  
		"options": obj.options, //消息分类，没申请可以不传这个参数  

	})
};