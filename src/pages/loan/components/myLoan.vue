<template>
  <Subtitle :title="$t('components.myLoan.016666-0')" />
  <ThemeContainer class="apply-info-box">
    <view class="text1"> {{ $t("components.myLoan.016666-1") }} </view>
    <view class="text2">
      {{ userinfo && userinfo.credit_lending_quota }}
      <text>FutLink</text>
    </view>
    <!-- <view class="text3">当前利息：12.50%</view> -->
    <view
      class="apply-btn"
      @click="handleApply"
      v-if="userinfo && userinfo.credit_lending_quota"
    >
      {{ $t("components.myLoan.016666-2") }}
    </view>
  </ThemeContainer>
  <Subtitle :title="$t('components.myLoan.016666-3')" />
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      prop="create_at"
      :label="$t('components.myLoan.016666-4')"
      width="160"
    />
    <el-table-column
      prop="repayment_amount"
      :label="$t('components.myLoan.457508-0')"
      align="center"
    />
    <el-table-column :label="$t('components.myLoan.016666-6')" align="center"
      >futLink</el-table-column
    >
    <!-- <el-table-column prop="date" label="周期" align="center" /> -->
    <!-- <el-table-column prop="date" label="利息" align="center" /> -->
    <el-table-column
      prop="state"
      :label="$t('components.myLoan.016666-7')"
      align="center"
    >
      <template #default="scope">
        <text
          :style="`color: ${
            scope.row.state == 0
              ? '#FFD174'
              : scope.row.state == 1
              ? '#0FAB62'
              : scope.row.state == 2
              ? '#FF4141'
              : scope.row.state == 3 || scope.row.state == 6
              ? '#FFD174'
              : 'white'
          }`"
          >{{ filterStatus(scope.row.state) }}</text
        >
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('components.myLoan.016666-8')"
      width="100"
      align="center"
    >
      <template #default="scope">
        <el-button
          v-if="scope.row.state == 1"
          class="table-btn1"
          size="small"
          @click="handleBtnEvent(scope.row, 1)"
          >{{ $t("components.myLoan.016666-9") }}</el-button
        >
        <el-button
          v-if="scope.row.state === 2"
          class="table-btn2"
          size="small"
          @click="handleBtnEvent(scope.row, 2)"
          >{{ $t("components.myLoan.016666-10") }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="tablePage flexCenterContent">
    <view></view>
    <view>
      <el-pagination
        v-model:current-page="page.page"
        v-model:page-size="page.pageSize"
        :background="false"
        layout="prev, pager, next"
        :total="page.total"
        @current-change="pageChange"
      />
    </view>
  </div>
  <CustomCollapse :list="questtionList"></CustomCollapse>
  <EDialog v-model="showDialog" :title="dialogTitle">
    <!-- {{ $t('components.myLoan.016666-2') }} -->
    <template v-if="dialogType === 'apply'">
      <el-form
        :model="form"
        :rules="rules"
        label-width="auto"
        label-position="left"
        ref="dialogFormRef"
      >
        <el-form-item :label="$t('components.myLoan.016666-11')" prop="amount">
          <el-input
            v-model="form.amount"
            :placeholder="$t('components.myLoan.016666-12')"
          />
        </el-form-item>
        <!-- <el-form-item label="申请币种：" prop="coinType">
          <el-select v-model="form.coinType" placeholder="请选择">
            <el-option
              v-for="item in coinTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="最低借贷周期：" prop="cycle">
          <el-select v-model="form.cycle" placeholder="请选择">
            <el-option
              v-for="item in cycleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item
          :label="$t('components.myLoan.016666-13')"
          class="custom-form-item"
        >
          <view class="form-item">{{ maxminConfig.min }}%</view>
        </el-form-item>
        <el-form-item
          :label="$t('components.myLoan.016666-14')"
          class="custom-form-item"
        >
          <view class="form-item">{{ maxminConfig.max }}%</view>
        </el-form-item>
        <!-- <el-form-item label="预计还款" class="custom-form-item">
          <view class="form-item">1034</view>
        </el-form-item> -->
      </el-form>
      <CustomCheck
        v-model="agree"
        type="3"
        style="justify-content: center"
      ></CustomCheck>
    </template>
    <!-- {{ $t('components.myLoan.016666-34') }} -->
    <template v-if="dialogType === 'view'">
      <!-- <el-form-item label="还款额度" class="custom-form-item">
        <view class="form-item">1034</view>
      </el-form-item> -->
      <el-form-item
        :label="$t('components.myLoan.016666-15')"
        class="custom-form-item"
      >
        <view class="form-item">{{ detailinfo.repayment_amount }}</view>
      </el-form-item>
      <el-form-item
        :label="$t('components.myLoan.016666-6')"
        class="custom-form-item"
      >
        <view class="form-item">futLink</view>
      </el-form-item>
      <!-- <el-form-item label="周期" class="custom-form-item">
        <view class="form-item">1034</view>
      </el-form-item> -->
      <el-form-item
        :label="$t('components.myLoan.016666-16')"
        class="custom-form-item"
      >
        <view class="form-item">{{ maxminConfig.min }}</view>
      </el-form-item>
      <el-form-item
        :label="$t('components.myLoan.016666-17')"
        class="custom-form-item"
      >
        <view class="form-item">{{ maxminConfig.max }}</view>
      </el-form-item>
      <el-form-item
        :label="$t('components.myLoan.016666-18')"
        class="custom-form-item"
      >
        <view class="form-item">{{ detailinfo.create_at }}</view>
      </el-form-item>
    </template>
    <!-- 失败原因 -->
    <template v-if="dialogType == 'repayFail'">
      <view class="repaydialog tCenter">
        <view>{{ $t("components.myLoan.016666-19") }}</view>
        <view>{{ $t("components.myLoan.016666-20") }}</view>
      </view>
    </template>
    <!-- {{ $t('components.myLoan.016666-9') }} -->
    <template v-if="dialogType == 'inRepayment'">
      <view class="repaydialog">
        <view
          >{{ $t("components.myLoan.016666-21") }}
          {{ $t("components.myLoan.016666-22") }}</view
        >
        <view>{{ $t("components.myLoan.016666-23") }}</view>
      </view>
    </template>
    <template v-if="dialogType == 'repayment'">
      <view class="repaydialog">
        <view>{{ $t("components.myLoan.016666-24") }}</view>
        <view>{{ $t("components.myLoan.016666-23") }}</view>
      </view>
    </template>
    <template #footer>
      <el-button @click="clickRepayment" v-if="dialogType == 'view'">{{
        $t("components.myLoan.016666-9")
      }}</el-button>
      <el-button
        @click="clickInRepayment"
        v-if="dialogType == 'inRepayment' || dialogType == 'repayment'"
        >{{ $t("components.myLoan.016666-25") }}</el-button
      >
      <el-button @click="handleSubmit" v-if="dialogType == 'apply'">{{
        $t("components.myLoan.016666-2")
      }}</el-button>
      <el-button @click="redeem" v-if="dialogType == 'repayFail'">{{
        $t("components.myLoan.016666-25")
      }}</el-button>
    </template>
  </EDialog>
</template>

<script setup>
import { getPinia } from "/src/stores/index";
const store = getPinia();
import { computed, onMounted, reactive } from "vue";
import {
  getCreditLendingList,
  get_credit_list,
  getMaxMinConfig,
  lendingApply,
  payBackBefore,
  userInfo,
  payBackEarlyApply,
  getQuestionsList,
} from "@/api/index";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let userinfo = ref();
onMounted(() => {
  userInfo().then((res) => {
    if (res.code == 1) {
      let data = res.data.userinfo;
      userinfo.value = data;
      console.log(userinfo.value.credit_lending_quota);
    }
  });
});

const page = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
});

const tableData = ref([]);

const pageChange = (val) => {
  page.page = val;
  fetchCreditLendingList();
};
const fetchCreditLendingList = () => {
  let params = {
    page: page.page,
  };
  getCreditLendingList(params).then((res) => {
    if (res.code == 1) {
      tableData.value = res.data.data;
      page.total = res.data.total;
    }
  });
};
fetchCreditLendingList();

let maxminConfig = ref();
const fetchMaxMinConfig = () => {
  getMaxMinConfig().then((res) => {
    if (res.code == 1) {
      maxminConfig.value = res.data;
    }
  });
};
fetchMaxMinConfig();

let creditlist = ref();
const fetchCredit_list = () => {
  get_credit_list().then((res) => {
    if (res.code == 1) {
      creditlist.value = res.data.data;
    }
  });
};
fetchCredit_list();

let questtionList = ref();
const fetchQuestionsList = () => {
  getQuestionsList().then((res) => {
    if (res.code == 1) {
      questtionList.value = res.data;
    }
  });
};
fetchQuestionsList();

const showDialog = ref(false);
const form = reactive({
  amount: "",
  // coinType: "",
  // cycle: "",
});
const agree = ref(false);
const coinTypeList = ref([
  {
    label: "USDT",
    value: "USDT",
  },
  {
    label: "BNB",
    value: "BNB",
  },
]);
const cycleList = ref([
  {
    label: t("components.myLoan.016666-26"),
    value: "90",
  },
  {
    label: t("components.myLoan.016666-27"),
    value: "30",
  },
]);
const rules = {
  amount: [
    {
      required: true,
      message: t("components.myLoan.016666-28"),
      trigger: "blur",
    },
  ],
  // coinType: [{ required: true, message: "请选择申请币种", trigger: "blur" }],
  // cycle: [{ required: true, message: "请选择最低借贷周期", trigger: "blur" }],
};

const dialogFormRef = ref();
const dialogType = ref("apply");
const dialogTitle = ref(t("components.myLoan.016666-0"));

const filterStatus = computed(() => {
  return (value) => {
    if (value == 0) {
      return t("components.myLoan.016666-29");
    } else if (value == 1) {
      return t("components.myLoan.016666-30");
    } else if (value == 2) {
      return t("components.myLoan.016666-31");
    } else if (value == 3 || value == 6) {
      return t("components.myLoan.016666-32");
    } else {
      return t("components.myLoan.016666-33");
    }
  };
});

const handleApply = () => {
  dialogType.value = "apply";
  openDialog();
};

let detailinfo = ref(null);
const handleBtnEvent = (item, type) => {
  detailinfo.value = item;
  if (type === 2) {
    dialogType.value = "repayFail";
    dialogTitle.value = t("components.myLoan.016666-31");
  } else if (type == 1) {
    dialogType.value = "view";
    dialogTitle.value = t("components.myLoan.016666-34");
  }
  openDialog();
  // uni.TipDialog.show({
  //   title: "测试title",
  //   image: "/static/images/default1.png",
  //   text: "测试content\n ddd",
  //   confirmText: t('components.myLoan.016666-25'),
  //   cancelText: "取消",
  //   cancelBtn: false,
  //   confirmCallback: () => {
  //     uni.TipDialog.hide();
  //   },
  // });
};

const openDialog = () => {
  showDialog.value = true;
};

const handleSubmit = () => {
  if (!agree.value) {
    ElMessage.warning(t("components.myLoan.016666-35"));
    return;
  }
  dialogFormRef.value.validate((valid) => {
    if (valid) {
      let params = {
        ...form,
      };
      lendingApply(params).then((res) => {
        if (res.code == 1) {
          fetchCreditLendingList();
          ElMessage.success(res.msg);
          showDialog.value = false;
        }
      });
    }
  });
};

// 赎回
const redeem = () => {
  showDialog.value = false;
};

// 还款
const clickInRepayment = () => {
  console.log(123);
  let { id } = detailinfo.value;
  let params = {
    apply_id: id,
    is_early: is_early.value,
  };
  payBackEarlyApply(params).then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.msg);
      showDialog.value = false;
    }
  });
};

let is_early = ref(0);
// 申请借贷
const clickRepayment = () => {
  let { id } = detailinfo.value;
  let params = {
    apply_id: id,
  };
  payBackBefore(params).then((res) => {
    if (res.code == 1) {
      is_early.value = res.data.is_early;
      dialogType.value = is_early.value == 1 ? "inRepayment" : "repayment";
      dialogTitle.value =
        is_early.value == 1
          ? t("components.myLoan.016666-36")
          : t("components.myLoan.016666-9");
    }
  });
};
</script>

<style lang="scss" scoped>
@use "@/styles/theme/index.scss" as *;

.tCenter {
  text-align: center;
}
.repaydialog {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  view {
    width: 90%;
  }
}
.apply-info-box {
  text-align: center;
  .text1 {
    font-size: 28rpx;
  }
  .text2 {
    font-size: 70rpx;
    margin: 30rpx 0 15rpx 30rpx;
    > text {
      font-size: 28rpx;
    }
  }
  .text3 {
    font-size: 28rpx;
    color: #ffd061;
  }
  .apply-btn {
    background-image: url("@/static/aiquerybtn.png");
    background-size: 100% 100%;
    width: 302rpx;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 32rpx;
    margin: 60rpx auto 0;
    cursor: pointer;
  }
}

.table-btn1 {
  width: 80rpx;
  height: 44rpx;
  padding: 10px;
  color: #3eebeb !important;
  background-color: transparent !important;
  border-color: #30607c !important;
}

.table-btn2 {
  width: 80rpx;
  height: 44rpx;
  padding: 0 !important;
  color: #3eebeb !important;
  border-color: transparent !important;
  background: linear-gradient(180deg, #10364c 0%, #0d2635 100%) !important;
}

:deep(.el-input) {
  .el-input__wrapper {
    background-color: #0e2e40;
  }
}
:deep(.el-select) {
  .el-select__wrapper {
    background-color: #0e2e40;
  }
}

.form-item {
  flex: 1;
  text-align: right;
}

.custom-form-item {
  :deep(.el-form-item__label) {
    color: #8cbfd9;
  }
}
</style>
