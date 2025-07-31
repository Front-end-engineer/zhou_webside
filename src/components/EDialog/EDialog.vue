<template>
  <view>
    <el-dialog
      :class="store.isWebPort ? '' : 'ed_body'"
      v-model="dialogTableVisible"
      v-bind="$attrs"
      ref="dialog"
      :show-close="false"
      :center="true"
    >
      <template #default>
        <slot></slot>
      </template>
      <template #header>
        <slot name="header">
          <view class="default-header">
            {{ $attrs.title }}
            <image
              class="close-icon"
              src="@/static/images/close.png"
              mode="scaleToFill"
              @click="handleClose"
            />
          </view>
        </slot>
      </template>

      <template #footer>
        <slot name="footer">
          <el-button @click="defaultBtnEvent">{{
            $t("userCenter.common.value.确认")
          }}</el-button>
        </slot>
      </template>
    </el-dialog>
  </view>
</template>

<script setup>
import { getPinia } from "/src/stores/index";
const store = getPinia();
const dialogTableVisible = defineModel({
  type: Boolean,
  default: false,
});

const dialog = ref();

const emit = defineEmits(["confirmEvent"]);

const defaultBtnEvent = () => {
  emit("confirmEvent");
  handleClose();
};

const handleClose = () => {
  dialogTableVisible.value = false;
};

defineExpose({
  dialog: dialog.value,
});
</script>

<style lang="scss" scoped>
@use "@/styles/theme/index.scss" as *;
.default-header {
  position: relative;
  text-align: center;
  font-size: 32rpx;
  .close-icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 60rpx;
    height: 60rpx;
    cursor: pointer;
  }
}

:deep(.el-dialog) {
  color: #fff;
  background: linear-gradient(180deg, #01363b 0%, #054b4f 100%);
  border-radius: var(--bRadius);
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__body {
    color: #fff;
    padding: 30rpx 0;
  }
}
:deep(.ed_body) {
  --el-dialog-width: 90% !important;
}
</style>
