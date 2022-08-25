import Box, { Typography } from 'components/BaseElement'
import Flex from 'components/BaseElement/Flex'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Banner, EmailIpt, PartTwo, Title, IdentityCard, PartThree
  , EmailInput, Submit
} from './Digital.styled'
import {Image} from '../Home/Home.styled'
import { RowCenter } from 'components/BaseElement/Row'
import Input from 'components/form/Input'
import Grid from 'components/BaseElement/Grid'
import useTheme from 'hooks/useTheme'

export default function Digital() {
  const { theme } = useTheme()
  const { t } = useTranslation()
  return (
    <>
      <Banner>
        {/* <Typography
          fontSize={"100px"}
          fontFamily={"CRT-64"}
          fontWeight={"400"}
          color={"#F6B91B"}
          textAlign={"center"}
        >
          {t(`DECENTRALI`)}
        </Typography>
        <Typography
          fontSize={"100px"}
          fontFamily={"CRT-64"}
          fontWeight={"400"}
          color={"#F6B91B"}
          textAlign={"center"}
        >
          {t(`ZED IDENTITY`)}
        </Typography> */}

        <Typography
          fontSize={theme.isH5 ? "16px" : "30px"}
          fontWeight={"400"}
          color={"#ffffff"}
          textAlign={"center"}
          maxWidth={theme.isH5 ? "100%" : "984px"}
          // marginBottom={"32px"}
          // marginTop={"32px"}
          margin={theme.isH5 ? "0 61.5px" : '0'}
        >
          {t(`Getaverse works by providing a window into the WEB3 world on a decentralized identity system, with additional support and rewards for all participants who maintain this window. Any trusted party (verifier) that needs to verify a user will receive the verifiable statement and verify its authenticity.`)}
        </Typography>

        {/* <EmailIpt
          placeholder="Enter your email address"
        /> */}

        {/* <EmailInput 
          placeholder='Enter your email address'
          right={<Submit className='submit' onClick={() => console.log('aabb')}>SUBMIT</Submit>}
          inputClassName="email-input"
        /> */}

      </Banner>

      <PartTwo>
        <Title>
          {t(`Create your own digital identity`)}
        </Title>
        <RowCenter
        >
          <Typography
            fontWeight='400'
            fontSize={theme.isH5 ? "10px" : '20px'}
            color='#ffffff'
            marginTop={theme.isH5 ? "21px" : '58px'}
            marginBottom={theme.isH5 ? "32px" : '62px'}
            maxWidth={'984px'}
            textAlign={'center'}
          >
            {t(`Compared with the traditional PKI-based identity system, the DID digital identity system built on blockchain has guaranteed data authenticity.`)}
          </Typography>
        </RowCenter>

        <Grid
          gridTemplateColumns={theme.isH5 ? "1fr" : 'repeat(3,1fr)'}
          gap={theme.isH5 ? "8px" : '16px'}
        >
          <IdentityCard>
            <Image 
              style={{
                width: theme.isH5 ? '44px' : 'auto',
                maxHeight: theme.isH5 ? '44px' : 'auto',
              }}
              src={require('assets/svg/Digital/digital_two_1.png')} alt='' />
            <Typography
              fontWeight='400'
              fontSize={theme.isH5 ? "14px" : '28px'}
              color='#F6B91B'
              textAlign={'center'}
              margin={theme.isH5 ? "8px 0" : '32px 0 '}
            >
              {t(`SECURITY AND PRIVACY`)}
            </Typography>
            <Typography
              fontWeight='350'
              fontSize={theme.isH5 ? "11px" : '22px'}
              color='#ffffff'
              textAlign={'center'}
            >
              {t(`Getaverse enforces the security, privacy and confidentiality of identifiable data through blockchain encryption methods, and custom DIDs provide a user-friendly experience.`)}
            </Typography>
          </IdentityCard>
          <IdentityCard>
            <Image 
              style={{
                width: theme.isH5 ? '44px' : 'auto',
                maxHeight: theme.isH5 ? '44px' : 'auto',
              }}
            src={require('assets/svg/Digital/digital_two_2.svg').default} alt='' />
            <Typography
              fontWeight='400'
              fontSize={theme.isH5 ? "11px" : '22px'}
              color='#F6B91B'
              textAlign={'center'}
              margin={theme.isH5 ? "8px 0" : '32px 0 '}
            >
              {t(`DECENTRALIZATION`)}
            </Typography>
            <Typography
              fontWeight='350'
              fontSize={theme.isH5 ? "11px" : '22px'}
              color='#ffffff'
              textAlign={'center'}
            >
              {t(`Getaverse uses blockchain technology to enforce ownership of digital identities and their associated credentials. This essentially means that the identity owner has full control over personally identifiable information.`)}
            </Typography>
          </IdentityCard>
          <IdentityCard>
            <Image 
              style={{
                width: theme.isH5 ? '44px' : 'auto',
                maxHeight: theme.isH5 ? '44px' : 'auto',
              }}
            src={require('assets/svg/Digital/digital_two_3.svg').default} alt='' />
            <Typography
              fontWeight='400'
              fontSize={theme.isH5 ? "11px" : '22px'}
              color='#F6B91B'
              textAlign={'center'}
              margin={theme.isH5 ? "8px 0" : '32px 0 '}
            >
              {t(`TRUSTED DATA EXCHANGE`)}
            </Typography>
            <Typography
              fontWeight='350'
              fontSize={theme.isH5 ? "11px" : '22px'}
              color='#ffffff'
              textAlign={'center'}
            >
              {t(`The data related to the identity is anchored on the blockchain, and the authentication process does not depend on the user who provided the identity.`)}
            </Typography>
          </IdentityCard>
        </Grid>

        <Title
          marginTop={theme.isH5 ? "46px" : '147px'}
        >
          {t(`DID Solution Architecture`)}
        </Title>

        <RowCenter
          marginTop={theme.isH5 ? "21px" : '58px'}
        >
          <Typography
            fontSize={theme.isH5 ? "10px" : "20px"}
            fontWeight={"400"}
            color={"#ffffff"}
            maxWidth={'984px'}
            textAlign={'center'}
          >
            {t(`A single DID account can hold verifiable credentials from multiple applications, enabling unified account login and thus avoiding duplicate application account registration on different platforms.`)}
          </Typography>
        </RowCenter>
        <RowCenter
          marginTop={theme.isH5 ? "32px" : '88px'}
        >
          <Image src={require('assets/svg/Digital/digital_three.svg').default} />
        </RowCenter>

      </PartTwo>

      <PartThree>
        <Title>
          {t(`Self-governance`)}
        </Title>
        <RowCenter
          marginTop={theme.isH5 ? "21px" : '58px'}
        >
          <Typography
            fontSize={theme.isH5 ? "10px" : "20px"}
            fontWeight={"400"}
            color={"#ffffff"}
            maxWidth={'984px'}
            textAlign={'center'}
          >
            {t(`The trusted party (verifier) can compare the publicly available identifier with the identifier in the statement submitted to him by the user. After authenticating the user using the authentication methods provided in the public chain, the statement itself can be verified by the trusted party (verifier), which eventually gives the result of passing or rejecting the authentication. In the process of registering a DID, the user does not need to store any information related to the user personally on the statement initiating node or the verifying node, but only needs to establish trust between the statement initiating node and the verifying node beforehand to make the DID system work properly.`)}
          </Typography>
        </RowCenter>

        <RowCenter
          marginTop={theme.isH5 ? "32px" : '72px'}
        >
          <Image src={require('assets/svg/Digital/digital_four.svg').default} />
        </RowCenter>

      </PartThree>
    </>
  )
}