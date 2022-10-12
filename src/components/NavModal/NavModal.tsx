import Modal from "components/Modal/Modal";
import { IOpenModal, ModalContext } from "components/provider/ModalProvider";
import { useTranslation } from 'react-i18next';
import useTheme from "hooks/useTheme";
import Normal from "components/Button/Normal";
import ConnectModal from "components/ConnectModal/ConnectModal";
import { useContext, useEffect, useState } from 'react'
import Box, { Typography } from "components/BaseElement";
import RouterLink from "components/Header/RouterLink";
import { Column } from "components/BaseElement/Column";
import styled from "styled-components";
import JumpBtn from "components/Button/BackBtn";
import { adminAddress } from 'utils/global';
import { useWeb3React } from "@web3-react/core";
import useWalletTools from '../../hooks/useWalletTools';
import useRedux from "hooks/useRedux";
interface AA {

}

const HeaderLinks = styled(Column)`
  margin-top: 82px;
  gap: 24px;
  .nav-item {
    font-size: 20px;
    font-weight: 400;
    color: #ffffff;
    text-decoration: none;
  }
  .active {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.normal};;
  }
`

const ConnectWallet = styled.div`
  background: ${({ theme }) => theme.colors.normal};
  padding: 10px 27px;
  font-size: 12px;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  margin-top: 37px;
  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.colors.hover};;

  }
`

export default function NavModal(props: IOpenModal & AA) {
  const { t } = useTranslation()
  const { openModal } = useContext(ModalContext);
  const [showAdmin, setShowAdmin] = useState<boolean>(false)
  const { theme } = useTheme()
  const { store, userDispatch } = useRedux()
  const [showLogout, setShowLogout] = useState<boolean>(false)
  // const { account } = useWeb3React()
  const { accounts, deactivate } = useWalletTools()
  useEffect(() => {
    let account = accounts && accounts[0]
    // 调试
    // if (adminAddress.toLowerCase() === account?.toLowerCase()) {
    if (adminAddress.toLowerCase() !== account?.toLowerCase()) {
      setShowAdmin(true)
    } else {
      setShowAdmin(false)
    }
  }, [accounts])

  useEffect(() => {
    if (store.address) {
      setShowLogout(true)
    } else {
      setShowLogout(false)
    }
  }, [store.address])

  const FnLogout = () => {
    userDispatch.logout()
    deactivate()
    setShowLogout(false)
    props.destoryComponent()
  }
  return (
    <Modal
      onClose={() => props.destoryComponent()}
      type={theme.isH5 ? 'drawer' : 'drawer'}
      isH5={theme.isH5}
    // style={{ color: '#fff', height: '100%', width: '100%' }}
    >
      <Box
        height={'16px'}
        marginTop={'16px'}
      >

        <JumpBtn
          text="BACK"
          // path={-1}
          onClick={() => props.destoryComponent()}
        />
      </Box>

      <HeaderLinks>
        <RouterLink onClick={() => props.destoryComponent()} to={"/"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`HOME`)}</RouterLink>
        <RouterLink onClick={() => props.destoryComponent()} to={"/digital"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`DID DIGITAL ID`)}</RouterLink>
        <RouterLink onClick={() => props.destoryComponent()} to={"/metaverse"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`METAVERSE`)}</RouterLink>
        <RouterLink
          // style={{pointerEvents:'none'}}
          onClick={() => props.destoryComponent()}
          to={"/nodes"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`NODES`)}</RouterLink>
        <RouterLink
          // style={{pointerEvents:'none'}}
          onClick={() => props.destoryComponent()}
          to={"/mynodes"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`MY NODE`)}</RouterLink>
        <RouterLink
          // style={{pointerEvents:'none'}}
          onClick={() => props.destoryComponent()}
          to={"/staking"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`STAKING`)}</RouterLink>
        <RouterLink
          // style={{pointerEvents:'none'}}
          onClick={() => props.destoryComponent()}
          to={"/aboutus"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`WHITEPAPER`)}</RouterLink>
        <RouterLink
          style={{
            display: `${showAdmin ? "block" : "none"}`
          }}
          // style={{pointerEvents:'none'}}
          onClick={() => props.destoryComponent()}
          to={"/admin"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} >{t(`ADMIN`)}</RouterLink>
        <Typography
          display={'none'}
          fontSize={'20px'}
          fontWeight={'400'}
          color={'#ffffff'}
          cursor={'pointer'}

        >EN/CN</Typography>

        <ConnectWallet
          onClick={() => {
            if (!showLogout) {
              openModal(ConnectModal);
              props.destoryComponent()
            } else {
              FnLogout()
            }
          }}
        >
          {t(`${showLogout ? 'LOG OUT' : 'Connect Wallet'}`)}
        </ConnectWallet>

      </HeaderLinks>



    </Modal>
  )
}