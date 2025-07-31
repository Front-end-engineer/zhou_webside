<template>
  <view class="tabs">
    <view class="tab-top">
      <view class="tab-top-left">
        <image
          v-show="coin"
          style="width: 60rpx; height: 60rpx; border-radius: 30rpx"
          :src="coinList.find((item) => item.value == coin).coin_img"
        ></image>
        <el-select
          v-model="coin"
          placeholder=""
          class="coin-select"
          @change="changeCoin"
        >
          <el-option
            v-for="item in coinList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <view class="tab-info">
          <view>
            {{ $t("Kline.Kline.100465-0") }}
            <view :class="true ? 'green-text' : 'red-text'">{{
              newClosePrice
            }}</view>
          </view>
          <view>
            {{ $t("Kline.Kline.100465-1") }}
            <view :class="false ? 'green-text' : 'red-text'">
              {{ (dataOf24h?.change_rate * 100)?.toFixed(2) }}
              %</view
            >
          </view>
          <view>
            {{ $t("Kline.Kline.100465-2") }}
            <view class="white-text">{{ dataOf24h.high_price }}</view>
          </view>
          <view>
            {{ $t("Kline.Kline.100465-3") }}
            <view class="white-text">{{ dataOf24h.low_price }}</view>
          </view>
          <view>
            {{ $t("Kline.Kline.100465-4") }}
            <view class="white-text"
              >{{ dataOf24h?.candle_acc_trade_volume?.toFixed(2) }}
              {{ coin }}</view
            >
          </view>
        </view>
      </view>
      <!-- <el-rate v-model="isCollect" clearable :max="1" /> -->
    </view>
    <view class="tabs-btn-box">
      <!-- 时间 -->
      <view class="tabs-left">
        <text>{{ $t("Kline.Kline.100465-5") }}</text>
        <view
          @click="switchTab(item)"
          class="tabs-item"
          :class="current === item.value && 'tabs-item-active'"
          v-for="(item, index) in tabsList"
          :key="index"
        >
          <text class="tabs-item-text">{{ item.label }}</text>
        </view>
        <view class="btn-line"></view>
        <view class="tabs-btn-set" @click="openDialog('timezones')">{{
          $t("Kline.Kline.451692-0")
        }}</view>
        <view class="tabs-btn-set" @click="openDialog('setting')">{{
          $t("Kline.Kline.451692-1")
        }}</view>
        <!-- <view class="tabs-btn-set" @click="openDialog('screenshot')">截屏</view> -->
        <view class="tabs-btn-set" @click="fullScreen">{{
          fullscreenFlag
            ? $t("Kline.Kline.451692-2")
            : $t("Kline.Kline.451692-3")
        }}</view>
      </view>

      <!-- 指标 -->
      <view class="tabs-right">
        <text>{{ $t("Kline.Kline.100465-6") }}</text>
        <view class="tabs-btn" @click="openTabsPopup(1)"
          >{{ $t("Kline.Kline.100465-7") }}<view class="triangle"></view
        ></view>
        <view class="tabs-btn" @click="openTabsPopup(2)"
          >{{ $t("Kline.Kline.100465-8") }}<view class="triangle"></view
        ></view>
        <view v-if="popupVisible" class="tabs-popup" ref="target">
          <template v-if="popupType === 1">
            <view
              v-for="item in mainImage"
              :class="{ 'popup-active': currentMainImage === item }"
              @click="switchMainImage(item)"
              >{{ item }}
            </view>
          </template>
          <template v-if="popupType === 2">
            <view
              v-for="item in supplementaryImage"
              :class="{ 'popup-active': currentSupplementaryImage === item }"
              @click="switchSupplementaryImage(item)"
              >{{ item }}
            </view>
          </template>
        </view>
      </view>
    </view>
  </view>
  <view class="charts-box">
    <match-media :min-width="900">
      <view class="charts-left-btn">
        <view class="left-btn" @click="setOverlayType('priceLine')">{{
          $t("Kline.Kline.451692-4")
        }}</view>
        <view class="left-btn" @click="setOverlayType('horizontalRayLine')">{{
          $t("Kline.Kline.451692-5")
        }}</view>
        <view class="left-btn" @click="setOverlayType('horizontalSegment')">{{
          $t("Kline.Kline.451692-6")
        }}</view>
        <view class="left-btn" @click="setOverlayType('triangle')">{{
          $t("Kline.Kline.451692-7")
        }}</view>
        <view class="left-btn" @click="setOverlayType('rectangle')">{{
          $t("Kline.Kline.451692-8")
        }}</view>
        <view class="left-btn" @click="setOverlayType('circle')">{{
          $t("Kline.Kline.451692-9")
        }}</view>
        <view class="left-btn" @click="hiddenAllOverlay">{{
          overlayVisible
            ? $t("Kline.Kline.451692-10")
            : $t("Kline.Kline.451692-11")
        }}</view>
        <view class="left-btn" @click="removeAllOverlay">{{
          $t("Kline.Kline.451692-12")
        }}</view>
      </view>
    </match-media>
    <canvas
      id="chart_container"
      class="charts"
      canvas-id="chart_container"
      ref="canvasRef"
    ></canvas>
    <EDialog
      v-model="dialogVisible"
      :title="
        dialogType === 'timezones'
          ? $t('Kline.Kline.451692-0')
          : $t('Kline.Kline.451692-1')
      "
      @confirmEvent="confirmEvent"
    >
      <template v-if="dialogType === 'timezones'">
        <view style="display: flex; justify-content: center">
          <el-select v-model="timezones" style="width: 50%">
            <el-option
              v-for="item in timezonesList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </view>
      </template>
      <template v-else-if="dialogType === 'setting'">
        <view>
          <el-form inline label-position="left" label-width="120px">
            <el-form-item :label="$t('Kline.Kline.451692-13')">
              <el-select v-model="candleType" @change="changeCandleType">
                <el-option
                  v-for="item in candleList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('Kline.Kline.451692-14')">
              <el-select v-model="priceType" @change="changePriceType">
                <el-option
                  v-for="item in priceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('Kline.Kline.451692-15')">
              <el-switch
                v-model="isShowLastPrice"
                @change="(val) => switchChange(val, 'last')"
              />
            </el-form-item>
            <el-form-item :label="$t('Kline.Kline.451692-16')">
              <el-switch
                v-model="isShowHighPrice"
                @change="(val) => switchChange(val, 'high')"
              />
            </el-form-item>
            <el-form-item :label="$t('Kline.Kline.451692-17')">
              <el-switch
                v-model="isShowLowPrice"
                @change="(val) => switchChange(val, 'low')"
              />
            </el-form-item>
            <el-form-item :label="$t('Kline.Kline.451692-18')">
              <el-switch
                v-model="isShowIndicatorPrice"
                @change="(val) => switchChange(val, 'indicator')"
              />
            </el-form-item>
          </el-form>
        </view>
      </template>
      <template v-else-if="dialogType === 'screenshot'">
        <image :src="canvasImagePath" mode="scaleToFill" />
      </template>
    </EDialog>
  </view>
