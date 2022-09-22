import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react'
import Box, { Typography } from 'components/BaseElement';
import JumpBtn from 'components/Button/BackBtn';
import { Column } from '../../components/BaseElement/Column';
import { useTranslation } from 'react-i18next';
import { Row, RowCenter } from 'components/BaseElement/Row';
import { Invitation, InviteInput, WithdrawInp, WithdrawMax, WithdrawWrap } from './MyNodes.style';
import Flex from 'components/BaseElement/Flex';
import { RowStart } from '../../components/BaseElement/Row';
import Input from 'components/form/Input';
import Normal from '../../components/Button/Normal';
import { Icon } from 'components/BaseElement/Icon';
import DropDown from 'components/dropDown/DropDown';
import useRedux from '../../hooks/useRedux';
import { FLOAT_NUMBER, NUMBER_REG } from 'utils/global';
import { isFloatNumber ,isInputNumber, Notice } from 'utils/tools';
import { useEffectState } from 'hooks/useEffectState';
import { useAsync } from 'react-use';
import { apply, coinList, MyAsset, myAsset } from 'http/api';
import { MsgStatus } from 'components/messageBox/MessageBox';
import { useWeb3React } from '@web3-react/core';
import useTheme from '../../hooks/useTheme';
import useWalletTools from '../../hooks/useWalletTools';
import { CHAINS } from 'connectwallet/config';
import { injected } from 'connectwallet/hooks';
import { ModalContext } from 'components/provider/ModalProvider';
import Network from 'components/NetCheckModal/Network';





