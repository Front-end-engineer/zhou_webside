<template>
  <view class="mypledged" v-if="store.isWebPort || tabsBtnActive == '1'">
    <view class="title" v-if="store.isWebPort">
      <view></view>
      <view>{{ $t("pledgedFinancial.index.714114-0") }}</view>
    </view>
    <el-table :data="pledgeProductList" style="width: 100%">
      <el-table-column prop="name" :label="$t('pledgedFinancial.index.名字')" />
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
  </view>
  <EDialog
    v-model="dialogOnChainVisible"
    :title="$t('pledgedFinancial.index.714114-13')"
    width="37%"
  >
    <slot>
      <!-- 默认结构 -->
      <div class="chainDialog">
        <div class="chainContent">
          <view class="cardTab">
            <el-radio-group
              :disabled="cardLoading"
              v-model="cardPosition"
              @change="cardPositionChange"
              class="cardbtn"
            >
              <el-radio-button label="0">{{
                $t("pledgedFinancial.index.714114-20")
              }}</el-radio-button>
              <el-radio-button label="1">{{
                $t("pledgedFinancial.index.714114-21")
              }}</el-radio-button>
              <!-- <el-radio-button label="2">银行交易</el-radio-button> -->
            </el-radio-group>
          </view>
          <!-- <view class="coin">
                <text>{{ $t("pledgedFinancial.index.714114-9") }}</text>
                <text>{{ buyPledgeData }}</text>
              </view> -->
          <view class="coin">
            <text style="margin-bottom: 10px">{{
              $t("pledgedFinancial.index.714114-15")
            }}</text>
            <view class="cardTab">
              <el-radio-group
                v-model="cardHqPosition"
                @change="cardHqChange"
                class="cardbtn"
              >
                <el-radio-button
                  style="margin-bottom: 10px"
                  v-for="item in buyPledgeDialogDate.filter((item) =>
                    item.name.includes(pledgeRowsData.name[0])
                  )"
                  :key="item.id"
                  :label="item.id"
                  >{{ item.date + "/" + item.income_ratio }}</el-radio-button
                >
              </el-radio-group>
            </view>
            <text class="yellow keyong"
              >{{ $t("pledgedFinancial.index.714114-22") }}&nbsp;
              {{ coinNumber }} {{ buyPledgeData }}</text
            >
          </view>
          <view class="tipsall">
            <el-input
              v-model="tipsallval"
              @blur="tipsallBlur"
              :placeholder="$t('pledgedFinancial.index.714114-23')"
            ></el-input>
            <text @click="setCoinAll">{{
              $t("pledgedFinancial.index.714114-24")
            }}</text>
          </view>
          <view class="revenue" v-if="cardPosition == 0 || cardPosition == 1">
            <text>{{ $t("pledgedFinancial.index.714114-25") }}</text>
            <text>{{ revenue }} {{ buyPledgeData }}</text>
          </view>
          <view class="tipsPayall" v-if="cardPosition == 2">
            <text>{{ $t("pledgedFinancial.index.714114-26") }}</text>
            <text>원</text>
          </view>
        </div>
      </div>
    </slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          class="operator_btn"
          type="primary"
          @click="throttledClick"
          >{{ $t("pledgedFinancial.index.714114-27") }}</el-button
        >
      </span>
    </template>
  </EDialog>
</template>

<script setup>
import { throttle } from "lodash-es";
import {
  getPledgeProductList,
  getUserInfo,
  buyPledge,
  pledgeTokenBefore,
  getUserCoinUsdtList,
} from "@/api/index";
// import walletLinker from "@/utils/wallet";
import addressList from "@/utils/address";
import { getPinia } from "/src/stores/index";
const store = getPinia();
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { walletInfo: wallet } = toRefs(store);

let userInfo = ref("");
let dialogOnChainVisible = ref(false);
let pledgeTokenData = ref("");
let tabsBtnActive = ref("1");
const cardPosition = ref("0");
const cardHqPosition = ref("");
let coinNumber = ref("");
let tipsallval = ref("");
let buyPledgeData = ref("");
let buyPledgeDialogDate = ref([]);
let isProductLoading = ref(false);
let pledgeProductList = ref({});

let loading = null;

const revenue = computed(() => {
  let rate =
    pledgeProductList.value && cardHqPosition.value
      ? pledgeProductList.value
          .find((item) => item.id == cardHqPosition.value)
          .income_ratio.split("%")[0]
      : "";
  return (
    Number(tipsallval.value) * Number(rate / 100) + Number(tipsallval.value)
  );
});

