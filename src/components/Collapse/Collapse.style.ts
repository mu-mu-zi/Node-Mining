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
  img {
    user-select: none;
  }
`

export const ContentInner = styled.div`
    display: flex;
    flex-direction: column;
    gap: .27rem;
`