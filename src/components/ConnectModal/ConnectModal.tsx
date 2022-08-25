import { Typography } from "components/BaseElement";
import { ColumnStart } from "components/BaseElement/Column";
import Modal from "components/Modal/Modal";
import { IOpenModal } from "components/provider/ModalProvider";
import { useTranslation } from 'react-i18next';
import { WALLETS } from "connectwallet/config";
import { ConnectWalletModalStyle, Option } from './ConnectWalletModal.style'
import useTheme from "hooks/useTheme";

interface AA {
  
}

export default function ConnectModal(props: IOpenModal & AA) {
  const {t} = useTranslation()
  const {theme} = useTheme()
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
                <Option key={item.name}>
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