<template>
  <view>
    <CommonHeader />
    <!-- <TestNotice /> -->
    <view class="container">
      <view class="image-section">
        <view
          v-for="(image, index) in images"
          :key="index"
          class="image-wrapper"
          :class="{ active: currentIndex === index }"
          :style="{ top: `${index * 100}vh` }"
        >
          <!-- Show vdo1 if activeVideo is 'vdo1' -->
          <video
            :class="['video_play', activeVideo[index] !== 'vdo1' ? 'hide' : '']"
            object-fit="cover"
            preload="auto"
            :src="image.vdo1"
            :controls="false"
            @loadedmetadata="onLoadedMetadata(index, 'vdo1', $event)"
            @timeupdate="onTimeUpdate(index, 'vdo1', $event)"
            @ended="onVideoEnded(index)"
            :autoplay="autoplayStatus"
            :loop="image.vdoStatus"
            muted
          ></video>

          <video
            :class="['video_play', activeVideo[index] !== 'vdo2' ? 'hide' : '']"
            object-fit="cover"
            preload="auto"
            ref="video2"
            :src="image.vdo2"
            :controls="false"
            @loadedmetadata="onLoadedMetadata(index, 'vdo2', $event)"
            @timeupdate="onTimeUpdate(index, 'vdo2', $event)"
            @ended="onVideo2Ended(index)"
            :autoplay="autoplayStatus"
            :loop="image.vdo2Status"
            muted
          ></video>

          <image :src="image.img" class="bgMobileImg"></image>

          <view class="section-one section-container" v-if="index === 0">
            <view
              class="section-title-top hightbg"
              style="width: 80vw; word-wrap: break-word"
              >{{ $t("home.onchainPerpsTitle") }}
              <br />
              {{ $t("home.onchainPerpsTitle1") }}</view
            >

            <view class="section-title-center oneCenter">
              {{ $t("home.onchainPerpsSubtitleLine1") }}<br />
              {{ $t("home.onchainPerpsSubtitleLine2") }}
            </view>
            <!-- <image
              class="nezha-bg"
              style="transform: rotateX(20deg)"
              src="@/static/images/nezha1.jpg"
              mode="scaleToFill"
            /> -->
          </view>

          <view class="section-two section-container" v-if="index === 1">
            <view class="section-title-top hightbg" style="width: 80vw">
              {{ $t("home.permissionlessPerpsTitleLine1") }}<br />
              {{ $t("home.permissionlessPerpsTitleLine2") }}
            </view>
            <!-- <view class="section-title-center twothreeCenter">
            {{ $t("home.permissionlessPerpsContentLine1") }}<br />
            {{ $t("home.permissionlessPerpsContentLine2") }}
          </view> -->
          </view>

          <view class="section-three section-container" v-if="index == 2">
            <view class="section-title-top">
              <div class="tt hightbg">
                <div>{{ $t("home.unlimitedLiquidityTitleLine1") }}</div>
                <div>{{ $t("home.unlimitedLiquidityTitleLine2") }}</div>
                <!-- <div>{{ $t("home.unlimitedLiquidityTitleLine3") }}</div> -->
              </div>
              <!-- <div class="hightlight" style="color: white">Oyster AMM</div> -->
            </view>
            <view class="section-title-center twothreeCenter">
              {{ $t("home.oysterAmmDescriptionLine1") }}
            </view>
          </view>
        </view>
      </view>

      <!-- 官网内容区域 -->
      <view class="home-page">
        <div class="battle-tested" ref="numTargetElement">
          <view class="top bigTitle">
            <!-- {{ $t("home.battleTestedTitleLine1") }}<br /> -->
            <text class="hightlight_blue"></text>
            {{ $t("home.battleTestedTitleLine2") }}
          </view>
          <view class="bottom">
            <view class="item">
              <!-- <view class="item-title">
              $
              <AnimatedNumber
                :target-value="number"
                :duration="1000"
                :decimal-places="2"
                :auto-play="false"
                :trigger-play="playTrigger"
              />
              B
            </view> -->
              <view class="item-subtitle">{{
                $t("home.cumulativeTradingVolume")
              }}</view>
            </view>
            <view class="item">
              <!-- <view class="item-title">
              <AnimatedNumber
                :target-value="number2"
                :duration="1000"
                :decimal-places="2"
                :auto-play="false"
                :trigger-play="playTrigger"
              />
              K
            </view> -->
              <view class="item-subtitle">{{ $t("home.allTimeTraders") }}</view>
            </view>
            <view class="item">
              <!-- <view class="item-title">
              <AnimatedNumber
                :target-value="number3"
                :duration="1000"
                :decimal-places="2"
                :auto-play="false"
                :trigger-play="playTrigger"
              />
            </view> -->
              <view class="item-subtitle">{{ $t("home.pairsListed") }}</view>
            </view>
          </view>
        </div>
        <view class="industry-leaders">
          <view class="top bigTitle">{{
            $t("home.backedByIndustryLeaders")
          }}</view>
          <view class="bottom">
            <view class="item">
              <a
                v-for="(item, index) in industryLeaders_Images['one']"
                :key="index"
                :href="item.path"
                class="logo"
              >
                <image
                  :src="`../../static/images/${item.imgUrl}.jpg`"
                  mode="widthFix"
                />
              </a>
            </view>
            <view class="item">
              <a
                v-for="(item, index) in industryLeaders_Images['two']"
                :key="index"
                :href="item.path"
                class="logo"
              >
                <image
                  :src="`../../static/images/${item.imgUrl}.jpg`"
                  mode="widthFix"
                />
              </a>
            </view>
            <view class="item">
              <a
                v-for="(item, index) in industryLeaders_Images['three']"
                :key="index"
                href="#"
                class="logo"
              >
                <image
                  :src="`../../static/images/${item.imgUrl}.jpg`"
                  mode="widthFix"
                />
              </a>
            </view>
          </view>
        </view>
        <view class="oyster-amm">
          <view class="top bigTitle">
            <div class="ott">
              <text class="hightlight_blue">ODIN.FUN</text
              >{{ $t("home.oysterAmmTitleLine1") }}
            </div>
            <div style="text-align: center">
              {{ $t("home.oysterAmmTitleLine2") }}
            </div>
          </view>
          <view class="bottom">
            <view class="item_layout">
              <view class="item">
                <view class="item_oyster">
                  <view class="i_p_t hightlight_blue">{{
                    $t("home.tradersSectionTitle")
                  }}</view>
                  <view class="i_p_c">{{
                    $t("home.tradersSectionContentShort")
                  }}</view>
                  <view class="i_p_b">{{
                    $t("home.tradersSectionContent")
                  }}</view>
                </view>
              </view>
            </view>
            <view class="item_layout">
              <view class="item">
                <view class="item_oyster">
                  <view class="i_p_t hightlight_blue">{{
                    $t("home.liquidityProvidersSectionTitle")
                  }}</view>
                  <view class="i_p_c">{{
                    $t("home.liquidityProvidersSectionContentShort")
                  }}</view>
                  <view class="i_p_b">{{
                    $t("home.liquidityProvidersSectionContent")
                  }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="every-trader">
          <view class="top bigTitle">{{
            $t("home.designedForEveryTrader")
          }}</view>
          <view class="center">{{ $t("home.everyTraderDescription") }}</view>
          <view class="bottom">
            <view class="item">
              <view class="item-in">
                <view class="item-title">{{
                  $t("home.thirtySecondListings")
                }}</view>
                <text
                  class="item-subtitle"
                  v-html="$t('home.thirtySecondListingsDesc')"
                ></text>
              </view>
            </view>
            <view class="item">
              <view class="item-in">
                <view class="item-title">{{
                  $t("home.unifiedLiquidity")
                }}</view>
                <text
                  class="item-subtitle"
                  v-html="$t('home.unifiedLiquidityDesc')"
                ></text>
              </view>
            </view>
            <view class="item">
              <view class="item-in">
                <view class="item-title">{{
                  $t("home.rigidRiskManagement")
                }}</view>
                <view class="item-subtitle">{{
                  $t("home.rigidRiskManagementDesc")
                }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <div class="dapp" id="dapp" ref="dappEl">
        <a
          href=""
          style="display: flex; justify-content: center"
          rel="noreferrer noopener"
          target="_blank"
        >
          <img
            alt="Dapp"
            src="../../static/dappbg2.png"
            ref="animatedImg"
            :style="{ transform: transformStyle }"
          />
        </a>
      </div>

      <div class="ecosystem-section">
        <!-- Left content -->
        <div class="syn-partner-left">
          <div class="syn-partner-left-top">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.4142 20.9602L24.0002 22.3722C23.6312 22.7542 23.1898 23.059 22.7018 23.2686C22.2138 23.4782 21.6889 23.5886 21.1578 23.5932C20.6267 23.5978 20.1 23.4966 19.6084 23.2955C19.1168 23.0943 18.6702 22.7973 18.2946 22.4218C17.9191 22.0462 17.622 21.5996 17.4209 21.108C17.2198 20.6164 17.1186 20.0897 17.1232 19.5586C17.1278 19.0275 17.2382 18.5026 17.4478 18.0146C17.6574 17.5265 17.9622 17.0852 18.3442 16.7162L29.6042 5.45218C32.27 4.84584 35.0592 5.09538 37.5751 6.16533C40.091 7.23528 42.2055 9.07118 43.618 11.412C45.0305 13.7528 45.669 16.4793 45.4429 19.2038C45.2167 21.9284 44.1373 24.5123 42.3582 26.5882L38.8502 30.1422C38.7575 30.2362 38.6471 30.3109 38.5254 30.362C38.4037 30.4131 38.273 30.4396 38.141 30.44C38.009 30.4404 37.8782 30.4146 37.7562 30.3642C37.6342 30.3137 37.5234 30.2397 37.4302 30.1462L28.2422 20.9582C27.8669 20.5835 27.3581 20.3732 26.8278 20.3736C26.2975 20.374 25.789 20.585 25.4142 20.9602Z"
                fill="url(#paint0_linear_344_3196)"
              ></path>
              <path
                d="M15.514 13.888L22.34 7.06001C19.6276 5.38165 16.3929 4.75904 13.2513 5.31066C10.1097 5.86227 7.2806 7.5496 5.30224 10.0516C3.32388 12.5535 2.33438 15.6955 2.52205 18.8796C2.70971 22.0638 4.06143 25.0677 6.32 27.32L21.172 42.172C21.9221 42.9219 22.9393 43.3432 24 43.3432C25.0607 43.3432 26.0779 42.9219 26.828 42.172L34.608 34.394C34.7011 34.3011 34.775 34.1908 34.8254 34.0693C34.8758 33.9478 34.9018 33.8175 34.9018 33.686C34.9018 33.5545 34.8758 33.4242 34.8254 33.3027C34.775 33.1813 34.7011 33.0709 34.608 32.978L26.828 25.202L26.54 25.476C24.9929 26.8793 22.9584 27.6219 20.8711 27.5451C18.7838 27.4683 16.8093 26.5782 15.3696 25.0651C13.9298 23.5519 13.1389 21.5356 13.1659 19.4471C13.1929 17.3586 14.0356 15.3635 15.514 13.888Z"
                fill="url(#paint1_linear_344_3196)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_344_3196"
                  x1="18.8655"
                  y1="18.0002"
                  x2="35.8655"
                  y2="35.0002"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#47EBEB"></stop>
                  <stop offset="1" stop-color="#00BFBF"></stop>
                </linearGradient>
                <linearGradient
                  id="paint1_linear_344_3196"
                  x1="33.5281"
                  y1="35.5"
                  x2="6.52808"
                  y2="8.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#99FFFF"></stop>
                  <stop offset="1" stop-color="white"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="syn-partner-left-middle">
            <div class="syn-partner-left-middle-title">
              {{ $t("home.ecosystemPartners") }}
            </div>
            <div class="syn-partner-left-middle-desc">
              {{ $t("home.buildingWithTheBest") }}
            </div>
          </div>
          <div class="syn-partner-left-bottom">
            {{ $t("home.ecosystemPartnersDesc") }}
          </div>
          <!-- <a
            class="syn-partner-left-btn"
            href="javascript:void(0)"
            rel="noreferrer"
            @click="toSwap"
            >{{ $t("home.joinUsButton") }}</a
          > -->
        </div>

        <!-- Right scrolling logos -->
        <div class="right-logos" :class="{ 'rotate-mobile': isMobile }">
          <div class="logo-columns">
            <div
              v-for="(column, colIndex) in 3"
              :key="colIndex"
              :class="{ 'phone-logo-column': isMobile }"
              class="logo-column"
            >
              <div class="logo-list">
                <!-- Duplicate logos for infinite scroll -->
                <div
                  v-for="(logo, index) in duplicatedLogos"
                  :key="index"
                  :class="{ 'phone-logo-box': isMobile }"
                  class="logo-box"
                >
                  <img
                    :src="logo"
                    alt="logo"
                    style="transform: rotate(180deg); border-radius: 12rpx"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="community">
        <div class="community-title">{{ $t("home.joinTheCommunity") }}</div>
        <div class="community-btns">
          <div class="click_btn" @click="toSwap">
            {{ $t("home.getStartButton") }}
          </div>
        </div>
        <div class="community-socials">
          <a
            class="community-socials-item"
            v-for="item in communityList"
            rel="noopener noreferrer"
            :href="item.url"
            target="_blank"
            :key="item.id"
          >
            <image :src="item.img" mode="heightFix"></image>
          </a>
        </div>
      </div>

      <!-- 右边悬浮 -->
      <div id="fabs" class="float-social-container tablet">
        <span
          class="social-icon twitter"
          v-for="(item, index) in communityList"
          :key="index"
          @click="toPath(item.url)"
        >
          <div class="social-icon-text">
            {{ $t("home.followUsOn", { platform: item.title }) }}
          </div>
          <image :src="item.img" mode="heightFix" style="height: 21px"></image>
        </span>
      </div>

      <!-- 置顶按钮 -->
      <CircleScrollProgress v-model="isVisible"></CircleScrollProgress>
      <!-- <div
      class="syn-scroll-to-top active-progress"
      @click="scrollToTop"
      v-show="isVisible"
      :class="{ 'fade-in': isVisible, 'fade-out': !isVisible }"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="syn-scroll-to-top-arrow"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.7276 11.4003C17.3487 11.8021 16.7158 11.8207 16.314 11.4419L13 8.31726L13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17L11 8.31726L7.68601 11.4419C7.28417 11.8207 6.65128 11.8021 6.27241 11.4003C5.89353 10.9985 5.91215 10.3656 6.31398 9.9867L11.314 5.27241C11.6992 4.9092 12.3008 4.9092 12.686 5.27241L17.686 9.9867C18.0878 10.3656 18.1065 10.9985 17.7276 11.4003Z"
          fill="white"
        ></path>
      </svg>
    </div> -->
    </view>
    <Footer />
  </view>
</template>

<script setup>
import CommonHeader from "@/components/header.vue";
import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  computed,
  watch,
  nextTick,
} from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
import img1 from "../../static/airdropbtmBg.png";
import img2 from "../../static/airdropTopBg.png";
import img3 from "../../static/index-top-bg.png";
import vdo1 from "../../static/top_loop.mp4";
import vdo2_1 from "../../static/top_s2-1.mp4";
import vdo2_2 from "../../static/top_s2-2_loop.mp4";
import vdo3_1 from "../../static/top_3-1.mp4";
import vdo3_2 from "../../static/top_3-2_loop.mp4";

import bgImg1 from "@/static/s1_mobile.png";
import bgImg2 from "@/static/s2_mobile.png";
import bgImg3 from "@/static/s3_mobile.png";

import { Swiper, SwiperSlide } from "swiper/vue";
import { getNewsList, getHomeConfig } from "@/api/index";

import AnimatedNumber from "./AnimatedNumber.vue";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const toPath = (url) => {
  window.open(url, "_blank");
};

const numTargetElement = ref(null);

const number = ref(5.67);
const number2 = ref(433.0);
const number3 = ref(349);
const playTrigger = ref(false);

onMounted(() => {
  getHomeConfig().then((res) => {
    if (res.code == 1) {
      let { trading_pairs, trading_user, trading_volume } = res.data;
      number.value = trading_volume;
      number2.value = trading_user;
      number3.value = trading_pairs;
    }
  });
});

const checkPlay = () => {
  playTrigger.value = !playTrigger.value;
};

const toSwap = () => {
  window.open("https://t.me/NEZHAODIN");
};

let newsList = ref([]);
let newsListPageData = ref({
  page: 1,
  limit: 10,
  total: 0,
});
const fetchNewsList = () => {
  let params = {
    type: 1,
  };
  if (newsListPageData) {
    let { limit, page } = newsListPageData.value;
    params = {
      ...params,
      limit,
      page,
    };
  }
  getNewsList(params).then((res) => {
    if (res.code == 1) {
      let result = res.data;
      newsList.value = [...res.data.data];
      newsListPageData.value = {
        page: result.current_page,
        last_page: result.last_page,
        limit: result.per_page,
        total: result.total,
      };
    }
  });
};
// fetchNewsList();

let currentSwiperIndex = ref(0);

const goToPrev = () => {
  const len = newsList.value.length;
  currentSwiperIndex.value = (currentSwiperIndex.value - 1 + len) % len;
};

// 下一页（循环）
const goToNext = () => {
  const len = newsList.value.length;
  currentSwiperIndex.value = (currentSwiperIndex.value + 1) % len;
  console.log(currentSwiperIndex.value);
};

const toNewDetail = (id) => {
  uni.navigateTo({
    url: `/pages/announcement/newDetail?id=${id}`,
  });
};

let industryLeaders_Images = reactive({
  one: [
    { imgUrl: "friend1", path: "" },
    { imgUrl: "friend2", path: "" },
    { imgUrl: "friend3", path: "" },
    { imgUrl: "friend4", path: "" },
    { imgUrl: "friend5", path: "" },
  ],
  two: [
    { imgUrl: "friend6", path: "" },
    { imgUrl: "friend7", path: "" },
    { imgUrl: "friend8", path: "" },
    { imgUrl: "friend9", path: "" },
    { imgUrl: "friend10", path: "" },
  ],
  three: [
    { imgUrl: "friend11", path: "" },
    { imgUrl: "friend12", path: "" },
    { imgUrl: "friend13", path: "" },
    { imgUrl: "friend14", path: "" },
  ],
});

const footerColumns = [
  {
    title: "产品",
    items: [
      { label: "衍生品", url: "https://oyster.synfutures.com" },
      { label: "现货", url: "https://oyster.synfutures.com/#/spot" },
      { label: "Cynthia", url: "https://ai.synfutures.com/" },
    ],
  },
  {
    title: "公司",
    items: [
      {
        label: "加入我们",
        url: "https://synfutures.notion.site/Job-Board-1e4c1f1e416d403a9027812ce6163adb",
      },
    ],
  },
  {
    title: "资源",
    items: [
      { label: "白皮书", url: "https://www.synfutures.com/v3-whitepaper.pdf" },
      { label: "审计报告", isButton: true },
      { label: "文档", url: "https://docs.synfutures.com/" },
      { label: "知识中心", url: "http://knowledgehub.synfutures.com" },
      { label: "旧版本", isButton: true },
    ],
  },
];

const video2 = ref(null);
const playVdo1 = ref("");
const isMobile = ref(window.innerWidth <= 768);
const autoplayStatus = ref(true);
const loopStatus = ref(false);
const activeVideo = ref([]);
const hasSwitched = ref({});
const swiper = ref(null);
const images = ref([
  {
    vdo1: vdo1,
    vdo2: null,
    img: bgImg1,
    vdoStatus: true,
    vdo2Status: true,
  },
  {
    vdo1: vdo2_1,
    vdo2: vdo2_2,
    img: bgImg2,
    vdoStatus: false,
    vdo2Status: true,
  },
  {
    vdo1: vdo3_1,
    vdo2: vdo3_2,
    img: bgImg3,
    vdoStatus: false,
    vdo2Status: true,
  },
]);

const socialList = [
  {
    name: "YouTube",
    url: "https://youtube.com",
    svg: `<svg width="24" height="24"  viewBox="0 0 24 24">
            <path fill="#00bfbf" d="M10 15l5.19-3L10 9v6zm12-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>`,
  },
  {
    name: "Discord",
    url: "https://discord.com",
    svg: `<svg fill="#00bfbf" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.2701 5.33005C17.9401 4.71005 16.5001 4.26005 15.0001 4.00005C14.9869 3.99963 14.9739 4.00209 14.9618 4.00728C14.9497 4.01246 14.9389 4.02023 14.9301 4.03005C14.7501 4.36005 14.5401 4.79005 14.4001 5.12005C12.8091 4.88005 11.1911 4.88005 9.60012 5.12005C9.46012 4.78005 9.25012 4.36005 9.06012 4.03005C9.05012 4.01005 9.02012 4.00005 8.99012 4.00005C7.49012 4.26005 6.06012 4.71005 4.72012 5.33005C4.71012 5.33005 4.70012 5.34005 4.69012 5.35005C1.97012 9.42005 1.22012 13.38 1.59012 17.3C1.59012 17.32 1.60012 17.34 1.62012 17.35C3.42012 18.67 5.15012 19.47 6.86012 20C6.89012 20.01 6.92011 20 6.93012 19.98C7.33012 19.43 7.69012 18.85 8.00012 18.24C8.02012 18.2 8.00012 18.16 7.96012 18.15C7.39012 17.93 6.85012 17.67 6.32012 17.37C6.28012 17.35 6.28011 17.29 6.31012 17.26C6.42012 17.18 6.53011 17.09 6.64012 17.01C6.66012 16.99 6.69012 16.99 6.71012 17C10.1501 18.57 13.8601 18.57 17.2601 17C17.2801 16.99 17.3101 16.99 17.3301 17.01C17.4401 17.1 17.5501 17.18 17.6601 17.27C17.7001 17.3 17.7001 17.36 17.6501 17.38C17.1301 17.69 16.5801 17.94 16.0101 18.16C15.9701 18.17 15.9601 18.22 15.9701 18.25C16.2901 18.86 16.6501 19.44 17.0401 19.99C17.0701 20 17.1001 20.01 17.1301 20C18.8501 19.47 20.5801 18.67 22.3801 17.35C22.4001 17.34 22.4101 17.32 22.4101 17.3C22.8501 12.77 21.6801 8.84005 19.3101 5.35005C19.3001 5.34005 19.2901 5.33005 19.2701 5.33005ZM8.52012 14.91C7.49012 14.91 6.63012 13.96 6.63012 12.79C6.63012 11.62 7.47012 10.67 8.52012 10.67C9.58012 10.67 10.4201 11.63 10.4101 12.79C10.4101 13.96 9.57012 14.91 8.52012 14.91ZM15.4901 14.91C14.4601 14.91 13.6001 13.96 13.6001 12.79C13.6001 11.62 14.4401 10.67 15.4901 10.67C16.5501 10.67 17.3901 11.63 17.3801 12.79C17.3801 13.96 16.5501 14.91 15.4901 14.91Z" ></path></svg>`,
  },
  {
    name: "Telegram",
    url: "https://t.me",
    svg: `<svg width="24" height="24"  viewBox="0 0 24 24">
            <path fill="#00bfbf" d="M9.993 15.924l-.397 4.425c.567 0 .812-.243 1.114-.537l2.662-2.523 5.516 4.029c1.012.558 1.73.264 1.994-.934l3.62-17.038c.347-1.648-.598-2.294-1.643-1.876L1.77 9.072c-1.615.63-1.597 1.53-.276 1.937l4.498 1.405L18.708 5.74c.615-.372 1.176-.165.715.207"/>
          </svg>`,
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    svg: `<svg fill="#00bfbf" width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6423 2.3125H13.572L9.35626 7.13083L14.3158 13.6875H10.4325L7.39101 9.71092L3.91084 13.6875H1.98001L6.48917 8.53375L1.73151 2.3125H5.71334L8.46259 5.94725L11.6423 2.3125ZM10.9651 12.5325H12.0343L5.13234 3.40683H3.98492L10.9651 12.5325Z" ></path></svg>`,
  },
  {
    name: "GitHub",
    url: "https://github.com",
    svg: `<svg width="24" height="24"  viewBox="0 0 24 24">
            <path fill="#00bfbf" d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.45c.6.11.82-.26.82-.58v-2.16c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.86 2.84 1.32 3.54 1.01.11-.78.42-1.32.76-1.63-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>`,
  },
];

const communityList = ref([
  {
    img: "../../static/images/icon1.png",
    url: "https://t.me/NEZHAODIN",
    id: 1,
    title: "Telegram",
  },
  // {
  //   img: "../../static/images/icon2.png",
  //   url: "#",
  //   id: 2,
  //   title: "Discord",
  // },
  // {
  //   img: "../../static/images/icon3.png",
  //   url: "#",
  //   id: 3,
  //   title: "Facebook",
  // },
  {
    img: "../../static/images/icon4.png",
    url: "https://x.com/NezhaOdinfun",
    id: 4,
    title: "Twitter",
  },
]);

const switchVideo = (index) => {
  if (activeVideo.value[index] !== "vdo2") {
    const videoEls = document.querySelectorAll("video");
    const video2El = videoEls[index * 2 + 1]; // vdo2 是第二个 video

    if (video2El?.paused) {
      video2El.currentTime = 0;
      video2El.play(); // 提前播放
    }

    // 切换 activeVideo 来展示 vdo2（只是改变 class）
    activeVideo.value[index] = "vdo2";
  }
};

const onVideoEnded = (index) => {
  // 不再需要切换逻辑
};

const onVideo2Ended = (index) => {
  // vdo2 会自动 loop，无需处理
};

const onLoadedMetadata = (index, videoType, event) => {
  const duration = event.detail.duration;
};
const onTimeUpdate = (index, videoType, event) => {
  if (videoType !== "vdo1") return; // 只监测 vdo1 的播放状态
  if (index === 0) return;
  const video = event.detail;
  const currentTime = video.currentTime;
  const duration = video.duration;
  if (hasSwitched.value[index]) return;
  if (duration - currentTime <= 0.2) {
    hasSwitched.value[index] = true; // 标记已切换
    switchVideo(index);
  }
};

const currentIndex = ref(0);
let isScrolling = false;
let scrollTimeout = null;

const dappEl = ref(null);
const transformStyle = ref(
  " perspective(407rem) rotateX(-40deg) scale(0.9, 0.9)"
);

const lastTopState = ref(false);
const lastBottomState = ref(false);

const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    topInRange: rect.top >= 0 && rect.top <= window.innerHeight,
    bottomInRange: rect.bottom >= 0 && rect.bottom <= window.innerHeight,
  };
};

