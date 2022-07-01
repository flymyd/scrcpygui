<script setup lang="ts">
import { computed, markRaw, reactive, watchEffect } from '@vue/runtime-core';
import { darkTheme, useOsTheme } from 'naive-ui';
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';
import { useStore } from './store';
// const osThemeRef = useOsTheme();
// const osTheme = osThemeRef;
// const currentTheme = reactive({
//   theme: {} as any
// });
// watchEffect(()=>{
//   osThemeRef.value === 'dark' ? currentTheme.theme = darkTheme : currentTheme.theme = null;
// })

//Check scrcpy installation status 
const store = useStore();
const exec = require('child_process').exec;
let scrcpyWorker;
(function runExec() {
  scrcpyWorker = exec(`which scrcpy`)
  scrcpyWorker.stdout.on('data', function (data: String) {
    if (data.indexOf("not found") == -1) {
      store.scrcpyInstalled();
    }
  })
})()

</script>

<template>
  <n-config-provider :theme="darkTheme" inline-theme-disabled>
    <!-- <n-config-provider> -->
    <router-view></router-view>
  </n-config-provider>
</template>

<style lang="scss">
@import "@/assets/css/public.scss";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: default;
  user-select: none;
}
</style>
