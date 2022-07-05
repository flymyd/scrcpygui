<template>
  <div>
    <p v-for="(item, i) in scrcpyInfo" :key="i">{{ item }}</p>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
const store = useStore()
const { scrcpyInfo } = storeToRefs(store);
</script>
<style scoped lang="scss">
</style>