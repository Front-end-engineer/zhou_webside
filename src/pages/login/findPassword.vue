<template>
  <view class="container">
    <view class="header">
      <a href="/" class="logo">
        <image src="@/static/alllogo.png" mode="heightFix"></image>
      </a>
      <MenuLang :memuList="allLang"></MenuLang>
    </view>
    <view class="content_form">
      <view class="title">{{ $t("login.findPassword.572931-0") }}</view>
      <el-form ref="ruleFormRef" :model="registerParams" :rules="registerRules">
        <el-form-item prop="username">
          <el-input
            v-model="registerParams.username"
            :placeholder="$t('login.findPassword.572931-1')"
          />
        </el-form-item>
        <el-form-item class="region" prop="captcha">
          <el-input
            v-model="registerParams.captcha"
            :placeholder="$t('login.findPassword.572931-2')"
            style="width: 77%"
          />
          <el-button
            @click="validateCodeSend"
            class="submit"
            color="#00BFBF"
            style="width: 20%; margin-left: 3%"
            >{{ $t("login.findPassword.572931-3") }}</el-button
          >
        </el-form-item>
        <el-form-item prop="newpassword">
          <el-input
            v-model="registerParams.newpassword"
            show-password
            :placeholder="$t('login.findPassword.572931-4')"
          />
        </el-form-item>
        <el-form-item prop="surenewpassword">
          <el-input
            v-model="registerParams.surenewpassword"
            show-password
            :placeholder="$t('login.findPassword.572931-5')"
          />
        </el-form-item>
        <el-button
          @click="submitForm(ruleFormRef)"
          class="submit"
          color="#00BFBF"
          >{{ $t("login.findPassword.572931-6") }}</el-button
        >
        <text @click="toLogin" class="bfbf" style="cursor: pointer">{{
          $t("login.findPassword.572931-7")
        }}</text>
      </el-form>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import { register, sendSmsCode, sendEmsCode, resetpwd } from "@/api/index";
import { useI18n } from "vue-i18n";
import { useLang } from "@/components/langConfig";
const { allLang } = useLang();
const { t } = useI18n();

const toLogin = () => {
  uni.navigateTo({
    url: "/pages/login/login",
  });
};

const ruleFormRef = ref();

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error(t("login.findPassword.572931-8")));
  } else {
    if (registerParams.surenewpassword !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("surenewpassword", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error(t("login.findPassword.572931-9")));
  } else if (value !== registerParams.newpassword) {
    callback(new Error(t("login.findPassword.572931-10")));
  } else {
    callback();
  }
};

const validateContact = (rule, value, callback) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^1[3-9]\d{9}$/;

  if (!value) {
    callback(new Error(t("login.findPassword.572931-11")));
  } else if (emailRegex.test(value) || phoneRegex.test(value)) {
    callback(); // 校验通过
  } else {
    callback(new Error(t("login.findPassword.572931-12")));
  }
};

const registerParams = reactive({
  username: "",
  newpassword: "",
  surenewpassword: "",
  device: "pc",
  email: "email",
  captcha: "",
  register_type: "",
});

const registerRules = reactive({
  newpassword: [{ validator: validatePass, trigger: "blur" }],
  surenewpassword: [{ validator: validatePass2, trigger: "blur" }],
  username: [{ validator: validateContact, trigger: "blur" }],
  captcha: [
    {
      required: true,
      message: t("login.findPassword.572931-13"),
      trigger: "blur",
    },
  ],
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^1[3-9]\d{9}$/;

      let params = {
        ...registerParams,
      };

      let username = registerParams.value.username;
      if (emailRegex.test(username)) {
        params.email = username;
      }
      if (phoneRegex.test(username)) {
        params.mobile = username;
      }

      resetpwd(params).then((res) => {
        if (res.code == 1) {
          uni.redirectTo({
            url: "/pages/login/index",
          });
        }
      });
    } else {
      return false;
    }
  });
};

const validateCodeSend = () => {
  if (!registerParams.username) {
    ElMessage.warning(t("login.findPassword.572931-14"));
    return;
  }
  let params = {
    event: "resetpwd",
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (emailRegex.test(registerParams.username)) {
    params.email = registerParams.username;
    sendEmsCode(params).then((res) => {
      if (res.code == 1) {
        ElMessage.success(res.msg);
      }
    });
  }
  if (phoneRegex.test(registerParams.username)) {
    params.mobile = registerParams.username;
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
    height: 450px;
    background: linear-gradient(180deg, #051622 0%, #0a1c2a 100%);
    border-radius: 13px 13px 13px 13px;
    // opacity: 0.8;
    padding: 30px 38px 0;

    @media (max-width: 900px) {
      width: 90%;
      left: 0;
      right: 0;
      margin: auto;
      height: 450px;
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
