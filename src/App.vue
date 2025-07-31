<script setup>
import TipDialog from "@/components/TipDialog/TipDialog.js";
import { getUserInfo, getChainList } from "@/api/index";
import { getPinia } from "/src/stores/index";

const store = getPinia();
uni.$on("pageRouter", (event) => {
  adjustFontSize();
});

onLaunch(() => {
  uni.TipDialog = TipDialog;
  if (store.isLogin) {
    getUserInfoApi();
  }
  getChainListApi();

  // // 监听账户变化事件
  // window.ethereum.on("accountsChanged", (accounts) => {
  //   if (accounts.length > 0) {
  //     console.log("当前连接的账户地址是:", accounts[0], accounts);
  //   } else {
  //     console.log("没有账户连接");
  //   }
  // });
  adjustFontSize();
  window.addEventListener("load", adjustFontSize);
  window.addEventListener("resize", adjustFontSize);
});

const isMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag ? false : true;
};

const getChainListApi = async () => {
  const res = await getChainList();
  if (res.code === 1) {
    store.setChainList(res.data.data);
  }
};

const adjustFontSize = () => {
  store.UPWEBPORT(isMobile());
  let num = 120;
  // let num = 132;
  if (!store.isWebPort) {
    num = 40;
  }
  // if (store.isWebPort && window.innerWidth <= 900) return false;

  // if (window.innerWidth < 2565 && window.innerWidth >= 2555) {
  //   const rootFontSize = 2560 / num;
  //   document.documentElement.style.fontSize = rootFontSize + "px";
  // }

  if (window.innerWidth < 1922 && window.innerWidth >= 1912) {
    const rootFontSize = 1920 / num;
    document.documentElement.style.fontSize = rootFontSize + "px";
  }
  // if (window.innerWidth < 1370 && window.innerWidth >= 1360) {
  //   const rootFontSize = 1664 / num;
  //   document.documentElement.style.fontSize = rootFontSize + "px";
  // }
};

const getUserInfoApi = () => {
  getUserInfo().then((res) => {
    if (res.code == 1) {
      store.UPLOGININFO(res.data.userinfo);
    }
  });
};

// import { createAppKit } from "@reown/appkit/vue";
// import { arbitrum, mainnet, bsc, bscTestnet } from "@reown/appkit/networks";
// import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// // 1. Get projectId from https://cloud.reown.com
// const projectId = "bbe06d7704f2cb55157ec0a72578c086";

// // 2. Create a metadata object
// const metadata = {
//   name: "robot",
//   description: " ",
//   icons: [""],
// };

// // 3. Set the networks
// const networks = [mainnet, bsc, bscTestnet];

// // 4. Create Wagmi Adapter
// const wagmiAdapter = new WagmiAdapter({
//   networks,
//   projectId,
// });

// // 5. Create the modal
// const modal = createAppKit({
//   adapters: [wagmiAdapter],
//   networks,
//   projectId,
//   metadata,
//   features: {
//     analytics: true, // Optional - defaults to your Cloud configuration
//   },
// });
</script>

<template>// Rest of your app ...</template>

<style lang="less">
page {
  background-color: #012529;
  color: #fff;
}
.container {
  overflow-x: hidden;
  padding-top: 128rpx !important;
  min-height: calc(100vh - 48px);
  @media (max-width: 900px) {
    padding-top: 56px !important;
  }
}
.page-container {
  padding: 176rpx 19.5%;
  margin-top: 100rpx !important;
  position: relative;
}

.page-content {
  margin-top: 100rpx !important;
}

@media (max-width: 900px) {
  .page-container {
    padding: 0 5%;
  }
  .el-dialog {
    width: calc(100% - 60rpx) !important;
    margin-left: 30rpx !important;
    margin-right: 30rpx !important;
  }
}

.el-menu {
  border: none !important;

  li {
    font-size: 1.25rem;
    border-bottom: none !important;
  }

  li.el-menu-item.el-menu-item.el-menu-item:hover {
    background-color: transparent !important;
    color: #47ebeb !important;
  }
  li.el-sub-menu:hover {
    .el-sub-menu__title {
      background-color: transparent !important;
      color: #47ebeb !important;
    }
  }
}

.slideout-panel {
  background-color: #030a12 !important;
}

