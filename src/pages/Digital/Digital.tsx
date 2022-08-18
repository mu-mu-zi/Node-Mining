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

export default function Digital() {
  const { t } = useTranslation()
  return (
    <>
      <Banner>
        <Typography
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
        </Typography>

        <Typography
          fontSize={"20px"}
          fontWeight={"400"}
          color={"#ffffff"}
          textAlign={"center"}
          maxWidth={"984px"}
          marginBottom={"32px"}
          marginTop={"32px"}
        >
          {t(`Getaverse works by providing a window into the WEB3 world on a decentralized identity system, with additional support and rewards for all participants who maintain this window. Any trusted party (verifier) that needs to verify a user will receive the verifiable statement and verify its authenticity.`)}
        </Typography>

        {/* <EmailIpt
          placeholder="Enter your email address"
        /> */}

        <EmailInput 
          placeholder='Enter your email address'
          right={<Submit className='submit' onClick={() => console.log('aabb')}>SUBMIT</Submit>}
          inputClassName="email-input"
          // onChange={() => console.log('aabb')}
        />

      </Banner>

      <PartTwo>
        <Title>
          {t(`Create your own digital identity`)}
        </Title>
        <RowCenter
        >
          <Typography
            fontWeight='400'
            fontSize='20px'
            color='#ffffff'
            marginTop={'58px'}
            marginBottom={'62px'}
            maxWidth={'984px'}
            textAlign={'center'}
          >
            {t(`Compared with the traditional PKI-based identity system, the DID digital identity system built on blockchain has guaranteed data authenticity.`)}
          </Typography>
        </RowCenter>

        <RowCenter
          gap={'16px'}
        >
          <IdentityCard>
            <Image src={require('assets/svg/Digital/digital_two_1.svg').default} alt='' />
            <Typography
              fontWeight='400'
              fontSize='28px'
              color='#F6B91B'
              textAlign={'center'}
              margin={'32px 0 '}
            >
              {t(`SECURE AND PRIVACY CENTRIC`)}
            </Typography>
            <Typography
              fontWeight='350'
              fontSize='22px'
              color='#ffffff'
              textAlign={'center'}
            >
              {t(`Getaverse enforces the security, privacy and confidentiality of identifiable data through blockchain encryption methods, and custom DIDs provide a user-friendly experience.`)}
            </Typography>
          </IdentityCard>
          <IdentityCard>
            <Image src={require('assets/svg/Digital/digital_two_2.svg').default} alt='' />
            <Typography
              fontWeight='400'
              fontSize='28px'
              color='#F6B91B'
              textAlign={'center'}
              margin={'32px 0 '}
            >
              {t(`DECENTRALIZATION`)}
            </Typography>
            <Typography
              fontWeight='350'
              fontSize='22px'
              color='#ffffff'
              textAlign={'center'}
            >
              {t(`Getaverse uses blockchain technology to enforce ownership of digital identities and their associated credentials. This essentially means that the identity owner has full control over personally identifiable information.`)}
            </Typography>
          </IdentityCard>
          <IdentityCard>
            <Image src={require('assets/svg/Digital/digital_two_3.svg').default} alt='' />
            <Typography
              fontWeight='400'
              fontSize='28px'
              color='#F6B91B'
              textAlign={'center'}
              margin={'32px 0 '}
            >
              {t(`TRUSTED DATA EXCHANGE`)}
            </Typography>
            <Typography
              fontWeight='350'
              fontSize='22px'
              color='#ffffff'
              textAlign={'center'}
            >
              {t(`The data related to the identity is anchored on the blockchain, and the authentication process does not depend on the user who provided the identity.`)}
            </Typography>
          </IdentityCard>
        </RowCenter>

        <Title
          marginTop={'147px'}
        >
          {t(`DID Solution Architecture`)}
        </Title>

        <RowCenter
          marginTop={'58px'}
        >
          <Typography
            fontSize={"20px"}
            fontWeight={"400"}
            color={"#ffffff"}
            maxWidth={'984px'}
            textAlign={'center'}
          >
            {t(`A single DID account can hold verifiable credentials from multiple applications, enabling unified account login and thus avoiding duplicate application account registration on different platforms.`)}
          </Typography>
        </RowCenter>
        <RowCenter
          marginTop={'88px'}
        >
          <Image src={require('assets/svg/Digital/digital_three.svg').default} />
        </RowCenter>

      </PartTwo>

      <PartThree>
        <Title>
          {t(`Self-governance`)}
        </Title>
        <RowCenter
          marginTop={'58px'}
        >
          <Typography
            fontSize={"20px"}
            fontWeight={"400"}
            color={"#ffffff"}
            maxWidth={'984px'}
            textAlign={'center'}
          >
            {t(`The trusted party (verifier) can compare the publicly available identifier with the identifier in the statement submitted to him by the user. After authenticating the user using the authentication methods provided in the public chain, the statement itself can be verified by the trusted party (verifier), which eventually gives the result of passing or rejecting the authentication. In the process of registering a DID, the user does not need to store any information related to the user personally on the statement initiating node or the verifying node, but only needs to establish trust between the statement initiating node and the verifying node beforehand to make the DID system work properly.`)}
          </Typography>
        </RowCenter>

        <RowCenter
          marginTop={'72px'}
        >
          <Image src={require('assets/svg/Digital/digital_four.svg').default} />
        </RowCenter>

      </PartThree>
    </>
  )
}