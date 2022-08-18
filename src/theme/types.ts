import { ThemedCssFunction } from "styled-components"

type Color = string

export interface Colors {
  normal: Color,
  hover: Color,
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors
  }
}
