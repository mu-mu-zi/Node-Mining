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
import { formatAddress, Notice } from 'utils/tools';
import useTheme from '../../hooks/useTheme';
import Normal from '../../components/Button/Normal';
interface Iprops {
  setStep: React.Dispatch<React.SetStateAction<number>>
  state: {
    count: number,
    Invite: string,
    price: BigNumber
  }
  destoryComponent?: any
}

export default function Order(props: Iprops) {
  const { state } = props
  const { t } = useTranslation()
  const { theme } = useTheme()
  const TgeMarket = useTgeMarket()
  const Usdt = useUsdt()
  const { account } = useWeb3React()
  const purchase = async () => {
    try {

      if (!TgeMarket || !Usdt || !account) return
      let tx: any
      let isApprove = await Usdt.allowance(account, ContractAddresses.TgeMarket)
      // console.log(isApprove.toString())
      if (Number(isApprove.toString()) < Number(state.price.toFixed())) {
        try{
          tx = await Usdt.approve(ContractAddresses.TgeMarket, state.price.toFixed())
          Notice('Please wait, your approve will arrive soon.', MsgStatus.loading)
          await tx.wait()
          CloseMessageBox()
        }catch(e:any) {
          let msg = JSON.parse(JSON.stringify(e))
          Notice(msg.reason, MsgStatus.fail)
          return
        }
      }
      // console.log('isApprove =>',isApprove.toString())
      // console.log('count =>',state.count)
      // console.log('price =>',state.price.toFixed())
      // console.log('_group =>',_group)

      let tx1 = await TgeMarket.buy(state.count, state.price.toFixed(), _group, state.Invite)
      Notice('Please wait, your node will arrive soon.', MsgStatus.loading)

      await tx1.wait()

      console.log(tx1)

      CloseMessageBox()
      if(props.destoryComponent) {
        props.destoryComponent()
      }
      props.setStep(3)
    } catch (e) {
      console.log(e)
      CloseMessageBox()
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason, MsgStatus.fail)
    }
    // await result.hash
    // 加载中。。。
  }

  return (
    <>
      <Column
        gap={theme.isH5 ? '16px' : ".4rem"}
      >
        <Row
          width={"100%"}
          justifyContent={theme.isH5 ? 'center' : 'space-between'}
        >
          <Box
            display={theme.isH5 ? 'none' : 'block'} 
          >
            <JumpBtn
              text="BACK"
              onClick={() => props.setStep(1)}
            // path={-1}
            />
          </Box>
          <Typography
            fontSize={theme.isH5 ? '20px' : '.6rem'}
            fontWeight={'700'}
            color={'#fff'}
            fontFamily={'RomicStd'}
          >
            {t(`Order Information`)}
          </Typography>
          <Box width={'.68rem'}/>
        </Row>

        <ColumnStart
          gap={theme.isH5 ? '8px' : '.32rem'}
          width={'100%'}
          maxWidth={theme.isH5 ? '100%' : '4.9rem'}
        >

          <Column
            gap={theme.isH5 ? '4px' : ".08rem"}
            width={'100%'}
          >
            <Typography
              minWidth={theme.isH5 ? '100%' : '1.64rem'}
              textAlign={'left'}
              fontSize={theme.isH5 ? '14px' : '.2rem'}
              fontWeight={'350'}
              color={'#fff'}
              width={'100%'}
            >
              {t(`Name`)}
            </Typography>
            <Row
              padding={theme.isH5 ? '9.5px 16px' : '.11rem .16rem'}
              background={'#212020'}
              border={'1px solid #3D3D3D'}
              borderRadius={'4px'}
              width={'100%'}
              boxSizing={'border-box'}
            >
              <Typography
                fontSize={theme.isH5 ? '16px' : '.16rem'}
                fontWeight={'400'}
                color={'#fff'}
              >{t(`Getaverse nodes`)}</Typography>
            </Row>
          </Column>

          <Column
            gap={theme.isH5 ? '8px' : ".08rem"}
            width={'100%'}
          >
            <Typography
              minWidth={theme.isH5 ? '100%' : '1.64rem'}
              textAlign={'left'}
              fontSize={theme.isH5 ? '14px' : '.2rem'}
              fontWeight={'350'}
              color={'#fff'}
              width={'100%'}
            >
              {t(`Price`)}
            </Typography>
            <Row
              padding={theme.isH5 ? '9.5px 16px' : '.11rem .16rem'}
              border={'1px solid #3D3D3D'}
              background={'#212020'}
              borderRadius={'4px'}
              width={'100%'}
              boxSizing={'border-box'}
              gap={theme.isH5 ? '8px' : ".08rem"}>
              <IconPrice src={require('assets/svg/nodes_price.svg').default} />
              <Typography
                fontSize={theme.isH5 ? '16px' : '.2rem'}
                fontWeight={'700'}
                color={'#fff'}
              >{state.price.div(10 ** Decimals).div(state.count).toFixed()}</Typography>
            </Row>
          </Column>

          <Column
            gap={theme.isH5 ? '8px' : ".08rem"}
            width={'100%'}
          >
            <Typography
              minWidth={theme.isH5 ? '100%' : '1.64rem'}
              textAlign={'left'}
              fontSize={theme.isH5 ? '14px' : '.2rem'}
              fontWeight={'350'}
              color={'#fff'}
              width={'100%'}
            >
              {t(`Amount`)}
            </Typography>
            <Row
              padding={theme.isH5 ? '9.5px 16px' : '.11rem .16rem'}
              border={'1px solid #3D3D3D'}
              background={'#212020'}
              borderRadius={'4px'}
              width={'100%'}
              boxSizing={'border-box'}
              gap={theme.isH5 ? '8px' : ".08rem"}>
              <Typography
                fontSize={theme.isH5 ? '16px' : '.2rem'}
                fontWeight={'700'}
                color={'#fff'}
              >{state.count}</Typography>
            </Row>
          </Column>

          <Column
            gap={theme.isH5 ? '8px' : ".08rem"}
            width={'100%'}
          >
            <Typography
              minWidth={theme.isH5 ? '100%' : '1.64rem'}
              textAlign={'left'}
              fontSize={theme.isH5 ? '14px' : '.2rem'}
              fontWeight={'350'}
              color={'#fff'}
              width={'100%'}
            >
              {t(`Totals`)}
            </Typography>
            <Row
              padding={theme.isH5 ? '9.5px 16px' : '.11rem .16rem'}
              border={'1px solid #3D3D3D'}
              background={'#212020'}
              borderRadius={'4px'}
              width={'100%'}
              boxSizing={'border-box'}
              gap={theme.isH5 ? '8px' : ".08rem"}>
              <IconPrice src={require('assets/svg/nodes_price.svg').default} />
              <Typography
                fontSize={theme.isH5 ? '16px' : '.2rem'}
                fontWeight={'700'}
                color={'#fff'}
              >{state.price.div(10 ** Decimals).toFixed()}</Typography>
            </Row>
          </Column>

          <Column
            gap={theme.isH5 ? '8px' : ".08rem"}
            width={'100%'}
          >
            <Typography
              minWidth={theme.isH5 ? '100%' : '1.64rem'}
              textAlign={'left'}
              fontSize={theme.isH5 ? '14px' : '.2rem'}
              fontWeight={'350'}
              color={'#fff'}
              width={'100%'}
            >
              {t(`Referrer Address`)}
            </Typography>
            <Row
              padding={theme.isH5 ? '9.5px 16px' : '.11rem .16rem'}
              border={'1px solid #3D3D3D'}
              background={'#212020'}
              borderRadius={'4px'}
              width={'100%'}
              boxSizing={'border-box'}>
              <Typography
                fontSize={theme.isH5 ? '16px' : '.16rem'}
                fontWeight={'400'}
                color={'#fff'}
              >{t(`${formatAddress(state.Invite)}`)}</Typography>
            </Row>
          </Column>

        </ColumnStart>

        <Normal
          onClick={purchase}
        >
          {t(`PURCHASE NODE`)}
        </Normal>
      </Column>
    </>
  )
}