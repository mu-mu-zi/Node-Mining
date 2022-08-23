import Box from 'components/BaseElement';
import { Column } from 'components/BaseElement/Column';
import Flex from 'components/BaseElement/Flex';
import { Row, RowStart } from 'components/BaseElement/Row';
import styled from 'styled-components';

export const Warpper = styled.div`
  display: grid;
  gap: .32rem;

  background: radial-gradient(transparent, #000 1px);
  background-size: 14px 10px;
  padding: 1.03rem 3.6rem .15rem;
`
export const InviteWarpper = styled(Flex)`
  justify-content: space-between;
  align-items: flex-start;
  background: rgba(0, 232, 138, .4);
  padding: .5rem 1.56rem .3rem .34rem;
  border-radius: 8px;
`

export const InviteIcon = styled.img`
  width: 1.24rem;
  height: 1rem;
`

export const PartTwo = styled(Box)`
  position: relative;
  background: #000;
  padding: .71rem 3.60rem .88rem;
`

export const PartTwoBg = styled.img`
  width: 13.2rem;
  height: 6.26rem;
`

export const Title = styled(Box)`
  font-size: .6rem;
  font-weight: 700;
  color: #fff;
`

export const PartThree = styled(Box)`
  background: #000;
  padding-top: 2.56rem;
  padding-bottom: .98rem;
`

export const LineCut = styled(RowStart)`
    position: relative;
    &::before{
      content: '';
      position: absolute;
      background-image: url('${require('assets/images/Home/line_cat.png')}');
      background-repeat: no-repeat;
      width: 354px;
      height: 54px;
      display: inline-block;
      left: 0;
      top: 50%;
      /* transform: translate(-50%, -50%); */
    }
    &::after{
      content: '';
      position: absolute;
      background-image: url('${require('assets/images/Home/line_cat.png')}');
      background-repeat: no-repeat;
      width: 354px;
      height: 54px;
      display: inline-block;
      right: 0;
      top: 50%;
      transform: rotate(180deg);
    }
`

export const NodesLogo = styled.img`
  width: 1.8rem;
  height: 1.56rem;
  margin: .3rem 0 0 .18rem;
`

export const PartFive = styled(Box)`
  background: radial-gradient(transparent, #000 1px);
  background-size: 14px 10px;
  padding: .6rem 3.6rem .63rem;
`

export const RevenueWrap = styled(Box)`
  background: radial-gradient(transparent, #000 1px);
  background-size: 14px 10px;
  padding: .64rem 4.18rem 2.5rem;
  min-height: 4rem;
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
    }
  }
`

export const FundRecordsWrap = styled(Box)`
  background: radial-gradient(transparent, #000 1px);
  background-size: 14px 10px;
  padding: .64rem 4.18rem 2.5rem;
  min-height: 4rem;
`
export const NodeRecordWrap = styled(Box)`
  background: radial-gradient(transparent, #000 1px);
  background-size: 14px 10px;
  padding: .81rem 4.18rem 2.5rem;
  min-height: 4rem;
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