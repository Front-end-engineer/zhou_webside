import { createApp } from "vue";
import TipDialog from "./TipDialog.vue";

let Instance;
let mountNode;
export default {
  show(option = {}) {
    // #ifdef WEB
    if (!Instance) {
      mountNode = document.createElement("div");
      // mountNode.classList.add("u-elem-modal");
      // 创建vue实例
      Instance = createApp(TipDialog, {
        ...option,
      });
      const app = document.getElementById("app");
      // 将 mountNode 添加到 DOM 中
      app.appendChild(mountNode);
      Instance.mount(mountNode);
    }
    Instance._instance.exposed.open({ ...option });
    // #endif

    // #ifdef APP-PLUS
    // stringify会让原来函数的作用域失效
    // const jsonString = JSON.stringify(option, (key, value) => {
    //   // 单独处理序列化中函数
    //   if (typeof value === "function") {
    //     return value.toString();
    //   }
    //   return value;
    // });

    uni.navigateTo({
      url: `/components/UPopup/TipPopup`,
      success: function (res) {
        // 通过 eventChannel 向目标页面发送参数
        res.eventChannel.emit("sendParams", option);
      },
    });
    // #endif
  },
  hide() {
    // #ifdef WEB
    Instance._instance.exposed.close();
    Instance = null; // 清理实例引用
    mountNode = null; // 清理 DOM 引用
    // #endif

    // #ifdef APP-PLUS
    uni.navigateBack();
    // #endif
  },
};
