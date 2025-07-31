// const connectWallet = async () => {
//   ElMessageBox.alert("11111111", "提示");
//   return false;
//   try {
//     const loadingInstance = ElLoading.service();
//     const accounts = await ethereum.request({ method: "eth_requestAccounts" });
//     console.log("accounts", accounts);
//     if (accounts && accounts[0]) {
//       const res = await askapi("user/authorizeAddress", "GET", {
//         address: accounts[0],
//       });
//       loadingInstance.close();
//       if (res.code == 1) {
//         let ures = await askapi("user/userInfo", "GET");
//         if (ures.code == 1) {
//           store.UPUSERINFO(ures.data.userinfo);
//         }
//       }
//     } else {
//       loadingInstance.close();
//       ElMessageBox.alert("获取钱包失败！请确保钱包已解锁", "提示");
//     }
//   } catch (error) {
//     ElMessageBox.alert("连接钱包失败！请确保钱包已解锁", "提示", {});
//   }
// };
import { askapi } from "/src/api/userapi";
import { getPinia } from "/src/stores/index";
const store = getPinia();

export async function connectWallet() {
  try {
    const loadingInstance = ElLoading.service();
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if (accounts && accounts[0]) {
      const res = await askapi("user/authorizeAddress", "GET", {
        address: accounts[0],
      });
      console.log("resresresres", res);
      loadingInstance.close();
      if (res.code == 1) {
        let ures = await askapi("user/userInfo", "GET");
        console.log("uresures", ures);
        if (ures.code == 1) {
          store.UPUSERINFO(ures.data.userinfo);
        }
      }
    } else {
      loadingInstance.close();
      ElMessageBox.alert("获取钱包失败！请确保钱包已解锁", "提示");
    }
  } catch (error) {
    console.log("errorerror", error);
    ElMessageBox.alert("连接钱包失败！请确保钱包已解锁", "提示", {});
  }
}

export async function bindWallet() {
  // return new Promise(async (resolve) => {

  // });
  // 检查是否连接了钱包
  if (window.ethereum) {
    console.log("钱包已连接");
    // 请求用户连接钱包（如果需要）
    // window.ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    console.log("未安装钱包");
  }
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  if (accounts && accounts[0]) {
    resolve({ status: true, data: accounts[0] });
  } else {
    resolve({ status: false, data: "连接钱包失败" });
  }
}

export async function switchAccount() {
  try {
    // 更明确的账户切换请求（MetaMask支持）
    const accounts = await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    // 获取最新账户
    const latestAccounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    return latestAccounts[0];
  } catch (error) {
    console.error("切换失败:", error);
    return null;
  }
}