</template>

<script setup>
import { getCoinUSDTList, getCoinList } from "@/api/index";
import { init, registerOverlay } from "klinecharts";
import { useI18n } from "vue-i18n";
import axios from "axios";
import { onClickOutside } from "@vueuse/core";

const { t } = useI18n();

const coinList = ref([]);

const current = ref("minutes/15");
const currentMinute = ref(15);
const tabsList = [
  { label: t("Kline.Kline.100465-9"), value: "minutes/1", minute: 1 },
  { label: t("Kline.Kline.100465-10"), value: "minutes/15", minute: 15 },
  { label: t("Kline.Kline.100465-11"), value: "minutes/30", minute: 30 },
  { label: t("Kline.Kline.100465-12"), value: "minutes/60", minute: 60 },
  { label: t("Kline.Kline.100465-13"), value: "days", minute: 1440 },
];
const popupVisible = ref(false);
const popupType = ref(); // 1-更多，2-指标

const mainImage = ["MA", "BOLL"];
const supplementaryImage = ["MACD", "KDJ", "RSI"];
const currentMainImage = ref("MA");
const currentSupplementaryImage = ref("");
const props = defineProps({
  origin: {
    type: String,
    default: "swap",
  },
});

const klineData = ref([]);
let charts;
let technicalIndicatorID;

const isCollect = ref(0);

const coin = ref();
const dataOf24h = ref({});

