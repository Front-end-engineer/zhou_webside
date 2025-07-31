<template>
  <EDialog v-model="dialogTableVisible">
    <view class="tablebox searchForm">
      <view class="tableTitle flexCenter">
        <view class="tableTitleSolid"></view>
        <view class="tableTitleText fsize40">{{
          $t($t("putAddres.putAddres.283735-0"))
        }}</view>
      </view>
      <view class="condition fsize36">
        <view class="conditionBox flexCenterContent">
          <view class="conditionBoxs flexCenter">
            <view class="conditionBoxsLab"
              >{{ $t($t("putAddres.putAddres.283735-1")) }}：</view
            >
            <view class="conditionBoxsInp w157">
              <el-select
                placeholder=""
                v-model="addForm.chain_id"
                value-on-clear=""
                clearable
              >
                <el-option
                  v-for="item in selfchainList"
                  :key="item.chain_id"
                  :label="item.name"
                  :value="item.chain_id"
                />
              </el-select>
            </view>
          </view>
          <view class="conditionBoxs flexCenter" style="flex: 1">
            <view class="conditionBoxsLab"
              >{{ $t($t("putAddres.putAddres.283735-2")) }}：</view
            >
            <view class="conditionBoxsInp w395">
              <el-input
                class="cardBoxLisInp elinputs"
                v-model.trim="addForm.address"
              />
            </view>
          </view>
          <view class="conditionBoxs flexCenter">
            <view class="conditionBoxsLab"
              >{{ $t($t("putAddres.putAddres.283735-3")) }}：</view
            >
            <view class="conditionBoxsInp w240">
              <el-input
                class="cardBoxLisInp elinputs"
                v-model="addForm.remark"
              />
            </view>
            &nbsp;&nbsp;
            <el-button class="operator_btn" @click="handAdd">{{
              $t($t("putAddres.putAddres.283735-4"))
            }}</el-button>
            <!-- <view class="conditionBoxsInp condBth" @click="handAdd">{{
              $t($t('putAddres.putAddres.283735-4'))
            }}</view> -->
          </view>
        </view>
      </view>

      <view class="tableTitle flexCenter">
        <view class="tableTitleSolid"></view>
        <view class="tableTitleText">{{
          $t($t("putAddres.putAddres.283735-5"))
        }}</view>
      </view>
      <view class="tableConent">
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          v-loading="tableLoading"
        >
          <el-table-column
            prop="en_name"
            :label="t($t('putAddres.putAddres.283735-6'))"
          />
          <el-table-column
            prop="address"
            :label="t($t('putAddres.putAddres.283735-7'))"
          />
          <el-table-column
            prop="remark"
            :label="t($t('putAddres.putAddres.283735-3'))"
          />
          <el-table-column
            :label="t($t('putAddres.putAddres.283735-8'))"
            width="100"
          >
            <template #default="scope">
              <el-button
                class="operator_btn"
                @click="showDeleteModal(scope.row.id)"
                >{{ $t($t("putAddres.putAddres.283735-9")) }}</el-button
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
              @current-change="getTableData(false)"
            />
          </view>
        </div>
      </view>

      <EDialog
        v-model="dialogRedemptionVisible"
        :title="t($t('putAddres.putAddres.283735-10'))"
        width="20%"
      >
        <slot>
          <div class="paySuccessDialog">
            <div class="redemption">
              <view>{{ $t($t("putAddres.putAddres.283735-11")) }}</view>
            </div>
          </div>
        </slot>
        <template #footer>
          <span class="dialog-footer"
            ><el-button
              class="operator_btn"
              type="primary"
              @click="handleDelete"
              >{{ $t($t("putAddres.putAddres.283735-12")) }}</el-button
            ></span
          >
        </template>
      </EDialog>
    </view>
  </EDialog>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { local, t } = useI18n();
