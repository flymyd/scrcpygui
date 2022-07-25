<template>
  <div class="config-select">
    <n-form label-placement="left" label-width="auto" require-mark-placement="right-hanging" :show-feedback="false">
      <n-form-item label="配置文件">
        <n-select class="config-selector" v-model:value="config" :options="configNames" :default-value="defaultValue"
          @update:value="onUpdateValue" />
        <n-button secondary strong type="success" @click="saveConfig">
          <template #icon>
            <s-icon icon="bx:save" size="16"></s-icon>
          </template>
        </n-button>
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
const config = ref();
const emits = defineEmits<{
  (e: 'change', value: string): void,
  (e: 'save'): void,
}>()
const scrcpyConfigStore = useScrcpyConfigStore();
const { scrcpyConfigs } = storeToRefs(scrcpyConfigStore);
const defaultValue = ref('Default')
const configNames = computed(() => {
  let opts: SelectMixedOption[] = [];
  Object.keys(scrcpyConfigs.value).forEach(n => {
    opts.push({ label: n, value: n })
    if (scrcpyConfigs.value[n].isDefault) {
      defaultValue.value = n;
      emits('change', n)
    }
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
const saveConfig = () => {
  emits('save');
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

.n-button:last-child {
  margin-left: 10px;
}
</style>