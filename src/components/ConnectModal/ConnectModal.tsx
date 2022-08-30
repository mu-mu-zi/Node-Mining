import { Typography } from "components/BaseElement";
import { ColumnStart } from "components/BaseElement/Column";
import Modal from "components/Modal/Modal";
import { IOpenModal } from "components/provider/ModalProvider";
import { useTranslation } from 'react-i18next';
import { CHAINS, IWallet, WALLETS } from "connectwallet/config";
import { ConnectWalletModalStyle, Option } from './ConnectWalletModal.style'
import useTheme from "hooks/useTheme";
import { CHAIN_ID } from "connectwallet/hooks";
import {useEffect} from 'react';
import {useWeb3React} from '@web3-react/core';
import useRedux from "hooks/useRedux";
import { useAsync } from 'react-use';
import useWalletTools from "hooks/useWalletTools";
import { awaitWrap, Notice } from "utils/tools";
import { generateNonce } from "http/api";
import { useGenerateNonce } from "hooks/useGenerateNonce";
import { loginApi } from '../../http/api';
import { MsgStatus } from "components/messageBox/MessageBox";

export default function ConnectModal(props: IOpenModal) {
  const {account,chainId,provider} = useWeb3React()
  const {t} = useTranslation()
  const {theme} = useTheme()
  const { store, userDispatch } = useRedux()
  const {activate,deactivate} = useWalletTools()
  const { getGenerateNonce } = useGenerateNonce()

  useEffect(() => {
    if(store.walletInfo) {
      activate()
    }
  },[store])

  useEffect(() => {
    if (chainId && account) {
      if (store.token) {
        // props.onConnect?.(walletAddress);
        // userDispatch.setAddress(account)
        // props.destoryComponent();
      } else {
        if (chainId !== CHAINS.BSC.chainId) {
          Notice('You are connected to an unsupported network, please switch to the main BSC network.',MsgStatus.fail)
          deactivate()
          userDispatch.setWalletInfo(null)
        } else {
          sign(account)
        }
      }
    }
  },[account, chainId])

  const connect = async (item:IWallet) => {
    userDispatch.setWalletInfo(item)
    // await item.connector.activate(CHAIN_ID)
    // props.destoryComponent()
  }

  const sign = async (address:string) => {
    let [signData, error] = await awaitWrap(getGenerateNonce(address, provider));
    if(signData) {
      login(address, signData.signatrue)
    } else {
      resetWalletAddress()
    }

  }

  async function login(address: string, signature: string) {
    loginApi({address,signature}).then((res) => {
      userDispatch.setToken(res.data.token)
      userDispatch.setAddress(res.data.address)
      props.destoryComponent()
    }).catch(() => {
      resetWalletAddress()
    })

  }

  function resetWalletAddress() {
    deactivate();
    userDispatch.setAddress(null);
    userDispatch.setWalletInfo(null);
}


  return (
    <Modal
      onClose={() => props.destoryComponent()}
      type={theme.isH5 ? 'h5' : 'drawer'}
      isH5={theme.isH5}
      // style={{ color: '#fff', height: '100%', width: '100%' }}
    >
      <ConnectWalletModalStyle >
        <Typography
          fontSize={theme.isH5 ? '24px' : "30px"}
          fontWeight={700}
          color={'#ffffff'}
        >
          {t(`Connect your wallet`)}
        </Typography>
        <ColumnStart
          gap="16px"
        >
          {
            Object.values(WALLETS).map((item) => {
              return (
                <Option key={item.name}
                  onClick={ () => connect(item)}
                
                >
                  <img src={item.icon} alt="" />
                  <Typography
                    fontSize={theme.isH5 ? '16px' : "20px"}
                    fontWeight={400}
                    color={'#ffffff'}  
                  >
                    {t(`${item.name}`)}
                  </Typography>
                </Option>
              )
            })
          }
        </ColumnStart>
      </ConnectWalletModalStyle>
    </Modal>
  )
}