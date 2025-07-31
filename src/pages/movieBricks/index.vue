<template>
  <Header />
  <view class="container">
    <image
      class="hero-bg"
      src="../../static/hero-bg.png"
      mode="widthFix"
    ></image>
    <view class="page-content">
      <Kline origin="movie"></Kline>

      <view class="tableDiv">
        <view class="query">
          <view>{{ $t("movieBricks.index.197466-0") }}</view>
          <view>
            <el-input v-model="queryParams.queryInput"></el-input>
          </view>
          <view>
            <el-button class="operator_btn" type="primary">{{
              $t("movieBricks.index.197466-1")
            }}</el-button>
          </view>
          <view>
            <el-select v-model="queryParams.querySelectOne" placeholder="">
              <el-option
                :label="$t('movieBricks.index.197466-2')"
                value="bithumb"
              />
              <el-option label="upbit" value="upbit" />
            </el-select>
          </view>
          <view>
            <el-select v-model="queryParams.querySelectTwo" placeholder="">
              <el-option
                :label="$t('movieBricks.index.197466-3')"
                value="binance"
              />
            </el-select>
          </view>
        </view>
        <view class="tableData">
          <el-table :data="filterTableData" style="width: 100%">
            <el-table-column
              prop="coin"
              :label="$t('movieBricks.index.197466-4')"
            />
            <el-table-column
              prop="ssjz"
              :label="
                $t('movieBricks.index.197466-5', [queryParams.querySelectOne])
              "
              min-width="190"
              align="center"
            >
              <template #default="scope">
                <view>{{
                  scope.row[queryParams.querySelectOne + "UsdtPrice"]
                }}</view>
                <view
                  class="gray"
                  v-if="scope.row[queryParams.querySelectOne + 'KrwPrice']"
                  >{{ scope.row[queryParams.querySelectOne + "KrwPrice"] }}
                  {{ $t("movieBricks.index.197466-6") }}</view
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="income_ratio"
              :label="$t('movieBricks.index.197466-7')"
              min-width="190"
              align="center"
            >
              <template #default="scope">
                <view>{{
                  scope.row[queryParams.querySelectTwo + "UsdtPrice"]
                }}</view>
                <view
                  class="gray"
                  v-if="scope.row[queryParams.querySelectTwo + 'KrwPrice']"
                  >{{ scope.row[queryParams.querySelectTwo + "KrwPrice"] }}
                  {{ $t("movieBricks.index.197466-6") }}</view
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="income"
              :label="$t('movieBricks.index.197466-8')"
              min-width="190"
              align="center"
            >
              <template #default="scope">
                <view>{{ scope.row.diffUsdtPrice }}</view>
                <view class="gray" v-if="scope.row.diffKrwPrice"
                  >{{ scope.row.diffKrwPrice }}
                  {{ $t("movieBricks.index.197466-6") }}</view
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="rwa_num"
              :label="$t('movieBricks.index.197466-8') + '%'"
              min-width="190"
              align="center"
            >
              <template #default="scope">
                <view>{{ scope.row.diffUsdtPerce }}</view>
                <view class="gray" v-if="scope.row.diffKrwPerce"
                  >{{ scope.row.diffKrwPerce }}
                  {{ $t("movieBricks.index.197466-6") }}</view
                >
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="expected_maturity_assets"
              label="与前一天相比"
              min-width="210"
            >
              <template #default="scope">
                <view class="btnDiv">
                  <el-button type="primary" color="#FF2323" size="small"
                    >-0.82%</el-button
                  >
                  &nbsp;
                  <view>-0.82%</view>
                </view>
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="expected_maturity_assets" label="最高价" /> -->
            <!-- <el-table-column prop="expected_maturity_assets" label="最低价" /> -->
            <!-- <el-table-column label="状态">
                  <template #default="scope">
                      {{statusList.find(item => item.value == scope.row.state).label}}
                  </template>
