<template>
  <view
    class="common_header"
    :class="{
      'home-style': isHome,
      'airdrop-style': isAirdrop,
      'not-home-style': !isHome,
    }"
  >
    <view class="pc_header">
      <a
        href="/"
        class="logo"
        :style="{
          marginTop: isHome ? '28px' : '0',
          cursor: pointer,
        }"
      >
        <image src="@/static/alllogo.png" mode="widthFix"></image>
      </a>

      <el-menu
        :default-active="currentMenu"
        class="el-menu-demo header_menu"
        mode="horizontal"
        text-color="white"
        active-text-color="#fff"
        background-color="rgba(255, 255, 255, 0)"
        popper-class="header-popper"
      >
        <el-sub-menu
          :popper-class="isHome ? 'header-sub' : 'header-subMenu'"
          :style="{
            marginTop: isHome ? '13px' : '0',
            marginBottom: isHome ? '13px' : '0',
          }"
        >
          <template #title>
            <text
              :style="{
                fontSize: isHome ? '20px' : '16px',
                marginTop: isHome ? '14px' : '0',
                marginBottom: isHome ? '14px' : '0',
              }"
              >{{ $t("header.Products") }}
            </text>
          </template>
          <el-menu-item
            v-for="(item, index) in productUrlArr"
            :key="index"
            @click="
              menuItemClick(
                {
                  index: item.url,
                },
                $event
              )
            "
            >{{ item.name }}</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item
          :style="{
            fontSize: isHome ? '20px' : '16px',
            marginTop: isHome ? '12px' : '0',
            marginBottom: isHome ? '12px' : '0',
          }"
          :index="item.url"
          v-for="(item, index) in navigateUrlArr"
          :key="index"
          @click="menuItemClick"
        >
          {{ item.name }}
          <svg
            v-if="currentMenu === item.url"
            style="transform: scale(0.8)"
            width="48"
            height="24"
            viewBox="0 0 48 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 6C3 3.79086 4.79086 2 7 2H44C46.2091 2 48 3.79086 48 6V18C48 20.2091 46.2091 22 44 22H7C4.79086 22 3 20.2091 3 18V15L0 12L3 9V6ZM15.484 12.226H14.126V15.838C14.0047 15.8753 13.804 15.9173 13.524 15.964C13.2533 16.0013 12.922 16.02 12.53 16.02C11.9793 16.02 11.4987 15.9267 11.088 15.74C10.6867 15.5533 10.346 15.292 10.066 14.956C9.79533 14.6107 9.59 14.2 9.45 13.724C9.31933 13.248 9.254 12.7207 9.254 12.142C9.254 11.5447 9.33333 11.008 9.492 10.532C9.65067 10.0467 9.87 9.636 10.15 9.3C10.4393 8.964 10.7847 8.70733 11.186 8.53C11.5967 8.35267 12.0493 8.264 12.544 8.264C13.0107 8.264 13.468 8.32467 13.916 8.446C14.364 8.558 14.7233 8.70267 14.994 8.88L15.428 7.746C15.372 7.70867 15.2647 7.65267 15.106 7.578C14.9567 7.50333 14.7607 7.42867 14.518 7.354C14.2753 7.27933 13.9813 7.214 13.636 7.158C13.3 7.102 12.9127 7.074 12.474 7.074C11.83 7.074 11.2233 7.186 10.654 7.41C10.094 7.634 9.604 7.96067 9.184 8.39C8.764 8.81933 8.428 9.35133 8.176 9.986C7.93333 10.6113 7.812 11.33 7.812 12.142C7.812 12.954 7.91933 13.6727 8.134 14.298C8.358 14.9233 8.67067 15.4507 9.072 15.88C9.47333 16.3093 9.954 16.636 10.514 16.86C11.074 17.084 11.6947 17.196 12.376 17.196C12.712 17.196 13.0433 17.1773 13.37 17.14C13.6967 17.112 13.9953 17.0747 14.266 17.028C14.546 16.9813 14.7887 16.9347 14.994 16.888C15.2087 16.8413 15.372 16.7993 15.484 16.762V12.226ZM20.5923 9.594C20.4522 9.57533 20.3263 9.566 20.2143 9.566C19.6449 9.566 19.1316 9.61733 18.6742 9.72C18.2169 9.81333 17.8342 9.916 17.5263 10.028V17H18.8283V10.882C18.9029 10.8633 19.0569 10.8307 19.2903 10.784C19.5329 10.728 19.7756 10.7 20.0182 10.7C20.3916 10.7 20.6949 10.728 20.9282 10.784C21.1709 10.8307 21.3436 10.8727 21.4463 10.91L21.6702 9.776C21.6143 9.75733 21.5256 9.73867 21.4043 9.72C21.2922 9.692 21.1663 9.66867 21.0263 9.65C20.8862 9.622 20.7416 9.60333 20.5923 9.594ZM26.2026 16.048C25.9693 16.0573 25.6986 16.062 25.3906 16.062C24.8773 16.062 24.4713 15.9733 24.1726 15.796C23.874 15.6093 23.7246 15.2827 23.7246 14.816C23.7246 14.564 23.7853 14.3633 23.9066 14.214C24.028 14.0553 24.1773 13.934 24.3546 13.85C24.5413 13.7567 24.742 13.696 24.9566 13.668C25.1806 13.64 25.3906 13.626 25.5866 13.626C25.8853 13.626 26.1373 13.6447 26.3426 13.682C26.5573 13.71 26.7113 13.7473 26.8046 13.794V15.964C26.646 16.0013 26.4453 16.0293 26.2026 16.048ZM26.5946 9.748C26.24 9.608 25.8013 9.538 25.2786 9.538C24.8213 9.538 24.3966 9.57533 24.0046 9.65C23.6126 9.71533 23.3326 9.78533 23.1646 9.86L23.3186 10.938C23.4773 10.8727 23.7153 10.812 24.0326 10.756C24.3593 10.6907 24.7373 10.658 25.1666 10.658C25.5026 10.658 25.7733 10.7093 25.9786 10.812C26.1933 10.9053 26.3613 11.036 26.4826 11.204C26.604 11.3627 26.688 11.5493 26.7346 11.764C26.7813 11.9693 26.8046 12.1793 26.8046 12.394V12.758C26.7673 12.7487 26.702 12.7347 26.6086 12.716C26.5153 12.6973 26.4033 12.6787 26.2726 12.66C26.1513 12.632 26.0206 12.6133 25.8806 12.604C25.7406 12.5853 25.6053 12.576 25.4746 12.576C25.064 12.576 24.672 12.618 24.2986 12.702C23.9253 12.786 23.5986 12.9167 23.3186 13.094C23.0386 13.2713 22.8146 13.5047 22.6466 13.794C22.488 14.0833 22.4086 14.4287 22.4086 14.83C22.4086 15.25 22.4786 15.6093 22.6186 15.908C22.7586 16.2067 22.9546 16.4493 23.2066 16.636C23.4586 16.8133 23.7573 16.944 24.1026 17.028C24.448 17.112 24.826 17.154 25.2366 17.154C25.526 17.154 25.8153 17.14 26.1046 17.112C26.4033 17.0933 26.6786 17.07 26.9306 17.042C27.1826 17.014 27.4066 16.986 27.6026 16.958C27.808 16.9207 27.9666 16.8927 28.0786 16.874V12.324C28.0786 11.9133 28.032 11.54 27.9386 11.204C27.8453 10.8587 27.6866 10.5647 27.4626 10.322C27.248 10.07 26.9586 9.87867 26.5946 9.748ZM31.4311 9.692C30.9364 9.776 30.5398 9.85533 30.2411 9.93V17H31.5431V10.854C31.5898 10.8447 31.6644 10.8307 31.7671 10.812C31.8791 10.7933 32.0004 10.7793 32.1311 10.77C32.2711 10.7513 32.4158 10.7373 32.5651 10.728C32.7144 10.7187 32.8591 10.714 32.9991 10.714C33.3444 10.714 33.6338 10.7607 33.8671 10.854C34.1004 10.938 34.2871 11.078 34.4271 11.274C34.5671 11.47 34.6651 11.7267 34.7211 12.044C34.7864 12.3613 34.8191 12.744 34.8191 13.192V17H36.1211V12.912C36.1211 12.4173 36.0744 11.9647 35.9811 11.554C35.8878 11.1433 35.7244 10.7933 35.4911 10.504C35.2671 10.2053 34.9638 9.97667 34.5811 9.818C34.1984 9.65 33.7178 9.566 33.1391 9.566C32.4951 9.566 31.9258 9.608 31.4311 9.692ZM42.2562 9.72H39.4982V7.466L38.1962 7.69V14.186C38.1962 14.6713 38.2335 15.1007 38.3082 15.474C38.3922 15.838 38.5322 16.146 38.7282 16.398C38.9242 16.65 39.1808 16.8413 39.4982 16.972C39.8248 17.0933 40.2355 17.154 40.7302 17.154C41.1502 17.154 41.5235 17.1027 41.8502 17C42.1768 16.9067 42.4055 16.8273 42.5362 16.762L42.2842 15.684C42.1908 15.7213 42.0228 15.7867 41.7802 15.88C41.5468 15.964 41.2342 16.006 40.8422 16.006C40.6182 16.006 40.4222 15.978 40.2542 15.922C40.0862 15.866 39.9462 15.7727 39.8342 15.642C39.7222 15.502 39.6382 15.3153 39.5822 15.082C39.5262 14.8393 39.4982 14.536 39.4982 14.172V10.812H42.2562V9.72Z"
              fill="#00BFBF"
            ></path>
          </svg>
        </el-menu-item>
      </el-menu>

      <view
        class="h_right"
        :style="{
          marginTop: isHome ? '28px' : '0',
        }"
      >
        <view
          style="position: relative; margin-right: -13rpx; margin-top: 6rpx"
        >
          <el-icon
            @click="drawerShow = true"
            style="cursor: pointer"
            class="infoList"
            :size="23"
            ><Bell
          /></el-icon>
          <view
            v-if="noticeInfo.num > 0"
            style="
              position: absolute;
              right: 20;
              top: 0;
              width: 15rpx;
              height: 15rpx;
              line-height: 15rpx;
              border-radius: 7.5rpx;
              background: red;
              text-align: center;
            "
          ></view>
        </view>

        <MenuLang :memuList="allLang"></MenuLang>

        <el-dropdown
          trigger="hover"
          @command="clickOperator"
          class="operator"
          v-if="store.isLogin"
          :popper-class="isHome ? 'header-popper' : 'header-popper lang-popper'"
          placement="bottom-end"
        >
          <view>
            <image
              :src="userInfo.avatar"
              mode="heightFix"
              style="width: 80rpx; height: 80rpx"
            ></image>
            <text>{{ userInfo.nickname }}</text>
          </view>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="
                  menuItemClick({
                    index: '/pages/userCenter/personalCenter/viewindex',
                  })
                "
              >
                <view class="lang-item">
                  {{ $t("header.userCore") }}
                </view>
              </el-dropdown-item>
              <template v-if="accountData.isConnected.value">
                <el-dropdown-item>
                  <view
                    class="lang-item"
                    style="padding: 0 !important; justify-content: start"
                  >
                  </view>
                </el-dropdown-item>
                <el-dropdown-item @click="copyAddress">
                  <view class="lang-item">
                    {{ formatString(accountData.address.value) }}
                  </view>
                </el-dropdown-item>
                <el-dropdown-item @click="closeChain">
                  <view class="lang-item">
                    {{ $t("components.header.277078-0") }}
                    {{ walletRef.chainName }}
                  </view>
                </el-dropdown-item>
              </template>
              <template v-if="!accountData.isConnected.value">
                <el-dropdown-item>
                  <view
                    class="lang-item"
                    style="padding: 0 !important; justify-content: center"
                  >
                  </view>
                </el-dropdown-item>
              </template>
              <el-dropdown-item command="logout" @click="logout">
                <view class="lang-item">
                  {{ $t("header.logout") }}
                </view></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button v-else class="loginbtn" type="text" @click="tologin">{{
          $t("header.login")
        }}</el-button>
      </view>
    </view>

    <view class="mb_header">
      <a href="/" class="logo">
        <image class="img" src="@/static/alllogo.png" mode="heightFix"></image>
      </a>

      <view class="right">
        <view
          style="position: relative; margin-top: 10rpx; margin-right: 20rpx"
        >
          <el-icon
            @click="drawerShow = true"
            style="cursor: pointer"
            class="infoList"
            :size="23"
            ><Bell
          /></el-icon>
          <view
            v-if="noticeInfo.num > 0"
            style="
              position: absolute;
              right: 20;
              top: 0;
              width: 15rpx;
              height: 15rpx;
              line-height: 15rpx;
              border-radius: 7.5rpx;
              background: red;
              text-align: center;
            "
          ></view>
        </view>
        <el-dropdown
          trigger="click"
          @command="clickOperator"
          class="operator"
          v-if="store.isLogin"
          :popper-class="isHome ? 'header-popper' : 'header-popper lang-popper'"
          placement="bottom-end"
        >
          <view>
            <image
              :src="userInfo.avatar"
              mode="heightFix"
              style="width: 34px; height: 34px"
            ></image>
          </view>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="
                  menuItemClick({
                    index: '/pages/userCenter/personalCenter/viewindex',
                  })
                "
              >
                <view class="lang-item">
                  {{ $t("header.userCore") }}
                </view>
              </el-dropdown-item>
              <template v-if="accountData.isConnected.value">
                <el-dropdown-item>
                  <view
                    class="lang-item"
                    style="padding: 0 !important; justify-content: start"
                  >
                  </view>
                </el-dropdown-item>
                <el-dropdown-item @click="copyAddress">
                  <view class="lang-item">
                    {{ formatString(accountData.address.value) }}
                  </view>
                </el-dropdown-item>
                <el-dropdown-item @click="closeChain">
                  <view class="lang-item">
                    {{ $t("components.header.277078-0") }}
                    {{ walletRef.chainName }}
                  </view>
                </el-dropdown-item>
              </template>
              <template v-if="!accountData.isConnected.value">
                <el-dropdown-item>
                  <view
                    class="lang-item"
                    style="padding: 0 !important; justify-content: center"
                  >
                  </view>
                </el-dropdown-item>
              </template>
              <el-dropdown-item command="logout" @click="logout">
                <view class="lang-item">
                  {{ $t("header.logout") }}
                </view></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button
          v-else
          class="loginbtn"
          style="font-size: 19px"
          type="text"
          @click="tologin"
          >{{ $t("header.login") }}</el-button
        >
        <button class="mini_btn" @click="visible = true">
          <el-icon style="font-size: 25px">
            <Fold color="white" />
          </el-icon>
        </button>
      </view>
      <slideout @closing="onClosing" v-model="visible" title=" ">
        <el-menu
          default-active=""
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          background-color="#040c16"
          text-color="#fff"
          :unique-opened="true"
        >
          <el-menu-item
            v-for="(item, index) in [...productUrlArr, ...navigateUrlArr]"
            :index="String(index + 1)"
            :key="index"
            @click="toPage(item.url)"
          >
            <span>
              {{ item.name }}
              <el-icon>
                <TopRight />
              </el-icon>
            </span>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <span>{{ $t("header.Languages") }}</span>
              <div
                class="langIcon"
                style="height: 20px; margin-left: 10px"
                v-html="allLang.find((item) => item.key == lang).svgPath"
              ></div>
              &nbsp;
              <span>{{ allLang.find((item) => item.key == lang).key }}</span>
            </template>
            <el-menu-item
              v-for="(item, index) in allLang"
              :index="item.key"
              :key="index"
            >
              <div
                class="langIcon"
                style="height: 20px; vertical-align: middle"
                v-html="item.svgPath"
              ></div>
              &nbsp;&nbsp;{{ item.name }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </slideout>
    </view>
    <!-- 铃铛消息 -->
    <MsgNotification
      v-model="drawerShow"
      @closeDrawer="fetNoticeList()"
    ></MsgNotification>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getNoticeList } from "@/api/index";
