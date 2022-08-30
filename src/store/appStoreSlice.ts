import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getWalletInfoByName, IWallet } from 'connectwallet/config';
import { Wallet } from 'connectwallet/hooks';
import { CoinList } from 'http/api';



export type IState = {
    selectedWallet?: Wallet,
    address: string | null,
    token: string | null,
    walletInfo: IWallet | null,
    coins: CoinList[] | undefined
}

const initState: IState = {
    selectedWallet: undefined,
    address: sessionStorage.getItem("wallet_address"),
    token: sessionStorage.getItem("token"),
    walletInfo: getWalletInfoByName(sessionStorage.getItem("wallet_name")),
    coins: undefined
};
export const appStoreSlice = createSlice({
    name: "appStore",
    initialState: initState,
    reducers: {
        // setAddress(state, action: PayloadAction<string>){
        //     state.address = action.payload;
        // },
        setAddress(state,action) {
            state.address = action.payload
        },
        setToken(state,action) {
            state.token = action.payload
        },
        setWalletInfo(state,action) {
            state.walletInfo = action.payload
        },
        setCoins(state,action) {
            state.coins = action.payload
        }
    },
});

// export const { setAddress,setToken,setWalletInfo } = appStoreSlice.actions;

export default appStoreSlice.reducer;
