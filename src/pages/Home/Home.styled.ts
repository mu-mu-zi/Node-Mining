import styled from "styled-components";
import { Column } from 'components/BaseElement/Column';
import { Row } from "components/BaseElement/Row";
import Box from "components/BaseElement";
import Grid from "components/BaseElement/Grid";
import { Typography } from '../../components/BaseElement/index';
import { Z_INDEX } from "utils/global";

export const Image = styled.img`
  display: block;
  object-fit: cover;
  width: auto;  
  height: auto;  
  max-width: 100%;  
  max-height: 100%;  
`

export const Banner = styled.div`
  position: relative;
  background-image: url('${require('assets/images/index_banner.png')}');
  /* background-image: url('${require('assets/svg/banner.svg').default}'); */
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 860px;
  /* padding-top: 385px; */
  box-sizing: border-box;
  background-position: center;
  ${({theme}) => theme.mediaWidth.sm`
    height: 926px;
  `}
`
export const Describe = styled.div`
  font-size: .3rem;
  font-weight: 400;
  color: #ffffff;
  max-width: 650px;
  text-align: center;
  margin: 62px 0 67px;
  ${({theme}) => theme.mediaWidth.sm`
    font-size: 20px;
    font-weight: 600;
    margin: 35px 50px;
  `}
`

export const FlyNode = styled(Box)`
  background: ${({theme}) => theme.colors.normal};
  padding: 20px 50px;
  font-size: .3rem;
  font-weight: 900;
  color: #000000;
  cursor: pointer;
  border-radius: 42px;
  box-sizing: border-box;
  text-align: center;
  &:hover {
    background: ${({theme}) => theme.colors.hover};;
  }
  ${({theme}) => theme.mediaWidth.sm`
    font-size: 18px;
    font-weight: bold;
    padding: 9px 25px;
  `}
`

export const IconLinks = styled(Column)`
  position: fixed;
  bottom: 195px;
  right: 115px;
  gap: 30px;
  z-index: ${Z_INDEX.fixed_links};
  ${({theme}) => theme.mediaWidth.sm`
    display: none;
  `}
`

export const PartTwo = styled.div`
  padding-top: 155px;
  background: radial-gradient(transparent, #000 1px);
  background-size: 14px 10px;
  background-color: #fff;
  padding-left: 320px;
  padding-right: 320px;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 25px 20px 0;
    background: radial-gradient(transparent, #000 .6px);
    background-size: 16px 10px;
  `}
`

export const Display = styled(Row)`
  justify-content: center;
  gap: 51px;
`
export const DisplayVision = styled.div`
  padding-top: 1.27rem;
  ${({theme}) => theme.mediaWidth.sm`
    padding-top: 35px;
  `}
`
export const Vision = styled.div`
  margin-bottom: 60px;
  font-size: .6rem;
  font-weight: bold;
  color: #F5F5F5;
`
export const ImageHover = styled(Box)<{  bgColor: string,textColor: string,text: string}>`
  position: relative;
  &::after {
    content: '${({text}) => text}';
    position: absolute;
    color: ${({textColor}) => textColor};
    background: ${({bgColor}) => bgColor};
    font-size: .4rem;
    font-weight: bold;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .35rem .72rem;
    visibility: hidden;
    ${({theme}) => theme.mediaWidth.sm`
      visibility: visible;
      padding: 32px 17px;
      font-size: 20px;
    `}
  }
  &:hover {
    &::after {
      visibility: visible;
    };
  };
`

export const PartThree = styled.div`
  position: relative;
  padding: 332px 320px 0;
  background: #000;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 131px 20px 0;
  `}
`

export const CardWrapper = styled(Grid)`
  position: relative;
`

export const CardBg = styled.div`
  position: absolute;
  left: 50%;
  top: 411px;
  transform: translateX(-50%);
  width: 1090px;
  height: 1090px;
  background-image: url('${require('assets/svg/index_part_five_5.svg').default}');
  background-repeat: no-repeat;
`

export const LineCut = styled(Box)`
  position: relative;
  &::before{
    content: '';
    position: absolute;
    background-image: url('${require('assets/images/Home/line_cat.png')}');
    background-repeat: no-repeat;
    width: 354px;
    height: 54px;
    display: inline-block;
    left: -320px;
    top: 200px;
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
    width: 354px;
    height: 54px;
    display: inline-block;
    right: -320px;
    top: 200px;
    transform: rotate(180deg);
    ${({theme}) => theme.mediaWidth.sm`
      display: none;
    `}
  }
`


