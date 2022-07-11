<template>
  <div>
    <n-layout class="scgui-config-container">
      <n-layout-header position="absolute" style="top: 0;">
        <div class="scgui-config-header flex-row">
          <s-icon icon="eva:arrow-back-fill" size="16" @click="goBack" slot-style="margin-left: 10px;">返回</s-icon>
          <n-button quaternary @click="openAddForm">
            <s-icon icon="carbon:add" size="16"></s-icon>
          </n-button>
        </div>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;padding-top: 12px;" position="absolute" style="top: 50px;"
        :native-scrollbar="false">
        <div class="flex-col">
          <div class="scgui-config">
            <n-list bordered>
              <n-list-item v-for="configKey in Object.keys(scrcpyConfigs)" :key="configKey">
                <n-thing :title="configKey">
                  <span v-if="scrcpyConfigs[configKey].intro">{{ scrcpyConfigs[configKey].intro }}</span>
                </n-thing>
                <template #suffix>
                  <div class="scgui-config-btn-group flex-row">
                    <template v-if="!scrcpyConfigs[configKey].isDefault">
                      <n-button type="warning" @click="setDefault(configKey)">设为默认</n-button>
                      <n-popconfirm v-if="configKey !== 'Default'" @positive-click="deleteConfig(configKey)">
                        <template #trigger>
                          <n-button type="error">删除</n-button>
                        </template>
                        你确定要删除这个配置文件吗？
                      </n-popconfirm>
                    </template>
                    <template v-else>
                      <n-button type="success">默认配置</n-button>
                    </template>
                  </div>
                </template>
              </n-list-item>
            </n-list>
          </div>
        </div>
      </n-layout-content>
    </n-layout>
    <n-modal v-model:show="showAddModal" preset="card" style="width: 80%;" title="新建配置项" size="medium" embedded
      :bordered="false">
      <n-form ref="addFormRef" :model="addFormModel" :rules="addFormRules" label-placement="top">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="24" label="配置名" path="configName">
            <n-input v-model:value="addFormModel.configName" maxlength="20" show-count clearable
              placeholder="请输入配置名, 只可使用数字、字母及下划线, 且必须以字母开头" />
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="备注" path="intro">
            <n-input v-model:value="addFormModel.intro" maxlength="50" show-count clearable placeholder="请输入备注" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="设为默认项" path="isDefault">
            <n-switch v-model:value="addFormModel.isDefault" />
          </n-form-item-gi>
          <n-form-item-gi :span="12">
            <div style="display: flex; justify-content: flex-end;width: 100%;">
              <n-button round type="primary" @click="addConfig">
                保存
              </n-button>
            </div>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { useScrcpyConfigStore } from '@/store/ScrcpyConfigStore';
import { computed, reactive } from '@vue/runtime-core';
import { FormRules, FormItemRule, FormInst } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const scrcpyStore = useScrcpyConfigStore();
const { scrcpyConfigs } = storeToRefs(scrcpyStore);

const router = useRouter();
const goBack = () => {
  router.go(-1)
}
const showAddModal = ref(false);
const addFormModel = reactive({
  configName: '',
  intro: '',
  isDefault: false
});
const addFormRules: FormRules = reactive({
  configName: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('需要填写配置名')
        } else if (!/^(?![0-9_])\w+$/.test(value)) {
          return new Error('只可使用数字、字母及下划线, 且必须以字母开头')
        }
        return true;
      },
      trigger: ['input', 'blur']
    }
  ],
})
const openAddForm = () => {
  addFormModel.configName = '';
  addFormModel.intro = '';
  addFormModel.isDefault = false;
  showAddModal.value = true
}
const addFormRef = ref<FormInst | null>(null)
const addConfig = (e: MouseEvent) => {
  e.preventDefault()
  addFormRef.value?.validate((errors) => {
    if (!errors) {
      scrcpyStore.addScrcpyConfig(addFormModel.configName, {
        intro: addFormModel.intro, isDefault: addFormModel.isDefault
      });
      showAddModal.value = false;
    }
  })
}
const setDefault = (key: string) => {
  scrcpyStore.saveScrcpyConfig("isDefault", true, key);
}
const deleteConfig = (key: string) => {
  scrcpyStore.deleteScrcpyConfig(key);
}
</script>
<style scoped lang="scss">
.scgui-config-container {
  min-height: 100vh;
}

.scgui-config {
  /* min-height: 100vh; */
  overflow: scroll;
}

.scgui-config::-webkit-scrollbar {
  display: none;
}

.scgui-config-header {
  padding: 24px;
  padding-top: 12px;
  justify-content: space-between;
}

.scgui-config-btn-group {
  .n-button:nth-child(n+1) {
    margin-right: 10px;
  }
}

.s-icon {
  cursor: pointer;
}
</style>