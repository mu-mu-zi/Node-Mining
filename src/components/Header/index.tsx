import React from 'react'
import useScrollPosition from '@react-hook/window-scroll'
import { HeaderFrame, HeaderContent, ConnectWallet, HeaderLinks, Logo, HeaderOccupy } from './HeaderStyled'
import RouterLink from './RouterLink';
import { useTranslation } from 'react-i18next';
import Box, { Typography } from 'components/BaseElement';

export default function Header() {
  const { t } = useTranslation()
  const scrollY = useScrollPosition()

  return (
    <HeaderOccupy>
      <HeaderFrame>
        <HeaderContent>
          <Box>
            <Logo src={require('assets/svg/logo.svg').default} alt="" />
          </Box>

          <HeaderLinks>
              <RouterLink to={"/"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`HOME`)}</RouterLink>
              <RouterLink to={"/digital"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`DID DIGITAL ID`)}</RouterLink>
              <RouterLink to={"/metaverse"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`METAVERSE`)}</RouterLink>
              <RouterLink to={"/nodes"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`NODES`)}</RouterLink>
              <RouterLink to={"/mynodes"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`MY NODES`)}</RouterLink>
              <RouterLink to={"/aboutus"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`ABOUT US`)}</RouterLink>
              <Typography
                fontSize={'20px'}
                fontWeight={'400'}
                color={'#ffffff'}
                cursor={'pointer'}
                
              >EN/CN</Typography>
              {/* <RouterLink to={"/aboutus"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`ABOUT US`)}</RouterLink> */}
          </HeaderLinks>
        </HeaderContent>
        <ConnectWallet>
            {t(`CONNECT WALLET`)}
        </ConnectWallet>
      </HeaderFrame>
    </HeaderOccupy>
  )
}