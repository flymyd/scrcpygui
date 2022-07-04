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
      <n-tag :class="scrcpyVersion ? 'scgui-tag-can-click' : ''" :bordered="false"
        :type="scrcpyVersion ? 'success' : 'error'" @click="showScrcpyInfo = true">
        Scrcpy{{ scrcpyVersion ? ` ${scrcpyVersion}` : '未找到' }}
      </n-tag>
    </div>
    <!-- If cannot located ADB or Scrcpy executable binary -->
    <div v-if="!adbVersion || !scrcpyVersion">
      <n-button type="error" size="large" @click="goSettings">{{ settingsHint }}</n-button>
      <!-- https://github.com/Genymobile/scrcpy#get-the-app -->
    </div>
    <!-- These functions must need ADB interfaces -->
    <div v-if="adbVersion">
      <n-button type="success" size="large" v-if="adbVersion && scrcpyVersion">开始镜像 →</n-button>
    </div>
  </div>
  <n-modal v-model:show="showScrcpyInfo" transform-origin="mouse" v-if="scrcpyVersion">
    <n-card style="width: 50%;" title="Scrcpy Info" :bordered="false" size="medium" role="dialog" aria-modal="true">
      <div class="flex-col">
        <span v-for="(info, i) in scrcpyInfo" :key="i">{{ info }}</span>
      </div>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { checkADBVersion, checkScrcpyVersion } from "@/utils/EnvUtils";
import { Process } from "@/utils/Process";
import { reactive, ref } from "@vue/reactivity";
import { hi } from "date-fns/locale";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import icon from "/icon.svg";

const store = useStore();
const router = useRouter();
const { scrcpyVersion, adbVersion, scrcpyInfo } = storeToRefs(store);
const showScrcpyInfo = ref(false);
//Check scrcpy installation status 
checkADBVersion();
checkScrcpyVersion();
const settingsHint = computed(() => {
  let info = '';
  if (!adbVersion.value) info += 'ADB ';
  if (!adbVersion.value && !scrcpyVersion.value) info += '及 ';
  if (!scrcpyVersion.value) info += 'Scrcpy ';
  return `请选择 ${info}可执行文件路径 →`
})
const goSettings = () => {
  router.push('MySettings')
}
</script>
<style scoped lang="scss">
@import "@/assets/css/Home.scss";
</style>