</el-table-column> -->
            <!-- <el-table-column
              :label="$t('movieBricks.index.197466-10')"
              width="150"
              align="right"
            >
              <template #default="scope">
                <el-button
                  class="operator_btn"
                  size="small"
                  @click="oneClickTrade(scope.row)"
                  >{{ $t("movieBricks.index.197466-11") }}</el-button
                >
              </template>
            </el-table-column> -->
          </el-table>
          <!-- <el-pagination layout="prev, pager, next" :total="50" /> -->
        </view>
      </view>
    </view>

    <EDialog
      v-model="dialogTransactionVisible"
      :title="transactionTitle"
      width="30%"
    >
      <slot>
        <div class="transactionDialog">
          <view class="t_content">
            <view class="card">
              <view class="cardTab" style="margin-bottom: 60rpx">
                <el-radio-group
                  :disabled="cardLoading"
                  v-model="cardPosition"
                  @change="cardPositionChange"
                  class="cardbtn"
                >
                  <el-radio-button label="1">{{
                    $t("movieBricks.index.197466-12")
                  }}</el-radio-button>
                  <el-radio-button label="2">{{
                    $t("movieBricks.index.197466-13")
                  }}</el-radio-button>
                  <!-- <el-radio-button label="3">银行交易</el-radio-button> -->
                </el-radio-group>
                <el-button class="priceManage" @click="priceManageClick">{{
                  $t("movieBricks.index.197466-14")
                }}</el-button>
              </view>
              <view class="cardContent">
                <view class="items">
                  <view class="itemsTop">
                    <text>{{ $t("movieBricks.index.197466-15") }}</text>
                    <view v-if="cardPosition !== '3'">
                      <!-- <image :src="coin_sellData.img" mode="heightFix"></image> -->
                      <text
                        >{{ coin_sellData.coin }}：{{
                          cardPosition == "1"
                            ? coin_sellData.usdtBalance
                            : coin_sellData.balance
                        }}</text
                      >
                      <el-button
                        type="text"
                        class="bfbf"
                        @click="getTotalUsdt"
                        >{{ $t("movieBricks.index.197466-16") }}</el-button
                      >
                    </view>
                  </view>
                  <view class="itemsBottom">
                    <view class="itemsBottom_img" @click="sallDataClick">
                      <image
                        v-if="coin_sellData && cardPosition !== '3'"
                        :src="coin_sellData.commoncoin?.img"
                        mode="heightFix"
                      ></image>
                      <view v-if="cardPosition !== '3'">
                        <view>{{ coin_sellData.coin }}</view>
                        <!-- <view>{{ coin_sellData.name }}</view> -->
                      </view>

                      <image
                        v-if="cardPosition == '3'"
                        src="@/static/hanyuan.png"
                        mode="heightFix"
                      ></image>
                      <view v-if="cardPosition == '3'">
                        <view>{{ "W" }}</view>
                        <view></view>
                      </view>
                      <view v-if="!coin_sellData">{{
                        $t("movieBricks.index.197466-17")
                      }}</view>
                      <view class="iconitem">
                        <el-icon size="15px">
                          <CaretBottom />
                        </el-icon>
                      </view>
                    </view>
                    <view class="txt">
                      <el-input
                        v-if="usdtInputShow"
                        ref="usdtInputRef"
                        v-model="usdtInput"
                        @input="usdtHanleInput"
                        @focus="usdtHanleFocus"
                        @blur="usdtHanleBlur"
                        placeholder="0.00"
                      />
                      <text
                        v-if="!usdtInputShow"
                        @click="usdtTxtClick"
                        style="cursor: pointer"
                        >{{ usdtInput }}</text
                      >
                    </view>
                  </view>
                </view>
                <view class="items">
                  <view class="itemsTop">
                    <text>{{ $t("movieBricks.index.197466-18") }}</text>
                  </view>
                  <view class="itemsBottom">
                    <view class="itemsBottom_img" @click="coinBuyClick">
                      <image
                        v-if="coin_buyData"
                        :src="coin_buyData.commoncoin?.img"
                        mode="heightFix"
                      ></image>
                      <view v-if="coin_buyData">
                        <view>{{ coin_buyData.coin }}</view>
                        <!-- <view>{{ coin_buyData.name }}</view> -->
                      </view>
                      <view v-if="!coin_buyData">{{
                        $t("movieBricks.index.197466-17")
                      }}</view>
                      <view class="iconitem">
                        <el-icon size="15px">
                          <CaretBottom />
                        </el-icon>
                      </view>
                    </view>
                    <view class="txt">
                      {{
                        sellPrice &&
                        buyPrice &&
                        (sellPrice / buyPrice) * Number(usdtInput)
                          ? (sellPrice / buyPrice) * Number(usdtInput)
                          : ""
                      }}
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="query">
              <el-select
                v-model="addressValue"
                @change="addressChange"
                filterable
                class="address"
                :placeholder="$t('movieBricks.index.197466-19')"
                clearable
                size="large"
              >
                <el-option
                  v-for="item in userAddressTableData"
                  :key="item.address"
                  :label="item.name + ' (' + formatString(item.address) + ')'"
                  :value="item.address"
                />
              </el-select>

              <view class="priceMsg">
                <view class="items">
                  <view class="label">{{
                    $t("movieBricks.index.197466-20")
                  }}</view>
                  <view class="value">{{
                    parseFloat(usdtInput) + fee || 0
                  }}</view>
                </view>
                <view class="items">
                  <view class="label">{{
                    $t("movieBricks.index.197466-21")
                  }}</view>
                  <view class="value">{{ fee }}</view>
                </view>
                <view class="items">
                  <view class="label">{{
                    $t("movieBricks.index.197466-22")
                  }}</view>
                  <view class="value">{{ profit }} USDT</view>
                </view>
                <view class="items">
                  <view class="label"
                    >{{ $t("movieBricks.index.197466-22") }}（%）</view
                  >
                  <view class="value">{{ profitRatio }}%</view>
                </view>
              </view>

              <!-- <view class="countContent">
                <view class="items">
                  <view class="label">{{ $t("swap.index.207705-10") }}</view>
                  <view class="value"
                    >{{
                      (coin_sellData.price / coin_buyData.price) *
                      Number(usdtInput)
                    }}{{ coin_buyData.coin }}</view
                  >
                </view>
                <view class="items">
                  <view class="label">{{ $t("swap.index.207705-11") }}</view>
                  <view class="value"
                    >1 USDT = {{ coin_sellData.price / coin_buyData.price
                    }}{{ coin_buyData.coin }}
                  </view>
                </view>
                <view class="items">
                  <view class="label">{{ $t("swap.index.207705-12") }}</view>
                  <view class="value">{{ configValue["SWAP_fee_rate"] }}%</view>
                </view>
                <view class="items">
                  <view class="label">{{ $t("swap.index.207705-13") }}</view>
                  <view class="value">{{
                    platform[configValue.bricks_price]
                  }}</view>
                </view>
                <view class="items">
                  <view class="label">{{ $t("swap.index.207705-13") }}</view>
                  <view class="value">{{ configValue.bricks_price }}</view>
                </view>
              </view> -->

              <view class="queryBtn">
                <view></view>
                <view>
                  <!-- <el-button @click="queryAbsentee">{{ $t('movieBricks.index.197466-1') }}</el-button> -->
                  <el-button
                    class="operator_btn"
                    @click="clickTransaction"
                    :disabled="
                      !addressValue ||
                      !coin_buyData ||
                      !Number(usdtInput) ||
                      !coin_sellData
                    "
                    >{{ $t("movieBricks.index.197466-23") }}</el-button
                  >
                </view>
              </view>

              <view class="tips">
                <view>{{ $t("movieBricks.index.197466-24") }}</view>
                <view>{{ $t("movieBricks.index.197466-25") }}</view>
              </view>
            </view>
          </view>
        </div>
      </slot>
      <template #footer>
        <div></div>
      </template>
    </EDialog>

    <!-- 转出币种选择 -->
    <EDialog
      v-model="dialogSallDataVisible"
      :title="$t('movieBricks.index.197466-15')"
      width="40%"
    >
      <slot>
        <div>
          <el-table
            ref="coinSallTableRef"
            :data="coinUSDTTableData"
            style="width: 100%"
            highlight-current-row
            @current-change="handleCoinSallChange"
          >
            <el-table-column
              property="commoncoin.name"
              :label="$t('movieBricks.index.197466-26')"
            />
            <el-table-column
              property="coin"
              :label="$t('movieBricks.index.197466-28')"
            />
          </el-table>
        </div>
      </slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="operator_btn"
            type="primary"
            @click="coinSallSubmit"
          >
            {{ $t("movieBricks.index.197466-29") }}
          </el-button>
          <el-button class="operator_btn" @click="coinSallCancel">{{
            $t("movieBricks.index.197466-30")
          }}</el-button>
        </span>
      </template>
    </EDialog>

    <!-- 接收币种选择 -->
    <EDialog
      v-model="dialogcoinUSDTListVisible"
      :title="$t('movieBricks.index.197466-18')"
      width="40%"
    >
      <slot>
        <div>
          <el-table
            ref="coinBuyTableRef"
            :data="callcoinUSDTTableData"
            style="width: 100%"
            highlight-current-row
            @current-change="handleCoinBuyChange"
            :current-row-key="coin_buyData"
          >
            <el-table-column
              property="name"
              :label="$t('movieBricks.index.197466-26')"
            />
            <!-- <el-table-column
              property="price"
              :label="$t('movieBricks.index.197466-27')"
            /> -->
            <el-table-column
              property="coin"
              :label="$t('movieBricks.index.197466-28')"
            />
          </el-table>
        </div>
      </slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="operator_btn" type="primary" @click="coinBuySubmit">
            {{ $t("movieBricks.index.197466-29") }}
          </el-button>
          <el-button class="operator_btn" @click="coinBuyCancel">{{
            $t("movieBricks.index.197466-30")
          }}</el-button>
        </span>
      </template>
    </EDialog>

    <!-- 钱包管理 -->
    <putAddres
      v-model="priceManageDialog"
      @change="fetchUserAddressList()"
    ></putAddres>
  </view>
  <Footer />
