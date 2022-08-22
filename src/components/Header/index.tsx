import React, {useContext} from 'react'
import useScrollPosition from '@react-hook/window-scroll'
import { HeaderFrame, HeaderContent, ConnectWallet, HeaderLinks, Logo, HeaderOccupy } from './HeaderStyled'
import RouterLink from './RouterLink';
import { useTranslation } from 'react-i18next';
import Box, { Typography } from 'components/BaseElement';
import { Row } from 'components/BaseElement/Row';
import { ModalContext } from 'components/provider/ModalProvider';
import ConnectModal from 'components/ConnectModal/ConnectModal';

export default function Header() {
  const { t } = useTranslation()
  const {openModal, destoryModal} = useContext(ModalContext);
  const scrollY = useScrollPosition()

  return (
    <HeaderOccupy>
      <HeaderFrame>
        <HeaderContent>
          <Row>
            <Logo src={require('assets/svg/logo.svg').default} alt="" />
          </Row>
          
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
          onClick={() => {
            openModal(ConnectModal)
          }}
        >
            {t(`CONNECT WALLET`)}
        </ConnectWallet>
      </HeaderFrame>
    </HeaderOccupy>
  )
}