<template>
  <n-layout has-sider class="scgui-main-container">
    <n-layout-sider bordered>
      <n-menu class="scgui-main-menu" :options="menuOptions" :render-label="renderMenuLabel" default-value="Home" />
    </n-layout-sider>
    <n-layout content-style="padding: 24px;">
      <router-view></router-view>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
import { start } from "@/core/index";
import { MenuOption } from "naive-ui";
import { h, ref } from "vue";
import { RouterLink } from "vue-router";
import { MenuList } from "@/router/MenuOptions";
const menuOptions: MenuOption[] = MenuList;
const renderMenuLabel = (option: MenuOption) => {
  if ('href' in option) {
    return h(
      'a',
      { href: option.href, target: '_blank' },
      option.label as string
    )
  } else if ('route' in option) {
    return h(
      RouterLink as any,
      {
        to: {
          name: option.name,
          params: option.params
        }
      },
      { default: () => option.label }
    )
  }
  return option.label as string
}
const open = () => {
  start();
}
</script>
<style scoped lang="scss">
@import "@/assets/css/Index.scss";
</style>