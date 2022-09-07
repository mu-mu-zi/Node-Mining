import Box, { Typography } from 'components/BaseElement'
import { Row, RowStart } from 'components/BaseElement/Row'
import React from 'react'
import { useTranslation } from 'react-i18next';
import Normal from 'components/Button/Normal';
import Grid from 'components/BaseElement/Grid';
import { Column, ColumnStart } from 'components/BaseElement/Column';
import Flex from 'components/BaseElement/Flex';
import {
  Warpper, InviteWarpper, InviteIcon, PartTwo, Title, PartThree, NodesLogo,
  PartFive, LineCut, PartTwoBg
} from './MyNodes.style'
import { getaverseNodes } from './config'
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'react-use';
import { earnings, Earnings, myNode, MyNode } from 'http/api';
import { useEffectState } from 'hooks/useEffectState';
import useRedux from 'hooks/useRedux';
import { EmptyStr } from 'utils/global';
import { Notice } from 'utils/tools';
import { MsgStatus } from 'components/messageBox/MessageBox';
export default function MyNodes() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {store} = useRedux()
  const state = useEffectState({
    earning: {} as Earnings,
    nodes: {} as MyNode,
  });

  const JumpToBuyNodes = () => {
    navigate("/nodes/buy")
  }

  useAsync(async() => {
    if(store.token) {
      const result1 = await earnings()
      const result2 = await myNode()

      state.earning = result1.data
      state.nodes = result2.data
    } else {
      Notice('Please login first', MsgStatus.fail)
    }
  },[store.token])



  return (
    <>
      <Warpper>
        <Row
          justifyContent={'space-between'}
        >
          <Title>
            {t(`My Nodes`)}
          </Title>
          <Normal
            onClick={() => navigate('/mynodes/withdrawingcoins')}
          >
            {t(`WITHDRAW COINS`)}
          </Normal>
        </Row>
        {/* funds */}
        <Grid
          padding={'.48rem .88rem'}
          gridTemplateColumns={'1fr 1fr'}
          background={'#1A1919'}
          borderRadius={'8px'}
          cursor={'pointer'}
          onClick={() => navigate('/mynodes/fundrecords')}
        >
          <Column color={'#fff'}>
            <Typography
              fontSize={".2rem"}
              fontWeight={'350'}
              marginBottom={'.08rem'}
            >
              {t(`GETA`)}
            </Typography>
            <Typography
              fontSize={".6rem"}
              fontWeight={'700'}
              marginBottom={'.32rem'}
            >
              {state.earning.getaTotalFunds ?? EmptyStr}
            </Typography>

            <Flex gap=".6rem">
              <Column gap=".16rem">
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                >{t(`Available `)}</Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                >{state.earning.getaAvailableAmount ?? EmptyStr}</Typography>
              </Column>
              <Column gap=".16rem">
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                >{t(`Freeze  `)}</Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                >{state.earning.getafreezeAmount ?? EmptyStr}</Typography>
              </Column>
            </Flex>


          </Column>
          <Column color={'#fff'}>
            <Typography
              fontSize={".2rem"}
              fontWeight={'350'}
              marginBottom={'.08rem'}
            >
              {t(`USDT`)}
            </Typography>
            <Typography
              fontSize={".6rem"}
              fontWeight={'700'}
              marginBottom={'.32rem'}
            >
              {state.earning.ustdTotalFunds ?? EmptyStr}
            </Typography>

            <Flex gap=".6rem">
              <Column gap=".16rem">
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                >{t(`Available `)}</Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                >{state.earning.ustdAvailableAmount ?? EmptyStr}</Typography>
              </Column>
              <Column gap=".16rem">
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                >{t(`Freeze  `)}</Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                >{state.earning.ustdfreezeAmount ?? EmptyStr}</Typography>
              </Column>
            </Flex>
          </Column>
        </Grid>

        {/* funds Record */}
        <Grid
          padding={'.48rem .88rem'}
          gridTemplateColumns={'1fr 1fr'}
          background={'#1A1919'}
          borderRadius={'8px'}
        >
          <Column color={'#fff'}>
            <Typography
              fontSize={".2rem"}
              fontWeight={'350'}
              marginBottom={'.08rem'}
            >
              {t(`Node revenue (GETA)`)}
            </Typography>
            <Typography
              fontSize={".6rem"}
              fontWeight={'700'}
              marginBottom={'.32rem'}
            >
              {state.nodes.income}
            </Typography>

            <Normal
              onClick={() => navigate('/mynodes/noderevenue')}
            >
              CHECK
            </Normal>


          </Column>

          <Column color={'#fff'}>
            <Typography
              fontSize={".2rem"}
              fontWeight={'350'}
              marginBottom={'.08rem'}
            >
              {t(`Owning Nodes`)}
            </Typography>
            <Typography
              fontSize={".6rem"}
              fontWeight={'700'}
              marginBottom={'.32rem'}
            >
              {state.nodes.myNode}
            </Typography>

            <Normal
              onClick={() => navigate('/mynodes/noderecord')}
            >
              CHECK
            </Normal>


          </Column>


        </Grid>

        <InviteWarpper>
          <Flex>
            <InviteIcon src={require('assets/images/Nodes/invite_icon.png')} />
            <Typography
              fontSize={".22rem"}
              fontWeight={'700'}
              color={'#fff'}
              maxWidth={'2.87rem'}
              marginLeft={'.3rem'}
              textAlign={'center'}
            >
              {t(`Now invite your friends to get GW coins bonus`)}
            </Typography>
          </Flex>

          <Normal
            onClick={() => navigate('/mynodes/invitefriends')}
          >
            {t(`INVITE NOW`)}
          </Normal>
        </InviteWarpper>
      </Warpper>

      <PartTwo>
        <Title
          textAlign={'center'}
        >
          {t(`Getaverse nodes`)}
        </Title>
        <Grid
          gridTemplateColumns={'repeat(4,1fr)'}
          gap=".4rem"
          marginTop=".48rem"
        >
          {
            getaverseNodes && getaverseNodes.map(item => {
              return <Column gap='.16rem' key={item.title}>
                <img src={item.icon} alt="" />
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                  color={'#fff'}
                >
                  {t(`${item.title}`)}
                </Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                  color={'#fff'}
                >
                  {t(`${item.text}`)}
                </Typography>
              </Column>
            })
          }
        </Grid>
      </PartTwo>

      {/* assets/images/Home/index_part_seven_1.png */}
      <PartThree>
        <LineCut
          justifyContent="center"
          gap=".5rem"
        >
          <NodesLogo src={require('assets/svg/logo_node.svg').default} />
          <ColumnStart
            gap=".24rem"
            color="#fff"
          >
            <Title>
              {t(`Getaverse nodes`)}
            </Title>
            <Typography
              fontSize={'.2rem'}
              fontWeight={'400'}
              maxWidth={'7.43rem'}
            >
              {t(`The GW network is supported by users like you who run GW nodes on their own devices. By purchasing a GW node license, you have the opportunity to be rewarded for your contributions to the network. This includes GW, Limited Edition NFT, and the opportunity to help grow the GameWonderlab ecosystem.`)}
            </Typography>

            <Normal
              onClick={() => { JumpToBuyNodes() }}
            >
              {t(`PURCHASE NODE`)}
            </Normal>

          </ColumnStart>
        </LineCut>

      </PartThree>

      <PartFive>
        <Title
          textAlign={'center'}
          marginBottom={'.52rem'}
        >
          {t(`Node Software`)}
        </Title>
        <Column gap='.32rem'>
          <Typography
            color={'#F6B91B'}
            fontSize={'.28rem'}
            fontWeight={'400'}
          >
            Ubuntu20.04
          </Typography>
          <a
            download={'uses documents'}
            href={require('assets/usesDocuments.pdf')}
            target="_blank"
            style={{
              textDecoration: 'none'
            }}
          >
            <Box
              width={'1.45rem'}
              height={'1.45rem'}
              background={'#D9D9D9'}
              borderRadius={'8px'}
            />
          </a>
          <a
            download={'getaverse-node-v1.0'}
            href={'https://getaverses.s3.ap-southeast-1.amazonaws.com/node/getaverse-node-v2.0.tar.gz'}
            // target="_blank"
            style={{
              textDecoration: 'none'
            }}
          >
            <Normal>
              {t(`DOWNLOAD`)}
            </Normal>
          </a>

        </Column>
      </PartFive>

    </>
  )
}