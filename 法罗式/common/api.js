import service from './request.js'

//首页订单信息统计


const login = (data) => {//
	
	return service.get({
	  url: '/oauth/token',
	  data,
	  queryString: true
	})
}

const userGetDoctorQrCode = (data) => {//医生二维码
	
	return service.get({
	  url: '/user/getDoctorQrCode',
	  data,
	  queryString: true
	})
}

const userUpdateById = (data) => {//修改密码
	
	return service.post({
	  url: '/user/updateById',
	  data,
	  queryString: true
	})
}

const doctorPointGetDoctorTotalPoint = (data) => {//查询医生总积分
	return service.get({
	  url: '/doctorPoint/getDoctorTotalPoint',
	  data,
	  queryString: true
	})
}
const doctorPointGetDoctorPoint = (data) => {//查询医生积分明细
	return service.get({
	  url: '/doctorPoint/getDoctorPoint',
	  data,
	  queryString: true
	})
}

const docInfo = (data) => {//
	
	return service.get({
	  url: '/user/info',
	  data,
	  queryString: true
	})
}
const upcomingGetCount = (data) => {//
	return service.get({
	  url: '/upcoming/getCount',
	  data,
	  queryString: true
	})
}
const getWaittingCount = (data) => {//获取待处理业务的数量
	return service.post({
	  url: '/chatUser/pageWaitChatUsersCount',
	  data,
	  queryString: true
	})
}
const upcomingPage = (data) => {//待处理业务项
	return service.post({
	  url: '/chatUser/pageWaitChatUsers',
	  data,
	  queryString: true
	})
}
const systemMsgPage = (data) => {//
	return service.get({
	  url: '/upcoming/page',
	  data,
	  queryString: true
	})
}

const allReader = (data) => {//
	return service.get({
	  url: '/upcoming/updateAllRead',
	  data,
	  queryString: true
	})
}

const chatMsgReadMsg = (data) => {//发送已读
	return service.get({
	  url: '/chatMsg/readMsg',
	  data,
	  queryString: true
	})
}

const endChatByChatUserId = (data) => {//结束会话
	return service.get({
	  url: '/chatUser/endChat',
	  data,
	  queryString: true
	})
}

const updateById = (data) => {//更新用户信息
	return service.post({
	  url: '/user/updateById',
	  data,
	  queryString: true
	})
}


const upcomingGetById = (data) => {//代办事项详情
	return service.get({
	  url: '/upcoming/getById',
	  data,
	  queryString: true
	})
}

const chatUserOpenChat = (data) => {//患者详情会话随访
	return service.get({
	  url: '/chatUser/openChat',
	  data,
	  queryString: true
	})
}

const chatUserPageChatUsers = (data) => {//首页消息列表
	return service.post({
	  url: '/chatUser/pageChatUsers',
	  data,
	  queryString: true
	})
}


const chatMsgQueryChatMsgHistory = (data) => {//聊天记录接口
	return service.post({
	  url: '/chatMsg/queryChatMsgHistory',
	  data,
	  queryString: true
	})
}


const commonTermsList = (data) => {//常用语列表
	return service.get({
	  url: '/commonTerms/list',
	  data,
	  queryString: true
	})
}

const commonTermsDeleteById = (data) => {//删除常用语
	return service.get({
	  url: '/commonTerms/deleteById',
	  data,
	  queryString: true
	})
}

const commonTermsUpdate = (data) => {//修改常用语
	return service.post({
	  url: '/commonTerms/update',
	  data,
	  queryString: true
	})
}

const commonTermsSave = (data) => {//添加常用语
	return service.post({
	  url: '/commonTerms/save',
	  data,
	  queryString: true
	})
}

const queryMyTeamNoResultHospital = (data) => {//医生所在的团队列表
	return service.get({
	  url: '/doctorTeam/queryMyTeamNoResultHospital',
	  data,
	  queryString: true
	})
}

