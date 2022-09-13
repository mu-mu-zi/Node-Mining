import Modal from "components/Modal/Modal";
import { IOpenModal } from "components/provider/ModalProvider";

import useTheme from "hooks/useTheme";
import Order from "pages/Nodes/Order";
import { Dispatch } from "react";
interface AA {
  setStep: Dispatch<React.SetStateAction<number>>
  state: {
    count: number,
    Invite: string,
    price: any
  }
}

export default function OrderModal(props: IOpenModal & AA) {
  const { theme } = useTheme()
  const {setStep, state} = props
  return (
    <Modal
      onClose={() => {
        props.destoryComponent();
        setStep(1)
      }}
      type={'h5'}
      isH5={true}
      style={{ color: '#fff', height: '100%', width: '100%', display:'flex', alignItems:'end' }}
    >
      <Order setStep={setStep} state={state} />
    </Modal>
  )
}