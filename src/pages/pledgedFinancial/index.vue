<template>
  <Header />
  <view class="container">
    <!-- <IntroducePicture
      bgUrl="/static/pledgedFinancial.png"
      title="质押理财"
      content="理财从这里开始，智能、安全、安心"
    /> -->
    <image
      class="hero-bg"
      src="../../static/hero-bg.png"
      mode="widthFix"
    ></image>
    <view class="page-content">
      <img
        class="topContentImg"
        src="https://api.synfutures.com/s3/config/2eb3007e-877b-41dc-b8de-16400fc857cc.png"
        alt=""
      />
      <view class="statistic flexCenterContent">
        <view class="items">
          <view class="title"
            ><text>{{ $t("pledgedFinancial.index.714114-0") }}</text
            >&nbsp;
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('pledgedFinancial.index.714114-1')"
              placement="top"
            >
              <el-icon>
                <Warning />
              </el-icon>
            </el-tooltip>
          </view>
          <!-- <view class="value">
            <view class="value_left">FutLink</view>
            <view class="value_right">{{
              statisticsList && statisticsList.count["FUTLINK"]
            }}</view>
          </view> -->
          <view class="value">
            <view class="value_left">USTD</view>
            <view class="value_right">{{
              statisticsList && statisticsList.count["USDT"]
            }}</view>
          </view>
        </view>
        <view class="items">
          <view class="title"
            ><text>{{ $t("pledgedFinancial.index.714114-2") }}</text
            >&nbsp;
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('pledgedFinancial.index.714114-3')"
              placement="top"
            >
              <el-icon>
                <Warning />
              </el-icon>
            </el-tooltip>
          </view>
          <!-- <view class="value">
            <view class="value_left">FutLink</view>
            <view class="value_right">{{
              statisticsList && statisticsList.total_income["FUTLINK"]
            }}</view>
          </view> -->
          <view class="value">
            <view class="value_left">USTD</view>
            <view class="value_right">{{
              statisticsList && statisticsList.total_income["USDT"]
            }}</view>
          </view>
        </view>
        <view class="items">
          <view class="title"
            ><text>{{ $t("pledgedFinancial.index.714114-4") }}</text
            >&nbsp;
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('pledgedFinancial.index.714114-5')"
              placement="top"
            >
              <el-icon>
                <Warning />
              </el-icon> </el-tooltip
          ></view>
          <!-- <view class="value">
            <view class="value_left">FutLink</view>
            <view class="value_right"
              >{{
                statisticsList && statisticsList.yesterday_income["FUTLINK"]
              }}
            </view>
          </view> -->
          <view class="value">
            <view class="value_left">USTD</view>
            <view class="value_right">{{
              statisticsList && statisticsList.yesterday_income["USDT"]
            }}</view>
          </view>
        </view>
        <view class="items">
          <view class="title"
            ><text>{{ $t("pledgedFinancial.index.714114-6") }}</text
            >&nbsp;
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('pledgedFinancial.index.714114-7')"
              placement="top"
            >
              <el-icon>
                <Warning />
              </el-icon> </el-tooltip
          ></view>
          <!-- <view class="value">
            <view class="value_left">FutLink</view>
            <view class="value_right">{{
              statisticsList && statisticsList.expect_income["FUTLINK"]
            }}</view>
          </view> -->
          <view class="value">
            <view class="value_left">USTD</view>
            <view class="value_right">{{
              statisticsList && statisticsList.expect_income["USDT"]
            }}</view>
          </view>
        </view>
      </view>

      <el-tabs class="tabsBtn" v-model="tabsBtnActive" v-if="!store.isWebPort">
        <el-tab-pane
          :label="$t('pledgedFinancial.index.714114-0')"
          name="1"
        ></el-tab-pane>
        <el-tab-pane
          :label="$t('pledgedFinancial.index.714114-8')"
          name="2"
        ></el-tab-pane>
      </el-tabs>

      <!-- {{ $t('pledgedFinancial.index.714114-0') }} -->
      <!-- <view class="mypledged" v-if="store.isWebPort || tabsBtnActive == '1'">
        <view class="title" v-if="store.isWebPort">
          <view></view>
          <view>{{ $t("pledgedFinancial.index.714114-0") }}</view>
        </view>
        <el-table :data="pledgeProductList" style="width: 100%">
          <el-table-column
            prop="name"
            :label="$t('pledgedFinancial.index.名字')"
          />
          <el-table-column
            prop="income_ratio"
            :label="$t('pledgedFinancial.index.714114-10')"
          />
          <el-table-column
            prop="date"
            :label="$t('pledgedFinancial.index.714114-11')"
          />
          <el-table-column
            :label="$t('pledgedFinancial.index.714114-12')"
            width="120"
          >
            <template #default="scope">
              <el-button
                class="operator_btn"
                size="small"
                @click="handleBuyPledge(scope.row)"
                >{{ $t("pledgedFinancial.index.714114-13") }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </view> -->
      <PledgeTransaction />
      <!-- {{ $t('pledgedFinancial.index.714114-8') }} -->
      <view class="mypledged" v-if="store.isWebPort || tabsBtnActive == '2'">
        <view class="title" v-if="store.isWebPort">
          <view></view>
          <view>{{ $t("pledgedFinancial.index.714114-8") }}</view>
        </view>
        <el-table :data="pledgeOrderList" style="width: 100%">
          <el-table-column
            prop="create_at"
            :label="$t('pledgedFinancial.index.714114-14')"
          />
          <el-table-column
            prop="coin"
            :label="$t('pledgedFinancial.index.714114-9')"
          />
          <el-table-column
            prop="income_ratio"
            :label="$t('pledgedFinancial.index.714114-15')"
          />
          <el-table-column
            prop="income"
            :label="$t('pledgedFinancial.index.714114-16')"
          />
          <el-table-column
            prop="rwa_num"
            :label="$t('pledgedFinancial.index.714114-17')"
          />
          <el-table-column
            prop="expected_maturity_assets"
            :label="$t('pledgedFinancial.index.714114-6')"
          />
          <el-table-column :label="$t('pledgedFinancial.index.714114-18')">
            <template #default="scope">
              {{
                statusList.find((item) => item.value == scope.row.state).label
              }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('pledgedFinancial.index.714114-12')"
            width="130"
          >
            <template #default="scope">
              <el-button
                v-if="scope.row.can_redemption"
                class="operator_btn"
                size="small"
                @click="handleRedeem(scope.row)"
                :disabled="!scope.row.can_redemption"
                >{{ $t("pledgedFinancial.index.714114-19") }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="float: right"
          layout="prev, pager, next"
          v-model:current-page="pledgeOrderPage.page"
          v-model:page-size="pledgeOrderPage.limit"
          :total="pledgeOrderPage.total"
          @current-change="orderCurrentChange"
        />
      </view>

      <!-- {{ $t('pledgedFinancial.index.714114-13') }} -->

      <!-- 交易成功 -->
      <EDialog
        v-model="dialogPaySuccessVisible"
        :title="$t('pledgedFinancial.index.714114-28')"
        width="40%"
      >
        <slot>
          <!-- 默认结构 -->
          <div class="paySuccessDialog">
            <div class="paySuccessContent">
              <view class="items">
                <text>{{ $t("pledgedFinancial.index.714114-29") }}</text
                ><text>4851.00원</text>
              </view>
              <view class="items">
                <text>{{ $t("pledgedFinancial.index.714114-30") }}</text
                ><text>{{ $t("pledgedFinancial.index.714114-31") }}</text>
              </view>
              <view class="items">
                <text>{{ $t("pledgedFinancial.index.714114-32") }}</text
                ><text>8624 4581 8498 4894 320</text>
              </view>
            </div>
          </div>
        </slot>
        <template #footer>
          <span class="dialog-footer">
            <el-button
              type="primary"
              @click="dialogPaySuccessVisible = false"
              >{{ $t("pledgedFinancial.index.714114-33") }}</el-button
            >
          </span>
        </template>
      </EDialog>

      <!-- {{ $t('pledgedFinancial.index.714114-19') }} -->
      <EDialog
        v-model="dialogRedemptionVisible"
        :title="$t('pledgedFinancial.index.714114-34')"
        width="30%"
      >
        <slot>
          <!-- 默认结构 -->
          <div class="paySuccessDialog">
            <!-- <div class="redemption">
              <view>{{ $t("pledgedFinancial.index.714114-35") }}</view>
              <view>{{ $t("pledgedFinancial.index.714114-36") }}</view>
            </div> -->
            <el-descriptions title="" class="redemptionDiv">
              <el-descriptions-item
                :label="$t('pledgedFinancial.index.840720-0')"
                >{{ redemptionDetail.rwa_num + " U" }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('pledgedFinancial.index.840720-1')"
                >{{
                  redemptionDetail.liquidated_amount + " U"
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('pledgedFinancial.index.840720-2')"
                >{{
                  redemptionDetail.all_reward_amount + " U"
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('pledgedFinancial.index.840720-3')"
                >{{
                  redemptionDetail.release_interest_num + " U"
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('pledgedFinancial.index.840720-4')"
                >{{
                  redemptionDetail.release_principal_num + " U"
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('pledgedFinancial.index.840720-5')"
                >{{
                  redemptionDetail.remaining_principal + " U"
                }}</el-descriptions-item
              >
            </el-descriptions>
          </div>
        </slot>
        <template #footer>
          <span class="dialog-footer">
            <el-button
              class="operator_btn"
              type="primary"
              @click="onRedemption"
              >{{ $t("pledgedFinancial.index.714114-19") }}</el-button
            >
          </span>
        </template>
      </EDialog>
    </view>
  </view>
  <Footer />
</template>

<script setup>
import {
  getPledgeStatisticsList,
  getPledgeOrderList,
  earlyRedemption,
  earlyRedemptionDetail,
} from "@/api/index";
import { ref } from "vue";
// import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/vue";
// const accountData = useAppKitAccount();
// const { open } = useAppKit();
import { getPinia } from "/src/stores/index";
const store = getPinia();
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// 状态值
let statusList = ref([
  {
    label: t("pledgedFinancial.index.714114-37"),
    value: "0",
  },
  {
    label: t("pledgedFinancial.index.714114-38"),
    value: "1",
  },
  {
    label: t("pledgedFinancial.index.714114-39"),
    value: "2",
  },
  {
    label: t("pledgedFinancial.index.714114-40"),
    value: "3",
  },
  {
    label: t("pledgedFinancial.index.714114-41"),
    value: "4",
  },
  {
    label: t("pledgedFinancial.index.714114-42"),
    value: "5",
  },
]);

let statisticsList = ref("");
const fetchPledgeStatisticsList = async () => {
  const res = await getPledgeStatisticsList();
  if (res.code == 1) {
    statisticsList.value = res.data;
  }
};
fetchPledgeStatisticsList();

let tabsBtnActive = ref("1");

let isOrderLoading = ref(false);
let pledgeOrderList = ref([]);
let pledgeOrderPage = ref({
  limit: 10,
  page: 1,
  total: 0,
});
const fetchPledgeOrderList = async () => {
  isOrderLoading.value = true;
  let params = {
    ...pledgeOrderPage.value,
  };
  const res = await getPledgeOrderList(params);
  if (res.code == 1) {
    let data = res.data;
    isOrderLoading.value = false;
    pledgeOrderList.value = data.data;

    pledgeOrderPage.value = {
      ...pledgeOrderPage.value,
      page: data.current_page,
      total: data.total,
    };
  }
};
fetchPledgeOrderList();

const orderCurrentChange = (val) => {
  pledgeOrderPage.value.page = val;
  fetchPledgeOrderList();
};

// 赎回相关
let redemptionData = ref("");
let dialogRedemptionVisible = ref(false);

const onRedemption = async () => {
  let { id } = redemptionData.value;

  earlyRedemption({ id }).then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.msg);
      dialogRedemptionVisible.value = false;
      fetchPledgeOrderList();
    }
  });
};

let redemptionDetail = ref("");
const handleRedeem = async (row) => {
  let sres = await earlyRedemptionDetail({ id: row.id });

  if (sres.code == 1) {
    redemptionDetail.value = sres.data;
  }
  dialogRedemptionVisible.value = true;
  redemptionData.value = row;
};

let dialogPaySuccessVisible = ref(false);
const paySuccessClose = () => {
  dialogPaySuccessVisible.value = false;
};

</script>

<style lang="less" scoped>
::v-deep .redemptionDiv {
  .el-descriptions__body {
    .el-descriptions__cell {
      background: #044347 !important;
    }
    background: #044347 !important;
    .el-descriptions__label {
      display: block;
      color: #6fd6d6 !important;
    }
    .el-descriptions__content {
      color: white !important;
    }
  }
}
.disableBtn {
  display: none;
  border-color: #6b6d70 !important;
  background: #6b6d70 !important;
  color: white !important;
}
.tabsBtn {
  ::v-deep .el-tabs__nav {
    color: #00bfbf;
    .el-tabs__item {
      color: white;
    }
    .el-tabs__active-bar {
      background: #00bfbf;
    }
    .is-active {
      color: #00bfbf;
    }
  }
}
.container {
  // background-color: #040c16;
  background-color: #012529;
  height: 100%;
  padding-top: 100rpx;

  .page-content {
    max-width: 2400rpx;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 33rpx;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;

    .statistic {
      display: flex;
      justify-content: space-between;

      @media (max-width: 900px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10rpx;
      }

      .items {
        width: 560rpx;
        height: 270rpx;
        box-sizing: border-box;
        // background: #061724;
        background: #013840;
        padding: 44rpx 48rpx;
        color: white;
        display: flex;
        flex-direction: column;
        gap: 44rpx;
        border-radius: 24rpx;
        font-size: 40rpx;

        .title {
          display: flex;
          align-items: center;

          text {
            // color: #3eebeb;
            color: #6fd6d6;
          }
        }

        .value {
          display: flex;
          justify-content: space-between;
        }

        @media (max-width: 900px) {
          // grid-template-columns: repeat(2, 1fr);
          // width: 49%;
          width: 355rpx;
          height: 280rpx;
          padding: 40rpx 24rpx;
          font-size: var(--txtFs);
        }
      }
    }

    .mypledged {
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 26rpx;

        view:first-child {
          width: 8rpx;
          height: 34rpx;
          background: #3eebeb;
          border-radius: 0rpx;
          margin-right: 20rpx;
        }

        view:last-child {
          color: white;
          font-weight: bold;
          font-size: 40rpx;
        }
      }

      .el-table {
        border-radius: 12rpx;
        background: #091320;

        .buyPledge {
          background: #30607c;
          color: #3eebeb;
          border: 2rpx solid #30607c;
          border-radius: 8rpx;
        }

        .orderList {
          background: #013840;
          color: #00bfbf;
          border: 1rpx solid #00bfbf;
          border-radius: 8rpx;
        }

        // ::v-deep th,
        // tr {
        //   color: #8cbfd9;
        //   background-color: #0e2e40;
        //   font-size: 32rpx;
        //   font-weight: 400;
        // }

        // ::v-deep .el-table__body-wrapper {
        //   th,
        //   tr {
        //     color: white;
        //     background-color: #091320;
        //     font-weight: 400;
        //     font-size: 32rpx;

        //     &:hover {
        //       background-color: #091320 !important;
        //     }
        //   }

        //   td {
        //     border-bottom: 2rpx solid #0d2537;
        //   }
        // }

        // ::v-deep .el-table__body tr:hover > td {
        //   background-color: #0d2537 !important;
        // }
      }
    }

    .cardTab {
      display: flex;
      justify-content: space-between;

      .cardbtn {
        border-radius: 13rpx;

        ::v-deep .el-radio-button .el-radio-button__inner {
          min-width: 190rpx;
          height: 75rpx;
          padding: 0 10px;
          line-height: 75rpx;
          font-size: var(--txtFs);
          color: white;
          background: var(--content-color);
          border: 2rpx solid var(--content-color);
          box-shadow: none;
          border-radius: var(--bRadius);
        }

        ::v-deep .el-radio-button.is-active .el-radio-button__inner {
          color: white;
          background: #1e878c;
        }

        ::v-deep .el-radio-button {
          margin-right: 22rpx;
        }

        @media (max-width: 900px) {
          ::v-deep .el-radio-button .el-radio-button__inner {
            min-width: 200rpx;
            height: 80rpx;
            line-height: 75rpx;
            border-radius: var(--bRadius);
          }
        }
      }
    }

    .tipsall {
      background: #061f32;
      padding: 26rpx 34rpx;
      border-radius: 14rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      background: var(--content-color);
      border-radius: var(--bRadius);

      .el-input {
        border: none;

        ::v-deep .el-input__wrapper {
          box-shadow: none;
          background: var(--content-color) !important;
        }
        ::v-deep .el-input__inner::placeholder {
          color: white !important;
        }
      }

      text:last-child {
        cursor: pointer;
        color: #00bfbf;
        font-weight: bold;
        white-space: nowrap;
      }
    }

    .tipsPayall {
      background: #061f32;
      padding: 26rpx 34rpx;
      border-radius: 14rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;

      .el-input {
        border: none;

        ::v-deep .el-input__wrapper {
          box-shadow: none;
          background: #061f32;
        }
      }

      text:last-child {
        color: #00bfbf;
        font-weight: bold;
        white-space: nowrap;
      }
    }

    .revenue {
      display: flex;
      justify-content: space-between;
      font-size: var(--txtFs);

      text:first-child {
        color: white;
      }

      text:last-child {
        color: white;
      }
    }

    .coin {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      font-size: var(--txtFs);

      // @media (max-width: 900px) {
      //   flex-direction: column;
      // }

      text:first-child {
        margin-right: 54rpx;
        text-align: right;
        @media (max-width: 900px) {
          margin-right: 27rpx;
        }
      }

      text:last-child {
        color: white;
      }

      .yellow {
        font-size: var(--txtFs);
        color: var(--operator-bg) !important;
        flex: 1;
        text-align: right;
        @media (max-width: 900px) {
          flex: 1 1 100%;
          margin-top: 30rpx;
        }
      }

      .cardTab {
        display: flex;
        justify-content: space-between;

        .cardbtn {
          border-radius: 13rpx;

          ::v-deep .el-radio-button .el-radio-button__inner {
            width: 190rpx;
            height: 60rpx;
            padding: 0;
            line-height: 56rpx;
            font-size: var(--txtFs);
            color: white;
            background: var(--content-color);
            border: 2rpx solid var(--content-color);
            box-shadow: none;
            border-radius: var(--bRadius);
          }

          ::v-deep .el-radio-button.is-active .el-radio-button__inner {
            color: white;
            background: #00bfbf;
          }

          ::v-deep .el-radio-button {
            margin-right: 22rpx;
          }

          @media (max-width: 900px) {
            ::v-deep .el-radio-button .el-radio-button__inner {
              width: 200rpx;
              height: 80rpx;
              line-height: 80rpx;
              border-radius: var(--bRadius);
            }
          }
        }
      }
    }

    ::v-deep .chainDialog {
      // max-width: 1280rpx;
      // background: #051723;
      border-radius: 13rpx;
      padding: 33rpx 49rpx;

      .chainContent {
        display: flex;
        flex-direction: column;
        gap: 40rpx;
      }

      .el-dialog__header {
        text-align: center;

        span {
          color: white;
        }
      }

      .content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 20rpx auto 16rpx;
        font-size: 20rpx;

        text {
          color: white;

          &:nth-child(2) {
            color: #fff671;
          }
        }
      }

      .dialog-footer {
        .el-button {
          // width: 272rpx;
          // height: 70rpx;
          font-size: 28rpx;
          border: 2rpx solid #00bfbf;
          background: #00bfbf;
          border-radius: 40rpx;

          @media (max-width: 900px) {
            // height: 90rpx;
            border-radius: 60rpx;
          }
        }
      }

      .tips {
        color: white;
        font-weight: 500;
        font-size: 20rpx;
        text-align: left;

        view {
          margin-bottom: 10rpx;
        }

        .el-dialog__footer {
          text-align: center;
        }
      }

      .countContent {
        margin-top: 40rpx;
        width: 100%;
        background: #091320;
        border-radius: 13rpx;
        display: flex;
        flex-direction: column;
        gap: 39rpx;
        padding: 29rpx 36rpx;
        box-sizing: border-box;

        .items {
          display: flex;
          justify-content: space-between;
          width: 100%;

          .label {
            font-weight: 500;
            font-size: 24rpx;
            color: #8cbfd9;
          }

          .value {
            font-weight: 500;
            font-size: 24rpx;
            color: #ffffff;
          }
        }
      }
    }

    ::v-deep .paySuccessDialog {
      border-radius: 13rpx;
      padding: 33rpx 49rpx;

      .redemption {
        color: white;
        font-weight: 400;
        font-size: 30rpx;
        text-align: center;
      }

      .paySuccessContent {
        display: flex;
        flex-direction: column;
        gap: 40rpx;

        .items {
          display: flex;
          justify-content: space-between;

          text:first-child {
            color: #8cbfd9;
          }

          text:last-child {
            color: white;
          }
        }
      }

      .el-dialog__header {
        text-align: center;
        margin-bottom: 60rpx;

        span {
          color: white;
        }
      }

      .dialog-footer {
        display: flex;
        justify-content: center;

        .el-button {
          width: 272rpx;
          height: 70rpx;
          font-size: 28rpx;
          border: 2rpx solid #00bfbf;
          background: #00bfbf;
          border-radius: 40rpx;
          margin: 100rpx 0 60rpx;
        }
      }
    }
  }
}
</style>
