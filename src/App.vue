<script setup lang="ts">
import { darkTheme, useOsTheme } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, watchEffect } from 'vue';
import { useStore } from './store';
import { getAttachedDevices } from './utils/Adb';
import { OSUtils } from './utils/OSUtils';
 import { zhCN, dateZhCN } from 'naive-ui'
//set theme
const osThemeRef = useOsTheme();
const currentTheme = reactive({
  theme: {} as any
});
watchEffect(() => {
  osThemeRef.value === 'dark' ? currentTheme.theme = darkTheme : currentTheme.theme = null;
})

//get OS Platform
localStorage.setItem("os", new OSUtils().getBasicInfo().osPlatform.toLowerCase())

//scan connected to adb devices serial
const store = useStore();
const { scrcpyVersion, adbVersion, scrcpyInfo, connectedDeviceList } = storeToRefs(store);
async function wait(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
const getDevicesList = async () => {
  while (true) {
    await wait(1000);
    if (adbVersion.value && scrcpyVersion.value) {
      const devices: any = await getAttachedDevices().catch(err => {
        return err;
      })
      connectedDeviceList.value = devices;
    }
  }
}
onMounted(() => {
  getDevicesList();
})
</script>
<template>
  <n-config-provider :theme="currentTheme.theme" inline-theme-disabled :locale="zhCN">
    <n-message-provider placement="top-right">
      <router-view></router-view>
    </n-message-provider>
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

body::-webkit-scrollbar {
  display: none;
}
</style>
