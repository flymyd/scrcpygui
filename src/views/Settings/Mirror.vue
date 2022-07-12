<template>
  <div>
    <config-selector @change="onChangeConfig" @save="onSave"></config-selector>
    <!-- {{ configName }} -->
    <n-card title="镜像设置">
      <n-form label-placement="left" label-align="left" label-width="auto" require-mark-placement="right-hanging">
        <n-form-item label="分辨率">
          <n-input v-model:value="mirrorForm.reduceSize" type="text" clearable placeholder="长边的最大值" />
        </n-form-item>
        <n-form-item label="码率(M)">
          <n-input-number v-model:value="mirrorForm.changeBitRate" clearable :precision="0" placeholder="请输入码率, 单位 M" />
        </n-form-item>
        <n-form-item label="帧率">
          <n-input-number v-model:value="mirrorForm.maxFps" clearable :precision="0" placeholder="请输入镜像最大帧速率" :min="1"
            :max="360" />
        </n-form-item>
        <n-form-item label="裁剪">
          <n-input v-model:value="mirrorForm.crop" type="text" clearable placeholder="长边的最大值" />
        </n-form-item>
        <n-form-item label="锁定镜像画面方向">
          <n-radio-group v-model:value="mirrorForm.screenOrientation" name="radiogroup">
            <n-radio-button :value="0">默认: 自然方向</n-radio-button>
            <n-radio-button :value="1">逆时针旋转90°</n-radio-button>
            <n-radio-button :value="2">旋转180°</n-radio-button>
            <n-radio-button :value="3">顺时针旋转90°</n-radio-button>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="编码器">
          <n-input-group>
            <n-input v-model:value="mirrorForm.encoder" type="text" clearable placeholder="请输入编码器名称" />
            <n-button type="info" @click="detectEncoder" :loading="isDetecting" ghost>检测编码器</n-button>
          </n-input-group>
        </n-form-item>
      </n-form>
    </n-card>
    <n-modal v-model:show="showEncoderList">
      <n-card style="width: 70%" title="可选编码器" :bordered="true" role="dialog" aria-modal="true">
        <n-list bordered>
          <n-list-item v-for="encoder in encoderList.list" :key="encoder">
            <div class="flex-row" style="justify-content: space-between;">
              <span>{{ encoder }}</span>
              <n-button type="success" @click="chooseEncoder(encoder)">选择</n-button>
            </div>
          </n-list-item>
        </n-list>
      </n-card>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { useStore } from '@/store';
import { getDeviceEncoders } from '@/utils/EnvUtils';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';
const store = useStore();
const { scrcpyVersion, adbVersion, connectedDeviceList, scrcpyInfo } = storeToRefs(store);
const configName = ref("Default")
const onChangeConfig = (e: string) => {
  configName.value = e
}
const mirrorForm = reactive({
  reduceSize: undefined, //将镜像分辨率的长边降为该值，短边等比缩放。如设备分辨率为1920*1080，设置1024后变为1024*576
  changeBitRate: 8, //镜像码率，默认为8M
  maxFps: 60, //采集帧率上限
  crop: '', //可以对设备屏幕进行裁剪，只镜像屏幕的一部分。如scrcpy --crop 1224:1440:0:0 即为显示以 (0,0) 为原点的1224x1440像素区域
  screenOrientation: 0, //屏幕方向 0:自然方向 1:逆时针旋转90° 2:180° 3:顺时针旋转90°
  encoder: '', //选择编码器
})

const isDetecting = ref(false);
const showEncoderList = ref(false);
const encoderList = reactive({
  list: [] as string[]
});
const detectEncoder = () => {
  const deviceNum = Object.keys(connectedDeviceList.value).length;
  if (deviceNum < 1) {
    window.$message.warning("当前没有已连接的设备！");
    return false;
  } else if (deviceNum === 1) {
    isDetecting.value = true;
    getDeviceEncoders().then(res => {
      encoderList.list = res as string[];
      showEncoderList.value = true;
    }).catch(err => {
      console.log(err)
      window.$message.error("检测编码器失败！");
    }).finally(() => {
      isDetecting.value = false;
    })
  } else {
    window.$message.warning("当前连接设备数大于1, 请自行获取编码器详情");
  }
}
const chooseEncoder = (encoder: string) => {
  mirrorForm.encoder = encoder;
  showEncoderList.value = false;
}
const onSave = () => {
  console.log(JSON.stringify(mirrorForm))
}
</script>

<style scoped lang="scss">
</style>