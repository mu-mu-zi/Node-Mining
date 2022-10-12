import Box, { Text } from "components/BaseElement";
import { Column, ColumnStart } from "components/BaseElement/Column";
import Flex from "components/BaseElement/Flex";
import { Icon } from "components/BaseElement/Icon";
import Normal from "components/Button/Normal";
import LiquidityPledgeModal from "components/LiquidityPledge/LiquidityPledgeModal";
import { ModalContext } from "components/provider/ModalProvider";
import { usePledgeGetaPool, usePledgeGeta, usePledgeLpPool, usePair } from "hooks/useContract";
import { useEffectState } from "hooks/useEffectState";
import useRedux from "hooks/useRedux";
import useTheme from "hooks/useTheme";
import useWalletTools from "hooks/useWalletTools";
import { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import BigNumber from "bignumber.js";
import { useAsync } from "react-use";
import { decimalPlaces, Decimals, EmptyStr } from "utils/global";
import { Notice } from "utils/tools";
import { CloseMessageBox, MsgStatus } from "components/messageBox/MessageBox";

const Row = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  min-width: 3.52rem;
  width: 100%;
  font-size: .2rem;
  font-weight: 400;
  color: #ffffff;
  ${({theme}) => theme.mediaWidth.sm`
    font-size: 14px;
    min-width: 100%;
  `}
`

export default function LiquidityPledge() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { openModal } = useContext(ModalContext);
  const { accounts, chainId } = useWalletTools()
  const [reload, setReload] = useState<boolean>(false)
  const { store } = useRedux()
  const pledgeLpPool = usePledgeLpPool()
  const PledgeGeta = usePledgeGeta()
  const Pair = usePair()

  const state = useEffectState({
    acquired: new BigNumber(0),
    pledged: new BigNumber(0),
    apr: new BigNumber(0),
    getaBalance: new BigNumber(0),
  })

  useAsync(async () => { 
    if (!Pair || !accounts) return
    let account = accounts[0]
    const balance = await Pair.balanceOf(account)
    state.getaBalance = new BigNumber(balance.toString())

  },[accounts, Pair, chainId, store.token,reload])

  useAsync(async () => { 
    if (!pledgeLpPool || !accounts) return
    let account = accounts[0]
    const reawrds = await pledgeLpPool.getUserInfo(account)
    console.log(reawrds)
    state.pledged = new BigNumber(reawrds[0].toString())
    state.acquired = new BigNumber(reawrds[1].toString())
    // state.apr = new BigNumber(reawrds[2].toString()).multipliedBy((86400 * 365))
    console.log(reawrds.toString())

  },[accounts, pledgeLpPool, chainId, store.token,reload])



  const onPledges = () => {
    openModal(LiquidityPledgeModal,{
      setReload: setReload,
      reload: reload
    })
  }

  const onExit = async () => {
    if (!pledgeLpPool) {
      Notice('error', MsgStatus.fail,)
      return
    }
    try{
      let tx = await pledgeLpPool.exit()
      Notice('Please wait, your redeemed will arrive soon.', MsgStatus.loading)
      await tx.wait()
      CloseMessageBox()
      Notice('You have successfully redeemed',
      MsgStatus.success,
      {},
      <Text fontSize={'12px'} fontWeight={'400'} color={'#F6B91B'}>
        {`${state.pledged.div(10 ** Decimals).toFixed(2, 1)} GETA + ${state.acquired.div(10 ** Decimals).toFixed(2, 1)} GETA`}
      </Text>)
      setReload(!reload)
    }catch(e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }
  const onExtraction = async () => {
    if (!pledgeLpPool) {
      Notice('error', MsgStatus.fail,)
      return
    }
    try{
      let tx = await pledgeLpPool.getReward()
      console.log('tx',tx)
      await tx.wait()
      Notice('You have successfully extracted', MsgStatus.success, {}, <Text fontSize={'12px'} fontWeight={'400'} color={'#F6B91B'}>{`${state.acquired} GETA`} </Text>)
    }catch(e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }

  return (
    <ColumnStart 
      padding={theme.isH5 ? '16px' : '.24rem'} 
      gridGap={theme.isH5 ? '16px' : '.24rem'}
      background={'#1a1919'}
      borderRadius={'16px'}
    >
      <Flex alignItems={'center'} gridGap={'8px'}>
        <Icon width={theme.isH5 ? '32px' : '.4rem'} height={theme.isH5 ? '32px' : '.4rem'} src={require('./img_usdt 1.svg').default} />
        <Text fontSize={theme.isH5 ? '16px' : '.2rem'} fontWeight={'700'} color={'#ffffff'} >
          {t(`Liquidity Pledge`)}
        </Text>
      </Flex>

      <Row>
        <Text>{t(`TVL`)}</Text>
        <Text fontWeight={'700'}>1000,000,000.23</Text>
      </Row>

      <Row>
        <Text>{t(`Pledges`)}</Text>
        <Flex gridGap={'8px'}>
          <Icon src={require('./img_usdt 1.svg').default} />
          <Text fontWeight={'700'}>{t(`GW/USDT LP`)}</Text>
        </Flex>
      </Row>

      <Row>
        <Text>{t(`Get`)}</Text>
        <Text fontWeight={'700'}>{t(`GETA`)}</Text>
      </Row>

      <Row>
        <Flex gridGap={'8px'}>
          <Text>{t(`LP Balance: `)}</Text>
          <Text fontWeight={'700'}>{(state.getaBalance.div(10 ** Decimals).dp(decimalPlaces,1).toFixed() + ' LP') || EmptyStr}</Text>
        </Flex>
        <Normal onClick={onPledges} width={theme.isH5 ? '88px' : '1.06rem'} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem 0'} fontSize={theme.isH5 ? '11px' : '.16rem'} >{t(`Pledges`)}</Normal>
      </Row>

      <Row>
        <Flex gridGap={'8px'}>
          <Text>{t(`Acquired: `)}</Text>
          <Text fontWeight={'700'}>{state.acquired.div(10 ** Decimals).dp(decimalPlaces,1).toFixed() + ' GETA' || EmptyStr}</Text>
        </Flex>
        <Normal onClick={onExtraction} width={theme.isH5 ? '88px' : '1.06rem'} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem 0'} fontSize={theme.isH5 ? '11px' : '.16rem'} >{t(`Extraction`)}</Normal>
      </Row>

      <Row>
        <Flex gridGap={'8px'}>
          <Text>{t(`LP Pledges: `)}</Text>
          <Text fontWeight={'700'}>{state.pledged.div(10 ** Decimals).dp(decimalPlaces,1).toFixed() + ' LP' || EmptyStr}</Text>
        </Flex>
        <Normal onClick={onExit} width={theme.isH5 ? '88px' : '1.06rem'} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem 0'} fontSize={theme.isH5 ? '11px' : '.16rem'} >{t(`Redemption`)}</Normal>
      </Row>

      <Box alignSelf={'center'} width={'100%'}>
        <Normal onClick={onPledges} padding={theme.isH5 ? '8px 10px' : '.105rem 1.1rem'}>{t(`Pledges`)}</Normal>
      </Box>

      <Flex alignSelf={'center'} fontSize={theme.isH5 ? '14px' : '.14rem'} fontWeight={'400'} color={'#ffffff'}>
        <Text>{t(`Liquidity for GETA/USDT(LP) on`)}</Text>
        <Text cursor={'pointer'} marginLeft={'4px'} color={'#F6B91B'}>
          <a
            href={'https://pancakeswap.finance/swap?chainld=97'}
            target="_blank"
            style={{
              color: "#F6B91B"
            }}
          >{t(`Pancake`)}</a>
        </Text>
        <Icon marginLeft={'4px'} src={require('assets/svg/link_gray.svg').default} />
      </Flex>
 
    </ColumnStart>
  )
}