const overlayVisible = ref(true);
const dialogVisible = ref(false);
const dialogType = ref("");
const timezonesList = [
  { value: "Asia/Shanghai", label: t("Kline.Kline.451692-19") },
  { value: "Europe/Berlin", label: t("Kline.Kline.451692-20") },
  { value: "America/Chicago", label: t("Kline.Kline.451692-21") },
  { value: "Asia/Pyongyang", label: t("Kline.Kline.451692-22") },
];
const timezones = ref("Asia/Shanghai");
const candleList = [
  { value: "candle_solid", label: t("Kline.Kline.451692-23") },
  { value: "candle_stroke", label: t("Kline.Kline.451692-24") },
  { value: "candle_up_stroke", label: t("Kline.Kline.451692-25") },
  { value: "candle_down_stroke", label: t("Kline.Kline.451692-26") },
  { value: "ohlc", label: "OHLC" },
  { value: "area", label: t("Kline.Kline.451692-27") },
];
const candleType = ref("candle_solid");
const priceList = [
  { value: "normal", label: t("Kline.Kline.451692-28") },
  { value: "percentage", label: t("Kline.Kline.451692-29") },
  { value: "log", label: t("Kline.Kline.451692-30") },
];
const priceType = ref("normal");
const isShowLastPrice = ref(true);
const isShowHighPrice = ref(true);
const isShowLowPrice = ref(true);
const isShowIndicatorPrice = ref(true);
const canvasRef = ref();
const canvasImagePath = ref("");

const newClosePrice = computed(() => {
  const len = klineData.value.length;
  return len ? klineData.value[len - 1]?.close : 0;
});

onMounted(async () => {
  registerCustomCircleOverlay();
  registerCustomTriangleOverlay();
  registerCustomRectangleOverlay();
  await getCoinListApi();
  await getKlineData();
  getDataOfDay();
  connectSocket();
});

onUnmounted(() => {
  disconnect();
});

let ws;
// 连接websocket
const connectSocket = async () => {
  try {
    // websocket
    ws = new WebSocket("wss://api.upbit.com/websocket/v1");
    ws.binaryType = "blob";

    ws.onopen = () => {
      console.log(t("Kline.Kline.451692-31"));
      ws.send(
        JSON.stringify([
          { ticket: "test" },
          {
            type: "ticker",
            codes: [`KRW-${coin.value}`],
            // is_only_realtime: true,
          },
          {
            format: "DEFAULT",
          },
        ])
      );
    };

    ws.onmessage = async (event) => {
      const blob = event.data;
      const lastKline = klineData.value.at(-1); // 最后一条K线数据

      blob.text().then((text) => {
        try {
          // 尝试解析为 JSON
          const data = JSON.parse(text);

          if (lastKline) {
            const timeDiff =
              (data.timestamp - lastKline.timestamp) / (1000 * 60);
            if (timeDiff < currentMinute.value) {
              // 未超过时间周期，更新最后一条K线的价格（最高/最低/收盘）
              // lastKline.high = Math.max(lastKline.high, data.high_price);
              // lastKline.low = Math.min(lastKline.low, data.low_price);
              // lastKline.close = data.trade_price;
              // charts.updateData(lastKline);
            } else {
              klineData.value.push({
                open: data.opening_price,
                high: data.high_price,
                low: data.low_price,
                close: data.trade_price,
                timestamp: data.timestamp,
                turnover: 0,
                volume: 0,
              });
              charts.applyNewData(klineData.value);
            }
          }
        } catch (error) {
          // 普通文本
          console.log(t("Kline.Kline.451692-32"), text);
        }
      });
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket Closed");
    };
  } catch (e) {
    uni.showToast({
      title: "Socket Failed",
      icon: "none",
    });
  }
};

const disconnect = () => {
  ws.close();
};

const target = ref();
// 在组件范围之外的点击事件
onClickOutside(target, () => {
  // 在组件范围之外点击，关闭显示下拉框
  popupVisible.value = false;
});

