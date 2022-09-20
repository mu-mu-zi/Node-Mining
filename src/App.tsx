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
import { awaitWrap, Notice } from 'utils/tools';
import { useGenerateNonce } from "hooks/useGenerateNonce";
// import { useWeb3React } from '@web3-react/core';
import { MsgStatus } from './components/messageBox/MessageBox';
import { CHAINS } from 'connectwallet/config';
const Medium = styled.div`
  flex: 1;
  width: 100%;
  background-color: #000;
`

function App() {
  const { store, userDispatch } = useRedux()
  const { deactivate, activate, accounts, chainId, provider } = useWalletTools();
  // const {account,provider} = useWeb3React()
  
  const { getGenerateNonce } = useGenerateNonce()
  const [coins, setCoins] = useState<CoinList[]>()

  useEffect(() => {
    AOS.init();
    if(!store.token) return
    getCoinList()
  }, [accounts]);
  useEffect(() => {
    const namespace = PubSub.subscribe(user_logout, () => {
      userDispatch.logout()
      deactivate()
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
    } else {
      userDispatch.logout()
    }
  }, []);

  // useEffect(() => {
  //   if(!account) {
  //     userDispatch.logout()
  //   }
  // },[account])

  useEffect(() => {
    if (accounts && store.address && accounts[0].toLowerCase() !== store.address.toLowerCase()) {
      
      toggleAccount(accounts[0], provider);
    }
  }, [accounts, store.address, provider]);

  useAsync(async() => {
    if(chainId === CHAINS.BSC.chainId || chainId === CHAINS.ETH.chainId) {

      try {
        await store.walletInfo?.connector.activate()
        setTimeout(() => store.walletInfo?.connector.activate(), 500)
      } catch (e: any) {
        Notice(JSON.parse(JSON.stringify(e.reason)),MsgStatus.fail)
      }
    }
  },[chainId])

  useEffect(() => {
    
    if(!chainId) return
 
    if(chainId !== CHAINS.BSC.chainId && chainId !== CHAINS.ETH.chainId) {
      Notice('You are connected to an unsupported network, please switch to the BSC master network or the ETH master network.', MsgStatus.fail)
    }
  },[chainId])

  async function toggleAccount(address: string, provider: any) {
    let result = await userDispatch.logout()

    if(result) {
      let [signData, error] = await awaitWrap(getGenerateNonce(address, provider));
      if (signData) {
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
