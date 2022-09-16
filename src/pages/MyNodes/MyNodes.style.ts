import Box from 'components/BaseElement';
import { Column } from 'components/BaseElement/Column';
import Flex from 'components/BaseElement/Flex';
import { Row, RowStart } from 'components/BaseElement/Row';
import Input from 'components/form/Input';
import styled from 'styled-components';
import { Z_INDEX } from 'utils/global';

export const Warpper = styled.div`
  display: grid;
  gap: .32rem;

  background: #000;

  padding: 1.03rem 3.6rem .15rem;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 32px 16px 16px;
  `}
`
export const InviteWarpper = styled(Flex)`
  justify-content: space-between;
  align-items: flex-start;
  background: rgba(0, 232, 138, .4);
  padding: .5rem 1.56rem .3rem .34rem;
  border-radius: 8px;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 24px 44px 28px;
    flex-direction: column;
  `}
`

export const InviteIcon = styled.img`
  width: 1.24rem;
  height: 1rem;
  ${({theme}) => theme.mediaWidth.sm`
    width: 60px;
    height: 48px;
  `}
`

export const PartTwo = styled(Box)`
  position: relative;
  background: #000;
  padding: .71rem 3.60rem .88rem;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 0 16px;
  `}
`

export const PartTwoBg = styled.img`
  width: 13.2rem;
  height: 6.26rem;
`

export const Title = styled(Box)`
  font-size: .6rem;
  font-weight: 700;
  color: #fff;
  font-family: 'RomicStd';
  ${({theme}) => theme.mediaWidth.sm`
    font-size: 20px;
    
  `}
`

export const PartThree = styled(Box)`
  background: #000;
  padding-top: 2.56rem;
  padding-bottom: .98rem;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 39px 16px 52px;
  `}
`

export const LineCut = styled(RowStart)`
    position: relative;
    &::before{
      content: '';
      position: absolute;
      background-image: url('${require('assets/images/Home/line_cat.png')}');
      background-repeat: no-repeat;
      width: 3.54rem;
      height: .54rem;
      display: inline-block;
      left: 0;
      top: 50%;
      background-size: contain;
      /* transform: translate(-50%, -50%); */
      ${({theme}) => theme.mediaWidth.sm`
        display: none;
      `}
    }
    &::after{
      content: '';
      position: absolute;
      background-image: url('${require('assets/images/Home/line_cat.png')}');
      background-repeat: no-repeat;
      width: 3.54rem;
      height: .54rem;
      display: inline-block;
      right: 0;
      top: 50%;
      transform: rotate(180deg);
      background-size: contain;
      ${({theme}) => theme.mediaWidth.sm`
        display: none;
      `}
    }
    ${({theme}) => theme.mediaWidth.sm`
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
`

export const NodesLogo = styled.img`
  width: 1.8rem;
  height: 1.56rem;
  margin: .3rem 0 0 .18rem;
  ${({theme}) => theme.mediaWidth.sm`
    width: 44px;
    height: 44px;
    margin: 0 0 8px;
  `}
`

export const PartFive = styled(Box)`
  background: #000;
  padding: .6rem 3.6rem .63rem;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 19px 25px 16px;
  `}
`

export const RevenueWrap = styled(Box)`
  background: #000;
  padding: .64rem 4.18rem 2.5rem;
  min-height: 4rem;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 16px;
  `}
`

export const Active = styled(Box)`
  cursor: pointer;
  position: relative;
  &.active {
    color: #F6B91B;
    &::before{
      content: '';
      height: .02rem;
      width: 100%;
      background: #F6B91B;
      position: absolute;
      bottom: -0.12rem;
      left: 0;
      ${({theme}) => theme.mediaWidth.sm`
        bottom: -9px;
      `}
    }
  }
`

export const WithdrawWrap = styled(Box)`
  background: #000;
  padding: .64rem 4.18rem 2.5rem;
  min-height: 4rem;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 16px;
  `}
`

export const FundRecordsWrap = styled(Box)`
  background: #000;
  padding: .64rem 4.18rem 2.5rem;
  min-height: 4rem;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 16px;
  `}