const getCoinListApi = async () => {
  try {
    const res = await (props.origin === "swap"
      ? getCoinUSDTList()
      : getCoinList());

    if (props.origin === "swap") {
      coinList.value = res.data.map((item) => ({
        label: item.coin + "/KRW",
        value: item.coin,
        coin_img: item.coin_img,
      }));
    } else {
      coinList.value = res.data.map((item) => ({
        label: item.coin + "/KRW",
        value: item.coin,
        coin_img: item.coin_img,
      }));
    }
    console.log(coinList.value, "coinList.value");
    if (coinList.value.length) {
      coin.value = coinList.value[0].value;
      console.log(
        "=============",
        coinList.value,
        coin.value,
        coinList.value.find((item) => item.value == coin.value).coin_img
      );
    }
  } catch (err) {
    console.log(err);
  }
};

// 注册自定义圆覆盖物
const registerCustomCircleOverlay = () => {
  registerOverlay({
    name: "circle",
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    totalStep: 3,
    createPointFigures: function ({ coordinates }) {
      if (coordinates.length === 2) {
        const xDis = Math.abs(coordinates[0].x - coordinates[1].x);
        const yDis = Math.abs(coordinates[0].y - coordinates[1].y);
        const radius = Math.sqrt(xDis * xDis + yDis * yDis);
        return {
          key: "circle",
          type: "circle",
          attrs: {
            ...coordinates[0],
            r: radius,
          },
          styles: {
            style: "stroke_fill",
          },
        };
      }
      return [];
    },
  });
};

// 注册自定义三角形覆盖物
const registerCustomTriangleOverlay = () => {
  registerOverlay({
    name: "triangle",
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    totalStep: 4, // 需要3个点来定义三角形，加上1个步骤来完成
    createPointFigures: function ({ coordinates }) {
      // 处理不同阶段的坐标点
      if (coordinates.length === 1) {
        // 只有1个点时，不绘制任何图形（或只绘制一个点作为预览）
        return [];
      } else if (coordinates.length === 2) {
        // 当有2个点时，返回一条线段作为预览
        return {
          key: "line",
          type: "line",
          attrs: [
            {
              coordinates,
            },
          ],
          styles: {
            style: "stroke",
          },
        };
      } else if (coordinates.length >= 3) {
        // 当有3个或更多点时，返回完整的三角形（只使用前3个点）
        return {
          key: "triangle",
          type: "polygon",
          attrs: [
            {
              coordinates,
            },
          ],
          styles: {
            style: "stroke_fill",
            color: "rgba(22, 119, 255, 0.3)", // 填充颜色（半透明蓝色）
          },
        };
      }
      return [];
    },
  });
};

// 注册自定义矩形覆盖物
const registerCustomRectangleOverlay = () => {
  registerOverlay({
    name: "rectangle",
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    totalStep: 3, // 需要2个点来定义矩形的对角
    createPointFigures: function ({ coordinates }) {
      if (coordinates.length === 2) {
        const [p1, p2] = coordinates;
        const x = Math.min(p1.x, p2.x);
        const y = Math.min(p1.y, p2.y);
        const width = Math.abs(p2.x - p1.x);
        const height = Math.abs(p2.y - p1.y);

        return {
          key: "rectangle",
          type: "rect",
          attrs: {
            x,
            y,
            width,
            height,
          },
          styles: {
            style: "stroke_fill",
          },
        };
      }
      return [];
    },
  });
};

const setOverlayType = (name) => {
  charts.createOverlay(name);
};

const hiddenAllOverlay = () => {
  overlayVisible.value = !overlayVisible.value;
  charts.overrideOverlay({
    visible: overlayVisible.value,
  });
};

const removeAllOverlay = () => {
  charts.removeOverlay();
};

const fullscreenFlag = ref(isFullscreen());

const fullScreen = () => {
  let element = document.documentElement;

  if (isFullscreen()) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    fullscreenFlag.value = false;
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    fullscreenFlag.value = true;
  }
};

// 检查当前是否处于全屏状态
function isFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

const openDialog = (type) => {
  if (type === "screenshot") {
    uni.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      fileType: "png",
      quality: 1,
      canvasId: "chart_container",
      success: (res) => {
        console.log("tempFilePath", res.tempFilePath);
        canvasImagePath.value = res.tempFilePath;
      },
      fail(e) {
        console.log(e, "error");
      },
    });
  }
  dialogVisible.value = true;
  dialogType.value = type;
};

const confirmEvent = () => {
  if (dialogType.value === "timezones") {
    charts.setTimezone(timezones.value);
  }
};

const changeCandleType = (type) => {
  charts.setStyles({
    candle: {
      type,
    },
  });
};

