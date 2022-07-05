<template>
  <div>
    <n-list bordered>
      <!-- <n-list-item>
        <n-thing title="随系统启动" />
        <template #suffix>
          <n-switch v-model:value="autoStart" />
        </template>
      </n-list-item> -->
      <n-list-item>
        <n-thing title="ADB可执行文件路径 ( adb.exe或adb )">
          <n-input-group>
            <n-input type="text" :placeholder="placeholders.adbPath" @input="setAdbPath" v-model:value="adbPath" />
            <n-upload :max="1" ref="adbSelector" :show-cancel-button="false" :default-upload="false"
              :show-remove-button="false" :show-retry-button="false" :show-file-list="false"
              :show-preview-button="false" @change="selectAdbPath">
              <n-button type="primary" ghost>选择</n-button>
            </n-upload>
          </n-input-group>
        </n-thing>
      </n-list-item>
      <n-list-item>
        <n-thing title="Scrcpy可执行文件路径 ( scrcpy.exe或scrcpy )">
          <n-input-group>
            <n-input type="text" :placeholder="placeholders.scrcpyPath" @input="setScrcpyPath"
              v-model:value="scrcpyPath" />
            <n-upload :max="1" ref="scrcpySelector" :show-cancel-button="false" :default-upload="false"
              :show-remove-button="false" :show-retry-button="false" :show-file-list="false"
              :show-preview-button="false" @change="selectScrcpyPath">
              <n-button type="primary" ghost>选择</n-button>
            </n-upload>
          </n-input-group>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>
<script setup lang="ts">
import { mySettingsStore } from "@/store";
import { fil } from "date-fns/locale";
import { UploadFileInfo, UploadInst } from "naive-ui";
import { storeToRefs } from "pinia";
import { getCurrentInstance, onMounted, ref } from "vue";
const mySettings = mySettingsStore();
const { adbPath, scrcpyPath } = storeToRefs(mySettings);
const { setAdbPath, setScrcpyPath } = mySettings;
const placeholders = {
  adbPath: '请输入ADB可执行文件的路径, 如/opt/homebrew/bin/adb',
  scrcpyPath: '请输入Scrcpy可执行文件的路径, 如/opt/local/bin/scrcpy'
};
const adbSelector = ref<UploadInst | null>(null)
const selectAdbPath = (options: any) => {
  setAdbPath(options.file.file.path)
  setTimeout(() => {
    adbSelector.value?.clear();
  })
}
const scrcpySelector = ref<UploadInst | null>(null)
const selectScrcpyPath = (options: any) => {
  setScrcpyPath(options.file.file.path)
  setTimeout(() => {
    scrcpySelector.value?.clear();
  })
}
</script>
<style scoped lang="scss">
.n-upload {
  width: auto;
}
</style>