// 查询余额、支付操作
import Decimal from "decimal.js";
import { useBalance, useWriteContract } from "@wagmi/vue";
import { useAppKitAccount, useAppKit } from "@reown/appkit/vue";
import { useWallet } from "@/hooks/useWallet";
let { currentChain } = useWallet();
const { writeContractAsync } = useWriteContract();
const accountData = useAppKitAccount();
const { open } = useAppKit();
let chainAddress = computed(() => {
  return currentChain.value ? addressList[`pl_${currentChain.value.name}`] : "";
});

const sellDatabalanceQuery = reactive({
  address: undefined,
  chainId: undefined,
  token: undefined,
});
const { refetch } = useBalance(sellDatabalanceQuery);

const filterSystemAddress = (name) => {
  if (name.includes("BNB")) {
    return "bsc";
  } else if (name.includes("Eth")) {
    return "eth";
  } else if (name.includes("TRON")) {
    return "tron";
  }
};

let cardLoading = ref(false);
const cardPositionChange = async () => {
  if (cardPosition.value == 1 && !accountData.value.isConnected) {
    ElMessage.warning("请连接钱包");
    dialogOnChainVisible.value = false;
    tipsallval.value = "";
    cardHqPosition.value = "";
    clearbuyDialog();
    open({ view: "Connect" });
    return;
  }
  cardLoading.value = true;
  if (cardPosition.value == "0") {
    coinNumber.value = userInfo.value.amount_usdt;
  } else if (cardPosition.value === "1") {
    cardLoading.value = true;

    if (!currentChain.value.name.includes("Tron")) {
      if (!accountData.value.address || !currentChain.value.id) {
        throw new Error("Missing wallet address or chain ID");
      }
      sellDatabalanceQuery.address = accountData.value.address;
      sellDatabalanceQuery.chainId = currentChain.value.id;
      sellDatabalanceQuery.token = pledgeTokenData.value[0].token_contract;
      const balance = await refetch();
      coinNumber.value = balance.data.formatted;
    }

    // let res;
    // if (wallet.value.chain == "tron" && pledgeTokenData.value[0]) {
    //   res = await walletLinker.getTronTokenBalance(
    //     pledgeTokenData.value[0].token_contract
    //   );
    // } else if (wallet.value.chain !== "tron" && pledgeTokenData.value[0]) {
    //   res = await walletLinker.getTokenBalance(
    //     pledgeTokenData.value[0].token_contract
    //   );
    // }

    // coinNumber.value = res.formatted;
  }
  cardLoading.value = false;
};

const fetchPledgeProductList = async () => {
  isProductLoading.value = true;
  const res = await getPledgeProductList();
  if (res.code == 1) {
    isProductLoading.value = false;
    pledgeProductList.value = res.data;
  }
};
fetchPledgeProductList();

let pledgeRowsData = ref();
const handleBuyPledge = async (row) => {
  pledgeRowsData.value = row;
  dialogOnChainVisible.value = true;

  await fetchPledgeTokenData();

  getUserInfo().then((res) => {
    if (res.code == 1) {
      userInfo.value = res.data.userinfo;
      coinNumber.value =
        row.coin == "FutLink"
          ? userInfo.value["amount"]
          : userInfo.value["amount_usdt"];
    }
  });
  getPledgeProductList({ coin: row.coin }).then((res) => {
    if (res.code == 1) {
      buyPledgeDialogDate.value = res.data;
    }
  });
};

let hash;
const onTrading = () => {
  // if (!Number(coinNumber.value)) {
  //   ElMessage.warning(t("PledgeTransaction.PledgeTransaction.764719-1"));
  //   return;
  // }
  if (!cardHqPosition.value) {
    ElMessage.warning(t("pledgedFinancial.index.714114-43"));
    return;
  }
  if (!tipsallval.value) {
    ElMessage.warning(t("pledgedFinancial.index.714114-44"));
    return;
  }
  
  if (!accountData.value.isConnected) {
    dialogOnChainVisible.value = false;
    open({ view: "Connect" });
    ElMessage.warning("请连接钱包");
    return;
  }

  loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });

  fetchBuyPledge();
};

let userCoinUsdtList = ref();
const fetchUserCoinUsdtList = async () => {
  let res = await getUserCoinUsdtList();
  userCoinUsdtList.value = res.data;
};
fetchUserCoinUsdtList();