const updateTransform = () => {
  if (!dappEl.value) return;

  const rect = dappEl.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  if (!numTargetElement.value) return;

  const visibility = isElementInViewport(numTargetElement.value);

  if (visibility.topInRange && !lastTopState.value) {
    lastTopState.value = true;
    checkPlay();
  }

  if (visibility.bottomInRange && lastTopState.value) {
    lastTopState.value = false;
  }

  if (visibility.bottomInRange && !lastBottomState.value) {
    lastBottomState.value = true;
    checkPlay();
  }

  if (!visibility.bottomInRange && lastBottomState.value) {
    lastBottomState.value = false;
  }

  // 计算元素底部与视口底部的距离
  const distance = rect.bottom - viewportHeight;
  const triggerDistance = viewportHeight; // 动画从视口外1个视口高度开始到视口底部完成

  // 进度从0（视口外）到1（元素底部到达视口底部）
  const progress = Math.min(1, Math.max(0, 1 - distance / triggerDistance));

  // 插值计算
  const perspective = 437 * (1 - progress); // 从437.5rem到0rem
  const rotateX = -40 * (1 - progress); // 从-40deg到0deg
  const scale = 0.9 + 0.1 * progress; // 从0.9到1

  // 更新transform样式
  transformStyle.value = ` perspective(${perspective}rem) rotateX(${rotateX}deg) scale(${scale}, ${scale})`;

  // 调试：取消注释以下行以检查progress值
  // console.log('Progress:', progress, 'Distance:', distance, 'Transform:', transformStyle.value);
};