.el-dialog {
  background-color: #0a1b29 !important;
  .el-dialog__title {
    color: #fff;
  }
}

.el-select {
  .el-select__wrapper {
    background: #044953 !important;
  }
  .el-select__placeholder {
    color: white !important;
  }
}
.el-input {
  .el-input__wrapper {
    border-radius: var(--bRadius);
    background: #044953 !important;
    // border: 1px solid var(--content-bg) !important;
  }
  .el-input__inner {
    color: white !important;
  }
}
.el-button {
  border-radius: var(--bRadius) !important;
}

.el-select__popper.el-popper {
  background: #044953 !important;
  border: none !important;
  .el-select-dropdown__item {
    color: #fff;
    &.is-hovering {
      background-color: #016a7a;
    }
  }
  .el-popper__arrow::before {
    background: #044953 !important;
    border: none !important;
  }
}

::v-deep .el-table {
  border-radius: 40rpx !important;
  background: #013840;

  .el-table__inner-wrapper {
    background: #013840;
    &::before {
      background-color: transparent;
    }
  }
  .el-table__header-wrapper .el-table__header {
    th,
    tr {
      color: #6fd6d6;
      background-color: #013840 !important;
      font-size: 16px;
      font-weight: 400;
      border: none !important;
    }
  }

  .el-table__body-wrapper {
    th,
    tr {
      color: white;
      background-color: #013840;
      font-weight: 400;
      font-size: 16px;

      &:hover {
        background-color: rgb(4, 73, 83) !important;
      }
    }

    tr.current-row {
      td.el-table__cell {
        background: #8cbfd9;
      }
    }

    td {
      border-bottom: 1px solid #0d2537;
      border: none !important;
    }
  }

  .el-table__body tr:hover > td {
    background-color: rgb(4, 73, 83) !important;
  }
}

::v-deep .el-pagination {
  .btn-prev,
  .btn-next {
    background-color: transparent;
    border-color: transparent;
    color: white;
    cursor: pointer;
  }
  .el-pager {
    li {
      color: white;
      background-color: transparent;
      border-color: transparent;
    }
    .is-active {
      color: #00bfbf;
    }
  }
}

::v-deep .el-textarea {
  .el-textarea__inner {
    background: #091320;
  }
}

::v-deep .header_menu .el-popper {
  .el-menu--horizontal {
    ul,
    li {
      background: black;
    }
  }
}

.header-popper {
  border: none !important;
  background-color: #081926 !important;
  border-radius: 20rpx !important;
  overflow: hidden;
  .el-menu--popup {
    background-color: #081926 !important;
    border: none !important;
    .el-menu-item {
      background-color: #081926 !important;
    }
  }
  .el-popper__arrow::before {
    border-color: #081926 !important;
    background-color: #081926 !important;
  }
  .el-dropdown-menu {
    padding: 0;
    background-color: #081926 !important;
    .el-dropdown-menu__item {
      padding: 0;
    }
    .el-dropdown-menu__item--divided {
      border-color: #1d3547 !important;
    }
    .el-dropdown-menu__item:not(.is-disabled):hover,
    .el-dropdown-menu__item:not(.is-disabled):focus {
      background-color: #132f44 !important;
      color: #fff !important;
    }
  }
}

