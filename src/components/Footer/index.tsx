import { Column, ColumnStart } from 'components/BaseElement/Column'
import { useTranslation } from 'react-i18next';
import { RowStart } from 'components/BaseElement/Row'
import React from 'react'
import { Wrapper, About, Community, Logo, Connect, Icons } from './FooterStyled'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ColumnStart
        gap="75px"
      >
        <Logo src={require('assets/svg/logo.svg').default} alt="" />
        <Icons>
          <img src={require('assets/svg/icon_tg.svg').default} alt="" />
          <img src={require('assets/svg/icon_m.svg').default} alt="" />
          <img src={require('assets/svg/icon_dc.svg').default} alt="" />
          <img src={require('assets/svg/icon_tw.svg').default} alt="" />
        </Icons>
        <Connect>info@getaverses.com</Connect>
      </ColumnStart>
      <RowStart
        gap='157px'
      >
        <About>
          <span>{t(`About`)}</span>
          <span>{t(`DID Digital ID`)}</span>
          <span>{t(`Metaverse`)}</span>
          <span>{t(`Nodes`)}</span>
          <span>{t(`My Nodes`)}</span>
          <span>{t(`About Us`)}</span>
        </About>
        <Community>
          <span>{t(`Community`)}</span>
          <span>{t(`Telegram`)}</span>
          <span>{t(`Medium`)}</span>
          <span>{t(`Discord`)}</span>
          <span>{t(`Twitter`)}</span>
        </Community>
      </RowStart>
    </Wrapper>
  )
}
