<template>
  <div>
    <config-selector @change="onChangeConfig"></config-selector>
    {{ configName }}
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const configName = ref("Default")
const onChangeConfig = (e: string) => {
  configName.value = e
}
</script>

<style scoped lang="scss">
</style>