const handleVideoSwitch = async (newIndex, oldIndex) => {
  if (newIndex == 0) {
    playVdo1.value = vdo1;
    loopStatus.value = true;
  } else if (newIndex == 1) {
    playVdo1.value = vdo2_1;
    loopStatus.value = false;
  }
};

watch(
  currentIndex,
  (newVal, oldVal) => {
    handleVideoSwitch(newVal, oldVal);
  },
  { immediate: true }
);

const baseLogos = [
  "https://www.synfutures.com/assets/logo_partner_01-Cvi7i9vt.png",
  // "https://www.synfutures.com/assets/logo_partner_02-bJ8dg-9T.png",
  "../../static/images/nezha3.jpg",
  "https://www.synfutures.com/assets/logo_partner_03-CDoAYMqb.png",
  // "data:image/png;base64,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",
  "../../static/images/bit.webp",
  "https://www.synfutures.com/assets/logo_partner_01-Cvi7i9vt.png",
  // "https://www.synfutures.com/assets/logo_partner_02-bJ8dg-9T.png",
  "../../static/images/nezha3.jpg",
  "https://www.synfutures.com/assets/logo_partner_03-CDoAYMqb.png",
  // "data:image/png;base64,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",
  "../../static/images/bit.webp",
];

// 三列数据，使用同一套图标
const columns = [0, 1, 2];
const duplicatedLogos = computed(() => [...baseLogos, ...baseLogos]);

