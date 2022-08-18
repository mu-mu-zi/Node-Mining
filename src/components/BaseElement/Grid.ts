import styled from "styled-components";
import Box from "./index";

const Grid = styled(Box)<{
  gap?: string
}>`
  display: Grid;
  gap: ${({gap}) => gap && gap};
`

export default Grid;