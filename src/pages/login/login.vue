<template>
  <view class="container">
    <view class="header">
      <a href="/" class="logo">
        <image src="@/static/alllogo.png" mode="heightFix"></image>
      </a>
      <MenuLang :memuList="allLang"></MenuLang>
    </view>
    <view class="content_form">
      <view class="title">{{ $t("login.login.656841-0") }}</view>
      <el-form ref="ruleFormRef" :model="registerParams">
        <el-form-item>
          <el-input
            v-model="registerParams.account"
            :placeholder="$t('login.login.656841-1')"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerParams.password"
            :placeholder="$t('login.login.656841-2')"
            show-password
            @keydown.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>

        <view class="forget bfbf">
          <text @click="toFindPass">{{ $t("login.login.656841-3") }}</text>
        </view>

        <el-button
          @click="submitForm(ruleFormRef)"
          class="submit"
          color="#00BFBF"
          >{{ $t("login.login.656841-4") }}</el-button
        >
      </el-form>
      <view class="term">
        <text>
          {{ $t("login.login.656841-5") }}
          <text @click="toRegister" class="bfbf" style="cursor: pointer">{{
            $t("login.login.656841-6")
          }}</text></text
        >
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/index";
import { getPinia } from "/src/stores/index";
import { askapi } from "/src/api/userapi";
import { useLang } from "@/components/langConfig";
const { allLang } = useLang();
const store = getPinia();
store.UPUSERINFO({});
store.UPLOGININFO({});

const ruleFormRef = ref();

const registerParams = reactive({
  account: "",
  password: "",
  device: "pc",
});

const router = useRouter();
const toRegister = () => {
  uni.navigateTo({
    url: "/pages/login/register",
  });
};
const toFindPass = () => {
  uni.navigateTo({
    url: "/pages/login/findPassword",
  });
};

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      let params = {
        ...registerParams,
      };
      login(params).then(async (res) => {
        if (res.code == 1) {
          ElMessage.success(res.msg);
          store.UPLOGININFO(res.data.userinfo);
          let lres = await askapi("user/userInfo", "GET");
          if (lres.code == 1) {
            store.UPUSERINFO(lres.data.userinfo);
          }
          // localStorage.setItem('userInfo', JSON.stringify(res.data.userinfo));
          uni.navigateTo({
            url: "/pages/home/home",
          });
        }
      });
    } else {
      return false;
    }
  });
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
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
    text-align: center;
    margin-top: 38px;
    font-size: var(--txtFs);

    @media (max-width: 900px) {
      font-size: 13px;
    }
  }

  .bfbf {
    color: #00bfbf;
  }

  .content_form {
    position: absolute;
    top: 171px;
    right: 96px;
    box-sizing: border-box;
    width: 450px;
    height: 430px;
    background: linear-gradient(180deg, #051622 0%, #0a1c2a 100%);
    border-radius: 13px 13px 13px 13px;
    // opacity: 0.8;
    padding: 30px 38px 0;
    @media (max-width: 900px) {
      width: 90%;
      height: 430px;
      left: 0;
      right: 0;
      margin: auto;
      background: linear-gradient(
        180deg,
        rgba(5, 22, 34, 0.9) 0%,
        rgba(10, 28, 42, 0.9) 100%
      );
    }

    .forget {
      font-weight: 500;
      font-size: var(--txtFs);
      margin: 26px 0;
      cursor: pointer;
      position: relative;

      text {
        position: absolute;
        right: 0;
      }

      @media (max-width: 900px) {
        font-size: 13px;
      }
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
        font-size: var(--sTitle);
        margin-top: 50px;
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
