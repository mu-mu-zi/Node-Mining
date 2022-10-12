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
import { useAsync } from 'react-use';
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
  ${({theme}) => theme.mediaWidth.sm`
    font-size: 14px;
    min-width: 100%;
  `}
`

export default function SinglePledge() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { accounts, chainId } = useWalletTools()
  const { store } = useRedux()
  const { openModal } = useContext(ModalContext);
  const PledgeGetaPool = usePledgeGetaPool()
  const PledgeGeta = usePledgeGeta()
  const [reload, setReload] = useState<boolean>(false)
  const state = useEffectState({
    acquired: new BigNumber(0),
    pledged: new BigNumber(0),
    apr: new BigNumber(0),
    getaBalance: new BigNumber(0),
    SingleGlobalApr: new BigNumber(0),
  })


  const onExtraction = async () => {
    if (!PledgeGetaPool) {
      Notice('error', MsgStatus.fail,)
      return
    }
    try{
      
      let tx = await PledgeGetaPool.exit()
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
    } catch (e) {
      let msg = JSON.parse(JSON.stringify(e))
      Notice(msg.reason || msg.message, MsgStatus.fail)
      return
    }

  }

  useAsync(async () => { 
    if (!PledgeGeta || !accounts) return
    let account = accounts[0]
    const balance = await PledgeGeta.balanceOf(account)
    state.getaBalance = new BigNumber(balance.toString())

  },[accounts, PledgeGeta, chainId, store.token,reload])

  useAsync(async () => { 
    if (!PledgeGetaPool || !accounts) return
    let account = accounts[0]
    const reawrds = await PledgeGetaPool.getUserInfo(account)
    console.log('pledged,acquired,apr',reawrds,reawrds.toString())
    state.pledged = new BigNumber(reawrds[0].toString())
    state.acquired = new BigNumber(reawrds[1].toString())
    state.apr = new BigNumber(reawrds[2].toString()).multipliedBy((86400 * 365))

    const SingleGlobalApr = await PledgeGetaPool.globalAPY()
    state.SingleGlobalApr = new BigNumber(SingleGlobalApr.toString()).multipliedBy((86400 * 365))
    console.log(SingleGlobalApr.toString())

  },[accounts, PledgeGetaPool, chainId, store.token,reload])
  
  const onPledge = async () => {
    openModal(SinglePledgeModal,{
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
          {t(`GETA Single Currency Pledge`)}
        </Text>
      </Flex>

      <Row>
        <Text>{t(`Pledges`)}</Text>
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
        <Text fontWeight={'700'}>{state.getaBalance.div(10 ** Decimals).dp(decimalPlaces,1).toFixed() || EmptyStr}</Text>
      </Row>

      <Row>
        <Flex gridGap={'8px'}>
          <Text>{t(`Acquired:`)}</Text>
          <Text fontWeight={'700'}>{state.acquired.div(10 ** Decimals).dp(decimalPlaces,1).toFixed() || EmptyStr}</Text>
        </Flex>
        <Normal onClick={onExtraction} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem .145rem'} fontSize={'.16rem'} >{t(`Extraction`)}</Normal>
      </Row>

      <Row>
        <Flex gridGap={'8px'}>
          <Text>{t(`Pledged:`)}</Text>
          <Text fontWeight={'700'}>{state.pledged.div(10 ** Decimals).dp(decimalPlaces,1).toFixed() || EmptyStr}</Text>
        </Flex>
      </Row>

      <Box alignSelf={'center'} width={'100%'}>
        <Normal onClick={onPledge} padding={theme.isH5 ? '8px 10px' : '.105rem 1.1rem'}>{t(`Pledges`)}</Normal>
      </Box>

    </ColumnStart>
  )
}