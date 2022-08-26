import ModalProvider from 'components/provider/ModalProvider'
import Web3Provider from 'connectwallet/Web3Provider';
import React, { ReactNode } from 'react'
import {Provider} from 'react-redux';
import { store } from 'store';
import GlobalStyle from 'style/Global'
import ThemeProvider from 'theme';
export default function AppProvider(props:{children: ReactNode}) {

  return(
    <Provider store={store}>
      <ThemeProvider>
        <Web3Provider>
          <ModalProvider>
            <GlobalStyle />
            {props.children}
          </ModalProvider>
        </Web3Provider>
      </ThemeProvider>
    </Provider>
  )
}