// 处理鼠标滚轮事件
const handleWheel = (event) => {
  if (isScrolling) return;
  isScrolling = true;

  setTimeout(() => {
    isScrolling = false;
  }, 400);

  event.preventDefault();

  const windowHeight = window.innerHeight;
  const maxImageScroll = images.value.length * windowHeight; // 图片区域 + spacer 的最大滚动位置

  if (event.deltaY > 0) {
    // 向下滚动
    if (currentIndex.value < images.value.length - 1) {
      currentIndex.value++;
      window.scrollTo({
        top: currentIndex.value * windowHeight,
        behavior: "smooth",
      });
    } else if (
      currentIndex.value === images.value.length - 1 &&
      window.scrollY < maxImageScroll
    ) {
      // 从最后一张图片滚动到 spacer
      window.scrollTo({
        top: maxImageScroll,
        behavior: "smooth",
      });
    }
    // 内容区域内向下滚动，允许浏览器默认行为
  } else if (event.deltaY < 0) {
    // 向上滚动
    if (window.scrollY > maxImageScroll + windowHeight / 2) {
      // 在内容区域内，接近顶部时才跳转到 spacer
      if (window.scrollY <= maxImageScroll + windowHeight) {
        currentIndex.value = images.value.length - 1;
        window.scrollTo({
          top: maxImageScroll,
          behavior: "smooth",
        });
      }
      // 否则允许内容区域内正常向上滚动
    } else if (window.scrollY > maxImageScroll) {
      // 从内容区域顶部附近直接跳转到 spacer
      currentIndex.value = images.value.length - 1;
      window.scrollTo({
        top: maxImageScroll,
        behavior: "smooth",
      });
    } else if (window.scrollY >= maxImageScroll - windowHeight / 2) {
      // 从 spacer 向上滚动到最后一张图片
      currentIndex.value = images.value.length - 1;
      window.scrollTo({
        top: currentIndex.value * windowHeight,
        behavior: "smooth",
      });
    } else if (currentIndex.value > 0) {
      currentIndex.value--;
      window.scrollTo({
        top: currentIndex.value * windowHeight,
        behavior: "smooth",
      });
    }
  }
};

