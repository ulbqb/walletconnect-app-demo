import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { Web3ModalButtons } from "../components/Web3ModalButtons";
import { WagmiTests } from "../components/Wagmi/WagmiTests";
import { ThemeStore } from "../utils/StoreUtil";
import { ConstantsUtil } from "../utils/ConstantsUtil";
import { WagmiModalInfo } from "../components/Wagmi/WagmiModalInfo";
import { klaytnBaobab } from "wagmi/chains";
import { miniWallet } from "../utils/ConnectorUtil";
import { walletConnect } from "wagmi/connectors";

const queryClient = new QueryClient();

const connectors = [
  miniWallet({
    projectId: ConstantsUtil.ProjectId,
    metadata: {
      name: "WalletConnect App Demo",
      description: "WalletConnect App Demo",
      url: "https://walletconnect-app-demo.vercel.app",
      icons: [
        "https://developers.line.biz/assets/img/icons/docs/light/hover/liff.svg",
      ],
    },
    showQrModal: false,
  }),
  walletConnect({
    projectId: ConstantsUtil.ProjectId,
    metadata: {
      name: "WalletConnect App Demo",
      description: "WalletConnect App Demo",
      url: "https://walletconnect-app-demo.vercel.app",
      icons: [
        "https://developers.line.biz/assets/img/icons/docs/light/hover/liff.svg",
      ],
    },
    showQrModal: false,
  }),
];

const wagmiConfig = createConfig({
  chains: [klaytnBaobab],
  connectors,
  transports: {
    1001: http(),
  },
  multiInjectedProviderDiscovery: false,
});

const modal = createWeb3Modal({
  wagmiConfig,
  projectId: ConstantsUtil.ProjectId,
  enableAnalytics: true,
  metadata: ConstantsUtil.Metadata,
  termsConditionsUrl: "https://walletconnect.com/terms",
  privacyPolicyUrl: "https://walletconnect.com/privacy",
});

ThemeStore.setModal(modal);

export default function Wagmi() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready ? (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Web3ModalButtons />
        <WagmiModalInfo />
        <WagmiTests />
      </QueryClientProvider>
    </WagmiProvider>
  ) : null;
}
