import Box, { Typography } from "components/BaseElement";
import Normal from "components/Button/Normal";
import { MsgStatus } from "components/messageBox/MessageBox";
import Modal from "components/Modal/Modal";
import { IOpenModal } from "components/provider/ModalProvider";
import { CHAINS } from "connectwallet/config";
import useTheme from "hooks/useTheme";
import { Notice } from "utils/tools";
import useRedux from '../../hooks/useRedux';
const fail_icon = require("assets/svg/fail_icon.svg").default;
interface AA {

}

export default function Network(props: IOpenModal & AA) {
  const {store} = useRedux()
  const { theme } = useTheme()

  const NetworkCheck = async() => {
    try{
      await store.walletInfo?.connector.activate(CHAINS.BSC)
      props.destoryComponent()
    }catch(e: any) {
      let reason = JSON.parse(JSON.stringify(e.message))
      Notice( `${reason}`,MsgStatus.fail)
      props.destoryComponent()
    }
  
  }

  return (
    <Modal
      onClose={() => props.destoryComponent()}
      type={theme.isH5 ? 'modal' : 'modal'}
    // isH5={theme.isH5}
    // style={{ color: '#fff', height: '100%', width: '100%' }}
      style={{background: "#3D3D3D", width: '272px', padding: '16px' }}
    >
      <Box 
        display={"flex"}
        flexDirection={"column"}
        gridGap={"16px"}
        textAlign={"center"}
        alignItems={'center'}
      >

        <img style={{
          width: '32px',
          height: '32px',
        }} src={fail_icon} className={"icon"} alt="" />

        <Typography
          fontSize={"12px"}
          fontWeight={'400'}
          color={'#ffffff'}
        >
          Sorry, you are currently connected to ETH main network, please switch to BSC main network to withdraw coins.
        </Typography>
        
        <Normal
          style={{
            fontSize: '14px',
            padding: '10.5px 17.5px',
            textAlign: 'center'
          }}
          onClick={NetworkCheck}
        >
          Switching Networks
        </Normal>

      </Box>
    </Modal>
  )
}