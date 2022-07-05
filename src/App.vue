<script setup lang="ts">
import { darkTheme, useOsTheme } from 'naive-ui';
import { reactive, watchEffect } from 'vue';
import { OSUtils } from './utils/OSUtils';
//set theme
const osThemeRef = useOsTheme();
const currentTheme = reactive({
  theme: {} as any
});
watchEffect(() => {
  osThemeRef.value === 'dark' ? currentTheme.theme = darkTheme : currentTheme.theme = null;
})

//get OS type
localStorage.setItem("os", new OSUtils().getBasicInfo().osType.toLowerCase())

const disableDrag = (e: any) => {
  e.preventDefault();
  e.dataTransfer.effectAllowed = 'none';
  e.dataTransfer.dropEffect = 'none';
}
window.addEventListener('dragenter', disableDrag);
window.addEventListener('dragover', disableDrag);
window.addEventListener('drop', disableDrag);
</script>
<template>
  <n-config-provider :theme="currentTheme.theme" inline-theme-disabled>
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
</style>
