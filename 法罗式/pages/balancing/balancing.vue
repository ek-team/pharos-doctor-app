<template>
	<web-view :src="src"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
			}
		},
		onLoad(opt) {
			const access_token = uni.getStorageSync('userInfoFLS').access_token
			const userId = opt.userId
			// this.src = `http://192.168.9.99:3333/#/result?access_token=${access_token}&userId=${userId}`
			this.src = `https://home.ekang.tech/pf/#/record?access_token=${access_token}&userId=${userId}`
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