export const Card = styled(Box)`
  max-width: 624px;
  padding: 42px 32px 26px;
  border: 4px solid #00E88A;
  ${({theme}) => theme.mediaWidth.sm`
    border: 2px solid #00E88A;
    padding: 21px 9px 12px 16px;
  `}
  /* min-height: 386px; */
`

export const PartFour = styled.div`
    padding: 104px 320px 138px;
    background: radial-gradient(transparent, #000 1px);
    background-size: 14px 10px;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 39px 20px 68px;
    background: radial-gradient(transparent, #000 .6px);
    background-size: 16px 10px;
  `}
`

export const NodeBtn = styled.div`
  padding: 22px 51px;
  color: #00E88A;
  border: 2px solid #00E88A; 
  border-radius: 42px;
  font-size: .28rem;
  font-weight: bold;
  color: #00E88A;
  text-align: center;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 7px 14px;
    font-size: 12px;
  `}
`

export const PartFive= styled.div`
    padding: 141px 320px 207px;
    background: #000;
    position: relative;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 30px 20px 25px;
  `}
`

export const PartnersBg = styled.div`
  position: absolute;
  top: 185px;
  left: 50%;
  transform: translateX(-50%);
  width: 14.65rem;
  height: 6.95rem;
  background-image: url('${require('assets/svg/index_part_seven_5.svg').default}');
  background-repeat: no-repeat;
  background-size: contain;
  ${({theme}) => theme.mediaWidth.sm`
    display: none;
  `}
`

export const PartSix = styled.div`
  background: radial-gradient(transparent, #000 1px);
  background-size: 14px 10px;
  padding: 250px 320px 423px;
  ${({theme}) => theme.mediaWidth.sm`
      padding: 70px 20px 173px;
      background: radial-gradient(transparent, #000 .6px);
      background-size: 16px 10px;
  `}

`

export const EmailIpt = styled.input`
    background: transparent;
    border: 2px solid #666666;
    border-radius: 40px;
    padding: 21px 48px;
    font-size: .28rem;
    width: 100%;
    max-width: 773px;
    box-sizing: border-box;
    color: #fff;
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
    ${({theme}) => theme.mediaWidth.sm`
      max-width: 200px;
      border: 2px solid #00E88A;
      font-size: 18px;
      color: #00E88A;
      padding: 9px 26px;
      ::placeholder {
        color: #00E88A;
      }
    `}
`

export const RoadMapCard = styled.div<{type: 'left' | 'right', text: string}>`
  border: 4px solid #F6B91B;
  padding: 67px 61px 55px 105px;
  transition: all 0.3s;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  &::before {
    content: '${(props) =>props.text}';
    position: absolute;
    padding: 21px 66px;
    color: #ffffff;
    top: 0;
    left: ${(props) =>props.type === 'left' ? '60px' : ''};
    right: ${(props) =>props.type === 'right' ? '76px' : ''};
    background: #F6B91B;
    border-radius: 14px;
    font-size: .4rem;
    font-weight: bold;
    /* transform: rotate(-2deg); */
    transform: translateY(-60%) ${(props) =>props.type === 'right' ? 'rotate(2deg)' : 'rotate(-2deg)'} ;
    ${({theme,type}) => theme.mediaWidth.sm`
      font-size: 16px;
      padding: 8px 28px;
      left: ${type === 'left' ? '26px' : ''};
      right: ${type === 'right' ? '24px' : ''};
    `}
  }
  &:hover {
    transform: scale(1.05);
    border: 4px solid #00E88A;
    &::before {
      transition: all 0.3s;
      background: #00E88A;
      transform: translateY(-60%) rotate(0deg) scale(1.05);
    }
    .ty-li {
      &::before {
        background: #F6B91B;
      }
    }
  }
  ${({theme}) => theme.mediaWidth.sm`
    padding: 31px 13px 32px 54px;
    font-size: 16px;
  `}
`
export const RoadMapLi = styled(Typography)`
  position: relative;
  padding-left: 26px;
  &::before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #00E88A;
    margin-right: 11px;
    position: absolute;
    left: 0;
    top: .5em;
  ${({theme}) => theme.mediaWidth.sm`
    width: 6px;
    height: 6px;
    margin-right: 4px;
  `}
  }
  ${({theme}) => theme.mediaWidth.sm`
    padding-left: 10px;
  `}
`
