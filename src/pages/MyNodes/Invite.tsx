import React, { useEffect, useState } from 'react'
import Box, { Typography } from 'components/BaseElement';
import JumpBtn from 'components/Button/BackBtn';
import { useTranslation } from 'react-i18next';
import { Row, RowCenter, RowStart } from 'components/BaseElement/Row';
import { Active, Invitation, InviteInput, InviteWrap, ProgressImg, PopoverInvite } from './MyNodes.style';
import { Column, ColumnStart } from 'components/BaseElement/Column';
import { Icon } from 'components/BaseElement/Icon';
import Normal from 'components/Button/Normal';
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'react-use';
import { isAddress, useTgeMarket } from 'hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import { useEffectState } from '../../hooks/useEffectState';
import { adminAddress, EmptyStr } from '../../utils/global';
import { Table, Td, Th, Tr } from 'components/BaseElement/Table';
import styled from 'styled-components';
import { formatAddress, Notice, TimestampTransform } from '../../utils/tools';
import { CloseMessageBox, MsgStatus } from 'components/messageBox/MessageBox';
import { AwardRecords, award, pushRewardInfo, PushRewardInfo } from 'http/api';
import CopyTypography from 'components/CopyTypography';
import { Popover } from '@douyinfe/semi-ui';
import useTheme from '../../hooks/useTheme';
import Flex from 'components/BaseElement/Flex';

const _Th = styled(Th)`
  padding: .08rem 0;
`
const _Td = styled(Td)`
  padding: .08rem 0;
  ${({theme}) => theme.mediaWidth.sm`
    padding: 8px 0;
  `}
`

