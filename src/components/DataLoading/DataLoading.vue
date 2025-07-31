<template>
  <div class="loadingDiv" v-if="loading" v-loading="loading"></div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="less">
.loadingDiv {
  height: 1100rpx;
  ::v-deep .el-loading-mask {
    background: transparent;
  }
}
</style>
