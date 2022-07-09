<template>
  <div>
    <n-layout class="scgui-config-container">
      <n-layout content-style="padding: 24px;padding-top: 12px;">
        <div class="flex-col">
          <div class="scgui-config-header">
            <n-button quaternary @click="goBack">
              <template #icon>
                <s-icon icon="eva:arrow-back-fill" size="16"></s-icon>
              </template>
            </n-button>

          </div>
          <div class="scgui-config">
            配置文件管理
          </div>
        </div>
      </n-layout>
    </n-layout>
  </div>
</template>
<script setup lang="ts">import { useRouter } from 'vue-router';
const router = useRouter();
const goBack = () => {
  router.go(-1)
}
</script>
<style scoped lang="scss">
.scgui-config-container {
  min-height: 100vh;
}

.scgui-config {
  height: 100vh;
  overflow: scroll;
}

.scgui-config::-webkit-scrollbar {
  display: none;
}

.scgui-config-header {
  padding-bottom: 6px;
}
</style>