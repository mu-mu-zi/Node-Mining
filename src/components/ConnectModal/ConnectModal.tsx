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
// import {useWeb3React} from '@web3-react/core';
import useRedux from "hooks/useRedux";
import { useAsync } from 'react-use';
import useWalletTools from "hooks/useWalletTools";
import { awaitWrap, Notice } from "utils/tools";
import { generateNonce } from "http/api";
import { useGenerateNonce } from "hooks/useGenerateNonce";
import { loginApi } from '../../http/api';
import { MsgStatus } from "components/messageBox/MessageBox";

export default function ConnectModal(props: IOpenModal) {
  // const {provider} = useWeb3React()
  const {t} = useTranslation()
  const {theme} = useTheme()
  const { store, userDispatch } = useRedux()
  const { activate, deactivate, accounts, chainId, provider} = useWalletTools()
  const { getGenerateNonce } = useGenerateNonce()

  useEffect(() => {
    if(sessionStorage.getItem("wallet_name")) {
      console.log('123124ashfgdasjugfrasjh')
      console.log('accounts',accounts)
      activate()
    }
  },[store])

  useEffect(() => {
    console.log('accounts', accounts)
    if (chainId && accounts) {
      console.log('333')
      const walletAddress = accounts[0];
      if (store.token) {
        // props.onConnect?.(walletAddress);
        // userDispatch.setAddress(account)
        // props.destoryComponent();
      } else {
        console.log('walletAddress',walletAddress)
        console.log('chainId',chainId)
        if (chainId !== CHAINS.BSC.chainId) {
          Notice('You are connected to an unsupported network, please switch to the main BSC network.',MsgStatus.fail)
          deactivate()
          userDispatch.setWalletInfo(null)
        } else {
          sign(walletAddress)
        }
      }
    }
  },[accounts, chainId, store.token, ])

  const connect = async (item:IWallet) => {
    console.log('connect',item)
    console.log('provider',provider)
    console.log('111')
    userDispatch.setWalletInfo(item)
    // await item.connector.activate(CHAIN_ID)
    // props.destoryComponent()
  }

  const sign = async (address:string) => {
    console.log('444')
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
            Object.values(WALLETS).map((item,index) => {
              return (
                <Option key={index}
                  onClick={ () => {
                    // @ts-ignore
                    if (window[item.keyword] || ( window.solana && window.solana[item.keyword] || window.ethereum && window.ethereum[item.keyword])) {

                      connect(item)
                    }else {
                      window.open(`${item.download}`)
                    }
                  
                  }}
                
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