import React, { useEffect, useState } from 'react'
import Box, { Typography } from 'components/BaseElement';
import JumpBtn from 'components/Button/BackBtn';
import { Column } from '../../components/BaseElement/Column';
import { useTranslation } from 'react-i18next';
import { Row } from 'components/BaseElement/Row';
import { FundRecordsWrap } from './MyNodes.style';



export default function Withdraw() {
  const { t } = useTranslation()

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
        </Row>
      </Column>
    </FundRecordsWrap>
  )
}
