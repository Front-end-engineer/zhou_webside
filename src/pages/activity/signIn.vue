<template>
  <Header />
  <image class="hero-bg" src="../../static/hero-bg.png" mode="widthFix"></image>
  <view class="container">
    <view class="sub-container">
      <Calendar :moreSignDays="moreSignDays" :punchedDates="punchedDates" />
      <view class="sign-btn" @click="clickUserSign">{{
        $t("activity.signIn.687381-0")
      }}</view>
      <Subtitle :title="$t('activity.signIn.687381-1')" />
      <!-- <el-input
      v-model="signInMsg"
      :rows="7"
      type="textarea"
      :placeholder="$t('activity.signIn.687381-2')"
    /> -->
      <view class="signMsg"> {{ $t("activity.signIn.687381-2") }} </view>
    </view>

    <view class="content_bottom">
      <Subtitle :title="$t('activity.signIn.687381-3')" />
      <view class="taskItem">
        <view class="items" v-for="item in taskList" :key="item.id">
          <view class="item_content">
            <view class="title">{{ item.title }}</view>
            <view class="subtitle1">{{ item.subhead }}</view>
            <view class="subtitle2">{{ $t("activity.signIn.687381-4") }}</view>
          </view>
          <view
            class="item_btn"
            v-if="item.title !== $t('activity.signIn.687381-5')"
          >
            <el-button class="operator_btn" type="primary">{{
              $t("activity.signIn.687381-6")
            }}</el-button>
          </view>
          <view
            class="item_btn"
            v-if="item.title == $t('activity.signIn.687381-5')"
          >
            <el-button
              class="operator_btn"
              type="primary"
              v-if="store.loginInfo.is_authorize == 0"
              @click="toPage('/pages/userCenter/personalCenter/viewindex')"
              >{{ $t("activity.signIn.687381-6") }}</el-button
            >
            <el-button
              class="operator_btn"
              type="primary"
              v-if="store.loginInfo.is_authorize == 1"
              >{{ $t("activity.signIn.687381-7") }}</el-button
            >
          </view>
        </view>
      </view>
    </view>
  </view>
  <Footer />
</template>

<script setup>
import Calendar from "./components/Calendar.vue";
import {
  getUserInfo,
  userSign,
  getActivityList,
  getSignCalendar,
} from "@/api/index";
import { getPinia } from "/src/stores/index";
const store = getPinia();

const dayList = ref([]);

const punchedDates = computed(() => {
  return dayList.value.map((item) => new Date(item.date).toDateString());
});

const fetchUserInfo = () => {
  getUserInfo().then((res) => {
    if (res.code == 1) {
      store.UPLOGININFO(res.data.userinfo);
    }
  });
};
fetchUserInfo();

const clickUserSign = () => {
  userSign().then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.msg);
      getSignList();
    }
  });
};

const toPage = (url) => {
  uni.navigateTo({
    url,
  });
};

let taskList = ref();
const fetchActivityList = () => {
  let params = {
    type: 1,
  };
  getActivityList(params).then((res) => {
    if (res.code == 1) {
      taskList.value = res.data.data;
    }
  });
};
fetchActivityList();

const moreSignDays = ref(0);
const getSignList = async () => {
  const res = await getSignCalendar();
  if (res.code == 1) {
    moreSignDays.value = res.data.continuous_sign_days;
    dayList.value = res.data.list
      .filter((item) => item.sign === 1)
      .map((item) => ({ date: item.time }));
  }
};
getSignList();
</script>

<style lang="scss" scoped>
@use "@/styles/theme/index.scss" as *;

.container {
  position: relative;
  max-width: 2000rpx;
  margin: 0 auto;
  // background-image: url("@/static/images/bg/bg2.png");
  background-size: 100% 100%;
  margin-bottom: 100rpx;
}

.sub-container {
  margin-top: 100rpx;
  background: rgba(1, 37, 41, 0.9);
  border-radius: 26rpx;
  padding: 0 30rpx 40rpx;
}
.content_bottom {
  padding: 0 30rpx;
}

.signMsg {
  width: 100%;
  height: 500rpx;
  background-color: #013840;
  border-radius: 26rpx;
  padding: 84rpx;
  box-sizing: border-box;
  font-size: 36rpx;
}
.sign-btn {
  background-image: url("@/static/aiquerybtn.png");
  background-size: 100% 100%;
  width: 390rpx;
  height: 120rpx;
  line-height: 120rpx;
  text-align: center;
  margin: 30rpx auto;
  font-size: 38rpx;
  cursor: pointer;
}

.taskItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20rpx;
  .items {
    padding: 40rpx 60rpx;
    display: flex;
    justify-content: space-between;
    gap: 10rpx;
    background: #013840;
    border-radius: 12rpx;
    .item_content {
      display: flex;
      flex-direction: column;
      gap: 16rpx;
      .title {
        font-weight: 500;
        font-size: 46rpx;
        color: #ffffff;
      }
      .subtitle1 {
        font-weight: 500;
        font-size: 36rpx;
        color: #8cbfd9;
      }
      .subtitle2 {
        font-weight: 400;
        font-size: 28rpx;
        color: #3eebeb;
      }
    }
    .item_btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .el-button {
        width: 140rpx;
        height: 72rpx;
        font-size: 32rpx;
      }
    }
  }
}
</style>
