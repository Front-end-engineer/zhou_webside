<template>
  <Header />
  <view class="index container">
    <!-- <IntroducePicture
      bgUrl="/static/images/bg/bg1.png"
      title="借贷中心"
      content="不仅仅是一个加密资产生态系统，更是一个\n蓬勃发展的国际性土区。这里有来自各行各业\n的用户，他们怀揣热忱通过线上线下的活动一起追寻\n共同的梦想，推动加密行业向前发展。"
    /> -->
    <image
      class="hero-bg"
      src="../../static/hero-bg.png"
      mode="widthFix"
    ></image>
    <view
      class="page-container"
      style="padding-top: 0rpx; padding-bottom: 40rpx"
    >
      <img
        class="topContentImg"
        src="https://api.synfutures.com/s3/config/1546efd6-f113-4bc9-a0b9-edd63a343fce.png"
        alt=""
      />
      <!-- 第一步，提交资料 -->
      <step1
        v-if="step === 1"
        @changeStep="changeStep"
        :isDetail="isDetail"
      ></step1>

      <!-- 第二步，常见问题 -->
      <step2 v-else-if="step === 2" @reSubmit="reSubmit"></step2>

      <!-- 第三步，合同签署 -->
      <step3 v-else-if="step === 3" @changeStep="changeStep"></step3>

      <!-- 我的借贷 -->
      <myLoan v-else-if="step === 4"></myLoan>
    </view>
  </view>
  <Footer />
</template>

<script setup>
import { getPinia } from "/src/stores/index";
import { getApplyInfo, getCreditState } from "@/api/index";
import step1 from "./components/step1.vue";
import step2 from "./components/step2.vue";
import step3 from "./components/step3.vue";
import myLoan from "./components/myLoan.vue";
import { onMounted, reactive } from "vue";
const store = getPinia();

const step = ref();

onMounted(() => {
  // let { credit_lending_quota } = store.loginInfo;
  // if(credit_lending_quota > 0) {
  //   step.value = 4;
  // } else {
  //   getApplyInfo().then(res=> {
  //     if(res.code == 1) {
  //     }
  //   })
  // }
  getCreditState().then((res) => {
    if (res.code == 1) {
      // 0=未申请额度 1=申请额度审核中 2=申请额度拒绝 3=额度申请但是未签合同 4=签订合同
      let state = res.data;
      if (state == 0) {
        step.value = 1;
      } else if (state == 1 || state == 2) {
        step.value = 2;
      } else if (state == 3) {
        step.value = 3;
      } else if (state == 4) {
        step.value = 4;
      }
    }
  });
});

const changeStep = (value) => {
  step.value = value;
};

const reSubmit = () => {
  step.value = 1;
};
</script>

<style scoped lang="less">
.index {
  min-height: calc(100vh - 48px);
}
</style>
