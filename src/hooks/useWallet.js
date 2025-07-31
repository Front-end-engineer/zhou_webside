import { computed } from "vue";
import * as allChains from "viem/chains";
import { useAccount } from "@wagmi/vue";

export const useWallet = () => {
  const supportedChains = Object.values(allChains);

  // 链id
  const { chainId } = useAccount();

  // 当前链信息
  const currentChain = computed(() => {
    if (!chainId.value) return null;
    return supportedChains.find((chain) => chain.id === chainId.value);
  });

  // 直接获取链名
  const chainName = computed(() => currentChain.value?.name || "未知网络");

  return {
    allChains,
    chainId,
    chainName,
    currentChain,
  };
};
