import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { getPinia } from "/src/stores/index";
const router = useRouter();

// 配置新建一个 axios 实例
const service = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL + "/api",
  // baseURL: "http://192.168.0.129:8082/api",
  baseURL: "http://api.korea.99kuaifa.top/api",
  // baseURL: "http://api.korea.99kuaifa.top/api",
  // timeout: 50000,
  // headers: { 'Content-Type': 'multipart/form-data' },
  // paramsSerializer: {
  // 	serialize(params) {
  // 		return qs.stringify(params, { allowDots: true });
  // 	},
  // },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    const store = getPinia();

    let userInfo = store.loginInfo ? store.loginInfo : "";
    const lang = uni.getStorageSync("locale_lang") || "ZH";

    config.headers["langs"] = `${lang}`;
    if (userInfo.token && userInfo.token != "/user/login") {
      config.headers["Authorization"] = `Bearer ${userInfo.token}`;
    } else {
      config.headers["Authorization"] = "";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    const store = getPinia();
    if (res.code !== 1) {
      if (
        res.code === 4001 ||
        res.code === 4002 ||
        res.code === 4003 ||
        res.code === 4004 ||
        res.code === 4005
      ) {
        if (res.code !== 4002) {
          window.location.href = "#/pages/login/login";
          store.UPUSERINFO(null);
          store.UPLOGININFO(null);
          // ElMessage.error(res.msg);
        }
        return Promise.reject(service.interceptors.response);
      } else {
        ElMessage.error(res.msg);
        return res;
      }
    } else {
      return res;
    }
  },
  (error) => {
    if (error.message?.indexOf("timeout") != -1) {
      ElMessage.error("网络超时");
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误");
    } else {
      if (error.response.data) ElMessage.error(error.response.statusText);
      else ElMessage.error("接口路径找不到");
    }
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default service;
