import React, { useEffect, useState } from 'react'
import Box, { Typography } from 'components/BaseElement';
import JumpBtn from 'components/Button/BackBtn';
import { Column } from '../../components/BaseElement/Column';
import { useTranslation } from 'react-i18next';
import { Row } from 'components/BaseElement/Row';
import { WithdrawWrap } from './MyNodes.style';
import Flex from 'components/BaseElement/Flex';
import { RowStart } from '../../components/BaseElement/Row';
import Input from 'components/form/Input';
import Normal from '../../components/Button/Normal';



export default function Withdraw() {
  const { t } = useTranslation()

  return (
    <WithdrawWrap>
      <Column>
        <Row
          width={"100%"}
          justifyContent={'space-between'}
          marginBottom={'1.15rem'}
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
            {t(`withdrawing coins`)}
          </Typography>
          <div />
        </Row>

        <Flex 
          gap=".6rem"
          color="#ffffff"
          background="#1A1919"
          borderRadius="8px"
          padding=".21rem .85rem"
          marginBottom={'.43rem'}
          // width={'4.7rem'}
          boxSizing={'border-box'}
        >
          <Column gap=".16rem">
            <Typography
              fontSize={".2rem"}
              fontWeight={'350'}
            >{t(`Total Assets (GETA) `)}</Typography>
            <Typography
              fontSize={".2rem"}
              fontWeight={'700'}
            >45.23</Typography>
          </Column>
          <Column gap=".16rem">
            <Typography
              fontSize={".2rem"}
              fontWeight={'350'}
            >{t(`Available`)}</Typography>
            <Typography
              fontSize={".2rem"}
              fontWeight={'700'}
            >600</Typography>
          </Column>
        </Flex>

        <Row
          marginBottom={'.24rem'}
          justifyContent={'space-between'}
          width={'4.64rem'}
        >
          <Typography
            fontSize={'.2rem'}
            fontWeight={'700'}
            color={'#ffffff'}
          >
            {t(`Coins`)}
          </Typography>
          <Input />
        </Row>
        <Row
          marginBottom={'.64rem'}
          justifyContent={'space-between'}
          width={'4.64rem'}
        >
          <Typography
            fontSize={'.2rem'}
            fontWeight={'700'}
            color={'#ffffff'}
          >
            {t(`Amount`)}
          </Typography>
          <Input />
        </Row>

        <Typography
          fontSize={'.2rem'}
          fontWeight={'400'}
          color={'#6B6B6B'}  
          marginBottom={'.22rem'}
        >
          {t(`Handling fee: 0.32 GETA`)}
        </Typography>

        <Normal>
          {t(`WITHDRAW COINS`)}
        </Normal>

      </Column>
    </WithdrawWrap>
  )
}
