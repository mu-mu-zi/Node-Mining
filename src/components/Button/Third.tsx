import Box from 'components/BaseElement'
import React from 'react'
import styled from 'styled-components'

const Node = styled(Box)`
  background: #3D3D3D;
  padding: .16rem .52rem;
  font-size: .2rem;
  font-weight: 700;
  color: ${({theme}) => theme.colors.normal};
  cursor: pointer;
  border-radius: 48px;
  text-align: center;
  &:hover {
    color: ${({theme}) => theme.colors.normal};
    /* background: ${({theme}) => theme.colors.hover};; */
  }
  ${({theme}) => theme.mediaWidth.sm`
    padding: 8px 52px;
    font-size: 12px;
  `}
`

export default function SecondBtn(props: any) {
  
  return <Node onClick={props.onClick} style={props.style}>
    {props.children}
  </Node>
}