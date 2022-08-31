import Box from "components/BaseElement";
import Input from "components/form/Input";
import styled from "styled-components";

export const Wrapper = styled.div`
  background: #191919;
  padding: .83rem 3.8rem 2.61rem;
`

export const PngNode = styled.img`
  width: 3.84rem;
  height: 3.84rem;
`
export const IconPrice = styled.img`
  width: .3rem;
  height: .3rem;
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
`
export const SuccessIcon = styled.img`
  width: .36rem;
  height: .36rem;
`
