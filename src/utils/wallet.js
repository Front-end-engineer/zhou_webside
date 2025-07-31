import { onMounted, onUnmounted } from "vue";
import { ethers } from "ethers";
import { ElMessage } from "element-plus";

let provider = null; // ethers 提供的 provider（用于以太坊系链）
let signer = null; // 当前钱包签名者（可用于合约交互）
let currentChain = null; // 当前连接的链
let isOpenListeners = false; // 是否已注册钱包事件监听器

// ====== 支持的网络（仅用于快速判断）======
const NETWORKS = {
  eth: { chainId: "0x1" }, // Ethereum 主网
  // eth: { chainId: "0x5" }, // Ethereum 测试网
  // bsc: { chainId: "0x38" }, // BSC 主网
  bsc: { chainId: "0x61" }, // BSC 测试网
};

// ====== 主网详细参数（用于添加新链）======
const CHAIN_PARAMS = {
  bsc: {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    blockExplorerUrls: ["https://bscscan.com"],
  },
  eth: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    blockExplorerUrls: ["https://etherscan.io"],
  },
};

const ERC20_ABI = [
  // 核心功能方法
  {
    constant: true,
    inputs: [{ name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },

  // 转账功能（核心方法）
  {
    constant: false,
    inputs: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },

  // 授权功能
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },

  // 事件定义（用于监听转账和授权）
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
];

// ====== Tron 相关辅助函数 ======

// 判断是否已连接 Tron 钱包
const isTronConnected = () => {
  return !!(window.tronWeb && window.tronWeb.defaultAddress.base58);
};

// 等待 TronLink 注入完成（适配异步注入场景）
const waitForTronWeb = (timeout = 10000) =>
  new Promise((resolve, reject) => {
    const start = Date.now();
    const timer = setInterval(() => {
      if (isTronConnected()) {
        clearInterval(timer);
        resolve(true);
      } else if (Date.now() - start > timeout) {
        clearInterval(timer);
        reject(new Error("TronLink 未就绪或未登录"));
      }
    }, 100);
  });

// ====== EVM 链处理函数 ======

// 判断当前是否连接钱包（针对 MetaMask）
const isWalletConnected = async () => {
  if (!window.ethereum) return false;
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  return accounts.length > 0;
};

// 获取当前连接的链（eth / bsc）
const getCurrentChain = async () => {
  provider = new ethers.BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();
  console.log("network.chainId======", network.chainId);
  const chainIdHex = "0x" + network.chainId.toString(16);
  return Object.keys(NETWORKS).find(
    (key) => NETWORKS[key].chainId.toLowerCase() === chainIdHex.toLowerCase()
  );
};

// =================================================

import { TronWeb } from "tronweb";

// 初始化 TronWeb 实例（Node.js 环境）
const tronWeb = new TronWeb({
  fullNode: "https://api.trongrid.io",
  solidityNode: "https://api.trongrid.io",
  eventServer: "https://api.trongrid.io",
});
/**
 * 获取 TRC-20 代币余额
 * @param {string} tokenAddress - TRC-20 代币合约地址
 * @param {string} walletAddress - 用户钱包地址（可选，若不传则使用默认地址）
 */
async function getTronTokenBalance(tokenAddress, walletAddress = null) {
  try {
    //  检查是否已连接钱包
    if (typeof window === "undefined" || !window.tronWeb) {
      throw new Error("TronLink 未安装或未连接");
    }

    const tronWeb = window.tronWeb;

    if (!tronWeb.ready) {
      throw new Error("TronLink 钱包未解锁或未准备好");
    }

    //  检查 tokenAddress 是否合法
    if (!tronWeb.isAddress(tokenAddress)) {
      throw new Error("无效的代币合约地址");
    }

    // 如果未传入 walletAddress，则使用默认地址
    if (!walletAddress) {
      walletAddress = tronWeb.defaultAddress.base58;
    }

    // 再次检查钱包地址是否有效
    if (!tronWeb.isAddress(walletAddress)) {
      throw new Error("无效的钱包地址");
    }

    // 创建合约实例
    const contract = await tronWeb.contract().at(tokenAddress);

    // 调用 balanceOf 方法获取余额
    const balanceBigNumber = await contract.balanceOf(walletAddress).call();

    // 获取代币小数位数（decimals）
    let decimals = 6; // 默认值防错
    try {
      decimals = await contract.decimals().call();
    } catch (e) {
      console.warn("无法获取 decimals，默认使用 6");
    }

    // 格式化余额
    const balanceFormatted =
      balanceBigNumber.toNumber() / Math.pow(10, decimals);

    console.log(`代币 ${tokenAddress} 的余额为: ${balanceFormatted}`);

    // return balanceFormatted;
    return {
      // raw: balanceRaw.toString(),
      formatted: balanceFormatted,
      // symbol: symbol.toString(),
    };
  } catch (err) {
    console.error("获取 TRC-20 代币余额失败:", err);
    throw err;
  }
}

// =================================================

/**
 * 查询指定地址的代币余额
 * @param {string} tokenAddress - 代币合约地址
 * @param {string} [walletAddress] - 要查询的钱包地址（默认当前 signer 地址）
 * @returns {Promise<{ raw: string, formatted: string, symbol: string }>}
 */
const getTokenBalance = async (tokenAddress, walletAddress = null) => {
  if (!provider || !signer) {
    getPinia().setWalletInfo({});
    ElMessage.error("钱包未连接");
    throw new Error("钱包未连接");
  }

  try {
    const address = walletAddress || (await signer.getAddress());
    const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const [balanceRaw, decimals, symbol] = await Promise.all([
      erc20.balanceOf(address),
      erc20.decimals(),
      erc20.symbol(),
    ]);

    const formatted = ethers.formatUnits(balanceRaw, decimals);
    return {
      raw: balanceRaw.toString(),
      formatted,
      symbol,
    };
  } catch (err) {
    console.error("获取代币余额失败:", err);
    throw err;
  }
};

/**
 * 转账主币（ETH / BNB）
 * @param {string} to 接收地址
 * @param {string|number} amount 转账金额（单位：主币）
 * @returns {Promise<string>} 返回交易哈希
 */
const transferNativeToken = async (to, amount) => {
  if (!signer || !currentChain) {
    getPinia().setWalletInfo({});
    throw new Error("钱包未连接或 signer 未就绪");
  }

  try {
    // 格式化金额为 wei（使用 ethers 内置工具）
    const value = ethers.parseEther(amount.toString());

    // 构建交易对象
    const tx = await signer.sendTransaction({
      to,
      value,
    });

    console.log(`主币转账已发出，交易哈希: ${tx.hash}`);
    return tx.hash;
  } catch (err) {
    console.error("主币转账失败:", err);
    throw err;
  }
};

/**
 * 转账 ERC20 代币
 * @param {string} tokenAddress - 代币合约地址
 * @param {string} to - 接收地址
 * @param {string|number} amount - 转账金额（单位：token）
 * @returns {Promise<string>} 返回交易哈希
 */
const transferToken = async (tokenAddress, to, amount, contractAbi) => {
  if (!signer) throw new Error("钱包未连接或 signer 未就绪");

  try {
    const erc20 = new ethers.Contract(
      tokenAddress,
      JSON.parse(contractAbi),
      signer
    );
    const decimals = await erc20.decimals();
    const value = ethers.parseUnits(amount.toString(), decimals);

    // 添加检查
    const balance = await erc20.balanceOf(signer.address);
    if (balance < value) {
      ElMessage.error(`余额不足`);
      throw new Error(`余额不足`);
    }

    // 添加gas参数
    const tx = await erc20.transfer(to, value, {
      gasLimit: 100000, // USDT转账通常需要较高的gas limit
    });

    console.log("代币转账已发出，交易哈希:", tx.hash);
    return tx.hash;
  } catch (err) {
    console.error("代币转账失败:", err);
    throw new Error(err);
  }
};

// =====================================

/**
 * TRON 链上 TRC-20 代币转账函数
 * @param {string} tokenAddress - TRC-20 代币合约地址
 * @param {string} toAddress - 接收方地址
 * @param {number|string} amount - 转账金额（原生单位，例如 USDT: 1 USDT = 1e6 滴）
 */
async function transferTronToken(tokenAddress, toAddress, amount) {
  console.log(tokenAddress, toAddress, amount);
  try {
    if (!window.tronWeb || !window.tronWeb.ready) {
      throw new Error("TronLink 未连接或未解锁");
    }

    const tronWeb = window.tronWeb;

    // 地址转换：支持 0x 开头地址
    let toAddressHex = toAddress;
    if (toAddress.startsWith("0x")) {
      toAddressHex = tronWeb.address.toHex(toAddress);
    }

    // 创建 TRON 合约实例
    const contract = await tronWeb.contract().at(tokenAddress);

    // 获取 decimals
    let decimals = 6;
    try {
      decimals = await contract.decimals().call();
    } catch (e) {
      console.warn("无法获取 decimals，默认使用 6");
    }

    // 安全计算金额（使用字符串 + BigNumber）
    const amountBN = tronWeb.toBigNumber(amount.toString());
    const decimalsBN = tronWeb.toBigNumber(10).pow(decimals);
    const amountInBaseUnit = amountBN.multipliedBy(decimalsBN);

    // 验证类型
    console.log(
      "amountInBaseUnit constructor:",
      amountInBaseUnit.constructor.name
    );
    console.log(
      "isInstanceOf tronWeb.BigNumber:",
      amountInBaseUnit instanceof tronWeb.BigNumber
    );

    console.log(amountInBaseUnit.toString());

    // 发起转账（直接传 BigNumber）
    const transaction = await contract
      .transfer(toAddressHex, amountInBaseUnit.toString())
      .send();

    console.log("TRC-20 代币转账成功，交易哈希:", transaction.txID);
    return transaction;
  } catch (err) {
    ElMessage.error(err.message);
    console.error("TRC-20 代币转账失败:", err.message || err);
    throw err;
  }
}

// =====================================

// 更新用户钱包信息（链、地址、余额）
const updateWalletInfo = async () => {
  try {
    // if (!provider)
    const pro = new ethers.BrowserProvider(window.ethereum);
    const sig = await pro.getSigner();
    const address = await sig.getAddress();
    const balanceRaw = await pro.getBalance(address);
    console.log(balanceRaw, "balanceRaw");
    const balance = ethers.formatEther(balanceRaw);
    currentChain = await getCurrentChain();

    provider = pro;
    signer = sig;

    if (!currentChain) {
      disconnectWallet();
      return;
    }

    getPinia().setWalletInfo({
      connected: true,
      chain: currentChain,
      chainId: currentChain === "eth" ? 1 : currentChain === "bsc" ? 97 : null,
      address,
      balance: `${balance} ${currentChain === "eth" ? "ETH" : "BNB"}`,
    });
  } catch (err) {
    console.error("更新钱包信息失败:", err);
  }
};

// 主入口：连接钱包（支持 eth / bsc / tron）
const connectWallet = async (chain) => {
  try {
    if (chain === "eth" || chain === "bsc") {
      // 如果未安装钱包
      if (!window.ethereum) return alert("请安装钱包插件或在钱包中打开");

      const current = await getCurrentChain();
      if (chain !== current) {
        try {
          // 尝试切换到目标链
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: NETWORKS[chain].chainId }],
          });
          provider = new ethers.BrowserProvider(window.ethereum);
        } catch (switchErr) {
          // 如果链尚未添加到钱包，尝试添加
          if (switchErr.code === 4902 && CHAIN_PARAMS[chain]) {
            CHAIN_PARAMS[chain].rpcUrls[0] = getPinia().chainList.find(
              (item) =>
                "0x" + item.chain_id.toString(16) === NETWORKS[chain].chainId
            )?.rpc_node;
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [CHAIN_PARAMS[chain]],
            });
          } else {
            throw switchErr;
          }
        }
      }

      provider = new ethers.BrowserProvider(window.ethereum);
      // 主动请求授权
      if (!(await isWalletConnected())) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      }

      await updateWalletInfo();
      registerListeners();

      if (chain !== current) {
        // window.location.reload();
      }
    } else if (chain === "tron") {
      await connectTron(chain);
    } else {
      alert(`不支持的链: ${chain}`);
    }
  } catch (error) {
    console.error("连接钱包失败:", error);
    alert("连接钱包失败");
  }
};

