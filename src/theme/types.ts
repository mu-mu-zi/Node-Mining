import { ThemedCssFunction } from "styled-components"

export type MediaWidths = {
  sm: number
}

type Color = string

export interface Colors {
  normal: Color,
  hover: Color,
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors
    isH5: boolean | undefined
    mediaWidth: {
      sm: ThemedCssFunction<DefaultTheme>
    }
  }
}
