import { Column, ColumnStart } from "components/BaseElement/Column";
import Flex from "components/BaseElement/Flex";
import Normal from "components/Button/Normal";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import Box, { Text } from "components/BaseElement";
import { RowBetween } from "components/BaseElement/Row";
import { Table, Td, Th, Tr } from "components/BaseElement/Table";
import { useContext, useState } from "react";
import { ModalContext } from "components/provider/ModalProvider";
import AllocationModal from "./AllocationModal";
import EditPledgeModal from "./EditPledgeModal";
import useTheme from "hooks/useTheme";
import { usePledgeGeta, usePledgeGetaPool, usePledgeLpPool } from "hooks/useContract";
import { useEffectState } from "hooks/useEffectState";
import useRedux from "hooks/useRedux";
import useWalletTools from "hooks/useWalletTools";
import { useAsync } from "react-use";
import BigNumber from "bignumber.js";
import { decimalPlaces, Decimals, EmptyStr } from '../../utils/global';
import { Notice, TimestampTransform, Timestamp} from "utils/tools";
import { PledgeContract } from 'utils/ContractAddresses'
import RechargeWithdrawModal from "./RechargeWithdrawModal";
import { MsgStatus } from "components/messageBox/MessageBox";

export const Title = styled.div`
  border-left: 4px solid #F6B91B;
  padding-left: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`

const _Th = styled(Th)`
  border: 1px solid rgba(228, 228, 228, 0.2);
  padding: .25rem 0;
  ${({ theme }) => theme.mediaWidth.sm`
    padding: 16px 10px;
    white-space: nowrap;
  `}
  `
const _Td = styled(Td)`
  border: 1px solid rgba(228, 228, 228, 0.2);
  padding: .25rem 0;
  text-align: center;
  ${({ theme }) => theme.mediaWidth.sm`
    padding: 16px 10px;
    white-space: nowrap;
  `}
`

