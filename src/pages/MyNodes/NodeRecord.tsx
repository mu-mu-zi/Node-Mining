import React, { useEffect, useState } from 'react'
import Box, { Typography } from 'components/BaseElement';
import JumpBtn from 'components/Button/BackBtn';
import { Column, ColumnStart } from '../../components/BaseElement/Column';
import { useTranslation } from 'react-i18next';
import { RowCenter, RowStart } from 'components/BaseElement/Row';
import { NodeRecordWrap, MyNode, ActiveNode } from './MyNodes.style';
import Grid from 'components/BaseElement/Grid';
import Normal from 'components/Button/Normal';
import { GetNodeKey, getNodeKey, nodeList, NodeListRecords } from 'http/api';
import { useAsync } from 'react-use';
import { useUpdateEffect } from 'ahooks';
import { EmptyStr } from '../../utils/global';


export default function NodeRecord() {
  const { t } = useTranslation()

  const [activeNode, setActiveNode] = useState<NodeListRecords>()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [data, setData] = useState<NodeListRecords[]>([])
  const [nodeInfo, setNodeInfo] = useState<GetNodeKey>()

  useAsync(async () => {
    let result = await nodeList({
      pageSize: 100,
      pageIndex: 1
    })
    setData(result.data.records)
    setActiveNode(result.data.records[0])
    console.log(result)
  },[])

  const getNodeInfo = async() => {
    if(!activeNode) return
    let result = await getNodeKey(activeNode.id)
    setNodeInfo(result.data)
    console.log(result)
  }

  useUpdateEffect( () => {
    // activeNode
    getNodeInfo()
    console.log(activeNode)
  },[activeNode])

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
            data.map((item,index) => {
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
                    {t(`Nodes 01`)}
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
              <Typography>{nodeInfo?.apiKey ?? EmptyStr}</Typography>
            </RowStart>
            <RowStart 
              gap=".48rem" 
              color="#fff"
              fontSize=".2rem"
              fontWeight="350"
            >
              <Typography minWidth="1.56rem">{t(`Cents earnings`)}</Typography>
              <Typography>{nodeInfo?.apiSecret ?? EmptyStr}</Typography>
            </RowStart>
          </ColumnStart>
          <RowCenter width="100%">
            <Normal>
              {t(`Settings`)}
            </Normal>
          </RowCenter>
        </ColumnStart>
        

      </Column>
    </NodeRecordWrap>
  )
}
