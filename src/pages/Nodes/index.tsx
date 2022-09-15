import { Row, RowCenter } from 'components/BaseElement/Row'
import React from 'react'
import { Banner, Content, RowCard, Title } from './Nodes.style'
import { useTranslation } from 'react-i18next';
import Box, { Typography } from 'components/BaseElement';
import { EaseBtn } from 'components/Button';
import { Column, ColumnStart } from 'components/BaseElement/Column';
import Flex from 'components/BaseElement/Flex';
import { Z_INDEX } from 'utils/global';
import { Image } from 'pages/Home/Home.styled'
import Grid from 'components/BaseElement/Grid';
import Collapse from 'components/Collapse/Collapse';
import { useNavigate } from 'react-router-dom';
import useTheme from 'hooks/useTheme'
import Normal from 'components/Button/Normal';

export default function Index() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const JumpToBuyNodes = () => {
    navigate("/nodes/buy")
  }
  return (
    <>
      <Banner>
        <Typography
          fontSize={theme.isH5 ? "20px" : '.3rem'}
          fontWeight={'400'}
          color={'#fff'}
          marginBottom={'60px'}
          maxWidth={theme.isH5 ? "100%" : "984px"}
          margin={theme.isH5 ? "0 61.5px 16px" : '0 0 60px'}
          textAlign={'center'}
        >
          {t(`Decentralized network by providing computing resources`)}
        </Typography>

        <Normal
          onClick={() => {console.log('click');JumpToBuyNodes()}}
        >
          {t(`PURCHASE NODE`)}
        </Normal>
      </Banner>

      <Content>
        <Flex
          gap={theme.isH5 ? "8px" : '43px'}
          flexDirection={theme.isH5 ? 'column' : 'row'}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={theme.isH5 ? "24px" : '.6rem'}
        >
          <img
            style={{
              width: theme.isH5 ? "44px" : "",
              height: theme.isH5 ? "44px" : "",
            }}
            src={require('assets/images/Metaverse/meta_five_1.png')} alt="" />
          <ColumnStart
            textAlign={theme.isH5 ? "center" : 'start'}
            
          >
            <Typography
              fontSize={theme.isH5 ? "11px" : "14px"}
              fontWeight="400"
              color="#ffffff"
              width={'100%'}
            >
              {t(`DECENTRALIZED ECOSYSTEM`)}
            </Typography>
            <Typography
              width={'100%'}
              fontSize={theme.isH5 ? "18px" : "36px"}
              fontWeight="700"
              color="#ffffff"
              margin={theme.isH5 ? "8px 0 8px" : '11px 0 14px'}
            >
              {t(`Supported by the user's node community `)}
            </Typography>

            <Typography
              width={'100%'}
              fontSize={theme.isH5 ? "11px" : "20px"}
              fontWeight="400"
              color="#ffffff"
            >
              {t(`Getaverse is supported by a network of user-run nodes. Use your computer to become a node operator and receive rewards and benefits for your contributions to the ecosystem.`)}
            </Typography>
          </ColumnStart>
        </Flex>

        <Box
          position={'absolute'}
          left={'0'}
          width={'100%'}
          minWidth={theme.isH5 ? "100%" : '1300px'}
          zIndex={Z_INDEX.index_vision}

        >
          <Image
            style={{ width: '100%' }} src={theme.isH5 ? require('assets/images/Nodes/nodes_part_four_1_h5.png') : require('assets/svg/index_part_four_1.svg').default} alt="" />
        </Box>

        <Box
          marginTop={theme.isH5 ? "112px" : '3rem'}
        >
          <Title
            marginBottom={theme.isH5 ? "32px" : ""}
          >
            {t(`Rewards for Node Owners`)}
          </Title>
          <Grid
            gridTemplateColumns={theme.isH5 ? "1fr" : 'repeat(3,1fr)'}
            gap={'16px'}
          >

            <RowCard>
              <Image
                style={{
                  width: theme.isH5 ? "44px" : "",
                  height: theme.isH5 ? "44px" : "",
                }}
                src={require('assets/images/Nodes/reward_1.png')} alt='' />
              <Typography
                fontWeight='400'
                fontSize={theme.isH5 ? "14px" : '28px'}
                color='#F6B91B'
                textAlign={'center'}
                margin={theme.isH5 ? "8px 0" : '32px 0 '}
              >
                {t(`DAILY GETAVERSE TOKEN REWARDS`)}
              </Typography>
              <Typography
                fontWeight='350'
                fontSize={theme.isH5 ? "11px" : '22px'}
                color='#ffffff'
                fontStyle={"italic"}
                textAlign={'center'}
              >
                {t(`The Getaverse node owners will be rewarded with GETA tokens by operating their Getaverse nodes.`)}
              </Typography>
            </RowCard>
            <RowCard>
              <Image 
                style={{
                  width: theme.isH5 ? "44px" : "",
                  height: theme.isH5 ? "44px" : "",
                }}
                src={require('assets/images/Nodes/reward_2.png')} alt='' />
              <Typography
                fontWeight='400'
                fontSize={theme.isH5 ? "14px" : '28px'}
                color='#F6B91B'
                textAlign={'center'}
                margin={theme.isH5 ? "8px 0" : '32px 0 '}
              >
                {t(`VOTING RIGHTS`)}
              </Typography>
              <Typography
                fontWeight='350'
                fontSize={theme.isH5 ? "11px" : '22px'}
                color='#ffffff'
                textAlign={'center'}
              >
                {t(`Each node will be able to vote on proposed changes to the Getaverse, and the node owners will also have greater voting power throughout the Getaverse.`)}
              </Typography>
            </RowCard>
            <RowCard>
              <Image 
                style={{
                  width: theme.isH5 ? "44px" : "",
                  height: theme.isH5 ? "44px" : "",
                }}
                src={require('assets/images/Nodes/reward_3.png')} alt='' />
              <Typography
                fontWeight='400'
                fontSize={theme.isH5 ? "14px" : '28px'}
                color='#F6B91B'
                textAlign={'center'}
                margin={theme.isH5 ? "8px 0" : '32px 0 '}
              >
                {t(`EXCLUSIVE REWARDS`)}
              </Typography>
              <Typography
                fontWeight='350'
                fontSize={theme.isH5 ? "11px" : '22px'}
                color='#ffffff'
                textAlign={'center'}
              >
                {t(`The node owners will also receive NFT drops and token rewards based on their reputation score as a node owner and general community member.`)}
              </Typography>
            </RowCard>
          </Grid>
        </Box>

        <Box
          marginTop={'1.56rem'}
        >
          <Title
            margin={theme.isH5 ? "51px 0" : ""}
          >
            {t(`Frequently Asked Questions`)}
          </Title>
          <Column
            marginTop={'.8rem'}
            gap={'.3rem'}
          >
    
            <Collapse title={'What is a Getaverse node?'}>
              <Typography>
                {t(`Getaverse nodes are required in order to run any blockchain, including the BSC chain, to validate network transactions.`)}
              </Typography>
              <Typography>
                {t(`Nodes in the Getaverse ecosystem will be used for a variety of network support activities, including initial testing of the network, block production, and validation.`)}
              </Typography>
              <Typography>
                {t(`Everyone running a Getaverse node is contributing to the growth of this decentralized gaming network. By running Getaverse nodes, you are working to provide players with true ownership of their assets and content.`)}
              </Typography>

            </Collapse>

            <Collapse title={'How many Getaverse nodes are there in total?'}>
              <Typography>{t(`There are a total of 50,000 Getaverse nodes.`)}</Typography>
            </Collapse>
            <Collapse title={'What rewards will Getaverse node operators receive?'}>
              <Typography>{t(`Getaverse node operators will be rewarded with tokens for daily Getaverse node work. Node owners will also receive NFT drops and token rewards based on their reputation score as a node operator and general community member.`)}</Typography>
            </Collapse>
            <Collapse title={'What are the software and hardware requirements to run the node?'}>
              <Typography>{t(`Getaverse nodes will be available for download on Windows, Mac and Linux. Our node operations are not as resource intensive as traditional cryptocurrency mining. You will be able to run our node software from your home computer, meeting the following minimum requirements. `)}</Typography>
              <Typography>{t(`4 GB RAM`)}</Typography>
              <Typography>{t(`2 CPU cores`)}</Typography>
              <Typography>{t(`60 GB of disk space`)}</Typography>
              <Typography>{t(`x86/x64 processor`)}</Typography>
              <Typography>{t(`Stable Internet connection`)}</Typography>
            </Collapse>
            <Collapse title={'Can multiple nodes run on a single computer?'}>
              <Typography>{t(`No. When a person purchases multiple licenses and operates Getaverse software, they need to have the same number of available computers as they have licenses. There is a one computer per node type requirement to help run the network and receive rewards.`)}</Typography>
            </Collapse>
          </Column>
        </Box>

      </Content>
    </>
  )
}