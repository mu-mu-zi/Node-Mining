import Box from "components/BaseElement";
import Flex from "components/BaseElement/Flex";
import styled from "styled-components";
import Input from 'components/form/Input'
export const Banner = styled.div`
  position: relative;
  background-image: url('${require('assets/images/Nodes/nodes_banner.png')}');
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
  /* pointer-events: none; */
  background-position: center;
  ${({theme}) => theme.mediaWidth.sm`
    height: 623px;
  `}
`
export const Content = styled.div`
  background: #000;
  padding: 22px 3.6rem 170px;
  position: relative;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 16px;
  `}
`

export const Title = styled(Box)`
  position: relative;
  text-align: center;
  font-weight: 700;
  font-size: .6rem;
  color: #ffffff;
  font-family: RomicStd;
  ${({theme}) => theme.mediaWidth.sm`
    font-size: 20px;
  `}
`
export const RowCard = styled(Flex)`
  max-width: 3.89rem;
  /* min-height: 4.46rem; */
  border: 2px solid #00DC83;
  padding: .4rem .16rem .46rem;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-top: .8rem;
  ${({theme}) => theme.mediaWidth.sm`
    max-width: initial;
    padding: 16px;
  `}
`
