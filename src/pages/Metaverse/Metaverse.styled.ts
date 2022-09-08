import Box from "components/BaseElement";
import Input from "components/form/Input";
import styled from "styled-components";

export const PartTwo = styled(Box)`
  padding: 168px 310px 134px;
  background-color: #000;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 59px 16px 0;
  `}
`

export const Cooperation = styled.a`
  display: block;
  position: relative;
  padding: .87rem .24rem .4rem;
  background: #1A1919;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: .17rem;
  /* max-width: 3.08rem; */
  box-sizing: border-box;
  text-decoration: none;
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
  ${({theme}) => theme.mediaWidth.sm`
      padding: 34px 16px 16px;
      gap: 8px;
      img {
        width: 44px;
        height: 44px;
      }
  `}
`

export const CooperationSvg = styled.img`
  position: absolute;
  top: -18px;
  left: 24px;
  ${({theme}) => theme.mediaWidth.sm`
      left: 16px;
  `}
`

export const Activating = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 59px 16px 20px;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 16px 0;
    gap: 8px;
  `}
`

export const ActivatingSvg = styled.img`
  width: .88rem;
  height: .88rem;
  ${({theme}) => theme.mediaWidth.sm`
    width: 44px;
    height: 44px;
  `}
`

export const PartThree = styled(Box)`
  background: #000;
  padding: 125px 251px 160px;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 40px 16px 0;
  `}
`
export const PartFive = styled(Box)`
  background: #000;
  padding: 122px 20px 163px;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 32px 16px 85px;
  `}
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .22rem;
  padding: .335rem .145rem;
  background: #1A1919;
  border-radius: 8px;
  box-sizing: border-box;
  align-items: center;
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100%
  }
  &:hover {
    &::after {
      transition: all 0.3s;
      box-shadow: 0px 4px 20px #F6B91B;
      transform: scale(1.02);
    }
  }
  img {
    width: 1.14rem;
    height: 1.15rem;
  }

  ${({theme}) => theme.mediaWidth.sm`
    width: 100%;
    gap: 8px;
    padding: 16px;
    img {
        width: 48px;
        height: 48px;
      }
    `}
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
  ${({theme}) => theme.mediaWidth.sm`
    height: 36px;
    max-width: initial;
    border: 1px solid #6B6B6B;
  `}
  &:hover {
    border: 2px solid #00E88A;
    color: #00E88A;
    ${({theme}) => theme.mediaWidth.sm`
      border: 1px solid #00E88A;
    `}
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
    ${({theme}) => theme.mediaWidth.sm`
      border: 1px solid #00E88A;
    `}
    ::placeholder {
      color: #00E88A;
    }
  }
  &:focus {
    border: 2px solid #00E88A;
    color: #00E88A;
    ${({theme}) => theme.mediaWidth.sm`
      border: 1px solid #00E88A;
    `}
    ::placeholder {
      color: #00E88A;
    }
  }

  .email-input {
    color: #6B6B6B;
    border: none;
    outline: unset;
    padding-left: 16px;
    ${({theme}) => theme.mediaWidth.sm`
      font-size: 11px;
    `}
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
  font-weight: 700;
  background: #F6B91B;
  color: #000;
  height: 48px;
  border-radius: 48px;
  cursor: pointer;
  transform: translateX(2px);
  ${({theme}) => theme.mediaWidth.sm`
    height: 36px;
    font-size: 12px;
    font-weight: 700;
  `}
`
