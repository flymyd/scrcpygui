<template>
  <div>
    <config-selector @change="onChangeConfig" @save="onSave"></config-selector>
    <n-card title="其它设置">
      <n-form label-placement="left" label-align="left" label-width="auto" require-mark-placement="right-hanging">
        <n-form-item label="禁用交互事件">
          <n-switch v-model:value="othersForm.readonly" />
        </n-form-item>
        <n-form-item label="保持亮屏">
          <n-switch v-model:value="othersForm.stayAwake" />
        </n-form-item>
        <n-form-item label="镜像时熄屏">
          <n-switch v-model:value="othersForm.closeScreen" />
        </n-form-item>
        <n-form-item label="退出时熄屏">
          <n-switch v-model:value="othersForm.closeScreenAfterDisconnected" />
        </n-form-item>
        <n-form-item label="禁止在镜像启动时自动点亮屏幕">
          <n-switch v-model:value="othersForm.autoScreenOn" />
        </n-form-item>
        <n-form-item label="为屏幕上的触摸提供指示">
          <n-switch v-model:value="othersForm.showTouches" />
        </n-form-item>
        <n-form-item label="关闭屏保">
          <n-switch v-model:value="othersForm.disableScreensaver" />
        </n-form-item>
        <n-form-item label="选择显示器">
         <n-input-number v-model:value="othersForm.monitor" clearable :precision="0" placeholder="请输入显示器序号" />
        </n-form-item>
        <n-form-item label="推送非APK文件的目标目录">
          <n-input v-model:value="othersForm.pushDestination" type="text" clearable placeholder="如/sdcard/Movies/" />
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
import { Others, Window } from '@/core/Interfaces';
const scrcpyStore = useScrcpyConfigStore();
const configName = ref("Default")
const onChangeConfig = (e: string) => {
  configName.value = e
}
const _othersFormProto_: any = {
  readonly: false,   //禁用交互事件, 只读
  monitor: null, //选择多显示器之中的一个
  stayAwake: false, //保持亮屏
  closeScreen: false, //镜像时熄屏
  closeScreenAfterDisconnected: false, //退出时熄屏
  autoScreenOn: false, //禁止在镜像启动时自动点亮屏幕
  showTouches: false, //为屏幕上的触摸提供指示
  disableScreensaver: false, //关闭屏保
  pushDestination: '', //推送非APK文件的目标目录, 如/sdcard/Movies/
};
const othersForm: Others = ref({})
const { scrcpyConfigs } = storeToRefs(scrcpyStore)
watchEffect(() => {
  othersForm.value = scrcpyConfigs.value[configName.value]?.window ?? _.clone(_othersFormProto_);
})
const onSave = () => {
  scrcpyStore.saveScrcpyConfig("others", unref(othersForm), configName.value)
  window.$message.success("保存完毕！");
}
</script>