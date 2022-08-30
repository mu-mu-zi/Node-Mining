import React, { useContext, useState, useEffect } from 'react'
import useScrollPosition from '@react-hook/window-scroll'
import { HeaderFrame, HeaderContent, ConnectWallet, HeaderLinks, Logo, HeaderOccupy, Menu, Occupy } from './HeaderStyled'
import RouterLink from './RouterLink';
import { useTranslation } from 'react-i18next';
import Box, { Typography } from 'components/BaseElement';
import { Row } from 'components/BaseElement/Row';
import { ModalContext } from 'components/provider/ModalProvider';
import ConnectModal from 'components/ConnectModal/ConnectModal';
import NavModal from 'components/NavModal/NavModal';
import useRedux from 'hooks/useRedux';
import { formatAddress } from 'utils/tools';


export default function Header() {
  const { t } = useTranslation()
  const { openModal } = useContext(ModalContext);
  const {store} = useRedux()
  const [displayBtnStr, setDisplayBtnStr] = useState<string>()
  const scrollY = useScrollPosition()

  useEffect(() => {
    if(store.address) {
      setDisplayBtnStr(formatAddress(store.address))
    } else {
      setDisplayBtnStr("CONNECT WALLET")
    }
  },[store.address])

  return (
    <HeaderOccupy>
      <HeaderFrame>
        
        <HeaderContent>
          <Occupy />
          <Row>
            <Logo src={require('assets/svg/logo.svg').default} alt="" />
          </Row>
          <Menu
            onClick={() => {
              openModal(NavModal,{
                
              })
            }}
          >
            <img src={require('assets/svg/icon_menu.svg').default} alt="" />
          </Menu>
          <HeaderLinks>
              <RouterLink to={"/"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`HOME`)}</RouterLink>
              <RouterLink to={"/digital"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`DID DIGITAL ID`)}</RouterLink>
              <RouterLink to={"/metaverse"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`METAVERSE`)}</RouterLink>
              <RouterLink 
              // style={{pointerEvents:'none'}}
               to={"/nodes"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`NODES`)}</RouterLink>
              <RouterLink 
              // style={{pointerEvents:'none'}}
               to={"/mynodes"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`MY NODES`)}</RouterLink>
              <RouterLink 
              // style={{pointerEvents:'none'}}
               to={"/aboutus"} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`} >{t(`ABOUT US`)}</RouterLink>
              <Typography
                display={'none'}
                // fontSize={'20px'}
                fontSize={'.2rem'}
                fontWeight={'400'}
                color={'#ffffff'}
                cursor={'pointer'}
                
              >EN/CN</Typography>

          </HeaderLinks>
        </HeaderContent>
        <ConnectWallet
          // style={{pointerEvents:'none'}}
          draggable={true}
          onClick={() => {
            openModal(ConnectModal)
          }}
        >
            {t(`${displayBtnStr}`)}
        </ConnectWallet>
      </HeaderFrame>
    </HeaderOccupy>
  )
}