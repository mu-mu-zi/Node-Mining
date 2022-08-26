import React, { useEffect } from 'react';
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

const Medium = styled.div`
  flex: 1;
  width: 100%;
`

function App() {
  const { store } = useRedux()
  useEffect(() => {
    AOS.init();
  }, []);

  useAsync(async() => {
    if (store.walletInfo) {
      await store.walletInfo.connector.activate()
    }
  }, []);

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