`
export const NodeRecordWrap = styled(Box)`
  background: #000;
  padding: .81rem 4.18rem 2.5rem;
  min-height: 4rem;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 16px;
  `}
`

export const ActiveNode = styled(Column)`
  gap: .15rem;
  cursor: pointer;
  .node-png-active {
    border: 1px solid #F6B91B;
  }
`

export const MyNode = styled(Row)`
  justify-content: center;
  background: #1A1919;
  border-radius: 8px;
  padding: .1767rem .1179rem;
  border: 1px solid transparent;
  &>img {
    width: .8841rem;
    height: .7665rem;
  }
`

export const InviteWrap = styled(Box)`
  background: #000;
  padding: .62rem 3.6rem 2.5rem;
  min-height: 4rem;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 16px;
  `}
`

export const ProgressImg = styled.img`
  width: 12rem;
  height: 1.44rem;
`

export const InviteInput = styled(Input)`
  background: transparent;
  border: 2px solid #6B6B6B;
  border-radius: 60px;
  width: 100%;
  /* max-width: 773px; */
  padding: 0 0 0 12px;
  box-sizing: border-box;
  height: .48rem;
  ${({theme}) => theme.mediaWidth.sm`
    height: 32px;
    border-radius: 25px;
    border: 1px solid #6B6B6B;
  `}
  &:hover {
    border: 2px solid #00E88A;
    color: #00E88A;
    .email-input {
      ::placeholder {
        color: #00E88A;
      }
    }
    .submit {
      color: #ffffff;
      background: ${({theme}) => theme.colors.hover};;
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

.input {
    color: #6B6B6B;
    border: none;
    outline: unset;
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

export const Invitation = styled(Box)`
  box-sizing: border-box;
  background: ${({theme}) => theme.colors.normal};
  height: .46rem;
  padding: .085rem .12rem;
  font-size: .2rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border-radius: 60px;
  transform: translateX(1px);
  &:hover {
    color: #fff;
    background: ${({theme}) => theme.colors.hover};
  }
  ${({theme}) => theme.mediaWidth.sm`
    height: 32px;
    padding: 8px;
    font-size: 12px;
    border-radius: 48px;
  `}
`


export const WithdrawInp = styled(Input)`
  background: transparent;
  border: 2px solid #6B6B6B;
  border-radius: 60px;
  width: 100%;
  max-width: 3.68rem;
  padding: 0 0 0 12px;
  box-sizing: border-box;
  height: .4rem;

  ${({theme}) => theme.mediaWidth.sm`
    height: 32px;
    width: 100%;
    max-width: initial;
    font-size: 12px;
  `}
  &:hover {
    border: 2px solid #00E88A;
    color: #00E88A;
    .email-input {
      ::placeholder {
        color: #00E88A;
      }
    }
    .submit {
      color: #ffffff;
      background: ${({theme}) => theme.colors.hover};;
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

.input {
    color: #00E88A;
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
    ${({theme}) => theme.mediaWidth.sm`
      font-size: 12px;
    `}
  }
  .adminInput {
    color: #ffffff;
  }
`

export const WithdrawMax = styled(Box)`
  line-height: 1;
  box-sizing: border-box;
  background: ${({theme}) => theme.colors.normal};
  height: .38rem;
  padding: .085rem .12rem;
  font-size: .2rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border-radius: 60px;
  transform: translateX(1px);
  &:hover {
    color: #fff;
    background: ${({theme}) => theme.colors.hover};;
  }
  ${({theme}) => theme.mediaWidth.sm`
    height: 22px;
    width: 44px;
    font-size: 11px;
    border-radius: 48px;
    text-align: center;
    margin-right: 6px;
    line-height: 22px;
  `}
`

export const PopoverInvite = styled(Box)`
  
`

export const WithdrawCoinsH5 = styled(Flex)`
  display: none;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: ${Z_INDEX.footer_nav};
  background-color: #1A1919;
  padding: 10px;
  box-sizing: border-box;
  ${({theme}) => theme.mediaWidth.sm`
    display: flex;
  `}
`
