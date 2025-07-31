<template>
  <Header />
  <view class="container">
    <!-- <IntroducePicture
      bgUrl="/static/images/bg/bg1.png"
      title="推广活动"
      content="畅游虚拟代币世界，捕捉无限机遇，用智慧点亮\n投资之路，同心聚力，书写区块链时代的财富传奇！"
    >
      <template #btn>
        <el-button type="primary" class="inviteBtn" @click="initInvite"
          >{{ $t('activity.proActivities.311852-0') }}</el-button
        >
      </template>
    </IntroducePicture> -->
    <image
      class="hero-bg"
      src="../../static/hero-bg.png"
      mode="widthFix"
    ></image>
    <view class="page-content">
      <view class="joinbtn">
        <img
          class="topContentImg"
          src="https://api.synfutures.com/s3/config/Fs1NvlhTUb7QVs-XbBKmy.png"
          alt=""
        />
      </view>

      <view style="display: flex; justify-content: center">
        <el-button type="primary" class="inviteBtn" @click="initInvite">{{
          $t("activity.proActivities.311852-0")
        }}</el-button>
      </view>
      <Subtitle :title="$t('activity.proActivities.311852-1')" />
      <view class="activityList">
        <view class="a_left">
          <div v-html="activityUserInfo.content"></div>
        </view>
        <view class="a_right">
          <view
            class="items"
            v-for="(item, index) in activeNameList"
            :key="index"
          >
            <view class="items_l">
              <image src="@/static/actor.png" mode="heightFix"></image>
              <text>{{ item.user.nickname }}</text>
            </view>
            <view class="items_r">
              {{ $t("activity.proActivities.062112-0") }}{{ item.user.nickname
              }}{{ $t("activity.proActivities.062112-1") }}{{ item.amount }}USDT
            </view>
          </view>
        </view>
      </view>
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
            @click="handleBtnEvent(item)"
          >
            {{
              activityStatusList.find((res) => res.value == item.state).label
            }}
          </view>
        </view>
      </ThemeContainer>
    </view>

    <!-- 参与弹窗 -->
    <!-- <el-dialog v-model="dialogInviteVisible" :title="$t('activity.proActivities.311852-3')" @close="inviteClose" class="inviteDialog">
      <div>
        <el-form
          ref="inviteFormRef"
          style="max-width: 600px"
          :model="inviteForm"
          :rules="inviteRules"
          label-width="auto"
        >
        <el-form-item :label="$t('activity.proActivities.311852-4')">
          <el-input v-model="form.desc" type="textarea" :rows="6"/>
        </el-form-item>
      </el-form>
      </div>
     </el-dialog> -->
    <EDialog
      v-model="dialogInviteVisible"
      :title="$t('activity.proActivities.311852-3')"
    >
      <template #default>
        <el-form
          class="inviteForm"
          ref="inviteFormRef"
          style="max-width: 600px"
          :model="inviteForm"
          :rules="inviteRules"
          label-width="auto"
          label-position="top"
        >
          <el-form-item
            :label="$t('activity.proActivities.311852-4')"
            prop="user_nodes"
          >
            <el-input
              v-model="inviteForm.user_nodes"
              type="textarea"
              :rows="6"
            />
          </el-form-item>
          <el-form-item
            :label="
              $t('activity.proActivities.311852-5') +
              $t('activity.proActivities.311852-6')
            "
          >
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <CustomCheck v-model="agreementVal" type="4"></CustomCheck>
      </template>
      <template #footer>
        <el-button
          class="operator_btn"
          type="primary"
          @click="submitInvite(inviteFormRef)"
          >{{ $t("activity.proActivities.311852-7") }}</el-button
        >
      </template>
    </EDialog>

    <!-- 审核状态弹窗 -->
    <EDialog v-model="dialogProcessVisible" :title="process">
      <template #default>
        <view
          v-if="processStatus == $t('activity.proActivities.311852-8')"
          class="processDiv"
        >
          <image src="@/static/shz.png" mode="heightFix"></image>
          <view>{{ $t("activity.proActivities.311852-9") }}</view>
        </view>
        <view
          v-if="processStatus == $t('activity.proActivities.311852-10')"
          class="processDiv"
        >
          <image src="@/static/shsb.png" mode="heightFix"></image>
          <view>{{ $t("activity.proActivities.311852-11") }}</view>
        </view>
        <view
          v-if="processStatus == $t('activity.proActivities.311852-12')"
          class="processDiv"
        >
          <image src="@/static/ytg.png" mode="heightFix"></image>
          <view>{{ $t("activity.proActivities.311852-13") }}</view>
        </view>
      </template>
      <template #footer>
        <el-button
          class="operator_btn"
          v-if="processStatus == $t('activity.proActivities.311852-8')"
          type="primary"
          @click="dialogProcessVisible = false"
          >{{ $t("activity.proActivities.311852-14") }}</el-button
        >
        <el-button
          class="operator_btn"
          v-if="processStatus == $t('activity.proActivities.311852-10')"
          type="primary"
          @click="reProcessSubmit"
          >{{ $t("activity.proActivities.311852-15") }}</el-button
        >
        <el-button
          class="operator_btn"
          v-if="processStatus == $t('activity.proActivities.311852-12')"
          type="primary"
          @click="dialogProcessVisible = false"
          >{{ $t("activity.proActivities.311852-16") }}</el-button
        >
      </template>
    </EDialog>
  </view>
  <Footer />
