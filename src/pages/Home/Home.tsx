import React from 'react'
import Box, { Typography } from 'components/BaseElement'
import { Column } from 'components/BaseElement/Column'
import Flex from 'components/BaseElement/Flex'
import Grid from 'components/BaseElement/Grid'
import { Row, RowCenter } from 'components/BaseElement/Row'
import { useTranslation } from 'react-i18next'
// import { Animate } from 'react-simple-animate'
import {
  Banner, Describe, FlyNode, IconLinks, PartTwo, Display, DisplayVision, Vision,
  PartThree, CardWrapper, Card, CardBg, PartFour, NodeBtn, PartFive, PartnersBg,
  PartSix, EmailIpt, Image, RoadMapCard, RoadMapLi, ImageHover
} from './Home.styled'
import { Z_INDEX } from 'utils/global'


export default function Home() {
  const { t } = useTranslation()

  const Advantages = [
    {
      icon: require('assets/svg/index_part_five_1.svg').default,
      title: t(`A unified identity platform based on Soulbound Tokens (SBT)`),
      text: t(`Getaverse will build a unified decentralized platform based on Soulbound Tokens to establish a Web3.0 personal data value system, which utilized the Getaverse Credit Score system and changed the system of Web 3.0 personal data value.`)
    },
    {
      icon: require('assets/svg/index_part_five_2.svg').default,
      title: t(`An open DID and API for linking all Web3 application ecosystem`),
      text: t(`Geatverse will improve the underlier of the Getaverse-based system, provide an interface for Web 3.0 applications, realize and enrich the conditions and methods of value capture between users and Web3 applications.`)
    },
    {
      icon: require('assets/svg/index_part_five_3.svg').default,
      title: t(`An open application platform empowering Web3 users`),
      text: t(`Getaverse will start with a huge number of users and a well developed infrastructure to open a high-quality social channel linking social networking with the Web3 through the DID credit system to realize the Web3 value confirmation.`)
    },
    {
      icon: require('assets/svg/index_part_five_4.svg').default,
      title: t(`A Verifiable Claim Specification`),
      text: t(`Verifiable Claim Specification is the subset of GraphQL that only allows aggregation queries to the encrypted data. It would serve as a spec to allow data consumers to pay and use the user data but not breaking user privacy.`)
    },
  ]


  return (
    <>
      <Banner>
        <Typography
          fontSize={"100px"}
          fontFamily={"CRT-64"}
          fontWeight={"400"}
          color={"#F6B91B"}
          marginBottom={"62px"}
          style={{textShadow: "0px 0px 10px rgba(0,0,0,0.1600)"}}
          // data-aos="fade-up"
        >{t(`GETAVERSE`)}</Typography>

        <Describe 
          // data-aos="fade-up"
        >
          {t(`Getaverse is a metaverse ecological service platform based on the Web3 digital authentication engine protocol`)}
        </Describe>

        <FlyNode 
          // data-aos="fade-up"
        >
          {t(`APPLY FOR NODE`)}
        </FlyNode>

        <IconLinks>
          <Image src={require('assets/svg/banne_icon_m.svg').default} alt="" />
          <Image src={require('assets/svg/banne_icon_dc.svg').default} alt="" />
          <Image src={require('assets/svg/banne_icon_tw.svg').default} alt="" />
          <Image src={require('assets/svg/banne_icon_tg.svg').default} alt="" />
        </IconLinks>
      </Banner>
      <PartTwo>
        <Display 
          // data-aos-anchor-placement="bottom-top" 
          // data-aos="fade-up"
        >
          <Box>

            <Image src={require('assets/svg/index_part_two_1.svg').default} alt="" />
          </Box>
          <Box>
      
            <Image src={require('assets/svg/index_part_two_2.svg').default} alt="" />
          </Box>
          <Box>

            <Image src={require('assets/svg/index_part_two_3.svg').default} alt="" />
          </Box>
        </Display>

        <DisplayVision>
          <Vision 
            // data-aos-anchor-placement="bottom-top"
            // data-aos="fade-right" 
          >{t(`Vision`)}</Vision>

          <Grid
            gridTemplateColumns={"1fr 1fr"}
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
                fontSize='28px'
                fontWeight='400'
                textAlign={'center'}
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
                fontSize='28px'
                fontWeight='400'
                textAlign={'center'}
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
            zIndex={Z_INDEX.index_vision}
          
          >
            <Image 
              // data-aos="fade-up"
              // data-aos-anchor-placement="bottom-top"
              // data-aos-offset="600"
              style={{ width: '100%' }} src={require('assets/svg/index_part_four_1.svg').default} alt="" />
          </Box>

        </DisplayVision>
      </PartTwo>

      <PartThree>
        <CardBg />
        <Row
          gap={'185px'}
          position={'relative'}
        // marginBottom={'104px'}
        >
          <Box
            fontSize={'60px'}
            fontWeight={'500'}
            color={'#fff'}
            WhiteSpace={'nowrap'}
            // data-aos="fade-right"
            // data-aos-anchor-placement="bottom-top"
            // data-aos-offset="700"
          >{t(`Getaverse advantages`)}</Box>
          <Box
            fontSize={'28px'}
            fontWeight={'400'}
            color={'#fff'}
            // data-aos="fade-left"
            // data-aos-anchor-placement="bottom-top"
            // data-aos-offset="700"
          >{t(`Getaverse will provide a way to monetize, contractualize personal data, information and value.`)}</Box>
        </Row>

        <CardWrapper
          gridTemplateColumns={'1fr 1fr'}
          gap={'51px 70px'}
          marginTop={'104px'}
        >

          {
            Advantages.map((item, index) => {
              return (
                <Card
                  padding={'42px 32px 26px'}
                  key={index}
                  border={'4px solid #00E88A'}
                  // data-aos="zoom-in-up"
                  // data-aos-anchor-placement="bottom-top"
                  //  data-aos-offset="700"
                >
                  <Image src={item.icon} alt="" />
                  <Typography fontSize={"28px"} fontWeight={"bold"} margin={"24px 0 16px"} color="#F6B91B">{item.title}</Typography>
                  <Typography fontSize={"22px"} color="#F5F5F5">{item.text}</Typography>
                </Card>
              )
            })
          }
        </CardWrapper>

        <Row
          gap={'146px'}
          marginTop={'100px'}
          justifyContent={'center'}
          position={'relative'}
        >
          <Image  
            // data-aos-anchor-placement="bottom-top" 
            // data-aos="fade-up" 
            // data-aos-delay="300" 
            src={require('assets/svg/index_part_five_6.svg').default} alt="" />
          <Image  
            // data-aos-anchor-placement="bottom-top" 
            // data-aos="fade-up" 
            // data-aos-delay="400" 
            src={require('assets/svg/index_part_five_7.svg').default} alt="" />
          <Image  
            // data-aos-anchor-placement="bottom-top" 
            // data-aos="fade-up" 
            // data-aos-delay="500" 
            src={require('assets/svg/index_part_five_8.svg').default} alt="" />
          <Image  
            // data-aos-anchor-placement="bottom-top" 
            // data-aos="fade-up" 
            // data-aos-delay="600" 
            src={require('assets/svg/index_part_five_9.svg').default} alt="" />
        </Row>

        <Box
          marginTop={'163px'}
          paddingBottom={'96px'}
          textAlign={'center'}
        >
          <Typography
            fontSize={'60px'}
            fontWeight={500}
            color={'#ffffff'}
            // data-aos="fade-up"
            // data-aos-anchor-placement="bottom-top"
          >
            {t(`Getaverse Operational Mechanism`)}
          </Typography>
          <RowCenter>
            <Typography
              marginTop={'59px'}
              fontSize={'28px'}
              fontWeight={400}
              color={'#ffffff'}
              maxWidth={'902px'}
              // data-aos="fade-up"
              // data-aos-anchor-placement="bottom-top"
            >
              {t(`Getaverse provides the infrastructure for community members to 
              manage and contribute digital credentials to our data network. Our 
              infrastructure supports credential management through multiple data 
              sources. For on-chain credentials, curators can provide subgraph queries 
              or static snapshots. For off-chain credentials, we have integrated with 
              data sources such as Snapshot.org, Twitter, and Github.`)}
            </Typography>
          </RowCenter>
        </Box>

      </PartThree>

      <PartFour>
        <Row
          justifyContent={'center'}
          alignItems={'end'}
          gap={'115px'}
        >
          <Box 
            // data-aos="fade-up" 
            // data-aos-anchor-placement="bottom-top" 
            // data-aos-delay="300"
          >
            <Image src={require('assets/svg/index_part_six_1.svg').default} alt="" />

          </Box>
          <Box 
            // data-aos="fade-up" 
            // data-aos-anchor-placement="bottom-top" 
            // data-aos-delay="400"
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
            fontSize={'60px'}
            fontWeight={500}
            textAlign={'center'}
            maxWidth={'1134px'}
            color={"#ffffff"}
            margin={'54px 0 78px'}
            // data-aos="fade-up"
            // data-aos-anchor-placement="bottom-top"
          >
            {t(`GETA is the governance token of Getaverse. 
            The total supply is 5 billion.`)}
          </Typography>
        </RowCenter>

        <Row
          justifyContent={'center'}
          gap={'26px'}
          marginBottom={'43px'}
        >
          <NodeBtn>{t(`Purchase node`)}</NodeBtn>
          <Image 
          // data-aos-anchor-placement="bottom-top" 
          // data-aos="fade-up" 
          src={require('assets/svg/index_part_six_4.svg').default} alt="" />
          <NodeBtn>{t(`Registration node`)}</NodeBtn>
          <Image 
          // data-aos-anchor-placement="bottom-top" 
          // data-aos="fade-up" 
          src={require('assets/svg/index_part_six_4.svg').default} alt="" />
          <NodeBtn>{t(`Become a node`)}</NodeBtn>
        </Row>
        <RowCenter>
          <Typography
            fontSize={'28px'}
            fontWeight={400}
            color={'#ffffff'}
            textAlign={'center'}
            maxWidth={'1266px'}
            marginBottom={'20px'}
            // data-aos="fade-up"
            // data-aos-anchor-placement="bottom-top"
          >
            {t(`Geta tokenomics is the core rule to ensure the long-term development of the project.`)}
          </Typography>
        </RowCenter>
        <RowCenter>
          <Typography
            fontSize={'28px'}
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
        <RowCenter
          marginTop={'40px'}
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-top"
        >
          <FlyNode>
            {t(`APPLY FOR NODE`)}
          </FlyNode>
        </RowCenter>

      </PartFour>

      <PartFive>
        {/* <PartnersBg /> */}
        <Typography
          fontSize={'60px'}
          fontWeight={500}
          color={'#ffffff'}
          textAlign={'center'}
          position={'relative'}
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-top"
          // data-aos-offset="500"
        >
          {t(`Strategic Partners`)}
        </Typography>

        <Flex
          marginTop={'120px'}
          gap={'78px 65px'}
          flexWrap={'wrap'}
          justifyContent={'center'}
          position={'relative'}
          
        >
          <Box >
            <Image 
            // data-aos="fade-up"  
            // data-aos-anchor-placement="bottom-top"
            // data-aos-offset="600" 
            src={require('assets/images/Home/index_part_seven_1.png')} alt="" />

          </Box>
          <Box >
            <Image 
            // data-aos="fade-up" 
            // data-aos-anchor-placement="bottom-top"
            // data-aos-offset="600" 
            src={require('assets/images/Home/index_part_seven_2.png')} alt="" />

          </Box>
          <Box >
            <Image 
            // data-aos="fade-up" 
            // data-aos-anchor-placement="bottom-top"
            // data-aos-offset="600" 
            src={require('assets/images/Home/index_part_seven_3.png')} alt="" />

          </Box>
          <Box >
            <Image 
            // data-aos="fade-up" 
            // data-aos-anchor-placement="bottom-top"
            // data-aos-offset="600" 
            src={require('assets/images/Home/index_part_seven_4.png')} alt="" />

          </Box>
          {/* <Box>
            <Image src={require('assets/svg/index_part_seven_4.svg').default} alt="" />

          </Box> */}
        </Flex>

        <RowCenter
          marginTop={'322px'}
          
        >
          <Image  
          // data-aos="fade-up" 
          // data-aos-anchor-placement="bottom-top"
          // data-aos-offset="900"  
          src={require('assets/svg/index_part_seven_6.svg').default} alt="" />
        </RowCenter>

        <Typography
          fontSize={'60px'}
          fontWeight={500}
          color={'#ffffff'}
          textAlign={'center'}
          marginTop={'212px'}
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-top"
          // data-aos-offset="1000"
        >
          {t(`Roadmap`)}
        </Typography>
        <Column
          marginTop={'191px'}
          justifyContent={'center'}
          gap={'100px'}
        >

       
          <RoadMapCard
            type='left'
            text='Q3 2022'
            // data-aos="fade-right"
            // data-aos-anchor-placement="bottom-top"
            // data-aos-offset="1000"
          >
            <Grid
              gridTemplateColumns={'1fr 1fr'}
              gap={'16px 10px'}
              fontSize={'30px'}
              fontWeight={'500'}
              color={'#ffffff'}
            >
              <RoadMapLi className="ty-li">

                {t(`Launch Getaverse platform`)}
              </RoadMapLi>

              <RoadMapLi className="ty-li">
                {t(`Launch the Decentralized Identity system`)}
              </RoadMapLi>
              <RoadMapLi className="ty-li">
                {t(`Open the wallet port`)}
              </RoadMapLi>
              <RoadMapLi className="ty-li">
                {t(`Deploy the Trusted Verifier Node`)}
              </RoadMapLi>

            </Grid>
          </RoadMapCard>
         

          <RoadMapCard
            type='right'
            text='Q4 2022'
            // data-aos="fade-left"
            // data-aos-anchor-placement="bottom-top"
            // data-aos-offset="1000"
          >
            <Grid
              gridTemplateColumns={'1fr 1fr'}
              gap={'16px 10px'}
              fontSize={'30px'}
              fontWeight={'500'}
              color={'#ffffff'}
            >
              <RoadMapLi className="ty-li">
                {t(`Start the systematic token production`)}
              </RoadMapLi>

              <RoadMapLi className="ty-li">
                {t(`Launch the SBT-based credit system `)}
              </RoadMapLi>
              <RoadMapLi className="ty-li">
                {t(`DAO governance goes live`)}
              </RoadMapLi>

            </Grid>
          
            
          </RoadMapCard>

          <RoadMapCard
            type='left'
            text='Q1 2023'
            // data-aos="fade-right"
            // data-aos-anchor-placement="bottom-top"
            // data-aos-offset="1000"
          >
              <Grid
              gridTemplateColumns={'1fr 1fr'}
              gap={'16px 10px'}
              fontSize={'30px'}
              fontWeight={'500'}
              color={'#ffffff'}
            >
              <RoadMapLi className="ty-li">
                {t(`Open the multi-functional API interface`)}
              </RoadMapLi>

              <RoadMapLi className="ty-li">
                {t(`Connect to the Metaverse World`)}
              </RoadMapLi>
              <RoadMapLi className="ty-li">
                {t(`Launch more Web3 applications based on community voting`)}
              </RoadMapLi>
              <RoadMapLi className="ty-li">
                {t(`Upgrade the SBT-based credit system`)}
              </RoadMapLi>
              <RoadMapLi className="ty-li">
                {t(`Enable creative expansion work`)}
              </RoadMapLi>
              <RoadMapLi className="ty-li">
                {t(`Provide strategic incubation services`)}
              </RoadMapLi>

            </Grid>
          </RoadMapCard>

          <RoadMapCard
            type='right'
            text='Q2 2023'
            // data-aos="fade-left"
            // data-aos-anchor-placement="bottom-top"
            // data-aos-offset="1000"
          >
            <Grid
              gridTemplateColumns={'1fr 1fr'}
              gap={'16px 10px'}
              fontSize={'30px'}
              fontWeight={'500'}
              color={'#ffffff'}
            >
              <RoadMapLi className="ty-li">
                {t(`Provide customized platform services`)}
              </RoadMapLi>

              <RoadMapLi className="ty-li">
                {t(`Complete multi-chain deployment`)}
              </RoadMapLi>
              <RoadMapLi className="ty-li">
                {t(`Formal nodes start the next round of staking`)}
              </RoadMapLi>
              <RoadMapLi className="ty-li">
                {t(`More expansionary work… `)}
              </RoadMapLi>

            </Grid>
            
          </RoadMapCard>
        </Column>

      </PartFive>

      <PartSix>
        <Typography
          fontSize={'60px'}
          fontWeight={500}
          color={'#ffffff'}
          textAlign={'center'}
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-top"
          // data-aos-offset="1000"
        >
          {t(`Subscribe`)}
        </Typography>
        <Typography
          fontSize={'28px'}
          fontWeight={300}
          color={'#ffffff'}
          textAlign={'center'}
          margin={'47px auto 80px'}
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-top"
          // data-aos-offset="1000"
        >
          {t(`Subscribe to the newsletter to hear about Getaverse updates and events.`)}
        </Typography>

        <RowCenter
          gap={'32px'}
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-top"
          // data-aos-offset="1000"
        >
          <EmailIpt
            placeholder='Email'
          />
          <FlyNode>
            {t(`SEND`)}
          </FlyNode>

        </RowCenter>

      </PartSix>

    </>
  )
}