</template>

<script setup>
import { sub, div, mul } from "@/utils/index.js";
import websocket from "@/utils/socket.js";
import { reactive, ref } from "vue";
import {
  getCoinUSDTList,
  getBricksPriceList,
  getUserAddressList,
  getCoinList,
  getPriceList,
  createOrder,
  pledgeTokenBefore,
  bricksOrderBefore,
  paymentCallback,
  getConfig,
  getUserCoinUsdtList,
} from "@/api/index";
import walletLinker from "@/utils/wallet";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
const { t } = useI18n();

const store = getPinia();

const { walletInfo: wallet, userInfo, chainList } = toRefs(store);

const transactionTitle = t("movieBricks.index.197466-11");

let priceManageDialog = ref(false);

const priceManageClick = () => {
  priceManageDialog.value = true;
};

let queryParams = reactive({
  queryInput: "",
  querySelectOne: "bithumb",
  querySelectTwo: "binance",
});

const dialogTransactionVisible = ref(false);

const cardPosition = ref("1");

const tableData = ref([]);

let addressValue = ref("");

// 出币币种
let coin_sellData = ref(null);
// 入币币种
let coin_buyData = ref(null);

let usdtInput = ref("0");

const dialogcoinUSDTListVisible = ref(false);

const dialogSallDataVisible = ref(false);

let coinSallTableRef = ref();

