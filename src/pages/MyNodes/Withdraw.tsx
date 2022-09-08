import React, { useEffect, useState, useCallback, useMemo } from 'react'
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





export default function Withdraw() {
  const { t } = useTranslation()
  const [selectCoin, setSelectCoin] = useState<{text: string; value: number}>()
  const {store, userDispatch} = useRedux()
  const [reload, setReload] = useState<boolean>(false)
  const state = useEffectState({
    totalAssets: 0 as number,
    available: 0 as number, 
    amount: '' as string,
    selectOption:[] as {text: string; value: number}[]
  })

  async function getCoinList() {
    let result = await coinList()
    userDispatch.setCoins(result.data)
  }


  useEffect(() => {
    getCoinList()
  },[reload])

  useAsync(async() => {
    if(!store.coins) return

    let totalAmount: number = 0
    let availableAmount: number = 0
    store.coins.forEach((item) => {
      if(item.id === selectCoin?.value) {
        totalAmount = item.totalAmount
        availableAmount = item.availableAmount
      }
    })

    state.totalAssets = totalAmount
    state.available = availableAmount
    state.amount = '0'
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
    try{

      let result =  await apply({
        coinId: selectCoin.value,
        amount: Number(state.amount)
      })
      setReload(!reload)
      state.amount = '0'
      Notice('success', MsgStatus.success)
    }catch(e: any) {
      Notice(`${e.message}`, MsgStatus.fail)
    }
  }

  return (
    <WithdrawWrap>
      <Column>
        <Row
          width={"100%"}
          justifyContent={'space-between'}
          marginBottom={'1.15rem'}
        >
          <Box>
            <JumpBtn
              text="My Nodes"
              path={-1}
            />
          </Box>
          <Typography
            fontSize={'.6rem'}
            fontWeight={'700'}
            color={'#fff'}
            fontFamily={'RomicStd'}
          >
            {t(`withdrawing coins`)}
          </Typography>
          <div />
        </Row>

        <Flex 
          gap=".6rem" 
          color="#ffffff"
          background="#1A1919"
          borderRadius="8px"
          padding=".21rem .85rem"
          marginBottom={'.43rem'}
          // width={'4.7rem'}
          boxSizing={'border-box'}
        >
          <Column gap=".16rem">
            <Typography
              fontSize={".2rem"}
              fontWeight={'350'}
            >{t(`Total Assets (${selectCoin?.text}) `)}</Typography>
            <Typography
              fontSize={".2rem"}
              fontWeight={'700'}
            >{state.totalAssets}</Typography>
          </Column>
          <Column gap=".16rem">
            <Typography
              fontSize={".2rem"}
              fontWeight={'350'}
            >{t(`Available`)}</Typography>
            <Typography
              fontSize={".2rem"}
              fontWeight={'700'}
            >{state.available}</Typography>
          </Column>
        </Flex>

        <Row
          marginBottom={'.24rem'}
          justifyContent={'space-between'}
          width={'4.64rem'}
        >
          <Typography
            fontSize={'.2rem'}
            fontWeight={'700'}
            color={'#ffffff'}
          >
            {t(`Coins`)}
          </Typography>

          <WithdrawInp
            disabled
            value={selectCoin?.text}
            right={
              <RowCenter
                height={'.38rem'}
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
          marginBottom={'.64rem'}
          justifyContent={'space-between'}
          width={'4.64rem'}
        >
          <Typography
            fontSize={'.2rem'}
            fontWeight={'700'}
            color={'#ffffff'}
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
          fontSize={'.2rem'}
          fontWeight={'400'}
          color={'#6B6B6B'}  
          marginBottom={'.22rem'}
        >
          {t(`Handling fee: 0.32 GETA`)}
        </Typography>

        <Normal
          onClick={submit}
        >
          {t(`WITHDRAW COINS`)}
        </Normal>

      </Column>
    </WithdrawWrap>
  )
}
