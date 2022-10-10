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
  ul {
    list-style: none;
    margin: 0;
  }
  .flex-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .reset-datepicker-semi {
    background: #3D3D3D;

    // top
    .semi-datepicker-navigation {
      .semi-button {
        color: #fff;
      }
      .semi-datepicker-navigation-month{
        pointer-events: none;
        .semi-button {
          color: #fff;
        }
      } 
    }

    // middle
    .semi-datepicker-month {
      .semi-datepicker-weekday {
        color: #929292;
      }
      .semi-datepicker-weeks {
        color: #fff;
        .semi-datepicker-day-today .semi-datepicker-day-main {
          background: #2a2929;
          color: #fff;
        }
        .semi-datepicker-day-selected .semi-datepicker-day-main {
          background: #f6b91b;
          color: #fff;
        }
      }
    }

    // buttom
    .semi-datepicker-switch {
      .semi-datepicker-switch-date-active {
        color: #fff;
      }
      .semi-datepicker-switch-time {
        color: #fff;
      }
      .semi-datepicker-switch-date {
        color: #fff;
      }
    }
    // hh ss
    .semi-datepicker-tpk {
      .semi-scrolllist {
        background: #3D3D3D;
        .semi-scrolllist-header {
          display: none;
        }
        .semi-scrolllist-body {
          .semi-scrolllist-list-outer {
            li {
              color: #fff;
            }
          }
          .semi-scrolllist-shade-pre {
            background: #3D3D3D;
          }
          .semi-scrolllist-shade-post {
            background: #3D3D3D;
          }
          .semi-scrolllist-item-selected {
            color: #f6b91b !important;
          }
        }
      }
    }
  }

`
export default GlobalStyle
