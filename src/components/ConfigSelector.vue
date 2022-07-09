<template>
  <div class="config-select">
    <n-form ref="formRef" label-placement="left" label-width="auto" require-mark-placement="right-hanging">
      <n-form-item label="配置文件">
        <n-select class="config-selector" v-model:value="serial" :options="configNames" default-value="Default"
          @update:value="onUpdateValue" />
        <n-button secondary strong @click="openConfigSettings">
          <template #icon>
            <s-icon icon="ant-design:setting-outlined" size="16"></s-icon>
          </template>
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>
<script setup lang="ts">
import { useScrcpyConfigStore } from '@/store/ScrcpyConfigStore';
import { SelectBaseOption, SelectMixedOption } from 'naive-ui/es/select/src/interface';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ipcRenderer } from 'electron'
const serial = ref();
const emits = defineEmits<{
  (e: 'change', value: string): void
}>()
const scrcpyConfigStore = useScrcpyConfigStore();
const { scrcpyConfigs } = storeToRefs(scrcpyConfigStore);
const configNames = computed(() => {
  let opts: SelectMixedOption[] = [];
  Object.keys(scrcpyConfigs.value).forEach(n => {
    opts.push({ label: n, value: n })
  })
  return opts;
})
const onUpdateValue = (value: string, option: SelectBaseOption | null | SelectBaseOption[]) => {
  emits('change', value)
}
const router = useRouter();
const openConfigSettings = () => {
  router.push({
    name: 'Configs'
  })
}
</script>

<style scoped lang="scss">
.config-select {
  margin-bottom: 20px;
  flex-wrap: nowrap;
}

.config-selector {
  margin-right: 12px;
}
</style>