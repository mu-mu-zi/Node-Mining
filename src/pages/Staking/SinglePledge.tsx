import Box, { Text } from "components/BaseElement";
import { ColumnStart } from "components/BaseElement/Column";
import Flex from "components/BaseElement/Flex";
import { Icon } from "components/BaseElement/Icon";
import Normal from "components/Button/Normal";
import { CloseMessageBox, MsgStatus } from "components/messageBox/MessageBox";
import { ModalContext } from "components/provider/ModalProvider";
import SinglePledgeModal from "components/SinglePledgeModal/SinglePledgeModal";
import { usePledgeGeta, usePledgeGetaPool } from "hooks/useContract";
import useTheme from "hooks/useTheme";
import { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import { Notice } from "utils/tools";
import { useAsync, useInterval, useBoolean } from 'react-use';
import useWalletTools from "hooks/useWalletTools";
import useRedux from "hooks/useRedux";
import { useEffectState } from '../../hooks/useEffectState';
import BigNumber from "bignumber.js";
import { decimalPlaces, Decimals, EmptyStr } from "utils/global";
import { PledgeContract } from "utils/ContractAddresses";

const Row = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  min-width: 3.52rem;
  width: 100%;
  font-size: .2rem;
  font-weight: 400;
  color: #ffffff;
  white-space: nowrap;
  ${({ theme }) => theme.mediaWidth.sm`
    font-size: 14px;
    min-width: 100%;
  `}
`
interface IProps {
  reloadGeta: boolean
}

export default function SinglePledge(props: IProps) {
  const { t } = useTranslation()
  const { reloadGeta } = props
  const { theme } = useTheme()
  const { accounts, chainId } = useWalletTools()
  const { store } = useRedux()
  const { openModal } = useContext(ModalContext);
  const PledgeGetaPool = usePledgeGetaPool()
  const PledgeGeta = usePledgeGeta()
  const [reload, setReload] = useState<boolean>(false)

  const [delay, setDelay] = useState(3000);
  const [isRunning, toggleIsRunning] = useBoolean(true);

  const state = useEffectState({
    acquired: new BigNumber(0),
    pledged: new BigNumber(0),
    apr: new BigNumber(0),
    getaBalance: new BigNumber(0),
    SingleGlobalApr: new BigNumber(0),
  })


  const onExit = async () => {
    if (!PledgeGetaPool) {
      Notice('Please login to your wallet account first', MsgStatus.fail,)
      return
    }

    if (state.pledged.eq(0)) {
      Notice(`Your staking amount is 0`, MsgStatus.fail,)
      return
    }

    try {

      let tx = await PledgeGetaPool.exit()
      Notice('Please wait, your redeemed will arrive soon.', MsgStatus.loading)
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
    } catch (e) {
      toggleIsRunning(true)
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }

  const onExtraction = async () => {
    if (!PledgeGetaPool) {
      Notice('Please login to your wallet account first', MsgStatus.fail,)
      return
    }

    if (state.acquired.eq(0)) {
      Notice(`Your earnings are 0, please try again later`, MsgStatus.fail,)
      return
    }

    try {
      let tx = await PledgeGetaPool.claimReward()
      Notice('Please wait, your acquired will arrive soon.', MsgStatus.loading)
      // stop poll
      toggleIsRunning(false)
      await tx.wait()

      CloseMessageBox()

      Notice('You have successfully acquired', MsgStatus.success, {}, <Text fontSize={'12px'} fontWeight={'400'} color={'#F6B91B'}>{`${state.acquired.div(10 ** Decimals).dp(decimalPlaces, 1).toFixed()} GETA`} </Text>)
      toggleIsRunning(true)
      setReload(!reload)
    } catch (e) {
      toggleIsRunning(true)
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }
  }
  useAsync(async () => {
    if (!PledgeGeta || !accounts) {
      state.getaBalance = new BigNumber(0)
      return
    }
    let account = accounts[0]
    const balance = await PledgeGeta.balanceOf(account)
    state.getaBalance = new BigNumber(balance.toString())
  }, [accounts, PledgeGeta, chainId, store.token, reload, reloadGeta])

  useAsync(async () => {
    if (state.pledged.eq(0)) {
      toggleIsRunning(false)
      state.acquired = new BigNumber(0)
    } else {
      toggleIsRunning(true)
    }

  }, [state.pledged])

  useInterval(async () => {
    if (!PledgeGetaPool || !accounts) {
      state.acquired = new BigNumber(0)
      return
    }
    let account = accounts[0]
    const reawrds = await PledgeGetaPool.earned(account)
    state.acquired = new BigNumber(reawrds.toString())
  }, isRunning ? delay : null)
  useAsync(async () => {
    if (!PledgeGetaPool || !accounts) {
      state.apr = new BigNumber(0)
      state.SingleGlobalApr = new BigNumber(0)
      state.pledged = new BigNumber(0)
      return
    }
    let account = accounts[0]
    const reawrds = await PledgeGetaPool.getUserInfo(account)
    state.pledged = new BigNumber(reawrds[0].toString())
    // state.acquired = new BigNumber(reawrds[1].toString())
    state.apr = new BigNumber(reawrds[2].toString()).multipliedBy((86400 * 365))
    const SingleGlobalApr = await PledgeGetaPool.globalAPY()
    state.SingleGlobalApr = new BigNumber(SingleGlobalApr.toString()).multipliedBy((86400 * 365))
  }, [accounts, PledgeGetaPool, chainId, store.token, reload])
  const onPledge = async () => {
    if (!PledgeGetaPool) {
      Notice('Please login to your wallet account first', MsgStatus.fail,)
      return
    }
    openModal(SinglePledgeModal, {
      setReload: setReload,
      reload: reload
    })
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
          {t(`GETA Single Currency Stake`)}
        </Text>
      </Flex>

      <Row>
        <Text>{t(`Stake`)}</Text>
        <Flex gridGap={'8px'}>
          <Icon src={require('./img_usdt 1.svg').default} />
          <Text fontWeight={'700'}>{t(`GETA`)}</Text>
        </Flex>
      </Row>

      <Row>
        <Text>{t(`Get`)}</Text>
        <Flex gridGap={'8px'}>
          <Icon src={require('./img_usdt 1.svg').default} />
          <Text fontWeight={'700'}>{t(`GETA`)}</Text>
        </Flex>
      </Row>

      <Row>
        <Text>{t(`APR`)}</Text>
        <Text fontWeight={'700'}>{(state.apr.toString() === '0' ? state.SingleGlobalApr.div(10 ** Decimals).multipliedBy(100).toFixed(2) + '%' : state.apr.div(10 ** Decimals).multipliedBy(100).toFixed(2) + '%') || EmptyStr}</Text>
      </Row>

      <Row
        style={{
          justifyContent: 'start',
          gap: '8px'
        }}
      >
        <Text>{t(`GETA Balance:`)}</Text>
        <Text fontWeight={'700'}>{state.getaBalance.div(10 ** Decimals).dp(decimalPlaces, 1).toFixed() || EmptyStr}</Text>
      </Row>

      <Row>
        <Flex gridGap={'8px'}>
          <Text>{t(`Earned:`)}</Text>
          <Text fontWeight={'700'}>{state.acquired.div(10 ** Decimals).dp(decimalPlaces, 1).toFixed() || EmptyStr}</Text>
        </Flex>
        <Normal onClick={onExtraction} width={theme.isH5 ? '88px' : '1.06rem'} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem .145rem'} fontSize={'.16rem'} >{t(`CLAIM`)}</Normal>
      </Row>

      <Row>
        <Flex gridGap={'8px'}>
          <Text>{t(`Total Staked:`)}</Text>
          <Text fontWeight={'700'}>{state.pledged.div(10 ** Decimals).dp(decimalPlaces, 1).toFixed() || EmptyStr}</Text>
        </Flex>
        <Normal onClick={onExit} width={theme.isH5 ? '88px' : '1.06rem'} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem 0'} fontSize={theme.isH5 ? '11px' : '.16rem'} >{t(`REDEEM`)}</Normal>
      </Row>

      <Box alignSelf={'center'} width={'100%'}>
        <Normal onClick={onPledge} padding={theme.isH5 ? '8px 10px' : '.105rem 1.1rem'}>{t(`STAKE`)}</Normal>
      </Box>

    </ColumnStart>
  )
}