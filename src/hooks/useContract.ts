import { useMemo } from "react";
// import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import {useWeb3React} from "@web3-react/core";
import { JsonRpcSigner, Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
import { AddressZero } from "@ethersproject/constants";
// import { Contract } from "@ethersproject/contracts";
import { getAddress } from "@ethersproject/address";
import {Contract} from "ethers";
import {TgeMarket} from "ABI/types";
import {USDT} from "ABI/types";
import { ContractAddresses } from "utils/ContractAddresses";
import TgeMarket_ABI from "ABI/TgeMarket.json" 
import USDT_ABI from "ABI/USDT.json" 
import useWalletTools from "./useWalletTools";
// export const useExampleContract = (address: string, withSignerIfPossible = true) => {
//   return useContract(address, ContractAbi, withSignerIfPossible);
// };

// Multiple chains

// export const useBatchTransfer = (withSignerIfPossible?: boolean) => {
//   const { chainId } = useActiveWeb3React();
//   return useContract(getContractAddress(chainId), ContractAbi, withSignerIfPossible);
// };

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

// export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
//   const { provider, account } = useWeb3React();
//   return useMemo(() => {
//     if (!address || address === AddressZero || !ABI || !provider) return null;
//     try {
//       return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined);
//     } catch (error) {
//       console.error("Failed to get contract", error);
//       return null;
//     }
//   }, [address, ABI, provider, withSignerIfPossible, account]);
// }

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
