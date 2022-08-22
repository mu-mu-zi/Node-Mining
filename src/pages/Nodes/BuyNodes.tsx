import { Typography } from 'components/BaseElement'
import { Column, ColumnStart } from 'components/BaseElement/Column'
import { Row } from 'components/BaseElement/Row'
import JumpBtn from 'components/Button/BackBtn'
import React, {useState, useCallback} from 'react'
import { Wrapper, OrderInput, IconPrice, PngNode, PurchaseNode } from './BuyNodes.style'
import { useTranslation } from 'react-i18next';
import Order from './Order'
import PurchaseSuccess from './PurchaseSuccess'

export default function BuyNodes() {
  const { t } = useTranslation()
  const [step, setStep] = useState<number>(1)

  return (
    <Wrapper>
      {
        step === 1 ?
        <>
          <JumpBtn
            text="Back"
            path={-1}
          />

          <Row
            gap=".99rem"
            marginTop={'.61rem'}
          >
            <PngNode src={require('assets/images/Nodes/nodes.png')} />

            <ColumnStart
              gap=".24rem"
            >
              <Typography
                fontSize={'.32rem'}
                fontWeight={'700'}
                color={'#fff'}
              >
                {t(`Getaverse nodes`)}
              </Typography>
              <ColumnStart
                gap=".32rem"
              >
                <Typography
                  fontSize={'.2rem'}
                  fontWeight={'350'}
                  color={'#fff'}
                >
                  {t(`Run nodes and earn Getaverse tokens and NFT rewards, supported by the user's node community.`)}
                </Typography>

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

                    <img src={require('assets/svg/Ellipse_sub.svg').default} />

                    <OrderInput
                      defaultValue={1}
                    />

                    <img src={require('assets/svg/Ellipse_add.svg').default} />
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
                    >0x7Cbb269D95f85Cd069fEF7D6c625f4C22fAeCA99</Typography>
                  </Row>
                </Row>

                <PurchaseNode 
                  onClick={() => setStep(2)}
                >
                  {t(`Purchase Node`)}
                </PurchaseNode>
              </ColumnStart>
            </ColumnStart>
          </Row>
        </> : 
        step === 2 ?
        <Order setStep={setStep} /> :
        step === 3 ?
        <PurchaseSuccess setStep={setStep} /> : null
      }
    </Wrapper>
  )
}