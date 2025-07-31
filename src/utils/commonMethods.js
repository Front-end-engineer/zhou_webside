import addressList from "./address";

export default {
  install(app) {
    app.config.globalProperties.$getChainAddress = function (type) {
      let typeObj = addressList;
      return typeObj[type];
    };
  },
};
