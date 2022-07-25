<template>
  <div>
    <config-selector @change="onChangeConfig" @save="onSave"></config-selector>
    <n-card title="输入设置">
      <n-form label-placement="left" label-align="left" label-width="auto" require-mark-placement="right-hanging">
        <n-form-item label="关闭剪贴板自动同步">
          <n-switch v-model:value="inputControlForm.disableClipBoardAutoSync" />
        </n-form-item>
        <n-form-item label="物理键盘模拟">
          <n-switch v-model:value="inputControlForm.hidKeyboard" />
        </n-form-item>
          <n-form-item label="物理鼠标模拟">
          <n-switch v-model:value="inputControlForm.boolean" />
        </n-form-item>
          <n-form-item label="转发所有鼠标按钮">
          <n-switch v-model:value="inputControlForm.forwardAllClicks" />
        </n-form-item>
          <n-form-item label="禁止转发按下键的重复事件">
          <n-switch v-model:value="inputControlForm.noKeyRepeat" />
        </n-form-item>
        <n-form-item label="文本注入模式">
          <n-radio-group v-model:value="inputControlForm.textInjection" name="radiogroup">
            <n-radio-button :value="0">默认</n-radio-button>
            <n-radio-button :value="1">PREFER_TEXT</n-radio-button>
            <n-radio-button :value="2">RAW_KEY_EVENTS</n-radio-button>
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
import { InputControl, Window } from '@/core/Interfaces';
const scrcpyStore = useScrcpyConfigStore();
const configName = ref("Default")
const onChangeConfig = (e: string) => {
  configName.value = e
}
const _inputControlFormProto_: any = {
  disableClipBoardAutoSync: false,  //关闭剪贴板自动同步
  hidKeyboard: false, //物理键盘模拟
  hidMouse: false, //物理鼠标模拟
  forwardAllClicks: false,  //转发所有鼠标按钮
  textInjection: 0, //文本注入模式, --prefer-text或--raw-key-events
  noKeyRepeat: false, //禁止转发按下键的重复事件
};
const inputControlForm: InputControl = ref({})
const { scrcpyConfigs } = storeToRefs(scrcpyStore)
watchEffect(() => {
  inputControlForm.value = scrcpyConfigs.value[configName.value]?.window ?? _.clone(_inputControlFormProto_);
})
const onSave = () => {
  scrcpyStore.saveScrcpyConfig("input", unref(inputControlForm), configName.value)
  window.$message.success("保存完毕！");
}
</script>