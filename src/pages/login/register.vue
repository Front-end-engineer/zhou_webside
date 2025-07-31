<template>
  <view class="container">
    <view class="header">
      <a href="/" class="logo">
        <image src="@/static/alllogo.png" mode="heightFix"></image>
      </a>
      <MenuLang :memuList="allLang"></MenuLang>
    </view>
    <view class="content_form">
      <view class="title">{{ $t("login.register.667500-0") }}</view>
      <el-form ref="ruleFormRef" :model="registerParams" :rules="registerRules">
        <el-form-item prop="account">
          <el-input
            v-model="registerParams.account"
            :placeholder="$t('login.register.667500-1')"
          />
        </el-form-item>
        <el-form-item class="region" prop="code">
          <el-input
            v-model="registerParams.code"
            :placeholder="$t('login.register.667500-2')"
            style="width: 75%"
          />
          <el-button
            @click="validateCodeSend"
            class="submit"
            color="#00BFBF"
            style="width: 20%; margin-left: 3%"
            >{{ $t("login.register.667500-3") }}</el-button
          >
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerParams.password"
            show-password
            :placeholder="$t('login.register.667500-4')"
          />
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            v-model="registerParams.checkPass"
            show-password
            :placeholder="$t('login.register.667500-5')"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerParams.invite_code"
            :placeholder="$t('login.register.667500-6')"
          />
        </el-form-item>
        <el-button
          @click="submitForm(ruleFormRef)"
          class="submit"
          color="#00BFBF"
          >{{ $t("login.register.667500-7") }}</el-button
        >
        <text @click="toLogin" class="bfbf" style="cursor: pointer">{{
          $t("login.register.667500-8")
        }}</text>
      </el-form>
      <view class="term">
        <CustomCheck v-model="agreementVal" type="2"></CustomCheck>
        <!-- <el-checkbox v-model="termChecked" fill="#00BFBF" size="large" />
                <text> 注册即代表同意 <text class="bfbf">《服务条款》</text></text> -->
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import { register, sendSmsCode, sendEmsCode } from "@/api/index";
import { useI18n } from "vue-i18n";
import { useLang } from "@/components/langConfig";
const { allLang } = useLang();
const { t } = useI18n();

onMounted(() => {
  let paramsArr = window.location.href.split("?")[1].split("&");
  let inviteCodeValue = paramsArr[0].split("=")[1];
  registerParams.invite_code = inviteCodeValue;
});

let agreementVal = ref();

const ruleFormRef = ref();

const toLogin = () => {
  uni.navigateTo({
    url: "/pages/login/login",
  });
};

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error(t("login.register.667500-9")));
  } else {
    if (registerParams.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error(t("login.register.667500-10")));
  } else if (value !== registerParams.password) {
    callback(new Error(t("login.register.667500-11")));
  } else {
    callback();
  }
};

const validateContact = (rule, value, callback) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^1[3-9]\d{9}$/;

  if (!value) {
    callback(new Error(t("login.register.667500-12")));
  } else if (emailRegex.test(value) || phoneRegex.test(value)) {
    callback(); // 校验通过
  } else {
    callback(new Error(t("login.register.667500-13")));
  }
};

const registerParams = reactive({
  password: "",
  checkPass: "",
  device: "pc",
  account: "",
  code: "",
  register_type: "",
  invite_code: "",
});

const registerRules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  code: [
    { required: true, message: t("login.register.667500-14"), trigger: "blur" },
  ],
  account: [{ validator: validateContact, trigger: "blur" }],
});

const submitForm = (formEl) => {
  if (!agreementVal.value) {
    ElMessage.warning(t("login.register.667500-15"));
    return;
  }
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (emailRegex.test(registerParams.account)) {
        registerParams.register_type = "email";
      }
      if (phoneRegex.test(registerParams.account)) {
        registerParams.register_type = "phone";
      }

      let params = {
        ...registerParams,
      };

      register(params).then((res) => {
        if (res.code == 1) {
          ElMessage.warning(res.msg);
          uni.navigateTo({
            url: "/pages/login/login",
          });
        }
      });
    } else {
      return false;
    }
  });
};

const validateCodeSend = () => {
  if (!registerParams.account) {
    ElMessage.warning(t("login.register.667500-16"));
    return;
  }
  let params = {
    event: "register",
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (emailRegex.test(registerParams.account)) {
    params.email = registerParams.account;
    sendEmsCode(params).then((res) => {
      if (res.code == 1) {
        ElMessage.success(res.msg);
      }
    });
  }
  if (phoneRegex.test(registerParams.account)) {
    params.mobile = registerParams.account;
    sendSmsCode(params).then((res) => {
      if (res.code == 1) {
        ElMessage.success(res.msg);
      }
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  min-height: 100vh;
  background-image: url(@/static/register.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  .header {
    display: flex;
    justify-content: space-between;
    color: white;
    padding: 49px 35px;
    font-size: 20px;

    image {
      height: 37px;
      vertical-align: middle;
      margin-right: 16px;
    }
  }

  .term {
    color: white;
    margin-top: 39px;
  }

  .bfbf {
    margin-top: 30rpx;
    display: block;
    text-align: center;
    font-size: var(--txtFs);
    color: #00bfbf;
  }

  .content_form {
    position: absolute;
    top: 171px;
    right: 96px;
    box-sizing: border-box;
    width: 450px;
    height: 570px;
    background: linear-gradient(180deg, #051622 0%, #0a1c2a 100%);
    border-radius: 13px 13px 13px 13px;
    // opacity: 0.8;
    padding: 30px 38px 30px;

    @media (max-width: 900px) {
      width: 90%;
      left: 0;
      right: 0;
      margin: auto;
      background: linear-gradient(
        180deg,
        rgba(5, 22, 34, 0.9) 0%,
        rgba(10, 28, 42, 0.9) 100%
      );
    }
    .title {
      font-weight: bold;
      font-size: var(--bTitle);
      color: white;
      margin-bottom: 30px;
      text-align: center;
      @media (max-width: 900px) {
        font-size: 20px;
      }
    }

    .el-form {
      .el-input {
        height: 40px;

        ::v-deep .el-input__wrapper {
          background: #0e2e40;

          .el-input__inner {
            color: white;
          }
        }
      }

      .submit {
        width: 100%;
        height: 40px;
        color: white;
        font-size: var(--txtFs);
      }

      @media (max-width: 900px) {
        .el-input {
          height: 40px;
        }
        .submit {
          height: 40px;
          font-size: 16px;
        }
      }

      .region {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
.logo {
  text-decoration: none;
  font-weight: normal;
  font-family: Bahnschrift, Bahnschrift;
  font-size: 60rpx;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  image {
    height: 80rpx;
    vertical-align: middle;
    margin-right: 32rpx;
  }
}
</style>