let usdtInputShow = ref(false);

let usdtInputRef = ref("");

const coinList = ref([]);

// 接收地址
let userAddressTableData = ref([]);

const addressChange = async (value) => {
  coin_buyData.value = null;
  callcoinUSDTTableData.value = [];
  if (value) {
    await getCallCoinListApi();
  }
};

let coinUSDTTableData = ref([]);
let callcoinUSDTTableData = ref([]);

const feeRatio = ref(0);

const mainExchange = ref(null);

const filterTableData = computed(() => {
  return tableData.value.filter((item) => {
    return (
      item.coin.includes(queryParams.queryInput) &&
      item[queryParams.querySelectOne + "KrwPrice"] &&
      item[queryParams.querySelectTwo + "KrwPrice"]
    );
  });
});

const buyPrice = computed(() => {
  let value = coin_buyData.value
    ? coin_buyData.value.exchange &&
      coin_buyData.value.exchange.find(
        (item) => item.exchange == queryParams.querySelectOne
      ).usdt_price
    : 0;
  return value || 0;
});

const sellPrice = computed(() => {
  let value = coin_sellData.value
    ? coin_sellData.value.exchange &&
      coin_sellData.value.exchange.find(
        (item) => item.exchange == queryParams.querySelectOne
      ).usdt_price
    : 0;
  return value || 0;
});

const fee = computed(() => {
  return usdtInput.value * (feeRatio.value / 100);
});

const currentChainId = computed(() => {
  return chainList.value.find((item) => item.chain_id === currentChain.value.id)
    ?.id;
});

const profit = computed(() => {
  const item = tableData.value.find(
    (item) => item.coin === coin_sellData.value.coin
  );
  if (item) {
    if (mainExchange.value === "krw") {
      return sub(
        item[queryParams.querySelectOne + "UsdtPrice"],
        item[queryParams.querySelectTwo + "UsdtPrice"]
      );
    } else {
      return sub(
        item[queryParams.querySelectTwo + "UsdtPrice"],
        item[queryParams.querySelectOne + "UsdtPrice"]
      );
    }
  }
  return;
});

const profitRatio = computed(() => {
  return profit.value
    ? mul(
        div(
          profit.value,
          tableData.value.find(
            (item) => item.coin === coin_sellData.value.coin
          )[
            (mainExchange.value === "krw"
              ? queryParams.querySelectOne
              : queryParams.querySelectTwo) + "UsdtPrice"
          ]
        ),
        100
      )
    : 0;
});

let walletInfo = ref("");
let loading = null;

onMounted(() => {
  walletInfo.value = store.walletInfo || "";
  console.log(walletInfo.value);
  console.log(wallet, userInfo, chainList.value);

  websocket.connect("ws://43.132.102.197:9502/websocket");

  websocket.onMessage((msg) => {
    const data = JSON.parse(msg);
    // console.log("收到消息：", data);

    if (data.type === "trade" || data.type === "ticker") {
      if (
        data.name === queryParams.querySelectOne ||
        data.name === queryParams.querySelectTwo
      ) {
        const item = tableData.value.find((item) => item.coin === data.coin);
        if (item) {
          Object.assign(item, {
            [data.name + "KrwPrice"]: data.data.krw_price,
            [data.name + "UsdtPrice"]: data.data.usdt_price,
          });
          if (
            item[queryParams.querySelectOne + "KrwPrice"] &&
            item[queryParams.querySelectTwo + "KrwPrice"]
          ) {
            item.diffKrwPrice = (
              item[queryParams.querySelectOne + "KrwPrice"] -
              item[queryParams.querySelectTwo + "KrwPrice"]
            ).toFixed(4);
            item.diffKrwPerce =
              (
                (item.diffKrwPrice /
                  item[queryParams.querySelectOne + "KrwPrice"]) *
                100
              ).toFixed(4) + "%";

            item.diffUsdtPrice = (
              item[queryParams.querySelectOne + "UsdtPrice"] -
              item[queryParams.querySelectTwo + "UsdtPrice"]
            ).toFixed(4);
            item.diffUsdtPerce =
              (
                (item.diffUsdtPrice /
                  item[queryParams.querySelectOne + "UsdtPrice"]) *
                100
              ).toFixed(4) + "%";
          }
        } else {
          tableData.value.push({
            coin: data.coin,
            [data.name + "KrwPrice"]: data.data.krw_price,
            [data.name + "UsdtPrice"]: data.data.usdt_price,
          });
        }

        coinUSDTTableData.value.forEach((item) => {
          if (item.coin === data.coin) {
            item.price = data.usdt_price;
          }
        });
      }
    }
  });
});

onUnmounted(() => {
  websocket.close();
});

let userCoinUsdtList = ref();
const fetchUserCoinUsdtList = async () => {
  let res = await getUserCoinUsdtList();
  userCoinUsdtList.value = res.data;
};
fetchUserCoinUsdtList();