// Tron 钱包连接逻辑（支持自动授权）
const connectTron = async (chain) => {
  try {
    // 新版 TronLink 授权方法（不加会导致未授权）
    if (window.tronLink?.request) {
      await window.tronLink.request({ method: "tron_requestAccounts" });
    }

    await waitForTronWeb(); // 等待注入完成

    const address = window.tronWeb.defaultAddress.base58;
    const balance = await window.tronWeb.trx.getBalance(address);

    if (
      tronWeb.fullNode.host === "https://api.trongrid.io" &&
      getPinia().walletInfo.chain !== "tron"
    ) {
      console.log("Connected to Tron MainNet");
      setTimeout(() => {
        // window.location.reload();
      }, 500);
    } else if (
      tronWeb.fullNode.host === "https://api.shasta.trongrid.io" &&
      getPinia().walletInfo.chain !== "tron"
    ) {
      console.log("Connected to Tron Shasta TestNet");
      setTimeout(() => {
        // window.location.reload();
      }, 500);
    }
    getPinia().setWalletInfo({
      connected: true,
      chain: "tron",
      chainId: 728126428,
      address,
      balance: `${balance / 1e6} TRX`,
    });

    console.log("Tron 钱包已连接:", address);
  } catch (err) {
    console.error("连接 Tron 失败:", err);
    alert("连接 Tron 失败");
  }
};

