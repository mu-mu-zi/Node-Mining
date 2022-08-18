import styled from "styled-components";
import { RowBetween, Row } from "components/BaseElement/Row";
import { Z_INDEX } from "utils/global";

export const HeaderOccupy = styled.div`
  position: relative;
  height: 118px;
  width: 100%;
`

export const HeaderFrame = styled.div`
  position: fixed;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  background: #000000;
  height: 118px;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: ${Z_INDEX.header_nav};
`
export const Logo = styled.img`
  /* width: auto;  
  height: auto;  
  max-width: 100%;  
  max-height: 100%;  */
`

export const HeaderLinks = styled(RowBetween)`
  gap: 48px;
  .nav-item {
    font-size: 20px;
    font-weight: 400;
    color: #ffffff;
    text-decoration: none;
  }
  .active {
    font-weight: 700;
    color: ${({theme}) => theme.colors.normal};;
  }
`

export const HeaderContent = styled.div`
  padding: 0 71px 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const ConnectWallet = styled(Row)`
  background: ${({theme}) => theme.colors.normal};;
  height: 118px;
  padding: 0 40px 0 50px;
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;  
  cursor: pointer;
  &:hover {
    background: ${({theme}) => theme.colors.hover};;
  }
`
