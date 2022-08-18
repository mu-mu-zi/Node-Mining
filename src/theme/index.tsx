import React,{useState,useEffect} from 'react'
import styled, {
  DefaultTheme,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components'
import { Colors } from './types'


export default function ThemeProvider({ children }: { children: React.ReactNode }) {

  function colors(): Colors {
    return {
      normal: '#F6B91B',
      hover: '#00E88A',
    }
  }

  function getTheme(): DefaultTheme {
    return {
      colors: colors(),
    }
  }

  return <StyledThemeProvider theme={getTheme()}>{children}</StyledThemeProvider>
}
