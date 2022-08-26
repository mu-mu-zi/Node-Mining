import styled from "styled-components";
import { background, layout, border, system, position, space, flexbox, grid, typography, color } from "styled-system";
import { BoxProps } from ".";



export const Icon = styled.img<BoxProps>`
  ${background}
  ${layout}
  ${border}
  ${position}
  ${space}
  ${flexbox}
  ${grid}
  ${typography}
  ${color}
  ${system({
    cursor: true,
    boxSizing: true,
    whiteSpace: true
  })};
  font-size: .16rem;
  user-select: none;
`