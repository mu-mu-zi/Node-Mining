import styled from "styled-components";
import { RowBetween, Row } from "components/BaseElement/Row";
import { Z_INDEX } from "utils/global";

export const HeaderOccupy = styled.div`
  position: relative;
  /* height: 118px; */
  height: 1.18rem;
  width: 100%;
  ${({theme}) => theme.mediaWidth.sm`
    height: 36px;

  `}
`

export const HeaderFrame = styled.div`
  position: fixed;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  background: #000000;
  /* height: 118px; */
  height: 1.18rem;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: ${Z_INDEX.header_nav};
  ${({theme}) => theme.mediaWidth.sm`
    position: static;
    height: 36px;
  `}
`
export const Logo = styled.img`
  width: auto;  
  height: auto;  
  max-width: 100%;  
  max-height: 100%;
  width: 2.62rem;
  height: .72rem;
  ${({theme}) => theme.mediaWidth.sm`
    width: 82px;
    height: 24px;
  `}
`

export const Menu = styled(Row)`
  display: none;
  width: 18px;
  height: 18px;
  ${({theme}) => theme.mediaWidth.sm`
    display: flex;
    margin-right: 16px;
  `}
`

export const HeaderLinks = styled(RowBetween)`
  /* gap: 48px; */
  gap: .48rem;
  .nav-item {
    font-size: .2rem;
    /* font-size: 20px; */
    font-weight: 400;
    color: #ffffff;
    text-decoration: none;
  }
  .active {
    font-weight: 700;
    color: ${({theme}) => theme.colors.normal};;
  }
  ${({theme}) => theme.mediaWidth.sm`
    display: none;
  `}
`

export const HeaderContent = styled.div`
  /* padding: 0 71px 0 32px; */
  padding: 0 .71rem 0 .32rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 0;
  `}
`

export const ConnectWallet = styled(Row)`
  background: ${({theme}) => theme.colors.normal};;
  /* height: 118px; */
  height: 1.18rem;
  /* padding: 0 40px 0 50px; */
  padding: 0 .4rem 0 .5rem;
  /* font-size: 20px; */
  font-size: .2rem;
  font-weight: 700;
  white-space: nowrap;  
  cursor: pointer;
  &:hover {
    background: ${({theme}) => theme.colors.hover};;
  }
  ${({theme}) => theme.mediaWidth.sm`
    display: none;
  `}
`

export const Occupy = styled.div`
  display: none;
  width: 18px;
  height: 18px;
  margin-left: 16px;
  ${({theme}) => theme.mediaWidth.sm`
  display: block;
  
  `}
`