// ====== 钱包事件监听器 ======

// EVM 钱包账户切换事件
const handleAccountsChanged = async (accounts) => {
  if (accounts.length === 0) {
    disconnectWallet();
  } else {
    await updateWalletInfo();
  }
};

// EVM 网络切换事件
const handleChainChanged = async () => {
  provider = new ethers.BrowserProvider(window.ethereum);
  await updateWalletInfo();
  const walletInfo = getPinia().walletInfo;
  if (!walletInfo.chain) {
    // ElMessage.error("链未连接！");
    ElMessageBox.alert("链未连接！");
    return;
  }
  // window.location.reload();
};

// Tron 钱包账户变化监听（通过 window message 接收）
const handleTronAccountsChanged = async (event) => {
  const { message } = event.data || {};
  if (message?.action === "accountsChanged") {
    if (isTronConnected()) {
      const address = window.tronWeb.defaultAddress.base58;
      const balance = await window.tronWeb.trx.getBalance(address);
      getPinia().setWalletInfo({
        connected: true,
        chain: "tron",
        chainId: 728126428,
        address,
        balance: `${balance / 1e6} TRX`,
      });
    } else {
      disconnectWallet();
    }
  } else if (message?.action === "connect") {
    await connectWallet("tron");
  } else if (message?.action === "disconnect") {
    disconnectWallet();
  }
};

