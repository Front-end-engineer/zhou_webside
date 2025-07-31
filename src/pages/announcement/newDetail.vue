<template>
  <Header />
  <image class="hero-bg" src="../../static/hero-bg.png" mode="widthFix"></image>
  <view class="container">
    <view class="page-content">
      <el-button
        @click="toBack"
        class="operator_btn"
        size="large"
        style="margin-left: 0; margin-bottom: 10px"
        >{{ $t('announcement.newDetail.065966-0') }}</el-button
      >
      <DataLoading :loading="isDataLoading" style="margin-top: 194rpx" />
      <view class="top">
        <view class="title">{{ newsContent.title }}</view>
        <view class="subtitle">{{ newsContent.subhead }}</view>
        <view class="time">{{ newsContent.create_time }}</view>
        <!-- <image :src="newsContent.img" mode="widthFix"></image> -->
      </view>
      <div class="news" v-html="newsContent.content"></div>
      <el-button @click="toBack" size="large" class="operator_btn"
        >{{ $t('announcement.newDetail.065966-0') }}</el-button
      >
    </view>
  </view>
  <Footer />
</template>

<script setup>
// import Footer from './footer.vue';
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getNewsDetail } from "@/api/index";

let isDataLoading = ref(false);
let newsContent = ref("");

onLoad((options) => {
  isDataLoading.value = true;
  let { id } = options;
  getNewsDetail({ id }).then((res) => {
    isDataLoading.value = false;
    if (res.code == 1) {
      newsContent.value = res.data;
    }
  });
});

const toBack = () => {
  window.history.back();
};
</script>

<style lang="less" scoped>
.container {
  max-width: 680px;
  margin: 1.5rem auto 0;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  border-radius: 1rem;

  @media screen and (max-width: 900px) {
    padding: 20rpx;
  }

  .page-content {
    position: relative;
    margin-top: 50px;
    margin-bottom: 50px;
    background: var(--content-bg);
    padding: 20px 30px;
    border-radius: var(--bRadius);
    display: flex;
    flex-direction: column;
  }

  .top {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .title {
      color: white;
      font-size: var(--bTitle);
      font-weight: 700;
    }

    .subtitle {
      color: white;
      font-size: var(--sTitle);
      font-weight: 700;
    }

    .time {
      font-size: 0.9rem;
      color: var(--operator-bg);
    }

    image {
      width: 100%;
      border-radius: 8px;
    }
  }

  .news {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .el-button {
    border-radius: 20px;
    margin: 0 auto;
  }
}
</style>