const addUserGroup = (data) => {//添加患者分组
	return service.post({
	  url: '/userGroup/save',
	  data,
	  queryString: true
	})
}
const userGroupAddUserToGroup = (data) => {//添加患者到分组
	return service.post({
	  url: '/userGroup/addUserToGroup',
	  data,
	  queryString: true
	})
}
const updateUserGroup = (data) => {//修改患者分组
	return service.post({
	  url: '/userGroup/update',
	  data,
	  queryString: true
	})
}

const getUserNoGroup = (data) => {//查询未分组的患者
	return service.get({
	  url: '/userGroup/getUserNoGroup',
	  data,
	  queryString: true
	})
}
const getUserGroupDetail = (data) => {//查询未分组的患者
	return service.get({
	  url: '/userGroup/getById',
	  data,
	  queryString: true
	})
}

const userGroupDeleteById = (data) => {//查询未分组的患者
	return service.get({
	  url: '/userGroup/deleteById',
	  data,
	  queryString: true
	})
}


const searchUserGroup = (data) => {//查询分组下的患者
	return service.get({
	  url: '/userGroup/searchUserGroup',
	  data,
	  queryString: true
	})
}

const getUserGroup = (data) => {//查询分组下的患者
	return service.get({
	  url: '/userGroup/pageQuery',
	  data,
	  queryString: true
	})
}
const userGroupGetUserToGroupCount = (data) => {//查询分组列表
	return service.get({
	  url: '/userGroup/getUserToGroupCount',
	  data,
	  queryString: true
	})
}
const followUpPlanGetPatientUserByDoctor = (data) => {//医生下面的患者列表
	return service.get({
	  url: '/followUpPlan/getPatientUserByDoctor',
	  data,
	  queryString: true
	})
}

const followUpPlanSave = (data) => {//添加随访计划
	return service.post({
	  url: '/followUpPlan/save',
	  data,
	  queryString: true
	})
}

const followUpPlanPage = (data) => {//随访计划liebiao 
	return service.get({
	  url: '/followUpPlan/page',
	  data,
	  queryString: true
	})
}

const followUpPlanUpdateById = (data) => {//随访计划liebiao 
	return service.post({
	  url: '/followUpPlan/updateById',
	  data,
	  queryString: true
	})
}

const followUpPlanGetDetailById = (data) => {//随访计划liebiao 
	return service.get({
	  url: '/followUpPlan/getDetailById',
	  data,
	  queryString: true
	})
}

const formPageScoped = (data) => {//表单列表 
	return service.get({
	  url: '/form/pageMyScoped',
	  data,
	  queryString: true
	})
}

const userGroupPageQueryPatientUserSort = (data) => {//表单列表 
	return service.get({
	  url: '/userGroup/pageQueryPatientUserSort',
	  data,
	  queryString: true
	})
}

const followUpPlanGetThisDayPatient = (data) => {//查询今日计划的额患者
	return service.get({
	  url: '/followUpPlan/getThisDayPatient',
	  data,
	  queryString: true
	})
}



const followUpPlanGetThisDayFollowUpPlan = (data) => {//查询今日计划的额患者
	return service.get({
	  url: '/followUpPlan/getThisDayFollowUpPlan',
	  data,
	  queryString: true
	})
}

const doctorPatientOtherOrderId = (data) => {//图文咨询详情
	return service.get({
	  url: '/doctorPoint/getByPatientOtherOrderId',
	  data,
	  queryString: true
	})
}

const chatUserGetChat = (data) => {//查询是否有图文咨询申请
	return service.get({
	  url: '/chatUser/getChat',
	  data,
	  queryString: true
	})
}

const receiverPicConsultation = (data) => {//医生接受或者拒绝图文咨询
	return service.get({
	  url: '/chatMsg/receiverPicConsultation',
	  data,
	  queryString: true
	})
}

const doctorTeamQueryMyTeam = (data) => {//查询我的团队
	return service.get({
	  url: '/doctorTeam/queryMyTeam',
	  data,
	  queryString: true
	})
}

