import {useDispatch, useSelector} from "react-redux";
import { RootState } from "store";
import { useMemo } from 'react'
import { appStoreSlice } from "store/appStoreSlice";
import { IWallet } from "connectwallet/config";


export default function useRedux() {
  const dispatch = useDispatch()
  const store = useSelector((state:RootState) => state.appStore)



  const userDispatch = useMemo(() => {
    return {
      setAddress (address:string) {
        sessionStorage.setItem("wallet_address", address)
        dispatch(appStoreSlice.actions.setAddress(address))
      },
      setToken(token:string) {
        sessionStorage.setItem("token", token)
        dispatch(appStoreSlice.actions.setToken(token))
      },
      setWalletInfo(wallet:IWallet | null) {
        sessionStorage.setItem('wallet_name', wallet?.name || "")
        dispatch(appStoreSlice.actions.setWalletInfo(wallet))
      }
    }
  },[])

  return { store, userDispatch }

}