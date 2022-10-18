import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { adminAddress, _group } from 'utils/global'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Grid from 'components/BaseElement/Grid';
import Normal from 'components/Button/Normal';
import Box, { Typography } from 'components/BaseElement';
import { Column } from 'components/BaseElement/Column';
import { useTranslation } from 'react-i18next';
import { useTgeMarket } from 'hooks/useContract';
import { useEffectState } from '../../hooks/useEffectState';
import { CloseMessageBox, MsgStatus } from '../../components/messageBox/MessageBox';
import { isInputNumber, Notice } from 'utils/tools';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import { Title, WithdrawInp } from 'pages/MyNodes/MyNodes.style';
import { Icon } from 'components/BaseElement/Icon';
import Input from 'components/form/Input';
import { RowCenter } from 'components/BaseElement/Row';
import DropDown from 'components/dropDown/DropDown';
import { useAsync } from 'react-use';
import { BigNumber } from 'ethers';
import useTheme from '../../hooks/useTheme';
import { ContractAddresses } from 'utils/ContractAddresses';
import useWalletTools from 'hooks/useWalletTools';
import { CHAINS } from 'connectwallet/config';
import Staking from './Staking';
import useRedux from 'hooks/useRedux';

const Warpper = styled.div`
  position: relative;
  background: #000;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  height: max-content;
  /* padding-top: 108px; */
  box-sizing: border-box;
  ${({theme}) => theme.mediaWidth.sm`
    height: 100%;
    min-height: 500px;
    padding: 0 16px;
  `}
`

const SeMiTabs = styled(Tabs)`
  height: 100%;
  .semi-tabs-bar {
    position: relative;
    white-space: nowrap;
    outline: none;
    width: 3.2rem;
    padding: 0.32rem 0;
    gap: .32rem;
    background: #1A1919;
    border-radius: 8px;
    outline: none;
    .semi-tabs-tab {
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      display: inline-block;
      background-color: transparent;
      text-align: center;
    }
    .semi-tabs-tab-active {
      color: #F6B91B;
      background: #6B6B6B;
      border-radius: 16px;
      width: 80%;
      align-self: center;
    }
    .semi-tabs-pane {
      overflow: unset;
    }
    ${({theme}) => theme.mediaWidth.sm`
      display: flex;
      width: 100%;
      justify-content: center;
    `}
  }
`




