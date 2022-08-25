<!-- <template>
  <div>
    窗
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
</script>
<style scoped lang="scss">
</style> -->


<template>
	<div>
    <h1>{{hello}}</h1>
    <button @click="hello='哼哼哼'">点我</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const hello = ref("Hello World!")
</script>