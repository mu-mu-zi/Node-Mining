
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
      name: "BSC-Test",
      fullName: "Binance Smart Chain",
      // icon: require("src/assets/images/BNB 1.png"),
      chainId: 97,
      node: "https://apis-sj.ankr.com/4819f8b2e4a2491da76b28b9d3aaf96b/c3b85bea4a6b3c020eec29cacb6e5f21/binance/full/test"
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