// 查询余额、支付操作
import Decimal from "decimal.js";
import {
  useChainId,
  useSwitchChain,
  useBalance,
  useAccount,
  useWriteContract,
} from "@wagmi/vue";
import { useWallet } from "@/hooks/useWallet";
let { currentChain } = useWallet();
const { writeContractAsync } = useWriteContract();
const accountData = useAccount();
const { chainId } = useAccount();
watch(chainId, (newChainId, oldChainId) => {
  console.log(chainName.value);
  console.log("链从", oldChainId, "切换到", newChainId);
  cardPositionChange();
});

let chainAddress = currentChain.value
  ? getCurrentInstance().appContext.config.globalProperties.$getChainAddress(
      `ai_${currentChain.value.name}`
    )
  : "";

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
// 一键交易 => tab 菜单切换
const cardPositionChange = async () => {
  console.log("66666666666666");
  coin_sellData.value = {};
  cardLoading.value = true;
  await getCoinListApi();
  usdtInput.value = "0";
  if (cardPosition.value == "1") {
    // 平台钱包
    coin_sellData.value = coinUSDTTableData.value[0] || {};
    coin_sellData.value.usdtBalance = userInfo.value.amount_usdt;
    coin_sellData.value.futlinkBalance = userInfo.value.amount;
  } else if (cardPosition.value === "2") {
    // 链上钱包

    // 初始化转出币种
    if (!coin_sellData.value || !Object.keys(coin_sellData.value).length) {
      coin_sellData.value = {
        ...coinUSDTTableData.value[0],
      };
    }
    cardLoading.value = true;

    if (!currentChain.value.name.includes("Tron")) {
      if (!accountData.address.value || !currentChain.value.id) {
        throw new Error("Missing wallet address or chain ID");
      }
      sellDatabalanceQuery.address = accountData.address.value;
      sellDatabalanceQuery.chainId = currentChain.value.id;
      sellDatabalanceQuery.token =
        coin_sellData.value?.commoncoin?.token_contract;
      const balance = await refetch();
      coin_sellData.value.balance = balance.data.formatted;
    }

    // let res;
    // if (wallet.value.chain == "tron" && coinUSDTTableData.value[0].commoncoin) {
    //   res = await walletLinker.getTronTokenBalance(
    //     coinUSDTTableData.value[0].commoncoin.token_contract
    //   );
    // } else if (
    //   wallet.value.chain !== "tron" &&
    //   coinUSDTTableData.value[0].commoncoin
    // ) {
    //   res = await walletLinker.getTokenBalance(
    //     coinUSDTTableData.value[0].commoncoin.token_contract
    //   );
    // }
    // coin_sellData.value.balance = res.formatted;
  }
  cardLoading.value = false;
};

// 交易
let hash;
let order_no;
const clickTransaction = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });

  try {
    // 获取接收钱包地址
    // const configRes = await bricksOrderBefore();
    // let receivingAddress;
    // if (wallet.value.chain === "bsc" || wallet.value.chain === "eth") {
    //   receivingAddress = configRes[wallet.value.chain];
    // } else if (wallet.value.chain === "tron") {
    //   receivingAddress = configRes.trx;
    // }

    // 创建订单
    const res = await createOrder({
      coin_sall_id: coin_sellData.value.id,
      coin_buy_id: coin_buyData.value.id,
      krw_exchange: queryParams.querySelectOne,
      sall_address: accountData.address.value,
      buy_address_id: userAddressTableData.value.find(
        (item) => item.address == addressValue.value
      ).id,
      number_sall: usdtInput.value,
      chain_id: currentChain.value.id,
      pay_type:
        cardPosition.value == "1" ? 2 : cardPosition.value == "2" ? 1 : 3,
      system_address: `br_${filterSystemAddress(currentChain.value.name)}`,
    });
    order_no = res.data.order_no;

    try {
      if (res.code == 1) {
        if (
          cardPosition.value == 2 &&
          !currentChain.value.name.includes("Tron")
        ) {
          hash = await writeContractAsync({
            address:
              coin_sellData.value.commoncoin &&
              coin_sellData.value.commoncoin.token_contract,
            abi: JSON.parse(
              userCoinUsdtList.value.find(
                (item) => item.blockchain.chain_id == currentChain.value.id
              ).token_abi
            ),
            functionName: "transfer",
            args: [
              chainAddress,
              new Decimal(usdtInput.value).mul(Decimal.pow(10, 18)).toHex(),
            ],
            chain: currentChain.value,
            account: accountData.address.value,
          });
        }

        // if (
        //   cardPosition.value == 2 &&
        //   wallet.value.chain == "tron" &&
        //   coinUSDTTableData.value[0].commoncoin
        // ) {
        //   hash = await walletLinker.transferTronToken(
        //     coin_sellData.value.commoncoin &&
        //       coin_sellData.value.commoncoin.token_contract,
        //     chainAddress,
        //     usdtInput.value,
        //     userCoinUsdtList.value.find(
        //       (item) => item.blockchain.chain_id == wallet.value.chainId
        //     ).token_abi
        //   );
        // } else if (
        //   cardPosition.value == 2 &&
        //   wallet.value.chain !== "tron" &&
        //   coinUSDTTableData.value[0].commoncoin
        // ) {
        //   hash = await walletLinker.transferToken(
        //     coin_sellData.value.commoncoin &&
        //       coin_sellData.value.commoncoin.token_contract,
        //     chainAddress,
        //     usdtInput.value,
        //     userCoinUsdtList.value.find(
        //       (item) => item.blockchain.chain_id == wallet.value.chainId
        //     ).token_abi
        //   );
        // }
      }
    } catch (e) {
      console.log(e);
      loading.close();
      throw new Error("chainError");
    }

    loading.close();

    dialogTransactionVisible.value = false;

    if (res.code == 1) {
      setTimeout(() => {
        cardPositionChange();
      }, 2300);
      ElMessage.success(res.msg);
    }
  } catch (e) {
    console.log(e);
    uni.showToast({
      title: t("movieBricks.index.197466-32"),
      icon: "none",
    });
  }
};