export default function Staking() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { openModal } = useContext(ModalContext)
  const { accounts, chainId } = useWalletTools()
  const { store } = useRedux()
  const PledgeGetaPool = usePledgeGetaPool(true)
  const PledgeLpPool = usePledgeLpPool(true)
  const PledgeGeta = usePledgeGeta()
  const [singlePoolReload, setSinglePoolReload] = useState(false)
  const [lpPoolReload, setLpPoolReload] = useState(false)
  const [TBreload, setTBReload] = useState(false)
  const [parameterReload, setParameterReload] = useState(false)
  const state = useEffectState({
    SingleFee: new BigNumber(0),
    LpFee: new BigNumber(0),
    SingleApr: new BigNumber(0),
    SingleStartTime: new BigNumber(''),
    LpStartTime: new BigNumber(''),
    isStartPool: true,
    isStartLpPool: true,
    totalSinglePools: new BigNumber(0),
    totalLpPools: new BigNumber(0),
    todayCents: new BigNumber(0),
    totalCents: new BigNumber(0),
    cycleId: '',
    lpStartTime: '',
    lpEndTime: '',
    lpStartHh: '',
  })

  
  // get SinglePools geta
  useAsync(async () => {
    if (!PledgeGeta) return
    const totalSinglePools = await PledgeGeta.balanceOf(PledgeContract.GetaPool)
    state.totalSinglePools = new BigNumber(totalSinglePools.toString()).div(10 ** Decimals)
  }, [singlePoolReload, PledgeGeta])

  // get LpPools geta
  useAsync(async () => {
    if (!PledgeGeta) return
    const totalLpPools = await PledgeGeta.balanceOf(PledgeContract.LpPool)
    state.totalLpPools = new BigNumber(totalLpPools.toString()).div(10 ** Decimals)
  }, [lpPoolReload, PledgeGeta])

  
  // get Today's Distribution Times
  useAsync(async () => {
    if (!PledgeLpPool) return
    try{
      const CycleId = await PledgeLpPool.rewardEpoch()
      state.cycleId = CycleId.toString()

      const time = await PledgeLpPool.getRewardHistory(CycleId)
      state.lpStartTime = TimestampTransform(new BigNumber(time[2].toString()).multipliedBy(1000).toNumber())
      state.lpEndTime = TimestampTransform(new BigNumber(time[3].toString()).multipliedBy(1000).toNumber())

      state.lpStartHh = Timestamp(new BigNumber(time[2].toString()).multipliedBy(1000).toNumber())
      
    }catch(e){
      console.error(e)
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
    

  }, [lpPoolReload, PledgeLpPool])

  // get Cumulative/Today's Distribution Bonus
  useAsync(async () => {
    if (!PledgeLpPool) return
    try{

      const todayCents = await PledgeLpPool.rewardAmount()
      state.todayCents = new BigNumber(todayCents.toString()).div(10 ** Decimals)
      console.log('todayCents',todayCents)



      const totalCents = await PledgeLpPool.accReward()
      console.log('totalCents',totalCents)
      state.totalCents = new BigNumber(totalCents.toString()).div(10 ** Decimals)


    }catch(e) {
      console.error(e)
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }

  }, [lpPoolReload, PledgeLpPool, TBreload])

  // is Start Lp/Single Pool
  useAsync(async () => {
    if (!PledgeGetaPool || !PledgeLpPool) return
    const startTime = await PledgeGetaPool.startTime()
    if (startTime.toString() === '0') {
      state.isStartPool = false
    }
    const isLpStart = await PledgeLpPool.isStarted()
    if (!isLpStart) {
      state.isStartLpPool = false
    }

  }, [PledgeGetaPool, PledgeLpPool])

  // get Single Pool Configure
  useAsync(async () => {
    if (!PledgeGetaPool || !accounts) return
    const fee = await PledgeGetaPool.bonusFeeRate()
    state.SingleFee = new BigNumber(fee.toString())

    const apr = await PledgeGetaPool.globalAPY()
    state.SingleApr = new BigNumber(apr.toString()).multipliedBy((86400 * 365))

    const startTime = await PledgeGetaPool.startTime()
    console.log('startTime', startTime)
    state.SingleStartTime = new BigNumber(startTime.toString())

  }, [accounts, PledgeGetaPool, chainId, store.token, parameterReload])

  // get LP Pool Configure
  useAsync(async () => {
    if (!PledgeLpPool || !accounts) return
    const fee = await PledgeLpPool.feeRate()
    state.LpFee = new BigNumber(fee.toString())

    const startTime = await PledgeLpPool.startTime()
    console.log('startTime', startTime.toString())
    state.LpStartTime = new BigNumber(startTime.toString())
    

  }, [accounts, PledgeLpPool, chainId, store.token, parameterReload])

  return (
    <ColumnStart padding={theme.isH5 ? '32px 0' : '.31rem .5rem 1rem'} gridGap={theme.isH5 ? '55px' : '.78rem'}>

      <ColumnStart width={'100%'} gridGap={theme.isH5 ? '16px' : '.19rem'}>
        <Title>{t(`Pools`)}</Title>

        <Box width={'100%'} overflow={'auto'}>
          <Table width={'100%'}>
            <thead>
              <Tr
                fontSize={'14px'}
                fontWeight={'400'}
                color={'#ffffff'}
                background={'#312F2A'}
              >
                <_Th>{t(`Pool`)}</_Th>
                <_Th>{t(`GETA Balance`)}</_Th>
                <_Th>{t(`Contract Address`)}</_Th>
                <_Th>{t(`Operation`)}</_Th>
              </Tr>
            </thead>

            <tbody>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                <_Td>Single Currency Stake</_Td>
                <_Td>{state.totalSinglePools.dp(decimalPlaces, 1).toNumber() || 0}</_Td>
                <_Td>{PledgeContract.GetaPool}</_Td>
                <_Td>
                  <Flex justifyContent={'center'} color={'#F6B91B'} gridGap={'10px'}>
                    <Text
                      cursor={'pointer'}
                      onClick={() => {
                        openModal(RechargeWithdrawModal, {
                          setReload: setSinglePoolReload,
                          reload: singlePoolReload,
                          title: 'Recharge',
                          coin: 1,
                          type: 1,
                        })
                      }} >{t(`RECHARGE`)}</Text>
                    <Text
                      cursor={'pointer'}
                      onClick={() => {
                        openModal(RechargeWithdrawModal, {
                          setReload: setSinglePoolReload,
                          reload: singlePoolReload,
                          title: 'Withdraw',
                          coin: 1,
                          type: 2,
                        })
                      }} >{t(`WITHDRAW`)}</Text>
                  </Flex>
                </_Td>
              </Tr>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                <_Td>Liquidity Stake</_Td>
                <_Td>{state.totalLpPools.dp(decimalPlaces, 1).toNumber() || 0}</_Td>
                <_Td>{PledgeContract.LpPool}</_Td>
                <_Td>
                  <Text
                    cursor={'pointer'}
                    onClick={() => {
                      openModal(RechargeWithdrawModal, {
                        setReload: setLpPoolReload,
                        reload: lpPoolReload,
                        title: 'Recharge',
                        coin: 2,
                        type: 1,
                      })
                    }} color={'#F6B91B'} >{t(`RECHARGE`)}</Text>
                </_Td>
              </Tr>
            </tbody>

          </Table>
        </Box>
      </ColumnStart>

      <ColumnStart width={'100%'} gridGap={theme.isH5 ? '16px' : '.43rem'}>
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={theme.isH5 ? 'column' : 'row'}
          width={'100%'}
          gridGap={theme.isH5 ? '16px' : '0'}
        >
          <ColumnStart gridGap={theme.isH5 ? '16px' : '.16rem'}>
            <Title>{t(`Today's Distribution Bonus`)}</Title>
            <Text fontSize={'14px'} fontWeight={'400'} color={'#ffffff'} >{t(`If GETA is not set before ${state.lpStartHh} cycle, the next cycle will default to the last assigned amount.`)}</Text>
          </ColumnStart>
          <Normal onClick={() => {
            openModal(AllocationModal, {
              reload: TBreload,
              setReload: setTBReload,
            })
          }} padding={'10px 18px'} fontSize={'14px'} style={{ alignSelf: theme.isH5 ? 'start' : 'center' }}>{t(`Distribution OF GETA TOKENS`)}</Normal>
        </Flex>

        <Box width={'100%'} overflow={'auto'}>
          <Table width={'100%'}>
            <thead>
              <Tr
                fontSize={'14px'}
                fontWeight={'400'}
                color={'#ffffff'}
                background={'#312F2A'}
              >
                <_Th>{t(`Amount`)}</_Th>
                <_Th>{t(`Contract Address`)}</_Th>
                <_Th>{t(`Cumulative Distribution`)}</_Th>
                <_Th>{t(`Distribution Start Time`)}</_Th>
                <_Th>{t(`Distribution End Time`)}</_Th>
              </Tr>
            </thead>

            <tbody>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                <_Td>{state.todayCents.toNumber() || 0}</_Td>
                <_Td>{PledgeContract.LpPool}</_Td>
                <_Td>{state.totalCents.toNumber() || 0}</_Td>
                <_Td>{state.cycleId === '0' ? EmptyStr : state.lpStartTime }</_Td>
                <_Td>{state.cycleId === '0' ? EmptyStr : state.lpEndTime }</_Td>
              </Tr>
            </tbody>

          </Table>
        </Box>
      </ColumnStart>

      <ColumnStart width={'100%'} gridGap={theme.isH5 ? '16px' : '.19rem'}>
        <Title>{t(`Pool Configure`)}</Title>

        <Box width={'100%'} overflow={'auto'}>
          <Table width={'100%'}>
            <thead>
              <Tr
                fontSize={'14px'}
                fontWeight={'400'}
                color={'#ffffff'}
                background={'#312F2A'}
              >
                <_Th>{t(`Pool`)}</_Th>
                <_Th>{t(`Type`)}</_Th>
                <_Th>{t(`Value`)}</_Th>
                <_Th>{t(`Operation`)}</_Th>
              </Tr>
            </thead>

            <tbody>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                <_Td rowSpan={3}>Single Currency Stake</_Td>
                <_Td>APR</_Td>
                <_Td>{state.SingleApr.div(10 ** Decimals).multipliedBy(100).dp(2,1).toFixed() + '%' || EmptyStr}</_Td>
                <_Td>
                  <Text
                    display={'inline'}
                    cursor={'pointer'}
                    onClick={() => {
                      openModal(EditPledgeModal, {
                        kind: 0,
                        type: 0,
                        reload: parameterReload,
                        setReload: setParameterReload,
                      })
                    }} color={'#F6B91B'}
                  >EDIT</Text>
                </_Td>
              </Tr>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                {/* <_Td colSpan={3}>Single Currency Pledge</_Td> */}
                <_Td>Handling fee</_Td>
                <_Td>{state.SingleFee.div(10 ** Decimals).multipliedBy(100).dp(2,1).toFixed() + '%' || EmptyStr}</_Td>
                <_Td>
                  <Text
                    display={'inline'}
                    cursor={'pointer'}
                    onClick={() => {
                      openModal(EditPledgeModal, {
                        kind: 0,
                        type: 1,
                        reload: parameterReload,
                        setReload: setParameterReload,
                      })
                    }} color={'#F6B91B'}
                  >EDIT</Text>
                </_Td>
              </Tr>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                {/* <_Td colSpan={3}>Single Currency Pledge</_Td> */}
                <_Td>Start mining time</_Td>
                <_Td>{state.SingleStartTime.toFixed() === '0' ? EmptyStr : TimestampTransform(state.SingleStartTime.multipliedBy(1000).toNumber())}</_Td>
                <_Td>
                  <Text
                    display={'inline'}
                    style={{ pointerEvents: state.isStartPool ? 'none' : 'inherit' }}
                    cursor={'pointer'}
                    onClick={() => {
                      openModal(EditPledgeModal, {
                        kind: 0,
                        type: 2,
                        reload: parameterReload,
                        setReload: setParameterReload,
                      })
                    }} color={'#F6B91B'}
                  >EDIT</Text>
                </_Td>
              </Tr>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                <_Td rowSpan={2}>Liquidity Stake</_Td>
                <_Td>Handling fee</_Td>
                <_Td>{state.LpFee.div(10 ** Decimals).multipliedBy(100).dp(2,1).toFixed() + '%' || EmptyStr}</_Td>
                <_Td>
                  <Text
                    display={'inline'}
                    cursor={'pointer'}
                    onClick={() => {
                      openModal(EditPledgeModal, {
                        kind: 1,
                        type: 0,
                        reload: parameterReload,
                        setReload: setParameterReload,
                      })
                    }} color={'#F6B91B'}
                  >EDIT</Text>
                </_Td>
              </Tr>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                <_Td>Start mining time</_Td>
                <_Td>{state.isStartLpPool ? TimestampTransform(state.LpStartTime.multipliedBy(1000).toNumber()) : EmptyStr}</_Td>
                <_Td>
                  <Text
                    display={'inline'}
                    style={{ pointerEvents: state.isStartLpPool ? 'none' : 'inherit' }}
                    cursor={'pointer'}
                    onClick={() => {
                      openModal(EditPledgeModal, {
                        kind: 1,
                        type: 1,
                        reload: parameterReload,
                        setReload: setParameterReload,
                      })
                    }} color={'#F6B91B'}
                  >EDIT</Text>
                </_Td>
              </Tr>
            </tbody>

          </Table>
        </Box>
      </ColumnStart>

    </ColumnStart>
  )
}