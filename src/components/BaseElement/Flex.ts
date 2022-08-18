import styled from "styled-components";
import Box from "./index";

const Flex = styled(Box)<{
  gap?: string
}>`
  display: flex;
  gap: ${({gap}) => gap && gap};
`

export default Flex;