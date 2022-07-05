<template>
  <n-layout has-sider class="scgui-main-container">
    <n-layout-sider bordered>
      <n-menu class="scgui-main-menu" :options="menuOptions" :render-label="renderMenuLabel" default-value="Home"
        v-model:value="currentRoute" />
    </n-layout-sider>
    <n-layout content-style="padding: 24px;">
      <router-view></router-view>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
import { MenuOption, useMessage } from "naive-ui";
import { h, ref, resolveDirective, watch, withDirectives } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { MenuList } from "@/router/MenuOptions";
const nomove = resolveDirective('nomove') as any;
const menuOptions: MenuOption[] = MenuList;
const renderMenuLabel = (option: MenuOption) => {
  if ('href' in option) {
    return h(
      'div', [
      withDirectives(
        h('a',
          { href: option.href, target: '_blank' },
          { default: () => option.label }),
        [[nomove, '']]
      )
    ]
    )
  } else if ('route' in option) {
    return h(
      'div', [
      withDirectives(
        h(RouterLink as any,
          {
            to: {
              name: option.name,
              params: option.params
            }
          },
          { default: () => option.label }),
        [[nomove, '']]
      )
    ]
    )
  }
  return option.label as string
}
const router = useRouter();
const currentRoute = ref('Home');
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  const routeEndPoint = newValue.match(/([^/]+)$/);
  if (routeEndPoint && routeEndPoint.length > 0) {
    currentRoute.value = routeEndPoint[0]
  } else currentRoute.value = 'Home';
}, { immediate: true })
Object.assign(window, { "$message": useMessage() })
</script>
<style scoped lang="scss">
@import "@/assets/css/Index.scss";
</style>