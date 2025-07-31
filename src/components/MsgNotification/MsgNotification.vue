<template>
  <el-drawer
    :size="store.isWebPort ? '30%' : '90%'"
    @close="drawerClose"
    class="myMsg"
    :style="{ backgroundColor: isHome ? '#132f44' : 'var(--content-bg)' }"
    style="color: white"
    header-class="myMsgHeader"
    v-model="dialogVisible"
    :direction="drawerDirection"
  >
    <template #header>
      <!-- <view class="" style="font-size: 32rpx">通知</view>  -->
    </template>
    <template #default>
      <view class="msglist">
        <view
          @click="lookDetail(item.id)"
          :style="{
            border: isHome ? '1rpx solid gray' : '1rpx solid #04606e',
          }"
          class="content"
          v-for="(item, index) in noticeList"
          :key="index"
        >
          <view
            class="isNew"
            :style="{
              color: item.state == 1 ? 'gray' : 'red',
            }"
            style="
              text-align: right;
              margin-bottom: 20rpx;
              display: flex;
              justify-content: right;
            "
          >
            <view
              :style="{
                backgroundColor: item.state == 1 ? '' : '#ffafb3',
                color: item.state == 1 ? 'gray' : 'black',
              }"
              style="border-radius: 5rpx; padding: 0 10rpx"
            >
              {{
                item.state == 1
                  ? $t("MsgNotification.MsgNotification.404380-0")
                  : $t("MsgNotification.MsgNotification.404380-1")
              }}
            </view>
          </view>
          <view class="ms">{{ item.msg }}</view>
        </view>
      </view>
    </template>
  </el-drawer>
  <EDialog
    v-model="dialogShow"
    :title="$t('MsgNotification.MsgNotification.404380-2')"
    width="37%"
    @confirmEvent="confirm"
  >
    <slot>
      <view style="text-align: center">
        {{ readNoticeInfo.msg }}
      </view>
    </slot>
  </EDialog>
</template>

<script setup>
import { getNoticeList, readNotice } from "@/api/index";
import { getPinia } from "../../stores/index";
const dialogVisible = defineModel({
  type: Boolean,
  default: false,
});

const emit = defineEmits(["closeDrawer"]);

const store = getPinia();

const isHome = ref(
  getCurrentPages().at(-1)?.route?.includes("pages/home/home")
);
const isAirdrop = ref(
  getCurrentPages().at(-1)?.route?.includes("pages/airdrop/index")
);

let dialogShow = ref(false);

let drawerDirection = ref("rtl");

const drawerClose = () => {
  readNoticeInfo.value = "";
  emit("closeDrawer");
};

const confirm = () => {
  readNoticeInfo.value = "";
  fetNoticeList();
};

const lookDetail = (id) => {
  dialogShow.value = true;
  fetchReadNotice(id);
};

let noticeList = ref([]);
const fetNoticeList = async () => {
  let res = await getNoticeList();
  noticeList.value = res.data.list.data || [];
};
fetNoticeList();

let readNoticeInfo = ref([]);
const fetchReadNotice = async (id) => {
  let params = {
    id,
  };
  let res = await readNotice(params);
  readNoticeInfo.value = res.data;
};
</script>

<style lang="less" scoped>
.myMsg {
  :deep(.el-drawer) {
    background-color: var(--content-bg) !important;
  }

  :deep(.el-drawer__body) {
    background-color: var(--content-bg) !important;
    padding: 30rpx;
  }
}

.msglist {
  display: flex;
  flex-direction: column;
  gap: 30rpx;

  .content {
    padding: 30rpx;
    font-size: 32rpx;
    width: 100%;
    height: 300rpx;
    border-radius: 10rpx;
    cursor: pointer;
  }
}
</style>
