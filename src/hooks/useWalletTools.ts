import { WALLETS } from 'connectwallet/config';
import useRedux from './useRedux';
import {useCallback, useMemo} from 'react'

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


  // 获取当前连接组
  const connector = useMemo(() => {
    // to do
    return store.walletInfo?.connector || WALLETS.MetaMask.connector
  },[store.walletInfo])

  const activate = useCallback(async () => {
    let activateOrg = await connector.activate()
    if(activateOrg) {
      console.log(activateOrg)

    }
  },[connector])

  const deactivate = useCallback(() => {
    if (connector?.deactivate) {
        connector.deactivate()
    } else {
        connector.resetState()
    }
  },[connector])



  return {
    chainId: chainId,
    accounts: accounts,
    isActivating,
    isActive,
    provider: provider,
    ENSNames,
    activate,
    deactivate
  }
}