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
  PartFive, LineCut, PartTwoBg, WithdrawCoinsH5
} from './MyNodes.style'
import { getaverseNodes } from './config'
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'react-use';
import { earnings, Earnings, myNode, MyNode, totalNodes, TotalNodes } from 'http/api';
import { useEffectState } from 'hooks/useEffectState';
import useRedux from 'hooks/useRedux';
import { EmptyStr } from 'utils/global';
import { Notice } from 'utils/tools';
import { MsgStatus } from 'components/messageBox/MessageBox';
import useTheme from '../../hooks/useTheme';
import { Icon } from 'components/BaseElement/Icon';

export default function MyNodes() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { store } = useRedux()
  const { theme } = useTheme()
  const state = useEffectState({
    earning: {} as Earnings,
    nodes: {} as MyNode,
    totalNodes: {} as any
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

  useAsync( async() => {
    if(store.token) {
      let result = await totalNodes()
      state.totalNodes = result.data
    }
  },[store.token])



  return (
    <>
      <WithdrawCoinsH5>
        <Normal
          name={store.token ? '' : 'disabled'}
          onClick={() => navigate('/mynodes/withdrawingcoins')}
        >
          {t(`WITHDRAW`)}
        </Normal>
      </WithdrawCoinsH5>

      <Warpper>
        <Row
          justifyContent={ theme.isH5 ? 'center' : 'space-between'}
        >
          <Title>
            {t(`My Node`)}
          </Title>
          <Normal
            name={store.token ? '' : 'disabled'}
            style={{
              display: theme.isH5 ? 'none' : 'block'
            }}
            onClick={() => navigate('/mynodes/withdrawingcoins')}
          >
            {t(`WITHDRAW`)}
          </Normal>
        </Row>
        {/* funds */}
        <Grid
          padding={theme.isH5 ? '12.5px 0' : '.48rem .88rem'}
          gridTemplateColumns={theme.isH5 ? '1fr' : '1fr 1fr'}
          background={'#1A1919'}
          borderRadius={'8px'}
          cursor={'pointer'}
          onClick={() => navigate('/mynodes/fundrecords')}
          gap={theme.isH5 ? '32px' : ""}
        >
          <Column color={'#fff'}>
            <Typography
              fontSize={theme.isH5 ? '12px' : ".2rem"}
              fontWeight={'350'}
              marginBottom={theme.isH5 ? '8px' : '.08rem'}
              fontStyle={'italic'}
            >
              {t(`GETA`)}
            </Typography>
            <Typography
              fontSize={theme.isH5 ? '20px' : ".6rem"}
              fontWeight={'700'}
              marginBottom={theme.isH5 ? '8px' : '.32rem'}
            >
              {state.earning.getaTotalFunds ?? EmptyStr}
            </Typography>

            <Flex gap={theme.isH5 ? '60px' : ".6rem"}>
              <Column gap={theme.isH5 ? '8px' : ".16rem"}>
                <Typography
                  fontSize={theme.isH5 ? '12px' : ".2rem"}
                  fontWeight={'350'}
                  fontStyle={'italic'}
                >{t(`Available `)}</Typography>
                <Typography
                  fontSize={theme.isH5 ? '14px' : ".2rem"}
                  fontWeight={'700'}
                >{state.earning.getaAvailableAmount ?? EmptyStr}</Typography>
              </Column>
              <Column gap={theme.isH5 ? '8px' : ".16rem"}>
                <Typography
                  fontSize={theme.isH5 ? '12px' : ".2rem"}
                  fontWeight={'350'}
                  fontStyle={'italic'}
                >{t(`Freeze  `)}</Typography>
                <Typography
                  fontSize={theme.isH5 ? '14px' : ".2rem"}
                  fontWeight={'700'}
                >{state.earning.getafreezeAmount ?? EmptyStr}</Typography>
              </Column>
            </Flex>


          </Column>
          <Column color={'#fff'}>
            <Typography
              fontSize={theme.isH5 ? '12px' : ".2rem"}
              fontWeight={'350'}
              marginBottom={theme.isH5 ? '8px' : '.08rem'}
              fontStyle={'italic'}
            >
              {t(`USDT`)}
            </Typography>
            <Typography
              fontSize={theme.isH5 ? '14px' : ".6rem"}
              fontWeight={'700'}
              marginBottom={theme.isH5 ? '8px' : '.32rem'}
            >
              {state.earning.ustdTotalFunds ?? EmptyStr}
            </Typography>

            <Flex gap={theme.isH5 ? '60px' : ".6rem"}>
              <Column gap={theme.isH5 ? '8px' : ".16rem"}>
                <Typography
                  fontSize={theme.isH5 ? '12px' : ".2rem"}
                  fontWeight={'350'}
                  fontStyle={'italic'}
                >{t(`Available `)}</Typography>
                <Typography
                  fontSize={theme.isH5 ? '14px' : ".2rem"}
                  fontWeight={'700'}
                >{state.earning.ustdAvailableAmount ?? EmptyStr}</Typography>
              </Column>
              <Column gap={theme.isH5 ? '8px' : ".16rem"}>
                <Typography
                  fontSize={theme.isH5 ? '12px' : ".2rem"}
                  fontWeight={'350'}
                  fontStyle={'italic'}
                >{t(`Freeze  `)}</Typography>
                <Typography
                  fontSize={theme.isH5 ? '14px' : ".2rem"}
                  fontWeight={'700'}
                >{state.earning.ustdfreezeAmount ?? EmptyStr}</Typography>
              </Column>
            </Flex>
          </Column>
        </Grid>

        {/* funds Record */}
        <Grid
          padding={theme.isH5 ? '12.5px 0' : '.48rem .88rem'}
          gridTemplateColumns={theme.isH5 ? '1fr' : '1fr 1fr'}
          background={'#1A1919'}
          borderRadius={'8px'}
          gap={theme.isH5 ? '32px' : ""}
        >
          <Column color={'#fff'}>
            <Typography
              fontSize={theme.isH5 ? '12px' : ".2rem"}
              fontWeight={'350'}
              marginBottom={theme.isH5 ? '8px' : '.08rem'}
              fontStyle={'italic'}
            >
              {t(`Node Revenue (GETA)`)}
            </Typography>
            <Typography
              fontSize={theme.isH5 ? '14px' : ".6rem"}
              fontWeight={'700'}
              marginBottom={theme.isH5 ? '16px' : '.32rem'}
            >
              {state.nodes.income ?? EmptyStr}
            </Typography>

            <Normal
              style={{
                display: state.nodes.income ? "block" : "none"
              }}
              onClick={() => navigate('/mynodes/noderevenue')}
            >
              CHECK
            </Normal>


          </Column>

          <Column color={'#fff'}>
            <Typography
              fontSize={theme.isH5 ? '12px' : ".2rem"}
              fontWeight={'350'}
              marginBottom={theme.isH5 ? '5px' : '.08rem'}
              fontStyle={'italic'}
            >
              {t(`Owning Nodes`)}
            </Typography>
            <Typography
              fontSize={theme.isH5 ? '14px' : ".6rem"}
              fontWeight={'700'}
              marginBottom={theme.isH5 ? '16px' : '.32rem'}
            >
              {state.nodes.myNode ?? EmptyStr}
            </Typography>

            <Normal
              style={{
                display: state.nodes.income ? "block" : "none"
              }}
              onClick={() => navigate('/mynodes/noderecord')}
            >
              CHECK
            </Normal>


          </Column>


        </Grid>

        <InviteWarpper>
          <Flex
            alignItems={'center'}
          >
            <InviteIcon src={require('assets/images/Nodes/invite_icon.png')} />
            <Typography
              fontSize={theme.isH5 ? '12px' : ".22rem"}
              fontWeight={'700'}
              color={'#fff'}
              maxWidth={theme.isH5 ? '165px' : '2.87rem'}
              marginLeft={theme.isH5 ? '30px' : '.3rem'}
              textAlign={'center'}
            >
              {t(`Now invite your friends to get GETA Tokens`)}
            </Typography>
          </Flex>

          <Normal
            onClick={() => navigate('/mynodes/invitefriends')}
            style={{
              margin: theme.isH5 ? '16px auto 0' : '' 
            }}
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
          gridTemplateColumns={theme.isH5 ? 'repeat(2,1fr)' : 'repeat(4,1fr)'}
          gap={theme.isH5 ? '16px 8px' : ".4rem"}
          marginTop={theme.isH5 ? '16px' : ".48rem"}
        >
          {
            getaverseNodes && getaverseNodes.map(item => {
              return <Column gap={theme.isH5 ? "16px" : '.16rem'} key={item.title}>
                <img 
                  style={{
                    width: theme.isH5 ? "48.5px" : "",
                    height: theme.isH5 ? "44px" : "",
                  }}
                  src={item.icon} alt="" />
                <Typography
                  fontSize={theme.isH5 ? "12px" : ".2rem"}
                  fontWeight={'350'}
                  color={'#fff'}
                  fontStyle={'italic'}
                >
                  {t(`${item.title}`)}
                </Typography>
                <Typography
                  fontSize={theme.isH5 ? "14px" : ".2rem"}
                  fontWeight={'700'}
                  color={'#fff'}
                >
                  {t(`${state.totalNodes[item.attr] ?? EmptyStr}`)}
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
            gap={theme.isH5 ? "8px" : ".24rem"}
            color="#fff"
          >
            <Title
              style={{
                margin: theme.isH5 ? "auto" : ""
              }}
            >
              {t(`Getaverse nodes`)}
            </Title>
            <Typography
              fontSize={theme.isH5 ? "12px" : '.2rem'}
              fontWeight={'400'}
              maxWidth={theme.isH5 ? "302px" : '7.43rem'}
              textAlign={theme.isH5 ? "center" : 'left'}
            >
              {t(`The Getaverse network is supported by users like you who run Getaverse nodes on their own devices. By purchasing a Getaverse node license, you have the opportunity to be rewarded for your contributions to the network. This includes GETA, Limited Edition NFT, and the opportunity to help grow the GameWonderlab ecosystem.`)}
            </Typography>

            <Normal
              style={{
                margin: theme.isH5 ? "auto" : ""
              }}
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
          marginBottom={theme.isH5 ? "16px" : '.52rem'}
        >
          {t(`Node Software`)}
        </Title>
        <Column gap={theme.isH5 ? "16px" : '.32rem'}>
          <Typography
            color={'#ffffff'}
            fontSize={theme.isH5 ? "14px" : '.28rem'}
            fontWeight={'400'}
          >
            Ubuntu20.04
          </Typography>
        
            <Icon
              display={'block'}
              width={theme.isH5 ? "80px" : '1.45rem'}
              height={theme.isH5 ? "80px" : '1.45rem'}
              background={'#D9D9D9'}
              borderRadius={'8px'}
              src={require('assets/images/img_ubuntu.png')}
            />

          <Typography
            color={'#ffffff'}
            fontSize={theme.isH5 ? "12px" : '.20rem'}
            fontWeight={'400'}
          >
            (Click 
            <a
              download={'GetaverseMiningProgramUsesDocuments'}
              href={require('assets/GetaverseMiningProgramUsesDocuments.pdf')}
              target="_blank"
              style={{

                color: "#F6B91B"
              }}
            > Ubuntu 20.04 </a>
             to download instructions)
          </Typography>

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