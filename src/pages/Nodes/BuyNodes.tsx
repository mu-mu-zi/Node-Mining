import { Typography } from 'components/BaseElement'
import { Column, ColumnStart } from 'components/BaseElement/Column'
import { Row } from 'components/BaseElement/Row'
import JumpBtn from 'components/Button/BackBtn'
import React, {useState, useCallback} from 'react'
import { Wrapper, OrderInput, IconPrice, PngNode, PurchaseNode } from './BuyNodes.style'
import { useTranslation } from 'react-i18next';
import Order from './Order'
import PurchaseSuccess from './PurchaseSuccess'
import { useTgeMarket } from 'hooks/useContract'
import { useAsync } from 'react-use'
import { useWeb3React } from '@web3-react/core'
import { useEffectState } from 'hooks/useEffectState'
import { Decimals, EmptyStr, zeroAddress } from 'utils/global'
import {useEffect} from 'react';
import BigNumber from "bignumber.js";
import { MsgStatus } from 'components/messageBox/MessageBox'
import { Notice } from 'utils/tools'

export default function BuyNodes() {
  const { t } = useTranslation()
  const [step, setStep] = useState<number>(1)
  const TgeMarket = useTgeMarket()
  const { account } = useWeb3React()
  const state = useEffectState({
    count: 1 as number,
    Invite: EmptyStr as string,
    price: new BigNumber(0)
  })
  useAsync(async() => {

    if (!TgeMarket || !account) return
    let result = await TgeMarket.getTotalCost(state.count)
    state.price = new BigNumber(result.toString())


  },[state.count, account])
  // useEffect(() => {
  //   if (!TgeMarket || !account) return

  // },[account])
  
  useAsync(async() => {
    if (!TgeMarket || !account) return

    state.Invite = await TgeMarket.getInviter(account)


  },[account])

  const StepNext = () => {
    if(state.Invite === zeroAddress) {
      Notice('Sorry, you are not eligible to purchase.' , MsgStatus.fail)
      // setStep(2)
    } else {
      setStep(2)
    }
  }

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
                    >{state.price.div(10 ** Decimals).toFixed()}</Typography>
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

                    <img src={require('assets/svg/Ellipse_sub.svg').default} 
                      onClick={() => {
                        if(state.count <= 1) {
                          alert('cant')
                          return
                        }
                        state.count = state.count - 1
                      }}
                    />

                    <OrderInput
                      value={state.count}
                    />

                    <img src={require('assets/svg/Ellipse_add.svg').default} 
                      onClick={() => {
                        state.count = state.count + 1
                      }}
                    />
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
                    >{state.Invite}</Typography>
                  </Row>
                </Row>

                <PurchaseNode 
                  onClick={StepNext}
                >
                  {t(`Purchase Node`)}
                </PurchaseNode>
              </ColumnStart>
            </ColumnStart>
          </Row>
        </> : 
        step === 2 ?
        <Order setStep={setStep} state={state} /> :
        step === 3 ?
        <PurchaseSuccess setStep={setStep} /> : null
      }
    </Wrapper>
  )
}