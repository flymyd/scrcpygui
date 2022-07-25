<template>
  <div>
    <config-selector @change="onChangeConfig" @save="onSave"></config-selector>
    <n-card title="窗口设置">
      <n-form label-placement="left" label-align="left" label-width="auto" require-mark-placement="right-hanging">
        <n-form-item label="窗口标题">
          <n-input v-model:value="windowForm.title" type="text" clearable placeholder="默认为设备型号" />
        </n-form-item>
        <n-form-item label="窗口大小">
          <n-space>
            <n-input-number v-model:value="windowForm.width" clearable :precision="0" placeholder="请输入宽度, 单位 px" />
            <n-input-number v-model:value="windowForm.height" clearable :precision="0" placeholder="请输入高度, 单位 px" />
          </n-space>
        </n-form-item>
        <n-form-item label="窗口位置">
          <n-space>
            <n-input-number v-model:value="windowForm.xCoor" clearable :precision="0" placeholder="请输入X坐标, 单位 px" />
            <n-input-number v-model:value="windowForm.yCoor" clearable :precision="0" placeholder="请输入Y坐标, 单位 px" />
          </n-space>
        </n-form-item>
        <n-form-item label="无边框">
          <n-switch v-model:value="windowForm.borderless" />
        </n-form-item>
        <n-form-item label="总在顶部">
          <n-switch v-model:value="windowForm.alwaysOnTop" />
        </n-form-item>
        <n-form-item label="以全屏模式启动">
          <n-switch v-model:value="windowForm.fullscreen" />
        </n-form-item>
        <n-form-item label="屏幕旋转">
          <n-radio-group v-model:value="windowForm.rotation" name="radiogroup">
            <n-radio-button :value="0">默认: 不旋转</n-radio-button>
            <n-radio-button :value="1">逆时针旋转90°</n-radio-button>
            <n-radio-button :value="2">旋转180°</n-radio-button>
            <n-radio-button :value="3">顺时针旋转90°</n-radio-button>
          </n-radio-group>
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
import { Window } from '@/core/Interfaces';
const scrcpyStore = useScrcpyConfigStore();
const configName = ref("Default")
const onChangeConfig = (e: string) => {
  configName.value = e
}
const _windowFormProto_: any = {
  title: '', //设置scrcpy窗口标题，默认为设备型号
  xCoor: null, //窗口初始化时的X坐标
  yCoor: null, //窗口初始化时的Y坐标
  width: null, //窗口初始化时的宽度
  height: null, //窗口初始化时的高度
  borderless: false, //无边框
  alwaysOnTop: false, //总在顶部
  fullscreen: false, //以全屏模式启动
  rotation: 0, //屏幕旋转, 它只影响显示, 不影响录制
};
const windowForm: Window = ref({})
const { scrcpyConfigs } = storeToRefs(scrcpyStore)
watchEffect(() => {
  windowForm.value = scrcpyConfigs.value[configName.value]?.window ?? _.clone(_windowFormProto_);
})
const onSave = () => {
  scrcpyStore.saveScrcpyConfig("window", unref(windowForm), configName.value)
  window.$message.success("保存完毕！");
}
</script>