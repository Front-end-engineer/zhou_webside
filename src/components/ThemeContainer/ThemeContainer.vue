<template>
  <view class="theme-container">
    <slot></slot>
  </view>
</template>

<script setup></script>

<style lang="less" scoped>
.theme-container {
  background: var(--main-color);
  border-radius: 12px;
  padding: 58rpx;
  margin-bottom: 48rpx;
}
</style>
