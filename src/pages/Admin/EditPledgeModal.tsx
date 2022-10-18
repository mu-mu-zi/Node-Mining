import Box, { Typography, Text } from "components/BaseElement";
import Flex from "components/BaseElement/Flex";
import { Icon } from "components/BaseElement/Icon";
import { CloseMessageBox, MsgStatus } from "components/messageBox/MessageBox";
import Modal from "components/Modal/Modal";
import { IOpenModal } from "components/provider/ModalProvider";
import useTheme from "hooks/useTheme";
import { Notice } from "utils/tools";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import Input from "components/form/Input";
import { ColumnStart } from "components/BaseElement/Column";
import Normal from "components/Button/Normal";
import Third from "components/Button/Third";
import { Title } from "./Staking";
import { RowBetween, RowCenter } from "components/BaseElement/Row";
import { adminAddress, Decimals, EmptyStr } from "utils/global";
import DropDown from "components/dropDown/DropDown";
import { useEffectState } from "hooks/useEffectState";
import { Dispatch, SetStateAction, useState } from "react";
import DatePickerZ from "components/DatePicker/DatePicker";
import { usePledgeGetaPool } from "hooks/useContract";
import BigNumber from "bignumber.js";
import { usePledgeLpPool } from '../../hooks/useContract';
import { useAsync } from "react-use";

