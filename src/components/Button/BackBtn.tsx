import Box, { Typography } from 'components/BaseElement'
import { Row } from 'components/BaseElement/Row'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import useTheme from 'hooks/useTheme';


interface Iprops {
  text: string
  path?: string | number
  onClick?(): void
}

export default function JumpBtn(props: Iprops) {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const {theme} = useTheme()
  const JumpUrl = () => {
    if(typeof props.path === 'number') {
      navigate(props.path)
    } else {
      navigate(`${props.path}`)
    }
  }
  return(
    <Row
      onClick={props.onClick || JumpUrl}
      gap="5px"
      width={'min-content'}
      cursor="pointer"
    >

      <img 
      
        width={theme.isH5 ? "12px" : 'auto'}
        height={theme.isH5 ? "16px" : 'auto'}
        src={require('assets/svg/icon_back.svg').default} />
      <Typography
        fontSize={theme.isH5 ? '11px' : '.2rem'}
        fontWeight={'350'}
        color={'#fff'}
        fontStyle={'italic'}
        whiteSpace={'nowrap'}
      >
        {t(`${props.text}`)}
      </Typography>
    </Row>
  )
}