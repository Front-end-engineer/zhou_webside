<template>
  <view class="index_footer" v-if="isHome">
    <view class="common_footer">
      <view class="content" v-if="footerShow">
        <view class="items">
          <view class="title">{{ $t("footer_community") }}</view>
          <view class="list">
            <view
              class="link"
              v-for="(item, index) in footerList.type3"
              :key="index"
            >
              <image :src="item.img" mode="heightFix"></image>
              <a :href="item.url">{{ item.title }}</a>
            </view>
          </view>
        </view>
        <view class="items">
          <view class="title">{{ $t("footer_aboutUs") }}</view>
          <view class="list">
            <view
              class="link"
              v-for="(item, index) in footerList.type4"
              :key="index"
            >
              <a :href="item.url">{{ item.title }}</a>
            </view>
          </view>
        </view>
        <view class="items">
          <view class="title">{{ $t("footer_products") }}</view>
          <view class="list">
            <view
              class="link"
              v-for="(item, index) in navigateUrlArr"
              :key="index"
              @click="toPage(item.url)"
            >
              <a href="javascript:void(0);">{{ item.name }}</a>
            </view>
          </view>
        </view>
        <view class="items">
          <view class="title">{{ $t("footer_learning") }}</view>
          <view class="list">
            <view
              class="link"
              v-for="(item, index) in footerList.type5"
              :key="index"
            >
              <a :href="item.url">{{ item.title }}</a>
            </view>
          </view>
        </view>
        <view class="items">
          <view class="title">{{ $t("footer_services") }}</view>
          <view class="list">
            <view
              class="link"
              v-for="(item, index) in footerList.type6"
              :key="index"
            >
              <a :href="item.url">{{ item.title }}</a>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="copyright">{{
      $t("footer_copyright", { year: 2025, company: "ChainFutures" })
    }}</view>
  </view>

  <footer
    :class="['footer-container', isAirdrop ? 'airColor' : 'mainColor']"
    v-else
  >
    <view class="content">
      <view class="footer-copyright"
        >© 2025 ChainFutures. {{ $t("footer_rightsReserved") }}</view
      >
      <view class="footer-community">
        <view class="footer-community-title">{{ $t("footer_community") }}</view>
        <a
          v-for="(item, index) in footerList.type3"
          :key="index"
          :href="item.url"
        >
          <image :src="item.img" mode="heightFix"></image>
        </a>
      </view>
    </view>
  </footer>
</template>

<script setup>
import { getNewsList } from "@/api/index";
import { useRouter } from "vue-router";
import { useMenu } from "./menuConfig";
const { productMenu, centerMenu } = useMenu();
const { t } = useI18n();

const navigateUrlArr = computed(() => {
  return [...productMenu, ...centerMenu].map((item) => ({
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

const router = useRouter();

let footerList = reactive({
  type3: [],
  type4: [],
  type5: [],
  type6: [],
});

const toPage = (url) => {
  router.push(url);
};

let footerShow = ref(false);
onMounted(() => {
  let paramsArr = ["3", "4", "5", "6"];
  getNewsList({
    type: paramsArr.join(","),
    limit: 200,
  }).then((res) => {
    if (res.code == 1) {
      let data = res.data.data;
      data.map((item) => {
        let pName = "type";
        footerList[`${pName}${item.type}`].push(item);
      });
      footerShow.value = true;
    }
  });
});
</script>

<style lang="less" scoped>
.mainColor {
  background: var(--main-color) !important;
}
.airColor {
  background: var(--content-bg) !important;
}
.index_footer {
  .common_footer {
    background: #040c16;
    padding: 100rpx 0 20rpx;

    .content {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      @media (max-width: 800px) {
        padding: 40rpx;
        flex-wrap: wrap;
        column-gap: 40rpx;
      }

      .items {
        color: #8cbfd9;
        margin-bottom: 20px;
        .title {
          font-weight: 400;
          font-size: 41rpx;
          margin-bottom: 58rpx;
        }
        .list {
          font-weight: 400;
          font-size: 28rpx;
          display: flex;
          flex-direction: column;
          gap: 68rpx;
          color: #ffffff;
          a {
            text-decoration: none;
            color: #bcbcbc;
            &:hover {
              color: #00bfbf;
            }
          }
          image {
            margin-right: 30rpx;
            width: 40rpx;
            height: 40rpx;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .copyright {
    border-top: 1px solid rgba(17, 120, 178, 0.35);
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #8cbfd9;
    background: #040c16;
    text-align: center;
    padding: 40rpx 0;
  }
}

.footer-container {
  background: var(--main-color);
  padding: 0 var(--common-margin);
  border-top: 1px solid #04606e;
  position: relative;
  z-index: 2;

  .content {
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
    max-width: 1232px;
    font-family: Ubuntu, sans-serif;
    color: #94b8bf;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    display: flex;
    // padding: 24px 0;
    // flex-direction: column;
    align-items: center;
    gap: 16px;
    margin: auto;
  }

  .footer-community {
    display: flex;
    gap: 16px;
    align-items: center;
    image {
      height: 12px;
    }
  }
}
</style>
