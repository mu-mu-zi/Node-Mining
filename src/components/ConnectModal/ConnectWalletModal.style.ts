import { Row } from 'components/BaseElement/Row';
import styled from 'styled-components';

export const ConnectWalletModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const Option = styled(Row)`
  padding: 14px 17px;
  gap: 9px;
  height: 56px;
  width: 100%;
  border: 1px solid #6B6B6B;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    border: 1px solid #F6B91B;
  }
`
