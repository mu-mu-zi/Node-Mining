import Box, { Typography, Text } from "components/BaseElement";
import Flex from "components/BaseElement/Flex";
import { Icon } from "components/BaseElement/Icon";
import { CloseMessageBox, MsgStatus } from "components/messageBox/MessageBox";
import Modal from "components/Modal/Modal";
import { IOpenModal } from "components/provider/ModalProvider";
import useTheme from "hooks/useTheme";
import { isInputNumber, isInputNumberSix, Notice } from "utils/tools";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import Input from "components/form/Input";
import { ColumnStart } from "components/BaseElement/Column";
import Normal from "components/Button/Normal";
import Third from "components/Button/Third";
import BigNumber from "bignumber.js";
import { usePledgeGetaPool, usePledgeGeta } from "hooks/useContract";
import { useEffectState } from "hooks/useEffectState";
import useRedux from "hooks/useRedux";
import useWalletTools from "hooks/useWalletTools";
import { useAsync } from "react-use";
import { decimalPlaces, Decimals, EmptyStr } from "utils/global";
import { PledgeContract } from "utils/ContractAddresses";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface AA {
  reload: boolean,
  setReload: Dispatch<SetStateAction<boolean>>
}

const Inp = styled(Input)`
  background: transparent;
  border: 2px solid #6B6B6B;
  border-radius: 60px;
  width: 100%;
  /* max-width: 3.68rem; */
  padding: 0 0 0 12px;
  box-sizing: border-box;
  height: .4rem;
  font-size: .14rem;
  ${({ theme }) => theme.mediaWidth.sm`
    height: 32px;
    width: 100%;
    max-width: initial;
    font-size: 12px;
  `}
  &:hover {
    border: 2px solid #00E88A;
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
    border: 2px solid #00E88A;
    color: #00E88A;
    ::placeholder {
      color: #00E88A;
    }
  }
  &:focus {
    border: 2px solid #00E88A;
    color: #00E88A;
    ::placeholder {
      color: #00E88A;
    }
  }

.input {
    color: #00E88A;
    border: none;
    outline: unset;
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
    ${({ theme }) => theme.mediaWidth.sm`
      font-size: 12px;
    `}
  }
  .adminInput {
    color: #ffffff;
  }
`
const Max = styled(Box)`
  line-height: 1;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.normal};
  height: .38rem;
  padding: .085rem .12rem;
  font-size: .2rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border-radius: 60px;
  transform: translateX(1px);
  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.colors.hover};;
  }
  ${({ theme }) => theme.mediaWidth.sm`
    height: 22px;
    width: 44px;
    font-size: 11px;
    border-radius: 48px;
    text-align: center;
    margin-right: 6px;
    line-height: 22px;
  `}
`



