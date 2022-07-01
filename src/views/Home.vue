<template>
  <div>
    <p>{{isInstallScrcpy}}</p>
    <p v-if="isInstallScrcpy">{{scrcpyVersion}}}</p>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { reactive } from "@vue/reactivity";
import { storeToRefs } from "pinia";
const store = useStore();
const {isInstallScrcpy, scrcpyVersion} = storeToRefs(store);
</script>
<style scoped lang="scss">
</style>