</template>

<script setup>
import {
  getActivityList,
  getActivityUserInfo,
  joinActivity,
  getActivityUserList,
} from "@/api/index";
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let uploadUrl = `${import.meta.env.VITE_BASE_URL}/api/common/upload`;

let detailInfo = ref();
onLoad((props) => {
  let params = props;
  detailInfo.value = params;
  // fetchActivityInfo(params);
  fetchActivityUserInfo(params);
  fetchActivityUserList();
});

// let activityInfo = ref();
// const fetchActivityInfo = (params) => {
//   getActivityInfo(params).then((res) => {
//     if (res.code == 1) {
//       activityInfo.value = res.data;
//       fetchActivityList();
//     }
//   });
// }

let activityUserInfo = ref();
const fetchActivityUserInfo = (params) => {
  getActivityUserInfo(params).then((res) => {
    if (res.code == 1) {
      activityUserInfo.value = res.data;
      fetchActivityList();
    }
  });
};

let processStatusList = ref([
  { label: t("activity.proActivities.311852-8"), value: 0 },
  { label: t("activity.proActivities.311852-12"), value: 1 },
  { label: t("activity.proActivities.311852-10"), value: 2 },
]);
let processStatus = ref();
let dialogProcessVisible = ref(false);
const initInvite = () => {
  let { activity_user } = activityUserInfo.value;
  let id = detailInfo.value.id;

  console.log(activity_user.map((item) => item.acid)[0]);
  if (activity_user.map((item) => item.acid)[0] == id) {
    let state = activity_user.find((item) => id == item.acid).state;
    processStatus.value = processStatusList.value.find(
      (item) => item.value == state
    ).label;
    dialogProcessVisible.value = true;
  } else {
    dialogInviteVisible.value = true;
  }
};

const reProcessSubmit = () => {
  let info = activityUserInfo.value.activity_user.find(
    (item) => item.acid == detailInfo.value.id
  );
  let params = {
    img: info.img,
    acid: info.id,
    acid: info.id,
  };
  joinActivity(params).then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.msg);
      dialogProcessVisible.value = false;
      fetchActivityUserInfo(detailInfo.value);
    }
  });
};

let isDataLoading = ref(false);
const list = ref([]);

const activityStatusList = ref([
  {
    label: t("activity.proActivities.311852-17"),
    value: 0,
  },
  {
    label: t("activity.proActivities.311852-18"),
    value: 1,
  },
  {
    label: t("activity.proActivities.311852-19"),
    value: 2,
  },
]);

const activeNameList = ref([
  {
    name: t("activity.proActivities.311852-20"),
    content: t("activity.proActivities.311852-21"),
  },
  {
    name: t("activity.proActivities.311852-22"),
    content: t("activity.proActivities.311852-21"),
  },
  {
    name: t("activity.proActivities.311852-20"),
    content: t("activity.proActivities.311852-21"),
  },
  {
    name: t("activity.proActivities.311852-22"),
    content: t("activity.proActivities.311852-21"),
  },
  {
    name: t("activity.proActivities.311852-20"),
    content: t("activity.proActivities.311852-21"),
  },
]);

const fetchActivityUserList = async () => {
  console.log(detailInfo.value);
  let params = {
    type: 0,
    acid: detailInfo.value.id,
    state: 1,
  };
  let res = await getActivityUserList(params);
  activeNameList.value = res.data.data || [];
};

const handleBtnEvent = (item) => {
  if (item.state !== 2) {
    uni.navigateTo({ url: `/pages/activity/proActivities?id=${item.id}` });
  }
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
      let data = res.data.data;
      list.value = data.filter((item) => item.id !== activityUserInfo.value.id);
    }
  });
};