export default function Admin() {
  const { t } = useTranslation()
  // const { account, provider } = useWeb3React()
  const { accounts, provider, chainId } = useWalletTools()
  const navigate = useNavigate()
  const TgeMarket = useTgeMarket()
  const [reload, setReload] = useState<boolean>()
  const { theme } = useTheme()
  const {store} = useRedux()
  const state = useEffectState({
    address: '' as string,
    amount: '' as string,
    selectOption:[] as {text: string; value: string}[],
    selectValue: {} as {text: string; value: string},
  })

  useAsync(async () => {
    if (!TgeMarket || !accounts) return
    let account = accounts[0]
    try {
      let result = await TgeMarket.getTokensOf(`${ContractAddresses.TgeMarket}`)
      let arr: any = []
      let obj: any = {}
      result.forEach((item: any) => {
        arr.push({
          text: `Node${item.toString()}`,
          value: item.toString()
        })
        state.selectOption.push({
          text: `Node${item.toString()}`,
          value: item.toString()
        })
      })
      obj = {
        text: `Node${result[0].toString()}`,
        value: result[0].toString()
      }
      state.selectOption = arr
      state.selectValue = obj
    } catch (e: any) {
      Notice(JSON.parse(JSON.stringify(e.reason)), MsgStatus.fail)
    }
  }, [accounts,reload])

  useEffect(() => {
    let account = accounts && accounts[0]
    if (adminAddress.toLowerCase() !== account?.toLowerCase()) {
      navigate('/')
      return
    }
    if(chainId !== CHAINS.BSC.chainId) {
      navigate('/')
      Notice('You are connected to an unsupported network, please switch to the BSC master network.', MsgStatus.fail)
    }
  }, [accounts, chainId, store.token])

  const FnCast = async () => {
    if (!TgeMarket || !accounts) return
    let account = accounts[0]
    try {
      let tx = await TgeMarket.adminMint(state.amount)
      Notice('Waiting for Cast...', MsgStatus.loading)
      await tx.wait()
      CloseMessageBox()
      Notice('cast success', MsgStatus.success)
      state.amount = '0'
    } catch (e: any) {
      Notice(JSON.parse(JSON.stringify(e.reason)), MsgStatus.fail)
    }
  }

  const FnTransfer = async () => {
    if (!TgeMarket || !accounts || !state.selectValue.value) return
    let account = accounts[0]
    try {
      let tx = await TgeMarket.adminTransfer(state.selectValue.value, state.address, _group)
      Notice('Waiting for Transfer...', MsgStatus.loading)
      await tx.wait()
      CloseMessageBox()
      Notice('Transfer success', MsgStatus.success)
      state.address = ''
      setReload(!reload)
    } catch (e: any) {
      Notice(JSON.parse(JSON.stringify(e.reason)), MsgStatus.fail)
    }
  }

  return (<>
    <Warpper>

      <SeMiTabs tabPosition={theme.isH5 ? "top" : "left"} type="button" className="abs">

        <TabPane
          tab={
            <Typography>
              Casting
            </Typography>
          }
          itemKey="1"
          style={{
            outline: 'none',
            height: '100%'
          }}
        >
          <Column
            width={theme.isH5 ? '100%' : '3.7rem'}
            margin={theme.isH5 ? '32px 0px' : '.64rem auto 0'}
            padding={'20px'}
          >
            <Title
              marginBottom={theme.isH5 ? '48px' : '.64rem'}
            >
              {t(`Casting`)}
            </Title>

            <Typography
              fontSize={theme.isH5 ? '12px' : ".2rem"}
              fontWeight={'700'}
              color={'#fff'}
              marginBottom={theme.isH5 ? '20px' : '.2rem'}
              alignSelf= 'self-start'
            >
              Amount
            </Typography>

            <WithdrawInp 
              placeholder='Please enter the number of castings'
              value={state.amount}
              onChange={(value) => {
                if ((value === "" || isInputNumber(value))) {
                  state.amount = value
                }
              }}
            />
            <Box
              marginTop={theme.isH5 ? '23px' : '.56rem'}
            >
              <Normal
                onClick={FnCast}
                >
                {t(`CONFIRM`)}
              </Normal>
            </Box>
          </Column>
        </TabPane>

        <TabPane
          tab={
            <Typography>
              Transfer
            </Typography>
          }
          itemKey="2"
          style={{
            outline: 'none',
            height: '100%'
          }}
        >
          <Column
            width={theme.isH5 ? '100%' : '3.7rem'}
            margin={theme.isH5 ? '32px 0px' : '.64rem auto 0'}
            padding={'20px'}
          >
            <Title
              marginBottom={theme.isH5 ? '48px' : '.64rem'}
            >
              {t(`Transfer`)}
            </Title>

            <Typography
              fontSize={theme.isH5 ? '12px' : ".2rem"}
              fontWeight={'700'}
              color={'#fff'}
              marginBottom={theme.isH5 ? '20px' : '.2rem'}
              alignSelf= 'self-start'
            >
              Transfer Address
            </Typography>

            <WithdrawInp 
              placeholder='Please enter the transfer address'
              value={state.address}
              onChange={(value) => {
                  state.address = value
              }}
            />
            <Typography
              fontSize={theme.isH5 ? '12px' : ".2rem"}
              fontWeight={'700'}
              color={'#fff'}
              marginBottom={theme.isH5 ? '20px' : '.2rem'}
              alignSelf= 'self-start'
              marginTop={theme.isH5 ? '16px' : '.35rem'}
            >
              Details (optional)
            </Typography>

            <WithdrawInp
              disabled
              value={state.selectValue?.text}
              inputClassName={'adminInput'}
              right={
                <RowCenter
                  height={theme.isH5 ? '32px' : '.38rem'}
                  cursor={'pointer'}
                >
                  <DropDown
                    options={state.selectOption}
                    defaultValue={state.selectOption[0]?.value}
                    menuClassName={'menuName'}
                    style={{
                      position: 'static'
                    }}
                    menuStyle={{
                      width: '100%',
                      paddingTop: '0',
                      height: theme.isH5 ? '100px' : '3.7rem',
                      overflow: 'overlay',
                      top: theme.isH5 ? '-65px' : '-3.2rem'
                    }}
                    onChange={(selectd:any) => {
                      state.selectValue = selectd
                    }}
                  >
                    <Icon
                      display={'block'}
                      // onClick={() => console.log('123')}
                      marginRight={'16px'}
                      src={require('assets/svg/Rectangle39.svg').default}
                    ></Icon>
                  </DropDown>
                </RowCenter>
              }
            />
            <Box
              marginTop={theme.isH5 ? '16px' : '.56rem'}
            >
              <Normal
                onClick={FnTransfer}
                >
                {t(`CONFIRM`)}
              </Normal>
            </Box>
          </Column>
        </TabPane>

        <TabPane
          tab={
            <Typography>
              Stake
            </Typography>
          }
          itemKey="3"
          style={{
            outline: 'none',
            height: '100%'
          }}
        >
          <Staking />
        </TabPane>

      </SeMiTabs>
    </Warpper>
  </>)
}