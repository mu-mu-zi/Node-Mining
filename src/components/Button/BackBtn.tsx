import Box, { Typography } from 'components/BaseElement'
import { Row } from 'components/BaseElement/Row'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';


interface Iprops {
  text: string
  path?: string | number
  onClick?(): void
}

export default function JumpBtn(props: Iprops) {
  const {t} = useTranslation()
  const navigate = useNavigate()
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

      <img src={require('assets/svg/icon_back.svg').default} />
      <Typography
        fontSize={'.2rem'}
        fontWeight={'350'}
        color={'#fff'}
      >
        {t(`${props.text}`)}
      </Typography>
    </Row>
  )
}