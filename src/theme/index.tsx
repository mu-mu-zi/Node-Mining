import React, { useState, useEffect } from 'react'
import styled, {
  css,
  DefaultTheme,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components'
import { Colors, MediaWidths } from './types'
import { useUpdateEffect } from 'ahooks';

export const MEDIA_WIDTHS: MediaWidths = {
  sm: 768
}



const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ; (accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isH5, setIsH5] = useState<boolean>()
  useEffect(() => {
    getIsH5()
  }, [])

  function getIsH5() {
    let value: boolean = false
    function myFunction(x: any) {
      if (x.matches) {
        value = true
      } else {
        value = false
      }
      setIsH5(value)
    }
    var x = window.matchMedia(`(max-width: ${MEDIA_WIDTHS.sm}px)`)
    myFunction(x)
    x.addListener(myFunction)
  }



  function colors(): Colors {
    return {
      normal: '#F6B91B',
      hover: '#00E88A',
    }
  }

  function getTheme(): DefaultTheme {
    return {
      colors: colors(),
      mediaWidth: mediaWidthTemplates,
      isH5: isH5,
    }
  }
  useUpdateEffect(() => {
    getTheme()
  }, [isH5])

  return <StyledThemeProvider theme={getTheme()}>{children}</StyledThemeProvider>
}

