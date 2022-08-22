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
export default function MyNodes() {
  const { t } = useTranslation()




  return (
    <>
      <Warpper>
        <Row
          justifyContent={'space-between'}
        >
          <Title>
            {t(`My Nodes`)}
          </Title>
          <Normal>
            {t(`WITHDRAW COINS`)}
          </Normal>
        </Row>
        {/* funds */}
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
              {t(`GETA`)}
            </Typography>
            <Typography
              fontSize={".6rem"}
              fontWeight={'700'}
              marginBottom={'.32rem'}
            >
              645.23
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
                >600</Typography>
              </Column>
              <Column gap=".16rem">
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                >{t(`Freeze  `)}</Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                >45.23</Typography>
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
              645.23
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
                >600</Typography>
              </Column>
              <Column gap=".16rem">
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                >{t(`Freeze  `)}</Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                >45.23</Typography>
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
              328.428
            </Typography>

            <Normal>
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
              2
            </Typography>

            <Normal>
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

          <Normal>
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

            <Normal>
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
            color={'#fff'}
            fontSize={'.28rem'}
            fontWeight={'400'}
          >
            Ubuntu20.04
          </Typography>

          <Box
            width={'1.45rem'}
            height={'1.45rem'}
            background={'#D9D9D9'}
            borderRadius={'8px'}
          />

          <Normal>
            {t(`DOWNLOAD`)}
          </Normal>

        </Column>
      </PartFive>

    </>
  )
}