import { Typography } from "components/BaseElement";
import { ColumnStart } from "components/BaseElement/Column";
import Modal from "components/Modal/Modal";
import { IOpenModal } from "components/provider/ModalProvider";
import { useTranslation } from 'react-i18next';
import { IWallet, WALLETS } from "connectwallet/config";
import { ConnectWalletModalStyle, Option } from './ConnectWalletModal.style'
import useTheme from "hooks/useTheme";
import { CHAIN_ID } from "connectwallet/hooks";
import {useEffect} from 'react';
import {useWeb3React} from '@web3-react/core';

interface AA {
  
}

export default function ConnectModal(props: IOpenModal & AA) {
  const {account} = useWeb3React()
  const {t} = useTranslation()
  const {theme} = useTheme()

  useEffect(() => {
    console.log(account)
  },[account])

  const connect = async (item:IWallet) => {
    await item.connector.activate(CHAIN_ID)

    // props.destoryComponent()
  }


  return (
    <Modal
      onClose={() => props.destoryComponent()}
      type={theme.isH5 ? 'h5' : 'drawer'}
      isH5={theme.isH5}
      // style={{ color: '#fff', height: '100%', width: '100%' }}
    >
      <ConnectWalletModalStyle  data-aos={theme.isH5 ? "fade-up" : "fade-left"}>
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