// 设置容器高度
const setContainerHeight = () => {
  const imageSection = document.querySelector(".image-section");
  if (imageSection) {
    imageSection.style.height = `${images.value.length * 100}vh`;
  }
};

const isVisible = ref(false);
let ticking = false;

// 监听滚动事件，仅用于非滚轮触发的滚动
const handleScroll = () => {
  if (isScrolling) return;

  if (!ticking) {
    requestAnimationFrame(() => {
      isVisible.value = window.scrollY > 300;
      ticking = false;
    });
    ticking = true;
  }

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const maxImageScroll = images.value.length * windowHeight;

    // 只在图片区域更新索引
    if (scrollTop <= maxImageScroll) {
      let newIndex;
      if (scrollTop >= maxImageScroll - windowHeight / 4) {
        newIndex = images.value.length - 1;
      } else {
        newIndex = Math.floor(scrollTop / windowHeight);
      }

      if (newIndex < 0) newIndex = 0;
      if (newIndex >= images.value.length) newIndex = images.value.length - 1;

      if (newIndex !== currentIndex.value) {
        currentIndex.value = newIndex;
      }
    }
  }, 100);
};

// 预加载图片
onMounted(() => {
  activeVideo.value = images.value.map(() => "vdo1");
  setTimeout(() => {
    const videoEls = document.querySelectorAll("video");
    videoEls.forEach((video, i) => {
      if (i % 2 === 1) {
        // vdo2
        video.muted = true;
        video
          .play()
          .then(() => {
            video.pause();
            video.currentTime = 0;
          })
          .catch(() => {});
      }
    });
  }, 500);
  images.value.forEach((_, index) => {
    activeVideo.value[index] = "vdo1";
    hasSwitched.value[index] = false;
  });
  setContainerHeight();
});

onShow(() => {
  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", updateTransform);
  window.addEventListener("resize", updateTransform);
});

onUnmounted(() => {
  window.removeEventListener("wheel", handleWheel);
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("scroll", updateTransform);
  window.removeEventListener("resize", updateTransform);
  clearTimeout(scrollTimeout);
});