const changePriceType = (type) => {
  charts.setStyles({
    yAxis: { type },
  });
};

const switchChange = (val, type) => {
  if (type === "indicator") {
    charts.setStyles({
      indicator: {
        lastValueMark: {
          show: val,
        },
      },
    });
  } else {
    charts.setStyles({
      candle: {
        priceMark: {
          [type]: {
            show: val,
          },
        },
      },
    });
  }
};

const changeCoin = async (val) => {
  getDataOfDay();
  await getKlineData(true);
  console.log(ws, "ws");
  ws.send(
    JSON.stringify([
      { ticket: "test" },
      {
        type: "ticker",
        codes: [`KRW-${coin.value}`],
        is_only_realtime: true,
      },
      {
        format: "DEFAULT",
      },
    ])
  );
};

// 切换tab
const switchTab = (item) => {
  if (current.value == item.value) return;
  current.value = item.value;
  currentMinute.value = item.minute;

  getKlineData(true);
};

const openTabsPopup = (type) => {
  popupVisible.value = true;
  popupType.value = type;
};

const switchMainImage = (val) => {
  if (currentMainImage.value === val) return;

  // 清除之前的指标图
  charts.removeIndicator("candle_pane", currentMainImage.value);

  currentMainImage.value = val;

  charts.createIndicator(val, false, {
    id: "candle_pane",
  });
};

const switchSupplementaryImage = (val) => {
  // 清除之前的指标图
  charts.removeIndicator(technicalIndicatorID, currentSupplementaryImage.value);

  if (currentSupplementaryImage.value === val) {
    currentSupplementaryImage.value = "";
    return;
  }

  currentSupplementaryImage.value = val;

  technicalIndicatorID = charts.createIndicator(
    currentSupplementaryImage.value
  );
};

// 获取from到to之间的时间间隔
const handleParams = (val) => {
  let daysCount = 0;
  // 总共需要1440组数据
  const requiredPeriodsCount = 1440;
  if (val.includes("D")) {
    daysCount = requiredPeriodsCount;
  } else if (val.includes("M")) {
    daysCount = 31 * requiredPeriodsCount;
  } else if (val.includes("W")) {
    daysCount = 7 * requiredPeriodsCount;
  } else if (val.includes("H")) {
    daysCount = (requiredPeriodsCount * val) / 24;
  } else {
    daysCount = (requiredPeriodsCount * val) / (24 * 60);
  }
  // 最后返回秒数
  return daysCount * 24 * 60 * 60;
};

const getDataOfDay = async () => {
  const res = await axios.get(
    `https://api.upbit.com/v1/candles/days?market=KRW-${coin.value}&count=1`
  );
  dataOf24h.value = res.data[0];
};

const getKlineData = async (isRefresh = false) => {
  // const nowTimeStamp = parseInt(new Date().valueOf() / 1000);
  // const params = {
  //   symbol: props.symbol,
  //   from: (nowTimeStamp - handleParams(val)) * 1000,
  //   to: nowTimeStamp * 1000,
  //   resolution: val,
  // };
  try {
    const res = await axios.get(
      `https://api.upbit.com/v1/candles/${current.value}?market=KRW-${coin.value}&count=200`
    );
    klineData.value = res.data.reverse().map((item) => ({
      open: item.opening_price,
      high: item.high_price,
      low: item.low_price,
      close: item.trade_price,
      timestamp: item.timestamp,
      turnover: 0,
      volume: 0,
    }));
    if (isRefresh) {
      charts.applyNewData(klineData.value);
    } else {
      drawKlinecharts();
    }
  } catch (e) {
    console.log(e);
  }
};

