
import {CSSProperties} from "react";
import { injected ,injectedHooks, bitKeep, bitKeepHooks } from "./hooks";

export type IWallet = {
    name: string
    icon: string
    style: CSSProperties
    download: string
    keyword: string
    hooks: any
    connector?: any
}

export const getWalletInfoByName = function(name: string | null):IWallet | null {
  let walletInfo: IWallet | null = null 
  Object.values(WALLETS).forEach((item) => {
    if(item.name === name) {
      walletInfo = item 
    }
  })
  return walletInfo
}

export const CHAINS = {
  BSC: {
      name: "BSC",
      chainName: "Binance Smart Chain",
      nativeCurrency: {
        decimals: 18,
        name: "BNB",
        symbol: "BNB"
      },
      // icon: require("src/assets/images/BNB 1.png"),
      chainId: 56,
      rpcUrls: "https://bsc-dataseed4.ninicoin.io/"
  },
  ETH: {
      name: "ETH",
      chainName: "Ethereum",
      nativeCurrency: {
        decimals: 18,
        name: "ETH",
        symbol: "ETH"
      },
      // icon: require("src/assets/images/BNB 1.png"),
      chainId: 1,
      rpcUrls: "https://api.mycryptoapi.com/eth"
  }
};

export const WALLETS: {[propsName: string]: IWallet} = {
    MetaMask: {
      name: 'MetaMask',
      icon: require("assets/images/icon_metamask.png"),
      style: {width: "inherit"},
      download: "https://metamask.io/download/",
      keyword: "isMetaMask",
      hooks: injectedHooks,
      connector: injected,
    },
    TokenPocket: {
      name: 'TokenPocket',
      icon: require("assets/images/icon_tokenpocket.png"),
      style: {width: "inherit"},
      download: "https://www.tokenpocket.pro/",
      keyword: "isTokenPocket",
      hooks: injectedHooks,
      // connector: metaMask
      connector: injected,
    },
    // ImToken: {
    //   name: 'ImToken',
    //   icon: require("assets/images/icon_imtoken.png"),
    //   style: {width: "inherit"},
    //   download: "https://token.im/",
    //   keyword: "isImToken",
    //   hooks: injectedHooks,
    //   // connector: metaMask
    //   connector: injected,
    // },
    // MathWallet: {
    //   name: 'MathWallet',
    //   icon: require("assets/images/icon_mathwallet.png"),
    //   style: {width: "inherit"},
    //   download: "https://mathwallet.org/",
    //   keyword: "isMathWallet",
    //   hooks: injectedHooks,
    //   // connector: metaMask
    //   connector: injected,
    // },
    BitKeepWallet: {
      name: 'BitKeepWallet',
      icon: require("assets/images/icon_bitkeepwallet.png"),
      style: {width: "inherit"},
      download: "https://bitkeep.com/download?type=0&theme=light",
      keyword: "isBitKeep",
      hooks: bitKeepHooks,
      // connector: BitKeepConnector
      connector: bitKeep,
    }
};


