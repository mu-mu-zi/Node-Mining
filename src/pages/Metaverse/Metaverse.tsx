import Box, { Typography } from 'components/BaseElement'
import React, { useState } from 'react'
import { Z_INDEX } from 'utils/global'
import Swiper from './Swiper'
import { useTranslation } from 'react-i18next';
import { Title } from 'pages/Digital/Digital.styled';
import {
  PartTwo, Cooperation, CooperationSvg, Activating, ActivatingSvg, PartThree, PartFive, EmailIpt
  , EmailInput, Submit
} from './Metaverse.styled';
import { AnimateContent, CooperationProjects } from './types';
import Grid from 'components/BaseElement/Grid';
import { RowCenter } from 'components/BaseElement/Row';
import Flex from 'components/BaseElement/Flex';
import { ColumnStart } from 'components/BaseElement/Column';
import CollaborationAnimate from './CollaborationAnimat';
import useTheme from 'hooks/useTheme';
import { submitEmail } from 'http/api';
import { Notice, isEmail } from 'utils/tools';
import { MsgStatus } from 'components/messageBox/MessageBox';

export default function Metaverse() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [email, setEmail] = useState<string>('')

  const FnSubmit = async () => {
    if(!isEmail(email)){
      Notice('Please enter the correct email address', MsgStatus.fail)
      return
    }
    let result = await submitEmail(email)
    if(result.data) {
      setEmail('')
      Notice('success', MsgStatus.success)
    }
  }

  const cooperationProjects: CooperationProjects[] = [
    {
      png: require('assets/svg/Metaverse/projects_1.svg').default,
      name: t(`Port3`),
      text: t(`The Gateway to Web3 Social Graph.`),
      link: 'https://www.port3.io/',
    },
    {
      png: require('assets/svg/Metaverse/projects_2.svg').default,
      name: t(`Link3`),
      text: t(`Link3, powered by CyberConnect, is a Web3 social network of verifiable identities.`),
      link: 'https://www.link3.io/',
    },
    {
      png: require('assets/svg/Metaverse/projects_3.svg').default,
      name: t(`Element`),
      text: t(`The First Community-driven Aggregated NFT Marketplace.`),
      link: 'https://element.io/',
    },
    {
      png: require('assets/svg/Metaverse/projects_4.svg').default,
      name: t(`Aquanee`),
      text: t(`AQUANEE is a real-time Simulation game inspired by sea creatures. Players can breed their own pets and build an AQUANEE kingdom!`),
      link: 'https://aquanee.com/#/',
    },
    {
      png: require('assets/svg/Metaverse/projects_5.svg').default,
      name: t(`MatthewRobotNFT`),
      text: t(`As a representative of the MetaFi, MatthewRobot is committed to exploring how to stand out in the Web3.`),
      link: 'https://www.matthewrobot.com/',
    },
    {
      png: require('assets/svg/Metaverse/projects_6.svg').default,
      name: t(`Plato Farm`),
      text: t(`Plato Farm is a metaverse that uses blockchain technology to simulate the evolution of human civilization.`),
      link: 'https://www.platofarm.game/index',
    },
    {
      png: require('assets/svg/Metaverse/projects_7.svg').default,
      name: t(`MetaBell`),
      text: t(`An innovative metaverse service provider.`),
      link: 'https://www.metabell.io/',
    },
    {
      png: require('assets/svg/Metaverse/projects_8.svg').default,
      name: t(`SeekTiger`),
      text: t(`SeekTiger is a DAO ecological service platform based on WEB3.`),
      link: 'https://www.seektiger.com/',
    },
    {
      png: require('assets/svg/Metaverse/projects_9.svg').default,
      name: t(`Okaleido`),
      text: t(`Multimedia NFT Trading Aggregator on BNB chain.`),
      link: 'https://galaxy.eco/Okaleido/',
    },
    {
      png: require('assets/svg/Metaverse/projects_10.svg').default,
      name: t(`.Bit`),
      text: t(`.bit is a blockchain-based, open source, decentralized cross-chain account system that provides a worldwide unique naming system with a .bit suffix.`),
      link: 'https://www.did.id/',
    },
    {
      png: require('assets/svg/Metaverse/projects_11.svg').default,
      name: t(`StarFish`),
      text: t(`Starfish OS is a starfish-style institution consensus collaboration system.`),
      link: 'https://starfishlabs.dev/',
    },
    {
      png: require('assets/svg/Metaverse/projects_12.svg').default,
      name: t(`XLAND`),
      text: t(`XLAND is a 1:1 real earth reflection metaverse with LandFi.`),
      link: 'https://xland.live/#/',
    },
  ]

  const activating: CooperationProjects[] = [
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

  const CollaborationList: AnimateContent[][][] = [
    [
      [
        {
          png: require('assets/images/Metaverse/collaboration_1.png'),
          name: t(`Ramin Nazer`),

        },
        {
          png: require('assets/images/Metaverse/collaboration_2.png'),
          name: t(`Magnus Voll Mathiasse`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_3.png'),
          name: t(`Car Pintos`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_4.png'),
          name: t(`SQUID LICKER`),
        },
      ],
    ],
    [
      [
        {
          png: require('assets/images/Metaverse/collaboration_5.png'),
          name: t(`Christian Vieri`),

        },
        {
          png: require('assets/images/Metaverse/collaboration_6.png'),
          name: t(`Antoine Corbineau`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_7.png'),
          name: t(`Betsy Cameron`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_8.png'),
          name: t(`Cat Coquilette`),
        },
      ],
    ],
    [
      [
        {
          png: require('assets/images/Metaverse/collaboration_9.png'),
          name: t(`Fafi`),

        },
        {
          png: require('assets/images/Metaverse/collaboration_10.png'),
          name: t(`Rongrong`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_11.png'),
          name: t(`Bee Sturgis`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_12.png'),
          name: t(`Mia Charro`),
        },
      ],
    ],
    [
      [
        {
          png: require('assets/images/Metaverse/collaboration_13.png'),
          name: t(`Wesley Sneijder`),

        },
        {
          png: require('assets/images/Metaverse/collaboration_14.png'),
          name: t(`Aunty Acid`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_15.png'),
          name: t(`Karan Singh`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_16.png'),
          name: t(`Heather Dutton`),
        },
      ],
    ],
    [
      [
        {
          png: require('assets/images/Metaverse/collaboration_17.png'),
          name: t(`Kendra Dandy`),

        },
        {
          png: require('assets/images/Metaverse/collaboration_18.png'),
          name: t(`Mister Phil`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_19.png'),
          name: t(`Sarah Maxwell`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_20.png'),
          name: t(`Malika Favre`),
        },
      ],
    ],
    [
      [
        {
          png: require('assets/images/Metaverse/collaboration_21.png'),
          name: t(`James Goldcrown`),

        },
        {
          png: require('assets/images/Metaverse/collaboration_22.png'),
          name: t(`John Devolle`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_23.png'),
          name: t(`Venie Tee`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_24.png'),
          name: t(`Dimitran Milan`),
        },
      ],
    ],
    [
      [
        {
          png: require('assets/images/Metaverse/collaboration_25.png'),
          name: t(`ADOONGA`),

        },
        {
          png: require('assets/images/Metaverse/collaboration_26.png'),
          name: t(`Owen Davey`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_27.png'),
          name: t(`Alja Horvat`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_25.png'),
          name: t(`ADOONGA`),
        },
      ],
    ],
  ]
  const CollaborationListH5: AnimateContent[][][] = [
    [
      [
        {
          png: require('assets/images/Metaverse/collaboration_1.png'),
          name: t(`Ramin Nazer`),

        },
        {
          png: require('assets/images/Metaverse/collaboration_2.png'),
          name: t(`Magnus Voll Mathiasse`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_3.png'),
          name: t(`Car Pintos`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_4.png'),
          name: t(`SQUID LICKER`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_5.png'),
          name: t(`Christian Vieri`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_6.png'),
          name: t(`Antoine Corbineau`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_7.png'),
          name: t(`Betsy Cameron`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_8.png'),
          name: t(`Cat Coquilette`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_9.png'),
          name: t(`Fafi`),
        },
      ],
    ],
    [
      [
        {
          png: require('assets/images/Metaverse/collaboration_10.png'),
          name: t(`Rongrong`),

        },
        {
          png: require('assets/images/Metaverse/collaboration_11.png'),
          name: t(`Bee Sturgis`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_12.png'),
          name: t(`Mia Charro`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_13.png'),
          name: t(`Wesley Sneijder`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_14.png'),
          name: t(`Aunty Acid`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_15.png'),
          name: t(`Karan Singh`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_16.png'),
          name: t(`Heather Dutton`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_17.png'),
          name: t(`Kendra Dandy`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_18.png'),
          name: t(`Mister Phil`),
        },
      ],
    ],
    [
      [
        {
          png: require('assets/images/Metaverse/collaboration_19.png'),
          name: t(`Sarah Maxwell`),

        },
        {
          png: require('assets/images/Metaverse/collaboration_20.png'),
          name: t(`Malika Favre`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_21.png'),
          name: t(`James Goldcrown`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_22.png'),
          name: t(`John Devolle`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_23.png'),
          name: t(`Venie Tee`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_24.png'),
          name: t(`Dimitran Milan`),
        },
      ],
      [
        {
          png: require('assets/images/Metaverse/collaboration_25.png'),
          name: t(`ADOONGA`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_26.png'),
          name: t(`Owen Davey`),
        },
        {
          png: require('assets/images/Metaverse/collaboration_27.png'),
          name: t(`Alja Horvat`),
        },
      ],
    ],
  ]
  
  const collaboraList = theme.isH5 ? CollaborationListH5 : CollaborationList 

  const margintop = theme.isH5 ? ['59px', '0px', '59px'] : ['0px', '40px', '80px', '120px', '80px', '40px', '0px']
  const speed = theme.isH5 ? [800, 600, 800] : [1800, 1400, 800, 600, 800, 1400, 1800]

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
          style={{ pointerEvents: 'none' }}
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
            fontSize={theme.isH5 ? "20px" : ".3rem"}
            fontWeight={"400"}
            color={"#ffffff"}
            textAlign={"center"}
            maxWidth={theme.isH5 ? "100%" : "650px"}
            // marginTop={"60px"}
            margin={theme.isH5 ? "0 61px" : '0'}
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
          gridTemplateColumns={theme.isH5 ? "1fr" : 'repeat(auto-fit, minmax(308px, 1fr))'}
          gap={theme.isH5 ? "26px" : '.62rem .16rem'}
          marginTop={theme.isH5 ? "50px" : '111px'}
        >
          {
            cooperationProjects.map((item) => {
              return <Cooperation href={item.link} target={'_blank'} key={item.name}
                
              >
                <CooperationSvg src={item.png} />
                <Typography
                  fontSize={theme.isH5 ? "14px" : "28px"}
                  fontWeight="400"
                  color="#F6B91B"
                >
                  {item.name}
                </Typography>
                <Typography
                  fontSize={theme.isH5 ? "11px" : "18px"}
                  fontWeight="350"
                  color="#ffffff"
                  fontStyle={'italic'}
                >
                  {item.text}
                </Typography>
              </Cooperation>
            })

          }
        </Grid>

        <Title
          marginTop={theme.isH5 ? "48px" : '139px'}
        >
          {t(`Activating the metaverse`)}
        </Title>

        <RowCenter
          marginTop={theme.isH5 ? "21px" : '58px'}
        >
          <Typography
            fontSize={theme.isH5 ? "10px" : "20px"}
            fontWeight="400"
            color="#ffffff"
          >
            {t(`Through GETA tokens, digital identities, tokens`)}
          </Typography>
        </RowCenter>

        <Grid
          marginTop={theme.isH5 ? "24px" : '101px'}
          gap={theme.isH5 ? "8px" : '16px'}
          gridTemplateColumns={theme.isH5 ? "1fr" : 'repeat(3,1fr)'}
        >
          {
            activating.map((item) => {
              return (
                <Activating key={item.name}>
                  <ActivatingSvg src={item.png} alt="" />
                  <Typography
                    fontSize={theme.isH5 ? "14px" : "28px"}
                    fontWeight="400"
                    color="#F6B91B"
                    textAlign={'center'}
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    fontSize={theme.isH5 ? "11px" : "18px"}
                    fontWeight="350"
                    color="#ffffff"
                    textAlign={'center'}
                    fontStyle={'italic'}
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
          {t(`IP Collaboration`)}
        </Title>

        <RowCenter
          marginTop={theme.isH5 ? "21px" : "58px"}
        >
          <Typography
            fontSize={theme.isH5 ? "10px" : "20px"}
            fontWeight="400"
            color="#ffffff"
          >
            {t(`Become a partner and let's accelerate the project together!`)}
          </Typography>
        </RowCenter>

        <Grid
          marginTop={theme.isH5 ? '16px' : "108px"}
          gap={theme.isH5 ? "0 8px" : "0"}
          gridTemplateColumns={theme.isH5 ? "repeat(3,1fr)" : 'repeat(7,1fr)'}
        >
          {
            collaboraList &&
            collaboraList.map((item, index) => {
              return <CollaborationAnimate
                key={index}
                list={item}
                margintop={margintop[index]}
                speed={speed[index]}
              />
            })
          }

        </Grid>


      </PartThree>

      <PartFive>
        <Flex
          flexDirection={theme.isH5 ? "column" : 'row'}
          gap={theme.isH5 ? "8px" : '43px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <img
            style={{
              width: theme.isH5 ? '44px' : 'auto',
              maxHeight: theme.isH5 ? '44px' : 'auto',
            }}
            src={require('assets/images/Metaverse/meta_five_1.png')} alt="" />
          <ColumnStart>
            <Typography
              fontSize={theme.isH5 ? "18px" : "36px"}
              fontWeight="700"
              color="#ffffff"
              textAlign={'center'}
            >
              {t(`Become a partner to accelerate project growth`)}
            </Typography>
            <Typography
              fontSize={theme.isH5 ? "11px" : "20px"}
              fontWeight="400"
              color="#ffffff"
              margin={theme.isH5 ? "8px auto 24px" : '14px 0 42px'}
            >
              {t(`We will contact you as soon as you submit your email!`)}
            </Typography>

            {/* <EmailIpt
              placeholder="Enter your email address"
            /> */}
            <EmailInput
              placeholder='Enter your email address'
              right={<Submit className='submit' onClick={FnSubmit}>SUBMIT</Submit>}
              inputClassName="email-input"
              value={email}
              onChange={(value) => {
                  setEmail(value)
              }}
            />


          </ColumnStart>
        </Flex>
      </PartFive>

    </>
  )

}