onLoad(async () => {
  // await getCoinListApi();
  cardPositionChange();
});

// 表格初始化数据
const getPriceListApi = async () => {
  const res = await getPriceList({
    krw: queryParams.querySelectOne,
    contrast: queryParams.querySelectTwo,
  });
  if (res.code === 1) {
    tableData.value = res.data.map((item) => ({
      coin: item.coin,
      [queryParams.querySelectOne + "KrwPrice"]: item.krw.krw,
      [queryParams.querySelectOne + "UsdtPrice"]: item.krw.usdt,
      [queryParams.querySelectTwo + "KrwPrice"]: item.contrast.krw,
      [queryParams.querySelectTwo + "UsdtPrice"]: item.contrast.usdt,
      diffKrwPrice: item.price_diff.krw.price,
      diffUsdtPrice: item.price_diff.usdt.price,
      diffKrwPerce: item.price_diff.krw.price_rate,
      diffUsdtPerce: item.price_diff.usdt.price_rate,
    }));
  }
};
getPriceListApi();

const fetchUserAddressList = async () => {
  let params = {
    chain_id: currentChain.value.id,
  };
  let res = await getUserAddressList(params);

  if (res.code == 1) {
    userAddressTableData.value = res.data.data || [];
    addressValue.value =
      userAddressTableData.value &&
      userAddressTableData.value[0] &&
      userAddressTableData.value[0].address;
    if (!userAddressTableData.value.length) return;
    await getCallCoinListApi();
  }
};
fetchUserAddressList();

// 选择接收币种
const handleCoinBuyChange = (value) => {
  coin_buyData.value = { ...value };
};

const handleCoinSallChange = (value) => {
  coin_sellData.value = value;
};

const fetchcoinUSDTListList = async () => {
  let res = await getCoinUSDTList();

  if (res.code == 1) {
    coin_sellData.value =
      coinUSDTTableData.value.find((item) => item.name == "USDT") || {};
  }
};
fetchcoinUSDTListList();

// 表格按钮 一键交易
const oneClickTrade = async (row) => {
  dialogTransactionVisible.value = true;
  // coin_buyData.value = row;
  getFeeAndMainExchange();
};

const getFeeAndMainExchange = () => {
  getConfig({
    name: "bricks_fee_rate",
    group: "system",
  }).then((res) => {
    feeRatio.value = res.data;
  });

  getConfig({
    name: "bricks_price",
    group: "system",
  }).then((res) => {
    mainExchange.value = res.data;
  });
};

const coinSallSubmit = async () => {
  if (cardPosition.value == "2") {
    loading = ElLoading.service({
      lock: true,
      text: "Loading",
      background: "rgba(0, 0, 0, 0.7)",
    });

    try {
      if (!currentChain.value.name.includes("Tron")) {
        if (!accountData.address.value || !currentChain.value.id) {
          throw new Error("Missing wallet address or chain ID");
        }
        sellDatabalanceQuery.address = accountData.address.value;
        sellDatabalanceQuery.chainId = currentChain.value.id;
        sellDatabalanceQuery.token =
          coin_sellData.value?.commoncoin?.token_contract;
        const balance = await refetch();
        coin_sellData.value.balance = balance.data.formatted;
      }

      // let res;
      // if (
      //   wallet.value.chain == "tron" &&
      //   coinUSDTTableData.value[0].commoncoin
      // ) {
      //   res = await walletLinker.getTronTokenBalance(
      //     coinUSDTTableData.value[0].commoncoin.token_contract
      //   );
      // } else if (
      //   wallet.value.chain !== "tron" &&
      //   coinUSDTTableData.value[0].commoncoin
      // ) {
      //   res = await walletLinker.getTokenBalance(
      //     coinUSDTTableData.value[0].commoncoin.token_contract
      //   );
      // }
      // coin_sellData.value.balance = res.formatted;
    } catch (e) {
      loading.close();
    }
    loading.close();
  }
  dialogSallDataVisible.value = false;
};
const coinSallCancel = () => {
  dialogSallDataVisible.value = false;
  coin_sellData.value = null;
  coinSallTableRef.value.setCurrentRow(null);
};

let coinBuyTableRef = ref();
const coinBuySubmit = async () => {
  dialogcoinUSDTListVisible.value = false;
};
const coinBuyCancel = () => {
  dialogcoinUSDTListVisible.value = false;
  coin_buyData.value = null;
  coinBuyTableRef.value.setCurrentRow(null);
};
const getTotalUsdt = () => {
  usdtInput.value =
    cardPosition.value == "1"
      ? coin_sellData.value.usdtBalance
      : coin_sellData.value.balance;
};

