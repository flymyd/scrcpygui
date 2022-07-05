<script setup lang="ts">
import { darkTheme, useOsTheme } from 'naive-ui';
import { onMounted, reactive, watchEffect } from 'vue';
import { OSUtils } from './utils/OSUtils';
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

body::-webkit-scrollbar {
  display: none;
}
</style>
