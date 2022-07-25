<template>
  <div>
    <n-list bordered>
      <template #header>
        手动配置
      </template>
      <n-list-item>
        <n-input-group>
          <n-input type="text" placeholder="请输入IP:端口号 ( 默认端口5555 )" v-model:value="fastConnect" />
          <n-button round type="info" strong @click="initTCPIP">
            打开无线连接
          </n-button>
        </n-input-group>
      </n-list-item>
    </n-list>
  </div>
</template> 
<script setup lang="ts">
import { Process } from "@/utils/Process";
import { ref } from "@vue/reactivity";
const fastConnect = ref('')
// const adbList = ref()
const initTCPIP = () => {
  new Process().exec({
    cmd: `scrcpy --tcpip`,
    stderr(err: string) {
      console.log(err)
    },
    stdout(out: string) {
      console.log(out)
    },
    close(out: string) {
      console.log(out)
    }
  })
}
</script>
<style scoped lang="scss">
</style>