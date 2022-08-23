import React, { useEffect, useState } from 'react'
import Box, { Typography } from 'components/BaseElement';
import JumpBtn from 'components/Button/BackBtn';
import { useTranslation } from 'react-i18next';
import { Row, RowCenter, RowStart } from 'components/BaseElement/Row';
import { Invitation, InviteInput, InviteWrap, ProgressImg } from './MyNodes.style';
import { Column, ColumnStart } from 'components/BaseElement/Column';
import { Icon } from 'components/BaseElement/Icon';
import Normal from 'components/Button/Normal';



export default function Invite() {
  const { t } = useTranslation()
  const [isAllow, setIsAllow] = useState<boolean>(true)



  return (
    <InviteWrap>
      <Row
        width={"100%"}
        justifyContent={'center'}
        marginBottom={'.88rem'}
        position={'relative'}
      >
        <Box
          position={'absolute'}
          top={'50%'}
          left={'1.55rem'}
          style={{
            transform: 'translate(-50%, -50%)'
          }}
        >
          <JumpBtn
            text="Back"
            path={-1}
          />
        </Box>
        <Typography
          fontSize={'.6rem'}
          fontWeight={'700'}
          color={'#fff'}
        >
          {t(`Invite Friends`)}
        </Typography>
        <div />
      </Row>

      <RowCenter
        marginBottom={'.64rem'}
      >
        <ProgressImg src={require('assets/images/progress_bar.png')} />
      </RowCenter>

      {
        isAllow ?
          <ColumnStart
            padding={'.48rem .36rem .44rem'}
            background={'#1A1919'}
            borderRadius={'8px'}
            gap=".32rem"
          >
            <RowStart
              gap={'.64rem'}
              padding={'.27rem .16rem'}
              justifyContent='center'
              width='100%'
              boxSizing='border-box'
            >
              <Column
                gap={'.08rem'}
              >
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                  color={'#fff'}
                  WhiteSpace={'nowrap'}
                >
                  {t(`Cumulative number of invitations`)}
                </Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                  color={'#F6B91B'}
                >
                  600
                </Typography>
              </Column>
              <Column
                gap={'.08rem'}
              >
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                  color={'#fff'}
                  WhiteSpace={'nowrap'}
                >
                  {t(`Cumulative Direct Push Bonus`)}
                </Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                  color={'#F6B91B'}
                >
                  45.23 GETA/45.23 USDT
                </Typography>
              </Column>
              <Column
                gap={'.08rem'}
              >
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'350'}
                  color={'#fff'}
                  WhiteSpace={'nowrap'}
                >
                  {t(`Today's direct push bonus`)}
                </Typography>
                <Typography
                  fontSize={".2rem"}
                  fontWeight={'700'}
                  color={'#F6B91B'}
                >
                  45.23 GETA/45.23 USDT
                </Typography>
              </Column>
            </RowStart>

            <ColumnStart
              gap={'.16rem'}
              padding={'0rem .16rem'}
              justifyContent='center'
              width='100%'
              boxSizing='border-box'
            >
                <Row gap=".08rem">
                  <Typography
                    fontSize={'.2rem'}
                    fontWeight={'700'}
                    color={'#ffffff'}
                  >{t(`Invite Friends`)}</Typography>
                  <Icon src={require('assets/svg/icon_question.svg').default} alt="" />
                </Row>

                <InviteInput 
                  placeholder='Enter your email address'
                  right={<Invitation className='submit' onClick={() => console.log('aabb')}>Invitation</Invitation>}
                />
            </ColumnStart>
          </ColumnStart>
          :
          <ColumnStart
            padding={'.85rem 1.36rem'}
            background={'#1A1919'}
            borderRadius={'8px'}
            gap=".16rem"
          >
            <Row gap=".08rem">
              <Typography
                fontSize={'.2rem'}
                fontWeight={'700'}
                color={'#ffffff'}
              >{t(`Invite Friends`)}</Typography>
              <Icon src={require('assets/svg/icon_question.svg').default} alt="" />
            </Row>
            <Typography
              fontSize={'.2rem'}
              fontWeight={'400'}
              color={'#6B6B6B'}
            >
              {t(`You can only invite your friends after you purchase a node, so come and buy a node and get the direct push reward exclusively for you!`)}
            </Typography>
            <Normal>
              {t(`INVITATION`)}
            </Normal>
          </ColumnStart>
      }



    </InviteWrap>
  )
}
