import Box from "components/BaseElement";
import Input from "components/form/Input";
import styled from "styled-components";

export const PartTwo = styled(Box)`
  padding: 168px 310px 134px;
  background-color: #000;
`

export const Cooperation = styled(Box)`
  position: relative;
  padding: .87rem .24rem .4rem;
  background: #1A1919;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: .17rem;
  /* max-width: 3.08rem; */
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    box-shadow: 0px 4px 20px #F6B91B;
    transform: scale(1.05);
  }
  img {
    width: .88rem;
    height: .88rem;
  }
`

export const CooperationSvg = styled.img`
  position: absolute;
  top: -18px;
  left: 24px;
`

export const Activating = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 59px 16px 20px;

`

export const ActivatingSvg = styled.img`
  width: .88rem;
  height: .88rem;
`

export const PartThree = styled(Box)`
  background: radial-gradient(transparent, #000 1px);
  background-size: 14px 10px;
  padding: 125px 251px 160px;
`
export const PartFive = styled(Box)`
  background: #000;
  padding: 122px 20px 163px;
`
export const EmailIpt = styled.input`
    background: transparent;
    border: 2px solid #6B6B6B;
    border-radius: 60px;
    padding: 6px 133px 7px 16px;
    font-size: 20px;
    font-weight: 400;
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

export const CollaborationCard = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: .22rem;
  padding: .335rem .145rem;
  background: #1A1919;
  border-radius: 8px;
  &:hover {
    transition: all 0.3s;
    box-shadow: 0px 4px 20px #F6B91B;
    transform: scale(1.02);
  }
  img {
    width: 1.14rem;
    height: 1.15rem;
  }
`

export const EmailInput = styled(Input)`
  background: transparent;
  border: 2px solid #6B6B6B;
  border-radius: 60px;
  width: 100%;
  max-width: 7.73rem;
  padding: 0 0 0 .12rem;
  box-sizing: border-box;
  height: .48rem;
  &:hover {
    border: 2px solid #00E88A;
    color: #00E88A;
    .email-input {

      ::placeholder {
        color: #00E88A;
      }
    }
    .submit {
      background: #00E88A;
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

`
