import Box, { Typography } from 'components/BaseElement'
import React from 'react'
import { Z_INDEX } from 'utils/global'
import Swiper from './Swiper'
import { useTranslation } from 'react-i18next';
import { Title } from 'pages/Digital/Digital.styled';
import { PartTwo, Cooperation, CooperationSvg, Activating,ActivatingSvg, PartThree, PartFive, EmailIpt
  ,CollaborationCard,
  EmailInput,
  Submit
} from './Metaverse.styled';
import { AnimateContent, CooperationProjects } from './types';
import Grid from 'components/BaseElement/Grid';
import { RowCenter } from 'components/BaseElement/Row';
import Flex from 'components/BaseElement/Flex';
import { ColumnStart } from 'components/BaseElement/Column';
import CollaborationAnimate from './CollaborationAnimat';

export default function Metaverse() {
  const {t} = useTranslation()

  const cooperationProjects:CooperationProjects[] = [
    {
      png: require('assets/svg/Metaverse/projects_1.svg').default,
      name: t(`Port3`),
      text: t(`The Gateway to Web3 Social Graph.`),
    },
    {
      png: require('assets/svg/Metaverse/projects_2.svg').default,
      name: t(`Link3`),
      text: t(`Link3, powered by CyberConnect, is a Web3 social network of verifiable identities.`),
    },
    {
      png: require('assets/svg/Metaverse/projects_3.svg').default,
      name: t(`Element`),
      text: t(`The First Community-driven Aggregated NFT Marketplace.`),
    },
    {
      png: require('assets/svg/Metaverse/projects_4.svg').default,
      name: t(`Aquanee`),
      text: t(`AQUANEE is a real-time Simulation game inspired by sea creatures. Players can breed their own pets and build an AQUANEE kingdom!`),
    },
    {
      png: require('assets/svg/Metaverse/projects_5.svg').default,
      name: t(`MatthewRobotNFT`),
      text: t(`As a representative of the MetaFi, MatthewRobot is committed to exploring how to stand out in the Web3.`),
    },
    {
      png: require('assets/svg/Metaverse/projects_6.svg').default,
      name: t(`Plato Farm`),
      text: t(`Plato Farm is a metaverse that uses blockchain technology to simulate the evolution of human civilization.`),
    },
    {
      png: require('assets/svg/Metaverse/projects_7.svg').default,
      name: t(`MetaBell`),
      text: t(`An innovative metaverse service provider.`),
    },
    {
      png: require('assets/svg/Metaverse/projects_8.svg').default,
      name: t(`SeekTiger`),
      text: t(`SeekTiger is a DAO ecological service platform based on WEB3.`),
    },
    {
      png: require('assets/svg/Metaverse/projects_9.svg').default,
      name: t(`Okaleido`),
      text: t(`Multimedia NFT Trading Aggregator on BNB chain.`),
    },
    {
      png: require('assets/svg/Metaverse/projects_10.svg').default,
      name: t(`.Bit`),
      text: t(`.bit is a blockchain-based, open source, decentralized cross-chain account system that provides a worldwide unique naming system with a .bit suffix.`),
    },
    {
      png: require('assets/svg/Metaverse/projects_11.svg').default,
      name: t(`StarFish`),
      text: t(`Starfish OS is a starfish-style institution consensus collaboration system.`),
    },
    {
      png: require('assets/svg/Metaverse/projects_12.svg').default,
      name: t(`XLAND`),
      text: t(`XLAND is a 1:1 real earth reflection metaverse with LandFi.`),
    },
  ]

  const activating:CooperationProjects[] = [
    {
      png: require('assets/svg/Metaverse/activating_1.svg').default,
      name: t(`GETA Token`),
      text: t(`Digital assets or GETA tokens on the Meta Universe virtual platform are traceable, decentralized smart property that can be freely registered, transferred, issued, deposited, pledged or destroyed.`),
    },
    {
      png: require('assets/svg/Metaverse/activating_2.svg').default,
      name: t(`Digital Identity`),
      text: t(`Provides a window into the Web 3.0 world on a decentralized identity system, with additional support and rewards for all participants who maintain this window.`),
    },
    {
      png: require('assets/svg/Metaverse/activating_3.svg').default,
      name: t(`Tokens`),
      text: t(`GETA has its own token standard that deals with the transfer, ownership and information of irreplaceable items such as artwork and games. They allow anyone to register assets from off-chain and have identifiable IDs that are globally unique.`),
    },
  ]

  const CollaborationList: AnimateContent[][] = [
    [
      {
        pngUp: require('assets/images/Metaverse/collaboration_1.png'),
        nameUp: t(`Ramin Nazer`),
        pngDown: require('assets/images/Metaverse/collaboration_2.png'),
        nameDown: t(`Magnus Voll Mathiasse`),
      },
      {
        pngUp: require('assets/images/Metaverse/collaboration_3.png'),
        nameUp: t(`Car Pintos`),
        pngDown: require('assets/images/Metaverse/collaboration_4.png'),
        nameDown: t(`SQUID LICKER`),
      },
    ],
    [
      {
        pngUp: require('assets/images/Metaverse/collaboration_5.png'),
        nameUp: t(`Christian Vieri`),
        pngDown: require('assets/images/Metaverse/collaboration_6.png'),
        nameDown: t(`Antoine Corbineau`),
      },
      {
        pngUp: require('assets/images/Metaverse/collaboration_7.png'),
        nameUp: t(`Betsy Cameron`),
        pngDown: require('assets/images/Metaverse/collaboration_8.png'),
        nameDown: t(`Cat Coquilette`),
      },
    ],
    [
      {
        pngUp: require('assets/images/Metaverse/collaboration_9.png'),
        nameUp: t(`Fafi`),
        pngDown: require('assets/images/Metaverse/collaboration_10.png'),
        nameDown: t(`Rongrong`),
      },
      {
        pngUp: require('assets/images/Metaverse/collaboration_11.png'),
        nameUp: t(`Bee Sturgis`),
        pngDown: require('assets/images/Metaverse/collaboration_12.png'),
        nameDown: t(`Mia Charro`),
      },
    ],
    [
      {
        pngUp: require('assets/images/Metaverse/collaboration_13.png'),
        nameUp: t(`Wesley Sneijder`),
        pngDown: require('assets/images/Metaverse/collaboration_14.png'),
        nameDown: t(`Aunty Acid`),
      },
      {
        pngUp: require('assets/images/Metaverse/collaboration_15.png'),
        nameUp: t(`Karan Singh`),
        pngDown: require('assets/images/Metaverse/collaboration_16.png'),
        nameDown: t(`Heather Dutton`),
      },
    ],
    [
      {
        pngUp: require('assets/images/Metaverse/collaboration_17.png'),
        nameUp: t(`Kendra Dandy`),
        pngDown: require('assets/images/Metaverse/collaboration_18.png'),
        nameDown: t(`Mister Phil`),
      },
      {
        pngUp: require('assets/images/Metaverse/collaboration_19.png'),
        nameUp: t(`Sarah Maxwell`),
        pngDown: require('assets/images/Metaverse/collaboration_20.png'),
        nameDown: t(`Malika Favre`),
      },
    ],
    [
      {
        pngUp: require('assets/images/Metaverse/collaboration_21.png'),
        nameUp: t(`James Goldcrown`),
        pngDown: require('assets/images/Metaverse/collaboration_22.png'),
        nameDown: t(`John Devolle`),
      },
      {
        pngUp: require('assets/images/Metaverse/collaboration_23.png'),
        nameUp: t(`Venie Tee`),
        pngDown: require('assets/images/Metaverse/collaboration_24.png'),
        nameDown: t(`Dimitran Milan`),
      },
    ],
    [
      {
        pngUp: require('assets/images/Metaverse/collaboration_25.png'),
        nameUp: t(`ADOONGA`),
        pngDown: require('assets/images/Metaverse/collaboration_26.png'),
        nameDown: t(`Owen Davey`),
      },
      {
        pngUp: require('assets/images/Metaverse/collaboration_27.png'),
        nameUp: t(`Alja Horvat`),
        pngDown: require('assets/images/Metaverse/collaboration_25.png'),
        nameDown: t(`Ramin Nazer`),
      },
    ],
  ]

  const margintop = ['0px', '40px', '80px', '120px', '80px', '40px', '0px']
  const speed = [1800, 1400, 800, 600, 800, 1400, 1800]

  return (
    <>

      <Box
        position={'relative'}
      >
        <Box
          position={'absolute'}
          zIndex={`${Z_INDEX.banner_text}`}
          color={'#ffffff'}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={'100%'}
          height={'100%'}
          style={{pointerEvents: 'none'}}
        >
          {/* <Typography
            fontSize={"100px"}
            fontFamily={"CRT-64"}
            fontWeight={"400"}
            color={"#F6B91B"}
            style={{textShadow: "0px 0px 10px rgba(0,0,0,0.1600)"}}
          >
            {t(`GETAVERSE`)}
          </Typography> */}

          <Typography
            fontSize={"20px"}
            fontWeight={"400"}
            color={"#ffffff"}
            textAlign={"center"}
            maxWidth={"650px"}
            marginTop={"60px"}
          >
            {t(`The Getaverse metaverse is an open source decentralized, interoperable platform for programmable digital assets and digital identities built on Getaverse.`)}
          </Typography>

        </Box>
        <Swiper />
      </Box>
      
      <PartTwo>
        <Title>
          {t(`Cooperation Projects`)}
        </Title>
      <Grid
        gridTemplateColumns={'repeat(auto-fit, minmax(308px, 1fr))'}
        gap={'62px 16px'}
        marginTop={'111px'}
      >
        {
          cooperationProjects.map((item) => {
            return <Cooperation key={item.name}>
              <CooperationSvg src={item.png} />
              <Typography
                fontSize="28px"
                fontWeight="400"
                color="#F6B91B"
              >
                {item.name}
              </Typography>
              <Typography
                fontSize="18px"
                fontWeight="350"
                color="#ffffff"
              >
                {item.text}
              </Typography>
            </Cooperation>
          })
          
        }
      </Grid>

      <Title
        marginTop={'139px'}
      >
        {t(`Activating the metaverse`)}
      </Title>

      <RowCenter
        marginTop={'58px'}
      >
        <Typography
          fontSize="20px"
          fontWeight="400"
          color="#ffffff" 
        >
          {t(`Through GETA tokens, digital identities, tokens`)}
        </Typography>
      </RowCenter>

      <Grid
        marginTop={'101px'}
        gap={'16px'}
        gridTemplateColumns={'repeat(3,1fr)'}
      >
        {
          activating.map((item) => {
            return (
              <Activating key={item.name}>
                <ActivatingSvg src={item.png} alt="" />
                <Typography
                  fontSize="28px"
                  fontWeight="400"
                  color="#F6B91B"
                  textAlign={'center'}
                >
                  {item.name}
                </Typography>

                <Typography
                  fontSize="18px"
                  fontWeight="350"
                  color="#ffffff"
                  textAlign={'center'}
                >
                  {item.text}
                </Typography>
              </Activating>
            )
          })
        }
        
      </Grid>

      </PartTwo>

      <PartThree>
        <Title>
          {t(`Collaboration IP`)}
        </Title>
        
        <RowCenter
          marginTop={"58px"}
        >
          <Typography
            fontSize="20px"
            fontWeight="400"
            color="#ffffff"
          >
            {t(`Become a partner and let's accelerate the project together!`)}
          </Typography>
        </RowCenter>

        <Grid
          marginTop="108px"
          gap="0 16px"
          gridTemplateColumns={'repeat(7,1fr)'}
        >
          {
            CollaborationList && 
            CollaborationList.map((item,index) => {
              return <CollaborationAnimate 
              key={index} 
              list={item}
              margintop={margintop[index]}
              speed={speed[index]}
            />
            } )
          }
          
        </Grid>
        

      </PartThree>

      <PartFive>
        <Flex
          gap={'43px'}
          justifyContent={'center'}
        >
          <img src={require('assets/svg/Metaverse/meta_five_1.svg').default} alt="" />
          <ColumnStart>
            <Typography
              fontSize="36px"
              fontWeight="700"
              color="#ffffff"
            >
              {t(`Become a partner to accelerate project growth`)}
            </Typography>
            <Typography 
              fontSize="20px"
              fontWeight="400"
              color="#ffffff"
              margin={'14px 0 42px'} 
            >
              {t(`We will contact you as soon as you submit your email!`)}
            </Typography>

            {/* <EmailIpt
              placeholder="Enter your email address"
            /> */}
            <EmailInput
              placeholder='Enter your email address'
              right={<Submit className='submit' onClick={() => console.log('aabb')}>SUBMIT</Submit>}
              inputClassName="email-input"
            />


          </ColumnStart>
        </Flex>
      </PartFive>

    </>
  )

}