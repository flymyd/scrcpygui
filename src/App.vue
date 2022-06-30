<script setup lang="ts">
import { computed, markRaw, reactive, watchEffect } from '@vue/runtime-core';
import { darkTheme, useOsTheme } from 'naive-ui';
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';
// const osThemeRef = useOsTheme();
// const osTheme = osThemeRef;
// const currentTheme = reactive({
//   theme: {} as any
// });
// watchEffect(()=>{
//   osThemeRef.value === 'dark' ? currentTheme.theme = darkTheme : currentTheme.theme = null;
// })
</script>

<template>
  <!-- <n-config-provider :theme="darkTheme"> -->
  <n-config-provider>
    <router-view></router-view>
  </n-config-provider>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
