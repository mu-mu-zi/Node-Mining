import { WALLETS } from 'connectwallet/config';
import useRedux from './useRedux';
import {useCallback, useEffect, useMemo} from 'react'
import { useEffectState } from './useEffectState';

export default function useWalletTools() {
  const { store } = useRedux()

  // 获取当前连接信息
  const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames
  } = store.walletInfo?.hooks || WALLETS.MetaMask.hooks

  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const state = useEffectState({
    chainId: null as (number | null),
    accounts: undefined as (string[] | undefined),
    provider: null as any
  });

  useEffect(() => {
    if (store.walletInfo && !store.walletInfo.hooks) {
        activate();
        addEventListen();
    }
}, [store.walletInfo]);

  // 获取当前连接组
  const connector = useMemo(() => {
    // to do
    console.log('walletInfo',store.walletInfo)
    return store.walletInfo?.connector || WALLETS.MetaMask.connector
  },[store.walletInfo])

  const activate = useCallback(async () => {
    let result 
    console.log('connector',connector)
    // if(connector.activate) {
      result = await connector.activate()


    console.log('result', result)
    if (result) {
      console.log('result', result)
      state.provider = {provider: result.provider};
      state.chainId = parseInt(result.provider.chainId);
      state.accounts = [result.account];
    }

  },[connector])

  const deactivate = useCallback(() => {
    if (connector?.deactivate) {
        connector.deactivate()
    } else {
        connector.resetState()
    }
    if(store.walletInfo && !store.walletInfo.hooks) {
      state.provider = null;
      state.chainId = null;
      state.accounts = [];
    }
  },[connector])

  function addEventListen() {

    if (window.BinanceChain) {
      window.BinanceChain.on("chainChanged", handleChainChanged);
      window.BinanceChain.on("accountsChanged", handleAccountsChanged);
    }
  }
function handleAccountsChanged(account: string) {
  state.accounts = [account];
}

function handleChainChanged(chainId: string | number) {
  if (typeof chainId === "number") {
      state.chainId = chainId
  } else {
    state.chainId = chainId === "Binance-Chain-Tigris" ? 56 : 97;
  }
}



  return {
    chainId: store.walletInfo?.hooks ? chainId: state.chainId,
    accounts: store.walletInfo?.hooks ? accounts: state.accounts,
    isActivating,
    isActive,
    provider: store.walletInfo?.hooks ? provider: state.provider,
    ENSNames,
    activate,
    deactivate
  }
}