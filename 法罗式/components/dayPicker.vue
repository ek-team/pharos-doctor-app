<template>
	<view class="dayPicker flexAB">
		<view class="dayPickerRight flexAB">
			<view class="dayList" v-for="(item,index) in weekList" :key="index">
				<view class="zhou">
					{{item.week}}
				</view>
				<view class="day">
					{{item.day}}
				</view>
				<u-badge :isDot="true" type="primary" style="display: flex;;margin: 0 auto;"></u-badge>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"dayPicker",
		data() {
			return {
				year:'',
				month:'',
				weekList:[]
			};
		},
		created() {
			this.compontDayMonth()
		},
		methods:{
			compontDayMonth(){
				let date = new Date()
				this.year = date.getFullYear(), //获取完整的年份(4位)
				this.month = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
				    // strDate = date.getDate() // 获取当前日(1-31)
				if (this.month < 10) this.month = `0${this.month}` // 如果月份是个位数，在前面补0
				  // if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0
				return this._setDate(this._addDate(date, -7))
			},
			_setDate (date) {
				console.log(date)
			    let weekList = [] // 周列表
			    let passed = date.getDay() - 1
			    let _date = this._addDate(date, passed * -1) // 获取周一的时间
			    this.currentWeekFirst = new Date(_date)
			    for (let i = 0; i < 7; i++) {
			      let _ = this.format(i === 0 ? _date : this._addDate(_date, 1))
			      weekList.push(_)
			    }
			    return weekList
			},
			_addDate (date, n) {
				return new Date(date.setDate(date.getDate() + n))
			},
			format (date) {
				let year = date.getFullYear().toString().slice(2, 4)
				let month = (date.getMonth() + 1).toString()
				let day = date.getDate().toString()
				let w = date.getDay()
				let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][w] + ' '
				let arr  = week + [day].map(item => item[1] ? item : '0' + item)
				
				this.weekList.push({
					'week':arr.split(' ')[0],
					'day':arr.split(' ')[1],
				})
			}

		}
	}
</script>

<style lang="less" scoped>
.dayPicker{
	padding: 30rpx;
	background: #fff;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	.dayPickerLeft{
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-direction: column;
		.month{
			font-size: 18px;
			color: #666;
			margin-bottom: 10rpx;
		}
		.year{
			color: #666;
			font-size: 18px;
			margin-top: 10rpx;
		}
	}
	.dayPickerRight{
		overflow-x: auto;
		flex: 1;
		// margin-left: 50rpx;
		.dayList{
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			flex-direction: column;
			
			.zhou{
				width:100%;
				color: #666;
				text-align: center;	
				font-size: 24rpx;
				
			}
			.day{
				width:100%;
				color: #222;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				margin: 10rpx 0 ;
				text-align: center;	
			}
			
		}
	}
}
</style>