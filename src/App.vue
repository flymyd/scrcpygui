<script setup lang="ts">
import { darkTheme, useOsTheme } from 'naive-ui';
import { OSUtils } from './utils/OSUtils';
// const osThemeRef = useOsTheme();
// const osTheme = osThemeRef;
// const currentTheme = reactive({
//   theme: {} as any
// });
// watchEffect(()=>{
//   osThemeRef.value === 'dark' ? currentTheme.theme = darkTheme : currentTheme.theme = null;
// })

//get OS type
localStorage.setItem("os", new OSUtils().getBasicInfo().osType.toLowerCase())
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
