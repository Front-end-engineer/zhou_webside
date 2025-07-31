import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPersistedState from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPersistedState);
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import i18n from "./locales";
import Slideout from "@hyjiacan/vue-slideout";
import "@hyjiacan/vue-slideout/dist/slideout.css";
import "element-plus/dist/index.css";
// import "lib-flexible/flexible.js"
import "amfe-flexible";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./styles/domstyle.css";
import "./styles/animation.scss";
import "./styles/test1.css";
import "./styles/test2.css";
import "./styles/test3.css";
import "./styles/test4.css";
import "./styles/test5.css";

import GlobalMethodsPlugin from "./utils/commonMethods";

// import { componentPlugin } from "./components";
// .use(componentPlugin)

const queryClient = new QueryClient();
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app
  .use(VueQueryPlugin)
  .use(Slideout, {})
  .use(i18n)
  .use(pinia)
  .use(GlobalMethodsPlugin)
  .mount("#app");
