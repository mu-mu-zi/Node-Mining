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

interface NodeRevenue {
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

export default function NodeRevenue() {
  const {t} = useTranslation()
  const [record, setRecord] = useState<NodeRevenue[]>([])
  const [type, setType] = useState<Number>(1)
  useEffect(() => {
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
  <RevenueWrap>
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
            {t(`Node revenue`)}
          </Typography>
          <Box />
      </Row>

      <Grid
        gridTemplateColumns={'repeat(3,1fr)'}
        alignItems={'center'}
        width={'100%'}
        padding={'.68rem .16rem'}
        gap={'.2rem'}
        background={'#1A1919'}
        borderRadius={'4px'}
        boxSizing={'border-box'}
      >
        <Column
          gap={".08rem"}
        >
          <Typography
            fontSize={'.2rem'}
            fontWeight={'350'}
            color={'#fff'}
            WhiteSpace={'nowrap'}
          >
            {t(`Accumulated penny earnings (GW)`)}
          </Typography>
          <Typography
            fontSize={'.32rem'}
            fontWeight={'700'}
            color={'#fff'}
          >
            328.428
          </Typography>
        </Column>
        <Column
          gap={".08rem"}
        >
          <Typography
            fontSize={'.2rem'}
            fontWeight={'350'}
            color={'#fff'}
          >
            {t(`Today's penny earnings (GW)`)}
          </Typography>
          <Typography
            fontSize={'.32rem'}
            fontWeight={'700'}
            color={'#fff'}
          >
            15.33
          </Typography>
        </Column>
        <Column
          gap={".08rem"}
        >
          <Typography
            fontSize={'.2rem'}
            fontWeight={'350'}
            color={'#fff'}
          >
            {t(`Owning Nodes`)}
          </Typography>
          <Typography
            fontSize={'.32rem'}
            fontWeight={'700'}
            color={'#fff'}
          >
            1
          </Typography>
        </Column>
      </Grid>

      <Box
        border={"4px solid #3D3D3D"}
        borderRadius={'4px'}
        padding={'.188rem 0'}
        width={'100%'}
        boxSizing={'border-box'}
      >
        <Typography
          fontSize={".32rem"}
          fontWeight={'700'}
          color={'#fff'}
          paddingLeft={'.16rem'}
          marginBottom={'.16rem'}
        >
          {t(`Record`)}
        </Typography>
        
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
                  {/* <_Th textAlign={'left'}>{t(`Type`)}</_Th> */}
                  <_Th>{t(`Amount`)}</_Th>
                  <_Th>{t(`Time`)}</_Th>
                </Tr>
              </thead>
              <tbody>
                {
                  record.map((item,idx) => {
                    return <Tr  
                      fontSize={'.2rem'}
                      fontWeight={'350'}
                      color={'#ffffff'}
                      key={idx}
                    >
                      {/* <_Td  textAlign={'left'} width={'2.6rem'}>
                        {t(`${item.type}`)}
                      </_Td> */}
                      <_Td  textAlign={'center'} width={'2.6rem'}>
                        {t(`${item.amount}`)}
                      </_Td>
                      <_Td  textAlign={'center'} width={'2.04rem'}>
                        {t(`${item.time}`)}
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
                  <_Th textAlign={'left'}>{t(`Type`)}</_Th>
                  <_Th>{t(`Amount`)}</_Th>
                  <_Th>{t(`Time`)}</_Th>
                </Tr>
              </thead>
              <tbody>
                {
                  record.map((item,idx) => {
                    return <Tr  
                      fontSize={'.2rem'}
                      fontWeight={'350'}
                      color={'#ffffff'}
                      key={idx}
                    >
                      <_Td  textAlign={'left'} width={'2.6rem'}>
                        {t(`${item.type}`)}
                      </_Td>
                      <_Td  textAlign={'center'} width={'2.6rem'}>
                        {t(`${item.amount}`)}
                      </_Td>
                      <_Td  textAlign={'center'} width={'2.04rem'}>
                        {t(`${item.time}`)}
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
