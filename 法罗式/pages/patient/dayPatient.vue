<template>
	<view class="dayPatiens">
		<!-- <view class="dayPatiena">
			<dayPicker></dayPicker>
		</view> -->
		<u-tabs :list="list1" @click="clickMenu" :activeStyle="{
            color: '#378EFF',
            fontWeight: 'bold',
            transform: 'scale(1.05)'
        }" style="background: #fff;"></u-tabs>
		<patientList :patientList="patientList" v-if="patientShow"></patientList>
	</view>
</template>

<script>
	import dayPicker from '@/components/dayPicker.vue'
	import patientList from '@/components/patientList.vue'
	import { divide,times} from '@/common/numPrecisions.js'
	export default {
		data() {
			return {
				list1: [{
					name: '按患者',
					id:0
				},{
					name: '按计划',
					id:1
				}],
				patientList:[
					{
						user:{
							avatar:''
						}
					}
				],
				patientShow:false,
				
			};
		},
		onLoad() {
				this.followUpPlanGetThisDayPatient()
		},
		methods:{
			clickMenu(e){
				console.log(e)
				this.patientShow = false
				if(e.id==0){
					this.followUpPlanGetThisDayPatient()
				}else{
					this.followUpPlanGetThisDayFollowUpPlan()
				}
				
			},
			followUpPlanGetThisDayPatient(){
				this.api.followUpPlanGetThisDayPatient('').then(res=>{
					console.log(res)
					if(res.code == 0){
						res.data.map(item=>item.baifenbi = times(divide(item.push,item.totalPush),100))
						
						this.patientList = res.data
						this.patientShow = true
					}
				})
			},
			followUpPlanGetThisDayFollowUpPlan(){
				this.api.followUpPlanGetThisDayFollowUpPlan('').then(res=>{
					console.log(res)
					if(res.code == 0){
						this.patientList = res.data
						this.patientShow = true
					}
				})
			}
		},
		components:{
			dayPicker,
			patientList,
		}
	}
</script>

<style lang="less" scoped>
.dayPatiens{
	background: #378EFF;
	padding-top:40rpx;
	.dayPatiena{
		
	}
}
</style>
