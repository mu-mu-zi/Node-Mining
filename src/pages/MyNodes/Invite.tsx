import React, { useEffect, useState } from 'react'
import Box, { Typography } from 'components/BaseElement';
import JumpBtn from 'components/Button/BackBtn';
import { useTranslation } from 'react-i18next';
import { Row, RowCenter, RowStart } from 'components/BaseElement/Row';
import { Active, Invitation, InviteInput, InviteWrap, ProgressImg } from './MyNodes.style';
import { Column, ColumnStart } from 'components/BaseElement/Column';
import { Icon } from 'components/BaseElement/Icon';
import Normal from 'components/Button/Normal';
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'react-use';
import { isAddress, useTgeMarket } from 'hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import { useEffectState } from '../../hooks/useEffectState';
import { EmptyStr } from '../../utils/global';
import { Table, Td, Th, Tr } from 'components/BaseElement/Table';
import styled from 'styled-components';
import { Notice, TimestampTransform } from '../../utils/tools';
import { MsgStatus } from 'components/messageBox/MessageBox';
import { AwardRecords, award, pushRewardInfo, PushRewardInfo } from 'http/api';


const _Th = styled(Th)`
  padding: .08rem 0;
`
const _Td = styled(Td)`
  padding: .08rem 0;
`

export default function Invite() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const TgeMarket = useTgeMarket()
  const [isAllow, setIsAllow] = useState<boolean>(false)
  const [type, setType] = useState<Number>(1)
  const [reload, setReload] = useState<Boolean>(false)
  const { account } = useWeb3React()
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
      let result = await TgeMarket.getTokensOf(account)
      if (result?.length > 0) {
        setIsAllow(true)
      } else {
        setIsAllow(false)
      }
    } catch (e) {
      setIsAllow(false)
    }
  }, [account])
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
    if (isAddress(state.friendWalletAddr)) {
      let tx = await TgeMarket.inviteUser(state.friendWalletAddr)
      await tx.wait()
      Notice('Invite success', MsgStatus.success)
      state.friendWalletAddr = ''
      setReload(!reload)
    } else {
      Notice('Not a valid address', MsgStatus.warn)
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
          fontSize={'.6rem'}
          fontWeight={'700'}
          color={'#fff'}
        >
          {t(`Invite Friends`)}
        </Typography>
        <div />
      </Row>

      <RowCenter
        marginBottom={'.64rem'}
      >
        <ProgressImg src={require('assets/images/progress_bar.png')} />
      </RowCenter>

      {
        isAllow ? <>
          <ColumnStart
            padding={'.48rem .36rem .44rem'}
            background={'#1A1919'}
            borderRadius={'8px'}
            gap=".32rem"
          >
            <RowStart
              gap={'.64rem'}
              padding={'.27rem .16rem'}
              justifyContent='center'
              width='100%'
              boxSizing='border-box'
            >
              <Column
                gap={'.08rem'}
              >
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                  color={'#fff'}
                  whiteSpace={'nowrap'}
                >
                  {t(`Cumulative number of invitations`)}
                </Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                  color={'#F6B91B'}
                >
                  {state.invitationsTotal ?? EmptyStr}
                </Typography>
              </Column>
              <Column
                gap={'.08rem'}
              >
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                  color={'#fff'}
                  whiteSpace={'nowrap'}
                >
                  {t(`Cumulative Direct Push Bonus`)}
                </Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                  color={'#F6B91B'}
                >
                  {`${state.totalBonus.totalIncome} GETA/${state.totalBonus.usdtTotalIncome} USDT`}
                </Typography>
              </Column>
              <Column
                gap={'.08rem'}
              >
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                  color={'#fff'}
                  whiteSpace={'nowrap'}
                >
                  {t(`Today's direct push bonus`)}
                </Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                  color={'#F6B91B'}
                >
                  {`${state.totalBonus.todayIncome} GETA/${state.totalBonus.usdtTodayIncome} USDT`}
                </Typography>
              </Column>
            </RowStart>

            <ColumnStart
              gap={'.16rem'}
              padding={'0rem .16rem'}
              justifyContent='center'
              width='100%'
              boxSizing='border-box'
            >
              <Row gap=".08rem">
                <Typography
                  fontSize={'.2rem'}
                  fontWeight={'700'}
                  color={'#ffffff'}
                >{t(`Invite Friends`)}</Typography>
                <Icon src={require('assets/svg/icon_question.svg').default} alt="" />
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
            border={"4px solid #3D3D3D"}
            borderRadius={'4px'}
            padding={'.188rem .24rem'}
            width={'100%'}
            boxSizing={'border-box'}
            marginTop={'.64rem'}
          >

            <Row
              width={'100%'}
              paddingBottom={'.1rem'}

              borderBottom={'2px solid #3D3D3D'}
              gap={".32rem"}
              color={'#ffffff '}
              fontSize={'.2rem'}
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
                      fontSize={'.2rem'}
                      fontWeight={'400'}
                      color={'#6B6B6B'}
                    >
                      {/* <_Th textAlign={'left'}>{t(`Type`)}</_Th> */}
                      <_Th textAlign={'left'}>{t(`User Info`)}</_Th>
                      {/* <_Th>{t(`Time`)}</_Th> */}
                    </Tr>
                  </thead>
                  <tbody>
                    {
                      state.invitationRecord && state.invitationRecord.map((item, idx) => {
                        return <Tr
                          fontSize={'.2rem'}
                          fontWeight={'350'}
                          color={'#ffffff'}
                          key={idx}
                        >
                          <_Td textAlign={'left'}>
                            {t(`${item}`)}
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
                      fontSize={'.2rem'}
                      fontWeight={'400'}
                      color={'#6B6B6B'}
                    >
                      <_Th textAlign={'left'}>{t(`User Info`)}</_Th>
                      <_Th>{t(`Status`)}</_Th>
                      <_Th>{t(`Time`)}</_Th>
                    </Tr>
                  </thead>
                  <tbody>
                    {
                      state.directPushBonus && state.directPushBonus.map((item, idx: number) => {
                        return <Tr
                          fontSize={'.2rem'}
                          fontWeight={'350'}
                          color={'#ffffff'}
                          key={idx}
                        >
                          <_Td textAlign={'left'} width={'2.6rem'}>
                            {t(`${item.inviteesAddr}`)}
                          </_Td>
                          <_Td textAlign={'center'} width={'2.6rem'}>
                            {t(`${item.award} ${item.symbol}`)}
                          </_Td>
                          <_Td textAlign={'center'} width={'2.04rem'}>
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
            padding={'.85rem 1.36rem'}
            background={'#1A1919'}
            borderRadius={'8px'}
            gap=".16rem"
          >
            <Row gap=".08rem">
              <Typography
                fontSize={'.2rem'}
                fontWeight={'700'}
                color={'#ffffff'}
              >{t(`Invite Friends`)}</Typography>
              <Icon src={require('assets/svg/icon_question.svg').default} alt="" />
            </Row>
            <Typography
              fontSize={'.2rem'}
              fontWeight={'400'}
              color={'#6B6B6B'}
            >
              {t(`You can only invite your friends after you purchase a node, so come and buy a node and get the direct push reward exclusively for you!`)}
            </Typography>
            <Normal
              onClick={() => navigate('/nodes')}
            >
              {t(`Purchase Node`)}
            </Normal>
          </ColumnStart>
      }

    </InviteWrap>
  )
}