const formPageMyScoped = (data) => {//查询我的团队
	return service.get({
	  url: '/form/pageMyScoped',
	  data,
	  queryString: true
	})
}

const formSave = (data) => {//查询我的团队
	return service.post({
	  url: '/form/save',
	  data,
	  queryString: true
	})
}


const formGetById = (data) => {//表懂详情
	return service.get({
	  url: '/form/getById',
	  data,
	  queryString: true
	})
}

const formDeleteById = (data) => {//表懂详情
	return service.get({
	  url: '/form/deleteById',
	  data,
	  queryString: true
	})
}


const followUpPlanDoctorRemark = (data) => {//给患者添加备注信息
	return service.get({
	  url: '/followUpPlan/doctorRemark',
	  data,
	  queryString: true
	})
}
const userGroupGetUserOnGroup = (data) => {//患者详情页查询所在分组
	return service.get({
	  url: '/userGroup/getUserOnGroup',
	  data,
	  queryString: true
	})
}

const userGroupGetUserMoveGroup = (data) => {//患者详情页所能移动到的分组
	return service.get({
	  url: '/userGroup/getUserMoveGroup',
	  data,
	  queryString: true
	})
}
const userGroupMoveUserToGroup = (data) => {//移动患者到分组
	return service.post({
	  url: '/userGroup/moveUserToGroup',
	  data,
	  queryString: true
	})
}


const followUpPlanGetPatientDetail = (data) => {//患者详情
	return service.get({
	  url: '/followUpPlan/getPatientDetail',
	  data,
	  queryString: true
	})
}

const formUserDataGetDataByFormId = (data) => {//患者表单
	return service.get({
	  url: '/formUserData/getDataByFormId',
	  data,
	  queryString: true
	})
}
const getUserDataDetailByFormId = (data) => {//患者表单详情
	return service.get({
	  url: '/formUserData/getDataDetailByFormId',
	  data,
	  queryString: true
	})
}

const followUpPlanGetPatientAllPlan = (data) => {//患者全部计划
	return service.get({
	  url: '/followUpPlan/getPatientAllPlan',
	  data,
	  queryString: true
	})
}

const electronicCaseSave = (data) => {//添加病例
	return service.post({
	  url: '/electronicCase/save',
	  data,
	  queryString: true
	})
}

const followUpPlanGetFollowUpPlanContentDetail = (data) => {//查询节点详情
	return service.get({
	  url: '/followUpPlan/getFollowUpPlanContentDetail',
	  data,
	  queryString: true
	})
}

//
const followUpPlanUpdateFollowUpPlanContent = (data) => {//查询节点详情
	return service.post({
	  url: '/followUpPlan/updateFollowUpPlanContent',
	  data,
	  queryString: true
	})
}


const followUpPlanGetElectronicCaseList = (data) => {//患者病例列表
	return service.get({
	  url: '/followUpPlan/getElectronicCaseList',
	  data,
	  queryString: true
	})
}

const followUpPlanGetElectronicCaseDetail = (data) => {//患者病例详情
	return service.get({
	  url: '/followUpPlan/getElectronicCaseDetail',
	  data,
	  queryString: true
	})
}

const getFromTeamService = (data) => {// 团队跳过来的服务详情
	return service.get({
	  url: '/doctorUserAction/getTeamServiceDetail',
	  data,
	  queryString: true
	})
}

const doctorUserActionQueryService = (data) => {//服务设置列表
	return service.get({
	  url: '/doctorUserAction/queryService',
	  data,
	  queryString: true
	})
}

const doctorUserActionGetServiceDetail = (data) => {//服务设置详情
	return service.get({
	  url: '/doctorUserAction/getServiceDetail',
	  data,
	  queryString: true
	})
}

const doctorUserActionOpenService = (data) => {//添加服务设置
	return service.post({
	  url: '/doctorUserAction/openService',
	  data,
	  queryString: true
	})
}

