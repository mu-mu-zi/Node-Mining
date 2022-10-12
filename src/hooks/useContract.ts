import { useMemo } from "react";
// import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useWeb3React } from "@web3-react/core";
import { JsonRpcSigner, Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
import { AddressZero } from "@ethersproject/constants";
// import { Contract } from "@ethersproject/contracts";
import { getAddress } from "@ethersproject/address";
import { Contract } from "ethers";
import { PledgeGeta, PledgePair, TgeMarket } from "ABI/types";
import { USDT } from "ABI/types";
import { EthBuy } from "ABI/types";
import { PledgeGetaPool } from "ABI/types";
import { PledgeLpPool } from "ABI/types";
import { ContractAddresses, PledgeContract } from "utils/ContractAddresses";
import TgeMarket_ABI from "ABI/TgeMarket.json"
import USDT_ABI from "ABI/USDT.json"
import EthBuy_ABI from "ABI/EthBuy.json"
import PledgeGetaPool_ABI from "ABI/PledgeGetaPool.json"
import PledgeGeta_ABI from "ABI/PledgeGeta.json"
import PledgeLpPool_ABI from "ABI/PledgeLpPool.json"
import PledgePair_ABI from "ABI/PledgePair.json"
import useWalletTools from "./useWalletTools";


function getSigner(library: JsonRpcProvider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

function getProviderOrSigner(library: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  // const {provider, account, chainId} = useWeb3React()
  const { accounts, chainId, provider} = useWalletTools()
  let account = accounts && accounts[0]
  return useMemo(() => {
    if (!address || !ABI || !provider || !chainId) return null
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      return null
    }
  }, [address, ABI, provider, chainId, withSignerIfPossible, account]) as T
}


export function getContract(address: string, ABI: any, provider: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(provider, account));
}

export function useTgeMarket(withSignerIfPossible?:boolean) {
  return useContract<TgeMarket>(ContractAddresses.TgeMarket, TgeMarket_ABI, withSignerIfPossible)
}

export function useUsdt(withSignerIfPossible?:boolean) {
  return useContract<USDT>(ContractAddresses.Usdt, USDT_ABI, withSignerIfPossible)
}

export function useEthBuy(withSignerIfPossible?:boolean) {
  return useContract<EthBuy>( ContractAddresses.EthTgeMarket, EthBuy_ABI, withSignerIfPossible)
}

export function useEthUsdt(withSignerIfPossible?:boolean) {
  return useContract<USDT>( ContractAddresses.EthUsdt, USDT_ABI, withSignerIfPossible)
}

export function usePledgeGeta(withSignerIfPossible?:boolean) {
  return useContract<PledgeGeta>(PledgeContract.Geta, PledgeGeta_ABI, withSignerIfPossible)
}

export function usePledgeGetaPool(withSignerIfPossible?:boolean) {
  return useContract<PledgeGetaPool>(PledgeContract.GetaPool, PledgeGetaPool_ABI, withSignerIfPossible)
}

export function usePledgeLpPool(withSignerIfPossible?:boolean) {
  return useContract<PledgeLpPool>(PledgeContract.LpPool, PledgeLpPool_ABI, withSignerIfPossible)
}

export function usePair(withSignerIfPossible?:boolean) {
  return useContract<PledgePair>(PledgeContract.Pair, PledgePair_ABI, withSignerIfPossible)
}