import walletLinker from "@/utils/wallet";
import { onMounted } from "vue";
import { useMenu } from "./menuConfig";
const { productMenu, centerMenu } = useMenu();
import { useLang } from "@/components/langConfig";
const { allLang } = useLang();
const { t } = useI18n();

const walletRef = ref(null);

let drawerShow = ref(false);

let noticeInfo = ref([]);
const fetNoticeList = async () => {
  let res = await getNoticeList();
  noticeInfo.value = res.data || [];
};

import { useAccount } from "@wagmi/vue";
const accountData = useAccount();

const closeChain = () => {
  walletRef.value.closeWallet();
  console.log(accountData.isConnected.value);
};

const productUrlArr = computed(() => {
  return productMenu.map((item) => ({
    ...item,
    name: t(item.nameKey),
  }));
});
const navigateUrlArr = computed(() => {
  return centerMenu.map((item) => ({
    ...item,
    name: t(item.nameKey),
  }));
});

const isHome = ref(
  getCurrentPages().at(-1)?.route?.includes("pages/home/home")
);
const isAirdrop = ref(
  getCurrentPages().at(-1)?.route?.includes("pages/airdrop/index")
);

const store = getPinia();
// walletLinker.useWalletListeners();

const currentMenu = ref("");

let userInfo = ref(store.loginInfo);