const fetchPledgeTokenData = () => {
  if (!currentChain.value) return;
  let params = {
    chain_id: currentChain.value && currentChain.value.id,
  };
  pledgeTokenBefore(params).then((res) => {
    if (res.code == 1) {
      pledgeTokenData.value = res.data;
      buyPledgeData.value = pledgeTokenData.value[0].coin;
    }
  });
};

const throttledClick = throttle(onTrading, 2000);

const fetchBuyPledge = async () => {
  let pay_type = "";
  if (cardPosition.value == "0") {
    pay_type = 2;
  } else if (cardPosition.value == "1") {
    pay_type = 1;
  } else {
    pay_type = 3;
  }

  let params = {
    pledge_id: cardHqPosition.value,
    rwa_num: tipsallval.value,
    pay_type,
    system_address: `pl_${filterSystemAddress(currentChain.value.name)}`,
  };

  let { id, token_contract } =
    pledgeTokenData.value && pledgeTokenData.value[0];
  if (cardPosition.value == "1") {
    params = {
      ...params,
      pay_coin_id: id,
      pay_address: chainAddress.value,
    };
  }

  let res = await buyPledge(params);

  try {
    if (cardPosition.value == 1 && !currentChain.value.name.includes("Tron")) {
      hash = await writeContractAsync({
        address: token_contract,
        abi: JSON.parse(
          userCoinUsdtList.value.find(
            (item) => item.blockchain.chain_id == currentChain.value.id
          ).token_abi
        ),
        functionName: "transfer",
        args: [
          chainAddress.value,
          new Decimal(tipsallval.value).mul(Decimal.pow(10, 18)).toHex(),
        ],
        chain: currentChain.value,
        account: accountData.value.address,
      });
    }

    // if (cardPosition.value == 1 && wallet.value.chain == "tron") {
    //   hash = await walletLinker.transferTronToken(
    //     token_contract,
    //     chainAddress.value,
    //     tipsallval.value,
    //     userCoinUsdtList.value.find(
    //       (item) => item.blockchain.chain_id == wallet.value.chainId
    //     ).token_abi
    //   );
    // } else if (cardPosition.value == 1 && wallet.value.chain !== "tron") {
    //   hash = await walletLinker.transferToken(
    //     token_contract,
    //     chainAddress.value,
    //     tipsallval.value,
    //     userCoinUsdtList.value.find(
    //       (item) => item.blockchain.chain_id == wallet.value.chainId
    //     ).token_abi
    //   );
    // }
  } catch (e) {
    console.log(e);
    loading.close();
  }

  loading.close();
  if (res.code == 1) {
    dialogOnChainVisible.value = false;
    tipsallval.value = "";
    cardHqPosition.value = "";
    clearbuyDialog();

    ElMessage.success(res.msg);
  }
};

const clearbuyDialog = () => {
  cardPosition.value = "0";
  buyPledgeDialogDate.value = "";
  tipsallval.value = "";
  cardHqPosition.value = "";
};

const setCoinAll = () => {
  if (!Number(coinNumber.value)) return;
  tipsallval.value = coinNumber.value;
};

const tipsallBlur = () => {
  if (tipsallval.value > coinNumber.value) {
    tipsallval.value = "";
  }
};

const cardHqChange = (value) => {
  // if (!accountData.value.isConnected) return;
  let amount = buyPledgeDialogDate.value.find(
    (item) => item.id == value
  ).amount;
  tipsallval.value = amount ? amount : "";
};

watch(
  () => accountData.value.isConnected,
  async (val) => {
    if (val) {
      setTimeout(() => {
        cardPositionChange();
      }, 1000);
    }
  }
);

onMounted(async () => {
  setTimeout(() => {
    if (!accountData.value.isConnected) {
      ElMessage.warning("请连接钱包");
      try {
        open({ view: "Connect" });
      } catch (e) {
        uni.showToast({
          title: "连接钱包或签名失败",
          duration: 2000,
          icon: "none",
        });
      } finally {
      }
    }
  }, 1000);
});
</script>

<style lang="scss" scoped>
::v-deep .chainDialog {
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
      font-size: 28rpx;
      border: 2rpx solid #00bfbf;
      background: #00bfbf;
      border-radius: 40rpx;

      @media (max-width: 900px) {
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
      color: rgb(160, 157, 157) !important;
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
  flex-direction: column;
  // align-items: center;
  // flex-wrap: wrap;
  font-size: var(--txtFs);

  // @media (max-width: 900px) {
  //   flex-direction: column;
  // }

  text:first-child {
    text-align: left;
    margin-right: 54rpx;
    @media (max-width: 900px) {
      margin-right: 27rpx;
    }
  }

  text:last-child {
    color: white;
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
</style>
