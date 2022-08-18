import styled from "styled-components";
import {
  background,
  BackgroundProps, border,
  BorderProps, color, ColorProps, flexbox,
  FlexboxProps, grid,
  GridProps, layout,
  LayoutProps, position,
  PositionProps, space,
  SpaceProps, StylesProps, typography, TypographyProps
} from "styled-system";
import {HTMLAttributes} from "react";

interface Space {
  WhiteSpace?: string
  cursor?: string
}

export interface BoxProps extends BackgroundProps,
  BorderProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  GridProps,
  Space,
  FlexboxProps,
  TypographyProps,
  HTMLAttributes<HTMLDivElement> {
}



const Box = styled.div<BoxProps>`
  ${background}
  ${layout}
  ${border}
  ${position}
  ${space}
  ${flexbox}
  ${grid}
  ${typography}
  ${color}
  white-space: ${(props) => props.WhiteSpace};
  cursor: ${(props) => props.cursor};
`
export const Typography = styled.div<BoxProps>`
  ${background}
  ${layout}
  ${border}
  ${position}
  ${space}
  ${flexbox}
  ${grid}
  ${typography}
  ${color}
  white-space: ${(props) => props.WhiteSpace};
  cursor:  ${(props) => props.cursor};
`

export default Box
