import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next';
import useTheme from 'hooks/useTheme';
import Box, { Text } from 'components/BaseElement';
import Flex from 'components/BaseElement/Flex';
import { Column, FlexColumn } from 'components/BaseElement/Column';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import LiquidityPledge from './LiquidityPledge';
import SinglePledge from './SinglePledge';

const Banner = styled.div`
  position: relative;
  background-image: url('${require('assets/images/staking_bg.png')}');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 8.54rem;
  /* padding-top: 108px; */
  box-sizing: border-box;
  background-position: center;
  padding: .64rem 0 .62rem;
  ${({ theme }) => theme.mediaWidth.sm`
    min-height: 500px;
    padding: 18px 16px;
    align-items: start;
  `}
`

const CorrectIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: .14rem;
  height: .14rem;
  border-radius: 50%;
  border: 1px solid #ffffff;
  ${({ theme }) => theme.mediaWidth.sm`
    width: 14px;
    height: 14px;
  `}
  &::before {
    content: '';
    width: 4px;
    height: 7px;
    border-right: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    transform: rotate(35deg);
    margin-bottom: 2px;
  }
`

const SeMiTabs = styled(Tabs)`
  height: 100%;
  ${({ theme }) => theme.mediaWidth.sm`
      width: 100%;
  `}
  .semi-tabs-bar {
    position: relative;
    white-space: nowrap;
    outline: none;
    /* min-width: 3.3rem; */
    gap: .16rem;
    background: #1A1919;
    border-radius: 48px;
    outline: none;
    margin:0 auto .27rem;
    width:max-content;
    ${({ theme }) => theme.mediaWidth.sm`
      gap: 0;
      margin:0 auto .27rem;
      min-width: initial;
    `}
    .semi-tabs-tab {
      /* width: 1.9rem; */
      border-radius: 48px;
      padding: .145rem .15rem;
      color: #fff;
      font-size: 14px;
      font-weight: 900;
      display: inline-block;
      background-color: transparent;
      text-align: center;
      ${({ theme }) => theme.mediaWidth.sm`
        width: 100%;
        padding: 8px 14px;
        font-size: 12px;
      `}
    }
    .semi-tabs-tab-active {
      color: #000000;
      background-color: #F6B91B;
    }
    .semi-tabs-pane {
      overflow: unset;
    }
    ${({ theme }) => theme.mediaWidth.sm`
      display: flex;
      width: 100%;
      justify-content: center;
    `}
  }
`


export default function Staking() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  
  return <>
    <Banner>
      <FlexColumn
        gridGap={'.32rem'}
        padding={'.07rem .5rem'}
        alignItems={theme.isH5 ? 'start' : 'center'}
        width={'100%'}
      >
        <FlexColumn gridGap={theme.isH5 ? '8px' : '.16rem'}  alignItems={theme.isH5 ? 'start' : 'center'}>
          <Text fontSize={theme.isH5 ? '20px' : '.32rem'} fontWeight={'700'} color={'#ffffff'} >
            {t(`Staking`)}
          </Text>
          <Text fontSize={theme.isH5 ? '14px' : '.2rem'} fontWeight={'400'} color={'#ffffff'} >
            {t(`Add value to your cryptocurrency assets`)}
          </Text>
          <Flex flexDirection={theme.isH5 ? 'column' : 'row'} gridGap={theme.isH5 ? '8px' : '.24rem'} fontSize={theme.isH5 ? '12px' : '.14rem'} fontWeight={'400'} color={'#ffffff'} >
            <Flex gridGap={theme.isH5 ? '7px' : '.07rem'} alignItems={'end'}>
              <CorrectIcon />
              <Text>{t(`High yield`)}</Text>
            </Flex>
            <Flex gridGap={theme.isH5 ? '7px' : '.07rem'} alignItems={'end'}>
              <CorrectIcon />
              <Text>{t(`Safety and security`)}</Text>
            </Flex>
            <Flex gridGap={theme.isH5 ? '7px' : '.07rem'} alignItems={'end'}>
              <CorrectIcon />
              <Text>{t(`Low trading threshold`)}</Text>
            </Flex>
          </Flex>
        </FlexColumn>

        <SeMiTabs type="button" >
          <TabPane
            tab={<Text>{t(`Single Currency Stake`)}</Text>}
            itemKey="1"
            style={{ outline: 'none', height: '100%' }}
          >
            <SinglePledge />
          </TabPane>

          <TabPane
            tab={<Text>{t(`Liquidity Stake`)}</Text>}
            itemKey="2"
            style={{ outline: 'none', height: '100%' }}
          >
            <LiquidityPledge />
          </TabPane>
        </SeMiTabs>

      </FlexColumn>
    </Banner>
  </>
}