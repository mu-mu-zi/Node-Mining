import Box from 'components/BaseElement'
import React from 'react'
import styled from 'styled-components'

const Node = styled(Box)`
  /* border: 1px solid ${({theme}) => theme.colors.normal}; */
  background: ${({theme}) => theme.colors.normal};
  padding: .16rem .52rem;
  font-size: .2rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border-radius: 48px;
  &:hover {
    /* border: 1px solid ${({theme}) => theme.colors.hover}; */
    color: #fff;
    background: ${({theme}) => theme.colors.hover};;
  }
  ${({theme}) => theme.mediaWidth.sm`
    padding: 10.5px 52px;
    font-size: 11px;
    font-weight: 800;
  `}
`

export default function Normal(props: any) {
  
  return <Node style={props.style} onClick={props.onClick}>
    {props.children}
  </Node>
}