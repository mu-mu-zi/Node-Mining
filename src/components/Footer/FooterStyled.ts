import { Column } from "components/BaseElement/Column";
import { Row, RowStart } from "components/BaseElement/Row";
import styled from "styled-components";

export const Wrapper = styled(RowStart)`
  justify-content: center;
  padding: 1.53rem .2rem ;
  gap: 2rem;
  /* padding: 153px 20px ;
  gap: 200px; */
  background: #000000;
  width: 100%;
  box-sizing: border-box;
  ${({theme}) => theme.mediaWidth.sm`
    flex-direction: column;
    gap: 32px;
    padding: 16px;
  `}
`
export const Logo = styled.img`
  ${({theme}) => theme.mediaWidth.sm`
    width: 131px;
    height: 38px;
  `}
`

export const Icons = styled(Row)`
  /* gap: 50px; */
  gap: .5rem;
  img {
    width: .48rem;
    height: .48rem;
    ${({theme}) => theme.mediaWidth.sm`
      width: 32px;
      height: 32px;
    `}
  }
  ${({theme}) => theme.mediaWidth.sm`
    gap: 16px;
  `}
`

export const Connect = styled.div`
  font-weight: 400;
  /* font-size: 28px; */
  font-size: .28rem;
  color: #ffffff;
  ${({theme}) => theme.mediaWidth.sm`
    font-size: 14px;
  `}
`

export const About = styled(Column)`
  align-items: flex-start;
  /* gap: 32px; */
  gap: .32rem;
  /* font-size: 20px; */
  font-size: .2rem;
  font-weight: 400;
  color: #ffffff;
  white-space: nowrap;
  & > :first-child {
    font-weight: 700;
    /* font-size: 32px; */
    font-size: .32rem;
    ${({theme}) => theme.mediaWidth.sm`
      font-size: 16px;
    `}
  }
  ${({theme}) => theme.mediaWidth.sm`
    font-size: 10px;
    gap: 8px;
  `}
`

export const Community = styled(Column)`
  align-items: flex-start;
  /* gap: 32px;
  font-size: 20px; */
  gap: .32rem;
  font-size: .2rem;
  font-weight: 400;
  color: #ffffff;
  white-space: nowrap;
  & > :first-child {
    font-weight: 700;
    /* font-size: 32px; */
    font-size: .32rem;
    ${({theme}) => theme.mediaWidth.sm`
      font-size: 16px;
    `}
  }
  ${({theme}) => theme.mediaWidth.sm`
    font-size: 10px;
    gap: 8px;
  `}
`

