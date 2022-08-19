import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Wallet } from 'connectwallet/hooks';

export type IState = {
    selectedWallet?: Wallet
}

const initState: IState = {
    selectedWallet: undefined
};
export const appStoreSlice = createSlice({
    name: "appStore",
    initialState: initState,
    reducers: {
        // setAddress(state, action: PayloadAction<string>){
        //     state.address = action.payload;
        // },
    },
});

// export const { setAddress,setToken,setUserInfo } = appStoreSlice.actions;

export default appStoreSlice.reducer;
