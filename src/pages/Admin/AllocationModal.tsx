import Box, { Typography, Text } from "components/BaseElement";
import Flex from "components/BaseElement/Flex";
import { Icon } from "components/BaseElement/Icon";
import { CloseMessageBox, MsgStatus } from "components/messageBox/MessageBox";
import Modal from "components/Modal/Modal";
import { IOpenModal } from "components/provider/ModalProvider";
import useTheme from "hooks/useTheme";
import { isInputNumber, Notice } from "utils/tools";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import Input from "components/form/Input";
import { ColumnStart } from "components/BaseElement/Column";
import Normal from "components/Button/Normal";
import Third from "components/Button/Third";
import { Title } from "./Staking";
import { adminAddress, Decimals } from "utils/global";
import { useEffectState } from '../../hooks/useEffectState';
import DatePickerZ from "components/DatePicker/DatePicker";
import { PledgeContract } from "utils/ContractAddresses";
import { usePledgeLpPool } from "hooks/useContract";
import BigNumber from "bignumber.js";
import { Dispatch, SetStateAction } from "react";

interface AA {
  reload: boolean
  setReload: Dispatch<SetStateAction<boolean>>
}

const FlexTypography = styled(Flex)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  grid-gap: 17px;
  width: 100%;
  ${({ theme }) => theme.mediaWidth.sm`
    flex-direction: column;
    align-items: self-start;
  `}
`
type BaseValueType = string | number | Date;
type ValueType = BaseValueType | BaseValueType[] | undefined;

export default function AllocationModal(props: IOpenModal & AA) {
  const { reload, setReload } = props
  const { t } = useTranslation()
  const { theme } = useTheme()
  const state = useEffectState({
    MiningTime: '' as ValueType,
    bonus: '',
  })
  const PledgeLp = usePledgeLpPool()

  const onRewardAmount = async () => {
    if (!PledgeLp) return
    if (!state.bonus) {
      Notice(`amount can't be empty`, MsgStatus.fail)
    }
    try {
      let param = null
      param = new BigNumber(parseFloat(state.bonus)).multipliedBy(10 ** Decimals).dp(0).toFixed()
      const tx = await PledgeLp.setRewardAmount(param)
      FnReload(tx)
    } catch (e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }

  const FnReload = async (tx: any) => {
    Notice('Please wait', MsgStatus.loading)
    await tx.wait()
    CloseMessageBox()
    Notice('modify successfully', MsgStatus.success)
    setReload(!reload)
    props.destoryComponent()
  }


  return (
    <Modal
      // onClose={() => props.destoryComponent()}
      type={theme.isH5 ? 'modal' : 'modal'}
      // isH5={theme.isH5}
      style={{ background: "#1A1919", width: theme.isH5 ? '90%' : '7.77rem', padding: '24px' }}
    >
      <ColumnStart gridGap={theme.isH5 ? '24px' : ".24rem"}>

        <Title>
          {t(`Distribution of GETA tokens`)}
        </Title>

        <FlexTypography>
          <Text width={'185px'} fontWeight={'400'} fontSize={theme.isH5 ? '14px' : '.2rem'} color={'#ffffff'} >{t(`Amount`)}</Text>
          <Inp
            // regex={[{regStr: NUMBER_REG, tips: ""}]}
            value={state.bonus}
            onChange={(value) => {
              if ((value === "" || isInputNumber(value))) {
                state.bonus = value
              }
            }}
            placeholder={`Please enter today's distribution quantity`}
            right={<Flex alignItems={'center'} padding={theme.isH5 ? '0 18px' : '0 .18rem'} >
              <Text fontSize={theme.isH5 ? '12px' : '.2rem'} fontWeight={'400'} color={'#6B6B6B'}>{t(`GETA`)}</Text>
            </Flex>}
          />
        </FlexTypography>

        <FlexTypography>
          <Text width={'185px'} fontWeight={'400'} fontSize={theme.isH5 ? '14px' : '.2rem'} color={'#ffffff'} >{t(`Contract Address`)}</Text>
          <Inp
            value={PledgeContract.LpPool}
            disabled
            className="disabled"
          />
        </FlexTypography>

        {/* <FlexTypography>
          <Text width={'185px'} fontWeight={'400'} fontSize={theme.isH5 ? '14px' : '.2rem'} color={'#ffffff'} >{t(`Mining time`)}</Text>
          <DatePickerZ
            onChange={(date,dateString) => {
              state.MiningTime = dateString
            }}
            value={state.MiningTime}
            // format={formatToken}
            format="yyyy-MM-dd HH:mm:ss"
            zIndex={10001}
            type="dateTime"
            triggerRender={({ placeholder }) => (
              <Inp
                disabled
                value={state.MiningTime as string}
                placeholder={`Please select the mining start time`}
                right={<Flex alignItems={'center'} padding={theme.isH5 ? '0 18px' : '0 .18rem'} >
                  <Icon src={require('assets/svg/icon_calendar.svg').default} />
                </Flex>}
              />
            )}
        />
        
        </FlexTypography> */}

        <Flex width={'100%'} justifyContent={'center'} alignItems={'center'} gridGap={theme.isH5 ? '16px' : '.24rem'} alignSelf={'center'}>
          <Third
            style={{
              padding: theme.isH5 ? '8px 0' : '.1rem 0',
              width: theme.isH5 ? '100%' : '1.75rem'
            }}
            onClick={() => props.destoryComponent()}
          >CANCEL</Third>
          <Normal onClick={onRewardAmount} padding={theme.isH5 ? '8px 0' : '.1rem 0 '} width={theme.isH5 ? '100%' : '1.75rem'}>CONFIRM</Normal>
        </Flex>

      </ColumnStart>
    </Modal>
  )
}

