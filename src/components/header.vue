<template>
  <view
    class="common_header"
    :class="{
      'home-style': isHome,
      'not-home-style': !isHome,
    }"
  >
    <view class="pc_header">
      <a
        href="/"
        class="logo"
        :style="{
          marginTop: isHome ? '28px' : '0',
          cursor: 'pointer',
          textDecoration: 'unset',
          fontSize: '48rpx',
          fontWeight: 'bold',
          color: '#66b2ff',
        }"
      >
        <image
          style="width: 90rpx; height: 90rpx; border-radius: 10rpx"
          src="@/static/images/logo.jpg"
          mode="scaleToFill"
        />
        nezha
      </a>

      <view
        class="h_right"
        :style="{
          marginTop: isHome ? '28px' : '0',
        }"
      >
        <MenuLang></MenuLang>
      </view>
    </view>

    <view class="mb_header">
      <a
        href="/"
        class="logo"
        style="font-size: 48rpx; font-weight: bold; color: #66b2ff"
      >
        ODIN.FUN
      </a>
      <view class="right">
        <MenuLang></MenuLang>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

const isHome = ref(
  getCurrentPages().at(-1)?.route?.includes("pages/home/home")
);
const currentMenu = ref("");

onMounted(() => {
  currentMenu.value = "/" + getCurrentPages().at(-1)?.route;
});
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
