import React, { useState } from 'react'
import Box, { Typography } from 'components/BaseElement'
import { Column, ColumnStart } from 'components/BaseElement/Column'
import Flex from 'components/BaseElement/Flex'
import Grid from 'components/BaseElement/Grid'
import { Row, RowCenter } from 'components/BaseElement/Row'
import { useTranslation } from 'react-i18next'
// import { Animate } from 'react-simple-animate'
import {
  Banner, Describe, FlyNode, IconLinks, PartTwo, Display, DisplayVision, Vision,
  PartThree, CardWrapper, Card, CardBg, PartFour, NodeBtn, PartFive, PartnersBg,
  PartSix, EmailIpt, Image, ImageHover, LineCut, CoreTeamImg, Roadmap,
  CoreTeamId, RoadmapHover, RoadmapImg
} from './Home.styled'
import { Z_INDEX } from 'utils/global'
import { Title } from 'pages/Digital/Digital.styled'
import useTheme from 'hooks/useTheme'
import { useNavigate } from 'react-router-dom';
import { getBanners } from 'http/api'
import { useAsync } from 'react-use'
import { filterBanner } from 'utils/tools'
import { submitEmail } from 'http/api';
import { Notice, isEmail } from 'utils/tools';
import { MsgStatus } from 'components/messageBox/MessageBox';

