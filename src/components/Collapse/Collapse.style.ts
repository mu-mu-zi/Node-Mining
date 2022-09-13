import styled from "styled-components";

export const Pannel = styled.div`
  text-align: left;
  width: 100%;
  .content {
    font-size: .2rem;
    font-weight: 400;
    color: #fff;
    padding-right: .66rem;
    overflow: hidden;
    padding-top: 0.16rem;
    ${({theme}) => theme.mediaWidth.sm`
      font-size: 12px;
      padding-right: 16px;
    `}
  }
`
export const Heading = styled.div`
  /* background-color: #bfa; */
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
  color: #fff;
  font-size: .28rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding-bottom: .2rem;
  border-bottom: 2px solid #3D3D3D;
  &>span {
    width: 100%;
  }
  img {
    user-select: none;
  }
  ${({theme}) => theme.mediaWidth.sm`
    font-size: 16px;
    padding-bottom: 16px;
  `}
`

export const ContentInner = styled.div`
    display: flex;
    flex-direction: column;
    gap: .27rem;
    ${({theme}) => theme.mediaWidth.sm`
      gap: 20px;
    `}
`