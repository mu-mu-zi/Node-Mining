import styled from "styled-components";
import {
  background,
  BackgroundProps, border,
  BorderProps, color, ColorProps, flexbox,
  FlexboxProps, grid,
  GridProps, layout,
  LayoutProps, ObjectOrArray, position,
  PositionProps, RequiredTheme, space,
  SpaceProps, StylesProps, system, Theme, typography, TypographyProps, ResponsiveValue
} from "styled-system";
import {HTMLAttributes} from "react";
import * as CSS from "csstype";


interface Space {
  WhiteSpace?: string
  cursor?: string
  boxSizing?: string
}

export interface BoxProps extends BackgroundProps,
  BorderProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  GridProps,
  // Space,
  Space1,
  FlexboxProps,
  TypographyProps,
  HTMLAttributes<HTMLDivElement> {
}

interface Space1<ThemeType extends Theme = RequiredTheme> {
  cursor?: ResponsiveValue<CSS.Property.Cursor, ThemeType> | undefined;
  boxSizing?: ResponsiveValue<CSS.Property.BoxSizing, ThemeType> | undefined;
  whiteSpace?: ResponsiveValue<CSS.Property.WhiteSpace, ThemeType> | undefined;
  transform?: ResponsiveValue<CSS.Property.Transform, ThemeType> | undefined;
}

// export interface CursorProps<ThemeType extends Theme = RequiredTheme> {
//   cursor?: ResponsiveValue<CSS.Property.Cursor, ThemeType> | undefined;
// }



const Box = styled.div<BoxProps>`
  ${background};
  ${layout};
  ${border};
  ${position};
  ${space};
  ${flexbox};
  ${grid};
  ${typography};
  ${color};
  ${system({
    cursor: true,
    boxSizing: true,
    whiteSpace: true,
    transform: true
  })};
`

export const Typography = styled.div<BoxProps>`
  ${background};
  ${layout};
  ${border};
  ${position};
  ${space};
  ${flexbox};
  ${grid};
  ${typography};
  ${color};
  ${system({
    cursor: true,
    boxSizing: true,
    whiteSpace: true
  })};
`

export default Box
