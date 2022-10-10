import styled from "styled-components";
import Flex from "./Flex";

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`

export const Column = styled(Flex)`
  flex-direction: column;
  align-items: center;
`

export const ColumnStart = styled(Column)`
  align-items: flex-start;
`
