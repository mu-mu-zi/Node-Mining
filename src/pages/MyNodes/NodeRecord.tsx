import React, { useEffect, useState } from 'react'
import Box, { Typography } from 'components/BaseElement';
import JumpBtn from 'components/Button/BackBtn';
import { Column, ColumnStart } from '../../components/BaseElement/Column';
import { useTranslation } from 'react-i18next';
import { RowCenter, RowStart } from 'components/BaseElement/Row';
import { NodeRecordWrap, MyNode, ActiveNode } from './MyNodes.style';
import Grid from 'components/BaseElement/Grid';
import Normal from 'components/Button/Normal';
import { generateNodeKey, generateNonce, GetNodeKey, getNodeKey, nodeList, NodeListRecords } from 'http/api';
import { useAsync } from 'react-use';
import { useUpdateEffect } from 'ahooks';
import { EmptyStr } from '../../utils/global';
import { awaitWrap, Notice } from 'utils/tools';
import { signString } from 'connectwallet/walletTools';
import { useWeb3React } from '@web3-react/core';
import { MsgStatus } from 'components/messageBox/MessageBox';
import useRedux from 'hooks/useRedux'

export default function NodeRecord() {
  const { t } = useTranslation()

  const [activeNode, setActiveNode] = useState<NodeListRecords>()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [data, setData] = useState<NodeListRecords[]>([])
  const [nodeInfo, setNodeInfo] = useState<GetNodeKey>()
  const { account, provider } = useWeb3React()
  const [reload, setReload] = useState<boolean>(false)
  const {store} = useRedux()
  useAsync(async () => {
    let result = await nodeList({
      pageSize: 100,
      pageIndex: 1
    })
    setData(result.data.records)
    setActiveNode(result.data.records[0])
    console.log(result)
  }, [store.token])

  const getNodeInfo = async () => {
    if (!activeNode) return
    try {

      let result = await getNodeKey(activeNode.id)
      setNodeInfo(result.data)
      console.log(result)
    } catch (e) {
      setNodeInfo({
        apiKey: '',
        apiSecret: ''
      })
    }
  }
  // cover key
  const handleClick = async () => {
    if (!account || !provider || !activeNode) return
    let date = new Date().valueOf()
    try {
      
      // const [nonceInfo, error] = await awaitWrap(generateNonce(account));
      let signStr = JSON.stringify({
        nodeId: activeNode.id,
        timestamp: date,
      })
      const [signData, error] = await awaitWrap(signString(signStr, account, provider.provider));
      if (signData) {
        let result = await generateNodeKey({
          originalData: signStr,
          signature: signData.signatrue
        })
        setReload(!reload)
      } else {
        Notice('Failed to sign', MsgStatus.fail)
      }
    } catch (e) {
      Notice(`${JSON.parse(JSON.stringify(e)).message}`, MsgStatus.fail)
    }
  }


  useUpdateEffect(() => {
    // activeNode
    getNodeInfo()
    console.log(activeNode)
  }, [activeNode, reload])

  return (
    <NodeRecordWrap>
      <Column
        gap=".64rem"
      >
        <RowStart
          width={'100%'}
        >
          <JumpBtn
            text="Back"
            path={-1}
          />
        </RowStart>

        <Grid
          gap={'1.68rem'}
          gridTemplateColumns={'repeat(4,1fr)'}
        >
          {
            data.map((item, index) => {
              return (
                <ActiveNode key={index}
                  onClick={() => {
                    setActiveNode(item);
                    setActiveIndex(index)
                  }}
                >
                  <MyNode className={`${activeIndex === index ? 'node-png-active' : ''} `}>
                    <img src={require('assets/images/Nodes/logo_n.png')} alt="" />
                  </MyNode>
                  <Typography
                    fontSize={'.2rem'}
                    fontWeight={'350'}
                    color={"#fff"}
                    textAlign={'center'}
                  >
                    {t(`Nodes ${item.id}`)}
                  </Typography>
                </ActiveNode>
              )
            })
          }
        </Grid>

        <ColumnStart
          background={"#1A1919"}
          borderRadius={'4px'}
          padding={'.75rem 1.17rem .39rem .24rem'}
          gap={'.59rem'}
          width={'100%'}
          boxSizing={'border-box'}
        >
          <ColumnStart
            gap=".16rem"
          >
            <RowStart
              gap=".48rem"
              color="#fff"
              fontSize=".2rem"
              fontWeight="350"
            >
              <Typography minWidth="1.56rem">{t(`Apikey`)}</Typography>
              <Typography>{nodeInfo?.apiKey || EmptyStr}</Typography>
            </RowStart>
            <RowStart
              gap=".48rem"
              color="#fff"
              fontSize=".2rem"
              fontWeight="350"
            >
              <Typography minWidth="1.56rem">{t(`Cents earnings`)}</Typography>
              <Typography>{nodeInfo?.apiSecret || EmptyStr}</Typography>
            </RowStart>
          </ColumnStart>
          <RowCenter width="100%">
            <Normal
              onClick={handleClick}
            >
              {t(`${nodeInfo?.apiSecret ? "Reset" : "Settings"}`)}
            </Normal>
          </RowCenter>
        </ColumnStart>


      </Column>
    </NodeRecordWrap>
  )
}
