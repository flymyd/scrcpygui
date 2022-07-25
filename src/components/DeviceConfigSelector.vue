<template>
  <div class="device-config-selector">
    <n-select v-model:value="config" :options="configNames" :default-value="defaultValue"
      @update:value="onUpdateValue" />
  </div>
</template>
<script setup lang="ts">
import { useScrcpyConfigStore } from '@/store/ScrcpyConfigStore';
import { SelectBaseOption, SelectMixedOption } from 'naive-ui/es/select/src/interface';
import { storeToRefs } from 'pinia';
import { computed, PropType, ref } from 'vue';
const config = ref();
const props = defineProps({
  serial: {
    type: String as PropType<string>,
    default: ''
  }
})
const scrcpyConfigStore = useScrcpyConfigStore();
const { scrcpyConfigs } = storeToRefs(scrcpyConfigStore);
const defaultValue = ref('Default')
const configNames = computed(() => {
  let opts: SelectMixedOption[] = [];
  Object.keys(scrcpyConfigs.value).forEach(n => {
    opts.push({ label: n, value: n })
    const usingConfig = scrcpyConfigStore.deviceUsingConfigs[props.serial];
    if (usingConfig) {
      defaultValue.value = usingConfig;
    } else if (scrcpyConfigs.value[n].isDefault) {
      defaultValue.value = n;
    }
  })
  return opts;
})
const onUpdateValue = (value: string, option: SelectBaseOption | null | SelectBaseOption[]) => {
  scrcpyConfigStore.setDeviceUsingConfig(props.serial, value)
}
</script>

<style scoped lang="scss">
.device-config-selector {
  flex-wrap: nowrap;
  margin-right: 12px;
}
</style>