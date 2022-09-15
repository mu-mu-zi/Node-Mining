import Box, { Typography } from "components/BaseElement";
import { MsgStatus } from "components/messageBox/MessageBox";
import Modal from "components/Modal/Modal";
import { IOpenModal } from "components/provider/ModalProvider";
import useTheme from "hooks/useTheme";
import { Notice } from "utils/tools";

interface AA {
  apisecret: string
  name: number
}

export default function ApisecretModal(props: IOpenModal & AA) {

  const { theme } = useTheme()

  const copy = () => {
    const text = `${props.apisecret}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.style.position = 'fixed';
      textarea.style.clip = 'rect(0 0 0 0)';
      textarea.style.top = '0.1rem';
      textarea.value = text;
      textarea.select();
      document.execCommand('copy', true);
      document.body.removeChild(textarea);
    }
    Notice("Replication success.",MsgStatus.success)
  }

  return (
    <Modal
      onClose={() => props.destoryComponent()}
      type={theme.isH5 ? 'modal' : 'modal'}
    // isH5={theme.isH5}
    // style={{ color: '#fff', height: '100%', width: '100%' }}
      style={{background: "#3D3D3D", width: '277px', padding: '32px 16px' }}
    >
      <Box
      
        
      >
        <Typography
          fontSize={'20px'}
          fontWeight='700'
          color="#ffffff"
          textAlign={'center'}
          marginBottom={'16px'}

        >
          {`Node${props.name} Apisecret`}
        </Typography>
        <Typography
          fontSize={'12px'}
          fontWeight='400'
          color="#ffffff"
          marginBottom={'16px'}
          textAlign={'center'}
        >
          This is your Apisecret（Click to copy）
        </Typography>

        <Box
          padding={'.16rem .12rem'}
          border={'1px dashed #6B6B6B'}
          borderRadius={'5px'}
          marginBottom={'16px'}
          onClick={copy}
          cursor={'pointer'}
          textAlign={'center'}
        >
          <Typography
            color="#ffffff"
            fontSize={'.12rem'}
            fontWeight={'450'}
            style={{
              wordBreak: 'break-all'
            }}
          >
            {props.apisecret}
          </Typography>
        </Box>

        <Box
          color={'#F6B91B'}
          fontSize={'.12rem'}
          fontWeight={'400'}
          textAlign={'center'}
          // background={'#FFE6E6'}
        >
          Note: Never disclose this Apisecret, Apisecret is the key to running the node!
        </Box>


      </Box>
    </Modal>
  )
}