import { Typography } from 'components/BaseElement'
import { Column, ColumnStart } from 'components/BaseElement/Column'
import { Row } from 'components/BaseElement/Row'
import JumpBtn from 'components/Button/BackBtn'
import React, { useState, useCallback, useContext, useEffect } from 'react'
import { Wrapper, OrderInput, IconPrice, PngNode, PurchaseNode } from './BuyNodes.style'
import { useTranslation } from 'react-i18next';
import Order from './Order'
import PurchaseSuccess from './PurchaseSuccess'
import { useTgeMarket, useEthBuy } from 'hooks/useContract'
import { useAsync } from 'react-use'
import { useWeb3React } from '@web3-react/core'
import { useEffectState } from 'hooks/useEffectState'
import { Decimals, EmptyStr, zeroAddress } from 'utils/global'
import BigNumber from "bignumber.js";
import { MsgStatus } from 'components/messageBox/MessageBox'
import { Notice } from 'utils/tools'
import Flex from 'components/BaseElement/Flex';
import useTheme from '../../hooks/useTheme';
import Normal from '../../components/Button/Normal';
import OrderModal from 'components/OrderModal/OrderModal'
import { ModalContext } from 'components/provider/ModalProvider'
import useWidthChange from '../../hooks/useWidthChange';
import useWalletTools from 'hooks/useWalletTools'
import { CHAINS } from 'connectwallet/config'
import { getInveted } from 'http/api'
import useRedux from '../../hooks/useRedux';


