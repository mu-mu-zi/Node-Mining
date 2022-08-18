import styled from "styled-components";
import { Column } from 'components/BaseElement/Column';
import { Row } from "components/BaseElement/Row";
import Box from "components/BaseElement";
import Grid from "components/BaseElement/Grid";
import { Typography } from '../../components/BaseElement/index';

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
  background-color: #111111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 860px;
  /* padding-top: 385px; */
  box-sizing: border-box;
`
export const Describe = styled.div`
  font-size: 28px;
  font-weight: 400;
  color: #ffffff;
  max-width: 650px;
  text-align: center;
  margin: 62px 0 67px;
`

export const FlyNode = styled.div`
  background: ${({theme}) => theme.colors.normal};
  padding: 20px 50px;
  font-size: 30px;
  font-weight: 900;
  color: #000000;
  cursor: pointer;
  border-radius: 42px;
  &:hover {
    background: ${({theme}) => theme.colors.hover};;
  }
`

export const IconLinks = styled(Column)`
  position: absolute;
  bottom: 195px;
  right: 115px;
  gap: 30px;
  
`

export const PartTwo = styled.div`
  padding-top: 155px;
  background: radial-gradient(transparent, #111 1px);
  background-size: 14px 10px;
  background-color: #fff;
  padding-left: 195px;
  padding-right: 195px;
`

export const Display = styled(Row)`
  justify-content: center;
  gap: 51px;
`
export const DisplayVision = styled.div`
  padding-top: 127px;
`
export const Vision = styled.div`
  margin-bottom: 60px;
  font-size: 60px;
  font-weight: bold;
  color: #F5F5F5;
`
export const ImageHover = styled(Box)<{
  bgColor: string,
  textColor: string,
  text: string
}>`
  position: relative;
  
  &::after {
    content: '${({text}) => text}';
    position: absolute;
    color: ${({textColor}) => textColor};
    background: ${({bgColor}) => bgColor};
    font-size: 40px;
    font-weight: bold;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 35px 72px;
    visibility: hidden;
  }
  &:hover {
    &::after {
      visibility: visible;
    }
  }
`

export const PartThree = styled.div`
  position: relative;
  padding: 332px 195px 0;
  background: #111;
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


export const Card = styled(Box)`
  max-width: 624px;
  /* min-height: 386px; */
`

export const PartFour = styled.div`
    padding: 104px 195px 138px;
    background: radial-gradient(transparent, #111 1px);
    background-size: 14px 10px;
`

export const NodeBtn = styled.div`
  padding: 22px 51px;
  color: #00E88A;
  border: 2px solid #00E88A; 
  border-radius: 42px;
  font-size: 28px;
  font-weight: bold;
  color: #00E88A;
`

export const PartFive= styled.div`
    padding: 141px 195px 207px;
    background: #111;
    position: relative;
`

export const PartnersBg = styled.div`
  position: absolute;
  top: 185px;
  width: 1465px;
  height: 695px;
  background-image: url('${require('assets/svg/index_part_seven_5.svg').default}');
  background-repeat: no-repeat;
`

export const PartSix = styled.div`
  background: radial-gradient(transparent, #111 1px);
  background-size: 14px 10px;
  padding: 250px 195px 423px;

`

export const EmailIpt = styled.input`
    background: transparent;
    border: 2px solid #666666;
    border-radius: 40px;
    padding: 21px 48px;
    font-size: 28px;
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
    font-size: 40px;
    font-weight: bold;
    /* transform: rotate(-2deg); */
    transform: translateY(-60%) ${(props) =>props.type === 'right' ? 'rotate(2deg)' : 'rotate(-2deg)'} ;
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
`
export const RoadMapLi = styled(Typography)`
  position: relative;
  &::before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #00E88A;
    margin-right: 11px;
  }
`