// 提交表单
const submitInvite = async (formEl) => {
  if (!agreementVal.value) {
    ElMessage.warning(t("activity.proActivities.311852-23"));
    return;
  }

  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (!imageUrl.value) {
        ElMessage.warning(t("activity.proActivities.311852-24"));
        return;
      }

      let { id } = detailInfo.value;
      let params = {
        ...inviteForm,
        acid: id,
        img: imageUrl.value,
      };

      joinActivity(params).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.msg);
          dialogInviteVisible.value = false;
        }
      });
    }
  });
};

const dialogInviteVisible = ref(false);
const inviteFormRef = ref();
const inviteForm = reactive({
  user_nodes: "",
  img: "",
});
const inviteRules = reactive({
  user_nodes: [
    {
      required: true,
      message: t("activity.proActivities.311852-25"),
      trigger: "blur",
    },
  ],
});
let agreementVal = ref();

const imageUrl = ref("");

// 上传成功
const handleAvatarSuccess = (response, uploadFile) => {
  console.log(response, uploadFile);
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};

// 图片校验
const beforeAvatarUpload = (rawFile) => {
  console.log(rawFile.name);
  if (!verificationFileType(rawFile.name)) {
    ElMessage.error(t("activity.proActivities.311852-26"));
    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error(t("activity.proActivities.311852-27"));
    return false;
  }
  return true;
};

// 图片格式校验
const verificationFileType = (
  fileName,
  fileTypes = [".jpg", ".png", ".gif", ".webp"]
) => {
  let isNext = false;
  let fileEnd = fileName.substring(fileName.lastIndexOf("."));
  for (var i = 0; i < fileTypes.length; i++) {
    if (fileTypes[i] == fileEnd) {
      return (isNext = true);
    }
  }
  return isNext;
};
</script>

<style lang="scss" scoped>
.container {
  // margin-top: 160rpx;
  min-height: calc(100vh - 48px);
  display: flex;
  justify-content: center;
  padding-bottom: 20px;

  .page-content {
    max-width: 2400rpx;
    position: relative;

    @media screen and (max-width: 900px) {
      margin-top: var(--mobilePadding) !important;
      padding: 0 var(--mobilePadding) var(--mobilePadding);
    }
  }

  .joinbtn {
    position: relative;

    @media screen and (max-width: 900px) {
      display: none;
    }
  }

  .inviteBtn {
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
    margin: 40rpx auto;
    width: 200rpx;
    height: 70rpx;
    color: white;
    background: var(--content-bg);
    border: 1px solid var(--content-bg);
    font-size: var(--txtFs);
    border-radius: var(--bRadius);

    @media screen and (max-width: 900px) {
      width: 200rpx;
      height: 70rpx;
    }
  }
}

.activityList {
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }

  .a_left {
    width: 49%;
    height: 614rpx;
    border-radius: 26rpx;
    background: var(--content-bg);
    padding: 84rpx 94rpx;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 36rpx;
  }

  .a_right {
    width: 49%;
    height: 614rpx;
    border-radius: 26rpx;
    background: var(--content-bg);
    padding: 46rpx 48rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 42rpx;
    overflow: hidden;

    .items {
      font-size: 36rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .items_l {
        display: flex;
        align-items: center;

        image {
          height: 70rpx;
          margin-right: 24rpx;
        }
      }

      .items_r {
        text-align: left;
        color: #8cbfd9;
      }
    }
  }

  @media screen and (max-width: 900px) {
    gap: 20rpx;
    .a_left,
    .a_right {
      width: 100%;
      overflow: auto;
    }
  }
}

.theme-container {
  background: #013840;
  margin-top: 20rpx;
  margin-bottom: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

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
    padding: 0.6% 0 0.7%;
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
    background-image: url(@/static/aiquerybtn.png);
    background-size: 100% 100%;
  }
}

.avatar-uploader .el-upload {
  border: 2rpx dashed var(--el-border-color);
  border-radius: 12rpx;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 56rpx;
  color: #8c939d;
  width: 356rpx;
  height: 356rpx;
  text-align: center;
}

::v-deep .el-dialog {
  .inviteForm {
    .avatar-uploader {
      .avatar-uploader-icon {
        border: 2rpx solid white;
        border-style: dashed;
        border-radius: 6rpx;
      }

      img {
        width: 360rpx;
        height: 360rpx;
      }
    }
  }
  .processDiv {
    font-size: var(--txtFs);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    image {
      height: 334rpx;
      margin-bottom: 80rpx;
      @media screen and (max-width: 900px) {
        height: 270rpx;
      }
    }
  }
}
</style>