export default function BuyNodes() {
  const { t } = useTranslation()
  const [step, setStep] = useState<number>(1)
  const { openModal } = useContext(ModalContext);
  const { store } = useRedux()
  const TgeMarket = useTgeMarket()
  const EthBuy =  useEthBuy()
  // const { account } = useWeb3React()
  const { theme } = useTheme()
  const { isH5 } = useWidthChange()
  const { accounts, chainId } = useWalletTools()
  const { account } = useWeb3React()
  const state = useEffectState({
    count: 1 as number,
    Invite: EmptyStr as string,
    price: new BigNumber(0)
  })

  useAsync(async () => {
    
    if (!TgeMarket || !accounts || !EthBuy) return
    let accounta = accounts[0]
    try {
      if(chainId === CHAINS.ETH.chainId) {
        let result = await EthBuy.getNodePrice()
        state.price = new BigNumber(result.toString())
        console.log('testtest',result.toString())
        return
      }

      let result = await TgeMarket.getTotalCost(state.count)
      state.price = new BigNumber(result.toString())


    } catch (e: any) {
      state.price = new BigNumber(0)
      if(chainId !== CHAINS.ETH.chainId && chainId !== CHAINS.BSC.chainId) {
        Notice('You are connected to an unsupported network, please switch to the BSC master network or the ETH master network.', MsgStatus.fail)
        return
      }
      Notice(JSON.parse(JSON.stringify(e.reason)) || JSON.parse(JSON.stringify(e.message)), MsgStatus.fail)
    }


  }, [state.count, accounts, TgeMarket, account, chainId])
  
  useAsync(async () => {
    
    if (!TgeMarket || !accounts || !store.token) return
    let account = accounts[0]
    try {

      if(chainId === CHAINS.ETH.chainId) {
        let result = await getInveted()
        state.Invite = result.data ? result.data :  EmptyStr
        console.log('123',state.Invite)
        if (state.Invite === zeroAddress) {
          state.Invite = EmptyStr
        }
        return
      }

      state.Invite = await TgeMarket.getInviter(account)
      if (state.Invite === zeroAddress) {
        state.Invite = EmptyStr
      }


    } catch (e: any) {
      state.Invite = EmptyStr
      if(chainId !== CHAINS.ETH.chainId && chainId !== CHAINS.BSC.chainId) {
        Notice('You are connected to an unsupported network, please switch to the BSC master network or the ETH master network.', MsgStatus.fail)
        return
      }
      Notice(JSON.parse(JSON.stringify(e.reason)) || JSON.parse(JSON.stringify(e.message)), MsgStatus.fail)
    }

  }, [accounts, TgeMarket, account, chainId, store.token])

  useEffect(() => {
    if (step !== 2 || !isH5) return
    openModal(OrderModal, {
      setStep: setStep,
      state: state
    })

  }, [step])


  const StepNext = () => {
    if(chainId !== CHAINS.ETH.chainId && chainId !== CHAINS.BSC.chainId) {
      Notice('You are connected to an unsupported network, please switch to the BSC master network or the ETH master network.', MsgStatus.fail)
      return
    }
    if (state.Invite === zeroAddress || !state.Invite || state.Invite === EmptyStr) {
      Notice('Sorry, you are not eligible to purchase.', MsgStatus.warn)
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
              text="NODES"
              path={-1}
            />

            <Flex
              alignItems={'center'}
              gap={theme.isH5 ? "32px" : ".99rem"}
              marginTop={theme.isH5 ? "16px" : '.61rem'}
              flexDirection={theme.isH5 ? 'column' : 'row'}
            >
              <PngNode src={require('assets/images/Nodes/nodes.png')} />

              <ColumnStart
                gap={theme.isH5 ? "5px" : ".24rem"}
                width={'100%'}
              >
                <Typography
                  fontSize={theme.isH5 ? "18px" : '.32rem'}
                  fontWeight={'700'}
                  color={'#fff'}
                >
                  {t(`Getaverse nodes`)}
                </Typography>
                <ColumnStart
                  width={'100%'}
                  gap={theme.isH5 ? "16px" : ".32rem"}
                >
                  <Typography
                    fontSize={theme.isH5 ? "12px" : '.2rem'}
                    fontWeight={'350'}
                    fontStyle={"italic"}
                    color={theme.isH5 ? "#6B6B6B" : '#fff'}
                  >
                    {t(`Run nodes and earn Getaverse tokens and NFT rewards, supported by the user's node community.`)}
                  </Typography>

                  <Row
                    gap={theme.isH5 ? "16px" : ".16rem"}
                  >
                    <Typography
                      width={theme.isH5 ? "88px" : '1.64rem'}
                      textAlign={'left'}
                      fontSize={theme.isH5 ? "14px" : '.2rem'}
                      fontWeight={theme.isH5 ? "400" : '350'}
                      color={'#fff'}
                    >
                      {t(`Price`)}
                    </Typography>
                    <Row gap={theme.isH5 ? "8px" : ".08rem"}>
                      <IconPrice src={require('assets/svg/nodes_price.svg').default} />
                      <Typography
                        fontSize={theme.isH5 ? "16px" : '.2rem'}
                        fontWeight={'700'}
                        color={'#fff'}
                      >{state.price.div(10 ** Decimals).toFixed()}</Typography>
                    </Row>
                  </Row>
                  <Row
                    gap={theme.isH5 ? "16px" : ".16rem"}
                  >
                    <Typography
                      width={theme.isH5 ? "88px" : '1.64rem'}
                      textAlign={'left'}
                      fontSize={theme.isH5 ? "14px" : '.2rem'}
                      fontWeight={theme.isH5 ? "400" : '350'}
                      color={'#fff'}
                    >
                      {t(`Amount`)}
                    </Typography>
                    <Row gap={theme.isH5 ? "8px" : ".08rem"}>

                      {/* <img
                        style={{
                          width: theme.isH5 ? "18px" : '',
                          height: theme.isH5 ? "18px" : '',
                        }}
                        src={require('assets/svg/Ellipse_sub.svg').default}
                        onClick={() => {
                          if (state.count <= 1) {
                            Notice('The quantity cannot be less than 1', MsgStatus.warn)
                            return
                          }
                          state.count = state.count - 1
                        }}
                      /> */}

                      <OrderInput
                        disabled={true}
                        value={state.count}
                      />

                      {/* <img
                        style={{
                          width: theme.isH5 ? "18px" : '',
                          height: theme.isH5 ? "18px" : '',
                        }}
                        src={require('assets/svg/Ellipse_add.svg').default}
                        onClick={() => {
                          state.count = state.count + 1
                        }}
                      /> */}
                    </Row>
                  </Row>
                  <Row
                    width={'100%'}
                    gap={theme.isH5 ? "16px" : ".16rem"}
                  >
                    <Typography
                      width={theme.isH5 ? "88px" : '1.64rem'}
                      textAlign={'left'}
                      fontSize={theme.isH5 ? "14px" : '.2rem'}
                      fontWeight={theme.isH5 ? "400" : '350'}
                      color={'#fff'}
                    >
                      {t(`Referrer Address`)}
                    </Typography>
                    <Row
                      style={{
                        wordBreak: 'break-all',

                      }}
                    >
                      <Typography
                        fontSize={theme.isH5 ? "12px" : '.16rem'}
                        fontWeight={'400'}
                        color={'#fff'}

                      >{state.Invite}</Typography>
                    </Row>
                  </Row>

                  <Normal
                    onClick={StepNext}
                    style={{
                      margin: theme.isH5 ? "0 auto" : ''
                    }}
                  >
                    {t(`PURCHASE NODE`)}
                  </Normal>
                </ColumnStart>
              </ColumnStart>
            </Flex>
          </> :
          step === 2 ?
            theme.isH5 ? <>
              <JumpBtn
                text="NODES"
                path={-1}
              />

              <Flex
                alignItems={'center'}
                gap={theme.isH5 ? "32px" : ".99rem"}
                marginTop={theme.isH5 ? "16px" : '.61rem'}
                flexDirection={theme.isH5 ? 'column' : 'row'}
              >
                <PngNode src={require('assets/images/Nodes/nodes.png')} />

                <ColumnStart
                  gap={theme.isH5 ? "5px" : ".24rem"}
                  width={'100%'}
                >
                  <Typography
                    fontSize={'.32rem'}
                    fontWeight={'700'}
                    color={'#fff'}
                  >
                    {t(`Getaverse nodes`)}
                  </Typography>
                  <ColumnStart
                    width={'100%'}
                    gap={theme.isH5 ? "16px" : ".32rem"}
                  >
                    <Typography
                      fontSize={theme.isH5 ? "12px" : '.2rem'}
                      fontWeight={'350'}
                      color={theme.isH5 ? "#6B6B6B" : '#fff'}
                    >
                      {t(`Run nodes and earn Getaverse tokens and NFT rewards, supported by the user's node community.`)}
                    </Typography>

                    <Row
                      gap={theme.isH5 ? "16px" : ".16rem"}
                    >
                      <Typography
                        width={theme.isH5 ? "88px" : '1.64rem'}
                        textAlign={'left'}
                        fontSize={theme.isH5 ? "14px" : '.2rem'}
                        fontWeight={theme.isH5 ? "400" : '350'}
                        color={'#fff'}
                      >
                        {t(`Price`)}
                      </Typography>
                      <Row gap={theme.isH5 ? "8px" : ".08rem"}>
                        <IconPrice src={require('assets/svg/nodes_price.svg').default} />
                        <Typography
                          fontSize={theme.isH5 ? "16px" : '.2rem'}
                          fontWeight={'700'}
                          color={'#fff'}
                        >{state.price.div(10 ** Decimals).toFixed()}</Typography>
                      </Row>
                    </Row>
                    <Row
                      gap={theme.isH5 ? "16px" : ".16rem"}
                    >
                      <Typography
                        width={theme.isH5 ? "88px" : '1.64rem'}
                        textAlign={'left'}
                        fontSize={theme.isH5 ? "14px" : '.2rem'}
                        fontWeight={theme.isH5 ? "400" : '350'}
                        color={'#fff'}
                      >
                        {t(`Amount`)}
                      </Typography>
                      <Row gap={theme.isH5 ? "8px" : ".08rem"}>

                        <img
                          style={{
                            width: theme.isH5 ? "18px" : '',
                            height: theme.isH5 ? "18px" : '',
                          }}
                          src={require('assets/svg/Ellipse_sub.svg').default}
                          onClick={() => {
                            if (state.count <= 1) {
                              Notice('The quantity cannot be less than 1', MsgStatus.warn)
                              return
                            }
                            state.count = state.count - 1
                          }}
                        />

                        <OrderInput
                          value={state.count}
                        />

                        <img
                          style={{
                            width: theme.isH5 ? "18px" : '',
                            height: theme.isH5 ? "18px" : '',
                          }}
                          src={require('assets/svg/Ellipse_add.svg').default}
                          onClick={() => {
                            state.count = state.count + 1
                          }}
                        />
                      </Row>
                    </Row>
                    <Row
                      width={'100%'}
                      gap={theme.isH5 ? "16px" : ".16rem"}
                    >
                      <Typography
                        width={theme.isH5 ? "88px" : '1.64rem'}
                        textAlign={'left'}
                        fontSize={theme.isH5 ? "14px" : '.2rem'}
                        fontWeight={theme.isH5 ? "400" : '350'}
                        color={'#fff'}
                      >
                        {t(`Referrer Address`)}
                      </Typography>
                      <Row
                        style={{
                          wordBreak: 'break-all',

                        }}
                      >
                        <Typography
                          fontSize={theme.isH5 ? "12px" : '.16rem'}
                          fontWeight={'400'}
                          color={'#fff'}

                        >{state.Invite}</Typography>
                      </Row>
                    </Row>

                    <Normal
                      onClick={StepNext}
                      style={{
                        margin: theme.isH5 ? "0 auto" : ''
                      }}
                    >
                      {t(`PURCHASE NODE`)}
                    </Normal>
                  </ColumnStart>
                </ColumnStart>
              </Flex>
            </>
              :
              <Order setStep={setStep} state={state} />

            :
            step === 3 ?
              <PurchaseSuccess setStep={setStep} /> : null
      }
    </Wrapper>
  )
}