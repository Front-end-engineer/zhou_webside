<template>
  <scroll-view scroll-x>
    <view class="tab-box">
      <view
        v-for="item in agreementList"
        class="contract-tab"
        :class="currentContract?.id === item.id && 'active'"
        @click="tabClick(item)"
      >
        {{ item.title }}
      </view>
    </view>
  </scroll-view>
  <ThemeContainer>
    <view class="sign-btn" @click="openSignDialog">
      {{ $t("components.step3.987930-0") }}
    </view>
    <image v-if="url" :src="url" mode="widthFix" />
    <view v-html="currentContract?.content" class="contract-content"></view>
  </ThemeContainer>
  <view class="submit-btn"
    ><el-button @click="submit">{{
      $t("components.step3.987930-1")
    }}</el-button></view
  >
  <EDialog v-model="dialogVisible">
    <limeSignature ref="sign" />
    <template #footer>
      <el-button class="submit-sign-btn" @click="submitSign">{{
        $t("components.step3.987930-2")
      }}</el-button>
    </template>
  </EDialog>
</template>

<script setup>
import limeSignature from "@/uni_modules/lime-signature/components/lime-signature/lime-signature.vue";
import {
  getAgreementList,
  sign_contract,
  saveSignature,
  userInfo,
} from "@/api/index";
import { defineEmits } from "vue";
const emits = defineEmits(["changeStep"]);
const store = getPinia();

const agreementList = ref([]);
const currentContract = ref({});
const dialogVisible = ref(false);
const sign = ref();
const url = ref();
const tabClick = (item) => {
  if (currentContract.value.id === item.id) {
    return;
  }
  currentContract.value = item;
};

const getUserInfo = () => {
  userInfo().then((res) => {
    if (res.code == 1) {
      console.log(res, "res");
      url.value = res.data.userinfo.signature;
    }
  });
};
getUserInfo();

const fetchAgreementList = () => {
  getAgreementList().then((res) => {
    if (res.code == 1) {
      agreementList.value = res.data;
      currentContract.value = res.data[0];
    }
  });
};
fetchAgreementList();

const submit = () => {
  let params = {
    agreement_id: currentContract.value.id,
  };
  sign_contract(params).then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.msg);
      emits("changeStep", 4);
    }
  });
};

const openSignDialog = () => {
  dialogVisible.value = true;
};

const submitSign = async () => {
  await sign.value.onClick("save");
  await saveSignature({ signature: sign.value.url });
  url.value = sign.value.url;
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
@use "@/styles/theme/index.scss" as *;

.tab-box {
  display: flex;
  align-items: center;
  gap: 40rpx;
  margin-top: 60rpx;
  margin-bottom: 40rpx;
  .contract-tab {
    flex-shrink: 0;
    text-align: center;
    border-radius: 26rpx;
    // border: 2rpx solid var(--content-bg);
    width: 300rpx;
    height: 120rpx;
    line-height: 120rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #8cbfd9;
    font-size: 28rpx;
    cursor: pointer;
    padding: 0 10rpx;
    box-sizing: border-box;
    background: var(--content-bg);
  }
  .active {
    background: #1e878c;
    color: #fff;
  }
}

.contract-content {
  font-size: 28rpx;
  height: 400px;
  overflow: auto;
}

.submit-btn {
  margin-top: 100rpx;
  text-align: center;
}

.sign-btn {
  display: inline-block;
  border: 2rpx solid #8cbfd9;
  color: #8cbfd9;
  padding: 4rpx 12rpx;
  border-radius: 10rpx;
  cursor: pointer;
  font-size: 32rpx;
}

.submit-sign-btn {
  background-color: #00bfbf !important;
  border-color: #00bfbf !important;
  padding: 10px 30px !important;
  color: #fff !important;
  border-radius: 10rpx;
  cursor: pointer;
}

@media (max-width: 900px) {
  :deep(.el-dialog) {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: 0rpx;
  }
}
</style>
