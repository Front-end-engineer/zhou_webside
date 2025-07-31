<template>
  <ThemeContainer style="margin-top: 60rpx">
    <view class="step-box">
      <view class="step-item">
        <image src="@/static/images/loan-step1.png" mode="scaleToFill" />
        <view>{{ $t('components.step2.250506-0') }}</view>
      </view>
      <view class="line"></view>
      <view class="step-item">
        <image src="@/static/images/loan-step2.png" mode="scaleToFill" />
        <view>{{ $t('components.step2.250506-1') }}</view>
      </view>
      <view class="line"></view>
      <view class="step-item">
        <image src="@/static/images/loan-step3.png" mode="scaleToFill" />
        <view>{{ $t('components.step2.250506-2') }}</view>
      </view>
    </view>
    <view class="step-tip" v-if="processState == 1"
      >{{ $t('components.step2.250506-3') }}</view
    >
    <view class="step-tip" v-if="processState == 2"
      >{{ $t('components.step2.250506-4') }}</view
    >
    <el-button
      class="sign_btn"
      type="primary"
      v-if="processState == 2"
      @click="reSubmit"
      >{{ $t('components.step2.250506-5') }}</el-button
    >
    <view class="step-tip" v-if="processState == 3"
      >{{ $t('components.step2.250506-6') }}</view
    >
    <el-button
      class="sign_btn"
      type="primary"
      v-if="processState == 3"
      @click="signContract"
      >{{ $t('components.step2.250506-7') }}</el-button
    >
  </ThemeContainer>
  <CustomCollapse :list="questtionList"></CustomCollapse>
</template>

<script setup>
import { getQuestionsList, getCreditState } from "@/api/index";
import { onMounted } from "vue";
import { defineEmits } from "vue";
const emits = defineEmits(["changeStep"]);

let processState = ref();
onMounted(() => {
  getCreditState().then((res) => {
    if (res.code == 1) {
      let state = res.data;
      processState.value = state;
    }
  });
});

const reSubmit = () => {
  emits("reSubmit");
};

const signContract = () => {
  emits("changeStep", 3);
};

let questtionList = ref();
const fetchQuestionsList = () => {
  getQuestionsList().then((res) => {
    if (res.code == 1) {
      questtionList.value = res.data;
    }
  });
};
fetchQuestionsList();
</script>

<style lang="scss" scoped>
.theme-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-box {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24rpx;

  .step-item {
    color: #fff;

    image {
      width: 114rpx;
      height: 114rpx;
    }

    &:first-child {
      image {
        width: 80rpx;
        height: 82rpx;
      }

      > view {
        margin-top: 20rpx;
        color: #5d829a;
      }
    }

    &:last-child {
      > view {
        color: #9f9fa3;
      }
    }
  }

  .line {
    height: 1rpx;
    background-color: #04606e;
    width: 20vw;
    margin-top: -30rpx;
  }
}

.step-tip {
  margin-top: 80rpx;
  margin-bottom: 20rpx;
  text-align: center;
  font-size: 38rpx;
}

.sign_btn {
  width: 100px;
  margin-top: 30px;
}
</style>