const drawKlinecharts = () => {
  const option = {
    // 网格线
    grid: {
      show: true,
      horizontal: {
        show: true,
        size: 1,
        color: "#1C1D20",
        style: "dashed",
        dashedValue: [2, 2],
      },
      vertical: {
        show: true,
        size: 1,
        color: "#1C1D20",
        style: "dashed",
        dashedValue: [2, 2],
      },
    },
    // 蜡烛图
    candle: {
      // 蜡烛图上下间距，大于1为绝对值，大于0小余1则为比例
      margin: {
        top: 0.2,
        bottom: 0.1,
      },
      // 蜡烛图类型 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
      type: "candle_solid",
      // 蜡烛柱
      bar: {
        upColor: "#00B275",
        downColor: "#ff4343",
        noChangeColor: "#888888",
      },
      // 面积图
      area: {
        lineSize: 2,
        lineColor: "#2196F3",
        value: "close",
        fillColor: [
          {
            offset: 0,
            color: "rgba(33, 150, 243, 0.01)",
          },
          {
            offset: 1,
            color: "rgba(33, 150, 243, 0.2)",
          },
        ],
      },
      priceMark: {
        show: true,
        upColor: "#00B275",
        downColor: "#ff4343",
        noChangeColor: "#888888",
        // 最高价标记
        high: {
          show: true,
          color: "#fff",
          textSize: 10,
          textFamily: "Helvetica Neue",
          textWeight: "normal",
        },
        // 最低价标记
        low: {
          show: true,
          color: "#fff",
          textSize: 10,
          textFamily: "Helvetica Neue",
          textWeight: "normal",
        },
        // 最新价标记
        last: {
          show: true,
          line: {
            show: true,
            // 'solid'|'dashed'
            style: "dashed",
            dashedValue: [2, 3],
            size: 1,
          },
          text: {
            show: true,
            size: 10,
            paddingLeft: 2,
            paddingTop: 2,
            paddingRight: 2,
            paddingBottom: 2,
            color: "#fff",
            family: "Helvetica Neue",
            weight: "normal",
          },
        },
      },
      // 提示
      tooltip: {
        showRule: "follow_cross",
        // 'standard' | 'rect'
        showType: "standard",
        labels: [
          t("Kline.Kline.100465-5") + "：",
          t("Kline.Kline.100465-16") + "：",
          t("Kline.Kline.100465-17") + "：",
          t("Kline.Kline.100465-18") + "：",
          t("Kline.Kline.100465-19") + "：  ",
        ],
        values: null,
        defaultValue: "n/a",
        rect: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 2,
          offsetLeft: 8,
          offsetTop: 8,
          offsetRight: 8,
          borderRadius: 4,
          borderSize: 1,
          borderColor: "#3f4254",
          fillColor: "rgba(17, 17, 17, .3)",
          backgroundColor: "#505050",
        },
        text: {
          size: 11,
          family: "Helvetica Neue",
          weight: "normal",
          color: "#C4C4C4",
          marginLeft: 4,
          marginTop: 5,
          marginRight: 4,
          marginBottom: 1,
        },
      },
    },
    // 技术指标
    indicator: {
      margin: {
        top: 0,
        bottom: 0.1,
      },
      bars: {
        upColor: "#26A69A",
        downColor: "#EF5350",
        noChangeColor: "#888888",
      },
      lines: {
        size: 1,
        colors: ["#FF9600", "#9D65C9", "#2196F3", "#E11D74", "#01C5C4"],
      },
      circles: {
        upColor: "#26A69A",
        downColor: "#EF5350",
        noChangeColor: "#888888",
      },
      // 最新值标记
      lastValueMark: {
        show: true,
        text: {
          show: false,
          color: "#000",
          size: 12,
          family: "Helvetica Neue",
          weight: "normal",
          paddingLeft: 3,
          paddingTop: 2,
          paddingRight: 3,
          paddingBottom: 2,
        },
      },
      // 技术指标的提示
      tooltip: {
        // 'always' | 'follow_cross' | 'none'
        showRule: "always",
        // 'standard' | 'rect'
        showType: "standard",
        showName: true,
        showParams: true,
        defaultValue: "n/a",
        text: {
          size: 11,
          family: "Helvetica Neue",
          weight: "normal",
          color: "#D9D9D9",
          marginTop: 6,
          marginRight: 8,
          marginBottom: 0,
          marginLeft: 8,
        },
      },
    },
    // 启用缩放和拖动
    zoom: {
      enable: true, // 启用缩放
      mode: "x", // 设置缩放模式为 x 轴
    },
    // x轴
    xAxis: {
      show: true,
      width: 100,
      size: 16,
      // x轴线
      axisLine: {
        show: true,
        color: "#2B2D33",
        size: 1,
      },
      // x轴分割文字
      tickText: {
        show: true,
        color: "#C4C4C4",
        family: "Helvetica Neue",
        weight: "normal",
        size: 10,
        marginStart: 3,
        marginEnd: 6,
      },
      // 刻度
      tickLine: {
        show: false,
        size: 1,
        length: 3,
        color: "#666",
      },
    },
    // y轴
    yAxis: {
      show: true,
      width: 50,
      // 'left' | 'right'
      position: "right",
      // 'normal' | 'percentage'
      type: "normal",
      inside: false,
      // 轴线
      axisLine: {
        show: true,
        color: "#2B2D33",
        size: 1,
      },
      // 文字
      tickText: {
        show: true,
        color: "#C4C4C4",
        family: "Helvetica Neue",
        weight: "normal",
        size: 10,
        paddingLeft: 0,
        paddingRight: 0,
      },
      // 刻度线
      tickLine: {
        show: false,
        size: 1,
        length: 3,
        color: "#eee",
      },
    },
    // 图表之间的分割线
    separator: {
      size: 1,
      color: "#eee",
      fill: true,
      activeBackgroundColor: "rgba(230, 230, 230, .15)",
    },
    // 十字光标
    crosshair: {
      show: true,
      // 十字光标水平线及文字
      horizontal: {
        show: true,
        line: {
          show: true,
          // 'solid'|'dashed'
          style: "solid",
          dashedValue: [4, 2],
          size: 1,
          color: "#3E4551",
        },
        text: {
          show: true,
          color: "#D9D9D9",
          size: 10,
          family: "Helvetica Neue",
          weight: "normal",
          borderSize: 1,
          borderColor: "#505050",
          backgroundColor: "#505050",
        },
      },
      // 十字光标垂直线及文字
      vertical: {
        show: true,
        line: {
          show: true,
          // 'solid'|'dashed'
          style: "solid",
          dashedValue: [4, 2],
          size: 1,
          color: "#3E4551",
        },
        text: {
          show: true,
          color: "#D9D9D9",
          size: 10,
          family: "Helvetica Neue",
          weight: "normal",
          borderSize: 1,
          borderColor: "#505050",
          backgroundColor: "#505050",
        },
      },
    },
    // 图形标记
    graphicMark: {
      line: {
        color: "#2196F3",
        size: 1,
      },
      point: {
        backgroundColor: "#2196F3",
        borderColor: "#2196F3",
        borderSize: 1,
        radius: 4,
        activeBackgroundColor: "#2196F3",
        activeBorderColor: "#2196F3",
        activeBorderSize: 1,
        activeRadius: 6,
      },
      polygon: {
        stroke: {
          size: 1,
          color: "#2196F3",
        },
        fill: {
          color: "rgba(33, 150, 243, 0.1)",
        },
      },
      arc: {
        stroke: {
          size: 1,
          color: "#2196F3",
        },
        fill: {
          color: "rgba(33, 150, 243, 0.1)",
        },
      },
      text: {
        color: "#2196F3",
        size: 12,
        family: "Helvetica Neue",
        weight: "normal",
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        marginBottom: 6,
      },
    },
  };

  // 初始化图表
  charts = init("chart_container");
  // 创建一个主图技术指标
  charts.createIndicator("MA", false, { id: "candle_pane" });

  charts.setStyles(option);

  ///报价精度（报价精度，成交量精度）
  charts.setPriceVolumePrecision(4, 4);

  ///设置k线的宽度
  // charts.setDataSpace(7);

  // 设置图表右边可以空出来的间隙
  charts.setOffsetRightDistance(10);
  // 设置左边最小可见的蜡烛数量
  charts.setLeftMinVisibleBarCount(1);
  // 设置右边最小可见的蜡烛数量
  charts.setRightMinVisibleBarCount(1);

  charts.applyNewData(klineData.value);
};