export default function Invite() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const TgeMarket = useTgeMarket()
  const [isAllow, setIsAllow] = useState<boolean>(false)
  const [type, setType] = useState<Number>(1)
  const [reload, setReload] = useState<Boolean>(false)
  const { account } = useWeb3React()
  const {theme} = useTheme()
  const state = useEffectState({
    invitationsTotal: 0 as number,
    invitationRecord: [] as Array<string>,
    directPushBonus: [] as AwardRecords[],
    friendWalletAddr: '' as string,
    totalBonus: {} as PushRewardInfo
  })
  useAsync(async () => {
    if (!TgeMarket || !account) return
    try {
      if(adminAddress.toLowerCase() === account?.toLowerCase()) {
        setIsAllow(true)
        return
      }
      let result = await TgeMarket.getTokensOf(account)
      if (result?.length > 0) {
        setIsAllow(true)
      } else {
        setIsAllow(false)
      }
    } catch (e) {
      setIsAllow(false)
    }
  }, [account,TgeMarket])
  useAsync(async () => {
    if (!TgeMarket || !account) return
    try {
      let result = await TgeMarket.getMyInviteCount(account)
      console.log(result)
      state.invitationsTotal = result.toNumber()
    } catch (e) {

    }
  }, [account, reload])
  // inviteUser
  const inviteSubmit = async () => {
    if (!TgeMarket || !account) return
    try{
      if (isAddress(state.friendWalletAddr)) {
        let tx = await TgeMarket.inviteUser(state.friendWalletAddr)
        Notice('Waiting for invitation...', MsgStatus.loading)
        await tx.wait()
        CloseMessageBox()
        
        Notice('Invite success', MsgStatus.success)
        state.friendWalletAddr = ''
        setReload(!reload)
      } else {
        Notice('Not a valid address', MsgStatus.warn)
      }
    }catch(e) {
      state.friendWalletAddr = ''
      Notice(JSON.parse(JSON.stringify(e)).reason || 'error', MsgStatus.warn)
    }
  }

  // Direct Push Bonus
  useAsync(async () => {
    let result = await pushRewardInfo()
    state.totalBonus = result.data
  }, [])

  // Direct Push Bonus
  useAsync(async () => {
    let result = await award({
      pageIndex: 1,
      pageSize: 100,
    })
    state.directPushBonus = result.data.records
  }, [])

  // Invitation Record
  useAsync(async () => {
    if (!TgeMarket || !account || !state.invitationsTotal) return
    let array: Array<string> = []
    for (let i = 1; i <= state.invitationsTotal; i++) {
      let result = await TgeMarket.getMyInviteUser(account, i)
      array.push(result)
    }
    console.log(array)
    state.invitationRecord = array

  }, [account, state.invitationsTotal, reload])


  return (
    <InviteWrap>
      <Row
        width={"100%"}
        justifyContent={'center'}
        marginBottom={'.88rem'}
        position={'relative'}
      >
        <Box
          position={'absolute'}
          top={'50%'}
          left={'1.55rem'}
          style={{
            transform: 'translate(-50%, -50%)'
          }}
        >
          <JumpBtn
            text="Back"
            path={-1}
          />
        </Box>
        <Typography
          fontSize={theme.isH5 ? '20px' : '.6rem'}
          fontWeight={'700'}
          color={'#fff'}
          fontFamily={'RomicStd'}
        >
          {t(`Invite Friends`)}
        </Typography>
        <div />
      </Row>

      <RowCenter
        marginBottom={'.64rem'}
        style={{
          display: theme.isH5 ? 'none' : 'flex'
        }}
      >
        <ProgressImg src={require('assets/images/progress_bar.png')} />
      </RowCenter>

      <ColumnStart
        marginBottom={'16px'}
        gap={'10px'}
        style={{
          display: theme.isH5 ? 'flex' : 'none'
        }}
      >
        <RowCenter
          gap={'8px'}
        >
          <RowCenter
            width={'20px'}
            height={'20px'}
            color={'#00E88A'}
            border={'1px solid #00E88A'}
            borderRadius={'50%'}
          >1</RowCenter>
          <Typography
            fontSize={'12px'}
            fontStyle={'italic'}
            color={'#fff'}
            fontWeight={'350'}
          >
            {t(`Step 1: Buy nodes to get the invitation qualification`)}
          </Typography>
        </RowCenter>
        <RowCenter
          gap={'8px'}
        >
          <RowCenter
            width={'20px'}
            height={'20px'}
            color={'#00E88A'}
            border={'1px solid #00E88A'}
            borderRadius={'50%'}
          >2</RowCenter>
          <Typography
            fontSize={'12px'}
            fontStyle={'italic'}
            color={'#fff'}
            fontWeight={'350'}
          >
            {t(`Step 2: Invite friends to register and buy nodes`)}
          </Typography>
        </RowCenter>
        <RowCenter
          gap={'8px'}
        >
          <RowCenter
            width={'20px'}
            height={'20px'}
            color={'#00E88A'}
            border={'1px solid #00E88A'}
            borderRadius={'50%'}
          >3</RowCenter>
          <Typography
            fontSize={'12px'}
            fontStyle={'italic'}
            color={'#fff'}
            fontWeight={'350'}
          >
            {t(`Step 3: Get direct push bonus`)}
          </Typography>
        </RowCenter>

      </ColumnStart>



      {
        isAllow ? <>
          <ColumnStart
            padding={theme.isH5 ? '16px' : '.48rem .36rem .44rem'}
            background={'#1A1919'}
            borderRadius={'8px'}
            gap={theme.isH5 ? '32px' : ".32rem"}
          >
            <RowStart
              gap={'.64rem'}
              padding={theme.isH5 ? '0' : '.27rem .16rem'}
              justifyContent='center'
              width='100%'
              boxSizing='border-box'
              style={{
                flexDirection: theme.isH5 ? 'column' : 'row',
                alignItems: theme.isH5 ? 'start' : 'center',
              }}
            >
              <Column
                gap={theme.isH5 ? '8px' : '.08rem'}
                style={{
                  alignItems: theme.isH5 ? 'start' : 'center',
                }}
              >
                <Typography
                  fontSize={theme.isH5 ? '12px' : ".2rem"}
                  fontWeight={'350'}
                  color={'#fff'}
                  whiteSpace={'nowrap'}
                  fontStyle={'italic'}
                >
                  {t(`Cumulative number of invitations`)}
                </Typography>
                <Typography
                  fontSize={theme.isH5 ? '20px' : ".2rem"}
                  fontWeight={'700'}
                  color={'#F6B91B'}
                >
                  {state.invitationsTotal ?? EmptyStr}
                </Typography>
              </Column>
              <Column
                gap={theme.isH5 ? '8px' : '.08rem'}
                style={{
                  alignItems: theme.isH5 ? 'start' : 'center',
                }}
              >
                <Typography
                  fontSize={theme.isH5 ? '12px' : ".2rem"}
                  fontWeight={'350'}
                  color={'#fff'}
                  whiteSpace={'nowrap'}
                  fontStyle={'italic'}
                >
                  {t(`Cumulative Direct Push Bonus`)}
                </Typography>
                <Typography
                  fontSize={theme.isH5 ? '20px' : ".2rem"}
                  fontWeight={'700'}
                  color={'#F6B91B'}
                >
                  {`${state.totalBonus.totalIncome ?? EmptyStr} GETA/${state.totalBonus.usdtTotalIncome ?? EmptyStr} USDT`}
                </Typography>
              </Column>
              <Column
                gap={theme.isH5 ? '8px' : '.08rem'}
                style={{
                  alignItems: theme.isH5 ? 'start' : 'center',
                }}
              >
                <Typography
                  fontSize={theme.isH5 ? '12px' : ".2rem"}
                  fontWeight={'350'}
                  color={'#fff'}
                  whiteSpace={'nowrap'}
                  fontStyle={'italic'}
                >
                  {t(`Today's direct push bonus`)}
                </Typography>
                <Typography
                  fontSize={theme.isH5 ? '20px' : ".2rem"}
                  fontWeight={'700'}
                  color={'#F6B91B'}
                >
                  {`${state.totalBonus.todayIncome} GETA/${state.totalBonus.usdtTodayIncome} USDT`}
                </Typography>
              </Column>
            </RowStart>

            <ColumnStart
              gap={theme.isH5 ? '16px' : '.16rem'}
              padding={theme.isH5 ? '0' : '0rem .16rem'}
              justifyContent='center'
              width='100%'
              boxSizing='border-box'
            >
              <Row gap={theme.isH5 ? '4px' : ".08rem"}>
                <Typography
                  fontSize={theme.isH5 ? '12px' : '.2rem'}
                  fontWeight={'700'}
                  color={'#ffffff'}
                >{t(`Invite Friends`)}</Typography>
                <Popover
                  position='top'
                  style={{ marginBottom: '10px' }}
                  content={<PopoverInvite
                    width={theme.isH5 ? '150px' : '2.4rem'}
                    padding={theme.isH5 ? '10px' : '.1rem'}
                    background={'#3D3D3D'}
                    borderRadius={'4px'}
                    color={'#ffffff'}
                    fontSize={theme.isH5 ? '11px' : '.12rem'}
                    fontWeight={400}
                  >
                    <Typography>{t(`Invite friends to buy nodes and get direct push rewards:`)}</Typography>
                    <Typography>{t(`1. 10% of the daily coins of your friend`)}</Typography>
                    <Typography>{t(`2. 10% of node purchase amount`)}</Typography>
                  </PopoverInvite>}
                >
                  <Icon src={require('assets/svg/icon_question.svg').default} alt="" />
                </Popover>
              </Row>

              <InviteInput
                placeholder={`Enter your friend's wallet address`}
                right={<Invitation className='submit' onClick={inviteSubmit}>Invitation</Invitation>}
                value={state.friendWalletAddr}
                onChange={(value) => {
                  state.friendWalletAddr = value
                }}
              />
            </ColumnStart>
          </ColumnStart>
          <Box
            border={theme.isH5 ? '1px solid #3D3D3D' : "4px solid #3D3D3D"}
            borderRadius={'4px'}
            padding={theme.isH5 ? '16px 16px 25px' : '.188rem .24rem'}
            width={'100%'}
            boxSizing={'border-box'}
            marginTop={theme.isH5 ? '16px' : '.64rem'}
          >

            <Row
              width={'100%'}
              paddingBottom={theme.isH5 ? '8px' : '.1rem'}

              borderBottom={theme.isH5 ? '1px solid #3D3D3D' : '2px solid #3D3D3D'}
              gap={theme.isH5 ? '32px' : ".32rem"}
              color={'#ffffff '}
              fontSize={theme.isH5 ? '12px' : '.2rem'}
              fontWeight={'700'}
            >
              <Active
                onClick={() => setType(1)}
                className={type === 1 ? 'active' : ''}
                paddingLeft={'4px'}
              >{t(`Invitation Record`)}</Active>
              <Active
                onClick={() => setType(2)}
                className={type === 2 ? 'active' : ''}
              >{t(`Direct Push Bonus`)}</Active>
            </Row>
            {

              type === 1 ?
                <Table
                  color={'#fff'}
                  width={'100%'}
                  paddingLeft={'.24rem'}
                  marginTop={'.16rem'}
                >
                  <thead>
                    <Tr
                      fontSize={theme.isH5 ? '12px' : '.2rem'}
                      fontWeight={'400'}
                      color={'#6B6B6B'}
                    >
                      <_Th textAlign={'left'}>{t(`Number`)}</_Th>
                      <_Th textAlign={'right'}>{t(`User Info`)}</_Th>
                      {/* <_Th>{t(`Time`)}</_Th> */}
                    </Tr>
                  </thead>
                  <tbody>
                    {
                      state.invitationRecord && state.invitationRecord.map((item, idx) => {
                        return <Tr
                          fontSize={theme.isH5 ? '11px' : '.2rem'}
                          fontWeight={'350'}
                          color={'#ffffff'}
                          key={idx}
                          fontStyle={'italic'}
                        >
                          <_Td textAlign={'left'}>
                            <Typography>{idx+1}</Typography>
                          </_Td>
                          <_Td display={'flex'} justifyContent={'end'} textAlign={'right'} >
                            <CopyTypography >{theme.isH5 ? formatAddress(item) : item}</CopyTypography>
                          </_Td>
                        </Tr>
                      })
                    }
                  </tbody>
                </Table> :
                <Table
                  color={'#fff'}
                  width={'100%'}
                  paddingLeft={'.24rem'}
                  marginTop={'.16rem'}
                >
                  <thead>
                    <Tr
                      fontSize={theme.isH5 ? '12px' : '.2rem'}
                      fontWeight={'400'}
                      color={'#6B6B6B'}
                    >
                      <_Th textAlign={'left'}>{t(`User Info`)}</_Th>
                      <_Th textAlign={theme.isH5 ? 'left' : 'center'} >{t(`Amount`)}</_Th>
                      <_Th textAlign={'right'}>{t(`Time`)}</_Th>
                    </Tr>
                  </thead>
                  <tbody>
                    {
                      state.directPushBonus && state.directPushBonus.map((item, idx: number) => {
                        return <Tr
                          fontSize={theme.isH5 ? '11px' : '.2rem'}
                          fontWeight={'350'}
                          color={'#ffffff'}
                          key={idx}
                          fontStyle={'italic'}
                        >
                          <_Td textAlign={'left'} width={'2.6rem'}>
                            <CopyTypography>{theme.isH5 ? formatAddress(item.inviteesAddr) : item.inviteesAddr}</CopyTypography>
                          </_Td>
                          <_Td color={'#F6B91B'} textAlign={theme.isH5 ? 'left' : 'right'} width={'2.6rem'}>
                            {t(`+${item.award} ${item.symbol}`)}
                          </_Td>
                          <_Td textAlign={'right'} width={'2.04rem'}>
                            {t(`${TimestampTransform(item.createTime)}`)}
                          </_Td>
                        </Tr>
                      })
                    }
                  </tbody>
                </Table>
            }
          </Box>
        </>
          :
          <ColumnStart
            padding={theme.isH5 ? '24px 16px' : '.85rem 1.36rem'}
            background={'#1A1919'}
            borderRadius={'8px'}
            gap={theme.isH5 ? '16px' : ".16rem"}
          >
            <Row gap={theme.isH5 ? '8px' : ".08rem"}>
              <Typography
                fontSize={theme.isH5 ? '11px' : '.2rem'}
                fontWeight={'700'}
                color={'#ffffff'}
              >{t(`Invite Friends`)}</Typography>
              <Popover
                position='top'
                style={{ marginBottom: '10px' }}
                content={<PopoverInvite
                  width={theme.isH5 ? '200px' : '2.4rem'}
                  padding={theme.isH5 ? '10px' : '.1rem'}
                  background={'#3D3D3D'}
                  borderRadius={'4px'}
                  color={'#ffffff'}
                  fontSize={theme.isH5 ? '11px' : '.12rem'}
                  fontWeight={400}
                >
                  <Typography>{t(`Invite friends to buy nodes and get direct push rewards:`)}</Typography>
                  <Typography>{t(`1. 10% of the daily coins of your friend`)}</Typography>
                  <Typography>{t(`2. 10% of node purchase amount`)}</Typography>
                </PopoverInvite>}
              >
                <Icon src={require('assets/svg/icon_question.svg').default} alt="" />
              </Popover>
            </Row>
            <Typography
              fontSize={theme.isH5 ? '12px' : '.2rem'}
              fontWeight={'400'}
              color={'#6B6B6B'}
            >
              {t(`You can only invite your friends after you purchase a node, so come and buy a node and get the direct push reward exclusively for you!`)}
            </Typography>
            <Normal
              onClick={() => navigate('/nodes')}
            >
              {t(`PURCHASE NODE`)}
            </Normal>
          </ColumnStart>
      }

    </InviteWrap>
  )
}
