<template>
  <div>
    <n-button @click="open">打开scrcpy</n-button>
  </div>
</template>
<script setup lang="ts">
import { start } from "@/core/index";
import { ref } from "vue";
const open = () => {
  start();
}
</script>