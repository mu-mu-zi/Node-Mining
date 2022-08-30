import ModalProvider from 'components/provider/ModalProvider'
import Web3Provider from 'connectwallet/Web3Provider';
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux';
import { store } from 'store';
import GlobalStyle from 'style/Global'
import ThemeProvider from 'theme';
export default function AppProvider(props: { children: ReactNode }) {

  return (
    <Provider store={store}>
      <Web3Provider>
        <ThemeProvider>
          <ModalProvider>
            <GlobalStyle />
            {props.children}
          </ModalProvider>
        </ThemeProvider>
      </Web3Provider>
    </Provider>
  )
}