const Inp = styled(Input)`
  background: transparent;
  border: 1px solid #6B6B6B;
  border-radius: 60px;
  flex: 1;
  min-width: 5.24rem;
  padding: 0 0 0 12px;
  box-sizing: border-box;
  height: .4rem;
  font-size: .14rem;
  ${({ theme }) => theme.mediaWidth.sm`
    height: 32px;
    width: 100%;
    min-width: initial;
    font-size: 12px;
  `}
  &:hover {
    border: 1px solid #00E88A;
    color: #00E88A;
    .email-input {
      ::placeholder {
        color: #00E88A;
      }
    }
    .submit {
      color: #ffffff;
      background: ${({ theme }) => theme.colors.hover};;
    }
  }
  &:active {
    border: 1px solid #00E88A;
    color: #00E88A;
    ::placeholder {
      color: #00E88A;
    }
  }
  &:focus {
    border: 1px solid #00E88A;
    color: #00E88A;
    ::placeholder {
      color: #00E88A;
    }
  }
  &.disabled {
    border: 1px solid #3D3D3D;
    color: #3D3D3D;
    background-color: rgba(217, 217, 217, 0.1);
  }
  &:disabled {
    border: 1px solid #3D3D3D;
    color: #3D3D3D;
    background-color: rgba(217, 217, 217, 0.1);
  }

.input {
    color: #00E88A;
    border: none;
    outline: unset;
    font-size: .14rem;
    ::placeholder {
      color: #6B6B6B;
      font-size: .14rem;
    }
    &:hover {
      color: #00E88A;
      ::placeholder {
        color: #00E88A;
      }
    }
    &:active {
      color: #00E88A;
      ::placeholder {
        color: #00E88A;
      }
    }
    &:focus {
      color: #00E88A;
      ::placeholder {
        color: #00E88A;
      }
    }
    &:disabled {
      color: #6B6B6B;
    }
    ${({ theme }) => theme.mediaWidth.sm`
      font-size: 12px;
      height: 31px;
    `}
  }
  .adminInput {
    color: #ffffff;
  }
`