import Box from "components/BaseElement";
import Flex from "components/BaseElement/Flex";
import Input from "components/form/Input";
import styled from "styled-components";

export const Banner = styled.div`
position: relative;
background-image: url('${require('assets/images/digital_banner.png')}');
background-repeat: no-repeat;
background-size: cover;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 860px;
/* padding-top: 108px; */
box-sizing: border-box;
background-position: center;
${({theme}) => theme.mediaWidth.sm`
    height: 327px;
`}
`

export const EmailIpt = styled.input`
    background: transparent;
    border: 2px solid #6B6B6B;
    border-radius: 60px;
    padding: 21px 48px;
    font-size: 20px;
    width: 100%;
    max-width: 773px;
    box-sizing: border-box;
    color: #6B6B6B;
    outline: unset;
    &::after {
      content: 'SUBMIT'
    }
    &:hover {
      border: 2px solid #00E88A;
      color: #00E88A;
      ::placeholder {
        color: #00E88A;
      }
    }
    &:active {
      border: 2px solid #00E88A;
      color: #00E88A;
      ::placeholder {
        color: #00E88A;
      }
    }
    &:focus {
      border: 2px solid #00E88A;
      color: #00E88A;
      ::placeholder {
        color: #00E88A;
      }
    }
`

export const EmailInput = styled(Input)`
  background: transparent;
  /* border: 2px solid #6B6B6B; */
  border-radius: 60px;
  width: 100%;
  max-width: 773px;
  padding: 0 0 0 12px;
  box-sizing: border-box;
  height: 48px;
  &:hover {
    /* border: 2px solid #00E88A; */
    color: #00E88A;
    .email-input {

      ::placeholder {
        color: #00E88A;
      }
    }
    /* .submit {
      background: #00E88A;
    } */
  }
  &:active {
    /* border: 2px solid #00E88A; */
    color: #00E88A;
    ::placeholder {
      color: #00E88A;
    }
  }
  &:focus {
    /* border: 2px solid #00E88A; */
    color: #00E88A;
    ::placeholder {
      color: #00E88A;
    }
  }

  .email-input {
    color: #6B6B6B;
    border: none;
    outline: unset;
    ::placeholder {
      color: #6B6B6B;
    }
    &:hover {
      color: #00E88A;
      ::placeholder {
        color: #00E88A;
      }
    }
    &:active {
      color: #00E88A;
      ::placeholder {
        color: #00E88A;
      }
    }
    &:focus {
      color: #00E88A;
      ::placeholder {
        color: #00E88A;
      }
    }
  }
`

export const Submit = styled(Box)`
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #F6B91B;
  color: #000;
  height: 48px;
  border-radius: 48px;
  cursor: pointer;
  &:hover {
    background: #00E88A;
  }

`

export const PartTwo = styled.div`
  background: #000;
  padding: 168px 360px 72px;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 59px 16px 0;
  `}
`

export const Title = styled(Box)`
  font-family: 'RomicStd';
  position: relative;
  text-align: center;
  font-weight: 700;
  font-size: .6rem;
  color: #ffffff;
  &::before {
    content: '';
    position: absolute;
    background-image: url('${require('assets/svg/Digital/title_bg.svg').default}');
    width: 2.4rem;
    height: 1.74rem;
    display: inline-block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-size: cover;
    ${({theme}) => theme.mediaWidth.sm`
      width: 83px;
      height: 52px;
      background-size: 83px 52px;
      background-repeat: no-repeat;
    `}
  }
  ${({theme}) => theme.mediaWidth.sm`
    font-size: 20px;
    font-weight: 700;
  `}
`

export const IdentityCard = styled(Flex)`
  max-width: 389px;
  /* min-height: 446px; */
  border: 2px solid #00DC83;
  padding: 40px 16px 46.5px;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 16px 29.5px;
    max-width: 100%;
  `}
`

export const PartThree = styled.div`
  background: #000;
  padding: 111px 20px 157px;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 48px 16px 36px;
  `}
`
