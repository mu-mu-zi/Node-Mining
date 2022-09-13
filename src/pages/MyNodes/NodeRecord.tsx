import React, { useContext, useEffect, useState } from 'react'
import Box, { Typography } from 'components/BaseElement';
import JumpBtn from 'components/Button/BackBtn';
import { Column, ColumnStart } from '../../components/BaseElement/Column';
import { useTranslation } from 'react-i18next';
import { Row, RowCenter, RowStart } from 'components/BaseElement/Row';
import { NodeRecordWrap, MyNode, ActiveNode, PopoverInvite } from './MyNodes.style';
import Grid from 'components/BaseElement/Grid';
import Normal from 'components/Button/Normal';
import { generateNodeKey, generateNonce, GetNodeKey, getNodeKey, nodeList, NodeListRecords } from 'http/api';
import { useAsync } from 'react-use';
import { useUpdateEffect } from 'ahooks';
import { EmptyStr } from '../../utils/global';
import { awaitWrap, formatAddress, Notice } from 'utils/tools';
import { signString } from 'connectwallet/walletTools';
import { useWeb3React } from '@web3-react/core';
import { MsgStatus } from 'components/messageBox/MessageBox';
import useRedux from 'hooks/useRedux'
import CopyTypography from 'components/CopyTypography';
import { Popover } from '@douyinfe/semi-ui';
import { Icon } from 'components/BaseElement/Icon';
import { ModalContext } from 'components/provider/ModalProvider';
import ApisecretModal from 'components/ApisecretModal/ApisecretModal';
import useTheme from 'hooks/useTheme';


export default function NodeRecord() {
  const { t } = useTranslation()

  const [activeNode, setActiveNode] = useState<NodeListRecords>()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [data, setData] = useState<NodeListRecords[]>([])
  const [nodeInfo, setNodeInfo] = useState<GetNodeKey>()
  const { account, provider } = useWeb3React()
  const [reload, setReload] = useState<boolean>(false)
  const { openModal } = useContext(ModalContext);
  const { theme } = useTheme()
  const { store } = useRedux()
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
        openModal(ApisecretModal,{
          apisecret: result.data.apiSecret,
          name: activeNode.id,
        })
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
        gap={theme.isH5 ? '16px' : ".64rem"}
      >
        <RowStart
          width={'100%'}
          marginBottom={theme.isH5 ? '40px' : ''}
        >
          <JumpBtn
            text="Back"
            path={-1}
          />
        </RowStart>

        <Grid
          width={'100%'}
          overflowX={theme.isH5 ? 'scroll' : 'unset'}
          
          gap={theme.isH5 ? '32px' : '.3rem 1.2rem'}
          gridTemplateColumns={theme.isH5 ? `repeat(${data.length},1fr)` : 'repeat(5,1fr)'}
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
                    <img 
                      style={{
                        width: theme.isH5 ? '64px' : 'initial',
                        height: theme.isH5 ? '64px' : 'initial',
                      }}
                      src={require('assets/images/Nodes/logo_n.png')} alt="" />
                  </MyNode>
                  <Typography
                    fontSize={theme.isH5 ? '12px' : '.2rem'}
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
          padding={theme.isH5 ? '16px 24px 20px' : '.75rem 1.17rem .39rem .24rem'}
          gap={theme.isH5 ? '24px' : '.59rem'}
          width={'100%'}
          boxSizing={'border-box'}
        >
          <ColumnStart
            gap={theme.isH5 ? '16px' : ".16rem"}
          >
            <RowStart
              gap={theme.isH5 ? '48px' : ".48rem"}
              color="#fff"
              fontSize={theme.isH5 ? '12px' : ".2rem"}
              fontStyle={'italic'}
              fontWeight="350"
            >
              <Typography minWidth={theme.isH5 ? '88px' : "1.56rem"}>{t(`Apikey`)}</Typography>
              <Typography>{<CopyTypography>{theme.isH5 ? formatAddress(nodeInfo?.apiKey || '') : nodeInfo?.apiKey}</CopyTypography> || EmptyStr}</Typography>
            </RowStart>
            <Row
              gap={theme.isH5 ? '48px' : ".48rem"}
              color="#fff"
              fontSize={theme.isH5 ? '12px' : ".2rem"}
              fontWeight="350"
            >
              <Typography minWidth={theme.isH5 ? '88px' : "1.56rem"}>{t(`Cents earnings`)}</Typography>
              <Row gap='8px'>
                <Typography>{formatAddress(nodeInfo?.apiSecret || EmptyStr)}</Typography>
                <Popover
                  position='top'
                  style={{ marginBottom: '10px' }}
                  content={<PopoverInvite
                    width={theme.isH5 ? '150px' : '2.4rem'}
                    padding={theme.isH5 ? '10px' : '.1rem'}
                    background={'#3D3D3D'}
                    borderRadius={'4px'}
                    color={'#ffffff'}
                    fontSize={theme.isH5 ? '12px' : '.12rem'}
                    fontWeight={400}
                  >
                    <Typography>{t(`import the node public-private key pair, you can successfully run the node to get the cents revenue`)}</Typography>
                  </PopoverInvite>}
                >
                  <Icon src={require('assets/svg/icon_question.svg').default} alt="" />
                </Popover>

              </Row>

            </Row>
          </ColumnStart>
          <RowCenter width="100%">
            <Normal
              onClick={handleClick}
            >
              {t(`${nodeInfo?.apiSecret ? "RESET" : "SETTINGS"}`)}
            </Normal>
          </RowCenter>
        </ColumnStart>


      </Column>
    </NodeRecordWrap>
  )
}
