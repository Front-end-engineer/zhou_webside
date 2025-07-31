<template>
  <Subtitle :title="t('CustomCollapse.CustomCollapse.574645-0')" />
  <el-collapse v-model="activeName" accordion>
    <template v-for="(item, index) in questtionList" :key="item.title">
      <el-collapse-item
        :title="item.questions"
        :name="index"
        :icon="activeName === index ? Minus : Plus"
      >
        <template #title>
          <view class="qa-item">
            <image src="@/static/images/qa.png" mode="scaleToFill" />
            {{ item.questions }}
          </view>
        </template>
        <view>{{ item.answers }}</view>
      </el-collapse-item>
    </template>
  </el-collapse>
</template>

<script setup>
import { Plus, Minus } from "@element-plus/icons-vue";
import { getQuestionsList } from "@/api/index";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps({
  title: {
    type: String,
    default: "",
  },
  list: {
    type: Array,
    default: () => [
      {
        questions: "1.什么是信用借贷",
        answers:
          "用户提供的借贷服务，其利率、期限和服务与同类产品相比极具优势。用户可以定制追加保证金流程，且账户中的抵押品利用率更高。用户只要遵守相关的质押率 (LTV) 和风险率，即可在现货市场上自由交易现货账户中的 信用借贷。",
      },
    ],
  },
});

let questtionList = ref();
const fetchQuestionsList = () => {
  getQuestionsList().then((res) => {
    if (res.code == 1) {
      questtionList.value = res.data;
    }
  });
};
fetchQuestionsList();

const activeName = ref("1");
</script>

<style lang="less" scoped>
.el-collapse {
  border: none;
  :deep(.el-collapse-item) {
    margin-bottom: 30rpx;
    border-radius: 26rpx;
    overflow: hidden;
    .el-collapse-item__header {
      padding-left: 30rpx;
      padding-right: 30rpx;
      background: linear-gradient(180deg, #01363b 0%, #054b4f 100%);
      border: none;
      color: #fff;
      .el-collapse-item__arrow.is-active {
        transform: rotate(180deg);
      }
    }
    .el-collapse-item__wrap {
      padding-left: 30rpx;
      border-bottom: none;
      background: linear-gradient(180deg, #054b4f 0%, #01363b 100%);
      .el-collapse-item__content {
        color: #8cbfd9;
      }
    }
  }
}

.qa-item {
  > image {
    margin-bottom: -4rpx;
    margin-right: 16rpx;
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
