<template>
  <view class="subtitle-wrap">
    {{ title }}
  </view>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="less" scoped>
.subtitle-wrap {
  margin: 30rpx 0;
  font-size: 30rpx;
  &::before {
    content: "";
    display: inline-block;
    width: 8rpx;
    height: 32rpx;
    background: #3eebeb;
    margin-bottom: -6rpx;
    margin-right: 24rpx;
  }
}
</style>