import {
  getUserAddressList,
  addUserAddress,
  getChainList,
  deleteUserAddress,
} from "@/api/index";
import { computed, reactive, ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { getPinia } from "../../stores/index";

const store = getPinia();

const { walletInfo: wallet, userInfo, chainList } = toRefs(store);

const currentChainId = computed(() => {
  return chainList.value.find((item) => item.chain_id === wallet.value.chainId)
    ?.id;
});

const dialogTableVisible = defineModel({
  type: Boolean,
  default: false,
});

const emits = defineEmits(["change"]);

const addForm = ref({
  chain_id: "",
  address: "",
  remark: "",
});
const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  if (rowIndex === 1) {
    return "warning-row";
  } else if (rowIndex === 3) {
    return "success-row";
  }
  return "";
};
const tableLoading = ref(false);
const tableData = ref([]);
const page = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
});
const getTableData = async (init?: boolean) => {
  if (init) {
    page.page = 1;
  }
  tableLoading.value = true;
  try {
    const res = await getUserAddressList({
      page: page.page,
      // chain_id: wallet.value.chainId,
    });
    tableData.value = res.data.data;
    page.total = res.data.total;
  } catch (err) {
    tableData.value = [];
  } finally {
    tableLoading.value = false;
  }
};
const handAdd = async () => {
  if (!addForm.value.chain_id || !addForm.value.address) {
    ElMessage.warning(t("putAddres.putAddres.283735-13"));
    return;
  }
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  try {
    const res = await addUserAddress(addForm.value);
    if (res.code === 1) {
      await getTableData(false);
      emits("change");
      addForm.value = {
        chain_id: "",
        address: "",
        name: "",
      };
      ElMessage.success(res.msg);
    }
  } finally {
    loading.close();
  }
};
const dialogRedemptionVisible = ref(false);
const deleteId = ref(0);
const showDeleteModal = (id: number) => {
  deleteId.value = id;
  dialogRedemptionVisible.value = true;
};
const handleDelete = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  deleteUserAddress({ id: deleteId.value })
    .then((res) => {
      if (res.code === 1) {
        getTableData(false);
        emits("change");
        ElMessage.success(res.msg);
      }
    })
    .finally(() => {
      loading.close();
      dialogRedemptionVisible.value = false;
    });
};
const selfchainList = ref([]);
const fetchChainList = () => {
  getChainList().then((res) => {
    if (res.code === 1) {
      selfchainList.value = res.data.data;
    }
  });
};
onMounted(() => {
  fetchChainList();
  getTableData(true);
});
</script>

<style lang="scss" scoped>
.tablebox {
  width: 100%;
  margin-top: 56rpx;
  .condition {
    padding-bottom: 70rpx;
    &Box {
      flex-wrap: wrap;
      row-gap: 40rpx;
      margin-top: 36rpx;
      column-gap: 40rpx;
      &s {
        &Lab {
          white-space: nowrap;
        }
        &Inp {
          border-radius: 12rpx;
          height: 72rpx;
          line-height: 72rpx;
          :deep(.el-input__inner) {
            color: white;
          }
          :deep(.el-select) {
            // width: 364rpx;
            width: 100%;
          }
          :deep(.el-select__placeholder) {
            color: white;
          }
          :deep(.el-select__wrapper) {
            background-color: #044953;
            border-radius: 12rpx;
            box-shadow: none;
          }
        }
        .w157 {
          width: 300rpx;
        }
        .w395 {
          // width: 750rpx;
          flex-grow: 1;
        }
        .w240 {
          width: 300rpx;
        }
        .condBth {
          width: 200rpx;
          background-color: #00bfbf;
          text-align: center;
          margin-left: 40rpx;
          cursor: pointer;
        }
      }
    }
  }
  .tableTitle {
    margin-bottom: 20rpx;
    column-gap: 24rpx;
    &Solid {
      width: 8rpx;
      height: 34rpx;
      background-color: #3eebeb;
    }
    &Text {
    }
  }
  .tableConent {
    // max-height: 1000rpx;
  }
}
:deep(.paySuccessDialog) {
  max-width: 640px;
  border-radius: 6.5px;
  padding: 16.5px 24.5px;

  .redemption {
    color: white;
    font-weight: 400;
    font-size: 15px;
    text-align: center !important;
  }

  .paySuccessContent {
    display: flex;
    flex-direction: column;
    gap: 20px;

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
    margin-bottom: 30px;

    span {
      color: white;
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: center;

    .el-button {
      width: 136px;
      height: 35px;
      font-size: 14px;
      border: 1px solid #00bfbf;
      background: #00bfbf;
      border-radius: 20px;
      margin: 50px 0 30px;
    }
  }
}
</style>
