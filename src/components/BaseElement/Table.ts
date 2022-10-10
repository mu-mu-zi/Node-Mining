import styled from "styled-components";
import { background, layout, system, border, position, space, flexbox, grid, typography, color } from "styled-system";
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
  ${system({
    cursor: true,
    boxSizing: true,
    whiteSpace: true
  })};
  border-collapse: separate;
  border-spacing: 0;
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
  ${system({
    cursor: true,
    boxSizing: true,
    whiteSpace: true
  })};
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
  ${system({
    cursor: true,
    boxSizing: true,
    whiteSpace: true
  })};
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
  ${system({
    cursor: true,
    boxSizing: true,
    whiteSpace: true
  })};
`

