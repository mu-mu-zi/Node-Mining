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
  background: radial-gradient(transparent, #000 1px);
  background-size: 14px 10px;
  padding: 168px 20px 72px;
`

export const Title = styled(Box)`
  position: relative;
  text-align: center;
  font-weight: 700;
  font-size: 60px;
  color: #ffffff;
  &::before {
    content: '';
    position: absolute;
    background-image: url('${require('assets/svg/Digital/title_bg.svg').default}');
    width: 240px;
    height: 174px;
    display: inline-block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

export const IdentityCard = styled(Flex)`
  max-width: 398px;
  min-height: 446px;
  border: 2px solid #00DC83;
  padding: 40px 16px 46.5px;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

export const PartThree = styled.div`
  background: #000;
  padding: 111px 20px 157px;
`
