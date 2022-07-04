<template>
  <div>
    <n-list bordered>
      <n-list-item>
        <n-thing title="随系统启动" />
        <template #suffix>
          <n-switch v-model:value="autoStart" />
        </template>
      </n-list-item>
      <n-list-item>
        <n-thing title="ADB可执行文件路径">
          <n-input type="text" :placeholder="placeholders.adbPath" @input="setAdbPath" v-model:value="adbPath" />
        </n-thing>
      </n-list-item>
      <n-list-item>
        <n-thing title="Scrcpy可执行文件路径">
          <n-input type="text" :placeholder="placeholders.scrcpyPath" @input="setScrcpyPath"
            v-model:value="scrcpyPath" />
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>
<script setup lang="ts">
import { mySettingsStore } from "@/store";
import { storeToRefs } from "pinia";

const mySettings = mySettingsStore();
const { autoStart, adbPath, scrcpyPath } = storeToRefs(mySettings);
const { setAdbPath, setScrcpyPath } = mySettings;
const placeholders = {
  adbPath: '请输入ADB可执行文件的路径, 如/opt/homebrew/bin/adb',
  scrcpyPath: '请输入Scrcpy可执行文件的路径, 如/opt/local/bin/scrcpy'
};
</script>
<style scoped lang="scss">
</style>