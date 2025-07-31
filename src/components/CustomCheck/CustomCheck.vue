<template>
  <view class="flex-align-center" v-bind="$attrs">
    <el-checkbox
      v-model="model"
      :label="$t('userCenter.ageIdentity.view.同意')"
      size="large"
    />
    <text class="agreement-box" @click="openDialog">{{
      $t("userCenter.ageIdentity.view.服务条款")
    }}</text>
  </view>
  <EDialog
    v-model="showDialog"
    :title="$t('userCenter.ageIdentity.view.服务条款')"
  >
    <div v-html="agreementListInfo.content"></div>
  </EDialog>
</template>

<script setup>
import { getAgreementList } from "@/api/index";
const model = defineModel({
  type: Boolean,
  default: false,
});

const props = defineProps({
  label: {
    type: String,
    default: "同意",
  },
  agreement: {
    type: String,
    default: "服务条款",
  },
  type: {
    type: Number,
    default: 1,
  },
});

let agreementListInfo = ref();
const fetchAgreementList = async () => {
  console.log(props.type);
  let params = {
    type: props.type,
  };
  let res = await getAgreementList(params);
  agreementListInfo.value = res.data[0];
  console.log(res);
};
fetchAgreementList();

const showDialog = ref(false);

const openDialog = () => {
  showDialog.value = true;
};
</script>

<style lang="less" scoped>
.flex-align-center {
  display: flex;
  align-items: center;
}
.agreement-box {
  cursor: pointer;
  color: #00bfbf;
  font-size: 32rpx;
  margin-top: -3rpx;
}

:deep(.el-checkbox__label) {
  font-size: 32rpx !important;
}
</style>