interface AA {
  kind: number
  type: number
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
    grid-gap: 13px;
    flex-direction: column;
    align-items: self-start;
  `}
`
type BaseValueType = string | number | Date;
type ValueType = BaseValueType | BaseValueType[] | undefined;

export default function EditPledgeModal(props: IOpenModal & AA) {
  const { reload, setReload } = props
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [selectCoin, setSelectCoin] = useState<{ text: string; value: number }>()
  const [selectType, setSelectType] = useState<{ text: string; value: number }>()
  const PledgeGetaPool = usePledgeGetaPool()
  const PledgeLp = usePledgeLpPool()

  const state = useEffectState({
    selectOption: [
      { text: 'Single Currency Stake', value: 1 },
      { text: 'Liquidity Stake', value: 2 }
    ],
    selectTypeOption: [
      [
        { text: 'APR', value: 1 },
        { text: 'Handling fee', value: 2 },
        { text: 'Stake Minimum', value: 4 },
        { text: 'Stake Maximum', value: 5 },
        { text: 'StartTime', value: 3 },
      ],
      [
        { text: 'Handling fee', value: 1 },
        { text: 'Stake Minimum', value: 3 },
        { text: 'Stake Maximum', value: 4 },
        { text: 'StartTime', value: 2 },
      ]

    ],
    MiningTime: '' as ValueType,
    parameters: '',
    timestamp: 0,
  })
  // test 
  useAsync(async () => {
    if (!PledgeGetaPool || !PledgeLp) return
    const startTime = await PledgeGetaPool.startTime()
    if (startTime.toString() !== '0') {
      state.selectTypeOption[0] = [
        { text: 'APR', value: 1 },
        { text: 'Handling fee', value: 2 },
        { text: 'Stake Minimum', value: 4 },
        { text: 'Stake Maximum', value: 5 },
      ]
    }
    const isLpStart = await PledgeLp.isStarted()
    if (isLpStart) {
      state.selectTypeOption[1] = [
        { text: 'Handling fee', value: 1 },
        { text: 'Stake Minimum', value: 3 },
        { text: 'Stake Maximum', value: 4 },
      ]
    }

  }, [PledgeGetaPool, PledgeLp])

  const onSubmit = () => {
    try {
      if (state.parameters && state.timestamp) {
        Notice(`input can't be empty`, MsgStatus.fail)
        return
      }
      if (selectCoin?.value === 1) {
        if (selectType?.value === 1) {

          setSingleAPR()
        }
        if (selectType?.value === 2) {
          setSingleFeeRate()
        }
        if (selectType?.value === 3) {
          setSingleStartPool()
        }
        if (selectType?.value === 4) {
          setSingleMinimum()
        }
        if (selectType?.value === 5) {
          setSingleMaximum()
        }
      } else {
        if (selectType?.value === 1) {
          setLpFeeRate()
        }
        if (selectType?.value === 2) {
          setLpStartPool()
        }
        if (selectType?.value === 3) {
          setLpMinimum()
        }
        if (selectType?.value === 4) {
          setLpMaximum()
        }
      }
    } catch (e) {

    }
  }


  const setSingleAPR = async () => {
    if (!PledgeGetaPool) return
    try {
      let param = null
      param = new BigNumber(parseFloat(state.parameters)).div(86400 * 365).multipliedBy(10 ** Decimals).div(100).dp(0).toFixed()
      const tx = await PledgeGetaPool.setAPY(param)
      FnReload(tx)
    } catch (e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }

  const setSingleFeeRate = async () => {
    if (!PledgeGetaPool) return
    try {
      let param = null
      param = new BigNumber(parseFloat(state.parameters)).multipliedBy(10 ** Decimals).div(100).dp(0).toFixed()
      const tx = await PledgeGetaPool.setFeeRate(param)
      FnReload(tx)
    } catch (e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }

  const setSingleStartPool = async () => {
    if (!PledgeGetaPool) return
    try {
      let unixTamp = new BigNumber(state.timestamp).div(10 ** 3).toFixed()
      const tx = await PledgeGetaPool.startPool(unixTamp)
      FnReload(tx)
    } catch (e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }

  const setSingleMinimum = async () => {
    if (!PledgeGetaPool) return
    try {
      let param = null
      param = new BigNumber(parseFloat(state.parameters)).multipliedBy(10 ** Decimals).dp(0).toFixed()
      const tx = await PledgeGetaPool.setMinStakeAmount(param)
      FnReload(tx)
    } catch (e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }
  const setSingleMaximum = async () => {
    if (!PledgeGetaPool) return
    try {
      let param = null
      param = new BigNumber(parseFloat(state.parameters)).multipliedBy(10 ** Decimals).dp(0).toFixed()
      const tx = await PledgeGetaPool.setMaxStakeAmount(param)
      FnReload(tx)
    } catch (e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }

  const setLpFeeRate = async () => {
    if (!PledgeLp) return
    try {
      let param = null
      param = new BigNumber(parseFloat(state.parameters)).multipliedBy(10 ** Decimals).div(100).dp(0).toFixed()
      const tx = await PledgeLp.setFeeRate(param)
      FnReload(tx)
    } catch (e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }

  const setLpStartPool = async () => {
    if (!PledgeLp) return
    try {
      let unixTamp = new BigNumber(state.timestamp).div(10 ** 3).toString()
      const tx = await PledgeLp.startPool(unixTamp)
      FnReload(tx)
    } catch (e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }

  const setLpMinimum = async () => {
    if (!PledgeLp) return
    try {
      let param = null
      param = new BigNumber(parseFloat(state.parameters)).multipliedBy(10 ** Decimals).dp(0).toFixed()
      const tx = await PledgeLp.setMinStakeAmount(param)
      FnReload(tx)
    } catch (e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }

  const setLpMaximum = async () => {
    if (!PledgeLp) return
    try {
      let param = null
      param = new BigNumber(parseFloat(state.parameters)).multipliedBy(10 ** Decimals).dp(0).toFixed()
      const tx = await PledgeLp.setMaxStakeAmount(param)
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
      <ColumnStart gridGap={theme.isH5 ? '16px' : ".24rem"}>

        <Title>
          {t(`Edit Stake Parameters`)}
        </Title>

        <FlexTypography >
          <Text width={'185px'} fontWeight={'400'} fontSize={theme.isH5 ? '14px' : '.2rem'} color={'#ffffff'} >{t(`Stake Type`)}</Text>
          <Inp
            disabled
            value={selectCoin?.text}
            right={
              <RowCenter
                height={theme.isH5 ? '32px' : '.38rem'}
                cursor={'pointer'}
              >
                <DropDown
                  options={state.selectOption}
                  defaultValue={state.selectOption[props.kind]?.value}
                  onChange={(selectd) => {
                    setSelectCoin(selectd)
                  }}
                >
                  <Icon
                    display={'block'}
                    // onClick={() => console.log('123')}
                    marginRight={'16px'}
                    src={require('assets/svg/Rectangle39.svg').default}
                  ></Icon>
                </DropDown>
              </RowCenter>
            }
          />
        </FlexTypography>

        <FlexTypography >
          <Text width={'185px'} fontWeight={'400'} fontSize={theme.isH5 ? '14px' : '.2rem'} color={'#ffffff'} >{t(`Type`)}</Text>
          <Inp
            disabled
            value={selectType?.text}
            right={
              <RowCenter
                height={theme.isH5 ? '32px' : '.38rem'}
                cursor={'pointer'}
              >
                <DropDown
                  options={state.selectTypeOption[selectCoin && (selectCoin?.value - 1) || props.kind]}
                  defaultValue={state.selectTypeOption[props.kind][props.type] && state.selectTypeOption[props.kind][props.type].value || state.selectTypeOption[0][0].value}
                  onChange={(selectd) => {
                    setSelectType(selectd)
                  }}
                >
                  <Icon
                    display={'block'}
                    // onClick={() => console.log('123')}
                    marginRight={'16px'}
                    src={require('assets/svg/Rectangle39.svg').default}
                  ></Icon>
                </DropDown>
              </RowCenter>
            }
          />
        </FlexTypography>
        {
          selectType && selectType.text === 'StartTime' ?
            <FlexTypography>
              <Text width={'185px'} fontWeight={'400'} fontSize={theme.isH5 ? '14px' : '.2rem'} color={'#ffffff'} >{t(`Parameter`)}</Text>
              <DatePickerZ
                onChange={(date, dateString) => {
                  state.MiningTime = dateString
                  state.timestamp = Number(date?.valueOf()) || 0
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
                    right={<Flex alignItems={'center'} padding={'0 18px'} >
                      <Icon src={require('assets/svg/icon_calendar.svg').default} />
                    </Flex>}
                  />

                )}
              />
            </FlexTypography>
            :
            <FlexTypography>
              <Text width={'185px'} fontWeight={'400'} fontSize={theme.isH5 ? '14px' : '.2rem'} color={'#ffffff'} >{t(`Parameter`)}</Text>
              <Inp
                value={state.parameters}
                placeholder={`Please enter parameter`}
                onChange={(value) => {
                  state.parameters = value
                }}
              // className="disabled"
              />
            </FlexTypography>


        }

        <Flex width={'100%'} justifyContent={'center'} alignItems={'center'} gridGap={theme.isH5 ? '16px' : '.24rem'} alignSelf={'center'}>
          <Third
            style={{
              padding: theme.isH5 ? '8px 0' : '.1rem 0',
              width: theme.isH5 ? '100%' : '1.75rem'
            }}
            onClick={() => props.destoryComponent()}
          >CANCEL</Third>
          <Normal onClick={onSubmit} padding={theme.isH5 ? '8px 0' : '.1rem 0 '} width={theme.isH5 ? '100%' : '1.75rem'}>CONFIRM</Normal>
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
    color: #ffffff;
    background-color: rgba(217, 217, 217, 0.1);
  }

.input {
    color: #ffffff;
    border: none;
    outline: unset;
    font-size: .14rem;
    height: 31px;
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
      color: #ffffff;
    }
    ${({ theme }) => theme.mediaWidth.sm`
      font-size: 12px;
    `}
  }
  .adminInput {
    color: #ffffff;
  }
`