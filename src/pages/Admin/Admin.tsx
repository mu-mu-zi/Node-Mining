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

const Warpper = styled.div`
position: relative;
background: #000;
/* display: flex;
flex-direction: column;
align-items: center;
justify-content: center; */
height: 9.06rem;
/* padding-top: 108px; */
box-sizing: border-box;
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
    }
  }
`




export default function Admin() {
  const { t } = useTranslation()
  const { account, provider } = useWeb3React()
  const navigate = useNavigate()
  const TgeMarket = useTgeMarket()
  const [reload, setReload] = useState<boolean>()
  
  const state = useEffectState({
    address: '' as string,
    amount: '' as string,
    selectOption:[] as {text: string; value: string}[],
    selectValue: {} as {text: string; value: string},
  })

  useAsync(async () => {
    if (!TgeMarket || !account) return
    try {
      let result = await TgeMarket.getTokensOf('0xDb8050EcFcb88379234C5aedac57BD3f7259E1aa')
      let arr: any = []
      let obj: any = {}
      result.forEach((item) => {
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
      console.log(state.selectOption)
    } catch (e) {
      console.log(e)
    }
  }, [account,reload])

  useEffect(() => {
    if (adminAddress.toLowerCase() !== account?.toLowerCase()) {
      navigate('/')
    }
  }, [account])

  const FnCast = async () => {
    if (!TgeMarket || !account) return
    try {
      let tx = await TgeMarket.adminMint(state.amount)
      Notice('Waiting for Cast...', MsgStatus.loading)
      await tx.wait()
      CloseMessageBox()
      console.log(tx)
      Notice('cast success', MsgStatus.success)
      state.amount = '0'

    } catch (e: any) {
      console.log(e)
      Notice(JSON.parse(JSON.stringify(e.reason)), MsgStatus.fail)
    }
  }

  const FnTransfer = async () => {
    if (!TgeMarket || !account || !state.selectValue.value) return
    try {
      console.log(state.selectValue.value,state.address)
      let tx = await TgeMarket.adminTransfer(state.selectValue.value, state.address, _group)
      Notice('Waiting for Transfer...', MsgStatus.loading)
      await tx.wait()
      CloseMessageBox()

      Notice('Transfer success', MsgStatus.success)
      state.address = ''
      setReload(!reload)

    } catch (e: any) {
      console.log(e)
      Notice(JSON.parse(JSON.stringify(e.reason)), MsgStatus.fail)
    }
  }

  return (<>
    <Warpper>

      <SeMiTabs tabPosition="left" type="button" className="abs">
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
            width={'3.7rem'}
            margin={ '.64rem auto 0'}
          >
            <Title
              marginBottom={'.64rem'}
            >
              {t(`Casting`)}
            </Title>

            <Typography
              fontSize={".2rem"}
              fontWeight={'700'}
              color={'#fff'}
              marginBottom={'.2rem'}
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
              marginTop={'.56rem'}
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
            width={'3.7rem'}
            margin={ '.64rem auto 0'}
          >
            <Title
              marginBottom={'.64rem'}
            >
              {t(`Transfer`)}
            </Title>

            <Typography
              fontSize={".2rem"}
              fontWeight={'700'}
              color={'#fff'}
              marginBottom={'.2rem'}
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
              fontSize={".2rem"}
              fontWeight={'700'}
              color={'#fff'}
              marginBottom={'.2rem'}
              alignSelf= 'self-start'
              marginTop={'.35rem'}
            >
              Details (optional)
            </Typography>

            <WithdrawInp
              disabled
              value={state.selectValue?.text}
              right={
                <RowCenter
                  height={'.38rem'}
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
                      height: '1.38rem',
                      overflow: 'overlay',
                    }}
                    onChange={(selectd:any) => {
                      state.selectValue = selectd
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
            <Box
              marginTop={'.56rem'}
            >
              <Normal
                onClick={FnTransfer}
                >
                {t(`CONFIRM`)}
              </Normal>
            </Box>
          </Column>
        </TabPane>
      </SeMiTabs>
    </Warpper>
  </>)
}