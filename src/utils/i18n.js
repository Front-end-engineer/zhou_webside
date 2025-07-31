import { createI18n } from "vue-i18n";
import en from "../locales/en_US.js";
import zh from "../locales/zh_CN.js";
import ko from "../locales/ko_KR.js";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, zh, ko },
});

export default i18n;
