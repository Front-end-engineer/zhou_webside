import { defineStore } from "pinia";

// console.log("import.meta.env.VITE_BASE_URL==", import.meta.env.VITE_BASE_URL);
export const getPinia = defineStore("index", {
  state: () => ({
    // 用户信息
    userInfo: {},
    // 登录信息
    loginInfo: {},
    // 是否为WEB环境
    isWebPort: true,
    // 上传图片api
    uploadUrl: `${import.meta.env.VITE_BASE_URL}/api/common/upload`,
    walletInfo: {},
    pageRouter: "init",
    chainList: [],
  }),
  // 配置持久化选项
  persist: {
    enabled: true,
    strategies: [
      {
        key: "userInfo", // 存储在localStorage中的键名
        storage: localStorage, // 使用localStorage进行存储
      },
      {
        key: "loginInfo", // 存储在localStorage中的键名
        storage: localStorage, // 使用localStorage进行存储
      },
      {
        key: "walletInfo",
        storage: sessionStorage,
      },
    ],
  },
  actions: {
    UPWEBPORT(bool) {
      this.isWebPort = bool;
    },
    UPUSERINFO(data) {
      this.userInfo = data;
    },
    UPROUTER(path) {
      this.pageRouter = path;
    },
    UPLOGININFO(data) {
      this.loginInfo = data;
    },
    setWalletInfo(val) {
      this.walletInfo = val;
    },
    setChainList(val) {
      this.chainList = val;
    },
    // // 异步 action
    // async fetchUser(userId) {
    //   this.loading = true
    //   try {
    //     const response = await fetch(`/api/users/${userId}`)
    //     this.user = await response.json()
    //   } catch (error) {
    //     console.error('Failed to fetch user:', error)
    //   } finally {
    //     this.loading = false
    //   }
    // }
  },
  getters: {
    // itemCount: (state) => state.items.length,
    // activeItems: (state) => state.items.filter(item => item.active)
    isLogin: (state) => !!state.loginInfo?.token,
  },
});