export default function Withdraw() {
  const { t } = useTranslation()
  const [selectCoin, setSelectCoin] = useState<{text: string; value: number}>()
  const {store, userDispatch} = useRedux()
  const {account} = useWeb3React()
  const { accounts, chainId } = useWalletTools()
  const [reload, setReload] = useState<boolean>(false)
  const { theme } = useTheme()
  const { openModal } = useContext(ModalContext);
  const state = useEffectState({
    totalAssets: 0 as number,
    available: 0 as number, 
    amount: '' as string,
    selectOption:[] as {text: string; value: number}[],
    fee: 0 as number
  })

  async function getCoinList() {
    let result = await coinList()
    userDispatch.setCoins(result.data)
  }


  useEffect(() => {
    
    if(!store.token) return
    getCoinList()
  },[reload,accounts,account,store.token])

  useAsync(async() => {
    if(!store.coins) return

    let totalAmount: number = 0
    let availableAmount: number = 0
    let withdrawFee: number = 0
    store.coins.forEach((item) => {
      if(item.id === selectCoin?.value) {
        totalAmount = item.totalAmount
        availableAmount = item.availableAmount
        withdrawFee = item.withdrawFee
      }
    })

    state.totalAssets = totalAmount
    state.available = availableAmount
    state.fee = withdrawFee
    state.amount = ''
  },[selectCoin])

  useMemo(() => {
      let selectOption:{text: string; value: number}[] = []
      store.coins?.forEach((item) => {
        selectOption.push({
          text: item.name,
          value: item.id
        })
      })
      state.selectOption =  selectOption
      setSelectCoin(selectOption[1])
  },[store.coins])


  const submit = async() => {
    if(!selectCoin || !state.amount) {
      Notice('Please enter correctly', MsgStatus.warn)
      return
    }
    if(chainId !== CHAINS.BSC.chainId) {
      openModal(Network)
      return
    }
    try{

      let result =  await apply({
        coinId: selectCoin.value,
        amount: Number(state.amount)
      })
      setReload(!reload)
      state.amount = ''
      Notice('success', MsgStatus.success)
    }catch(e: any) {
      Notice(`${e.message}`, MsgStatus.fail)
    }
  }

  return (
    <WithdrawWrap>
      <Column
        position={'relative'}
      >
        <Box
          position={theme.isH5 ? 'relative' : 'absolute'}
          alignSelf={theme.isH5 ? 'start' : ''}
          top={'.2rem'}
          left={'0'}
        >
          <JumpBtn
            text="MY NODES"
            path={-1}
          />
        </Box>
        <Row
          width={"100%"}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={theme.isH5 ? '32px' : '1.15rem'}
          
        >
          <Typography
            fontSize={theme.isH5 ? '20px' : '.6rem'}
            fontWeight={'700'}
            color={'#fff'}
            fontFamily={'RomicStd'}
          >
            {t(`withdrawing coins`)}
          </Typography>
        </Row>

        <Flex 
          gap={theme.isH5 ? '60px' : ".6rem"} 
          color="#ffffff"
          background="#1A1919"
          borderRadius="8px"
          padding={theme.isH5 ? '26.5px 10px' : ".21rem .85rem"}
          marginBottom={theme.isH5 ? '16px' : '.43rem'}
          justifyContent={theme.isH5 ? 'center' : ""}
          // width={'4.7rem'}
          boxSizing={'border-box'}
        >
          <Column gap={theme.isH5 ? '16px' : ".16rem"}>
            <Typography
              fontSize={theme.isH5 ? '12px' : ".2rem"}
              fontWeight={'350'}
              fontStyle={'italic'}
            >{t(`Total Assets (${selectCoin?.text}) `)}</Typography>
            <Typography
              fontSize={theme.isH5 ? '20px' : ".2rem"}
              fontWeight={'700'}
            >{state.totalAssets}</Typography>
          </Column>
          <Column gap={theme.isH5 ? '16px' : ".16rem"}>
            <Typography
              fontSize={theme.isH5 ? '12px' : ".2rem"}
              fontWeight={'350'}
              fontStyle={'italic'}
            >{t(`Available`)}</Typography>
            <Typography
              fontSize={theme.isH5 ? '20px' : ".2rem"}
              fontWeight={'700'}
            >{state.available}</Typography>
          </Column>
        </Flex>

        <Row
          marginBottom={theme.isH5 ? '32px' : '.24rem'}
          justifyContent={'space-between'}
          width={theme.isH5 ? '100%' : '4.64rem'}
          gap={theme.isH5 ? '20px' : ''}
        >
          <Typography
            fontSize={theme.isH5 ? '12px' : '.2rem'}
            fontWeight={'700'}
            minWidth={theme.isH5 ? '50px' : 'initial'}
            color={'#ffffff'}
          >
            {t(`Coins`)}
          </Typography>

          <WithdrawInp
            disabled
            value={selectCoin?.text}
            right={
              <RowCenter
                height={theme.isH5 ? '32px' : '.38rem'}
                cursor={'pointer'}
              >
                <DropDown
                  options={state.selectOption}
                  defaultValue={state.selectOption[1]?.value}
                  onChange={(selectd) => {
                    setSelectCoin(selectd)
                  }}
                >
                  <Icon
                    display={'block'}
                    onClick={() => console.log('123')}
                    marginRight={'16px'}
                    src={require('assets/svg/Rectangle39.svg').default}
                  ></Icon>
                </DropDown>
              </RowCenter>
            }
          />


        </Row>
        <Row
          marginBottom={theme.isH5 ? '16px' : '.64rem'}
          justifyContent={'space-between'}
          width={theme.isH5 ? '100%' : '4.64rem'}
          gap={theme.isH5 ? '20px' : ''}
        >
          <Typography
            fontSize={theme.isH5 ? '12px' : '.2rem'}
            fontWeight={'700'}
            color={'#ffffff'}
            minWidth={theme.isH5 ? '50px' : 'initial'}
          >
            {t(`Amount`)}
          </Typography>
          <WithdrawInp
            // regex={[{regStr: NUMBER_REG, tips: ""}]}
            placeholder={'0'}
            right={<WithdrawMax className='submit' onClick={() => {
              state.amount = `${state.available || 0}`
            }}>MAX</WithdrawMax>}
            value={state.amount}
            onChange={(value) => {
              if ((value === "" || isInputNumber(value))) {
                state.amount = value
              }
            }}
          />
        </Row>

        <Typography
          boxSizing={'border-box'}
          paddingLeft={theme.isH5 ? '75px' : '0'}
          width={theme.isH5 ? '100%' : 'initial'}
          fontSize={theme.isH5 ? '12px' : '.2rem'}
          fontWeight={'400'}
          color={'#6B6B6B'}  
          marginBottom={theme.isH5 ? '27px' : '.22rem'}
        >
          {t(`Handling fee: ${state.fee} ${selectCoin?.text}`)}
        </Typography>

        <Normal
          onClick={submit}
          style={{
            margin: theme.isH5 ? 'auto' : ''
          }}
        >
          {t(`WITHDRAW COINS`)}
        </Normal>

      </Column>
    </WithdrawWrap>
  )
}