defineExpose({
  connectSocket,
});
</script>

<style lang="scss" scoped>
.tabs {
  position: relative;
  padding: 40rpx 30rpx 20rpx;
  background-color: #044953;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
  color: #999;
  font-size: var(--txtFs);
  .tabs-left {
    display: flex;
    align-items: center;
    gap: 60rpx;
    .btn-line {
      width: 2rpx;
      height: 36rpx;
      background-color: #03373f;
    }
    .tabs-btn-set {
      cursor: pointer;
    }

    .tabs-item {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 10rpx 16rpx;
      color: #999;
      &:hover {
        background-color: #0a3f42;
        border-radius: 14rpx;
      }
      .tabs-item-text {
      }
      .tabs-item-bar {
        width: 0;
        height: 4rpx;
        background-color: transparent;
        transition: all 0.2s;
      }
      .tabs-item-bar-active {
        width: 32rpx;
        background-color: #f0a70a;
      }
    }
    .tabs-item-active {
      color: #fff;
      background-color: #1e878c !important;
      border-radius: 14rpx;
    }
  }

  .tabs-center {
  }

  .tabs-right {
    display: flex;
    column-gap: 60rpx;
    margin-bottom: 6rpx;
    position: relative;
    .tabs-btn {
      position: relative;
      padding: 0 10rpx;
      cursor: pointer;
    }
    .triangle {
      position: absolute;
      right: -10rpx;
      top: 70%;
      width: 0;
      height: 0;
      border-left: 8rpx solid transparent;
      border-right: 8rpx solid transparent;
      border-top: 8rpx solid #999;
      transform: rotate(-45deg);
    }
  }
  .tabs-popup {
    position: absolute;
    top: 44rpx;
    right: -14rpx;
    z-index: 1009;
    width: 100%;
    box-sizing: border-box;
    background-color: #013840;
    text-align: center;
    font-size: var(--txtFs);
    border-radius: 8rpx;
    transition: top 0.5s ease;
    .popup-active {
      color: #f0a70a;
    }
    > view {
      padding: 10rpx 0;
      margin: 10rpx 0;
      cursor: pointer;
      &:hover {
        background-color: #044953;
      }
    }
  }
}

