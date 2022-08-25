
import {CSSProperties} from "react";
import { injected } from "./hooks";

export type IWallet = {
    name: string
    icon: string
    style: CSSProperties
    download: string
    keyword: string
    // hooks: any
    connector?: any
}
export const WALLETS: {[propsName: string]: IWallet} = {
    MetaMask: {
      name: 'MetaMask',
      icon: require("assets/images/icon_metamask.png"),
      style: {width: "inherit"},
      download: "https://metamask.io/download/",
      keyword: "isMetaMask",
      // hooks: metaMaskHooks,
      connector: injected,
    },
    TokenPocket: {
      name: 'TokenPocket',
      icon: require("assets/images/icon_tokenpocket.png"),
      style: {width: "inherit"},
      download: "https://www.tokenpocket.pro/",
      keyword: "isTokenPocket",
      // hooks: metaMaskHooks,
      // connector: metaMask
      connector: injected,
    },
    ImToken: {
      name: 'ImToken',
      icon: require("assets/images/icon_imtoken.png"),
      style: {width: "inherit"},
      download: "https://token.im/",
      keyword: "isImToken",
      // hooks: metaMaskHooks,
      // connector: metaMask
      connector: injected,
    },
    MathWalletask: {
      name: 'MathWallet',
      icon: require("assets/images/icon_mathwallet.png"),
      style: {width: "inherit"},
      download: "https://mathwallet.org/",
      keyword: "isMathWallet",
      // hooks: metaMaskHooks,
      // connector: metaMask
      connector: injected,
    },
    BitKeepWallet: {
      name: 'BitKeepWallet',
      icon: require("assets/images/icon_bitkeepwallet.png"),
      style: {width: "inherit"},
      download: "https://www.bnbchain.org/en/binance-wallet",
      keyword: "isBitKeepWallet",
      // hooks: null,
      // connector: bscConnector
      connector: injected,
    }
};