.header-sub {
  .subMenuMixin(#081926, #132f44);
}
.header-subMenu {
  .subMenuMixin(var(--main-color), var(--content-color));
}
.header-subMenuAir {
  .subMenuMixin(var(--content-bg), var(--content-color));
}

.subMenuMixin(@bgcolor, @color) {
  width: 150px;
  overflow: hidden;
  border: none !important;
  background-color: @bgcolor !important;
  border-radius: 20rpx !important;

  .el-menu li.el-menu-item.el-menu-item.el-menu-item:hover {
    background-color: @color !important;
    color: white !important;
  }
  .el-menu--popup {
    width: 150px;
    padding: 0;
    .el-menu-item {
      width: 150px;
      box-sizing: content-box !important;
      padding: 0.6rem 1.25rem 0.6rem 1rem !important;
      font-size: 16px;
    }
    .el-menu-item:not(.is-disabled):hover {
      background-color: @color !important;
    }
  }
}

.lang-popper {
  background-color: #044953 !important;
  border: 1rpx solid #007580 !important;
  .el-popper__arrow::before {
    border-color: #044953 !important;
    background-color: #044953 !important;
  }
  .el-dropdown-menu {
    background-color: #044953 !important;
    .el-dropdown-menu__item {
      margin: 8rpx 16rpx;
      border-radius: 20rpx !important;
    }
    .el-dropdown-menu__item--divided {
      border-color: #007580 !important;
    }
    .el-dropdown-menu__item:not(.is-disabled):hover,
    .el-dropdown-menu__item:not(.is-disabled):focus {
      background-color: #013840 !important;
    }
  }
  .lang-item {
    padding: 26rpx 32rpx 26rpx 26rpx !important;
  }
}

::v-deep .el-table .el-loading-mask {
  // background-color: rgba(122, 122, 122, 0.8) !important;
}

.el-popper__arrow.el-popper__arrow.el-popper__arrow::before {
  background: transparent !important;
  border: none !important;
}

.not-home-style {
  li.el-menu-item.el-menu-item.el-menu-item:hover {
    background-color: transparent !important;
    color: #00bfbf !important;
  }
}

.el-menu-item:not(.is-disabled):focus {
  background-color: transparent !important;
}

// 移动端侧边栏样式
::v-deep .slideout-header .el-menu {
  color: white;
  border-right: 1px solid #030a12;
}

::v-deep .slideout-header .slideout-header--text {
  font-size: var(--txtFs);
  width: 50%;
  background: url(@/static/alllogo.png) no-repeat;
  background-position: center left;
  background-size: 70%;
}
::v-deep .slideout-header .slideout-header--buttons {
  .slideout-header--buttons-default svg {
    fill: white !important;
  }
}

::v-deep .slideout-content {
  background: #040c16 !important;
}
::v-deep .slideout-content ul {
  padding: 0 14px;
}
::v-deep .slideout-content .el-menu .el-menu-item,
.el-sub-menu__title {
  color: white !important;
  font-size: 20px !important;
  padding: 37px 40px;
}
::v-deep .slideout-content .el-menu .el-sub-menu {
  color: white !important;
  font-size: 20px !important;
}
::v-deep .slideout-content .el-menu .el-sub-menu .el-menu-item {
  font-size: 14px !important;
  padding: 15px 0;
}

::v-deep .slideout-content .is-active {
  color: var(--operator-bg) !important;
}

::v-deep .slideout-content .langIcon {
  svg {
    vertical-align: top;
  }
}

::v-deep .slideout-header .el-menu li.is-active {
  color: var(--operator-bg) !important;
}

.slideout-panel {
  border: none !important;
}

.slideout-header {
  color: white;
  border-bottom: none !important;
  background-color: #040c16;
  padding: 10px 15px;
}

.slideout-btn--close {
  border: 2px solid white;
}

.slideout-btn--close svg {
  fill: white;
}

.slideout_link {
  display: flex;
  width: calc(100% - 60px);
  align-items: center;
  justify-content: center;
  text-wrap: nowrap;
  border-radius: 9999px;
  background-color: white;
  padding: 10px;
  font-weight: 700;
  line-height: 1.5rem;
  color: #040c16;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  text-decoration: inherit;
  margin: 0 auto;
}

.slideout_link svg {
  margin-right: 0.3rem;
}

/**
* common
*/
:root {
  --main-color: #012529;
  --content-color: #013840;
  --content-bg: #044953;
  --operator-bg: #00bfbf;
  --bRadius: 60rpx;
  --stxtFs: 24rpx;
  --txtFs: 28rpx;
  --bTitle: 48rpx;
  --sTitle: 32rpx;
  --mobilePadding: 20rpx;
}
.bTitle {
  font-size: 48rpx !important;
}
.sTitle {
  font-size: 32rpx !important;
}
.brCommon {
  border-radius: 60rpx;
}
.topContentImg {
  border-radius: 32rpx;
  width: 100%;
}
#app {
  background-color: var(--main-color) !important;
}
.operator_btn {
  font-size: var(--txtFs) !important;
  background-color: transparent !important;
  color: #00bfbf !important;
  border: 1rpx solid #00bfbf !important;
  border-radius: var(--bRadius) !important;
}
.hero-bg {
  object-fit: cover;
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  width: 115%;
  position: absolute;
  margin-left: -7.5%;
}
</style>
