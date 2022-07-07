<template>
  <div>
    <n-list bordered>
      <template #header>
        手动配置
      </template>
      <n-list-item>
        <!-- <div class="flex-row row-center">
          <n-button size="large" round type="info" strong style="width: 80%;" @click="initTCPIP">
            初始化无线连接——我已经使用USB连接并在手机端打开ADB调试
          </n-button>
        </div> -->
        
      </n-list-item>
    </n-list>
  </div>
</template> 
<script setup lang="ts">
import { ref } from "@vue/reactivity";

const adbList = ref()
const initTCPIP = () => {

}
</script>
<style scoped lang="scss">
.n-button {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>