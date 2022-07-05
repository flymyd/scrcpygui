<template>
  <div class="scgui-home flex-col">
    <img class="scgui-home-icon" :src="icon" />
    <n-gradient-text class="scgui-home-title" type="success">
      欢迎使用Scrcpy GUI
    </n-gradient-text>
    <div class="scgui-install-status flex-row">
      <n-tag :bordered="false" type="info">
        Scrcpy GUI v1.24
      </n-tag>
      <n-tag :bordered="false" :type="adbVersion ? 'success' : 'error'">
        ADB{{ adbVersion ? ` ${adbVersion}` : '未找到' }}
      </n-tag>
      <n-tag :class="scrcpyVersion ? 'scgui-tag-can-click' : ''" :bordered="false"
        :type="scrcpyVersion ? 'success' : 'error'" @click="showScrcpyInfo = true">
        Scrcpy{{ scrcpyVersion ? ` ${scrcpyVersion}` : '未找到' }}
      </n-tag>
    </div>
    <!-- If cannot located ADB or Scrcpy executable binary -->
    <n-button v-if="!adbVersion || !scrcpyVersion" type="error" size="large" @click="goSettings">{{ settingsHint }}
    </n-button>
    <no-executable v-if="!adbVersion || !scrcpyVersion" style="width: 100%;"></no-executable>
    <!-- These functions must need ADB interfaces -->
    <div v-if="adbVersion">
      <n-button type="success" size="large" v-if="adbVersion && scrcpyVersion" @click="start">开始镜像 →</n-button>
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
import { reactive, ref } from "@vue/reactivity";
import { hi } from "date-fns/locale";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import icon from "/icon.svg";
import { getAttachedDevices } from "@/utils/Adb";
import NoExecutable from "@/components/NoExecutable.vue";
import { checkADBVersion, checkScrcpyVersion } from "@/utils/EnvUtils";

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
const start = async () => {
  const devices: any = await getAttachedDevices().catch(err => {
    return err;
  })
  console.log(devices)
  if (devices.length < 1) {
    //无设备逻辑
    return false;
  } else if (devices.length === 1) {
    //单设备逻辑，判断连接模式
  } else {
    //选择连接设备
  }
  // new Process().exec({
  //   cmd: 'scrcpy -d',
  //   stderr(err: string) {
  //     console.log(err)
  //   },
  //   stdout(out: string) {
  //     console.log(out)
  //   }
  // })
}
</script>
<style scoped lang="scss">
@import "@/assets/css/Home.scss";
</style>