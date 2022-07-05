<template>
  <div class="scgui-no-exec">
    <n-card :title="cardTitle">
      <div class="flex-col">
        <p>您的系统是{{ osPlatform }}。</p>
        <div class="flex-row">
          <n-button size="large" round type="info" v-if="!adbVersion" strong @click="download(0)">下载ADB</n-button>
          <n-button size="large" round type="info" v-if="!scrcpyVersion" strong @click="download(1)">下载Scrcpy</n-button>
        </div>
        <div v-if="hintText.text.length > 0" class="scgui-no-exec-hint flex-col">
          <span v-for="(hint, i) in hintText.text" :key="i">{{ hint }}</span>
        </div>
      </div>
    </n-card>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { computed, reactive, ref } from "vue";
const store = useStore();
const { scrcpyVersion, adbVersion } = storeToRefs(store);
const cardTitle = computed(() => {
  let info = '';
  if (!adbVersion.value) info += 'ADB ';
  if (!adbVersion.value && !scrcpyVersion.value) info += '及 ';
  if (!scrcpyVersion.value) info += 'Scrcpy ';
  return `没有安装 ${info}?`
})

const osPlatform = ref("");
const platform = localStorage.getItem("os");
if (platform!.includes("win32")) {
  osPlatform.value = "Windows";
} else if (platform!.includes("darwin")) {
  osPlatform.value = "macOS"
} else {
  osPlatform.value = "Other Unix-like"
}
const adbDownloadHref = ref("")
const scrcpyDownloadHref = ref("https://github.com/Genymobile/scrcpy#get-the-app")
const hintText = reactive({
  text: [
    'Unix-like系统需要使用包管理器安装Scrcpy, 因为它依赖于一些编解码库.'
  ] as string[]
});
switch (osPlatform.value) {
  case "Windows":
    adbDownloadHref.value = "https://github.com/Genymobile/scrcpy/releases/tag/v1.24"
    scrcpyDownloadHref.value = "https://github.com/Genymobile/scrcpy/releases/tag/v1.24"
    let hint = [] as string[];
    hint.push("请将页面翻到底部找到Assets, 然后根据系统版本下载zip包并解压.")
    hint.push("如不知道则选择win64版本.")
    hint.push("文件夹的路径不建议含有中文名及标点等.")
    hint.push("解压后请前往软件设置中选择程序的路径, 然后返回首页检查是否应用成功.")
    hintText.text = hint;
    break;
  case "macOS":
    adbDownloadHref.value = "https://dl.google.com/android/repository/platform-tools-latest-darwin.zip";
    hintText.text.push('macOS用户推荐使用MacPorts进行安装Scrcpy及ADB.')
    hintText.text.push('当然, Homebrew也是可以的, 但源可能存在版本较旧的情况.')
    if (!adbVersion.value) {
      hintText.text.push('sudo port android-platform-tools')
    }
    if (!scrcpyVersion.value) {
      hintText.text.push('sudo port install scrcpy')
    }
    break;
  default:
    if (!scrcpyVersion.value) {
      hintText.text.push('尽管通过包管理器安装是较为便捷的方法, 但源可能存在版本较旧的情况.')
      hintText.text.push(`点击"下载Scrcpy"按钮可以在Packaging Status中查阅到各种包管理器所能提供的最新发行版.`)
      hintText.text.push('如果发行版本低于v1.24, 那么建议参阅文档中的BUILD小节进行手动编译.')
      hintText.text.push('如果依然决定使用低于v1.24的版本, 请勿使用新版本中的特性选项.')
    }
    adbDownloadHref.value = "https://dl.google.com/android/repository/platform-tools-latest-linux.zip";
    break;
}
const download = (type: number) => {
  const { shell } = require('electron');
  if (type) {
    shell.openExternal(scrcpyDownloadHref.value)
  } else {
    shell.openExternal(adbDownloadHref.value)
  }
}
</script>
<style scoped lang="scss">
.scgui-no-exec {
  margin-top: 18px;
}

.n-button {
  margin-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.scgui-no-exec-hint {
  margin-top: 10px;
  font-size: 16px;
  span{
    line-height: 2em;
  }
}
</style>