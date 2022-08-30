import React from 'react'
import JumpBtn from 'components/Button/BackBtn'
import { IconPrice, PurchaseNode, Wrapper } from './BuyNodes.style'
import { Row, RowStart } from 'components/BaseElement/Row'
import { Column, ColumnStart } from '../../components/BaseElement/Column';
import Box, { Typography } from '../../components/BaseElement/index';
import { useTranslation } from 'react-i18next';
import BigNumber from "bignumber.js";
import { Decimals, _group } from 'utils/global'
import { useTgeMarket, useUsdt } from 'hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import { ContractAddresses } from "utils/ContractAddresses";
import { CloseMessageBox, MsgStatus } from 'components/messageBox/MessageBox';
import { Notice } from 'utils/tools';
interface Iprops {
  setStep: React.Dispatch<React.SetStateAction<number>>
  state: {
    count: number,
    Invite: string,
    price: BigNumber
}
}

export default function Order(props: Iprops) {
  const { state } = props
  const { t } = useTranslation()
  const TgeMarket = useTgeMarket()
  const Usdt = useUsdt()
  const { account } = useWeb3React()
  const purchase = async () => {
    try {

      if (!TgeMarket || !Usdt || !account) return
      
      let tx: any
      let isApprove = await Usdt.allowance(account, ContractAddresses.TgeMarket)
      if(Number(isApprove.toString()) < Number(state.price.toFixed())) {
        console.log(state.price.div(10 ** Decimals).toFixed())
        tx = await Usdt.approve(ContractAddresses.TgeMarket, state.price.toFixed())
        Notice('Please wait, your approve will arrive soon.' , MsgStatus.loading)
        await tx.wait()
        CloseMessageBox()
      }

      
      let tx1 = await TgeMarket.buy(state.count, state.price.toFixed(), _group, state.Invite)
      Notice('Please wait, your node will arrive soon.' , MsgStatus.loading)

      await tx1.wait()

      console.log(tx1)

      CloseMessageBox()
      props.setStep(3)
    } catch(e) {
      console.log(e)
      CloseMessageBox()
    } 
      // await result.hash
    // 加载中。。。
  }

  return (
    <>
      <Column
        gap=".4rem"
      >
        <Row
          width={"100%"}
          justifyContent={'space-between'}
        >
          <Box
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
          <Box />
        </Row>

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
              >{state.price.div(10 ** Decimals).div(state.count).toFixed()}</Typography>
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
              >{state.count}</Typography>
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
              {t(`Referrer Address`)}
            </Typography>
            <Row>
              <Typography
                fontSize={'.16rem'}
                fontWeight={'400'}
                color={'#fff'}
              >{t(`${state.Invite}`)}</Typography>
            </Row>
          </Row>

        </ColumnStart>

        <PurchaseNode
          onClick={purchase}
        >
          {t(`Purchase Node`)}
        </PurchaseNode>
      </Column>
    </>
  )
}