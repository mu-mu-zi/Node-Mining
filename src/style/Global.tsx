import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle `
  * {
    /* font-family: 'Kanit', sans-serif; */
  }
  html {
    ${({theme}) => theme.mediaWidth.sm`
      font-size: 16px !important;
    `}
  }

  html body {
    margin: 0;
    line-height: initial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    min-width: 1280px;
    padding-top: constant(safe-area-inset-top);  
    padding-top: env(safe-area-inset-top);
    padding-bottom: constant(safe-area-inset-bottom);  
    padding-bottom: env(safe-area-inset-bottom);
    ${({theme}) => theme.mediaWidth.sm`
      min-width: initial;
    `}
  }
  .flex-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

`
export default GlobalStyle
