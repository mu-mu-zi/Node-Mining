import styled from "styled-components";
import { background, layout, border, position, space, flexbox, grid, typography, color } from "styled-system";
import { BoxProps } from ".";



export const Table = styled.table<BoxProps>`
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
`

export const Td = styled.td<BoxProps>`
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
  box-sizing: border-box;
`;

export const Th = styled.th<BoxProps>`
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
  box-sizing: border-box;
`;

export const Tr = styled.tr<BoxProps>`
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
  box-sizing: border-box;
`

