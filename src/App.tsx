import React, { useEffect, useState } from 'react';
import Routers from 'router/router';
import Header from 'components/Header';
import { Column } from 'components/BaseElement/Column';
import Footer from 'components/Footer';
import styled from 'styled-components'
import AOS from "aos";
import "aos/dist/aos.css";
import AppProvider from 'AppProvider';
import useRedux from 'hooks/useRedux';
import { useAsync } from 'react-use';
import { coinList, CoinList, loginApi } from 'http/api';
import { user_logout } from 'utils/PubSubEvents';
import PubSub from "pubsub-js";
import useWalletTools from 'hooks/useWalletTools';
import { awaitWrap } from 'utils/tools';
import { useGenerateNonce } from "hooks/useGenerateNonce";
import { useWeb3React } from '@web3-react/core';
const Medium = styled.div`
  flex: 1;
  width: 100%;
`

function App() {
  const { store, userDispatch } = useRedux()
  const {activate, accounts} = useWalletTools();
  const {account,provider} = useWeb3React()
  const { getGenerateNonce } = useGenerateNonce()
  const [coins, setCoins] = useState<CoinList[]>()
  useEffect(() => {
    AOS.init();
    getCoinList()
  }, []);
  useEffect(() => {
    const namespace = PubSub.subscribe(user_logout, () => {
      userDispatch.logout()
    });
    return () => {
      PubSub.unsubscribe(namespace);
    }
  },[])


  useAsync(async() => {
    if (store.walletInfo) {
      try {
        await store.walletInfo.connector.activate()
      }catch(e) {
        // userDispatch.logout()
      }
    }
  }, []);

  useEffect(() => {
    if (accounts && store.address && accounts[0] !== store.address) {
      
      console.log('aaaa',accounts,store.address)
      console.log('aaaa',account)
      toggleAccount(accounts[0], provider);
    }
  }, [accounts, store.address, provider, account]);

  async function toggleAccount(address: string, provider: any) {
    let result = await userDispatch.logout()
    console.log(result)
    if(result) {
      let [signData, error] = await awaitWrap(getGenerateNonce(address, provider));
      console.log(signData)
      if (signData) {
        console.log(signData)
        let signature = signData.signatrue
        loginApi({ address, signature }).then((res) => {
          userDispatch.setToken(res.data.token)
          userDispatch.setAddress(res.data.address)
        })
      }
    }
  };

  async function getCoinList() {
    let result = await coinList()
    
    setCoins(result.data)
  }


  useEffect(() => {
    userDispatch.setCoins(coins)
  },[coins])



  return (
    // <AppProvider>
      <Column
        minHeight={'100vh'}
        >
        <Header />
          <Medium>
            <Routers />
          </Medium>
        <Footer />
      </Column>
    // </AppProvider>
  );
}

export default App;
