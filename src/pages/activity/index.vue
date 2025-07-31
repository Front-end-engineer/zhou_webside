<template>
  <Header />
  <view class="index container">
    <!-- <IntroducePicture
      bgUrl="/static/images/bg/bg1.png"
      :title="$t('activity.index.944749-0')"
      content="畅游虚拟代币世界，捕捉无限机遇，用智慧点亮\n投资之路，同心聚力，书写区块链时代的财富传奇！"
    /> -->
    <image
      class="hero-bg"
      src="../../static/hero-bg.png"
      mode="widthFix"
    ></image>
    <view
      class="page-container"
      style="padding-top: 0rpx; padding-bottom: 40rpx"
    >
      <img
        class="topContentImg"
        src="https://api.synfutures.com/s3/config/Fs1NvlhTUb7QVs-XbBKmy.png"
        alt=""
      />
      <Subtitle :title="$t('activity.index.944749-0')" />
      <ThemeContainer>
        <view class="list-item">
          <view class="left">
            <view class="name"> {{ $t("activity.index.944749-1") }} </view>
            <view class="desc">{{ $t("activity.index.944749-2") }}</view>
            <!-- <view class="time">{{ item.start_time }} - {{ item.end_time }}</view> -->
          </view>
          <view class="right right-active" @click="toSign()">
            {{ $t("activity.index.944749-3") }}
          </view>
        </view>
      </ThemeContainer>
      <DataLoading :loading="isDataLoading" />
      <ThemeContainer v-for="(item, index) in list" :key="index">
        <view class="list-item">
          <view class="left">
            <view class="name">
              {{ item.title }}
              <!-- <view class="sort">{{ item.sort }}</view> -->
            </view>
            <view class="desc">{{ item.subhead }}</view>
            <view class="time"
              >{{ item.start_time }} - {{ item.end_time }}</view
            >
          </view>
          <view
            class="right"
            :class="item.state !== 2 && 'right-active'"
            :disabled="item.state == 2"
            @click="handleBtnEvent(item)"
          >
            {{
              activityStatusList.find((res) => res.value == item.state).label
            }}
          </view>
        </view>
      </ThemeContainer>
    </view>
  </view>
  <Footer />
</template>

<script setup>
import { getActivityList } from "@/api/index";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const activityStatusList = ref([
  {
    label: t("activity.index.944749-4"),
    value: 0,
  },
  {
    label: t("activity.index.944749-5"),
    value: 1,
  },
  {
    label: t("activity.index.944749-6"),
    value: 2,
  },
]);

onLoad(() => {});

let isDataLoading = ref(false);
const list = ref([]);

const handleBtnEvent = (item) => {
  if (item.state !== 2) {
    uni.navigateTo({ url: `/pages/activity/proActivities?id=${item.id}` });
  }
};

const toSign = () => {
  uni.navigateTo({ url: "/pages/activity/signIn" });
};

const fetchActivityList = () => {
  isDataLoading.value = true;
  let params = {
    state: -1,
    type: 2,
  };
  getActivityList(params).then((res) => {
    if (res.code == 1) {
      isDataLoading.value = false;
      list.value = res.data.data;
    }
  });
};
fetchActivityList();
</script>

<style lang="scss" scoped>
.index {
  background-color: #012529;
}

.page-container {
  padding-left: 22%;
  padding-right: 22%;

  .topContentImg {
    @media screen and (max-width: 900px) {
      display: none;
    }
  }

  @media screen and (max-width: 900px) {
    padding-left: 3%;
    padding-right: 3%;
  }
}

.theme-container {
  background: #013840;

  @media screen and (max-width: 900px) {
    margin-bottom: 15px;
  }
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10rpx;

  .left {
    .name {
      display: flex;
      align-items: center;
      gap: 30rpx;
      font-size: 36rpx;

      .sort {
        color: #3eebeb;
        font-size: 20rpx;
        padding: 4rpx 10rpx;
        border-radius: 12rpx;
        border: 1rpx solid #214b67;
      }
    }

    .desc {
      color: #6fd6d6;
      font-size: 32rpx;
      margin: 40rpx 0 50rpx;
    }

    .time {
      color: white;
      font-size: 24rpx;
    }
  }

  .right {
    flex-shrink: 0;
    text-align: center;
    max-width: 460rpx;
    min-width: 180rpx;
    padding: 0.6% 10px 0.7%;
    font-size: var(--txtFs);
    color: #8cbfd9;
    background-color: #00404b;
    border-radius: 88rpx;
    cursor: pointer;
    box-sizing: border-box;
    white-space: nowrap;
    @media screen and (max-width: 900px) {
      padding: 2% 3%;
    }
  }

  .right-active {
    cursor: pointer;
    color: #fff;
    // background-image: url(@/static/aiquerybtn.png);
    background: var(--operator-bg);
    background-size: 100% 100%;
  }
}
</style>