// 注册钱包事件监听器（EVM + Tron）
const registerListeners = () => {
  if (isOpenListeners) return;

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
  }

  window.addEventListener("message", handleTronAccountsChanged);
  isOpenListeners = true;
};

// 注销事件监听器（组件卸载时调用）
const unregisterListeners = () => {
  if (!isOpenListeners) return;

  if (window.ethereum) {
    window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    window.ethereum.removeListener("chainChanged", handleChainChanged);
  }

  window.removeEventListener("message", handleTronAccountsChanged);
  isOpenListeners = false;
};

// ====== 断开连接函数 ======
const disconnectWallet = () => {
  getPinia().setWalletInfo({
    connected: false,
    chainId: null,
    chain: null,
    address: null,
    balance: null,
  });
  console.log("钱包已断开");
};

// ====== Vue 生命周期 Hook（自动连接 + 监听）======
const useWalletListeners = () => {
  onMounted(async () => {
    registerListeners(); // 注册监听事件

    const walletInfo = getPinia().walletInfo;
    console.log(walletInfo);

    // EVM 自动连接
    if (window.ethereum) {
      const connected = await isWalletConnected();
      if (isTronConnected() && walletInfo.chain == "tron") {
        // Tron 自动连接
        await connectWallet("tron");
      } else if (connected) {
        const current = await getCurrentChain();
        signer = await provider.getSigner();
        if (current) await connectWallet(current);
      }
    }
  });

  onUnmounted(() => {
    unregisterListeners(); // 页面卸载时移除监听
  });
};

export default {
  connectWallet,
  disconnectWallet,
  useWalletListeners,
  getTronTokenBalance,
  getTokenBalance,
  transferTronToken,
  transferToken,
};
