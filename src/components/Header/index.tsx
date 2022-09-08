import React, { useContext, useState, useEffect, useRef, useLayoutEffect } from 'react'
import useScrollPosition from '@react-hook/window-scroll'
import { HeaderFrame, HeaderContent, ConnectWallet, HeaderLinks, Logo, HeaderOccupy, Menu, Occupy, Logout } from './HeaderStyled'
import RouterLink from './RouterLink';
import { useTranslation } from 'react-i18next';
import Box, { Typography } from 'components/BaseElement';
import { Row } from 'components/BaseElement/Row';
import { ModalContext } from 'components/provider/ModalProvider';
import ConnectModal from 'components/ConnectModal/ConnectModal';
import NavModal from 'components/NavModal/NavModal';
import useRedux from 'hooks/useRedux';
import { formatAddress } from 'utils/tools';
import { Popover } from '@douyinfe/semi-ui';
import { useWeb3React } from '@web3-react/core';
import { adminAddress } from 'utils/global';


export default function Header() {
  const { t } = useTranslation()
  const { openModal } = useContext(ModalContext);
  const { store, userDispatch } = useRedux()
  const [displayBtnStr, setDisplayBtnStr] = useState<string>()
  const [showLogout, setShowLogout] = useState<boolean>(false)
  const [showAdmin, setShowAdmin] = useState<boolean>(false)
  const customRef = useRef<HTMLDivElement | null>(null);
  const { account } = useWeb3React()
  // const scrollY = useScrollPosition()
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!customRef.current || !displayBtnStr) return
    setWidth(customRef.current.offsetWidth - 3);
  }, [displayBtnStr]);

  useEffect(() => {
    if(adminAddress.toLowerCase() === account?.toLowerCase()) {
      setShowAdmin(true)
    } else {
      setShowAdmin(false)
    }
  },[account])

  useEffect(() => {
    if (store.address) {
      setDisplayBtnStr(formatAddress(store.address))
    } else {
      setDisplayBtnStr("CONNECT WALLET")
    }
  }, [store.address])
  const openBox = () => {
    if (displayBtnStr !== "CONNECT WALLET") {
      setShowLogout(true)
    } else {
      openModal(ConnectModal)
    }

  }

  const FnLogout = () => {
    userDispatch.logout()
    setShowLogout(false)
  }

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
              openModal(NavModal, {

              })
            }}
          >
            <img src={require('assets/svg/icon_menu.svg').default} alt="" />
          </Menu>
          <HeaderLinks>
            <RouterLink to={"/"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`HOME`)}</RouterLink>
            <RouterLink to={"/digital"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`DID DIGITAL ID`)}</RouterLink>
            <RouterLink to={"/metaverse"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`METAVERSE`)}</RouterLink>
            <RouterLink
              // style={{pointerEvents:'none'}}
              to={"/nodes"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`NODES`)}</RouterLink>
            <RouterLink
              // style={{pointerEvents:'none'}}
              to={"/mynodes"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`MY NODES`)}</RouterLink>
            <RouterLink
              // style={{pointerEvents:'none'}}
              to={"/aboutus"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`ABOUT US`)}</RouterLink>
            <RouterLink
              style={{
                display: `${showAdmin ? "block" : "none"}`
              }}
              // style={{pointerEvents:'none'}}
              to={"/admin"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`ADMIN`)}</RouterLink>
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
        <Popover
          trigger='custom'
          visible={showLogout}
          position={'bottom'}
          spacing={0}
          onClickOutSide={() => setShowLogout(false)}
          content={<Logout
            width={width + 'px'}
            onClick={FnLogout}>
            <Typography
              color={'#F6B91B'}
            >
              LOG OUT
            </Typography>
          </Logout>}
        >
          <ConnectWallet
            ref={customRef}
            // style={{pointerEvents:'none'}}
            draggable={true}
            onClick={openBox}
          >
            {t(`${displayBtnStr}`)}
          </ConnectWallet>
        </Popover>
      </HeaderFrame>
    </HeaderOccupy>
  )
}