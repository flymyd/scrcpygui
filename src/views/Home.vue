<template>
  <div class="scgui-home flex-col">
    <img class="scgui-home-icon" :src="icon" />
    <n-gradient-text class="scgui-home-title" type="success">
      欢迎使用Scrcpy GUI
    </n-gradient-text>
    <div class="scgui-install-status flex-row">
      <n-tag :bordered="false" :type="adbVersion ? 'success' : 'error'">
        ADB{{ adbVersion ? ` ${adbVersion}` : '未找到' }}
      </n-tag>
      <n-tag :bordered="false" :type="scrcpyVersion ? 'success' : 'error'" @click="showScrcpyInfo = true">
        Scrcpy{{ scrcpyVersion ? ` ${scrcpyVersion}` : '未找到' }}
      </n-tag>
    </div>
  </div>
  <n-modal v-model:show="showScrcpyInfo" transform-origin="mouse">
    <n-card style="width: 50%;" title="Scrcpy Info" :bordered="false" size="medium" role="dialog" aria-modal="true">
      <div class="flex-col">
        <span v-for="(info, i) in scrcpyInfo" :key="i">{{info}}</span>
      </div>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { checkADBVersion, checkScrcpyVersion } from "@/utils/EnvUtils";
import { Process } from "@/utils/Process";
import { reactive, ref } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import icon from "/icon.svg";

const store = useStore();
const { scrcpyVersion, adbVersion, scrcpyInfo } = storeToRefs(store);
checkADBVersion();
checkScrcpyVersion();
const showScrcpyInfo = ref(false);
</script>
<style scoped lang="scss">
@import "@/assets/css/Home.scss";
</style>