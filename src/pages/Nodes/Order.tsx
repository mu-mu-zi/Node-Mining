import React from 'react'
import JumpBtn from 'components/Button/BackBtn'
import { IconPrice, PurchaseNode, Wrapper } from './BuyNodes.style'
import { Row, RowStart } from 'components/BaseElement/Row'
import { Column, ColumnStart } from '../../components/BaseElement/Column';
import Box, { Typography } from '../../components/BaseElement/index';
import { useTranslation } from 'react-i18next';

interface Iprops {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Order(props: Iprops) {
  const {t} = useTranslation()
  return (
    <>
      <Column
        gap=".4rem"
      >
        <Box
          position={'relative'}
        >
          <Box
            position={'absolute'}
            top={'50%'}
            left={'-2.42rem'}
            style={{
              transform: 'translate(-50%, -50%)'
            }}
          >
          <JumpBtn
            text="Back"
            onClick={() => props.setStep(1)}
            // path={-1}
          />
          </Box>
          <Typography
            fontSize={'.6rem'}
            fontWeight={'700'}
            color={'#fff'}
            >
            {t(`Order Information`)}
          </Typography>
        </Box>

        <ColumnStart
          gap={'.32rem'}
        >

          <Row
            gap=".16rem"
          >
            <Typography
              minWidth={'1.64rem'}
              textAlign={'left'}
              fontSize={'.2rem'}
              fontWeight={'350'}
              color={'#fff'}
            >
              {t(`Name`)}
            </Typography>
            <Row>
              <Typography
                fontSize={'.16rem'}
                fontWeight={'400'}
                color={'#fff'}
              >{t(`Getaverse nodes`)}</Typography>
            </Row>
          </Row>

          <Row
            gap=".16rem"
          >
            <Typography
              minWidth={'1.64rem'}
              textAlign={'left'}
              fontSize={'.2rem'}
              fontWeight={'350'}
              color={'#fff'}
            >
              {t(`Price`)}
            </Typography>
            <Row gap=".08rem">
              <IconPrice src={require('assets/svg/nodes_price.svg').default} />
              <Typography
                fontSize={'.2rem'}
                fontWeight={'700'}
                color={'#fff'}
              >124.432</Typography>
            </Row>
          </Row>

          <Row
            gap=".16rem"
          >
            <Typography
              minWidth={'1.64rem'}
              textAlign={'left'}
              fontSize={'.2rem'}
              fontWeight={'350'}
              color={'#fff'}
            >
              {t(`Amount`)}
            </Typography>
            <Row gap=".08rem">
              <Typography
                fontSize={'.2rem'}
                fontWeight={'700'}
                color={'#fff'}
              >1</Typography>
            </Row>
          </Row>

          <Row
            gap=".16rem"
          >
            <Typography
              minWidth={'1.64rem'}
              textAlign={'left'}
              fontSize={'.2rem'}
              fontWeight={'350'}
              color={'#fff'}
            >
              {t(`Totals`)}
            </Typography>
            <Row gap=".08rem">
              <IconPrice src={require('assets/svg/nodes_price.svg').default} />
              <Typography
                fontSize={'.2rem'}
                fontWeight={'700'}
                color={'#fff'}
              >124.432</Typography>
            </Row>
          </Row>

          <Row
            gap=".16rem"
          >
            <Typography
              minWidth={'1.64rem'}
              textAlign={'left'}
              fontSize={'.2rem'}
              fontWeight={'350'}
              color={'#fff'}
            >
              {t(`Referrer Address`)}
            </Typography>
            <Row>
              <Typography
                fontSize={'.16rem'}
                fontWeight={'400'}
                color={'#fff'}
              >{t(`0x7Cb...CA99`)}</Typography>
            </Row>
          </Row>

        </ColumnStart>

        <PurchaseNode
          onClick={() => props.setStep(3)}
        >
              {t(`Purchase Node`)}
        </PurchaseNode>
      </Column>
    </>
  )
}