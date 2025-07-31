<template>
  <EDialog v-model="show">
    <slot name="content">
      <!-- 默认结构 -->
      <view class="default-popup-box">
        <image
          v-if="info.image"
          :src="info.image"
          class="default-image"
          mode="scaleToFill"
        />
        <br />
        <text class="default-text">
          {{ info.text }}
        </text>
      </view>
    </slot>
    <template #footer>
      <view class="default-btn">
        <el-button v-if="info.cancelBtn" class="dialog-btn1" @click="cancel">{{
          info.cancelText
        }}</el-button>
        <el-button class="dialog-btn2" @click="confirm">{{
          info.confirmText
        }}</el-button>
      </view>
    </template>
  </EDialog>
</template>

<script setup>
// 组件动态导入的不支持使用以下方式
// import { useI18n } from "vue-i18n";
// const { t } = useI18n();

// import i18n from "@/locale/index";

const show = ref(false);

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  confirmText: {
    type: String,
    // default: i18n.global.t("UPopup.TipPopup.298614-1"),
    default: "",
  },
  cancelText: {
    type: String,
    // default: i18n.global.t("UPopup.TipPopup.298614-2"),
    default: "",
  },
  round: {
    type: Number,
    default: 0,
  },
  mode: {
    type: String,
    default: "bottom",
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  bgColor: {
    type: String,
    default: "transparent",
  },
  customStyle: {
    type: Object,
    default: () => ({}),
  },
});

const info = reactive({
  title: "",
  image: "",
  text: "",
  // confirmText: i18n.global.t("UPopup.TipPopup.298614-1"),
  confirmText: "确定",
  // cancelText: i18n.global.t("UPopup.TipPopup.298614-2"),
  cancelText: "取消",
  cancelBtn: true,
  isClose: true,
});

onReady(() => {
  // APP 环境里 TipPopup 是一个页面，触发生命周期
  const instance = getCurrentInstance().proxy;
  const eventChannel = instance.getOpenerEventChannel();
  // // 监听发送页面传来的参数
  eventChannel.on("sendParams", function (data) {
    open(data);
  });
});

// #ifdef APP-PLUS
// 安卓监听返回键
onBackPress((options) => {
  if (options.from === "backbutton") {
    return true;
  }
});
// #endif

const open = (option) => {
  let res;

  // #ifdef APP-PLUS
  // res = (option.info && JSON.parse(option.info)) || {};

  // // 把toString()后的函数重新转为函数
  // if (res.confirmCallback) {
  //   res.confirmCallback = new Function("return " + res.confirmCallback)();
  // }

  // // 把toString()后的函数重新转为函数
  // if (res.cancelCallback) {
  //   res.cancelCallback = new Function("return " + res.cancelCallback)();
  // }
  // #endif

  res = option;
  Object.assign(info, res);
  console.log(info, "info");
  show.value = true;
};

const confirm = () => {
  info.confirmCallback ? info.confirmCallback() : close();
};

const cancel = () => {
  info.cancelCallback ? info.cancelCallback() : close();
};

const close = () => {
  // #ifdef APP-PLUS
  uni.navigateBack();
  // #endif

  show.value = false;
};

defineExpose({ open, close });
</script>

<style lang="scss" scoped>
@use "@/styles/theme/index.scss" as *;

.default-popup-box {
  position: relative;
  width: 100%;
  padding: 50rpx 28rpx 60rpx;
  box-sizing: border-box;
  border-radius: 12rpx;
  color: #fff;
  text-align: center;
  .default-image {
    width: 300rpx;
    height: 300rpx;
    margin-bottom: 60rpx;
  }
  .title {
    text-align: center;
    margin-bottom: 80rpx;
    font-size: 36rpx;
  }
  .close-icon {
    position: absolute;
    top: 22rpx;
    right: 30rpx;
    width: 56rpx;
    height: 56rpx;
  }
  .default-text {
    font-size: 36rpx;
  }
}

.default-btn {
  margin-top: 30rpx;
  margin-bottom: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60rpx;
  .dialog-btn1 {
    background-color: transparent !important;
    color: #01fff2 !important;
  }
  :deep(.el-button) {
    height: 79rpx !important;
  }
}
</style>
