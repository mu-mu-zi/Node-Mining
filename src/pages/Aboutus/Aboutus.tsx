import { Row } from 'components/BaseElement/Row'
import React from 'react'
import styled from 'styled-components'
import { Typography } from '../../components/BaseElement/index';
import { useTranslation } from 'react-i18next';
import { EaseBtn } from 'components/Button';

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
`


export default function Aboutus() {
  const {t} = useTranslation()
  return <>
    <Banner>
      <Typography
        color={'#fff'}
        fontSize={'60px'}
        fontWeight={'700'}
        marginBottom={'.1rem'}
      >
        {t(`About Us`)}
      </Typography>

      <Typography
        color={'#fff'}
        fontSize={'20px'}
        fontWeight={'400'}
        marginBottom={'1.3rem'}
      >
        {t(`To learn more about the Getaverse, click to download the whitepaper and see more details.`)}
      </Typography>
      <a
        download={'GetaverseWhitepaper.pdf'}
        href={require('assets/GetaverseWhitepaper.pdf')}
        target="_blank"
        style={{
          textDecoration: 'none'
        }}
      >
        <EaseBtn>
          {t(`Download White Paper`)}
        </EaseBtn>
      </a>

    </Banner>
  </>
}