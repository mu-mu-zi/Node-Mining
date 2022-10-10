import Box from 'components/BaseElement'
import React from 'react'
import styled from 'styled-components'

const Node = styled(Box)<{padding: string, fontSize: string, width: string}>`
  /* border: 1px solid ${({theme}) => theme.colors.normal}; */
  background: ${({theme}) => theme.colors.normal};
  padding: ${({ padding }) => padding ? padding : '.16rem .52rem'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '.2rem'};
  width: ${({ width }) => width ? width : 'initial'};
  /* font-size: .2rem; */
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border-radius: 48px;
  text-align: center;
  &:hover {
    /* border: 1px solid ${({theme}) => theme.colors.hover}; */
    color: #fff;
    background: ${({theme}) => theme.colors.hover};;
  }
  &.disabled {
    background: ${({theme}) => theme.colors.disabled};
    cursor: not-allowed;
    pointer-events: none;
  }
  ${({ theme, padding, fontSize }) => theme.mediaWidth.sm`
    padding: 10.5px 52px;
    padding: ${padding ? padding : '10.5px 52px'};
    font-size: 11px;
    font-size: ${fontSize ? fontSize : '11px'};
    font-weight: 800;
  `}
`

export default function Normal(props: any) {
  
  return <Node width={props.width} padding={props.padding} fontSize={props.fontSize}  className={props.name} style={props.style} onClick={props.onClick}>
    {props.children}
  </Node>
}