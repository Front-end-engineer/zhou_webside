<template>
  <view class="introduce-picture">
    <image :src="bgUrl" mode="center" />
    <view class="text-wrap">
      <view class="title">{{ title }}</view>
      <text class="content">{{ content }}</text>
    </view>
    <slot name="btn"></slot>
  </view>
</template>

<script setup>
defineProps({
  // 使用绝对路径
  bgUrl: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
});
</script>

<style lang="less" scoped>
.introduce-picture {
  position: relative;
  width: 100%;
  height: 800rpx;
  > image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .text-wrap {
    position: absolute;
    left: 16%;
    top: 50%;
    transform: translateY(-50%);
    @media (max-width: 900px) {
      left: 8%;
      .title {
        font-size: 100rpx;
      }
      .content {
        font-size: 36rpx;
      }
    }
  }
  .title {
    font-size: 120rpx;
    margin-bottom: 18rpx;
  }
  .content {
    font-size: 44rpx;
    line-height: 80rpx;
  }
}
</style>