const sallDataClick = () => {
  if (cardLoading.value) return;
  dialogSallDataVisible.value = true;
  coinUSDTTableData.value.forEach((item) => {
    const foundItem = tableData.value.find((items) => items.coin === item.coin);
    if (foundItem) {
      item.price = foundItem[queryParams.querySelectOne + "UsdtPrice"];
    } else {
      item.price = 0;
    }
  });
  console.log(coinUSDTTableData.value, "coinUSDTTableData");
};

const coinBuyClick = () => {
  if (!addressValue.value) {
    ElMessage.error(t("movieBricks.index.684804-0"));
    return;
  }
  dialogcoinUSDTListVisible.value = true;
};

const usdtHanleInput = (value) => {
  usdtInput.value = value.replace(/[^0-9.]/g, "");
};

const usdtHanleFocus = (value) => {
  usdtInputShow.value = true;
};
const usdtHanleBlur = (value) => {
  usdtInputShow.value = false;
  const num = parseFloat(usdtInput.value);
  if (!isNaN(num)) {
    usdtInput.value = num.toFixed(2);
  } else {
    usdtInput.value = "0";
  }
};
const usdtTxtClick = () => {
  if (cardPosition.value == 1 && !Number(coin_sellData.value.usdtBalance))
    return;
  if (cardPosition.value == 2 && !Number(coin_sellData.value.balance)) return;

  usdtInputShow.value = true;
  nextTick(() => {
    usdtInputRef.value.focus();
  });
};

