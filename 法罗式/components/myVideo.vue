<template>
  <iframe :onload="onloadCode" style="width:100%;height:100%;border:1px solid #fff;background: #000;"></iframe>
</template>

<script setup>
	const props = defineProps({
	  videoUrl: String
	})
	let onloadCode = `
	const url = '${props.videoUrl}'  
	this.contentWindow.document.body.innerHTML = '<video style="width: 100%;height: 100%" controls="controls"  src="'+url+'"></video>'`
</script>


<style>
</style>
