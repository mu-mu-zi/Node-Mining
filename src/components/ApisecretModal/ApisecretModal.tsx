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
    Notice("Copy successfully",MsgStatus.success)
  }

  return (
    <Modal
      onClose={() => props.destoryComponent()}
      type={theme.isH5 ? 'modal' : 'modal'}
    // isH5={theme.isH5}
    // style={{ color: '#fff', height: '100%', width: '100%' }}
    >
      <Box>
        <Typography
          fontSize={'20px'}
          fontWeight='400'
          color="#ffffff"
          textAlign={'center'}
          marginBottom={'36px'}
        >
          {`Node${props.name} Apisecret`}
        </Typography>
        <Typography
          fontSize={'20px'}
          fontWeight='400'
          color="#ffffff"
          marginBottom={'13px'}
        >
          This is your Apisecret（Click to copy）
        </Typography>

        <Box
          padding={'28px 12px'}
          border={'1px solid #6B6B6B'}
          borderRadius={'5px'}
          marginBottom={'23px'}
          onClick={copy}
          cursor={'pointer'}
        >
          <Typography
            color="#F94242"
            fontSize={'16px'}
            fontWeight={'400'}
          >
            {props.apisecret}
          </Typography>
        </Box>

        <Box
          padding={'4px 12px'}
          color={'#ffffff'}
          fontSize={'10px'}
          fontWeight={'400'}
          border={'1px solid #6B6B6B'}
          borderRadius={'5px'}
          // background={'#FFE6E6'}
        >
          Note: Never disclose this Apisecret, Apisecret is the key to running the node!
        </Box>


      </Box>
    </Modal>
  )
}