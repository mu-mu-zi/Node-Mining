import { Row } from 'components/BaseElement/Row'
import React from 'react'
import styled from 'styled-components'
import { Typography } from '../../components/BaseElement/index';
import { useTranslation } from 'react-i18next';
import { EaseBtn } from 'components/Button';
import useTheme from 'hooks/useTheme';
import Normal from '../../components/Button/Normal';

const Banner = styled.div`
  position: relative;
  background-image: url('${require('assets/images/about_banner.png')}');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 9.06rem;
  /* padding-top: 108px; */
  box-sizing: border-box;
  background-position: center;
  ${({theme}) => theme.mediaWidth.sm`
      height: 500px; 
  `}
`


export default function Aboutus() {
  const {t} = useTranslation()
  const {theme} = useTheme()
  return <>
    <Banner>
      <Typography
        color={'#fff'}
        fontSize={theme.isH5 ? '20px' : '.6rem'}
        fontWeight={'700'}
        marginBottom={'.1rem'}
        fontFamily={'RomicStd'}
      >
        {t(`Whitepaper`)}
      </Typography>

      <Typography
        color={'#fff'}
        fontSize={theme.isH5 ? '20px' : '30px'}
        fontWeight={'400'}
        margin={theme.isH5 ? '16px 61.5px' : ''}
        marginBottom={theme.isH5 ? '16px' : '1.3rem'}
        textAlign={'center'}
      >
        {t(theme.isH5 ? `Decentralized network by providing computing resources` : `To learn more about the Getaverse, click to download the whitepaper and see more details.`)}
      </Typography>
      <a
        download={'GetaverseWhitepaper.pdf'}
        href={'https://getaverses.s3.ap-southeast-1.amazonaws.com/whitepaper/GetaverseWhitepaper.pdf'}
        target="_blank"
        style={{
          textDecoration: 'none'
        }}
      >
        <Normal>
          {t(`DOWNLOAD WHITE PAPER`)}
        </Normal>
      </a>

    </Banner>
  </>
}