import React, { useEffect, useState } from 'react'
import Box, { Typography } from 'components/BaseElement';
import JumpBtn from 'components/Button/BackBtn';
import { Column, ColumnStart } from '../../components/BaseElement/Column';
import { useTranslation } from 'react-i18next';
import { Row } from 'components/BaseElement/Row';
import { FundRecordsWrap } from './MyNodes.style';
import Flex from 'components/BaseElement/Flex';
import Grid from 'components/BaseElement/Grid';
import { Table, Tr } from 'components/BaseElement/Table';
import { Th, Td } from '../../components/BaseElement/Table';
import styled from 'styled-components';
import { useAsync } from 'react-use';
import { withdrawList, WithdrawList, WithdrawRecords } from 'http/api';
import { useEffectState } from 'hooks/useEffectState';

interface FundRecord {
  type: string
  amount: string
  time: string
}

const _Th = styled(Th)`
  padding: .08rem 0;
`
const _Td = styled(Td)`
  padding: .08rem 0;
`

export default function FundRecords() {
  const { t } = useTranslation()
  const [record, setRecord] = useState<FundRecord[]>([])
  const state = useEffectState({
    withdraw: {} as WithdrawList,
    pageIndex: 10,
    pageSize: 1,
    withdrawRecords: [] as WithdrawRecords[]
  })

  useAsync(async () => {
    let result = await withdrawList({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize
    })
    state.withdraw = result.data
    state.withdrawRecords = result.data.records
    const test = [
      {
        type: 'withdrawing coins',
        amount: '-0.27 GW',
        time: '2022-08-02 12:27:26',
      },
      {
        type: 'withdrawing coins',
        amount: '-0.27 GW',
        time: '2022-08-02 12:27:26',
      }
    ]
    setRecord(test)
  }, [])

  return (
    <FundRecordsWrap>
      <Column
        gap=".34rem"
      >
        <Row
          width={"100%"}
          justifyContent={'space-between'}
        >
          <Box>
            <JumpBtn
              text="Back"
              path={-1}
            // onClick={() => props.setStep(1)}
            />
          </Box>
          <Typography
            fontSize={'.6rem'}
            fontWeight={'700'}
            color={'#fff'}
          >
            {t(`Funding records`)}
          </Typography>
          <Box />
        </Row>

        <Box
          border={"4px solid #3D3D3D"}
          borderRadius={'4px'}
          padding={'.465rem .55rem .465rem .16rem'}
          width={'100%'}
          boxSizing={'border-box'}
        >
          <Typography
            fontSize={".32rem"}
            fontWeight={'700'}
            color={'#fff'}
          >
            {t(`Coin withdrawal record`)}
          </Typography>

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
                <_Th textAlign={'left'}>{t(`Type`)}</_Th>
                <_Th>{t(`Amount`)}</_Th>
                <_Th>{t(`Time`)}</_Th>
              </Tr>
            </thead>
            <tbody>
              {
                state.withdrawRecords.map((item,idx) => {
                  return <Tr  
                    fontSize={'.2rem'}
                    fontWeight={'350'}
                    color={'#ffffff'}
                    key={idx}
                  >
                    <_Td  textAlign={'left'} width={'2.6rem'}>
                      {t(`withdrawing coins`)}
                    </_Td>
                    <_Td  textAlign={'center'} width={'2.6rem'}>
                      {t(`${item.amount}`)}
                    </_Td>
                    <_Td  textAlign={'center'} width={'2.04rem'}>
                      {t(`${item.updateTime}`)}
                    </_Td>
                  </Tr>
                })
              }
            </tbody>
          </Table>

        </Box>

      </Column>
    </FundRecordsWrap>
  )
}
