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
import { Decimals, EmptyStr } from '../../utils/global';
import { TimestampTransform } from "utils/tools";
import {PledgeContract} from 'utils/ContractAddresses'
import RechargeWithdrawModal from "./RechargeWithdrawModal";

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

export default function Staking () {
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
  })

  useAsync(async () => {
    if(!PledgeGeta) return

    const totalSinglePools = await PledgeGeta.balanceOf(PledgeContract.GetaPool)
    console.log(totalSinglePools.toString())
    state.totalSinglePools = new BigNumber(totalSinglePools.toString()).div(10 ** Decimals)
    console.log(state.totalSinglePools)
    
    
  },[singlePoolReload,PledgeGeta])
  useAsync(async () => {
    if(!PledgeGeta) return

    const totalLpPools = await PledgeGeta.balanceOf(PledgeContract.LpPool)
    state.totalLpPools = new BigNumber(totalLpPools.toString()).div(10 ** Decimals) 
    
    
  },[lpPoolReload,PledgeGeta])
  
  useAsync(async () => {
    if(!PledgeLpPool) return
    
    const todayCents = await PledgeLpPool.rewardAmount()
    state.todayCents = new BigNumber(todayCents.toString()).div(10 ** Decimals) 
    
  },[lpPoolReload,PledgeGeta])
  
  
  useAsync(async () => {
    if(!PledgeGetaPool || !PledgeLpPool) return
    const startTime = await PledgeGetaPool.startTime()
    if(startTime.toString() === '0') {
      state.isStartPool = false
    }
    const isLpStart = await PledgeLpPool.isStarted()
    if(!isLpStart) {
      state.isStartLpPool = false
    }

  } ,[PledgeGetaPool,PledgeLpPool])

  useAsync(async () => { 
    if (!PledgeGetaPool || !accounts) return
    let account = accounts[0]
    const fee = await PledgeGetaPool.bonusFeeRate()
    state.SingleFee = new BigNumber(fee.toString())
    
    const apr = await PledgeGetaPool.globalAPY()
    state.SingleApr = new BigNumber(apr.toString()).multipliedBy((86400 * 365))
    
    const startTime = await PledgeGetaPool.startTime()
    console.log('startTime', startTime)
    state.SingleStartTime = new BigNumber(startTime.toString())

  }, [accounts, PledgeGetaPool, chainId, store.token])

  useAsync(async () => { 
    if (!PledgeLpPool || !accounts) return
    let account = accounts[0]
    const fee = await PledgeLpPool.feeRate()
    state.LpFee = new BigNumber(fee.toString())
    
    // const apr = await PledgeLpPool.globalAPY()
    // state.SingleApr = new BigNumber(apr.toString()).multipliedBy((86400 * 365))
    
    const startTime = await PledgeLpPool.startTime()
    console.log('startTime', startTime)
    state.LpStartTime = new BigNumber(startTime.toString())

  }, [accounts, PledgeLpPool, chainId, store.token])

  return (
    <ColumnStart padding={theme.isH5 ? '32px 0' : '.31rem .5rem 1rem'} gridGap={theme.isH5 ? '55px' : '.78rem'}>

      <ColumnStart width={'100%'} gridGap={theme.isH5 ? '16px' : '.19rem'}>
        <Title>{t(`Today's Distribution Bonus`)}</Title>

        <Box width={'100%'} overflow={'auto'}>
          <Table width={'100%'}>
            <thead>
              <Tr
                fontSize={'14px'}
                fontWeight={'400'}
                color={'#ffffff'}
                background={'#312F2A'}
              >
                <_Th>{t(`PledgeType`)}</_Th>
                <_Th>{t(`Number of pools`)}</_Th>
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
                <_Td>Single Currency Pledge</_Td>
                <_Td>{state.totalSinglePools.toNumber() || EmptyStr}</_Td>
                <_Td>{PledgeContract.GetaPool}</_Td>
                <_Td>
                  <Flex justifyContent={'center'} color={'#F6B91B'} gridGap={'10px'}>
                    <Text onClick={() => {
                      openModal(RechargeWithdrawModal, {
                        setReload:setSinglePoolReload,
                        reload:singlePoolReload,
                        title:'Recharge',
                        coin:1,
                        type:1,
                      })
                    }} >{t(`RECHARGE`)}</Text>
                    <Text onClick={() => {
                      openModal(RechargeWithdrawModal, {
                        setReload:setSinglePoolReload,
                        reload:singlePoolReload,
                        title:'Withdraw',
                        coin:1,
                        type:2,
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
                <_Td>Liquidity Pledge</_Td>
                <_Td>{state.totalLpPools.toNumber() || EmptyStr}</_Td>
                <_Td>{PledgeContract.LpPool}</_Td>
                <_Td>
                  <Text onClick={() => {
                    openModal(RechargeWithdrawModal, {
                      setReload:setLpPoolReload,
                        reload:lpPoolReload,
                        title:'Recharge',
                        coin:2,
                        type:1,
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
            <Text fontSize={'14px'} fontWeight={'400'} color={'#ffffff'} >{t(`If GETA is not set before 11:59:59 each day, the next day 00:00:00 will default to the last assigned amount.`)}</Text>
          </ColumnStart>
          <Normal onClick={() => {
            openModal(AllocationModal, {})
          }} padding={'10px 18px'} fontSize={'14px'} style={{alignSelf: theme.isH5 ? 'start' : 'center'}}>{t(`ALLOCATION OF GETA TOKENS`)}</Normal>
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
                <_Th>{t(`Number of assignments`)}</_Th>
                <_Th>{t(`Contract Address`)}</_Th>
                <_Th>{t(`Allocation time`)}</_Th>
              </Tr>
            </thead>

            <tbody>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                <_Td>{state.todayCents.toNumber() || EmptyStr}</_Td>
                <_Td>{PledgeContract.LpPool}</_Td>
                <_Td>2022-09-29 12:00:00</_Td>
              </Tr>
            </tbody>

          </Table>
        </Box>
      </ColumnStart>

      <ColumnStart width={'100%'} gridGap={theme.isH5 ? '16px' : '.19rem'}>
        <Title>{t(`Pledge Parameters`)}</Title>

        <Box width={'100%'} overflow={'auto'}>
          <Table width={'100%'}>
            <thead>
              <Tr
                fontSize={'14px'}
                fontWeight={'400'}
                color={'#ffffff'}
                background={'#312F2A'}
              >
                <_Th>{t(`PledgeType`)}</_Th>
                <_Th>{t(`Type`)}</_Th>
                <_Th>{t(`Parameter`)}</_Th>
                {/* <_Th>{t(`Start mining time`)}</_Th> */}
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
                <_Td rowSpan={3}>Single Currency Pledge</_Td>
                <_Td>APR</_Td>
                <_Td>{state.SingleApr.div(10 ** Decimals).multipliedBy(100).toFixed(2) + '%' || EmptyStr}</_Td>
                <_Td 
                cursor={'pointer'}  
                onClick={() => {
                  openModal(EditPledgeModal, {
                    kind: 0,
                    type: 0
                  })
                }} color={'#F6B91B'}>EDIT</_Td>
              </Tr>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                {/* <_Td colSpan={3}>Single Currency Pledge</_Td> */}
                <_Td>Handling fee</_Td>
                <_Td>{state.SingleFee.div(10 ** Decimals).multipliedBy(100).toFixed() + '%' || EmptyStr}</_Td>
                <_Td 
                cursor={'pointer'}
                onClick={() => {
                  openModal(EditPledgeModal, {
                    kind: 0,
                    type: 1
                  })
                }} color={'#F6B91B'}>EDIT</_Td>
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
                <_Td 
                cursor={'pointer'}
                
                style={{pointerEvents: state.isStartPool ? 'none' : 'inherit'}}
                onClick={() => {
                  openModal(EditPledgeModal, {
                    kind: 0,
                    type: 2
                  })
                }} color={'#F6B91B'}>EDIT</_Td>
              </Tr>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                <_Td rowSpan={2}>Liquidity Pledge</_Td>
                <_Td>Handling fee</_Td>
                <_Td>{state.LpFee.div(10 ** Decimals).multipliedBy(100).toFixed() + '%' || EmptyStr}</_Td>
                <_Td 
                cursor={'pointer'}
                onClick={() => {
                  openModal(EditPledgeModal, {
                    kind: 1,
                    type: 0
                  })
                }} color={'#F6B91B'}>EDIT</_Td>
              </Tr>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                <_Td>Start mining time</_Td>
                <_Td>{state.isStartLpPool ? TimestampTransform(state.LpStartTime.multipliedBy(1000).toNumber()) : EmptyStr}</_Td>
                <_Td 
                cursor={'pointer'}
                style={{pointerEvents: state.isStartLpPool ? 'none' : 'inherit'}}
                onClick={() => {
                  openModal(EditPledgeModal, {
                    kind: 1,
                    type: 1
                  })
                }} color={'#F6B91B'}>EDIT</_Td>
              </Tr>
            </tbody>

          </Table>
        </Box>
      </ColumnStart>

    </ColumnStart>
  )
}