const doctorUserActionUpdateService = (data) => {//添加服务设置
	return service.post({
	  url: '/doctorUserAction/updateService',
	  data,
	  queryString: true
	})
}


const appVersionUpdate = (data) => {//添加服务设置
	return service.get({
	  url: '/appVersion/update',
	  data,
	  queryString: true
	})
}
const doctorIsLeader = (data) => {//判断医生是否是leader
	return service.get({
	  url: '/doctorTeam/checkLeader',
	  data,
	  queryString: true
	})
}
const registerUser = (data) => {//注册用户
	return service.post({
	  url: '/user/register',
	  data,
	  queryString: true
	})
}
const logoutUser = () => {//注销医生账号
	return service.get({
	  url: '/user/cancel',
	  queryString: true
	})
}
const doctorCloseService = (data) => {//关闭图文咨询
	return service.get({
	  url: '/doctorUserAction/closeService',
	  data,
	  queryString: true
	})
}
const getChatAllMsgPic = (data) => {//获取聊天界面所有的图片
	return service.get({
	  url: '/chatMsg/queryAllMsgIMage',
	  data,
	  queryString: true
	})
}
const getArticles = (data) => {//获取患教文章
	return service.get({
	  url: '/article/page',
	  data,
	  queryString: true
	})
}
const getArticleDetail = (data) => {//获取患教文章详情
	return service.get({
	  url: '/article/getById',
	  data,
	  queryString: true
	})
}

export default {
	login,
	userGetDoctorQrCode,
	userUpdateById,
	doctorPointGetDoctorTotalPoint,
	doctorPointGetDoctorPoint,
	docInfo,
	upcomingGetCount,
	upcomingPage,
	systemMsgPage,
	allReader,
	chatMsgReadMsg,
	endChatByChatUserId,
	updateById,
	upcomingGetById,
	chatUserPageChatUsers,
	chatUserOpenChat,
	chatMsgQueryChatMsgHistory,
	commonTermsList,
	commonTermsDeleteById,
	commonTermsUpdate,
	commonTermsSave,
	
	queryMyTeamNoResultHospital,
	addUserGroup,
	userGroupAddUserToGroup,
	updateUserGroup,
	getUserNoGroup,
	getUserGroupDetail,
	userGroupDeleteById,
	getUserGroup,
	searchUserGroup,
	userGroupGetUserToGroupCount,
	
	followUpPlanGetPatientUserByDoctor,
	followUpPlanSave,
	followUpPlanPage,
	followUpPlanUpdateById,
	followUpPlanGetDetailById,
	formPageScoped,
	userGroupPageQueryPatientUserSort,
	followUpPlanGetThisDayPatient,
	followUpPlanGetThisDayFollowUpPlan,
	doctorPatientOtherOrderId,
	chatUserGetChat,
	receiverPicConsultation,
	doctorTeamQueryMyTeam,
	formPageMyScoped,
	formSave,
	formGetById,
	formDeleteById,
	followUpPlanDoctorRemark,
	userGroupGetUserOnGroup,
	userGroupGetUserMoveGroup,
	userGroupMoveUserToGroup,
	followUpPlanGetPatientDetail,
	formUserDataGetDataByFormId,
	getUserDataDetailByFormId,
	followUpPlanGetPatientAllPlan,
	electronicCaseSave,
	followUpPlanGetFollowUpPlanContentDetail,
	followUpPlanUpdateFollowUpPlanContent,
	followUpPlanGetElectronicCaseList,
	followUpPlanGetElectronicCaseDetail,
	getFromTeamService,
	doctorUserActionQueryService,
	doctorUserActionGetServiceDetail,
	doctorUserActionOpenService,
	doctorUserActionUpdateService,
	appVersionUpdate,
	getWaittingCount,
	doctorIsLeader,
	registerUser,
	logoutUser,
	doctorCloseService,
	getChatAllMsgPic,
	getArticles,
	getArticleDetail
}