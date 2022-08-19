import Box from 'components/BaseElement'
import React from 'react'
import styled from 'styled-components'

const Node = styled(Box)`
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

export function EaseBtn(props: any) {
  
  return <Node>
    {props.children}
  </Node>
}