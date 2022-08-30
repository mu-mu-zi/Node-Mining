import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useMemo } from 'react'
import { appStoreSlice } from "store/appStoreSlice";
import { IWallet } from "connectwallet/config";
import { CoinList } from "http/api";


export default function useRedux() {
  const store = useSelector((state: RootState) => state.appStore)
  const dispatch = useDispatch()

  const userDispatch = useMemo(() => {
    return {
      setAddress(address: string | null) {
        sessionStorage.setItem("wallet_address", address || "")
        dispatch(appStoreSlice.actions.setAddress(address))
      },
      setToken(token: string | null) {
        sessionStorage.setItem("token", token || "")
        dispatch(appStoreSlice.actions.setToken(token))
      },
      setWalletInfo(wallet: IWallet | null) {
        sessionStorage.setItem('wallet_name', wallet?.name || "")
        dispatch(appStoreSlice.actions.setWalletInfo(wallet))
      },
      setCoins(coins: CoinList[] | undefined) {
        dispatch(appStoreSlice.actions.setCoins(coins))
      },
      logout(): void {
        this.setToken(null);
        this.setAddress("");
        // this.clearUserInfo();
        sessionStorage.removeItem('wallet_name');
        sessionStorage.removeItem('token');
      }
    }
  }, [])

return { store, userDispatch }

}