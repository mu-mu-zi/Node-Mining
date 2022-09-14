import React,{useState,useEffect} from 'react'
import Box, { Typography } from 'components/BaseElement';
import JumpBtn from 'components/Button/BackBtn';
import { Column, ColumnStart } from '../../components/BaseElement/Column';
import { useTranslation } from 'react-i18next';
import { Row } from 'components/BaseElement/Row';
import { RevenueWrap, Active } from './MyNodes.style';
import Flex from 'components/BaseElement/Flex';
import Grid from 'components/BaseElement/Grid';
import { Table, Td, Th, Tr } from 'components/BaseElement/Table';
import styled from 'styled-components';
import { useEffectState } from '../../hooks/useEffectState';
import { IncomeRecords, incomeRecords, nodeList, NodeList, nodeRevenue, Records, Revenue } from 'http/api';
import { useAsync } from 'react-use';
import { EmptyStr } from 'utils/global';
import { TimestampTransform } from 'utils/tools';
import useTheme from '../../hooks/useTheme';

const _Th = styled(Th)`
  padding: .08rem 0;
`
const _Td = styled(Td)`
  padding: .08rem 0;
`

export default function NodeRevenue() {
  const {t} = useTranslation()
  const state = useEffectState({
    revenue: {} as Revenue,
    purchase: {} as NodeList,
    incomeRecords: [] as Records[]
  })
  const [type, setType] = useState<Number>(1)
const { theme } = useTheme()

  useAsync(async() => {

    let result = await nodeRevenue()
    state.revenue = result.data
  }, [])
  useAsync(async() => {

    let result = await incomeRecords({
      pageIndex: 1,
      pageSize: 100
    })
    console.log(result)
    state.incomeRecords = result.data.records
  }, [])

  useAsync(async() => {
    let result = await nodeList({
      pageIndex: 1,
      pageSize: 100
    })
    state.purchase = result.data
    
  },[])

  return ( 
  <RevenueWrap>
    <Column
      gap={theme.isH5 ? '0' : ".34rem"}
      position={'relative'}
    >
      <Box
        position={theme.isH5 ? 'relative' : 'absolute'}
        alignSelf={theme.isH5 ? 'start' : ''}
        top={'.2rem'}
        left={'0'}
      >
        <JumpBtn
          text="MY NODES"
          path={-1}
          // onClick={() => props.setStep(1)}
        />
      </Box>
      <Row
        width={"100%"}
        justifyContent={'center'}
        alignItems={'center'}
        marginBottom={theme.isH5 ? '32px' : '0'}
      >
          <Typography
            fontSize={theme.isH5 ? '20px' : '.6rem'}
            fontWeight={'700'}
            color={'#fff'}
            fontFamily={'RomicStd'}
          >
            {t(`Node revenue`)}
          </Typography>
          <Box />
      </Row>

      <Grid
        gridTemplateColumns={theme.isH5 ? '1fr' : 'repeat(3,1fr)'}
        alignItems={'center'}
        width={'100%'}
        padding={theme.isH5 ? '16px 16px 28px' : '.68rem .16rem'}
        gap={theme.isH5 ? '16px' : '.2rem'}
        background={'#1A1919'}
        borderRadius={'4px'}
        boxSizing={'border-box'}
        marginBottom={theme.isH5 ? '16px' : ''}
      >
        <Column
          gap={theme.isH5 ? '8px' : ".08rem"}
          style={{
            alignItems: theme.isH5 ? 'start' : 'center'
          }}
        >
          <Typography
            fontSize={theme.isH5 ? '12px' : '.2rem'}
            fontWeight={'350'}
            color={'#fff'}
            whiteSpace={'nowrap'}
            fontStyle={'italic'}
          >
            {t(`Accumulated penny earnings (GW)`)}
          </Typography>
          <Typography
            fontSize={theme.isH5 ? '20px' : '.32rem'}
            fontWeight={'700'}
            color={'#fff'}
          >
            {state.revenue.countIncome ?? EmptyStr}
          </Typography>
        </Column>
        <Column
          gap={theme.isH5 ? '8px' : ".08rem"}
          style={{
            alignItems: theme.isH5 ? 'start' : 'center'
          }}
        >
          <Typography
            fontSize={theme.isH5 ? '12px' : '.2rem'}
            fontWeight={'350'}
            color={'#fff'}
            fontStyle={'italic'}
          >
            {t(`Today's penny earnings (GW)`)}
          </Typography>
          <Typography
            fontSize={theme.isH5 ? '20px' : '.32rem'}
            fontWeight={'700'}
            color={'#fff'}
          >
            {state.revenue.todayCentsIncome ?? EmptyStr}
          </Typography>
        </Column>
        <Column
          gap={theme.isH5 ? '8px' : ".08rem"}
          style={{
            alignItems: theme.isH5 ? 'start' : 'center'
          }}
        >
          <Typography
            fontSize={theme.isH5 ? '12px' : '.2rem'}
            fontWeight={'350'}
            color={'#fff'}
            fontStyle={'italic'}
          >
            {t(`Owning Nodes`)}
          </Typography>
          <Typography
            fontSize={theme.isH5 ? '20px' : '.32rem'}
            fontWeight={'700'}
            color={'#fff'}
          >
            {state.revenue.nodeNumber ?? 0}
          </Typography>
        </Column>
      </Grid>

      <Box
        border={theme.isH5 ? '1px solid #3D3D3D' : "4px solid #3D3D3D"}
        borderRadius={theme.isH5 ? '1px' : '4px'}
        padding={theme.isH5 ? '14px 0' : '.188rem 0'}
        width={'100%'}
        boxSizing={'border-box'}
      >
        <Typography
          fontSize={theme.isH5 ? '16px' : ".32rem"}
          fontWeight={'700'}
          color={'#fff'}
          paddingLeft={theme.isH5 ? '8px' : '.16rem'}
          marginBottom={theme.isH5 ? '8px' : '.16rem'}
        >
          {t(`Record`)}
        </Typography>
        
        <Row
          width={'100%'}
          paddingBottom={theme.isH5 ? '8px' : '.1rem'}

          borderBottom={'2px solid #3D3D3D'}
          gap={theme.isH5 ? '32px' : ".32rem"}
          color={'#ffffff '}
          fontSize={theme.isH5 ? '12px' : '.2rem'}
          fontWeight={'700'}
        >
          <Active
            onClick={() => setType(1)}
            className={type === 1 ? 'active' : ''}
            paddingLeft={'4px'}
          >{t(`Cents earnings`)}</Active>
          <Active
            onClick={() => setType(2)}
            className={type === 2 ? 'active' : ''}
          >{t(`Node purchase`)}</Active>
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
                  <_Th textAlign={'left'}>{t(`Type`)}</_Th>
                  <_Th>{t(`Amount`)}</_Th>
                  <_Th>{t(`Time`)}</_Th>
                </Tr>
              </thead>
              <tbody>
                {
                  state.incomeRecords && state.incomeRecords.map((item,idx) => {
                    return <Tr  
                      fontSize={'.2rem'}
                      fontWeight={'350'}
                      fontStyle={'italic'}
                      color={'#ffffff'}
                      key={idx}
                    >
                      <_Td  textAlign={'left'} width={'2.6rem'}>
                        {t(`Cents earnings`)}
                      </_Td>
                      <_Td  textAlign={'center'} width={'2.6rem'} color={'#F6B91B'}>
                        {t(`+${item.amount} ${item.symbol}`)}
                      </_Td>
                      <_Td  textAlign={'center'} width={'2.04rem'}>
                        {t(`${TimestampTransform(item.createTime)}`)}
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
                  <_Th textAlign={'left'}>{t(`Name`)}</_Th>
                  <_Th>{t(`Amount`)}</_Th>
                  <_Th>{t(`Time`)}</_Th>
                </Tr>
              </thead>
              <tbody>
                {
                  state.purchase.records.map((item, idx) => {
                    return <Tr  
                      fontSize={theme.isH5 ? '11px' : '.2rem'}
                      fontWeight={'350'}
                      color={'#ffffff'}
                      key={idx}
                    >
                      <_Td  textAlign={'left'} width={'2.6rem'}>
                        {t(`${item.tokenId}`)}
                      </_Td>
                      <_Td  textAlign={'center'} width={'2.6rem'}>
                        {t(`${item.price} ${item.coinName}`)}
                      </_Td>
                      <_Td  textAlign={'center'} width={'2.04rem'}>
                        {t(`${item.createTime}`)}
                      </_Td>
                    </Tr>
                  })
                }
              </tbody>
          </Table>
        }

      </Box>

    </Column>
  </RevenueWrap>
  )
}
