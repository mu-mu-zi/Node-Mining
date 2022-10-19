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
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import BigNumber from "bignumber.js";
import { useAsync, useBoolean, useInterval } from "react-use";
import { decimalPlaces, Decimals, EmptyStr } from "utils/global";
import { Notice } from "utils/tools";
import { CloseMessageBox, MsgStatus } from "components/messageBox/MessageBox";
import uniswap from "contracts/uniswap";

const Row = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  min-width: 3.52rem;
  width: 100%;
  font-size: .2rem;
  font-weight: 400;
  color: #ffffff;
  ${({ theme }) => theme.mediaWidth.sm`
    font-size: 14px;
    min-width: 100%;
  `}
`

interface IProps {
  reloadGeta: boolean
  setReloadGeta: Dispatch<SetStateAction<boolean>>
}

export default function LiquidityPledge(props: IProps) {
  const { t } = useTranslation()
  const { reloadGeta, setReloadGeta } = props
  const { theme } = useTheme()
  const { openModal } = useContext(ModalContext);
  const { accounts, chainId } = useWalletTools()
  const [reload, setReload] = useState<boolean>(false)
  const [delay, setDelay] = useState(3000);
  const [isRunning, toggleIsRunning] = useBoolean(true);
  const { store } = useRedux()
  const pledgeLpPool = usePledgeLpPool()
  const PledgeGeta = usePledgeGeta()
  const Pair = usePair()

  const state = useEffectState({
    acquired: new BigNumber(0),
    pledged: new BigNumber(0),
    apr: new BigNumber(0),
    getaBalance: new BigNumber(0),
    tvl: new BigNumber(0)
  })

  useAsync(async () => {
    if (state.pledged.eq(0)) {
      toggleIsRunning(false)
      state.acquired = new BigNumber(0)
    } else {
      toggleIsRunning(true)
    }

  }, [state.pledged])

  useInterval(async () => {
    if (!pledgeLpPool || !accounts) {
      state.acquired = new BigNumber(0)
      return
    }
    let account = accounts[0]
    const reawrds = await pledgeLpPool.earned(account)
    state.acquired = new BigNumber(reawrds.toString())
  }, isRunning ? delay : null)

  useAsync(async () => {
    if (!Pair || !accounts) {
      state.getaBalance = new BigNumber(0)
      return
    }
    let account = accounts[0]
    const balance = await Pair.balanceOf(account)
    state.getaBalance = new BigNumber(balance.toString())

  }, [accounts, Pair, chainId, store.token, reload])

  useAsync(async () => {
    if (!pledgeLpPool || !accounts) {
      state.pledged = new BigNumber(0)
      state.acquired = new BigNumber(0)
      return
    }
    let account = accounts[0]
    const reawrds = await pledgeLpPool.getUserInfo(account)
    state.pledged = new BigNumber(reawrds[0].toString())
    state.acquired = new BigNumber(reawrds[1].toString())
  }, [accounts, pledgeLpPool, chainId, store.token, reload])

  useAsync(async () => {
    //LP price
    try {
      if (!pledgeLpPool) return
      let pairPrice = await uniswap.getLPTokenPriceFast();
      const totalSupply = await pledgeLpPool.totalSupply()

      state.tvl = new BigNumber(totalSupply.toString()).div(10 ** Decimals).multipliedBy(pairPrice)
    } catch (e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }, [uniswap, pledgeLpPool, accounts, chainId, store.token, reload])
  const onPledges = () => {
    if (!pledgeLpPool) {
      Notice('Please login to your wallet account first', MsgStatus.fail,)
      return
    }
    openModal(LiquidityPledgeModal, {
      setReload: setReload,
      reload: reload
    })
  }
  const onExit = async () => {
    if (!pledgeLpPool) {
      Notice('Please login to your wallet account first', MsgStatus.fail,)
      return
    }

    if (state.pledged.eq(0)) {
      Notice(`Your staking amount is 0`, MsgStatus.fail,)
      return
    }

    try {
      let tx = await pledgeLpPool.exit()
      Notice('Please wait, your redeemed will arrive soon.', MsgStatus.loading)
      // stop poll
      toggleIsRunning(false)
      await tx.wait()
      CloseMessageBox()
      Notice('You have successfully redeemed',
        MsgStatus.success,
        {},
        <Text fontSize={'12px'} fontWeight={'400'} color={'#F6B91B'}>
          {`${state.pledged.div(10 ** Decimals).dp(decimalPlaces, 1).toFixed()} GETA + ${state.acquired.div(10 ** Decimals).dp(decimalPlaces, 1).toFixed()} GETA`}
        </Text>)
      setReload(!reload)
      toggleIsRunning(true)
      setReloadGeta(!reloadGeta)
    } catch (e) {
      toggleIsRunning(true)
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }
  const onExtraction = async () => {
    if (!pledgeLpPool) {
      Notice('Please login to your wallet account first', MsgStatus.fail,)
      return
    }
    if (state.acquired.eq(0)) {
      Notice(`Your earnings are 0, please try again later`, MsgStatus.fail,)
      return
    }
    try {
      let tx = await pledgeLpPool.getReward()
      Notice('Please wait, your acquired will arrive soon.', MsgStatus.loading)
      // stop poll
      toggleIsRunning(false)
      await tx.wait()

      CloseMessageBox()

      Notice('You have successfully acquired', MsgStatus.success, {}, <Text fontSize={'12px'} fontWeight={'400'} color={'#F6B91B'}>{`${state.acquired.div(10 ** Decimals).dp(decimalPlaces, 1).toFixed()} GETA`} </Text>)
      toggleIsRunning(true)
      setReloadGeta(!reloadGeta)
    } catch (e) {
      toggleIsRunning(true)
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
          {t(`GETA/USDT`)}
        </Text>
      </Flex>

      <Row>
        <Text>{t(`TVL`)}</Text>
        <Text fontWeight={'700'}>{state.tvl.dp(decimalPlaces, 1).toFixed() || EmptyStr}</Text>
      </Row>

      <Row>
        <Text>{t(`Stake`)}</Text>
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
          <Text fontWeight={'700'}>{(state.getaBalance.div(10 ** Decimals).dp(decimalPlaces, 1).toFixed() + ' LP') || EmptyStr}</Text>
        </Flex>
        <Normal onClick={onPledges} width={theme.isH5 ? '88px' : '1.06rem'} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem 0'} fontSize={theme.isH5 ? '11px' : '.16rem'} >{t(`STAKE`)}</Normal>
      </Row>

      <Row>
        <Flex gridGap={'8px'}>
          <Text>{t(`Earned: `)}</Text>
          <Text fontWeight={'700'}>{state.acquired.div(10 ** Decimals).dp(decimalPlaces, 1).toFixed() + ' GETA' || EmptyStr}</Text>
        </Flex>
        <Normal onClick={onExtraction} width={theme.isH5 ? '88px' : '1.06rem'} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem 0'} fontSize={theme.isH5 ? '11px' : '.16rem'} >{t(`CLAIM`)}</Normal>
      </Row>

      <Row>
        <Flex gridGap={'8px'}>
          <Text>{t(`Total Staked: `)}</Text>
          <Text fontWeight={'700'}>{state.pledged.div(10 ** Decimals).dp(decimalPlaces, 1).toFixed() + ' LP' || EmptyStr}</Text>
        </Flex>
        <Normal onClick={onExit} width={theme.isH5 ? '88px' : '1.06rem'} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem 0'} fontSize={theme.isH5 ? '11px' : '.16rem'} >{t(`REDEEM`)}</Normal>
      </Row>

      <Box alignSelf={'center'} width={'100%'}>
        <Normal onClick={onPledges} padding={theme.isH5 ? '8px 10px' : '.105rem 1.1rem'}>{t(`STAKE`)}</Normal>
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