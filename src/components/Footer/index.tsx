import { Column, ColumnStart } from 'components/BaseElement/Column'
import { useTranslation } from 'react-i18next';
import { RowStart } from 'components/BaseElement/Row'
import React from 'react'
import { Wrapper, About, Community, Logo, Connect, Icons } from './FooterStyled'
import useTheme from 'hooks/useTheme';

export default function Footer() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  return (
    <Wrapper>
      <ColumnStart
        // gap="75px"
        gap={theme.isH5 ? "16px" : ".75rem"}
      >
        <Logo src={require('assets/svg/logo.svg').default} alt="" />
        <Icons>
          <a
            href="https://t.me/Getaverse_Official"
            target="_blank"
            rel="noreferrer"
          >
            <img src={require('assets/svg/icon_tg.svg').default} alt="" />
          </a>
          <a
            href="https://medium.com/@GetaverseGlobal"
            target="_blank"
            rel="noreferrer"
          >
            <img src={require('assets/svg/icon_m.svg').default} alt="" />
          </a>
          <a
            href="https://discord.com/invite/vGXwF3TdEw"
            target="_blank"
            rel="noreferrer"
          >
            <img src={require('assets/svg/icon_dc.svg').default} alt="" />
          </a>
          <a
            href="https://twitter.com/GetaverseGlobal"
            target="_blank"
            rel="noreferrer"
          >
            <img src={require('assets/svg/icon_tw.svg').default} alt="" />
          </a>
        </Icons>
        <Connect>info@getaverses.com</Connect>
      </ColumnStart>
      <RowStart
        // gap='157px'
        gap={theme.isH5 ? '64px' : '1.57rem'}
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
