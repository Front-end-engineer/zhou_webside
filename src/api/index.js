import request from "@/utils/request";

/**
 * 公共接口
 */
export function uploadImg(data) {
  return request({
    url: "/common/upload",
    method: "POST",
    data,
  });
}
export function getHomeConfig(config) {
  return request({
    url: "/config/getHomeConfig",
    method: "GET",
    params: {
      ...config,
    },
  });
}

/**
 * 消息通知相关
 */
export function getNoticeList(params) {
  return request({
    url: "/user/getNoticeList",
    method: "get",
    params: {
      ...params,
    },
  });
}

export function readNotice(params) {
  return request({
    url: "/user/readNotice",
    method: "get",
    params: {
      ...params,
    },
  });
}

/**
 * 登录注册相关
 */
export function register(data) {
  return request({
    url: "/user/register",
    method: "POST",
    data,
  });
}
export function login(data) {
  return request({
    url: "/user/login",
    method: "POST",
    data,
  });
}
export function sendSmsCode(config) {
  return request({
    url: "/sms/send",
    method: "GET",
    params: {
      ...config,
    },
  });
}
export function sendEmsCode(data) {
  return request({
    url: "/ems/send",
    method: "POST",
    data,
  });
}
export function resetpwd(data) {
  return request({
    url: "/user/resetpwd",
    method: "POST",
    data,
  });
}

/**
 * swap
 */

