import ModalProvider from 'components/provider/ModalProvider'
import React, { ReactNode } from 'react'
import GlobalStyle from 'style/Global'
import ThemeProvider from 'theme';

export default function AppProvider(props:{children: ReactNode}) {

  return(
    <ThemeProvider>
      <ModalProvider>
        <GlobalStyle />
        {props.children}
      </ModalProvider>
    </ThemeProvider>
  )
}