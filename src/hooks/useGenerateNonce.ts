import {useEffectState} from "./useEffectState";
import {useCallback} from "react";
import { awaitWrap } from "utils/tools";
import { signString } from "connectwallet/walletTools";
import { generateNonce } from "http/api";
import useRedux from "./useRedux";
// import {awaitWrap} from "../common/utilTools";
// import {generateNonce} from "../ajax/auth/auth";
// import {ISignatrua, signString} from "../contract/wallet";
// import useRedux from "./useRedux";

export interface ISignatrua {
  origin: string
  signatrue: string
}

export function useGenerateNonce() {
  const { store } = useRedux();
  const state = useEffectState({
    loading: false
  });

  async function getGenerateNonce(address: string, provider: any): Promise<ISignatrua> {
    return new Promise(async (resolve, reject) => {
      if (!address || state.loading || !store.walletInfo  || !provider) {
        reject();
        return ;
      }
      state.loading = true;
      const [nonceInfo, error] = await awaitWrap(generateNonce(address));
      if (nonceInfo) {
        const [signData, error] = await awaitWrap(signString(nonceInfo.data.nonce, address, provider.provider));
        if (signData) {
          resolve(signData);
        } else {
          console.error(error);
          reject();
        }
      } else {
        console.log("error", error);
        reject();
      }
      state.loading = false;
    });
  }

  return {
    loading: state.loading,
    getGenerateNonce
  }
}