onMounted(() => {
  currentMenu.value = "/" + getCurrentPages().at(-1)?.route;
});

const tojump = (url) => {
  uni.navigateTo({
    url,
  });
};
const toPage = (url) => {
  uni.reLaunch({
    url,
  });
  // router.push(url);
  visible.value = false;
};

let visible = ref(false);
const onClosing = (e) => {
  // 阻止关闭，等待同步或异步的操作
  e.pause = true;
  e.resume = true;
};

let lang = ref(uni.getStorageSync("locale_lang") || "ZH");
const clickMenuLang = (val) => {
  if (lang.value == val) return false;
  lang.value = val;
  uni.setStorageSync("locale_lang", val);
  location.reload();
};

const router = useRouter();
const logout = () => {
  localStorage.removeItem("userInfo");
  uni.redirectTo({
    url: "/pages/login/login",
  });
};

const tologin = () => {
  store.UPUSERINFO({});
  store.UPLOGININFO({});
  uni.redirectTo({
    url: "/pages/login/login",
  });
};

const clickOperator = () => {};

const handleOpen = () => {};

const handleClose = () => {};

const handleSelect = (val) => {
  if (val == "ZH" || val == "EN" || val == "KR") {
    clickMenuLang(val);
  }
};

const menuItemClick = (item, event) => {
  console.log(item, event);
  if (item.index?.includes(getCurrentPages().at(-1)?.route)) return;
  store.UPROUTER(item.index);
  uni.$emit("pageRouter", { message: item.index });
  setTimeout(() => {
    uni.navigateTo({
      url: item.index,
    });
  }, 100);
  document.querySelector(".el-menu__popper").style.display = "none";
};

