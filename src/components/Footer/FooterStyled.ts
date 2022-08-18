import { Column } from "components/BaseElement/Column";
import { Row, RowStart } from "components/BaseElement/Row";
import styled from "styled-components";

export const Wrapper = styled(RowStart)`
  justify-content: center;
  padding: 153px 20px ;
  gap: 200px;
  background: #000000;
  width: 100%;
  box-sizing: border-box;
`
export const Logo = styled.img`

`

export const Icons = styled(Row)`
  gap: 50px;
`

export const Connect = styled.div`
  font-weight: 400;
  font-size: 28px;
  color: #ffffff;
`

export const About = styled(Column)`
  align-items: flex-start;
  gap: 32px;
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
  white-space: nowrap;
  & > :first-child {
    font-weight: 700;
    font-size: 32px;
  }
`

export const Community = styled(Column)`
  align-items: flex-start;
  gap: 32px;
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
  white-space: nowrap;
  & > :first-child {
    font-weight: 700;
    font-size: 32px;
  }
`