const getCoinListApi = async () => {
  try {
    const res = await getCoinList({
      Blockchain: currentChain.value.id,
      type: cardPosition.value,
    });
    coinUSDTTableData.value = res.data;
    coinList.value = res.data.map((item) => ({
      label: item.coin + "/KRW",
      value: item.coin,
    }));
  } catch (err) {
    console.log(err);
  }
};
const getCallCoinListApi = async () => {
  try {
    const res = await getCoinList({
      Blockchain:
        userAddressTableData.value.length &&
        userAddressTableData.value.find(
          (item) => item.address == addressValue.value
        ).chain_id,
      type: 2,
    });
    callcoinUSDTTableData.value = res.data;
  } catch (err) {
    console.log(err);
  }
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

<style lang="less" scoped>
.bfbf {
  color: var(--operator-bg);
}
.container {
  background-color: var(--main-color);
  height: 100%;
  padding-top: 128rpx;
  padding-bottom: 150rpx;

  .page-content {
    max-width: 2200rpx;
    margin: 60rpx auto 100rpx;
    position: relative;
    @media (max-width: 900px) {
      padding: 0 20rpx;
    }

    .statisticDiv {
      background: #091320;
      margin-bottom: 33px;

      .topSelect {
        padding: 26px 31px;
        display: flex;
        justify-content: space-between;

        .left {
          > view:first-child {
            display: flex;
            column-gap: 81px;

            .items {
              display: flex;
              flex-direction: column;
              gap: 5px;

              text {
                &:first-child {
                  font-weight: 400;
                  font-size: 11px;
                  color: #9f9fa3;
                }

                &:last-child {
                  font-weight: 400;
                  font-size: 15px;
                  color: white;
                }
              }
            }
          }
        }

        .right {
          view {
            &:first-child {
              font-size: 20px;
              color: #ffd00c;
              cursor: pointer;
            }
          }
        }
      }
    }

    .tableDiv {
      margin-top: 40rpx;
      background: #091320;
      background-color: var(--content-color);
      border-radius: 50rpx;

      .query {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        column-gap: var(--txtFs);
        row-gap: 30rpx;
        font-weight: 400;
        font-size: 16px;
        padding: 25px 20px;

        ::v-deep .el-input {
          width: 137px;
          height: 36px;

          .el-input__wrapper {
            background: #07314c;
            border: 1px solid #214b67;
            box-shadow: none;
          }
        }

        .el-select {
          width: 137px;
          height: 36px;

          ::v-deep .el-select__wrapper {
            border-radius: var(--bRadius) !important;
            background: #07314c;
            border: 1px solid #214b67;
            box-shadow: none;
            height: 36px;
          }
        }
      }

      .tableData {
        .gray {
          font-weight: 400;
          font-size: 14px;
          color: #7a868e;
        }

        .btnDiv {
          display: flex;
        }

        .el-table {
          .buyPledge {
            background: #30607c;
            color: #3eebeb;
            border: 1px solid #30607c;
            border-radius: 4px;
          }

          .orderList {
            background: #0e2e40;
            color: #3eebeb;
            border: 1px solid #30607c;
            border-radius: 4px;
          }
        }
      }
    }
  }

  // .transactionDialog {
  //   .t_content {
  //     // background: linear-gradient( 180deg, #051622 0%, #0A1C2A 100%);
  //   }
  // }

  ::v-deep .transactionDialog {
    // width: 28%;
    .topTab {
      .topTabMx();
    }

    .card {
      .cardMx();
    }

    .query {
      .queryMx();

      .countContent {
        .countContentMx();
      }

      .priceMsg {
        // margin-top: 22px;
        width: 100%;
        // height: 273px;
        background: var(--content-color);
        border-radius: var(--bRadius);
        display: flex;
        flex-direction: column;
        gap: 23.5px;
        padding: 26px 18px;
        box-sizing: border-box;

        .items {
          display: flex;
          justify-content: space-between;
          width: 100%;

          .label {
            font-weight: 500;
            font-size: var(--txtFs);
            color: #ffffff;
          }

          .value {
            font-weight: 500;
            font-size: var(--txtFs);
            color: #ffffff;
          }
        }
      }

      .tips {
        color: white;
        font-weight: 500;
        font-size: var(--txtFs);
        display: flex;
        flex-direction: column;
        gap: 7px;
      }
    }
  }
}

::v-deep .el-pagination {
  float: right;
  margin: 20px 0;
}

.topTabMx() {
  border-radius: 13px;

  .el-radio-button .el-radio-button__inner {
    width: 95px;
    height: 37.5px;
    padding: 0;
    line-height: 37.5px;
    font-size: 14px;
    color: white;
    background: #040c16;
    border: 1px solid #00bfbf;
  }

  .el-radio-button.is-active .el-radio-button__inner {
    color: white;
    background: #00bfbf;
  }
}

.cardMx() {
  width: 100%;

  .cardTab {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20rpx;
    .cardbtn {
      border-radius: 6.5px;
      flex-wrap: nowrap;
      .el-radio-button .el-radio-button__inner {
        min-width: 95px;
        height: 37.5px;
        padding: 0 10px;
        line-height: 37.5px;
        font-size: 14px;
        color: white;
        background: var(--content-bg);
        border: 1px solid var(--content-bg);
        box-shadow: none;
        border-radius: var(--bRadius);
      }

      .el-radio-button.is-active .el-radio-button__inner {
        color: white;
        background: #1e878c;
      }

      .el-radio-button {
        margin-right: 11px;
      }
    }
  }

  .cardContent {
    .items {
      background-color: var(--content-color);

      border-radius: var(--bRadius);
      // border: 1px solid #07314c;
      border: 1px solid rgb(4, 96, 110);
      padding: 16px 14px;
      margin-bottom: 19px;

      .itemsTop {
        color: white;
        font-size: var(--txtFs);
        display: flex;
        justify-content: space-between;
        height: 25px;
        line-height: 25px;

        > text {
          color: white;
        }

        .el-button {
          font-size: var(--txtFs);
        }

        view image {
          height: 18px;
          vertical-align: middle;
        }

        view text {
          margin: 0 8px;
        }
      }

      .itemsBottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 23.5px;

        .itemsBottom_img {
          width: 235rpx;
          height: 80rpx;
          box-sizing: border-box;
          background: rgb(4, 73, 83);
          border-radius: var(--bRadius);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 10rpx 10rpx 10rpx 15rpx;

          .iconitem {
            margin-left: 10rpx;
          }

          image {
            border-radius: 47rpx;
            width: 50rpx;
            height: 50rpx;
            margin-right: 30rpx;
          }

          view {
            // max-width: 50rpx;
            font-size: var(--txtFs);
            color: white;

            view:first-child {
              min-width: 70rpx;
              // font-size: var(--txtFs);
              font-weight: 400;
            }

            // view:last-child {
            //   font-size: 20rpx;
            //   font-weight: 400;
            // }
          }
        }

        .txt {
          font-weight: 400;
          font-size: 24.5px;
          color: #ffffff;

          ::v-deep .el-input {
            width: 100px;
            height: 50px;
            font-size: 24.5px;

            .el-input__wrapper {
              .el-input__inner {
                height: 50px;
              }
            }
          }
        }
      }
    }
  }

  .priceManage {
    min-width: 95px;
    height: 37px;
    background: var(--content-bg);
    border-radius: var(--bRadius);
    border: 1px solid #04606e;
    font-weight: 500;
    font-size: var(--txtFs);
    color: #ffffff;
  }
}

.queryMx() {
  width: 100%;

  .el-select .el-select__wrapper {
    width: 100%;
    height: 49px;
    background: var(--content-color) !important;
    border-radius: var(--bRadius);
    color: white;
  }

  .el-select .el-select__placeholder {
    color: white;
  }

  .el-select {
    margin-bottom: 20px;
  }

  .queryBtn {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .el-button {
      width: 120px;
      height: 35px;
      border-radius: 24.5px;
      font-size: var(--txtFs);

      &:first-child {
        background: #00bfbf;
        color: white;
        border: 1px solid #00bfbf;
      }

      &:last-child {
        background: #00bfbf;
        color: white;
        border: 1px solid #00bfbf;
      }
    }
  }
}

.countContentMx() {
  margin-top: 44rpx;
  width: 100%;
  background: var(--content-color);
  border-radius: var(--bRadius);
  display: flex;
  flex-direction: column;
  gap: 27rpx;
  padding: 45rpx 36rpx;
  box-sizing: border-box;

  .items {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .label {
      font-weight: 500;
      font-size: var(--txtFs);
      color: white;
    }

    .value {
      font-weight: 500;
      font-size: var(--txtFs);
      color: #ffffff;
    }
  }
}
</style>
