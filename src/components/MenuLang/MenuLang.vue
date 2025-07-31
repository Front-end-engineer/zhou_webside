<template>
  <el-dropdown
    trigger="hover"
    v-model="lang"
    @command="clickMenuLang"
    :popper-class="
      isHome || isLogin() ? 'header-popper' : 'header-popper lang-popper'
    "
    class="lang"
    placement="bottom-end"
  >
    <el-button
      type="info"
      plain
      circle
      style="
        width: 80rpx;
        height: 80rpx;
        background: transparent;
        font-weight: 700;
        font-size: 30rpx;
        color: white;
        outline: none;
      "
      >{{ lang }}</el-button
    >
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in memuList"
          :command="item.key"
          :key="item.key"
          :class="lang === item.key && 'lang-active'"
        >
          <view class="lang-item">
            <div v-html="item.svgPath"></div>
            {{ item.name }}
          </view>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
defineProps({
  memuList: {
    type: Array,
    default: () => [],
  },
});

const isHome = ref(
  getCurrentPages().at(-1)?.route?.includes("pages/home/home")
);
const isLogin = function () {
  let routePath = getCurrentPages().at(-1)?.route;
  return (
    routePath?.includes("pages/login/login") ||
    routePath?.includes("pages/login/register") ||
    routePath?.includes("pages/login/findPassword")
  );
};

let lang = ref(uni.getStorageSync("locale_lang") || "ZH");
// console.log("默认语言", lang);
// const selectedCommand = ref(uni.getStorageSync("locale_lang") || "ZH");
const clickMenuLang = (val) => {
  if (lang.value == val) return false;
  lang.value = val;
  // locale.value = val;
  // console.log("切换语言", lang.value, t("header.userCore"));
  uni.setStorageSync("locale_lang", val);
  location.reload();
  // console.log("locallocal", local);
  // local.value = val;
  // uni.setStorageSync("locale_lang", val);
  // console.log("sssssssss", val);
};
</script>

<style lang="less" scoped>
.lang-item {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 16rpx;
  font-size: 32rpx;
  color: #fff;
  padding: 32rpx 40rpx 32rpx 32rpx;
  > svg {
    width: 34rpx;
    height: 34rpx;
  }
}

.lang-active {
  background-color: #132f44 !important;
}
</style>
