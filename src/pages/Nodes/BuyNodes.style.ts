import Box from "components/BaseElement";
import Input from "components/form/Input";
import styled from "styled-components";

export const Wrapper = styled.div`
  background: #191919;
  padding: .83rem 3.8rem 2.61rem;
  box-sizing: border-box;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 16px;
    min-height: 500px;
    background: #000;
  `}
`

export const PngNode = styled.img`
  width: 3.84rem;
  height: 3.84rem;
  ${({theme}) => theme.mediaWidth.sm`
    width: 343px;
    height: 343px;
  `}
`
export const IconPrice = styled.img`
  width: .3rem;
  height: .3rem;
  ${({theme}) => theme.mediaWidth.sm`
    width: 16px;
    height: 16px;
  `}
`

export const OrderInput = styled(Input)`
  background: transparent;
  border: none;
  border: 2px solid #6B6B6B;
  border-radius: 60px;
  width: 100%;
  /* max-width: 773px; */
  /* padding: 0 0 0 12px; */
  box-sizing: border-box;
  height: .36rem;
  width: .9rem;
  .input {
    display: block;
    background: transparent;
    border: none;
    color: #6B6B6B;
    border: none;
    outline: unset;
    text-align: center;
  }
  ${({theme}) => theme.mediaWidth.sm`
    width: 66px;
    height: 26px;
    font-size: 16px;
  `}
`
export const PurchaseNode = styled(Box)`
  background: ${({theme}) => theme.colors.normal};
  padding: .16rem .52rem;
  font-size: .2rem;
  font-weight: 700;
  color: #000000;
  cursor: pointer;
  border-radius: 48px;
  &:hover {
    background: ${({theme}) => theme.colors.hover};;
  }
`
export const SuccessNode = styled.img`
  width: 1.4rem;
  height: 1.4rem;
  ${({theme}) => theme.mediaWidth.sm`
    width: 140px;
    height: 140px;
    background: #1A1919;
    border-radius: 8px;
  `}
`
export const SuccessIcon = styled.img`
  width: .36rem;
  height: .36rem;
  ${({theme}) => theme.mediaWidth.sm`
    width: 21px;
    height: 21px;
  `}
`
