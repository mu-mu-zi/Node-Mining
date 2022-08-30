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
import { coinList, CoinList } from 'http/api';

const Medium = styled.div`
  flex: 1;
  width: 100%;
`

function App() {
  const { store, userDispatch } = useRedux()
  const [coins, setCoins] = useState<CoinList[]>()
  useEffect(() => {
    AOS.init();
    getCoinList()
  }, []);

  useAsync(async() => {
    console.log(store.walletInfo)
    if (store.walletInfo) {
      try {
        await store.walletInfo.connector.activate()
      }catch(e) {
        // userDispatch.logout()
      }
    }
  }, []);
  async function getCoinList() {
    let result = await coinList()
    
    setCoins(result.data)
  }


  useEffect(() => {
    userDispatch.setCoins(coins)
  },[coins])



  return (
    <AppProvider>
      <Column
        minHeight={'100vh'}
        >
        <Header />
          <Medium>
            <Routers />
          </Medium>
        <Footer />
      </Column>
    </AppProvider>
  );
}

export default App;
