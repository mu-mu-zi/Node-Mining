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

export default function Index() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const JumpToBuyNodes = () => {
    navigate("/nodes/buy")
  }
  return (
    <>
      <Banner>

        <Typography
          fontSize={'.2rem'}
          fontWeight={'400'}
          color={'#fff'}
          marginBottom={'60px'}
        >
          {t(`Decentralized network by providing computing resources`)}
        </Typography>

        <EaseBtn
          onClick={() => {console.log('click');JumpToBuyNodes()}}
        >
          {t(`PURCHASE NODE`)}
        </EaseBtn>

      </Banner>
      <Content>
        <Flex
          gap={'43px'}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={'.6rem'}
        >
          <img src={require('assets/svg/Metaverse/meta_five_1.svg').default} alt="" />
          <ColumnStart>
            <Typography
              fontSize="14px"
              fontWeight="400"
              color="#ffffff"
            >
              {t(`DECENTRALIZED ECOSYSTEM`)}
            </Typography>
            <Typography
              fontSize="36px"
              fontWeight="700"
              color="#ffffff"
              margin={'11px 0 14px'}
            >
              {t(`Supported by the user's node community `)}
            </Typography>

            <Typography
              fontSize="20px"
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
          minWidth={'1300px'}
          zIndex={Z_INDEX.index_vision}

        >
          <Image
            style={{ width: '100%' }} src={require('assets/svg/index_part_four_1.svg').default} alt="" />
        </Box>

        <Box
          marginTop={'3rem'}
        >
          <Title>
            {t(`Node Owner Rewards`)}
          </Title>
          <Grid
            gridTemplateColumns={'repeat(3,1fr)'}
            gap={'16px'}
          >

            <RowCard>
              <Image src={require('assets/images/Nodes/reward_1.png')} alt='' />
              <Typography
                fontWeight='400'
                fontSize='28px'
                color='#F6B91B'
                textAlign={'center'}
                margin={'32px 0 '}
              >
                {t(`DAILY GETAVERSE TOKEN REWARDS`)}
              </Typography>
              <Typography
                fontWeight='350'
                fontSize='22px'
                color='#ffffff'
                textAlign={'center'}
              >
                {t(`Getaverse operators will be rewarded with tokens for daily Getaverse node work.`)}
              </Typography>
            </RowCard>
            <RowCard>
              <Image src={require('assets/images/Nodes/reward_2.png')} alt='' />
              <Typography
                fontWeight='400'
                fontSize='28px'
                color='#F6B91B'
                textAlign={'center'}
                margin={'32px 0 '}
              >
                {t(`VOTING RIGHTS`)}
              </Typography>
              <Typography
                fontWeight='350'
                fontSize='22px'
                color='#ffffff'
                textAlign={'center'}
              >
                {t(`Each node will be able to vote on proposed changes to the Getaverse, and nodes will also have greater voting power throughout the Getaverse.`)}
              </Typography>
            </RowCard>
            <RowCard>
              <Image src={require('assets/images/Nodes/reward_3.png')} alt='' />
              <Typography
                fontWeight='400'
                fontSize='28px'
                color='#F6B91B'
                textAlign={'center'}
                margin={'32px 0 '}
              >
                {t(`EXCLUSIVE NON-PROPRIETARY TECHNOLOGY`)}
              </Typography>
              <Typography
                fontWeight='350'
                fontSize='22px'
                color='#ffffff'
                textAlign={'center'}
              >
                {t(`Node owners will also receive NFT drops and token rewards based on their reputation score as a node operator and general community member.`)}
              </Typography>
            </RowCard>
          </Grid>
        </Box>

        <Box
          marginTop={'1.56rem'}
        >
          <Title>
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
            </Collapse>
            <Collapse title={'What rewards will Getaverse node operators receive?'}>
            </Collapse>
            <Collapse title={'What are the software and hardware requirements to run the node?'}>
            </Collapse>
            <Collapse title={'Can multiple nodes run on a single computer?'}>
            </Collapse>
          </Column>
        </Box>

      </Content>
    </>
  )
}