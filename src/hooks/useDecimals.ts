import { CHAINS } from 'connectwallet/config';
import { useContext, useState, useEffect } from 'react'
import useWalletTools from './useWalletTools';

const useDecimals = () => {
  const [decimals, setDecimals] = useState<number>(0)
  const { chainId } = useWalletTools()
  useEffect(() => {
    if (chainId === CHAINS.ETH.chainId) {
      setDecimals(6)
    }
    if (chainId === CHAINS.BSC.chainId) {
      setDecimals(18)
    }
  }, [chainId])
  return { decimals }
}

export default useDecimals
