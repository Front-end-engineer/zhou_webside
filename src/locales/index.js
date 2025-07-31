import { createI18n } from "vue-i18n";
import zhCN from "./zh_CN.js";
import enUS from "./en_US.js";
import koKR from "./ko_KR.js";

const lang = uni.getStorageSync("locale_lang") || "ZH"; //获取缓存中的语言
console.log("语言langlang", lang);
const i18n = createI18n({
  legacy: false,
  locale: lang, // 默认显示语言
  messages: {
    "zh-cn": zhCN,
    ZH: zhCN,
    "en-us": enUS,
    EN: enUS,
    "ko-KR": koKR,
    KR: koKR,
  },
});

export default i18n;
