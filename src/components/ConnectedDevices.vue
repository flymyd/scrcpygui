<template>
  <div>
    <n-list bordered>
      <template #header>
        已连接设备数: {{ devices.length }}
      </template>
      <n-list-item v-for="serial in devices" :key="serial">
        <div class="scgui-devices flex-row">
          <span class="scgui-devices-serial">{{ serial }}</span>
          <div class="flex-row" style="width:100%;">
            <device-config-selector style="width:100%;" :serial="serial"></device-config-selector>
            <n-button ghost type="success" @click="openWithConfig(serial)">连接/断开连接</n-button>
          </div>
        </div>
      </n-list-item>
    </n-list>
  </div>
</template> 
<script setup lang="ts">
import { PropType, ref } from "vue";
import DeviceConfigSelector from "./DeviceConfigSelector.vue";
import { useScrcpyConfigStore } from '@/store/ScrcpyConfigStore';
import { ParamsParser } from "@/core/DecodeParams";
const scrcpyConfigStore = useScrcpyConfigStore();
const props = defineProps({
  devices: {
    type: Array as PropType<Array<string>>,
    default: []
  }
})
const openWithConfig = (serial: string) => {
  //寻找配置
  console.log(JSON.stringify(scrcpyConfigStore.getDeviceUsingConfig(serial)))
  const config = scrcpyConfigStore.getDeviceUsingConfig(serial);
  //TODO 根据配置启动
  const parser = new ParamsParser(config);
  parser.parse();
}
</script>
<style scoped lang="scss">
.scgui-devices {
  justify-content: space-between;
}

.scgui-devices-serial {
  width: 50%;
}
</style>