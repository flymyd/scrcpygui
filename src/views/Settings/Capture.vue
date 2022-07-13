<template>
  <div>
    <config-selector @change="onChangeConfig" @save="onSave"></config-selector>
    <n-card title="录制和采集设置">
      <n-form label-placement="left" label-align="left" label-width="auto" require-mark-placement="right-hanging">
        <n-form-item label="录制保存路径">
          <n-input-group>
            <n-input type="text" placeholder="输入录制文件的保存文件夹路径" v-model:value="captureForm.recordFile" />
          </n-input-group>
        </n-form-item>
        <n-form-item label="仅录制而不进行屏幕镜像">
          <n-switch v-model:value="captureForm.recordWithoutMirror" />
        </n-form-item>
        <n-form-item label="显示缓冲时延(ms)">
          <n-input-number v-model:value="captureForm.displayBuffer" clearable :precision="0"
            placeholder="请输入显示缓冲时延, 单位ms" style="width: 100%;" />
        </n-form-item>
        <n-divider>V4L2回环串流仅Linux可用</n-divider>
        <n-form-item label="V4L2串流设备名">
          <n-input v-model:value="captureForm.v4l2loopback" type="text" clearable placeholder="形如/dev/video[X]" />
        </n-form-item>
        <n-form-item label="V4L2串流缓冲时延(ms)">
          <n-input-number v-model:value="captureForm.v4l2Buffer" clearable :precision="0"
            placeholder="请输入V4L2串流缓冲时延, 单位ms" style="width: 100%;" />
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>
<script setup lang="ts">
import * as _ from 'lodash'
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, ref, unref, watchEffect } from 'vue';
import { useScrcpyConfigStore } from '@/store/ScrcpyConfigStore';
import { Capture } from '@/core/Interfaces';
const scrcpyStore = useScrcpyConfigStore();
const configName = ref("Default")
const onChangeConfig = (e: string) => {
  configName.value = e
}
const _captureFormProto_: any = {
  recordFile: '',  //录制屏幕的文件保存路径
  recordWithoutMirror: false, //是否仅录制而不进行屏幕镜像
  displayBuffer: null, //设置显示缓冲时延，单位ms
  v4l2loopback: '', //设置V4L2回环串流设备
  v4l2Buffer: null,   //设置V4L2回环串流缓冲时延，单位ms
};
const captureForm: Capture = ref({})
const { scrcpyConfigs } = storeToRefs(scrcpyStore)
watchEffect(() => {
  captureForm.value = scrcpyConfigs.value[configName.value]?.capture ?? _.clone(_captureFormProto_);
})
const onSave = () => {
  scrcpyStore.saveScrcpyConfig("capture", unref(captureForm), configName.value)
  window.$message.success("保存完毕！");
}
</script>