<template>
  <div>
    1233
    <n-button @click="open">打开scrcpy</n-button>
  </div>
</template>
<script setup lang="ts">
import {start} from "@/core/index.js";
const open = () => {
  start();
}
</script>