export default function Home() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [banner, setBanner] = useState<string>('')
  useAsync( async() => {
    let result = await getBanners()
    let banners = filterBanner(result.data, 1)
    setBanner(banners[0].image)
  },[])
  const [email, setEmail] = useState<string>('')

  const FnSubmit = async () => {
    if(!isEmail(email)){
      Notice('Please enter the correct email address', MsgStatus.fail)
      return
    }
    try{

      let result = await submitEmail(email)
      console.log(result)
      if(result.data) {
        setEmail('')
        Notice('success', MsgStatus.success)
      }
    }catch(e) {
      console.log(e)
    }
  }

  const Advantages = [
    {
      icon: theme.isH5 ? require('assets/svg/index_part_five_1_h5.svg').default : require('assets/svg/index_part_five_1.svg').default,
      title: t(`A unified identity platform based on Soulbound Tokens (SBT)`),
      text: t(`Getaverse will build a unified decentralized platform based on Soulbound Tokens to establish a Web3.0 personal data value system, which utilized the Getaverse Credit Score system and changed the system of Web 3.0 personal data value.`)
    },
    {
      icon: theme.isH5 ? require('assets/svg/index_part_five_2_h5.svg').default : require('assets/svg/index_part_five_2.svg').default,
      title: t(`An open DID and API for linking all Web3 application ecosystem`),
      text: t(`Geatverse will improve the underlier of the Getaverse-based system, provide an interface for Web 3.0 applications, realize and enrich the conditions and methods of value capture between users and Web3 applications.`)
    },
    {
      icon: theme.isH5 ? require('assets/svg/index_part_five_3_h5.svg').default : require('assets/svg/index_part_five_3.svg').default,
      title: t(`An open application platform empowering Web3 users`),
      text: t(`Getaverse will start with a huge number of users and a well developed infrastructure to open a high-quality social channel linking social networking with the Web3 through the DID credit system to realize the Web3 value confirmation.`)
    },
    {
      icon: theme.isH5 ? require('assets/svg/index_part_five_4_h5.svg').default : require('assets/svg/index_part_five_4.svg').default,
      title: t(`A Verifiable Claim Specification`),
      text: t(`Verifiable Claim Specification is the subset of GraphQL that only allows aggregation queries to the encrypted data. It would serve as a spec to allow data consumers to pay and use the user data but not breaking user privacy.`)
    },
  ]


  return (
    <>
      <Banner banner={banner}>
        <Box
          position={'absolute'}
          bottom={'44px'}
          left={'50%'}
          transform={'translateX(-50%)'}
          display={theme.isH5 ? 'block' : 'none'}
        >
          <Image src={require('assets/images/Home/downArrow.png')} alt="" />
        </Box>

        <Typography
          fontSize={theme.isH5 ? "46px" : "1rem"}
          fontFamily={"CRT-64"}
          fontWeight={"400"}
          color={"#F6B91B"}
          // marginBottom={"62px"}
          style={{textShadow: "0px 0px 10px rgba(0,0,0,0.1600)"}}
          // data-aos="fade-up"
        >{t(`GETAVERSE`)}</Typography>

        <Describe
        // data-aos="fade-up"
        >
          {t(`Getaverse is a metaverse ecological service platform based on the Web3 digital authentication engine protocol.`)}
        </Describe>

        <FlyNode
        // data-aos="fade-up"
          onClick={() => navigate('/nodes')}
        >
          {t(`APPLY FOR NODE`)}
        </FlyNode>

        <IconLinks>
          <a
            href="https://medium.com/@GetaverseGlobal"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={require('assets/svg/banne_icon_m.svg').default} alt="" />
          </a>
          <a
            href="https://discord.com/invite/vGXwF3TdEw"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={require('assets/svg/banne_icon_dc.svg').default} alt="" />
          </a>
          <a
            href="https://twitter.com/GetaverseGlobal"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={require('assets/svg/banne_icon_tw.svg').default} alt="" />
          </a>
          <a
            href="https://t.me/Getaverse_Official"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={require('assets/svg/banne_icon_tg.svg').default} alt="" />
          </a>
        </IconLinks>
      </Banner>
      <PartTwo>
        <Display
        // data-aos-anchor-placement="bottom-top" 
        // data-aos="fade-up"
        // data-aos="zoom-in"
        >

          <Box
            display={theme.isH5 ? 'none' : ''}
          >
            <Image src={require('assets/svg/index_part_two_1.svg').default} alt="" />
          </Box>

          <Box>
            <Image src={require('assets/svg/index_part_two_2.png')} alt="" />
          </Box>

          <Box
            display={theme.isH5 ? 'none' : ''}
          >
            <Image src={require('assets/images/Home/index_part_two_3.png')} alt="" />
          </Box>

        </Display>

        <DisplayVision>
          <Title
            marginBottom={theme.isH5 ? "21px" : '60px'}
            display={'inline-block'}
            style={{ textAlign: 'left', display: theme.isH5 ? 'flex' : 'inline-block', justifyContent: 'center' }}
          // textAlign={'left'}
          // data-aos-anchor-placement="bottom-top"
          // data-aos="fade-right" 
          >
            {t(`Vision`)}
          </Title>
          <Grid
            gridTemplateColumns={theme.isH5 ? "1fr" : "1fr 1fr"}
            gap='39px'
            paddingBottom={'92px'}
          >
            <Column
              gap='30px'
            >
              <ImageHover
                // data-aos-anchor-placement="bottom-top" 
                // data-aos="fade-up-right"
                bgColor="rgba(246, 185, 27, .5)"
                textColor="#00E88A"
                text="The Top Private Domain Traffic Portal"
              >
                <Image
                  src={require('assets/images/index_part_three_1.png')} alt="" />
              </ImageHover>

              <Box
                color='#ffffff'
                fontSize={theme.isH5 ? '16px' : '.28rem'}
                fontWeight='400'
                textAlign={'center'}
                fontStyle={'italic'}
              // data-aos-anchor-placement="bottom-top"
              // data-aos="fade-up-right"
              >
                {t(`Getaverse is not just a metaverse reputation system. We will be the top private domain traffic portal in the future metaverse world and will provide a bridge to link Web3 to the huge numbers of digital users in Web2.`)}
              </Box>

            </Column>

            <Column
              gap='30px'
            >
              <ImageHover
                // data-aos="fade-up-left"
                // data-aos-anchor-placement="bottom-top"
                bgColor="rgba(0, 232, 138, .5)"
                textColor="#F6B91B"
                text="Exclusive Metaverse Digital Identity System"
              >
                <Image
                  src={require('assets/images/index_part_three_2.png')} alt="" />
              </ImageHover>
              <Box
                color='#ffffff'
                fontSize={theme.isH5 ? '16px' : '.28rem'}
                fontWeight='400'
                textAlign={'center'}
                fontStyle={'italic'}
              // data-aos="fade-up-left"
              // data-aos-anchor-placement="bottom-top"
              >
                {t(`Users will get an exclusive metaverse decentralized identity (DID) system in Getaverse. They can generate their own SBT tokens and provide different advantageous platform services based on the user's reputation level in the platform.`)}
              </Box>
            </Column>
          </Grid>

          <Box
            position={'absolute'}
            left={'0'}
            width={'100%'}
            minWidth={theme.isH5 ? 'initial' : '1280px'}
            zIndex={Z_INDEX.index_vision}

          >
            <Image
              // data-aos="fade-up"
              // data-aos-anchor-placement="bottom-top"
              // data-aos-offset="600"
              style={{ width: '100%' }}
              src={theme.isH5 ? require('assets/images/Home/index_part_four_1_h5.png') : require('assets/svg/index_part_four_1.svg').default} alt=""
            />
          </Box>

        </DisplayVision>
      </PartTwo>

      <PartThree>
        {/* <CardBg /> */}
        <Flex
          alignItems={'center'}
          gap={theme.isH5 ? '20px' : '1.85rem'}
          position={'relative'}
          flexDirection={theme.isH5 ? "column" : 'row'}
        // marginBottom={'104px'}
        >
          <Title
            // fontSize={'60px'}
            // fontWeight={'500'}
            // color={'#fff'}
            whiteSpace={'nowrap'}
          // data-aos="fade-right"
          // data-aos-anchor-placement="bottom-top"
          // data-aos-offset="700"
          >{t(`Getaverse advantages`)}</Title>
          <Box
            fontSize={theme.isH5 ? '18px' : '.28rem'}
            fontWeight={'400'}
            color={'#fff'}
            textAlign={'center'}
          // data-aos="fade-left"
          // data-aos-anchor-placement="bottom-top"
          // data-aos-offset="700"
          >{t(`Getaverse will provide a way to monetize, contractualize personal data, information and value.`)}</Box>
        </Flex>

        <CardWrapper
          gridTemplateColumns={theme.isH5 ? '1fr' : '1fr 1fr'}
          gap={theme.isH5 ? '37px' : '.51rem .7rem'}
          marginTop={theme.isH5 ? '26px' : '1.04rem'}
        >

          {
            Advantages.map((item, index) => {
              return (
                <Card
                  key={index}
                // data-aos="zoom-in-up"
                // data-aos-anchor-placement="bottom-top"
                //  data-aos-offset="700"
                >
                  <Image
                    src={item.icon} alt=""
                  />
                  <Typography fontSize={theme.isH5 ? '18px' : ".28rem"} fontWeight={"bold"} margin={"24px 0 16px"} color="#F6B91B">{item.title}</Typography>
                  <Typography fontStyle={'italic'} fontSize={theme.isH5 ? '16px' : ".22rem"} color="#F5F5F5">{item.text}</Typography>
                </Card>
              )
            })
          }
        </CardWrapper>

        <Row
          gap={theme.isH5 ? '32px' : '1.46rem'}
          marginTop={theme.isH5 ? '45px' : '1rem'}
          justifyContent={'center'}
          position={'relative'}
        >
          <Image src={require(theme.isH5 ? 'assets/svg/index_part_five_6_h5.svg' : 'assets/svg/index_part_five_6.svg').default} alt="" />
          <Image src={require(theme.isH5 ? 'assets/svg/index_part_five_7_h5.svg' : 'assets/svg/index_part_five_7.svg').default} alt="" />
          <Box
            display={theme.isH5 ? 'none' : ''}
          >

            <Image src={require('assets/svg/index_part_five_8.svg').default} alt="" />
          </Box>
          <Image src={require(theme.isH5 ? 'assets/svg/index_part_five_9_h5.svg' : 'assets/svg/index_part_five_9.svg').default} alt="" />
        </Row>

        <LineCut
          marginTop={theme.isH5 ? '48px' : '1.63rem'}
          paddingBottom={'.96rem'}
          textAlign={'center'}
        >
          <Title
            // fontSize={'60px'}
            // fontWeight={500}
            // color={'#ffffff'}
            // data-aos="fade-up"
            // data-aos-anchor-placement="bottom-top"
            maxWidth={theme.isH5 ? '310px' : 'initial'}
            margin={'auto'}
          >
            {t(`Getaverse Operational Mechanism`)}
          </Title>
          <RowCenter>
            <Typography
              marginTop={theme.isH5 ? '18px' : '.59rem'}
              fontSize={theme.isH5 ? '16px' : '.28rem'}
              fontWeight={400}
              color={'#ffffff'}
              maxWidth={theme.isH5 ? '100%' : '10.02rem'}

              paddingBottom={theme.isH5 ? '50px' : '0'}
              borderBottom={theme.isH5 ? '5px dashed #00E88A' : 'none'}
            // data-aos="fade-up"
            // data-aos-anchor-placement="bottom-top"
            >
              {t(`Getaverse provides the infrastructure for community members to`)}<br />
              {t(`manage and contribute digital credentials to our data network. Our`)}<br />
              {t(`infrastructure supports credential management through multiple data`)}<br />
              {t(`sources. For on-chain credentials, curators can provide subgraph queries`)}<br />
              {t(`or static snapshots. For off-chain credentials, we have integrated with`)}<br />
              {t(`data sources such as Snapshot.org, Twitter, and Github.`)}
            </Typography>
          </RowCenter>
        </LineCut>

      </PartThree>

      <PartFour>
        <Row
          justifyContent={'center'}
          alignItems={'end'}
          gap={'115px'}
        >

          <Box
            display={theme.isH5 ? 'none' : ''}
          >
            <Image src={require('assets/svg/index_part_six_1.svg').default} alt="" />
          </Box>

          <Box
            display={theme.isH5 ? 'none' : ''}
          >
            <Image src={require('assets/svg/index_part_six_2.svg').default} alt="" />
          </Box>

          <Box
          // data-aos="fade-up" 
          // data-aos-anchor-placement="bottom-top" 
          // data-aos-delay="500"
          >
            <Image src={require('assets/svg/index_part_six_3.svg').default} alt="" />
          </Box>

        </Row>
        <RowCenter>
          <Typography
            fontSize={theme.isH5 ? '20px' : '.6rem'}
            fontWeight={500}
            color={"#ffffff"}
            textAlign={'center'}
            fontFamily={'RomicStd'}
            // maxWidth={'1134px'}
            margin={theme.isH5 ? '33px 0 22px' : '54px 0 78px'}
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-top"
          >
            {t(`GETA is the governance token of the Getaverse, with a total supply of 5 billion.`)}
          </Typography>
        </RowCenter>

        <Row
          justifyContent={'center'}
          gap={theme.isH5 ? '3.5px' : '26px'}
          marginBottom={theme.isH5 ? '20px' : '43px'}
        >
          <NodeBtn>{t(`Purchase node`)}</NodeBtn>
          <Image
            // data-aos-anchor-placement="bottom-top" 
            // data-aos="fade-up" 
            style={{
              width: theme.isH5 ? '21px' : 'auto',
              maxHeight: theme.isH5 ? '15px' : 'auto',
            }}
            src={require('assets/svg/index_part_six_4.svg').default} alt="" />
          <NodeBtn>{t(`Registration node`)}</NodeBtn>
          <Image
            // data-aos-anchor-placement="bottom-top" 
            // data-aos="fade-up" 
            style={{
              width: theme.isH5 ? '21px' : 'auto',
              maxHeight: theme.isH5 ? '15px' : 'auto',
            }}
            src={require('assets/svg/index_part_six_4.svg').default} alt="" />
          <NodeBtn>{t(`Become a node`)}</NodeBtn>
        </Row>

        <RowCenter>
          <Typography
            fontSize={theme.isH5 ? '16px' : '.28rem'}
            fontWeight={400}
            color={'#ffffff'}
            textAlign={'center'}
            maxWidth={'1266px'}
            marginBottom={theme.isH5 ? '16px' : '.2rem'}
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-top"
          >
            {t(`Geta tokenomics is the core rule to ensure the long-term development of the project.`)}
          </Typography>
        </RowCenter>
        <RowCenter>
          <Typography
            fontSize={theme.isH5 ? '16px' : '.28rem'}
            fontWeight={400}
            color={'#ffffff'}
            textAlign={'center'}
            maxWidth={'1266px'}
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-top"
          >
            {t(`Incentives based on the degree of value creation to Getaverse will always be the highest principle of Geta tokenomics.`)}
          </Typography>
        </RowCenter>
        <Flex
          justifyContent={'center'}
          marginTop={theme.isH5 ? '20px' : '.4rem'}
        // data-aos="fade-up"
        // data-aos-anchor-placement="bottom-top"
        >
          <FlyNode
            onClick={() => navigate('/nodes')}
          >
            {t(`APPLY FOR NODE`)}
          </FlyNode>
        </Flex>

      </PartFour>

      <PartFive>
        <PartnersBg />
        <Title
          // fontSize={'60px'}
          // fontWeight={500}
          // color={'#ffffff'}
          textAlign={'center'}
          position={'relative'}
        // data-aos="fade-up"
        // data-aos-anchor-placement="bottom-top"
        // data-aos-offset="500"
        >
          {t(`Core team`)}
        </Title>
        {
          theme.isH5 ?
            <Grid
              gridGap={'25px'}
              flexDirection={'column'}
              marginTop={'50px'}
            >
              <Grid
                gridGap={'14px'}
                gridTemplateColumns={'1fr 1fr'}
              >
                <Image
                  style={{ width: '170px', height: '260px', borderRadius: '10px' }}
                  src={require('assets/images/Home/Ryan.png')} alt="" />
                  
                <Flex
                  flexDirection={'column'}
                  alignItems={'start'}
                  justifyContent={'flex-end'}
                  paddingBottom={'10px'}
                >
                  <Typography
                    color="#F6B91B"
                    fontSize="16px"
                    fontWeight="bold"
                    marginBottom="10px"
                  >Ryan Chris</Typography>
                  <Typography
                    color="#F6B91B"
                    fontSize="14px"
                    fontWeight="normal"
                    marginBottom="25px"
                  >CEO</Typography>
                  <Typography
                    fontSize={'14px'}
                    fontWeight={'normal'}
                    color={'#ffffff'}
                    fontStyle={'italic'}
                  >{t(`More than 5 years of crypto investment experience;`)}</Typography>
                  <Typography
                    fontSize={'14px'}
                    fontWeight={'normal'}
                    color={'#ffffff'}
                    fontStyle={'italic'}
                  >{t(`Marketing & financial consulting services for more than 5 blockchain projects;`)}</Typography>
                </Flex>
              </Grid>
              <Flex
                gap={'14px'}
                flexDirection={'row-reverse'}
              >
                <Image
                  style={{ width: '170px', height: '260px', borderRadius: '10px'  }}
                  src={require('assets/images/Home/Yuby.png')} alt="" />
                <Flex
                  flexDirection={'column'}
                  alignItems={'flex-end'}
                  textAlign={'right'}
                  justifyContent={'flex-end'}
                  paddingBottom={'10px'}
                >
                  <Typography
                    color="#F6B91B"
                    fontSize="16px"
                    fontWeight="bold"
                    marginBottom="10px"
                    textAlign={'right'}
                  >Yuby Brown</Typography>
                  <Typography
                    color="#F6B91B"
                    fontSize="14px"
                    fontWeight="normal"
                    marginBottom="25px"
                    textAlign={'left'}
                  >Co-Founder</Typography>
                  <Typography
                    fontSize={'14px'}
                    fontWeight={'normal'}
                    color={'#ffffff'}
                    fontStyle={'italic'}
                  >{t(`More than 5 years of project management experience;`)}</Typography>
                  <Typography
                    fontSize={'14px'}
                    fontWeight={'normal'}
                    color={'#ffffff'}
                    fontStyle={'italic'}
                  >{t(`Worked for blue chip companies and startups;`)}</Typography>
                </Flex>
              </Flex>
              <Flex
                gap={'14px'}
              >
                <Image
                  style={{ width: '170px', height: '260px', borderRadius: '10px'  }}
                  src={require('assets/images/Home/Eden.png')} alt="" />
                <Flex
                  flexDirection={'column'}
                  alignItems={'start'}
                  justifyContent={'flex-end'}
                  paddingBottom={'10px'}
                >
                  <Typography
                    color="#F6B91B"
                    fontSize="16px"
                    fontWeight="bold"
                    marginBottom="10px"
                  >Eden</Typography>
                  <Typography
                    color="#F6B91B"
                    fontSize="14px"
                    fontWeight="normal"
                    marginBottom="25px"
                  >Co-Founder</Typography>
                  <Typography
                    fontSize={'14px'}
                    fontWeight={'normal'}
                    color={'#ffffff'}
                    fontStyle={'italic'}
                  >{t(`More than 7 years of executive experience in IT strategy and cybersecurity;`)}</Typography>
                  <Typography
                    fontSize={'14px'}
                    fontWeight={'normal'}
                    color={'#ffffff'}
                    fontStyle={'italic'}
                  >{t(`Previously CTO of a multinational enterprise software company.`)}</Typography>
                </Flex>
              </Flex>

            </Grid>
            :
            <Flex
              marginTop={theme.isH5 ? '50px' : '120px'}
              gap={'10px'}
              flexWrap={'wrap'}
              justifyContent={'center'}
              position={'relative'}
            >
              <Grid
                gridTemplateColumns={'repeat(3,1fr)'}
                gap={'1rem'}
              >

                <Flex
                  flexDirection={'column'}
                  gap={'.3rem'}
                >
                  <CoreTeamImg>
                    <Image src={require('assets/images/Home/Ryan.png')} alt="" />
                    <CoreTeamId>
                      <Typography
                        fontSize={'.28rem'}
                        fontWeight={'bold'}
                      >Ryan Chris</Typography>
                      <Typography
                        fontSize={'.22rem'}
                        fontWeight={'normal'}
                      >CEO</Typography>
                    </CoreTeamId>
                  </CoreTeamImg>
                  <Box
                    fontSize={'.22rem'}
                    color={'#ffffff'}
                  >
                    <Typography>{t(`More than 5 years of crypto investment experience;`)}</Typography>
                    <Typography>{t(`Marketing & financial consulting services for more than 5 blockchain projects;`)}</Typography>

                  </Box>
                </Flex>
                <Flex
                  flexDirection={'column'}
                  gap={'.3rem'}
                >
                  <CoreTeamImg>
                    <Image src={require('assets/images/Home/Yuby.png')} alt="" />
                    <CoreTeamId>
                      <Typography
                        fontSize={'.28rem'}
                        fontWeight={'bold'}
                      >Yuby Brown</Typography>
                      <Typography
                        fontSize={'.22rem'}
                        fontWeight={'normal'}
                      >Co-Founder</Typography>
                    </CoreTeamId>
                  </CoreTeamImg>
                  <Box
                    fontSize={'.22rem'}
                    color={'#ffffff'}
                  >

                    <Typography>{t(`More than 5 years of project management experience;`)}</Typography>
                    <Typography>{t(`Worked for blue chip companies and startups;`)}</Typography>

                  </Box>
                </Flex>
                <Flex
                  flexDirection={'column'}
                  gap={'.3rem'}
                >
                  <CoreTeamImg>
                    <Image src={require('assets/images/Home/Eden.png')} alt="" />
                    <CoreTeamId>
                      <Typography
                        fontSize={'.28rem'}
                        fontWeight={'bold'}
                      >Eden</Typography>
                      <Typography
                        fontSize={'.22rem'}
                        fontWeight={'normal'}
                      >Co-Founder</Typography>
                    </CoreTeamId>
                  </CoreTeamImg>
                  <Box
                    fontSize={'.22rem'}
                    color={'#ffffff'}
                  >
                    <Typography>{t(`More than 7 years of executive experience in IT strategy and cybersecurity;`)}</Typography>
                    <Typography>{t(`Previously CTO of a multinational enterprise software company.`)}</Typography>
                  </Box>
                </Flex>
              </Grid>
            </Flex>
        }

        <RowCenter
          marginTop={theme.isH5 ? '65px' : '3.22rem'}
        >
          <Image
            // data-aos="fade-up" 
            // data-aos-anchor-placement="bottom-top"
            // data-aos-offset="900"  
            src={theme.isH5 ? require('assets/images/Home/index_part_seven_6_h5.png') : require('assets/svg/index_part_seven_6.svg').default} alt="" />
        </RowCenter>

        <Title
          // fontSize={'60px'}
          // fontWeight={500}
          // color={'#ffffff'}
          textAlign={'center'}
          marginTop={theme.isH5 ? '49px' : '2.12rem'}
        // data-aos="fade-up"
        // data-aos-anchor-placement="bottom-top"
        // data-aos-offset="1000"
        >
          {t(`Roadmap`)}
        </Title>
        <Column
          marginTop={theme.isH5 ? '75px' : '1.91rem'}
          justifyContent={'center'}
          gap={theme.isH5 ? '61px' : '1rem'}
        >

          <Grid
            gap={theme.isH5 ? '44px' : '.6rem 1.96rem'}
            gridTemplateColumns={theme.isH5 ? '1fr' : 'repeat(2,1fr)'}
            position={'relative'}
          >
            <Roadmap />
            <RoadmapImg src={require('assets/svg/roadmap_icon.svg').default} />
            <Flex
              gap={'.24rem'}
              color={'#00E88A'}
              fontSize={theme.isH5 ? '14px' : '.3rem'}
              fontWeight={'500'}
              flexDirection={'column'}
              alignItems={theme.isH5 ? 'start' : 'end'}
              textAlign={theme.isH5 ? 'left' : 'right'}
              paddingLeft={theme.isH5 ? '64px' : '0'}
            >
              <Typography
                fontSize={theme.isH5 ? '16px' : '.43rem'}
                fontWeight={'bold'}
              >Q3 2022</Typography>
              <Typography>{t(`Launch Getaverse platform`)}</Typography>
              <Typography>{t(`Open the wallet port`)}</Typography>
              <Typography>{t(`Launch the Decentralized Identity system`)}</Typography>
              <Typography>{t(`Deploy the Trusted Verifier Node`)}</Typography>
            </Flex>

            <Box display={theme.isH5 ? 'none' : ''} />

            <Box display={theme.isH5 ? 'none' : ''} />

            <RoadmapHover
              gap={theme.isH5 ? '10px' : '.24rem'}
              color={'#ffffff'}
              fontSize={theme.isH5 ? '16px' : '.3rem'}
              fontWeight={'500'}
              flexDirection={'column'}
              textAlign={'left'}
              alignItems={'start'}
              paddingLeft={theme.isH5 ? '64px' : '0'}
            >
              <Typography
                fontSize={theme.isH5 ? '14px' : '.43rem'}
                fontWeight={'bold'}
                color={'#F6B91B'}
              >Q4 2022</Typography>
              <Typography>{t(`Launch the SBT-based credit system `)}</Typography>
              <Typography>{t(`Operate the trusted verifier node`)}</Typography>
              <Typography>{t(`DAO governance goes live`)}</Typography>
            </RoadmapHover>

            <RoadmapHover
              gap={theme.isH5 ? '10px' : '.24rem'}
              color={'#ffffff'}
              fontSize={theme.isH5 ? '14px' : '.3rem'}
              fontWeight={'500'}
              flexDirection={'column'}
              alignItems={theme.isH5 ? 'start' : 'end'}
              textAlign={theme.isH5 ? 'left' : 'right'}
              paddingLeft={theme.isH5 ? '64px' : '0'}
            >
              <Typography
                fontSize={theme.isH5 ? '14px' : '.43rem'}
                fontWeight={'bold'}
                color={'#F6B91B'}
              >Q1 2023</Typography>
              <Typography>{t(`Open the multi-functional API interface `)}</Typography>
              <Typography>{t(`Connect to the Metaverse World`)}</Typography>
              <Typography>{t(`Launch more Web3 applications based on community voting`)}</Typography>
              <Typography>{t(`Upgrade the SBT-based credit system`)}</Typography>
              <Typography>{t(`Enable creative expansion work`)}</Typography>
              <Typography>{t(`Provide strategic incubation services`)}</Typography>
            </RoadmapHover>

            <Box display={theme.isH5 ? 'none' : ''} />

            <Box display={theme.isH5 ? 'none' : ''} />

            <RoadmapHover
              gap={theme.isH5 ? '10px' : '.24rem'}
              color={'#ffffff'}
              fontSize={theme.isH5 ? '14px' : '.3rem'}
              fontWeight={'500'}
              flexDirection={'column'}
              textAlign={'left'}
              alignItems={'start'}
              paddingLeft={theme.isH5 ? '64px' : '0'}
            >
              <Typography
                fontSize={theme.isH5 ? '16px' : '.43rem'}
                fontWeight={'bold'}
                color={'#F6B91B'}
              >Q2 2023</Typography>
              <Typography>{t(`Provide customized platform services`)}</Typography>
              <Typography>{t(`Complete multi-chain deployment`)}</Typography>
              <Typography>{t(`Start the next round of formal node staking`)}</Typography>
              <Typography>{t(`And more… `)}</Typography>
            </RoadmapHover>
          </Grid>
        </Column>

      </PartFive>

      <PartSix>
        <Title
          // fontSize={'60px'}
          // fontWeight={500}
          // color={'#ffffff'}
          textAlign={'center'}
        // data-aos="fade-up"
        // data-aos-anchor-placement="bottom-top"
        // data-aos-offset="1000"
        >
          {t(`Subscribe`)}
        </Title>
        <Typography
          fontSize={theme.isH5 ? '16px' : '.28rem'}
          fontWeight={theme.isH5 ? 400 : 300}
          color={'#ffffff'}
          textAlign={'center'}
          margin={theme.isH5 ? '34px auto 31px' : '47px auto 80px'}
        // data-aos="fade-up"
        // data-aos-anchor-placement="bottom-top"
        // data-aos-offset="1000"
        >
          {t(`Subscribe to the newsletter to hear about Getaverse updates and events.`)}
        </Typography>

        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={theme.isH5 ? 'column' : 'row'}
          gap={theme.isH5 ? '17px' : '32px'}
        // data-aos="fade-up"
        // data-aos-anchor-placement="bottom-top"
        // data-aos-offset="1000"
        >
          <EmailIpt
            placeholder='Email'
            inputClassName="email-input"
            value={email}
            onChange={(value) => {
                setEmail(value)
            }}
          />
          <FlyNode
            maxWidth={theme.isH5 ? '200px' : 'initial'}
            width={theme.isH5 ? '100%' : 'initial'}
            onClick={FnSubmit}
          >
            {t(`SUBMIT`)}
          </FlyNode>

        </Flex>

      </PartSix>

    </>
  )
}