.charts-box {
  position: relative;
  background-color: rgb(2, 34, 39);
  border-bottom-left-radius: 40rpx;
  border-bottom-right-radius: 40rpx;
  display: flex;
  .charts-left-btn {
    border-right: 2rpx solid #033138;
    height: 100%;
    .left-btn {
      font-size: var(--txtFs) !important;
      white-space: nowrap;
      text-align: center;
      padding: 15rpx 10rpx;
      color: #999;
      cursor: pointer;
      &:hover {
        background-color: #0a3f4a;
        color: #fff;
      }
    }
  }
  .charts {
    width: 100%;
    height: 700rpx;
  }
  .charts-label {
    position: absolute;
    left: 10px;
    top: 5px;
    font-size: var(--txtFs);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .charts-label {
    div {
      margin-right: 14px;
    }
  }

  .charts-bar-label {
    position: absolute;
    left: 10px;
    top: 80%;
    font-size: var(--txtFs);
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      margin-right: 14px;
    }
  }

  .charts-MA5 {
    color: #ee9d02;
  }

  .charts-MA10 {
    color: #1f4cb1;
  }

  .charts-MA30 {
    color: #fd45a0;
  }
  .charts-VOL {
    color: #8998a8;
  }
  :deep(.charts-tooltip-row) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rpx 0;
    .ctr-label {
      margin-right: 20rpx;
    }
    .green {
      color: #00b074;
    }
    .red {
      color: #cd474e;
    }
  }
}

.tabs-btn-box {
  font-size: var(--txtFs);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
}

@media screen and (max-width: 900px) {
  .tabs-btn-box {
    flex-wrap: wrap;
    row-gap: 16rpx;
    .tabs-left {
      flex-wrap: wrap;
      row-gap: 15rpx;
      column-gap: 24rpx;
      text,
      .tabs-item-text {
        white-space: nowrap;
      }
    }
  }
}

.tab-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .tab-top-left {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .tab-info {
    display: flex;
    align-items: center;
    gap: 160rpx;
    font-size: var(--txtFs);
    > view {
      font-size: var(--txtFs);
      > view {
        margin-top: 6rpx;
      }
    }
  }
  @media screen and (max-width: 900px) {
    .tab-info {
      flex-wrap: wrap;
      gap: 10rpx 40rpx;
    }
  }
}

.coin-select {
  width: 260rpx;
  margin-right: 30rpx;
  :deep(.el-select__wrapper) {
    background-color: transparent;
    box-shadow: unset;
    .el-select__placeholder {
      color: #fff;
      font-size: var(--txtFs);
    }
  }
}

.green-text {
  color: #058e33;
}

.red-text {
  color: #ff4646;
}

.white-text {
  color: #fff;
}

:deep(.el-form-item) {
  width: 45%;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
}
</style>