export function getPairsList(params) {
  return request({
    url: "/swap_trading/getPairsList",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getCoinUSDTList(params) {
  return request({
    url: "/swap_trading/getCoinUSDTList",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getCoinPrice(params) {
  return request({
    url: "/swap_trading/getCoinPrice",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getAbsenteeList(params) {
  return request({
    url: "/swap_trading/getAbsenteeList",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function createSwapOrder(data) {
  return request({
    url: "/swap_trading/createOrder",
    method: "POST",
    data,
  });
}
export function getUserAddressList(params) {
  return request({
    url: "/user/getUserAddressList",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getPledgeStatisticsList(params) {
  return request({
    url: "/Pledge/statistics",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getPledgeProductList(params) {
  return request({
    url: "/Pledge/getPledgeProductList",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getPledgeOrderList(params) {
  return request({
    url: "/Pledge/getPledgeOrderList",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getUserInfo(params) {
  return request({
    url: "/user/getUserInfo",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function userInfo(params) {
  return request({
    url: "/user/userInfo",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function buyPledge(data) {
  return request({
    url: "/Pledge/buyPledge",
    method: "POST",
    data,
  });
}
export function earlyRedemption(data) {
  return request({
    url: "/Pledge/earlyRedemption",
    method: "POST",
    data,
  });
}
export function pledgeTokenBefore(params) {
  return request({
    url: "/Pledge/pledgeTokenBefore",
    method: "get",
    params: {
      ...params,
    },
  });
}

/**
 * 新闻
 */
export function getNewsList(params) {
  return request({
    url: "/news/index",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getNewsDetail(params) {
  return request({
    url: "/news/detail",
    method: "get",
    params: {
      ...params,
    },
  });
}

/**
 * 搬砖
 */
export function getBricksPriceList(params) {
  return request({
    url: "/bricks/getPriceList",
    method: "get",
    params: {
      ...params,
    },
  });
}

/**
 * 资金流水列表
 */
export function accountLogList(params) {
  return request({
    url: "/account_log/index",
    method: "get",
    params: {
      ...params,
    },
  });
}

/**
 * 资金流水swap列表
 */
export function getSwapOrderList(params) {
  return request({
    url: "/swap_trading/getOrderList",
    method: "get",
    params: {
      ...params,
    },
  });
}
/**
 * 搬砖列表
 */
export function getBricksOrderList(params) {
  return request({
    url: "/bricks/order_list",
    method: "get",
    params: {
      ...params,
    },
  });
}
/**
 * 用户充值列表
 */
export function getRechargeList(params) {
  return request({
    url: "/Recharge/list",
    method: "get",
    params: {
      ...params,
    },
  });
}
/**
 * 用户站内信息列表
 */
export function getUserMsgList(params) {
  return request({
    url: "/user/getUserMsgList",
    method: "get",
    params: {
      ...params,
    },
  });
}
/**
 * 用户充值列表
 */
export function getWithdrawList(params) {
  return request({
    url: "/withdraw/index",
    method: "get",
    params: {
      ...params,
    },
  });
}

/**
 * 用户绑定银行卡
 */
export function userAddBank(params) {
  return request({
    url: "/user/addBank",
    method: "post",
    params,
  });
}

/**
 * 用户添加钱包地址
 */
export function addUserAddress(params) {
  return request({
    url: "/user/addUserAddress",
    method: "post",
    params,
  });
}

/**
 * 获取区块链列表
 */
export function getChainList(params) {
  return request({
    url: "/user/getChainList",
    method: "get",
    params,
  });
}

/**
 * 获取用户银行卡列表
 */
export function getBankList(params) {
  return request({
    url: "/user/getBankList",
    method: "get",
    params,
  });
}
/**
 * 删除用户收货地址
 */
export function deleteUserAddress(params) {
  return request({
    url: "/user/deleteUserAddress",
    method: "get",
    params,
  });
}

/**
 * 用户提现
 */
export function userWithdraw(params) {
  return request({
    url: "/withdraw/apply",
    method: "post",
    params,
  });
}

/**
 * 活动、签到相关
 */
export function userSign(data) {
  return request({
    url: "/user/UserSign",
    method: "POST",
    data,
  });
}
export function getActivityUserList(params) {
  return request({
    url: "/Activity/getActivityUserList",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getActivityList(params) {
  return request({
    url: "/Activity/getActivityList",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getActivityInfo(params) {
  return request({
    url: "/Activity/getActivityInfo",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getActivityUserInfo(params) {
  return request({
    url: "/Activity/getActivityUserInfo",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function joinActivity(data) {
  return request({
    url: "/Activity/joinActivity",
    method: "POST",
    data,
  });
}

/**
 * 信用借贷
 */
export function apply_quota(data) {
  return request({
    url: "/credit_lending/apply_quota",
    method: "POST",
    data,
  });
}
export function getQuestionsList(params) {
  return request({
    url: "/credit_lending/getQuestionsList",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getAgreementList(params) {
  return request({
    url: "/credit_lending/getAgreementList",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getApplyInfo(params) {
  return request({
    url: "/credit_lending/getApplyInfo",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getCreditLendingList(params) {
  return request({
    url: "/credit_lending/getCreditLendingList",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function get_credit_list(params) {
  return request({
    url: "/credit_lending/get_credit_list",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getCreditState(params) {
  return request({
    url: "/credit_lending/getState",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function sign_contract(data) {
  return request({
    url: "/credit_lending/sign_contract",
    method: "POST",
    data,
  });
}

export function saveSignature(data) {
  return request({
    url: "/user/saveSignature",
    method: "POST",
    data,
  });
}
export function getMaxMinConfig(params) {
  return request({
    url: "/credit_lending/getMaxMinConfig",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function lendingApply(data) {
  return request({
    url: "/credit_lending/apply",
    method: "POST",
    data,
  });
}
export function payBackBefore(params) {
  return request({
    url: "/credit_lending/payBackBefore",
    method: "get",
    params: {
      ...params,
    },
  });
}
export function getCoinList(params) {
  return request({
    url: "/bricks/getCoinList",
    method: "get",
    params: {
      ...params,
    },
  });
}

export function getSignCalendar(params) {
  return request({
    url: "/user/getSignCalendar",
    method: "get",
    params: {
      ...params,
    },
  });
}

export function payBackEarlyApply(params) {
  return request({
    url: "/credit_lending/payBackEarlyApply",
    method: "get",
    params: {
      ...params,
    },
  });
}

export function getPriceList(params) {
  return request({
    url: "/bricks/getPriceList",
    method: "get",
    params: {
      ...params,
    },
  });
}

export function createOrder(params) {
  return request({
    url: "/bricks/createOrder",
    method: "get",
    params: {
      ...params,
    },
  });
}

export function bricksOrderBefore(params) {
  return request({
    url: "/bricks/bricksOrderBefore",
    method: "get",
    params: {
      ...params,
    },
  });
}

export function paymentCallback(params) {
  return request({
    url: "/bricks/paymentCallback",
    method: "get",
    params: {
      ...params,
    },
  });
}

export function getConfig(params) {
  return request({
    url: "/config/getConfig",
    method: "get",
    params: {
      ...params,
    },
  });
}

export function getUserCoinUsdtList(params) {
  return request({
    url: "/user/getCoinUsdtList",
    method: "get",
    params: {
      ...params,
    },
  });
}

export function applyUserLevel(params) {
  return request({
    url: "/user_level/applyUserLevel",
    method: "get",
    params: {
      ...params,
    },
  });
}

export function invitationRewards(params) {
  return request({
    url: "/user/invitationRewards",
    method: "get",
    params: {
      ...params,
    },
  });
}

export function earlyRedemptionDetail(params) {
  return request({
    url: "/pledge/earlyRedemptionDetail",
    method: "get",
    params: {
      ...params,
    },
  });
}