// const wallet = toRef(store, "walletInfo");

// const formatAddress = computed(() => {
//   if (wallet.value.address) {
//     return (
//       wallet.value.address.slice(0, 4) + "****" + wallet.value.address.slice(-4)
//     );
//   }
//   return "";
// });

const copyAddress = () => {
  console.log(accountData.address.value);
  uni.setClipboardData({
    data: accountData.address.value,
    success: function () {
      uni.showToast({
        title: t("userCenter.userPart.script.内容已复制"),
      });
    },
  });
};
const formatString = (str) => {
  if (str.length <= 12) {
    // 如果总长度小于等于12，就不需要替换中间部分
    return str;
  }
  const start = str.slice(0, 6);
  const end = str.slice(-6);
  return start + "****" + end;
};
</script>

<style></style>
<style lang="less" scoped>
.common_header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  background: #040c16;

  .pc_header {
    display: flex;
    padding-left: 2vw;
    padding-right: 2vw;
    justify-content: space-between;
    align-items: center;
    height: 128rpx;

    .el-menu-demo {
      margin-left: -100rpx;

      flex: 1;
      justify-content: center;

      a {
        font-size: 1.25rem;
      }

      ::v-deep .el-sub-menu {
        .el-sub-menu__title {
          padding: 0 90rpx 0 20rpx !important;
          border-bottom: none !important;
          .el-sub-menu__icon-arrow {
            font-size: 17px;
            top: 46%;
          }
        }
        height: 100%;
        @media screen and (max-width: 900px) {
          font-size: 40rpx;
        }
      }

      ::v-deep .el-menu-item {
        font-size: 20px;
        @media screen and (max-width: 900px) {
          font-size: 40rpx;
        }
      }

      // min-width: 1000px;
    }

    .logo {
      z-index: 99999;
      color: #ffffff;
      display: flex;
      flex-direction: row;
      align-items: center;
      image {
        width: 12vw;
        vertical-align: middle;
        margin-right: 1vw;
      }
    }
  }

  .mb_header {
    height: 56px;
    line-height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 13px;

    .right {
      display: flex;
      align-items: center;
    }

    .logo {
      text-decoration: none;
      font-weight: normal;
      font-family: Bahnschrift, Bahnschrift;
      font-size: 40rpx;
      color: #ffffff;
      display: flex;
      flex-direction: row;
      align-items: center;
      image {
        height: 25px;
        vertical-align: middle;
        margin-right: 32rpx;
      }
    }

    .img {
      height: 24px;
    }
    .mini_btn {
      border: none;
      background: none;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      font-size: 30rpx;
    }
  }

  @media (max-width: 1024px) {
    .pc_header {
      display: none;
    }

    .mb_header {
      display: flex;
    }
  }

  @media (min-width: 1025px) {
    .pc_header {
      display: flex;
    }

    .mb_header {
      display: none;
    }
  }

  .h_right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40rpx;

    ::v-deep .lang {
      .el-button {
        font-size: 37rpx;
        border-color: #a3daf54d;
        &:hover {
          border-color: #47ebeb;
        }
      }
    }
  }

  .header_link {
    z-index: 99999;
    display: flex;
    // width: calc(100% - 60px);
    align-items: center;
    justify-content: center;
    text-wrap: nowrap;
    border-radius: 9999px;
    background-color: white;
    padding: 8px 13px 8px 8px;
    font-weight: 700;
    line-height: 1.3rem;
    color: #040c16;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
    text-decoration: inherit;
    margin: 0 auto;
    gap: 5px;

    &:hover {
      color: #47ebeb;
    }
  }
}

.operator {
  cursor: pointer;
  color: white;
  outline: none;

  ::v-deep .el-tooltip__trigger {
    outline: none;
  }

  image {
    width: 92rpx;
    height: 92rpx;
    border-radius: 46rpx;
    vertical-align: middle;
    margin-right: 18rpx;
  }
}

.loginbtn {
  font-size: 40rpx;
  color: #00bfbf;
}

.home-style {
  background: transparent;
}

.airdrop-style {
  background: #044953 !important;
}

.not-home-style {
  background: #012529;
}

::v-deep .el-popper {
  .el-menu--horizontal {
    ul,
    li {
      background: black;
    }
  }
}

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
