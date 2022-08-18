import styled from "styled-components";
import Flex from "./Flex";

export const Row = styled(Flex)`
  flex-direction: row;
  align-items: center;
`

export const RowCenter = styled(Flex)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const RowBetween = styled(Row)`
  justify-content: space-between;
`

export const RowStart = styled(Row)`
  align-items: flex-start;
`
