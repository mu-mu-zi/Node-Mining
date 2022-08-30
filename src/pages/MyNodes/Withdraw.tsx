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
import { apply, MyAsset, myAsset } from 'http/api';
import { MsgStatus } from 'components/messageBox/MessageBox';





export default function Withdraw() {
  const { t } = useTranslation()
  const [selectCoin, setSelectCoin] = useState<{text: string; value: number}>()
  const {store} = useRedux()
  const state = useEffectState({
    asset: {} as MyAsset,
    amount: '' as string,
    selectOption:[] as {text: string; value: number}[]
  })

  useAsync(async() => {
    let result = await myAsset()
    state.asset = result.data
  },[])

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

  // useAsync

  const submit = async() => {
    if(!selectCoin || !state.amount) {
      Notice('Please enter correctly', MsgStatus.warn)
      return
    }
    let result =  await apply({
      coinId: selectCoin.value,
      amount: Number(state.amount)
    })
    Notice('success', MsgStatus.warn)
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
              text="Back"
              path={-1}
            />
          </Box>
          <Typography
            fontSize={'.6rem'}
            fontWeight={'700'}
            color={'#fff'}
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
            >{t(`Total Assets (GETA) `)}</Typography>
            <Typography
              fontSize={".2rem"}
              fontWeight={'700'}
            >{state.asset.totalAsset}</Typography>
          </Column>
          <Column gap=".16rem">
            <Typography
              fontSize={".2rem"}
              fontWeight={'350'}
            >{t(`Available`)}</Typography>
            <Typography
              fontSize={".2rem"}
              fontWeight={'700'}
            >{state.asset.available}</Typography>
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
              state.amount = `${state.asset.available || 0}`
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
