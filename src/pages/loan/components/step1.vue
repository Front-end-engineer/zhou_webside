<template>
  <Subtitle :title="$t('components.step1.150668-0')" />
  <el-form
    ref="stepOneRef"
    :model="form"
    :inline="true"
    label-width="auto"
    :rules="rules"
  >
    <ThemeContainer>
      <el-form-item :label="$t('components.step1.150668-1')" prop="name">
        <el-input
          v-model="form.name"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
      <el-form-item :label="$t('components.step1.150668-3')" prop="id_card">
        <el-input
          v-model="form.id_card"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
      <el-form-item :label="$t('components.step1.150668-4')" prop="phone">
        <el-input
          v-model="form.phone"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
      <el-form-item
        :label="$t('components.step1.150668-5')"
        prop="contact_info1"
      >
        <el-input
          v-model="form.contact_info1"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
      <el-form-item
        :label="$t('components.step1.150668-6')"
        prop="contact_info2"
      >
        <el-input
          v-model="form.contact_info2"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
      <el-form-item :label="$t('components.step1.150668-7')" prop="email">
        <el-input
          v-model="form.email"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
      <el-form-item :label="$t('components.step1.150668-8')" prop="educational">
        <el-input
          v-model="form.educational"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
      <el-form-item :label="$t('components.step1.150668-9')" prop="income_info">
        <el-input
          v-model="form.income_info"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
      <el-form-item :label="$t('components.step1.150668-10')" prop="work_info">
        <el-input
          v-model="form.work_info"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
    </ThemeContainer>
    <ThemeContainer>
      <el-form-item
        :label="$t('components.step1.150668-11')"
        prop="urgent_name"
      >
        <el-input
          v-model="form.urgent_name"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
      <el-form-item
        :label="$t('components.step1.150668-12')"
        prop="urgent_phone"
      >
        <el-input
          v-model="form.urgent_phone"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
      <el-form-item
        :label="$t('components.step1.150668-13')"
        prop="urgent_email"
      >
        <el-input
          v-model="form.urgent_email"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
    </ThemeContainer>
    <ThemeContainer>
      <el-form-item
        :label="$t('components.step1.150668-14')"
        label-position="top"
        style="width: 100%; display: block"
      >
        <el-input
          v-model="form.notes"
          type="textarea"
          :placeholder="$t('components.step1.150668-2')"
        />
      </el-form-item>
      <CustomCheck v-model="agree" type="3"></CustomCheck>
      <view class="flex-end">
        <el-button type="primary" @click="onSubmit(stepOneRef)" style="">{{
          $t("components.step1.150668-15")
        }}</el-button>
      </view>
    </ThemeContainer>
  </el-form>
</template>

<script setup>
import { apply_quota, getCreditState, getApplyInfo } from "@/api/index";
import { defineEmits, onMounted, reactive } from "vue";
const emits = defineEmits(["changeStep"]);
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let form = reactive({
  name: "",
  id_card: "",
  phone: "",
  contact_info1: "",
  contact_info2: "",
  email: "",
  educational: "",
  income_info: "",
  work_info: "",
  urgent_name: "",
  urgent_phone: "",
  urgent_email: "",
  notes: "",
});

const agree = ref(false);

const rules = {
  name: [
    {
      required: true,
      message: t("components.step1.150668-16"),
      trigger: "blur",
    },
  ],
  id_card: [
    {
      required: true,
      message: t("components.step1.150668-17"),
      trigger: "blur",
    },
  ],
  phone: [
    {
      required: true,
      message: t("components.step1.150668-18"),
      trigger: "blur",
    },
  ],
  contact_info1: [
    {
      required: true,
      message: t("components.step1.150668-19"),
      trigger: "blur",
    },
  ],
  contact_info2: [
    {
      required: true,
      message: t("components.step1.150668-19"),
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: t("components.step1.150668-20"),
      trigger: "blur",
    },
  ],
  educational: [
    {
      required: true,
      message: t("components.step1.150668-21"),
      trigger: "blur",
    },
  ],
  income_info: [
    {
      required: true,
      message: t("components.step1.150668-22"),
      trigger: "blur",
    },
  ],
  work_info: [
    {
      required: true,
      message: t("components.step1.150668-23"),
      trigger: "blur",
    },
  ],
  urgent_name: [
    {
      required: true,
      message: t("components.step1.150668-24"),
      trigger: "blur",
    },
  ],
  urgent_phone: [
    {
      required: true,
      message: t("components.step1.150668-25"),
      trigger: "blur",
    },
  ],
  urgent_email: [
    {
      required: true,
      message: t("components.step1.150668-26"),
      trigger: "blur",
    },
  ],
  notes: [
    {
      required: true,
      message: t("components.step1.150668-27"),
      trigger: "blur",
    },
  ],
};

const stepOneRef = ref();

const onSubmit = async (formEl) => {
  if (!agree.value) {
    ElMessage.warning(t("components.step1.150668-28"));
    return;
  }

  if (!formEl) return;

  await formEl.validate((valid, fields) => {
    if (valid) {
      let params = {
        ...form,
      };
      apply_quota(params).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.msg);
          emits("changeStep", 2);
        }
      });
    }
  });
};

const fetchApplyInfo = () => {
  getApplyInfo().then((res) => {
    if (res.code == 1) {
      Object.assign(form, res.data);
    }
  });
};

let isdetail = ref(false);
onMounted(() => {
  getCreditState().then((res) => {
    if (res.code == 1) {
      let state = res.data;
      if (state !== 0) {
        isdetail.value = true;
        fetchApplyInfo();
      }
    }
  });
});
</script>

<style lang="scss" scoped>
@use "@/styles/theme/index.scss" as *;
:deep(.el-form-item) {
  width: 46%;
}

@media (max-width: 900px) {
  :deep(.el-form-item) {
    width: 100%;
  }
}

.flex-end {
  display: flex;
  justify-content: flex-end;
}
</style>
