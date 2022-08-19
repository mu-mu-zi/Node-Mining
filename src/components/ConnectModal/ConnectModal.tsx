import { Typography } from "components/BaseElement";
import { ColumnStart } from "components/BaseElement/Column";
import Modal from "components/Modal/Modal";
import { IOpenModal } from "components/provider/ModalProvider";
import { useTranslation } from 'react-i18next';
import { WALLETS } from "connectwallet/config";
import { ConnectWalletModalStyle, Option } from './ConnectWalletModal.style'

export default function ConnectModal(props: IOpenModal) {
  const {t} = useTranslation()

  return (
    <Modal
      onClose={() => props.destoryComponent()}
      type='drawer'
      style={{ color: '#fff', height: '100%', width: '100%' }}
    >
      <ConnectWalletModalStyle  data-aos="fade-left">
        <Typography
          fontSize="30px"
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
                    fontSize="20px"
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