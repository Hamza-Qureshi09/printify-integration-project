import { createContext, useContext, useRef, useState } from "react";
import { WagmiConfig } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import wagmiConfig, { chains } from "@/lib/wagmi";

createWeb3Modal({
  wagmiConfig,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains,
  themeVariables: {
    "--w3m-accent": "#FFBB00",
  },
});

export const GlobalInfo = createContext();

export function useGlobalInfoProvider() {
  return useContext(GlobalInfo);
}
export function GlobalInformation({ children }) {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const roadmapRef = useRef(null);
  const merchandiseRef = useRef(null);
  const teamRef = useRef(null);
  const theBlockRef = useRef(null);

  const value = {
    homeRef,
    aboutRef,
    roadmapRef,
    merchandiseRef,
    teamRef,
    theBlockRef,
  };

  return (
    <GlobalInfo.Provider value={value}>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </GlobalInfo.Provider>
  );
}
