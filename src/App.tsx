import React, { useEffect } from 'react';
import Routers from 'router/router';
import Header from 'components/Header';
import { Column } from 'components/BaseElement/Column';
import Footer from 'components/Footer';
import styled from 'styled-components'
import AOS from "aos";
import "aos/dist/aos.css";
const Medium = styled.div`
  flex: 1;
  width: 100%;
`

function App() {

  // useEffect(() => {
  //   AOS.init();
  // }, []);

  return (
    <Column
      minHeight={'100vh'}
    >
      <Header />
      <Medium>
        <Routers />
      </Medium>
      <Footer />
    </Column>
  );
}

export default App;