export default function SinglePledgeModal(props: IOpenModal & AA) {
  const { t } = useTranslation()
  const { setReload, reload } = props
  const { theme } = useTheme()
  const { accounts, chainId } = useWalletTools()
  const { store } = useRedux()
  const PledgeGetaPool = usePledgeGetaPool(true)
  const PledgeGeta = usePledgeGeta()
  const [approveReload, setApproveReload] = useState<boolean>(false)

  const state = useEffectState({
    getaBalance: new BigNumber(0),
    amount: '',
    approve: '',
    isApproveEnough: true,
  })


  useAsync(async () => { 
    if (!PledgeGeta || !accounts) return
    let account = accounts[0]
    const balance = await PledgeGeta.balanceOf(account)
    state.getaBalance = new BigNumber(balance.toString()).div(10 ** Decimals).dp(decimalPlaces,1)
    let isApprove = await PledgeGeta.allowance(account, PledgeContract.GetaPool)
    state.approve = new BigNumber(isApprove.toString()).div(10 ** Decimals).toFixed()
  },[accounts, PledgeGeta, chainId, store.token, approveReload])

  useEffect(() => {
    if(Number(state.approve) < Number(state.amount)) {
      state.isApproveEnough = false
    } else {
      state.isApproveEnough = true
    }

  },[state.amount, state.approve])

  const onPledges = async () => {
    if (!PledgeGetaPool || !PledgeGeta || !accounts) {
      Notice('Please login to your wallet account first', MsgStatus.fail,)
      return
    }
    if(state.amount === '0' || !state.amount) {
      Notice(`Your staking amount is 0`, MsgStatus.fail)
      return
    }
    
    if(state.getaBalance.lt(state.amount)) {
      Notice('Insufficient balance', MsgStatus.fail,)
      return
    }
    if(Number(state.amount) < 1) {
      Notice('Less than minimum：1', MsgStatus.fail,)
      return
    }

    try{
      let account = accounts[0]
      let tx1: any
      
      if(!state.isApproveEnough) {
        let isApprove = await PledgeGeta.allowance(account, PledgeContract.GetaPool)
        if (Number(isApprove.toString()) < Number(new BigNumber(state.amount).multipliedBy( 10 ** Decimals).toFixed())) {
          try{
            // The overflow of the principal authorized two
            tx1 = await PledgeGeta.approve(PledgeContract.GetaPool, new BigNumber(state.amount).multipliedBy( 10 ** (Decimals + 2)).toFixed())
            Notice('Please wait, your approve will arrive soon.', MsgStatus.loading)
            await tx1.wait()
            CloseMessageBox()
            Notice('successfully approve.', MsgStatus.success)
            setApproveReload(!approveReload)
            return
          }catch(e:any) {
            let msg = JSON.parse(JSON.stringify(e))
            Notice(msg.reason || msg.message, MsgStatus.fail)
            return
          }
        }
      }


      let tx = await PledgeGetaPool.deposit(new BigNumber(state.amount).multipliedBy( 10 ** Decimals).toFixed())
      Notice('Please wait, your stake will arrive soon.', MsgStatus.loading)
      await tx.wait()
      CloseMessageBox()
      Notice('You have successfully staked', MsgStatus.success, {}, <Text fontSize={'12px'} fontWeight={'400'} color={'#F6B91B'}>{`${state.amount} GETA`} </Text>)
      props.destoryComponent()
      setReload(!reload)
    }catch(e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }

  return (
    <Modal
      // onClose={() => props.destoryComponent()}
      type={theme.isH5 ? 'modal' : 'modal'}
      // isH5={theme.isH5}
      style={{ background: "#1A1919", width: theme.isH5 ? '90%' : '5.06rem', padding: theme.isH5 ? '24px 16px' : '24px' }}
    >
      <ColumnStart gridGap={theme.isH5 ? '24px' : ".24rem"}>

        <Flex alignItems={'center'} gridGap={'8px'}>
          <Icon width={theme.isH5 ? '32px' : '.4rem'} height={theme.isH5 ? '32px' : '.4rem'} src={require('./img_usdt 1.svg').default} />
          <Text fontSize={theme.isH5 ? '16px' : '.2rem'} fontWeight={'700'} color={'#ffffff'} >
            {t(`GETA Single Currency Stake`)}
          </Text>
        </Flex>

        <Inp
          // regex={[{regStr: NUMBER_REG, tips: ""}]}
          onChange={(value) => {
            if ((value === "" || isInputNumberSix(value))) {
              state.amount = value
            }
          }}
          value={state.amount}
          placeholder={'Please enter the number of stake'}
          right={<Flex alignItems={'center'} gridGap={theme.isH5 ? '6px' : '.1rem'}>
            <Text fontSize={theme.isH5 ? '12px' : '.2rem'} fontWeight={'400'} color={'#6B6B6B'}>{t(`GETA`)}</Text>
            <Max className='submit' onClick={() => {
              state.amount = `${state.getaBalance.toFixed() || 0}`
            }}>MAX</Max>
          </Flex>}
        />

        <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={theme.isH5 ? '14px' : '.2rem'} fontWeight={'400'} color={'#ffffff'} >{t(`Available`)}</Text>
          <Text fontSize={theme.isH5 ? '14px' : '.2rem'} fontWeight={'700'} color={'#ffffff'}>{t(`${state.getaBalance.toFixed() || EmptyStr} GETA`)}</Text>
        </Flex>

        <Flex width={'100%'} justifyContent={'center'} alignItems={'center'} gridGap={theme.isH5 ? '16px' : '.24rem'} alignSelf={'center'}>
            <Third style={{
                padding: theme.isH5 ? '8px 0' : '.1rem 0',
                width: theme.isH5 ? '100%' : '1.75rem'
              }}
              onClick={() => props.destoryComponent()}
            >CANCEl</Third>
            <Normal onClick={onPledges} padding={theme.isH5 ? '8px 0' : '.1rem 0 '} width={theme.isH5 ? '100%' : '1.75rem'}>{state.isApproveEnough ? 'CONFIRM' : 'APPROVE'}</Normal>
        </Flex>

      </ColumnStart>
    </Modal>
  )
}