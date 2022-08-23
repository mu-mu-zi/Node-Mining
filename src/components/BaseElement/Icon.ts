import styled from "styled-components";
import { background, layout, border, position, space, flexbox, grid, typography, color } from "styled-system";
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
  white-space: ${(props) => props.WhiteSpace};
  cursor:  ${(props) => props.cursor};
  font-size: .16rem;
  user-select: none;
`