onHide(() => {
  window.removeEventListener("wheel", handleWheel, { passive: false });
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("scroll", updateTransform);
  window.removeEventListener("resize", updateTransform);
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  position: relative;
  overflow-y: visible;
  overflow-x: hidden;
  background-color: #040c16;
  display: flex;
  flex-direction: column;
  row-gap: 160px;
  padding-top: 0 !important;

  @media (max-width: 900px) {
    row-gap: 0;
  }
}

::v-deep .uni-video-cover {
  display: none !important;
}

.image-section {
  width: 100%;
  position: relative;
  cursor: url("@/static/follow_scroll.svg") 50 50, auto;
}

.image-wrapper {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  /* visibility: hidden; */
  z-index: 0;
  will-change: visibility;
  display: flex;
  justify-content: center;

  .bgMobileImg {
    width: 100%;
    height: 100%;
    @media screen and (max-width: 768px) {
      display: block !important;
    }
    @media screen and (min-width: 769px) {
      display: none;
    }
  }

  .video_play {
    width: 100%;
    height: 100%;
    // object-fit: cover !important;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    transition: display 0.1 ease;
    opacity: 1;
    transition: opacity 0.1s ease-in;
  }

  .hide {
    opacity: 0;
    display: none !important;
  }

  .video_play.active {
    opacity: 1;
    z-index: 1;
  }

  .section-container {
    position: absolute;
    top: 21.4vh !important;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 96rpx;

    @media (max-width: 1600px) {
      row-gap: 36px;
    }

    @media (max-width: 900px) {
      max-width: 100%;
      top: 7vh !important;
      row-gap: 28px;
    }

    .tt {
      background: var(
        --title-gradient,
        linear-gradient(270deg, #9ff 0%, #66b2ff 100%)
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hightlight {
    }
    .hightbg {
      background: var(
        --title-gradient,
        linear-gradient(270deg, #9ff 0%, #66b2ff 100%)
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .section-title-top {
      white-space: nowrap;
      font-size: 72px;
      line-height: 1.5;
      font-weight: 700;
      line-height: 80px;

      @media (max-width: 1600px) {
        font-size: 48px;
        line-height: 56px;
      }

      @media (max-width: 900px) {
        white-space: pre-wrap !important;
        font-size: 32px;
        line-height: 40px;
        width: 100%;
      }
    }

    .section-title-center {
      // font-size: 40px;
      line-height: 60px;
      color: white;

      @media (max-width: 900px) {
        font-size: 16px;
      }
    }

    .twothreeCenter {
      max-width: 100%;
      width: 632px !important;
      font-size: 48rpx;
      line-height: 80rpx;

      @media (max-width: 1600px) {
        width: 409px !important;
        font-size: 20px;
        line-height: 32px;
      }
    }

    .section-title-bottom {
      button {
        width: 320px;
        height: 72px;
        line-height: 72px;
        font-size: 20px;
        background-image: url(/src/static/test2on.png);
        background-color: transparent;
        background-size: 100% 100%;
        color: white;
        border-radius: 9999px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background-image: url(/src/static/tradeNowHover.png);
        }

        @media (max-width: 900px) {
          width: 180px;
          height: 54px;
          line-height: 54px;
          font-size: 16px;
        }
      }
    }
  }

  .section-three {
    align-items: flex-start;
    left: calc((100vw - 1280px) / 2);
    text-align: left;

    @media (max-width: 1600px) {
      left: 180px;
    }

    .section-title-center {
      text-align: left;
      width: 100%;
    }
  }

  .section-two {
    font-size: 24px;
    top: 22vh !important;
    @media (max-width: 900px) {
      top: 152px !important;
    }
  }

  .section-one {
    top: 18vh !important;
    .oneCenter {
      font-size: 28px;
    }
    .nezha-bg {
      width: 22vh;
      height: 22vh;
    }
    @media (min-width: 1600px) {
      .oneCenter {
        line-height: 60px !important;
        font-size: 40px !important;
      }
      line-height: 56px;
    }
    @media (min-width: 901px) {
      .oneCenter {
        line-height: 42px;
      }
    }
    @media (max-width: 900px) {
      top: 15vh !important;
      .nezha-bg {
        width: 80px;
        height: 80px;
      }
      .oneCenter {
        font-size: 18px !important;
        line-height: 27px;
      }
    }
  }
  @media (max-width: 900px) {
    .section-three {
      left: 0;
      right: 0;
      top: 92px !important;
      text-align: center;
      align-items: center;

      .section-title-center {
        text-align: left;
        width: 300px !important;
        text-align: center;
      }
    }

    .section-two,
    .section-three {
      .twothreeCenter {
        font-size: 40rpx !important;
        line-height: 70rpx !important;

        @media (max-width: 900px) {
          font-size: 12px !important;
          line-height: 20px !important;
        }
      }
    }
  }
}

.image-wrapper.active {
  visibility: visible;
  z-index: 1;
}

.battle-tested {
  display: flex;
  flex-direction: column;
  row-gap: 64px;
  align-items: center;
  padding-top: 88px;
  padding-bottom: 160px;
  cursor: default;
  text-align: center;
  color: white;
  background-color: #040c16;

  .top {
    @media (max-width: 900px) {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      padding-top: 0;
    }
  }

  .bottom {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 64rpx;

    @media (max-width: 900px) {
      padding: 0 32rpx !important;
    }

    .item {
      overflow: hidden;
      padding: 20rpx;
      display: flex;
      height: 600rpx;
      width: 822rpx;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 24px;
      border-radius: 64rpx;
      border: solid 1px transparent;
      background-image: linear-gradient(to bottom, #051622, #0a1c2a),
        linear-gradient(to bottom, #1076b166, #1076b100);
      background-origin: border-box;
      background-clip: padding-box, border-box;

      @media (max-width: 900px) {
        width: 343px;
        height: 200px;
      }

      .item-title {
        white-space: nowrap;
        transition: all 0.3s ease;
        font-size: 144rpx;
        font-weight: 800;
        line-height: 144rpx;
        background: var(
          --num-gradient,
          linear-gradient(270deg, #9ff 0%, #fff 100%)
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        @media (max-width: 900px) {
          font-size: 56px;
          font-weight: 800;
          line-height: 56px;
        }
      }

      .item-subtitle {
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
        color: #47ebeb;

        @media (max-width: 900px) {
          font-size: 16px;
          line-height: 16px;
        }
      }
    }
  }
}

.home-page {
  background-color: #040c16;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 160px;

  @media (max-width: 900px) {
    padding-top: 0;
    // row-gap: 0;
  }
}

.industry-leaders {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 64rpx;
  row-gap: 64px;
  align-items: center;
  background-color: #040c16;

  .top {
    @media (max-width: 900px) {
      font-size: 24px;
      line-height: 32px;
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 64rpx;

    .item {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;

      .logo:hover {
        border: 1px solid #00bfbf;
      }

      a {
        border-radius: 32rpx;
        border: solid 1px transparent;
        background-image: linear-gradient(to bottom, #051622, #0a1c2a),
          linear-gradient(to bottom, #1076b166, #1076b100);
        background-origin: border-box;
        background-clip: padding-box, border-box;
        display: flex;
        width: 240px;
        height: 96px;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        image {
          width: 60%;
        }
      }
    }
  }
}

.oyster-amm {
  display: flex;
  flex-direction: column;
  gap: 64px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: none;
  }

  .top {
    .ott {
      text-align: center;
    }
  }

  .bottom {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;

    .item_layout {
      background-origin: border-box;
      background-clip: padding-box, border-box;
      border: solid 1px transparent;
      box-shadow: 0 30px 50px #0000004d;
      border-radius: 64rpx;
      background-image: linear-gradient(to bottom, #051622, #0a1c2a),
        linear-gradient(to bottom, #1076b166, #1076b100);
    }

    .item {
      background: linear-gradient(to bottom, #051622, #0a1c2a),
        linear-gradient(to bottom, #1076b166, #1076b100);
      background-image: url(/assets/product_01_off-DP3VWtwQ.png);
      background-size: contain;
      background-position: right;
      background-repeat: no-repeat;
      transition: background-image 0.3s ease-in;
      width: 628px;
      height: 456px;
      border-radius: 32px;

      @media (max-width: 900px) {
        width: 343px;
        height: 304px;
      }

      .item_oyster {
        width: 368px;
        height: 100%;
        padding: 64px 0 72px 72px;
        display: flex;
        flex-direction: column;

        @media (max-width: 900px) {
          padding: 28px 0 32px 32px;
          width: 183px;
        }

        .i_p_t {
          font-size: 20px;
          font-weight: 400;
          line-height: 24px;

          @media (max-width: 900px) {
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
          }
        }

        .i_p_c {
          margin-top: 24px;
          font-size: 64rpx;
          font-weight: 700;
          line-height: 40px;
          color: white;

          @media (max-width: 900px) {
            font-size: 20px;
            font-weight: 700;
            line-height: 24px;
            margin-top: 12px;
          }
        }

        .i_p_b {
          margin-top: 48px;
          font-size: 32rpx;
          font-weight: 400;
          line-height: 24px;
          color: #8cbfd9;

          @media (max-width: 900px) {
            font-size: 12px;
            margin-top: 24px;
            font-weight: 400;
            line-height: 16px;
          }
        }
      }
    }
  }

  .bottom {
    .item_layout {
      &:first-child .item {
        background-image: url(@/static/priceimg.png);
        transition: background-image 0.3s ease; // 添加平滑过渡效果（可选）

        &:hover {
          cursor: pointer;
          background: #10364d;
          background-size: contain;
          background-position: right;
          background-repeat: no-repeat;
          background-image: url(@/static/priceimg_hover.png); // 鼠标移入时切换图片
        }
      }

      &:last-child .item {
        background-image: url(@/static/priceimg2.png);
        transition: background-image 0.3s ease; // 添加平滑过渡效果（可选）

        &:hover {
          cursor: pointer;
          background: #10364d;
          background-size: contain;
          background-position: right;
          background-repeat: no-repeat;
          background-image: url(@/static/priceimg2_hover.png); // 鼠标移入时切换图片
        }
      }
    }
  }
}

.every-trader {
  display: flex;
  flex-direction: column;
  row-gap: 64rpx;
  align-content: center;
  text-align: center;

  @media (max-width: 900px) {
    row-gap: 16px;
  }

  .center {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    color: #8cbfd9;

    @media (max-width: 900px) {
      font-size: 12px;
      width: 244px;
      margin: 0 auto;
    }
  }

  .bottom {
    padding: 0 64rpx;
    display: flex;
    justify-content: center;
    column-gap: 24px;
    padding-top: 64rpx;

    @media (max-width: 900px) {
      flex-direction: column;
      row-gap: 16px;
      align-items: center;
    }

    .item {
      overflow: hidden;
      border: solid 1px transparent;
      border-radius: 64rpx;
      background-image: linear-gradient(to bottom, #051622, #0a1c2a),
        linear-gradient(to bottom, #1076b166, #1076b100);
      background-origin: border-box;
      background-clip: padding-box, border-box;

      @media (max-width: 900px) {
        border-radius: 16px;
      }

      .item-in {
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom;
        // background: var(--frame-solid, linear-gradient(180deg, rgba(0, 148, 194, .07) 0%, rgba(41, 135, 188, .12) 100%));
        max-width: 420px;
        height: 640px;
        padding: 45px 64px;
        display: flex;
        flex-direction: column;
        row-gap: 48px;
        transition: background-image 0.3s ease-in;

        @media (max-width: 900px) {
          width: 343px;
          height: 440px;
          padding: 32px 40px;
        }

        .item-title {
          font-size: 64rpx;
          font-weight: 700;
          line-height: 40px;
          width: 202px;
          padding-left: 64rpx;
          text-align: left;
          position: relative;
          height: 80px;
          color: white;

          @media (max-width: 900px) {
            font-size: 24px;
            padding-left: 24px;
            text-align: left;
          }
        }

        .item-subtitle {
          color: #8cbfd9;
          font-size: 32rpx;
          font-weight: 400;
          line-height: 24px;
          text-align: left;
          height: 100%;
          overflow-y: scroll;
          -ms-overflow-style: none; /* IE, Edge */
          scrollbar-width: none; /* Firefox */
          &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }

          @media (max-width: 900px) {
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
          }
        }

        .item-title::before {
          content: "";
          width: 4px;
          height: 64px;
          background: #00bfbf;
          position: absolute;
          left: -4px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }

  .bottom .item:first-child {
    .item-in {
      background-image: url(@/static/trader1.png);
    }

    &:hover {
      .item-in {
        cursor: pointer;
        background: #10364d;
        background-size: contain;
        background-position: bottom;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(@/static/trader1_hover.png); // 鼠标移入时切换图片
      }
    }
  }

  .bottom .item:nth-child(2) {
    .item-in {
      background-image: url(@/static/trader2.png);
    }

    &:hover {
      .item-in {
        cursor: pointer;
        background: #10364d;
        background-size: contain;
        background-position: bottom;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(@/static/trader2_hover.png); // 鼠标移入时切换图片
      }
    }
  }

  .bottom .item:last-child {
    .item-in {
      background-image: url(@/static/trader3.png);
    }

    &:hover {
      .item-in {
        cursor: pointer;
        background: #10364d;
        background-size: contain;
        background-position: bottom;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(@/static/trader3_hover.png); // 鼠标移入时切换图片
      }
    }
  }
}

.dapp {
  background: url(@/static/dappbg1.png) center no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;

  a {
    width: 100%;
    display: block;

    img {
      padding: 64rpx;
      width: 100%;
      height: auto;
      max-width: 1280px;
      transform: perspective(207rem) rotateX(-40deg) scale(0.9);
      transform-origin: top center;
    }

    img {
      height: auto;
    }
  }
}

.hightlight_blue {
  color: #47ebeb !important;
}

.bigTitle {
  font-size: 96rpx;
  font-weight: 700;
  line-height: 112rpx;
  color: white;

  @media (max-width: 900px) {
    font-size: 48rpx;
    line-height: 64rpx;
  }
}

.full-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  display: block;
  transform: translateZ(0);
}

.spacer {
  width: 100%;
  height: 100vh;
}

.content-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  position: relative;
  z-index: 2;
  padding: 40px 20px;
  box-sizing: border-box;
}

.content-section {
  max-width: 1400rpx;
  margin: 0 auto;
  text-align: center;
}

.content-title {
  font-size: 64rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.content-text {
  font-size: 32rpx;
  color: #666;
  line-height: 1.6;
  margin-bottom: 40px;
}

.content-card {
  display: inline-block;
  width: 600rpx;
  margin: 20px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.card-image {
  width: 100%;
  height: 400rpx;
  object-fit: cover;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  padding: 15px;
}

.card-description {
  font-size: 14px;
  color: #666;
  padding: 0 15px 15px;
}

@media screen and (max-width: 1280px) {
  .ecosystem-section {
    flex-wrap: wrap;

    .syn-partner-left {
      padding: 60px 64rpx;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content !important;
    }

    .syn-partner-right {
      width: 100%;
      rotate: 90deg;
      row-gap: 24px;
      height: auto;
      padding-bottom: 64rpx;
    }
  }
}

.ecosystem-section {
  background: url("../../static/bg_partner.png") center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  column-gap: 128px;
  overflow: hidden;

  .syn-partner-left {
    padding: 70px 0 60px;
    width: 400px;
    display: flex;
    flex-direction: column;
    row-gap: 48px;

    @media (max-width: 900px) {
      row-gap: 16px;
      padding: 15px 0;
      align-items: center;
    }

    .syn-partner-left-top {
      padding-bottom: 48px;
      border-bottom: 1px solid rgba(17, 120, 178, 0.35);

      @media (max-width: 900px) {
        padding: 0;
        text-align: center;
        border-bottom: 0;
      }
    }

    .syn-partner-left-middle {
      display: flex;
      flex-direction: column;
      row-gap: 24px;

      @media (max-width: 900px) {
        align-items: center;
        text-align: center;
      }

      .syn-partner-left-middle-title {
        color: #47ebeb;
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
      }

      .syn-partner-left-middle-desc {
        width: 290px;
        font-size: 48px;
        font-weight: 700;
        line-height: 56px;
        color: #fff;

        @media (max-width: 900px) {
          font-size: 20px;
          font-weight: 700;
          line-height: 24px;
        }
      }
    }

    .syn-partner-left-bottom {
      font-size: 32rpx;
      color: #8cbfd9;
      font-weight: 400;
      line-height: 24px;

      @media (max-width: 900px) {
        text-align: center;
        width: 253px;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
      }
    }

    .syn-partner-left-btn {
      text-decoration: none;
      border-radius: 99px;
      background: #00bfbf;
      display: flex;
      padding: 32rpx 24px;
      align-items: center;
      color: #fff;
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;

      @media (max-width: 900px) {
        border-radius: 74.25px;
        padding: 12px 18px;
        gap: 6px;
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
      }
    }
  }
}

.left-content {
  flex: 1;
  max-width: 500px;
  padding: 20px;
}

.right-logos {
  width: 696px;
  height: 696px;
  display: flex;
  justify-content: center;
  pointer-events: none;
  transform: rotate(90deg);
}

.rotate-mobile {
  transform: rotate(0deg);
  width: 100%;
  row-gap: 24px;
  // height: auto;
  // padding-bottom: 64rpx;
}

.logo-columns {
  display: flex;
  gap: 20px;
  transform: rotate(90deg);
  width: 100%;

  @media (max-width: 900px) {
    width: auto;
  }
}

.phone-logo-column {
  width: 105px !important;
}

.logo-column {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 232px;
  /* 696px / 3 columns */
}

.logo-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  will-change: transform;
}

/* Odd columns scroll up, even columns scroll down */
.logo-column:nth-child(odd) .logo-list {
  animation: scroll-up 20s linear infinite;
}

.logo-column:nth-child(even) .logo-list {
  animation: scroll-down 20s linear infinite;
}

.phone-logo-box {
  width: 104px !important;
  height: 104px !important;
  // margin-left: 24px !important;
  padding: 0 !important;
  border-radius: 32rpx !important;
}

.phone-logo-box img {
  width: 48px !important;
  height: 48px !important;
}

.logo-box {
  width: 205px;
  height: 205px;
  border-radius: 64rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(0, 148, 194, 0.07) 0%,
    rgba(41, 135, 188, 0.12) 100%
  );
}

.logo-box img {
  width: 90px;
  height: 90px;
}

@keyframes scroll-up {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-50%);
  }
}

@keyframes scroll-down {
  0% {
    transform: translateY(-50%);
  }

  100% {
    transform: translateY(0);
  }
}

#news {
  .syn-news-container {
    padding: 0 64rpx;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    row-gap: 48px;

    .syn-news-container-top {
      display: flex;
      flex-direction: column;
      row-gap: 24px;

      .syn-news-container-top-title {
        font-size: 48px;
        font-weight: 700;
        line-height: 56px;
        color: #fff;

        @media (max-width: 900px) {
          font-size: 24px;
          font-weight: 700;
          line-height: 32px;
          text-align: center;
          padding-top: 100rpx;
        }
      }

      .syn-news-container-top-tabs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 135rpx;

        @media (max-width: 900px) {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .bg-newsTab {
          color: #47ebeb;
          width: 320rpx;
          height: 96rpx;
          border-color: rgba(114, 204, 255, 0.35);
          background-image: linear-gradient(180deg, #10364d, #0d2635),
            linear-gradient(180deg, #70cbff80, #70cbff00);
          border-style: solid;
          border-width: 1px;
          border-radius: 99px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 40rpx;

          @media (max-width: 900px) {
            width: 120px;
            height: 36px;
          }
        }

        .syn-news-container-top-tabs-arrows {
          display: flex;
          column-gap: 32rpx;
          align-items: center;

          @media (max-width: 900px) {
            display: none;
          }

          .syn-news-container-top-tabs-arrows-arrow {
            cursor: pointer;
            border-radius: 99px;
            width: 96rpx;
            height: 96rpx;
            padding: 6px;
            border: solid 1px transparent;
            background-image: linear-gradient(to bottom, #051622, #0a1c2a),
              linear-gradient(to bottom, #1076b166, #1076b100);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .syn-news-container-top-tabs-arrows-arrow:hover {
            border: 1px solid #00bfbf;
          }
        }
      }
    }
  }

  .news {
    position: relative;

    .left-line {
      background-color: #040c16;
      height: 500px;
      position: absolute;
      z-index: 10;
      width: calc((100vw - 1280px) / 2);
    }

    .news-box {
      width: 1280px;
      margin: auto;

      .news-container {
        padding-top: 64px;
        transform: translate3d(0px, 0px, 0px);
        display: flex;

        .news-content {
          transform: translate3d(0px, 0px, 0px);
          padding: 10px;
          overflow: hidden;
          cursor: pointer;
          flex: 0 0 320px;
          height: 320px;
          position: relative;
          box-sizing: border-box;
        }

        .news-content:hover .news-content-button {
          color: #fff;
          --tw-bg-opacity: 1;
          background-color: #00bfbf;
        }

        @media (min-width: 900px) {
          padding-top: 0;
          padding-bottom: 0;
          .news-content {
            flex: 0 0 420px;
            height: 420px;
          }
        }

        .news-bg {
          position: absolute;
          background-repeat: no-repeat;
          background-position: bottom;
          background-size: auto 100%;
          border-radius: 64rpx;
          width: 299px;
          height: 299px;
          z-index: -2;
          top: 10.5px;
          left: 10.5px;
        }

        @media (min-width: 900px) {
          .news-bg {
            height: 399px;
            width: 399px;
          }
        }

        .news-content-box {
          padding: 30px 36px;
          background-image: linear-gradient(
            to bottom,
            #03192bfa 50%,
            #03192bcc
          );
          border-radius: 64rpx;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          height: 100%;
          box-sizing: border-box;

          .news-content-box-day {
            color: #47ebeb;
            font-size: 32rpx;
            line-height: 24px;

            @media (max-width: 900px) {
              font-size: 16px;
              line-height: 1.5rem;
            }
          }

          .news-content-box-title {
            font-weight: 700;
            font-size: 24px;
            overflow: hidden;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            color: #fff;
          }

          .news-content-button {
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 0.15s;
            color: #8cbfd9;
            line-height: 32rpx;
            font-weight: 700;
            font-size: 14px;
            line-height: 20px;
            padding: 32rpx 24px;
            background-color: #10364d;
            border-radius: 999px;
            text-wrap: nowrap;
            display: flex;
            justify-content: center;
            align-items: center;
            width: fit-content;
            margin: 0;

            .fill-gray-blue {
              fill: #8cbfd9;
            }
          }
        }

        .news-content-box:hover {
          background: linear-gradient(to bottom, #10354cf2 50%, #10354c00);
        }
      }
    }
  }
}

.community {
  background: url("../../static/community-bg.png") center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 147px 0;

  .community-title {
    font-size: 128rpx;
    font-weight: 700;
    line-height: 144rpx;
    width: 714px;
    color: #fff;
    text-align: center;
  }

  @media (max-width: 900px) {
    background: url("../../static/bg_community_mobile.png") center no-repeat;
    background-size: 100%;
    .community-title {
      font-size: 64rpx;
      width: 650rpx;
      line-height: 80rpx;
    }
  }

  .community-btns {
    margin-top: 80px;
    display: flex;
    justify-content: center;
    column-gap: 64rpx;

    .click_btn {
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 0.15s;
      color: white;
      line-height: 48rpx;
      font-weight: 700;
      font-size: 32rpx;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url("../../static/btn_on.png");
      border-radius: 9999px;
      text-wrap: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 360rpx;
      height: 108rpx;
      margin: auto;
    }

    .click_btn:hover {
      background-image: url("../../static/btn_hover.png");
      cursor: pointer;
    }
  }

  .community-socials {
    margin-top: 48px;
    display: flex;
    justify-content: center;
    column-gap: 24px;

    .community-socials-item {
      border-radius: 99px;
      border: 1px solid transparent;
      cursor: pointer;
      background: linear-gradient(
        180deg,
        rgba(0, 148, 194, 0.07) 0%,
        rgba(41, 135, 188, 0.12) 100%
      );
      width: 124rpx;
      height: 124rpx;
      // padding: 19px;
      display: flex;
      align-items: center;
      justify-content: center;

      image {
        filter: invert(67%) sepia(94%) saturate(3258%) hue-rotate(164deg)
          brightness(104%) contrast(99%);

        //background: #00bfbf;
        height: 40rpx;
      }
    }

    .community-socials-item svg path {
      fill: #00bfbf;
    }

    .community-socials-item:hover {
      border: 1px solid #00bfbf;
      image {
        filter: brightness(1000%) saturate(0%);
      }
    }

    ::v-deep.community-socials-item:hover svg path {
      fill: #fff;
    }
  }
}

.footer-container {
  padding: 80px 0;
  background: #040c16;
  color: #fff;

  .container-wrap {
    display: flex;
    justify-content: center;

    .container-box {
      max-width: 1264rpx;
      width: 100%;

      .footer-body {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        column-gap: 60px;

        .footer-newsletter {
          display: flex;
          flex-direction: column;
          row-gap: 62rpx;

          .footer-newsletter-sub {
            display: flex;
            flex-direction: column;
            row-gap: 32rpx;
            padding-top: 64rpx;
            border-top: 1px solid rgba(17, 120, 178, 0.35);
            align-items: stretch;

            .footer-newsletter-title {
              font-size: 20px;
              font-weight: 400;
              line-height: 24px;
              display: flex;
              column-gap: 4px;
            }

            .subscribe-form {
              width: 100%;

              .subscribe-input-group {
                display: flex;
                align-items: center;
                position: relative;

                .omnisend-subscribe-input-email {
                  background: linear-gradient(
                    180deg,
                    rgba(0, 148, 194, 0.07) 0%,
                    rgba(41, 135, 188, 0.12) 100%
                  );
                  box-sizing: border-box;
                  padding: 20px 28px;
                  font-size: 32rpx;
                  font-weight: 400;
                  line-height: 24px;
                  border-radius: 8px 0 0 8px;
                  box-shadow: none;
                  border: none;
                  flex: 1;
                  height: auto;
                }

                .omnisend-subscribe-input-email-btn {
                  background-color: #10364d;
                  border-top-right-radius: 8px;
                  border-bottom-right-radius: 8px;
                  width: 56px;
                  height: 48px;
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  .omnisend-subscribe-input-email-btn-item {
                    background-color: #fff;
                    border-radius: 999px;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 32rpx;
                    height: 32rpx;

                    .transition-all {
                      transition-property: all;
                      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                      transition-duration: 0.15s;
                    }
                  }
                }

                .omnisend-subscribe-input-email-btn:hover
                  .omnisend-subscribe-input-email-btn-item
                  .transition-all {
                  fill: #47ebeb;
                  transform: translate(-4px, 0) rotate(0) skew(0) skewY(0)
                    scaleX(1) scaleY(1);
                }

                @media (min-width: 900px) {
                  .omnisend-subscribe-input-email-btn {
                    width: 80px;
                    height: 64px;

                    .omnisend-subscribe-input-email-btn-item {
                      width: 64rpx;
                      height: 64rpx;
                    }
                  }
                }
              }
            }
          }
        }

        .footer-columns {
          display: flex;
          padding-top: 12px;
          justify-content: space-between;

          .footer-column {
            width: 480rpx;
            margin: 0;

            .footer-column-item {
              padding-top: 64rpx;
            }

            .footer-column-item > a {
              font-size: 32rpx;
              font-style: normal;
              font-weight: 400;
              line-height: 32rpx;
              margin: 0;
              color: #fff;
              text-decoration: none;
            }

            .footer-column-item > a:hover {
              color: #47ebeb;
            }
          }

          .footer-column > h3 {
            font-size: 20px;
            font-weight: 400;
            color: var(--gray-blue, #8cbfd9);
            line-height: 24px;
            margin: 0;
            padding-bottom: 64rpx;
            border-bottom: 1px solid rgba(17, 120, 178, 0.35);
          }
        }

        @media (min-width: 1280px) {
          .footer-newsletter {
            width: 500px;
          }
        }
      }

      @media (min-width: 1280px) {
        .footer-container.tablet .footer-body {
          flex-direction: column;
          align-items: stretch;
        }
      }
    }
  }

  @media (min-width: 1280px) {
    .container-box {
      max-width: 1280px;
    }
  }

  @media (min-width: 1024px) {
    .container-box {
      max-width: 1024px;
    }
  }

  @media (min-width: 900px) {
    .container-box {
      max-width: 768px;
    }
  }

  @media (min-width: 640px) {
    .container-box {
      max-width: 640px;
    }
  }
}

.footer-bottom {
  background-color: #040c16;
  text-align: center;
  padding: 64rpx 0;
  display: flex;
  font-size: 14px;
  font-weight: 400;
  line-height: 32rpx;
  justify-content: space-between;
  border-top: 1px solid rgba(17, 120, 178, 0.35);
  color: #8cbfd9;

  .container-wrap {
    width: 100%;
    display: flex;
    justify-content: center;

    .container {
      margin: 0 auto;
      display: flex;
      width: 1280px;
      justify-content: space-between;
    }
  }
}

uni-swiper {
  height: 548px;
  @media (max-width: 900px) {
    height: 450px;
  }

  ::v-deep.uni-swiper-slides {
    width: 420px;
    height: 420px;

    @media (max-width: 900px) {
      width: 300px;
      height: 300px;
    }
  }
}

.fade-in {
  opacity: 1;
  visibility: visible;
}

.fade-out {
  opacity: 0;
  visibility: hidden;
}

.syn-scroll-to-top:hover {
  box-shadow: inset 0 0 0 2px white;
}

@media screen and (max-width: 900px) {
  .float-social-container {
    display: none;
  }
}
</style>
